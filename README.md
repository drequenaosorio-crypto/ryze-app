Ryze - Play Store & App Store preparation

Files added/updated:

- components/ryze/feed-item.tsx (fixed as requested)
- components/ryze/upload-pitch.tsx (upload UI, preview, progress)
- app/api/upload/route.ts (uploads to Supabase storage and inserts into pitches table)
- supabase/schema.sql (tables pitches, likes)
- app/page.tsx (fetches pitches and shows UploadPitch)
- capacitor.config.ts
- next.config.js (static export)
- public/manifest.json
- public/icon-512.png (placeholder)
- app/(legal)/privacy-policy/page.tsx
- app/(legal)/terms/page.tsx
- .env.example
- README.md

Build & publish steps (summary):

1. Install dependencies and build static output

  npm install
  npm run build
  npm run export

2. Capacitor (Android / iOS)

  npx cap add android
  npx cap add ios
  npx cap sync
  npx cap open android   # generate AAB in Android Studio
  npx cap open ios       # archive in Xcode for App Store Connect

Notes & next steps:

- Replace placeholder privacy policy and terms with your real legal documents before publishing.
- Add real 512x512 PNG icons in public/ (replace public/icon-512.png).
- Create the Supabase bucket named `pitches` and make sure it has public access for objects. Create the database tables using `supabase/schema.sql` or via Supabase SQL editor.
- Ensure SUPABASE_SERVICE_ROLE_KEY is set in your deployment environment to allow the server upload endpoint to write to storage and insert into the DB.
- Test uploads and playback on device. If you encounter CORS or permissions issues, adjust Supabase storage policies or use signed uploads.

