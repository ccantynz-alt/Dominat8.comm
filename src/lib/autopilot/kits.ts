import type { BusinessKit } from "./types";

export const BUSINESS_KITS: BusinessKit[] = [
  {
    id: "photographer",
    name: "Photographer",
    category: "Creative",
    description:
      "A complete online presence for professional photographers. Showcase your portfolio, book sessions, and grow your client base.",
    includes: [
      "Portfolio website with gallery",
      "Online booking & calendar",
      "SEO setup for local searches",
      "Instagram-ready social templates",
      "Client inquiry email templates",
      "Pricing page",
      "Testimonials section",
      "Contact form with file upload",
    ],
    estimatedTime: "5 minutes",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    category: "Food & Beverage",
    description:
      "Everything a restaurant needs online: menu, reservations, and a mouth-watering presence that drives foot traffic.",
    includes: [
      "Restaurant website with menu",
      "Online reservation system",
      "Google Maps integration",
      "SEO for local dining searches",
      "Social media post templates",
      "Promotional email templates",
      "Hours & location page",
      "Order online integration",
    ],
    estimatedTime: "5 minutes",
  },
  {
    id: "consultant",
    name: "Consultant",
    category: "Professional Services",
    description:
      "Position yourself as the expert in your field. Attract high-value clients with a polished, authoritative website.",
    includes: [
      "Professional services website",
      "Case studies & results section",
      "Discovery call booking page",
      "LinkedIn-optimized SEO",
      "Thought leadership blog setup",
      "Proposal email templates",
      "Service packages page",
      "Client portal link",
    ],
    estimatedTime: "5 minutes",
  },
  {
    id: "fitness-trainer",
    name: "Fitness Trainer",
    category: "Health & Wellness",
    description:
      "Build your fitness brand online. Showcase transformations, sell programs, and book clients 24/7.",
    includes: [
      "Fitness coaching website",
      "Transformation gallery",
      "Program & pricing page",
      "Online session booking",
      "SEO for fitness keywords",
      "Instagram & TikTok templates",
      "Welcome email sequence",
      "Nutrition tips blog",
    ],
    estimatedTime: "5 minutes",
  },
  {
    id: "real-estate-agent",
    name: "Real Estate Agent",
    category: "Real Estate",
    description:
      "Stand out in a competitive market. Generate leads, showcase listings, and build trust with buyers and sellers.",
    includes: [
      "Real estate agent website",
      "Property listings page",
      "Neighborhood guides",
      "Local SEO optimization",
      "Market report email templates",
      "Social media listing templates",
      "Lead capture forms",
      "CMA request page",
    ],
    estimatedTime: "5 minutes",
  },
  {
    id: "dentist",
    name: "Dentist",
    category: "Healthcare",
    description:
      "A professional dental practice website that builds patient trust, drives appointments, and ranks locally.",
    includes: [
      "Dental practice website",
      "Online appointment booking",
      "Services & treatments page",
      "Patient testimonials section",
      "Local SEO for dental searches",
      "Insurance info page",
      "Appointment reminder email templates",
      "New patient welcome kit",
    ],
    estimatedTime: "5 minutes",
  },
  {
    id: "lawyer",
    name: "Lawyer",
    category: "Legal",
    description:
      "A credible, authoritative legal website that attracts clients and communicates your expertise clearly.",
    includes: [
      "Law firm website",
      "Practice areas page",
      "Attorney bio section",
      "Free consultation booking",
      "Legal SEO optimization",
      "Case results showcase",
      "Client intake email templates",
      "FAQ page",
    ],
    estimatedTime: "5 minutes",
  },
  {
    id: "life-coach",
    name: "Life Coach",
    category: "Coaching",
    description:
      "Inspire and attract clients ready for transformation. Share your story, your method, and make it easy to work with you.",
    includes: [
      "Life coaching website",
      "Your story & methodology page",
      "Coaching programs page",
      "Discovery session booking",
      "SEO for coaching searches",
      "Inspirational social templates",
      "Welcome email sequence",
      "Testimonials & success stories",
    ],
    estimatedTime: "5 minutes",
  },
];

export function getKitById(id: string): BusinessKit | null {
  return BUSINESS_KITS.find((kit) => kit.id === id) ?? null;
}

export function getKitsByCategory(category: string): BusinessKit[] {
  return BUSINESS_KITS.filter(
    (kit) => kit.category.toLowerCase() === category.toLowerCase()
  );
}
