CREATE TABLE "educations" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"school" text NOT NULL,
	"degree" text NOT NULL,
	"field_of_study" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"grade" text,
	"max_grade" text,
	"description" text,
	"document_id" integer NOT NULL,
	"profile_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "educations" ADD CONSTRAINT "educations_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "educations" ADD CONSTRAINT "educations_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;