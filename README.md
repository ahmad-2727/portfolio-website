# Muhammad Ahmad Javed — Portfolio Website

Full-stack interactive portfolio with a 3D animated hero, dark theme, and a
working admin panel that collects contact-form messages.

## Stack

- **Frontend:** Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Three.js
- **Backend:** Next.js API routes, JSON-file storage (no external DB server needed)
- **Auth:** JWT-based admin session (httpOnly cookie)

## Getting started (local)

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the portfolio, and
http://localhost:3000/admin/login for the admin panel.

## Admin credentials

Set in `.env.local` (already created with defaults — **change these before
sharing or deploying**):

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123
ADMIN_JWT_SECRET=replace-this-with-a-long-random-string
```

Generate a strong random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Editing your content

All portfolio text (name, bio, skills, projects, experience, testimonials)
lives in one file: `lib/content.js`. Edit it there — no need to touch the
components.

## How the contact form + admin panel work

1. A visitor fills the form on the homepage -> POST /api/contact saves it
   to data/messages.json.
2. You log in at /admin/login with the credentials above.
3. /admin/dashboard shows every message, lets you mark read/unread or
   delete, and is protected — visiting it while logged out redirects to
   the login page.

## Database setup (Neon Postgres — free, permanent)

The app now supports a real database. If `DATABASE_URL` is set, messages
are stored in Postgres (permanent, survives every redeploy). If it's not
set, it falls back to the local `data/messages.json` file (fine for local
development only).

### Get a free Neon database (2 minutes, no credit card)

1. Go to [neon.tech](https://neon.tech) and sign up (GitHub login works)
2. Create a new project (any name, any region close to you)
3. On the project dashboard, copy the **connection string** — it looks like:
   ```
   postgresql://user:password@ep-xxxx.region.aws.neon.tech/dbname?sslmode=require
   ```
4. Add it as an environment variable named `DATABASE_URL`:
   - **Locally:** paste it into `.env.local`
   - **On Vercel:** Project Settings → Environment Variables → add `DATABASE_URL`

That's it — the app automatically creates the `messages` table on first
use. No manual SQL needed.

## Deployment notes

This project can run with or without a database:

- **With `DATABASE_URL` set (Neon):** messages persist forever, works
  perfectly on Vercel, Render, Railway — any platform.
- **Without it:** falls back to a JSON file, which only persists reliably
  on platforms with persistent disks (VPS, Railway, Render paid). It will
  reset on Vercel between deployments.

**Recommended:** always set `DATABASE_URL` in production.

## Build for production

```bash
npm run build
npm run start
```

## Project structure

```
app/
  page.js              -> homepage (all sections)
  layout.js            -> fonts + metadata
  admin/login/         -> admin login page
  admin/dashboard/     -> protected admin dashboard
  api/contact/         -> contact form endpoint
  api/admin/           -> login, logout, messages endpoints
components/            -> all UI sections (Hero, About, Skills, Projects...)
lib/content.js         -> ALL your editable content
lib/db.js               -> JSON file storage for messages
lib/auth.js             -> JWT signing/verification
middleware.js           -> protects /admin/dashboard
data/messages.json      -> stored contact messages (gitignored)
```
