CREATE TABLE `donations` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`amount` integer NOT NULL,
	`donated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
