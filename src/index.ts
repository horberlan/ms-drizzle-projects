import "dotenv/config";
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless'
import { cors } from '@elysiajs/cors';
import { Elysia } from "elysia";
import { snippetsRouter } from "./routes/snippets";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

const apiKeyAuth = (app: Elysia) =>
  app.derive(({ request, set }) => {
    const apiKey = request.headers.get('X-API-Key');
    if (apiKey !== process.env.API_KEY) {
      set.status = 401;
      throw new Error('Unauthorized');
    }
  });

const app = new Elysia()
  .use(cors({
    methods: ['GET', 'PUT', 'PATCH'],
  }))
  .use(apiKeyAuth)
  .use(snippetsRouter)
  .onError(({ error, set }) => {
    if (error.message === 'Unauthorized') {
      set.status = 401;
      return 'Unauthorized';
    }
    set.status = 500;
    return 'Internal Server Error';
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);