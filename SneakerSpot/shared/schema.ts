import { pgTable, text, serial, integer, boolean, numeric, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  images: jsonb("images").$type<string[]>(),
  availableSizes: jsonb("available_sizes").$type<number[]>(),
  features: jsonb("features").$type<string[]>(),
  rating: numeric("rating", { precision: 3, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull(),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products);
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id).notNull(),
  author: text("author").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

export const productsRelations = relations(products, ({ many }) => ({
  reviews: many(reviews),
}));

// Drops table
export const drops = pgTable("drops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  imageUrl: text("image_url").notNull(),
  releaseDate: timestamp("release_date").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(), // 'upcoming' or 'sold-out'
});

export type Drop = typeof drops.$inferSelect;

// Lifestyle posts table
export const lifestylePosts = pgTable("lifestyle_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  content: text("content"),
});

export type LifestylePost = typeof lifestylePosts.$inferSelect;
