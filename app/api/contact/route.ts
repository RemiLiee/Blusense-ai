import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, contactPerson, email, phone, facilityType, comment } = body;

    // Validering
    if (!company || !contactPerson || !email || !phone || !facilityType) {
      return NextResponse.json(
        { success: false, error: 'Alle påkrevde felt må fylles ut' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const isDemoMode = !resendApiKey;

    // E-post innhold
    const facilityTypeLabels: Record<string, string> = {
      lakseoppdrett: 'Lakseoppdrett',
      ørretoppdrett: 'Ørretoppdrett',
      havbruk: 'Havbruk',
      landbasert: 'Landbasert oppdrett',
      annet: 'Annet',
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0B3C61; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0B3C61; }
            .value { margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Ny forespørsel fra AquaEnergy AI</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Firma:</div>
                <div class="value">${company}</div>
              </div>
              <div class="field">
                <div class="label">Kontaktperson:</div>
                <div class="value">${contactPerson}</div>
              </div>
              <div class="field">
                <div class="label">E-post:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Telefon:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Type anlegg:</div>
                <div class="value">${facilityTypeLabels[facilityType] || facilityType}</div>
              </div>
              ${comment ? `
              <div class="field">
                <div class="label">Kommentar:</div>
                <div class="value">${comment.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
              <p style="font-size: 12px; color: #666;">
                Sendt fra kontaktskjema på aquaenergyai.com<br>
                ${new Date().toLocaleString('no-NO', { dateStyle: 'long', timeStyle: 'short' })}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
Ny forespørsel fra AquaEnergy AI

Firma: ${company}
Kontaktperson: ${contactPerson}
E-post: ${email}
Telefon: ${phone}
Type anlegg: ${facilityTypeLabels[facilityType] || facilityType}
${comment ? `Kommentar: ${comment}` : ''}

---
Sendt fra kontaktskjema på aquaenergyai.com
${new Date().toLocaleString('no-NO')}
    `.trim();

    // Send e-post til mottakeradresse hvis Resend API key er konfigurert
    if (!isDemoMode) {
      try {
        const resend = new Resend(resendApiKey);
        
        // Bruk miljøvariabel for mottakeradresse, eller fallback til post@aquaenergyai.com
        const recipientEmail = process.env.CONTACT_EMAIL || 'remi_lie98@me.com';
        
        console.log('📤 Sender e-post til:', recipientEmail);
        
        const result = await resend.emails.send({
          from: 'AquaEnergy AI <onboarding@resend.dev>', // Profesjonell avsenderadresse (kundene ser denne)
          to: recipientEmail, // Sendes til din private e-post (skjult for kunder)
          reply_to: email, // Når du svarer, går det til kundens e-post
          subject: `Ny forespørsel fra ${company} - AquaEnergy AI`,
          html: htmlContent,
          text: textContent,
        });
        
        console.log('✅ E-post sendt! ID:', result.data?.id);
      } catch (emailError: any) {
        console.error('❌ Feil ved sending av e-post:', emailError);
        // Fortsett uansett - informasjonen er logget
      }
    } else {
      console.log('⚠️ Demo mode: E-post ikke sendt. Legg til RESEND_API_KEY i Vercel.');
    }

    // Logg alltid (også i demo mode) - dette vises i Vercel logs
    console.log('📧 ========== NY KONTAKTSKJEMA-FORESPØRSEL ==========');
    console.log('Firma:', company);
    console.log('Kontaktperson:', contactPerson);
    console.log('E-post:', email);
    console.log('Telefon:', phone);
    console.log('Type anlegg:', facilityType);
    console.log('Kommentar:', comment || '(ingen kommentar)');
    console.log('Tidspunkt:', new Date().toLocaleString('no-NO'));
    console.log('Status:', isDemoMode ? 'DEMO (ikke sendt - legg til RESEND_API_KEY)' : 'LIVE (sendt)');
    console.log('==================================================');

    return NextResponse.json({
      success: true,
      message: isDemoMode
        ? 'Forespørsel mottatt! (Demo mode - e-post ikke sendt. Legg til RESEND_API_KEY i Vercel for å aktivere e-post.)'
        : 'Forespørsel sendt! Vi tar kontakt snart.',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Kunne ikke sende forespørsel. Prøv igjen senere.' },
      { status: 500 }
    );
  }
}
