import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const dbPath = './src/lib/db/sqlite.db'; // 👈 Make sure this matches
console.log('Using SQLite DB at:', dbPath);

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
