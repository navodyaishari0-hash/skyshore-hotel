# Skyshore Luxury Hotel — static GitHub Pages build

A Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion +
Recharts presentation site for **Skyshore, Tangalle, Sri Lanka**.

This copy is configured to be exported as a **fully static site** and deployed
to GitHub Pages at:

```
https://navodyaishari0-hash.github.io/skyshore-hotel/
```

No server, database or paid hosting is required for the frontend.

---

## What works on GitHub Pages

| Area | Status |
| --- | --- |
| Home, About, Villas, Gallery, Dining, Spa, Experiences, Discover Tangalle, Contact | Static pages — fully working |
| Villa detail pages (`/rooms/[id]`) | Pre-rendered from `src/data/index.ts` via `generateStaticParams` |
| Booking wizard / confirmation | UI works; records are stored **in this browser only** |
| Search/filter/sort, currency switcher, theme, language UI | Client-side only |
| AI Concierge chat widget | Client-side keyword replies; **not a real AI service** |
| Guest dashboard | Browser-only demo data |
| Admin dashboard | Browser-only demo data and charts |
| Sign-in / password reset | Simulated in the browser; **no real authentication** |

## What needs a backend

These features are intentionally presented as demos and cannot truly work on a
static host:

- Real reservations, availability checks, rate calculation and confirmation emails
- Payments, deposits, refunds and invoices
- User accounts, sessions, password resets and access control
- Admin CRUD (rooms, bookings, guests, staff, content) and persistence
- Contact, dining and spa form submissions
- Newsletter subscriptions
- Live AI concierge answers

If you need these, connect a managed backend such as Supabase, Firebase,
Airtable, Formspree, Resend or a small Node/Express API, and keep GitHub Pages
for the static frontend.

**Important:** the demo login, profile and booking data are kept in
`localStorage` on the visitor's own device. Never enter real passwords, card
numbers, passport data or other sensitive guest information into the demo.

Demo sign-in accounts (clearly labelled on `/login`):

```
guest@hotel.com / password123
admin@hotel.com / admin123
```

---

## Local development

```powershell
cd "C:\Users\IPK COMPUTER\Desktop\Hotel\luxury-hotel"
npm install
npm run dev
```

Because `basePath` is set, open:

```
http://localhost:3000/skyshore-hotel/
```

The old root URL (`http://localhost:3000/`) will no longer serve the site.

## Production build

```powershell
npm run build
```

`prebuild` clears `.next` automatically (Turbopack's font cache can otherwise
fail on rebuilds). The static output is written to `out/`.

Preview the exported site locally:

```powershell
npx serve out
```

Then open `http://localhost:3000/skyshore-hotel/` (or the port `serve` prints)
and check that assets load under the `/skyshore-hotel/` prefix.

---

## GitHub Pages deployment

The workflow at `.github/workflows/deploy.yml`:

1. triggers on pushes to `main` and on manual runs,
2. installs dependencies with `npm ci`,
3. runs `npm run build`,
4. adds `out/.nojekyll`,
5. uploads `out/` as the Pages artifact and deploys it with the official
   GitHub Pages actions.

### First-time setup (PowerShell)

```powershell
cd "C:\Users\IPK COMPUTER\Desktop\Hotel\luxury-hotel"

# Initialise a new repository if this folder has no .git
git init

# Make sure the branch is named main
git branch -M main

git add .
git commit -m "Prepare Skyshore hotel site for GitHub Pages"

# Create the new repository and push (requires GitHub CLI)
gh repo create navodyaishari0-hash/skyshore-hotel --public --source=. --remote=origin --push
```

If the repository already exists, connect it instead:

```powershell
git remote add origin https://github.com/navodyaishari0-hash/skyshore-hotel.git
git push -u origin main
```

> Do not point this repository at `skyshore-taxi`. The taxi site is a separate
> project and must not be modified.

### Enable Pages

1. Open `https://github.com/navodyaishari0-hash/skyshore-hotel/settings/pages`
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to finish.
4. Visit `https://navodyaishari0-hash.github.io/skyshore-hotel/`.

You can also run the workflow manually from **Actions → Deploy to GitHub
Pages → Run workflow**.

---

## SEO

- Per-page titles, descriptions, Open Graph, Twitter cards and canonical URLs
- `src/lib/site.ts` holds the production URL; update `SITE_URL` there if the
  repository or username changes.
- `public/robots.txt` and `public/sitemap.xml`
- `/account`, `/admin`, `/auth` and `/login` are `noindex, nofollow`
- Favicon: `src/app/favicon.ico`

If you rename the repository or move to a custom domain, update:

1. `SITE_URL` in `src/lib/site.ts`
2. `basePath` in `next.config.ts` (remove it for a custom root domain)
3. every URL in `public/sitemap.xml` and `public/robots.txt`

---

## Interactive routes generated at build time

```
/                              /rooms
/rooms/kabana-1                /rooms/kabana-2
/booking                       /booking/confirmation
/account                       /account/bookings
/account/wishlist              /account/settings
/account/loyalty               /account/recently-viewed
/admin                         /admin/bookings
/admin/rooms                   /admin/guests
/admin/staff                   /admin/restaurant
/admin/spa                     /admin/events
/admin/payments                /admin/coupons
/admin/reviews                 /admin/gallery
/admin/blog                    /admin/notifications
/admin/reports                 /admin/analytics
/admin/settings                /login
/auth                          /privacy
/terms
```

`/admin/[section]` and `/account/[section]` use `generateStaticParams` with
`dynamicParams = false`, so only the sections above exist in the export.
