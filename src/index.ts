import "dotenv/config";

import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless'

import { Elysia } from "elysia";
import { snippetsRouter } from "./routes/snippets";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

const app = new Elysia()
  // .use(projectsRouter)
  .use(snippetsRouter)
  // .use(formRouter)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);



