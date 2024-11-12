import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const projectTable = pgTable("projects", {
  description: varchar({ length: 255 }).notNull(),
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 155 }).notNull(),
  type: varchar({ length: 18 }).notNull(),
});
