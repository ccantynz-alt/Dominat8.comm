export type AdminAgentDef = {
  id: string;
  title: string;
  hint: string;
};

export type AdminBundleDef = {
  id: string;
  title: string;
  agentIds: string[];
  hint: string;
};

export const ADMIN_AGENTS: AdminAgentDef[] = [
  { id: "01_dispatcher", title: "01 Dispatcher", hint: "Routes tasks, validates system, creates a plan." },
  { id: "02_creative_director", title: "02 Creative Director", hint: "Copy/brand direction; headlines; angles." },
  { id: "03_seo", title: "03 SEO", hint: "SEO plan, keywords, metadata suggestions." },
  { id: "04_sitemap", title: "04 Sitemap", hint: "Sitemap/structure suggestions." },
  { id: "05_patch_writer", title: "05 Patch Writer", hint: "Outputs a PowerShell patch pack (text) when instructed." },
];

export const ADMIN_BUNDLES: AdminBundleDef[] = [
  {
    id: "bundle_marketing_machine_v1",
    title: "Bundle: Marketing Machine V1",
    agentIds: ["01_dispatcher", "02_creative_director", "03_seo", "04_sitemap", "05_patch_writer"],
    hint: "Plan → Copy angles → SEO → Sitemap → Patch Pack."
  }
];