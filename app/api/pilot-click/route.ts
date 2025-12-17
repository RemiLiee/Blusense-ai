import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { 
          success: false, 
          error: 'RESEND_API_KEY environment variable is not configured',
          details: 'Please set RESEND_API_KEY in Vercel environment variables'
        },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { source, userAgent, referer } = body;

    const contactEmail = process.env.CONTACT_EMAIL || 'remi_lie98@me.com';
    console.log('Sending email to:', contactEmail);
    console.log('Using API key:', process.env.RESEND_API_KEY ? 'Set (hidden)' : 'NOT SET');

    // Send e-post til deg
    const emailContent = `
Hei!

Noen har nettopp klikket på "Book gratis pilot" knappen på AquaEnergy AI nettsiden.

Detaljer:
- Kilde: ${source || 'Ukjent'}
- Side: ${referer || 'Ukjent'}
- Tidspunkt: ${new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' })}
- User Agent: ${userAgent || 'Ukjent'}

Dette er en automatisk varsling fra nettsiden.

---
AquaEnergy AI
    `.trim();

    const emailResult = await resend.emails.send({
      from: 'AquaEnergy AI <onboarding@resend.dev>',
      to: contactEmail,
      reply_to: contactEmail,
      subject: '🚀 Noen har klikket på "Book gratis pilot"',
      text: emailContent,
    });

    console.log('Pilot click notification sent:', emailResult);
    console.log('Email result data:', JSON.stringify(emailResult, null, 2));

    if ('error' in emailResult && emailResult.error) {
      console.error('Resend API error:', emailResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: (emailResult.error as any).message || 'Unknown Resend API error'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Notification sent',
      emailId: 'data' in emailResult ? (emailResult.data as any)?.id : undefined
    });
  } catch (error) {
    console.error('Error sending pilot click notification:', error);
    console.error('Error details:', error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      name: error.name
    } : error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send notification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

