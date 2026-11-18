# iFarmsNG web (Next.js)

Your static `index.html` + `css/styles.css`, converted to a Next.js (App Router, TypeScript) app.
In production it is built to plain static files (`out/`) that the Rust backend serves.
No Node.js runs in production.

## Run it (Windows 11 / PowerShell)
```powershell
npm install
npm run dev          # http://localhost:3001  (proxies /api/* to Rust on :3000)
npm test             # form tests
npm run lint:types   # TypeScript check
npm run build        # writes the static site to .\out
```
Run the Rust server in another terminal (`cargo run`) so the contact form has a backend.
Without it, the page works but submitting shows "We could not reach the server".

## Structure
```
src/app/            layout.tsx, page.tsx, globals.css (your CSS, unchanged + a small additions block),
                    privacy/, terms/, not-found.tsx
src/components/     Header, Hero, Intro, Services, Approach, Why, Impact, Partnership, Contact,
                    ContactForm (client component), Footer, ...
src/data/content.ts all repeated content (services, pillars, impact, inquiry options)
```
Content that was repeated markup (service cards, pillars, process steps, impact items) is data in
`content.ts` rendered with `.map()`, so copy changes happen in one place.

## What changed from your HTML (on purpose)
- **Form fields renamed** to match the Rust API: `name` -> `full_name`, `inquiry` -> `inquiry_type`.
- **Added a Subject field and a required privacy-consent checkbox** (the Rust API requires both).
- **Inquiry options carry slugs** (`commodity`, `investment`, ...). "Agro-Processing" maps to `other`
  because the backend has no such category; add one in the Rust enum + migration if you want it.
- Form posts **JSON to `/api/inquiries`** and shows server validation errors per field.
- Footer: "Social links coming soon" replaced by Privacy Policy and Terms links (new draft pages).
- CSS additions at the bottom of `globals.css`: visible keyboard focus, form error styles,
  checkbox styling, legal pages.
- Desktop nav is forced open (a closed `<details>` hides its content in current browsers).
- Footer year is computed at build time.

## Before launch
- The hero and "Why" photos are hot-linked from Unsplash. Download licensed copies into `public/images/`
  and update the two URLs (`globals.css` `.hero-image`, `components/Why.tsx`); this is faster and
  lets you keep a strict `img-src 'self'`.
- Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourdomain.com`) at build time for correct social metadata.
  Add an `og:image` once you have a share image.
- Privacy and Terms are drafts: have them reviewed by a lawyer.
- Fonts load from Google Fonts. To self-host them, use `next/font/google` (downloads at build time).

See `RUST-INTEGRATION.md` for the backend changes.
