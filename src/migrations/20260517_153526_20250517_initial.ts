import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_consulting_packages_tier" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_concepts_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_concepts_territory_status" AS ENUM('available', 'limited', 'sold');
  CREATE TYPE "public"."enum_concepts_difficulty_level" AS ENUM('low', 'medium', 'high');
  CREATE TYPE "public"."enum_locations_province" AS ENUM('BC', 'AB', 'ON', 'QC', 'MB', 'SK', 'NS', 'NB', 'PE', 'NL');
  CREATE TYPE "public"."enum_locations_region_type" AS ENUM('urban', 'suburban', 'small-city', 'rural');
  CREATE TYPE "public"."enum_territories_region" AS ENUM('metro-vancouver', 'fraser-valley', 'vancouver-island', 'okanagan', 'northern-bc', 'interior-bc', 'kootenays', 'peace-region');
  CREATE TYPE "public"."enum_territories_status" AS ENUM('available', 'limited', 'sold');
  CREATE TYPE "public"."enum_leads_lead_type" AS ENUM('consulting', 'concept', 'general');
  CREATE TYPE "public"."enum_leads_has_location" AS ENUM('yes', 'no', 'considering');
  CREATE TYPE "public"."enum_leads_startup_budget" AS ENUM('under-10k', '10k-30k', '30k-75k', '75k-150k', '150k-plus', 'unsure');
  CREATE TYPE "public"."enum_leads_launch_timeline" AS ENUM('asap', '1-3mo', '3-6mo', '6-12mo', 'exploring');
  CREATE TYPE "public"."enum_leads_stage" AS ENUM('new', 'reviewed', 'fit-call-booked', 'proposal-sent', 'won', 'lost', 'nurture');
  CREATE TYPE "public"."enum_crm_activities_activity_type" AS ENUM('call', 'email', 'meeting', 'proposal', 'note', 'stage-change');
  CREATE TYPE "public"."enum_resources_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_resources_category" AS ENUM('planning', 'financials', 'location', 'digital', 'funding', 'mindset', 'concepts');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TABLE "consulting_packages_best_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "consulting_packages_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "consulting_packages_not_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "consulting_packages_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "consulting_packages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"tier" "enum_consulting_packages_tier" NOT NULL,
  	"tagline" varchar,
  	"short_description" varchar NOT NULL,
  	"price_label" varchar,
  	"turnaround" varchar,
  	"cta_label" varchar DEFAULT 'Book a planning call' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "concepts_startup_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "concepts_included_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "concepts_founder_fit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"trait" varchar NOT NULL
  );
  
  CREATE TABLE "concepts_risks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"risk" varchar NOT NULL
  );
  
  CREATE TABLE "concepts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"placeholder_brand" varchar,
  	"status" "enum_concepts_status" DEFAULT 'draft' NOT NULL,
  	"category_id" integer NOT NULL,
  	"business_type" varchar NOT NULL,
  	"territory_status" "enum_concepts_territory_status" DEFAULT 'available' NOT NULL,
  	"ideal_locations" varchar NOT NULL,
  	"startup_cost_min" numeric NOT NULL,
  	"startup_cost_max" numeric NOT NULL,
  	"estimated_monthly_revenue_min" numeric,
  	"estimated_monthly_revenue_max" numeric,
  	"gross_margin_min" numeric,
  	"gross_margin_max" numeric,
  	"launch_timeline" varchar NOT NULL,
  	"royalty_terms" varchar,
  	"difficulty_level" "enum_concepts_difficulty_level" NOT NULL,
  	"short_description" varchar NOT NULL,
  	"customer_profile" varchar,
  	"revenue_model" varchar,
  	"description" jsonb NOT NULL,
  	"hero_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "concepts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"seo_title" varchar,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"province" "enum_locations_province",
  	"region_type" "enum_locations_region_type",
  	"intro_copy" varchar,
  	"seo_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "territories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"region" "enum_territories_region" NOT NULL,
  	"status" "enum_territories_status" DEFAULT 'available' NOT NULL,
  	"population" numeric,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"city" varchar,
  	"lead_type" "enum_leads_lead_type" NOT NULL,
  	"package_interest_id" integer,
  	"concept_interest_id" integer,
  	"category_param" varchar,
  	"location_param" varchar,
  	"business_type" varchar,
  	"has_location" "enum_leads_has_location",
  	"startup_budget" "enum_leads_startup_budget",
  	"launch_timeline" "enum_leads_launch_timeline",
  	"message" varchar,
  	"consent_timestamp" timestamp(3) with time zone,
  	"stage" "enum_leads_stage" DEFAULT 'new' NOT NULL,
  	"follow_up_date" timestamp(3) with time zone,
  	"notes" jsonb,
  	"lost_reason" varchar,
  	"source_u_r_l" varchar,
  	"utm_source" varchar,
  	"utm_medium" varchar,
  	"utm_campaign" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "crm_activities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"lead_id" integer NOT NULL,
  	"activity_type" "enum_crm_activities_activity_type" NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"notes" varchar,
  	"next_action_date" timestamp(3) with time zone,
  	"owner_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_resources_status" DEFAULT 'draft',
  	"category" "enum_resources_category",
  	"excerpt" varchar,
  	"content" jsonb NOT NULL,
  	"hero_image_id" integer,
  	"author" varchar DEFAULT 'The Business Barn',
  	"published_at" timestamp(3) with time zone,
  	"reading_time" numeric,
  	"related_package_id" integer,
  	"related_category_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"consulting_packages_id" integer,
  	"concepts_id" integer,
  	"categories_id" integer,
  	"locations_id" integer,
  	"territories_id" integer,
  	"leads_id" integer,
  	"crm_activities_id" integer,
  	"resources_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "consulting_packages_best_for" ADD CONSTRAINT "consulting_packages_best_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_packages_deliverables" ADD CONSTRAINT "consulting_packages_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_packages_not_included" ADD CONSTRAINT "consulting_packages_not_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consulting_packages_faq" ADD CONSTRAINT "consulting_packages_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consulting_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concepts_startup_requirements" ADD CONSTRAINT "concepts_startup_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concepts_included_materials" ADD CONSTRAINT "concepts_included_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concepts_founder_fit" ADD CONSTRAINT "concepts_founder_fit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concepts_risks" ADD CONSTRAINT "concepts_risks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concepts" ADD CONSTRAINT "concepts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "concepts" ADD CONSTRAINT "concepts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "concepts_rels" ADD CONSTRAINT "concepts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concepts_rels" ADD CONSTRAINT "concepts_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_package_interest_id_consulting_packages_id_fk" FOREIGN KEY ("package_interest_id") REFERENCES "public"."consulting_packages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_concept_interest_id_concepts_id_fk" FOREIGN KEY ("concept_interest_id") REFERENCES "public"."concepts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "crm_activities" ADD CONSTRAINT "crm_activities_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "crm_activities" ADD CONSTRAINT "crm_activities_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_related_package_id_consulting_packages_id_fk" FOREIGN KEY ("related_package_id") REFERENCES "public"."consulting_packages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_related_category_id_categories_id_fk" FOREIGN KEY ("related_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consulting_packages_fk" FOREIGN KEY ("consulting_packages_id") REFERENCES "public"."consulting_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_concepts_fk" FOREIGN KEY ("concepts_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_territories_fk" FOREIGN KEY ("territories_id") REFERENCES "public"."territories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_crm_activities_fk" FOREIGN KEY ("crm_activities_id") REFERENCES "public"."crm_activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "consulting_packages_best_for_order_idx" ON "consulting_packages_best_for" USING btree ("_order");
  CREATE INDEX "consulting_packages_best_for_parent_id_idx" ON "consulting_packages_best_for" USING btree ("_parent_id");
  CREATE INDEX "consulting_packages_deliverables_order_idx" ON "consulting_packages_deliverables" USING btree ("_order");
  CREATE INDEX "consulting_packages_deliverables_parent_id_idx" ON "consulting_packages_deliverables" USING btree ("_parent_id");
  CREATE INDEX "consulting_packages_not_included_order_idx" ON "consulting_packages_not_included" USING btree ("_order");
  CREATE INDEX "consulting_packages_not_included_parent_id_idx" ON "consulting_packages_not_included" USING btree ("_parent_id");
  CREATE INDEX "consulting_packages_faq_order_idx" ON "consulting_packages_faq" USING btree ("_order");
  CREATE INDEX "consulting_packages_faq_parent_id_idx" ON "consulting_packages_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "consulting_packages_slug_idx" ON "consulting_packages" USING btree ("slug");
  CREATE INDEX "consulting_packages_updated_at_idx" ON "consulting_packages" USING btree ("updated_at");
  CREATE INDEX "consulting_packages_created_at_idx" ON "consulting_packages" USING btree ("created_at");
  CREATE INDEX "concepts_startup_requirements_order_idx" ON "concepts_startup_requirements" USING btree ("_order");
  CREATE INDEX "concepts_startup_requirements_parent_id_idx" ON "concepts_startup_requirements" USING btree ("_parent_id");
  CREATE INDEX "concepts_included_materials_order_idx" ON "concepts_included_materials" USING btree ("_order");
  CREATE INDEX "concepts_included_materials_parent_id_idx" ON "concepts_included_materials" USING btree ("_parent_id");
  CREATE INDEX "concepts_founder_fit_order_idx" ON "concepts_founder_fit" USING btree ("_order");
  CREATE INDEX "concepts_founder_fit_parent_id_idx" ON "concepts_founder_fit" USING btree ("_parent_id");
  CREATE INDEX "concepts_risks_order_idx" ON "concepts_risks" USING btree ("_order");
  CREATE INDEX "concepts_risks_parent_id_idx" ON "concepts_risks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "concepts_slug_idx" ON "concepts" USING btree ("slug");
  CREATE INDEX "concepts_category_idx" ON "concepts" USING btree ("category_id");
  CREATE INDEX "concepts_hero_image_idx" ON "concepts" USING btree ("hero_image_id");
  CREATE INDEX "concepts_updated_at_idx" ON "concepts" USING btree ("updated_at");
  CREATE INDEX "concepts_created_at_idx" ON "concepts" USING btree ("created_at");
  CREATE INDEX "concepts_rels_order_idx" ON "concepts_rels" USING btree ("order");
  CREATE INDEX "concepts_rels_parent_idx" ON "concepts_rels" USING btree ("parent_id");
  CREATE INDEX "concepts_rels_path_idx" ON "concepts_rels" USING btree ("path");
  CREATE INDEX "concepts_rels_locations_id_idx" ON "concepts_rels" USING btree ("locations_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_og_image_idx" ON "categories" USING btree ("og_image_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "locations_slug_idx" ON "locations" USING btree ("slug");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "territories_updated_at_idx" ON "territories" USING btree ("updated_at");
  CREATE INDEX "territories_created_at_idx" ON "territories" USING btree ("created_at");
  CREATE INDEX "leads_package_interest_idx" ON "leads" USING btree ("package_interest_id");
  CREATE INDEX "leads_concept_interest_idx" ON "leads" USING btree ("concept_interest_id");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE INDEX "crm_activities_lead_idx" ON "crm_activities" USING btree ("lead_id");
  CREATE INDEX "crm_activities_owner_idx" ON "crm_activities" USING btree ("owner_id");
  CREATE INDEX "crm_activities_updated_at_idx" ON "crm_activities" USING btree ("updated_at");
  CREATE INDEX "crm_activities_created_at_idx" ON "crm_activities" USING btree ("created_at");
  CREATE UNIQUE INDEX "resources_slug_idx" ON "resources" USING btree ("slug");
  CREATE INDEX "resources_hero_image_idx" ON "resources" USING btree ("hero_image_id");
  CREATE INDEX "resources_related_package_idx" ON "resources" USING btree ("related_package_id");
  CREATE INDEX "resources_related_category_idx" ON "resources" USING btree ("related_category_id");
  CREATE INDEX "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_consulting_packages_id_idx" ON "payload_locked_documents_rels" USING btree ("consulting_packages_id");
  CREATE INDEX "payload_locked_documents_rels_concepts_id_idx" ON "payload_locked_documents_rels" USING btree ("concepts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_territories_id_idx" ON "payload_locked_documents_rels" USING btree ("territories_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_locked_documents_rels_crm_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("crm_activities_id");
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "consulting_packages_best_for" CASCADE;
  DROP TABLE "consulting_packages_deliverables" CASCADE;
  DROP TABLE "consulting_packages_not_included" CASCADE;
  DROP TABLE "consulting_packages_faq" CASCADE;
  DROP TABLE "consulting_packages" CASCADE;
  DROP TABLE "concepts_startup_requirements" CASCADE;
  DROP TABLE "concepts_included_materials" CASCADE;
  DROP TABLE "concepts_founder_fit" CASCADE;
  DROP TABLE "concepts_risks" CASCADE;
  DROP TABLE "concepts" CASCADE;
  DROP TABLE "concepts_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "territories" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "crm_activities" CASCADE;
  DROP TABLE "resources" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_consulting_packages_tier";
  DROP TYPE "public"."enum_concepts_status";
  DROP TYPE "public"."enum_concepts_territory_status";
  DROP TYPE "public"."enum_concepts_difficulty_level";
  DROP TYPE "public"."enum_locations_province";
  DROP TYPE "public"."enum_locations_region_type";
  DROP TYPE "public"."enum_territories_region";
  DROP TYPE "public"."enum_territories_status";
  DROP TYPE "public"."enum_leads_lead_type";
  DROP TYPE "public"."enum_leads_has_location";
  DROP TYPE "public"."enum_leads_startup_budget";
  DROP TYPE "public"."enum_leads_launch_timeline";
  DROP TYPE "public"."enum_leads_stage";
  DROP TYPE "public"."enum_crm_activities_activity_type";
  DROP TYPE "public"."enum_resources_status";
  DROP TYPE "public"."enum_resources_category";
  DROP TYPE "public"."enum_users_role";`)
}
