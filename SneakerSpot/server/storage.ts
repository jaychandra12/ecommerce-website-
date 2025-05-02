import { db } from "@db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { InsertUser, User } from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "@db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUserByUsername(username: string): Promise<User | undefined>;
  getUser(id: number): Promise<User>;
  createUser(userData: InsertUser): Promise<User>;
  sessionStore: session.SessionStore;
}

class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
      tableName: 'session'
    });
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    
    return results[0];
  }

  async getUser(id: number): Promise<User> {
    const results = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    
    if (!results[0]) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    return results[0];
  }

  async createUser(userData: InsertUser): Promise<User> {
    const results = await db
      .insert(users)
      .values(userData)
      .returning();
    
    return results[0];
  }
}

export const storage = new DatabaseStorage();
