import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  goal: integer('goal').notNull(),
  raised: integer('raised').notNull(),
});

export const donations = sqliteTable('donations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  project_id: integer('project_id').notNull(),
  amount: integer('amount').notNull(),
  mpesa_code: text('mpesa_code').notNull(),
  created_at: text('created_at').notNull(),
});
