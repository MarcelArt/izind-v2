CREATE TYPE "public"."blood_types" AS ENUM('A', 'B', 'AB', 'O');--> statement-breakpoint
CREATE TYPE "public"."genders" AS ENUM('L', 'P');--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"filename" text NOT NULL,
	"path" text NOT NULL,
	"type" text NOT NULL,
	"tags" text[],
	"profile_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "gender" SET DATA TYPE "public"."genders" USING "gender"::"public"."genders";--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "blood_type" SET DATA TYPE "public"."blood_types" USING "blood_type"::"public"."blood_types";--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "document_profileId_idx" ON "documents" USING btree ("profile_id");