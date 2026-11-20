import { boolean, jsonb, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

/** Satu baris per (section, bahasa). `data` = objek section persis seperti di frontend/src/content/home.ts */
export const siteContent = pgTable(
  "site_content",
  {
    key: text("key").notNull(),
    locale: text("locale").notNull().default("en"),
    data: jsonb("data").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.key, t.locale] })],
);

export const enquiries = pgTable("enquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  company: text("company").notNull(),
  contact: text("contact").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  occupations: text("occupations"),
  places: text("places"),
  startDate: text("start_date"),
  message: text("message"),
  handled: boolean("handled").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
