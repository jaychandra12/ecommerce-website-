import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { db } from "@db";
import { products, drops, lifestylePosts, reviews } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up auth routes
  setupAuth(app);

  // Get featured products
  app.get("/api/products/featured", async (req, res) => {
    try {
      const featuredProducts = await db.query.products.findMany({
        where: eq(products.isFeatured, true),
        orderBy: products.createdAt,
        limit: 8,
      });
      res.json(featuredProducts);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  // Get all products with optional filters
  app.get("/api/products", async (req, res) => {
    try {
      // Extract query parameters
      const { brand, size, minPrice, maxPrice, sort } = req.query;

      // TODO: Add filtering logic based on query parameters

      const allProducts = await db.query.products.findMany();
      res.json(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await db.query.products.findFirst({
        where: eq(products.id, productId),
        with: {
          reviews: true,
        },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get related products
  app.get("/api/products/related/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await db.query.products.findFirst({
        where: eq(products.id, productId),
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Get products with the same brand
      const relatedProducts = await db.query.products.findMany({
        where: eq(products.brand, product.brand),
        limit: 4,
      });

      // Filter out the current product
      const filteredProducts = relatedProducts.filter(
        (related) => related.id !== productId
      );

      res.json(filteredProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
      res.status(500).json({ message: "Failed to fetch related products" });
    }
  });

  // Get all drops (upcoming and past)
  app.get("/api/drops", async (req, res) => {
    try {
      const allDrops = await db.query.drops.findMany();
      
      const now = new Date();
      const upcoming = allDrops.filter(
        (drop) => new Date(drop.releaseDate) > now
      );
      const past = allDrops.filter(
        (drop) => new Date(drop.releaseDate) <= now
      );

      res.json({ upcoming, past });
    } catch (error) {
      console.error("Error fetching drops:", error);
      res.status(500).json({ message: "Failed to fetch drops" });
    }
  });

  // Get all lifestyle posts
  app.get("/api/lifestyle", async (req, res) => {
    try {
      const posts = await db.query.lifestylePosts.findMany({
        orderBy: lifestylePosts.date,
      });
      res.json(posts);
    } catch (error) {
      console.error("Error fetching lifestyle posts:", error);
      res.status(500).json({ message: "Failed to fetch lifestyle posts" });
    }
  });

  // Get lifestyle post by ID
  app.get("/api/lifestyle/:id", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const post = await db.query.lifestylePosts.findFirst({
        where: eq(lifestylePosts.id, postId),
      });

      if (!post) {
        return res.status(404).json({ message: "Lifestyle post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching lifestyle post:", error);
      res.status(500).json({ message: "Failed to fetch lifestyle post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
