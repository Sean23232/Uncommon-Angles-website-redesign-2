import { pool } from "@/db";

/**
 * Self-contained, idempotent schema setup for serverless deployments.
 * The first request on a fresh database creates all tables before seeding,
 * so Vercel needs no manual `drizzle-kit push` step.
 */
const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS projects (
    id serial PRIMARY KEY NOT NULL,
    slug text NOT NULL UNIQUE,
    title text NOT NULL,
    category text NOT NULL,
    description text NOT NULL,
    details text DEFAULT '' NOT NULL,
    cover_image text NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp DEFAULT now() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS project_photos (
    id serial PRIMARY KEY NOT NULL,
    project_id integer NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    url text NOT NULL,
    caption text DEFAULT '' NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS testimonials (
    id serial PRIMARY KEY NOT NULL,
    author text NOT NULL,
    quote text NOT NULL,
    context text DEFAULT '' NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp DEFAULT now() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS site_content (
    key text PRIMARY KEY NOT NULL,
    value text NOT NULL,
    label text NOT NULL,
    "group" text DEFAULT 'General' NOT NULL,
    updated_at timestamp DEFAULT now() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS inquiries (
    id serial PRIMARY KEY NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text DEFAULT '' NOT NULL,
    project_type text DEFAULT '' NOT NULL,
    message text NOT NULL,
    created_at timestamp DEFAULT now() NOT NULL
  )`,
];

let schemaPromise: Promise<void> | null = null;

export async function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const client = await pool.connect();
      try {
        await client.query("SELECT pg_advisory_lock(hashtext('uncommon_angles_schema'))");
        for (const statement of SCHEMA_STATEMENTS) {
          await client.query(statement);
        }
      } finally {
        try {
          await client.query("SELECT pg_advisory_unlock(hashtext('uncommon_angles_schema'))");
        } finally {
          client.release();
        }
      }
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}
