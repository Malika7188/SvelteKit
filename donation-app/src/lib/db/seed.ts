import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';
import path from 'path';

const sqlite = new Database(path.resolve('./src/lib/db/sqlite.db'));
const db = drizzle(sqlite, { schema });

await db.insert(schema.projects).values([
  {
    title: 'Water Project in Turkana',
    description: 'Helping bring clean water to Turkana.',
    goal: 100000,
    raised: 5000,
  },
  {
    title: 'Girls Education Fund',
    description: 'Sponsoring girls through high school.',
    goal: 150000,
    raised: 10000,
  },
]);

console.log('🌱 Seeded database with sample projects.');
