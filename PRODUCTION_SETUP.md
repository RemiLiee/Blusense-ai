# Produksjon Setup - Filoversikt

## ⚠️ VIKTIG: Dette er Next.js 14 App Router (ikke Pages Router)
Alle API-ruter skal være i `app/api/` ikke `pages/api/`

---

## A — Prod-hard API: `/app/api/ingest/route.ts`

**Status:** Eksisterer delvis - må forbedres

**Hva å gjøre:**
- Legg til AJV schema validering
- x-api-key autentisering
- Rate limiting
- In-memory persistence (eller database)
- Logging

**Miljøvariabler:**
```
API_INGEST_KEY=din-secret-key-her
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

**Test:**
```bash
curl -X POST http://localhost:3000/api/ingest \
  -H "x-api-key: din-secret-key-her" \
  -H "Content-Type: application/json" \
  -d '{"gateway_id":"test","sensors":[]}'
```

---

## B — Cookie Banner + Privacy

### Fil 1: `/components/CookieBanner.tsx`
**Status:** Må opprettes

### Fil 2: `/app/privacy/page.tsx`
**Status:** Må opprettes

### Fil 3: `/public/dpia.pdf`
**Status:** Må lastes opp (du må lage PDF-en)

**Hva å gjøre:**
1. Opprett CookieBanner komponent
2. Importer i `app/layout.tsx` (samme sted som Chatbot)
3. Opprett `/app/privacy/page.tsx` med GDPR-info og link til DPIA
4. Last opp `dpia.pdf` til `public/` mappen

---

## C — Lead Capture + Spam-beskyttelse

### Fil 1: `/components/ContactForm.tsx`
**Status:** Eksisterer - må forbedres

**Endringer:**
- Legg til honeypot field (skjult input)
- Client-side reCAPTCHA (hvis aktivert)
- Send til `/api/leads`

### Fil 2: `/app/api/leads/route.ts`
**Status:** Må opprettes

**Funksjonalitet:**
- Server-side reCAPTCHA validering
- Honeypot sjekk
- Push til Notion
- Push til Mailchimp
- Rate limiting

**Miljøvariabler:**
```
NOTION_TOKEN=secret_xxx
NOTION_DB_ID=xxx
MAILCHIMP_API_KEY=xxx-us1
MAILCHIMP_LIST_ID=xxx
RECAPTCHA_SECRET_KEY=xxx (valgfri)
```

---

## D — GA4 Tracking

### Fil 1: `/app/head.tsx` eller legg til i `layout.tsx`
**Status:** Må opprettes/endres

### Fil 2: `/lib/analytics.ts`
**Status:** Må opprettes

**Events å tracke:**
- `book_pilot_clicked`
- `lead_submitted`
- `package_viewed`
- `dashboard_viewed`

**Miljøvariabel:**
```
NEXT_PUBLIC_GA4=G-XXXXXXXXXX
```

---

## E — Sentry Error Monitoring

### Fil 1: `/sentry.client.config.ts`
**Status:** Må opprettes

### Fil 2: `/sentry.server.config.ts`
**Status:** Må opprettes

### Fil 3: Oppdater `/app/layout.tsx`
**Status:** Må endres

**Miljøvariabel:**
```
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## F — Feature Flag for Mock/Live

### Fil: `/lib/config.ts`
**Status:** Må opprettes

**Innhold:**
```typescript
export const USE_MOCK = process.env.USE_MOCK === '1';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
```

**Miljøvariabel:**
```
USE_MOCK=1  // for staging/demo
USE_MOCK=0  // for produksjon
```

---

## G — Custom Error Pages

### Fil 1: `/app/not-found.tsx`
**Status:** Må opprettes (Next.js 14 App Router bruker `not-found.tsx`)

### Fil 2: `/app/error.tsx`
**Status:** Må opprettes (Next.js 14 App Router bruker `error.tsx`)

**Innhold:**
- Vennlig feilmelding
- Kontaktlink
- Tilbake-knapp

---

## H — Staging/Production Environments

**I Vercel Dashboard:**

1. Opprett to environments: `staging` og `production`
2. Legg til alle miljøvariabler i begge

**Miljøvariabler (komplett liste):**
```
# API Security
API_INGEST_KEY=din-secret-key-her
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100

# Analytics
NEXT_PUBLIC_GA4=G-XXXXXXXXXX

# Lead Capture
MAILCHIMP_API_KEY=xxx-us1
MAILCHIMP_LIST_ID=xxx
NOTION_TOKEN=secret_xxx
NOTION_DB_ID=xxx
RECAPTCHA_SITE_KEY=xxx (client-side)
RECAPTCHA_SECRET_KEY=xxx (server-side)

# Error Monitoring
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Feature Flags
USE_MOCK=1  # staging: 1, production: 0
```

---

## Prioritering for Mowi-demo

### Høyeste prioritet (gjør FØRST):

1. ✅ `/app/api/ingest/route.ts` - Full produksjon-hardening
2. ✅ `/app/api/leads/route.ts` - Notion + Mailchimp push
3. ✅ `/components/CookieBanner.tsx` + `/app/privacy/page.tsx`
4. ✅ `/lib/config.ts` - USE_MOCK flag
5. ✅ GA4 tracking i layout + events

### Medium prioritet:

6. `/lib/analytics.ts` - Event tracking helper
7. `/app/not-found.tsx` + `/app/error.tsx`
8. Sentry setup

### Lavere prioritet:

9. UptimeRobot konfigurasjon (ekstern tjeneste)
10. DPIA PDF (må lages separat)

---

## Neste steg

1. Jeg lager filene for deg en etter en
2. Du tester lokalt
3. Deploy til staging
4. Test igjen
5. Deploy til produksjon

**Start med hvilken fil?** Si fra så lager jeg den først!

