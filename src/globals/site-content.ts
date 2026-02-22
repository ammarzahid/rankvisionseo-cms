 import type { GlobalConfig } from "payload";

  export const SiteContent: GlobalConfig = {
    slug: "site-content",
    label: "Site Content",
    access: {
      read: () => true,
    },
    fields: [
      {
        name: "data",
        type: "json",
        required: true,
        defaultValue: {
          seo: {
            title: "Rank Vision SEO - AI-Powered SEO Agency",
            description: "Default description",
            jsonLd: { "@context": "https://schema.org", "@type": "ProfessionalService" }
          }
        }
      }
    ]
  };
