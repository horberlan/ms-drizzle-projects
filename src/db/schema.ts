import { integer, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2"
import { sql } from "drizzle-orm";

export const projectTable = pgTable("projects", {
  background: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  title: varchar({ length: 155 }).notNull(),
  type: varchar({ length: 18 }).notNull(),
  href: varchar({ length: 255 }),
});

export const snippetsTable = pgTable("snippets", {
  _id: text("_id").$defaultFn(() => createId()).primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  updated_date: timestamp("updated_date").$defaultFn(() => sql`CURRENT_TIMESTAMP`),
  snippet: text("snippet"),
  details: text("details"),
  stars: integer("stars").$defaultFn(() => 0),
  avatar_url: varchar({ length: 255 }),
});