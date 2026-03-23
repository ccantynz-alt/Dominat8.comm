export type ScaffoldTemplate = {
  id: string;
  name: string;
  category: string;
  description: string;
  keywords: string[];
  html: string;
};

function makeScaffold(
  id: string, name: string, category: string, description: string,
  keywords: string[], heroTitle: string, heroSub: string, features: string[]
): ScaffoldTemplate {
  const featureCards = features.map(f => `<div style="padding:18px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)"><div style="font-size:14px;font-weight:700;color:#f0ecff">${f}</div></div>`).join("\n          ");
  return {
    id, name, category, description, keywords,
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name}</title></head>
<body style="margin:0;min-height:100vh;background:radial-gradient(1200px 800px at 65% 5%,rgba(168,85,247,0.18),transparent 60%),radial-gradient(900px 700px at 15% 20%,rgba(59,130,246,0.12),transparent 62%),linear-gradient(180deg,#07070B,#05050A);color:#EDEAF7;font-family:system-ui,sans-serif">
  <nav style="max-width:1100px;margin:0 auto;padding:18px 16px;display:flex;justify-content:space-between;align-items:center">
    <div style="font-weight:800;font-size:14px;letter-spacing:0.12em;text-transform:uppercase">${name}</div>
    <div style="display:flex;gap:12px"><a href="#features" style="color:rgba(237,234,247,0.7);text-decoration:none;font-size:13px">Features</a><a href="#cta" style="color:rgba(237,234,247,0.7);text-decoration:none;font-size:13px">Get Started</a></div>
  </nav>
  <main style="max-width:1100px;margin:0 auto;padding:60px 16px;text-align:center">
    <div style="display:inline-block;padding:6px 14px;border-radius:999px;background:rgba(168,85,247,0.12);border:1px solid rgba(255,255,255,0.1);font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(237,234,247,0.8)">${category}</div>
    <h1 style="margin:20px 0 0;font-size:48px;font-weight:900;letter-spacing:-0.02em;line-height:1.05;color:#F6F2FF">${heroTitle}</h1>
    <p style="margin:16px auto 0;max-width:560px;font-size:17px;line-height:1.6;color:rgba(237,234,247,0.65)">${heroSub}</p>
    <div style="margin-top:28px;display:flex;gap:12px;justify-content:center">
      <a href="#cta" style="padding:13px 26px;border-radius:12px;background:linear-gradient(90deg,rgba(168,85,247,1),rgba(59,130,246,1));color:#07070B;font-weight:800;font-size:14px;text-decoration:none;box-shadow:0 16px 50px rgba(168,85,247,0.25)">Get Started Free</a>
      <a href="#features" style="padding:13px 26px;border-radius:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:rgba(237,234,247,0.85);font-weight:700;font-size:14px;text-decoration:none">Learn More</a>
    </div>
  </main>
  <section id="features" style="max-width:1100px;margin:0 auto;padding:40px 16px">
    <h2 style="text-align:center;font-size:28px;font-weight:900;margin:0 0 30px;color:#F6F2FF">What We Offer</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
      ${featureCards}
    </div>
  </section>
  <section id="cta" style="max-width:700px;margin:50px auto;padding:40px;text-align:center;border-radius:20px;border:1px solid rgba(255,255,255,0.1);background:linear-gradient(180deg,rgba(168,85,247,0.06),rgba(59,130,246,0.03))">
    <h2 style="font-size:28px;font-weight:900;margin:0;color:#F6F2FF">Ready to get started?</h2>
    <p style="margin:10px 0 0;color:rgba(237,234,247,0.6);font-size:14px">Join thousands of businesses already growing with us.</p>
    <a href="#" style="display:inline-block;margin-top:20px;padding:13px 28px;border-radius:12px;background:linear-gradient(90deg,rgba(168,85,247,1),rgba(59,130,246,1));color:#07070B;font-weight:800;font-size:14px;text-decoration:none">Start Now</a>
  </section>
  <footer style="max-width:1100px;margin:0 auto;padding:30px 16px;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;font-size:12px;color:rgba(237,234,247,0.4)">
    <div>&copy; 2026 ${name}</div><div>Built with Dominat8</div>
  </footer>
</body>
</html>`,
  };
}

export const SCAFFOLD_TEMPLATES: ScaffoldTemplate[] = [
  makeScaffold("saas", "SaaS Pro", "SaaS", "High-converting SaaS landing page", ["saas", "software", "app", "platform", "tool", "startup", "tech"],
    "Ship software that sells itself", "Build, launch, and scale your SaaS product with a landing page that converts visitors into customers.",
    ["Conversion-Optimized Layout", "Pricing Tiers Display", "Feature Showcase Grid", "Customer Testimonials", "Integration Badges", "Free Trial CTA"]),
  makeScaffold("restaurant", "Restaurant Elite", "Restaurant", "Premium restaurant website", ["restaurant", "food", "dining", "menu", "cafe", "bistro", "chef", "eat"],
    "A dining experience worth sharing", "Showcase your menu, ambiance, and story. Let guests reserve tables and explore your culinary world.",
    ["Interactive Menu Display", "Reservation System", "Photo Gallery", "Chef Story Section", "Location & Hours", "Reviews & Ratings"]),
  makeScaffold("portfolio", "Portfolio Minimal", "Portfolio", "Clean creative portfolio", ["portfolio", "creative", "designer", "developer", "artist", "work", "freelance"],
    "Work that speaks for itself", "A minimal, elegant portfolio to showcase your best projects and attract premium clients.",
    ["Project Showcase Grid", "Case Study Layouts", "About & Skills", "Client Testimonials", "Contact Form", "Resume Download"]),
  makeScaffold("ecommerce", "Shop Modern", "E-commerce", "Modern e-commerce storefront", ["shop", "store", "ecommerce", "products", "buy", "sell", "retail", "commerce"],
    "Shop smarter, live better", "A modern shopping experience with beautiful product displays and seamless checkout.",
    ["Product Grid Layout", "Cart & Checkout", "Category Navigation", "Size & Color Filters", "Wishlist Feature", "Secure Payments"]),
  makeScaffold("agency", "Agency Bold", "Agency", "Bold digital agency site", ["agency", "marketing", "digital", "creative", "branding", "design", "media"],
    "We build brands that break through", "A bold agency presence that showcases capabilities and wins premium retainers.",
    ["Case Study Showcase", "Team Profiles", "Services Grid", "Client Logo Wall", "Process Timeline", "Contact & Brief Form"]),
  makeScaffold("startup", "Startup Launch", "Startup", "Investor-ready startup page", ["startup", "funding", "pitch", "investor", "launch", "venture", "seed"],
    "The next big thing starts here", "Present your vision, traction, and team to investors with a page that commands attention.",
    ["Problem/Solution Frame", "Traction Metrics", "Team Grid", "Investor CTA", "Press Mentions", "Product Demo Video"]),
  makeScaffold("consultant", "Consultant Pro", "Consulting", "Authority consulting site", ["consultant", "consulting", "advisor", "expert", "coach", "strategy", "business"],
    "Expert guidance, proven results", "Position yourself as the go-to authority with a site that builds trust and books calls.",
    ["Methodology Section", "Results & Case Studies", "Testimonial Wall", "Booking Calendar", "Speaking & Media", "Free Resource Download"]),
  makeScaffold("fitness", "FitLife", "Fitness", "Fitness & gym website", ["fitness", "gym", "workout", "training", "health", "personal trainer", "yoga", "crossfit"],
    "Transform your body, transform your life", "Motivate visitors to sign up with energetic design and clear program paths.",
    ["Class Schedule Grid", "Trainer Profiles", "Membership Tiers", "Transformation Gallery", "Free Trial CTA", "Location & Facilities"]),
  makeScaffold("realestate", "Property Elite", "Real Estate", "Premium real estate site", ["realestate", "property", "homes", "real estate", "housing", "realtor", "broker"],
    "Find your dream home", "Showcase listings with stunning visuals and make it easy for buyers to connect.",
    ["Featured Listings", "Search & Filter", "Virtual Tour Links", "Agent Profiles", "Neighborhood Guides", "Mortgage Calculator"]),
  makeScaffold("photographer", "Lens Studio", "Photography", "Photographer portfolio", ["photographer", "photography", "photos", "camera", "wedding", "portrait", "studio"],
    "Every frame tells a story", "A visual-first portfolio that lets your photography do the talking.",
    ["Full-Width Gallery", "Portfolio Categories", "Booking Calendar", "Pricing Packages", "Client Testimonials", "About & Process"]),
  makeScaffold("dentist", "Smile Dental", "Healthcare", "Dental practice website", ["dentist", "dental", "teeth", "orthodontist", "smile", "clinic", "oral"],
    "Your healthiest smile starts here", "A warm, trustworthy dental practice site that makes booking appointments effortless.",
    ["Services Overview", "Team & Credentials", "Patient Testimonials", "Insurance Accepted", "Online Booking", "Emergency Contact"]),
  makeScaffold("lawyer", "Legal Edge", "Legal", "Law firm website", ["lawyer", "attorney", "law", "legal", "firm", "court", "justice"],
    "Serious representation, superior results", "A commanding law firm presence that builds confidence and generates consultations.",
    ["Practice Areas", "Attorney Profiles", "Case Results", "Client Reviews", "Free Consultation CTA", "Blog & Resources"]),
  makeScaffold("nonprofit", "Impact Hub", "Nonprofit", "Nonprofit organization site", ["nonprofit", "charity", "foundation", "donate", "cause", "volunteer", "ngo"],
    "Together, we make a difference", "Inspire donations and volunteer signups with a mission-driven website.",
    ["Mission Statement", "Impact Metrics", "Donate Now CTA", "Volunteer Signup", "Stories & Updates", "Partner Logos"]),
  makeScaffold("blog", "WriteSpace", "Blog", "Modern blog platform", ["blog", "writing", "content", "articles", "publication", "journal", "news", "magazine"],
    "Ideas that move people", "A clean, readable blog that keeps readers engaged and coming back for more.",
    ["Featured Post Hero", "Category Navigation", "Author Profiles", "Newsletter Signup", "Reading Time Estimates", "Related Posts"]),
  makeScaffold("coach", "CoachPro", "Coaching", "Life/business coaching site", ["coach", "coaching", "mentor", "life coach", "business coach", "mindset", "growth"],
    "Unlock your full potential", "A transformational coaching website that converts visitors into clients.",
    ["Coaching Programs", "Success Stories", "Free Discovery Call", "Video Introduction", "Methodology Overview", "Resource Library"]),
];

export function getScaffoldById(id: string): ScaffoldTemplate | null {
  return SCAFFOLD_TEMPLATES.find((t) => t.id === id) ?? null;
}
