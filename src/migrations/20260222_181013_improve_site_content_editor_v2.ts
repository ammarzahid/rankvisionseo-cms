import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_content_header_nav_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_header_nav_links_order_idx\` ON \`site_content_header_nav_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_header_nav_links_parent_id_idx\` ON \`site_content_header_nav_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_hero_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_hero_stats_order_idx\` ON \`site_content_hero_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_hero_stats_parent_id_idx\` ON \`site_content_hero_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon\` text,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_services_items_order_idx\` ON \`site_content_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_services_items_parent_id_idx\` ON \`site_content_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_process_steps_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content_process_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_process_steps_details_order_idx\` ON \`site_content_process_steps_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_process_steps_details_parent_id_idx\` ON \`site_content_process_steps_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_process_steps_order_idx\` ON \`site_content_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_process_steps_parent_id_idx\` ON \`site_content_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_results_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_results_metrics_order_idx\` ON \`site_content_results_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_results_metrics_parent_id_idx\` ON \`site_content_results_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_results_case_studies_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content_results_case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_results_case_studies_tags_order_idx\` ON \`site_content_results_case_studies_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_results_case_studies_tags_parent_id_idx\` ON \`site_content_results_case_studies_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_results_case_studies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`industry\` text,
  	\`metric\` text,
  	\`timeframe\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_results_case_studies_order_idx\` ON \`site_content_results_case_studies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_results_case_studies_parent_id_idx\` ON \`site_content_results_case_studies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_cta_checklist\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_cta_checklist_order_idx\` ON \`site_content_cta_checklist\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_cta_checklist_parent_id_idx\` ON \`site_content_cta_checklist\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_footer_groups_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content_footer_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_footer_groups_links_order_idx\` ON \`site_content_footer_groups_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_footer_groups_links_parent_id_idx\` ON \`site_content_footer_groups_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_content_footer_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_content_footer_groups_order_idx\` ON \`site_content_footer_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_content_footer_groups_parent_id_idx\` ON \`site_content_footer_groups\` (\`_parent_id\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`data\` text DEFAULT '{"seo":{"title":"Rank Vision SEO - AI-Powered SEO Agency","description":"Default description","jsonLd":{"@context":"https://schema.org","@type":"ProfessionalService"}}}',
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_json_ld\` text,
  	\`header_cta_label\` text,
  	\`hero_badge\` text,
  	\`hero_heading_line1\` text,
  	\`hero_heading_highlight\` text,
  	\`hero_heading_line2\` text,
  	\`hero_description\` text,
  	\`hero_primary_cta_label\` text,
  	\`hero_primary_cta_href\` text,
  	\`hero_secondary_cta_label\` text,
  	\`hero_secondary_cta_href\` text,
  	\`services_eyebrow\` text,
  	\`services_heading_line1\` text,
  	\`services_heading_line2\` text,
  	\`services_description\` text,
  	\`process_eyebrow\` text,
  	\`process_heading_line1\` text,
  	\`process_heading_line2\` text,
  	\`results_eyebrow\` text,
  	\`results_heading_line1\` text,
  	\`results_heading_line2\` text,
  	\`cta_badge\` text,
  	\`cta_heading_line1\` text,
  	\`cta_heading_line2\` text,
  	\`cta_description\` text,
  	\`cta_form_name_label\` text,
  	\`cta_form_email_label\` text,
  	\`cta_form_website_label\` text,
  	\`cta_form_message_label\` text,
  	\`cta_form_submit_label\` text,
  	\`cta_form_footnote\` text,
  	\`footer_description\` text,
  	\`footer_status\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_content\`("id", "data", "seo_title", "seo_description", "seo_json_ld", "header_cta_label", "hero_badge", "hero_heading_line1", "hero_heading_highlight", "hero_heading_line2", "hero_description", "hero_primary_cta_label", "hero_primary_cta_href", "hero_secondary_cta_label", "hero_secondary_cta_href", "services_eyebrow", "services_heading_line1", "services_heading_line2", "services_description", "process_eyebrow", "process_heading_line1", "process_heading_line2", "results_eyebrow", "results_heading_line1", "results_heading_line2", "cta_badge", "cta_heading_line1", "cta_heading_line2", "cta_description", "cta_form_name_label", "cta_form_email_label", "cta_form_website_label", "cta_form_message_label", "cta_form_submit_label", "cta_form_footnote", "footer_description", "footer_status", "updated_at", "created_at") SELECT "id", "data", "seo_title", "seo_description", "seo_json_ld", "header_cta_label", "hero_badge", "hero_heading_line1", "hero_heading_highlight", "hero_heading_line2", "hero_description", "hero_primary_cta_label", "hero_primary_cta_href", "hero_secondary_cta_label", "hero_secondary_cta_href", "services_eyebrow", "services_heading_line1", "services_heading_line2", "services_description", "process_eyebrow", "process_heading_line1", "process_heading_line2", "results_eyebrow", "results_heading_line1", "results_heading_line2", "cta_badge", "cta_heading_line1", "cta_heading_line2", "cta_description", "cta_form_name_label", "cta_form_email_label", "cta_form_website_label", "cta_form_message_label", "cta_form_submit_label", "cta_form_footnote", "footer_description", "footer_status", "updated_at", "created_at" FROM \`site_content\`;`)
  await db.run(sql`DROP TABLE \`site_content\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_content\` RENAME TO \`site_content\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_content_header_nav_links\`;`)
  await db.run(sql`DROP TABLE \`site_content_hero_stats\`;`)
  await db.run(sql`DROP TABLE \`site_content_services_items\`;`)
  await db.run(sql`DROP TABLE \`site_content_process_steps_details\`;`)
  await db.run(sql`DROP TABLE \`site_content_process_steps\`;`)
  await db.run(sql`DROP TABLE \`site_content_results_metrics\`;`)
  await db.run(sql`DROP TABLE \`site_content_results_case_studies_tags\`;`)
  await db.run(sql`DROP TABLE \`site_content_results_case_studies\`;`)
  await db.run(sql`DROP TABLE \`site_content_cta_checklist\`;`)
  await db.run(sql`DROP TABLE \`site_content_footer_groups_links\`;`)
  await db.run(sql`DROP TABLE \`site_content_footer_groups\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`data\` text DEFAULT '{"seo":{"title":"Rank Vision SEO - AI-Powered SEO Agency","description":"Default description","jsonLd":{"@context":"https://schema.org","@type":"ProfessionalService"}}}' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_content\`("id", "data", "updated_at", "created_at") SELECT "id", "data", "updated_at", "created_at" FROM \`site_content\`;`)
  await db.run(sql`DROP TABLE \`site_content\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_content\` RENAME TO \`site_content\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}
