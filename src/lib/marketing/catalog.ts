export type UseCase = {
  slug: string;
  title: string;
  summary: string;
  whoItsFor: string[];
  outcomes: string[];
  pagesYouGet: string[];
  keywords: string[];
};

export type Template = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
};

export const TEMPLATES: Template[] = [
  { slug: "local-services", name: "Local Services", description: "Perfect for tradies, shuttles, cleaning, repairs.", tags: ["Local", "Lead-gen"] },
  { slug: "saas-launch", name: "SaaS Launch", description: "Ship a clean product landing page with pricing + FAQs.", tags: ["SaaS", "Conversion"] },
  { slug: "real-estate", name: "Real Estate Agent", description: "Listings, credibility, contact capture, and FAQs.", tags: ["Local", "Trust"] },
  { slug: "restaurant", name: "Restaurant", description: "Menu, booking, location, and promo blocks.", tags: ["Hospitality", "Bookings"] },
  { slug: "portfolio", name: "Portfolio", description: "A sharp personal site with work, about, and contact.", tags: ["Personal", "Showcase"] },
  { slug: "gym", name: "Gym / Fitness", description: "Programs, testimonials, pricing, and call booking.", tags: ["Fitness", "Conversion"] },
  { slug: "agency", name: "Agency", description: "Services, case studies, process, and contact.", tags: ["B2B", "Credibility"] },
  { slug: "ecommerce-lite", name: "Ecommerce Lite", description: "Product highlights + buy links + SEO pages.", tags: ["Commerce", "SEO"] },
  { slug: "events", name: "Events", description: "Event info, schedule, tickets, FAQs, and updates.", tags: ["Events", "Info"] },
  { slug: "coaching", name: "Coaching", description: "Offer, proof, booking CTA, and content.", tags: ["Creator", "Bookings"] },
  { slug: "builder", name: "Construction", description: "Projects, testimonials, service areas, contact.", tags: ["Local", "Trust"] },
  { slug: "medical", name: "Clinic", description: "Services, booking, pricing, and trust blocks.", tags: ["Health", "Trust"] },
];

export const USE_CASES: UseCase[] = [
  {
    slug: "airport-shuttle",
    title: "Airport shuttle & transport",
    summary: "Convert searches into bookings with clear routes, pricing, and trust proof.",
    whoItsFor: ["Airport shuttle operators", "Taxi/ride services", "Tour transport"],
    outcomes: ["More booking inquiries", "Better SEO for route keywords", "Higher trust conversion"],
    pagesYouGet: ["Home", "Pricing", "FAQ", "Contact", "Service areas"],
    keywords: ["airport shuttle", "private transfer", "book airport ride", "fixed price shuttle"],
  },
  {
    slug: "local-tradie",
    title: "Local tradie / services",
    summary: "Rank for suburb + service keywords and capture leads fast.",
    whoItsFor: ["Plumbers", "Electricians", "Builders", "Cleaners"],
    outcomes: ["More inbound leads", "Higher call rate", "Better local SEO coverage"],
    pagesYouGet: ["Home", "Services", "Pricing", "FAQ", "Contact"],
    keywords: ["plumber near me", "electrician [suburb]", "emergency service", "same day repair"],
  },
  {
    slug: "saas-launch",
    title: "SaaS product launch",
    summary: "Ship a crisp landing page with pricing, FAQs, and a conversion-first layout.",
    whoItsFor: ["Indie hackers", "Startups", "Founders"],
    outcomes: ["More signups", "Cleaner positioning", "Faster iteration"],
    pagesYouGet: ["Home", "Pricing", "Use cases", "FAQ", "Contact"],
    keywords: ["best [category] software", "pricing comparison", "alternatives", "how it works"],
  },
  {
    slug: "restaurant",
    title: "Restaurant / cafe",
    summary: "Make it easy to find you, view the menu, and book a table.",
    whoItsFor: ["Restaurants", "Cafes", "Bars"],
    outcomes: ["More bookings", "Better Google/SEO signals", "Clearer brand presentation"],
    pagesYouGet: ["Home", "Menu", "Booking", "Location", "FAQ"],
    keywords: ["restaurant near me", "best brunch", "book table", "menu"],
  },
  {
    slug: "coach",
    title: "Coaching / consulting",
    summary: "Turn authority into booked calls with proof, offer clarity, and CTAs.",
    whoItsFor: ["Coaches", "Consultants", "Service founders"],
    outcomes: ["More call bookings", "Higher trust", "Cleaner offer packaging"],
    pagesYouGet: ["Home", "Offer", "Testimonials", "Pricing", "Book a call"],
    keywords: ["business coach", "consultant", "strategy session", "book a call"],
  },
  {
    slug: "real-estate",
    title: "Real estate agent",
    summary: "Show listings, social proof, and win vendor leads with a tight funnel.",
    whoItsFor: ["Agents", "Brokers", "Property managers"],
    outcomes: ["More appraisal leads", "Higher trust", "Stronger local visibility"],
    pagesYouGet: ["Home", "Listings", "About", "Testimonials", "Contact"],
    keywords: ["real estate agent [suburb]", "property appraisal", "sell my house"],
  },
  {
    slug: "fitness",
    title: "Gym / fitness studio",
    summary: "Package programs, pricing and social proof to drive signups.",
    whoItsFor: ["Gyms", "Pilates", "PTs", "Studios"],
    outcomes: ["More trials", "Higher membership conversion", "Clearer offer"],
    pagesYouGet: ["Home", "Programs", "Pricing", "Timetable", "FAQ"],
    keywords: ["gym near me", "fitness classes", "pilates studio", "personal training"],
  },
  {
    slug: "agency",
    title: "Agency / studio",
    summary: "Make services crystal clear and close higher-quality inbound leads.",
    whoItsFor: ["Web agencies", "Design studios", "Marketing agencies"],
    outcomes: ["Better inbound", "Higher close rate", "Clearer positioning"],
    pagesYouGet: ["Home", "Services", "Case studies", "Process", "Contact"],
    keywords: ["web agency", "design studio", "marketing agency", "case studies"],
  },
  {
    slug: "events",
    title: "Events / tickets",
    summary: "Centralize event info, schedule, FAQs and ticket CTAs.",
    whoItsFor: ["Event organizers", "Meetups", "Conferences"],
    outcomes: ["More ticket clicks", "Fewer questions", "Cleaner event comms"],
    pagesYouGet: ["Home", "Schedule", "Tickets", "FAQ", "Contact"],
    keywords: ["event tickets", "conference schedule", "what to expect", "venue"],
  },
  {
    slug: "portfolio",
    title: "Portfolio / personal brand",
    summary: "Show your work, your story, and make hiring you easy.",
    whoItsFor: ["Freelancers", "Creators", "Job seekers"],
    outcomes: ["More inbound", "Cleaner presence", "Better credibility"],
    pagesYouGet: ["Home", "Work", "About", "Contact", "Testimonials"],
    keywords: ["portfolio", "hire [role]", "freelance [role]", "case studies"],
  },
];
