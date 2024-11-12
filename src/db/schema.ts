import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const projectTable = pgTable("projects", {
  background: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 155 }).notNull(),
  type: varchar({ length: 18 }).notNull(),
  href: varchar({ length: 255 }),
});
