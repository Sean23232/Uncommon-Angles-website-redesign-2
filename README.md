# UnCommon Angles, Inc. — Website

A premium Next.js + PostgreSQL website for UnCommon Angles, a custom home builder founded in Buena Vista, Colorado by Matt Young in 1997. All project photography and testimonials come from the company's original website.

## Deploy to Vercel (recommended)

1. **Create a Git repository** with this folder. Do not commit `.env`, `node_modules`, or `.next` (`.gitignore` is included).
2. **Create a PostgreSQL database** with a provider such as Neon, Supabase, or Vercel Postgres, and copy its pooled connection string.
3. **Import the repository in Vercel.** Framework Preset: `Next.js`. Build command and output directory can be left at their defaults.
4. **Add Environment Variables** in Vercel:
   - `DATABASE_URL` — your PostgreSQL connection string. (`POSTGRES_URL` and `POSTGRES_PRISMA_URL` are also accepted.)
   - `ADMIN_PASSCODE` — *optional*. Set it to require a passcode for `/admin`.
5. **Deploy.** On the first request, the app creates its tables and loads the real projects, photographs, testimonials, and editable content automatically. No manual migration command is required.
6. Point your domain to the Vercel deployment and update social links in `/admin → Manage Content`.

> Uploaded photographs are stored directly in PostgreSQL as data URLs, so the serverless filesystem is never written to. Everything persists across Vercel deployments.

## Local development

```bash
cp .env.example .env   # then set DATABASE_URL
npm install
npm run dev
```

Open http://localhost:3000 and http://localhost:3000/admin.

For a local database you can also apply the schema explicitly with Drizzle:

```bash
npx drizzle-kit push
```

## Site management

Visit `/admin` for clearly labeled sections:

- **Manage Projects** — create, edit, feature, reorder, or remove projects and cover photos.
- **Manage Photos** — upload new photographs, edit captions, and remove outdated images from any project gallery.
- **Manage Reviews** — add, edit, feature, or remove customer testimonials.
- **Manage Content** — update headlines, phone, email, social profiles, and the review-platform link.
- **Inquiries** — read and manage contact-form submissions.

If `ADMIN_PASSCODE` is set, enter it once in the admin area to unlock management.

## Project structure

```
src/app/                 Pages and API routes (App Router)
  api/admin/             Admin saves, uploads, and access check
  api/inquiries/         Secure contact-form endpoint
  projects/[slug]/       Individual project detail pages
src/components/          Header, footer, gallery, carousel, forms, admin UI
src/components/admin/    Admin management panels and image uploader
src/db/                  Drizzle schema and pooled connection
src/lib/                 Seed content, queries, schema bootstrap
public/images/           Authentic project photography from uncommonangles.com
drizzle/                 Generated SQL migration (optional reference)
vercel.json              Vercel framework and image caching settings
.env.example             Environment variable template
```

## Notes on content integrity

Testimonials are reproduced as published on the original website, with original attribution and no invented ratings. Project titles describe the photographs in the company's archive rather than claiming unrecorded client names or locations. Instagram and LinkedIn URLs are intentionally blank until Matt supplies the real profiles; Facebook and Houzz links are the genuine profiles found for the company.
