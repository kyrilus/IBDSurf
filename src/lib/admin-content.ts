export const ADMIN_CONTENT_KEY = "ibd-admin-content-v1";
export const ADMIN_CONTENT_EVENT = "ibd:admin-content-change";

export type AdminField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image";
  defaultValue: string;
};

export type AdminSection = {
  title: string;
  fields: AdminField[];
};

export const adminSections: AdminSection[] = [
  {
    title: "Home",
    fields: [
      { key: "home.heading", label: "Surfboards heading", type: "text", defaultValue: "SURFBOARDS" },
      { key: "home.background", label: "Page background", type: "image", defaultValue: "/images/board-rails.jpg" },
      { key: "home.heroLogo", label: "Hero logo", type: "image", defaultValue: "/logos/IBD-Logo-outline-white.svg" },
    ],
  },
  {
    title: "Surfboards",
    fields: [
      { key: "surfboards.heading", label: "Page heading", type: "text", defaultValue: "SURFBOARDS" },
    ],
  },
  {
    title: "Custom Order",
    fields: [
      { key: "custom.heading", label: "Page heading", type: "text", defaultValue: "CUSTOM BOARD ORDER" },
      { key: "custom.background", label: "Page background", type: "image", defaultValue: "/images/board-noses-new.JPG" },
    ],
  },
  {
    title: "About",
    fields: [
      { key: "about.heading", label: "Page heading", type: "text", defaultValue: "ABOUT IBD" },
      { key: "about.image", label: "Page image", type: "image", defaultValue: "/images/background-sample.png" },
      { key: "about.eyebrow", label: "Small heading", type: "text", defaultValue: "Ian Blackmore Designs" },
      { key: "about.title", label: "Content heading", type: "text", defaultValue: "Built Around Feel" },
      { key: "about.body1", label: "Paragraph 1", type: "textarea", defaultValue: "Placeholder copy for Ian's story. Use this space to introduce his background, the path that led him to shaping surfboards, and the ideas behind Ian Blackmore Designs." },
      { key: "about.body2", label: "Paragraph 2", type: "textarea", defaultValue: "Placeholder copy for the shaping philosophy. This section can describe how each board begins with the surfer, the waves they ride, and the feeling they want under their feet." },
      { key: "about.body3", label: "Paragraph 3", type: "textarea", defaultValue: "Placeholder copy for materials, process, and craft. Add details about where the boards are shaped, how designs are refined, and what makes an IBD board distinct." },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "contact.heading", label: "Page heading", type: "text", defaultValue: "CONTACT IBD" },
      { key: "contact.image", label: "Page image", type: "image", defaultValue: "/images/hero/board-noses.png" },
      { key: "contact.eyebrow", label: "Small heading", type: "text", defaultValue: "Get In Touch" },
      { key: "contact.title", label: "Content heading", type: "text", defaultValue: "Start A Conversation" },
      { key: "contact.body", label: "Description", type: "textarea", defaultValue: "Placeholder copy for general questions, available boards, collaborations, or anything else related to Ian Blackmore Designs." },
      { key: "contact.email", label: "Email", type: "text", defaultValue: "ian@ibdesigns.us" },
      { key: "contact.phone", label: "Phone", type: "text", defaultValue: "Phone Placeholder" },
      { key: "contact.studio", label: "Studio", type: "text", defaultValue: "Location Placeholder" },
      { key: "contact.instagram", label: "Instagram", type: "text", defaultValue: "@ibdesigns.us" },
    ],
  },
  {
    title: "Footer",
    fields: [
      { key: "footer.title", label: "Brand heading", type: "text", defaultValue: "IAN BLACKMORE DESIGNS" },
      { key: "footer.description", label: "Description", type: "textarea", defaultValue: "Custom surfboards shaped with a focus on feel, speed, and lasting connection to the water." },
      { key: "footer.logoLight", label: "Logo — light mode", type: "image", defaultValue: "/logos/IBD-Logo-outline-black.svg" },
      { key: "footer.logoDark", label: "Logo — dark mode", type: "image", defaultValue: "/logos/IBD-Logo-outline-white.svg" },
    ],
  },
];

export type AdminContent = Record<string, string>;

export function getDefaultAdminContent(): AdminContent {
  return Object.fromEntries(
    adminSections.flatMap((section) => section.fields.map((field) => [field.key, field.defaultValue])),
  );
}
