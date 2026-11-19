import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  details: text("details").notNull().default(""),
  coverImage: text("cover_image").notNull(),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projectPhotos = pgTable("project_photos", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  caption: text("caption").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  quote: text("quote").notNull(),
  context: text("context").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const siteContent = pgTable("site_content", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  label: text("label").notNull(),
  group: text("group").notNull().default("General"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  projectType: text("project_type").notNull().default(""),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
