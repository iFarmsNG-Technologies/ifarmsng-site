export const navLinks = [
  { href: "/#top", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#services", label: "What We Do" },
  { href: "/#impact", label: "Our Impact" },
  { href: "/#contact", label: "Contact" },
];

export const pillars = [
  { icon: "⌁", title: "Agricultural production", text: "Building productive farming operations rooted in practical knowledge and responsible resource use." },
  { icon: "⌘", title: "Technology-enabled operations", text: "Applying useful technology and coordinated systems to make agricultural activity more efficient." },
  { icon: "✳", title: "Sustainable value creation", text: "Connecting production, processing, and markets to create enduring value across the chain." },
];

export const services = [
  { icon: "↟", tag: "PRODUCTION", title: "Agricultural Production", text: "Crop cultivation, livestock, poultry, and aquaculture operations.", label: "agricultural production" },
  { icon: "◈", tag: "VALUE ADDITION", title: "Agro-Processing", text: "Processing agricultural produce into higher-value products.", label: "agro-processing" },
  { icon: "⇄", tag: "TRADE", title: "Commodity Trading & Logistics", text: "Commodity sourcing, aggregation, distribution, and market access.", label: "commodity trading and logistics" },
  { icon: "⌖", tag: "EXPERTISE", title: "Farm Management & Advisory", text: "Farm operations support, agronomic advisory, and capacity building.", label: "farm management and advisory" },
  { icon: "₦", tag: "SUPPORT", title: "Agribusiness Finance & Farmer Support", text: "Supporting agricultural stakeholders through structured agribusiness support models.", label: "agribusiness finance and farmer support" },
  { icon: "⌬", tag: "INNOVATION", title: "Research & Development", text: "Innovation, agricultural research, and development of improved farming systems.", label: "research and development" },
];

export const process = [
  { icon: "✳", title: "Production", text: "Grow with purpose." },
  { icon: "▤", title: "Aggregation", text: "Bring supply together." },
  { icon: "◈", title: "Processing", text: "Add value at source." },
  { icon: "⇢", title: "Logistics", text: "Move with efficiency." },
  { icon: "◎", title: "Market access", text: "Connect to opportunity." },
];

export const whyList = [
  "Technology-enabled agricultural coordination",
  "Sustainable farming practices",
  "Improved market access and value addition",
  "Strategic partnerships and collaboration",
  "Food security and rural economic development",
];

export const impact = [
  { icon: "✳", title: "Food security", text: "Contributing to stronger, more resilient food systems." },
  { icon: "♧", title: "Rural job creation", text: "Supporting livelihoods and opportunity across rural communities." },
  { icon: "↗", title: "Reduced post-harvest losses", text: "Improving coordination, handling, and routes to market." },
  { icon: "♻", title: "Sustainable practices", text: "Encouraging responsible production and resource stewardship." },
];

/**
 * Inquiry options. `value` is what the Rust API stores; `label` is what the
 * visitor sees. Agro-Processing has no dedicated category on the backend, so
 * it maps to "other" (add a variant in the Rust enum + migration to change this).
 */
export const inquiryOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "commodity", label: "Commodity Supply" },
  { value: "strategic_partnership", label: "Agricultural Partnership" },
  { value: "investment", label: "Investment Inquiry" },
  { value: "farming_services", label: "Farm Management Services" },
  { value: "other", label: "Agro-Processing" },
  { value: "farming_services", label: "Farmer Support" },
  { value: "other", label: "Other" },
];

export const footerExplore = [
  { href: "/#about", label: "About us" },
  { href: "/#services", label: "What we do" },
  { href: "/#approach", label: "Our approach" },
  { href: "/#impact", label: "Our impact" },
];
export const footerServices = [
  { href: "/#services", label: "Agricultural production" },
  { href: "/#services", label: "Agro-processing" },
  { href: "/#services", label: "Commodity trading" },
  { href: "/#services", label: "Farm advisory" },
];
