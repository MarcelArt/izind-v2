CREATE TABLE "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"nik" text NOT NULL,
	"name" text NOT NULL,
	"place_of_birth" text NOT NULL,
	"date_of_birth" timestamp,
	"gender" text,
	"address" text NOT NULL,
	"rt" text NOT NULL,
	"rw" text NOT NULL,
	"village" text NOT NULL,
	"district" text NOT NULL,
	"city" text NOT NULL,
	"religion" text NOT NULL,
	"marital_status" text NOT NULL,
	"job" text NOT NULL,
	"nationality" text NOT NULL,
	"blood_type" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "profile_userId_idx" ON "profile" USING btree ("user_id");