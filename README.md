# Google sign-in starter (Next.js + Auth.js)

Stack: Next.js (App Router), Auth.js v5 (`next-auth@beta`), JWT sessions (no database).

## Run locally
1. `npm install`
2. Create Google credentials (below), then `cp .env.example .env.local` and fill in:
   - `AUTH_SECRET` — run `npx auth secret`
   - `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` — from Google Cloud
3. `npm run dev` and open http://localhost:3000

## Google Cloud setup
1. https://console.cloud.google.com → create a project.
2. Google Auth Platform → Branding: set the app name and support email.
   Audience: "External". While in Testing, add your Google accounts as test users,
   or click "Publish app" so anyone can sign in (the email/profile scopes need no review).
3. Clients → Create client → "Web application".
   Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://YOUR-APP.vercel.app/api/auth/callback/google`
4. Copy the Client ID and Client secret into your env vars.

## Deploy to Vercel (free Hobby plan)
1. Push this folder to a GitHub repo and import it at https://vercel.com/new.
2. Add env vars `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, then deploy.
3. Add the final Vercel URL's callback (step 3 above) in Google Cloud.
   Google doesn't allow wildcard redirect URIs, so per-branch preview URLs won't sign in
   unless you add them individually.
