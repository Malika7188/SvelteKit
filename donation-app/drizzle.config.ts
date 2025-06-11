import type { Config } from "drizzle-kit";
import { projects } from './src/lib/db/schema';


export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",  // Changed from driver to dialect
  dbCredentials: {
    url: "./src/lib/db/sqlite.db"  // SQLite file path
  }
} satisfies Config;