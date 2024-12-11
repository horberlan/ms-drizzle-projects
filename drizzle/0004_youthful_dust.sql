CREATE TABLE IF NOT EXISTS "snippets" (
	"_id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"updated_date" timestamp,
	"snippet" text,
	"details" text,
	"stars" integer,
	"avatar_url" varchar(255)
);
