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
    const { name, email, company, message } = body;

    // Validering
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'remi_lie98@me.com';
    console.log('Sending contact form email to:', contactEmail);
    console.log('Using API key:', process.env.RESEND_API_KEY ? 'Set (hidden)' : 'NOT SET');

    // Send e-post til deg med informasjonen som ble fylt ut
    const emailContent = `
Hei Remi!

🎯 NY REGISTRERING / PILOT-FORESØRSEL

Noen har fylt ut kontaktskjemaet (pilot-registrering) på AquaEnergy AI nettsiden.

Kontaktinformasjon:
- Navn: ${name}
- E-post: ${email}
- Bedrift: ${company || 'Ikke oppgitt'}
- Registrert: ${new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' })}

Melding/Forespørsel:
${message}

---
Du kan svare direkte på denne e-posten for å kontakte ${name}.
AquaEnergy AI
    `.trim();

    const emailResult = await resend.emails.send({
      from: 'AquaEnergy AI <onboarding@resend.dev>',
      to: contactEmail,
      reply_to: email, // Så du kan svare direkte til personen
      subject: `🎯 Ny registrering/pilot-forespørsel fra ${name}${company ? ` (${company})` : ''}`,
      text: emailContent,
    });

    console.log('Contact form submission sent:', emailResult);
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
      message: 'Contact form submitted successfully',
      emailId: 'data' in emailResult ? (emailResult.data as any)?.id : undefined
    });
  } catch (error) {
    console.error('Error sending contact form:', error);
    console.error('Error details:', error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      name: error.name
    } : error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit contact form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

