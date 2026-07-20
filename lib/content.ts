export const site = {
  name: "Hafisa Magezi Foundation",
  shortName: "Hafisa Magezi",
  tagline: "SIP. SUPPORT. EMPOWER.",
  title: "Hafisa Magezi Foundation — Together We Can Change 100,000 Lives",
  description:
    "Supporting girl child education, sustainable coffee agriculture, and community empowerment across Masaka and Uganda through compassion, opportunity, and lasting change.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
] as const;

export const donateUrl = "https://www.raiseug.com/give/the-seeds-of-hope";

export const pages = {
  home: {
    title: "Hafisa Magezi Foundation — Together We Can Change 100,000 Lives",
    description: site.description,
    ogImage: "/images/grand-opening.jpg",
    ogImageAlt: "Hafisa Magezi Foundation grand opening celebration in Masaka, Uganda",
  },
  about: {
    title: "About Hafisa Magezi Foundation | Our Story in Masaka, Uganda",
    description:
      "Meet the Hafisa Magezi Foundation—our story, timeline, partners, and community voices growing hope through education, agriculture, and care in Masaka District, Uganda.",
    ogImage: "/images/section-gathering.png",
    ogImageAlt: "Ugandan community gathering in care and unity",
  },
  programs: {
    title: "Programs | Girl Child Education, Agriculture & Community Care",
    description:
      "Explore three pillars of lasting change: girl child education scholarships, sustainable coffee agriculture, and community support across Uganda with Hafisa Magezi Foundation.",
    ogImage: "/images/section-education.png",
    ogImageAlt: "Ugandan girls learning outdoors under warm light",
  },
  contact: {
    title: "Contact Hafisa Magezi Foundation | Masaka, Uganda",
    description:
      "Partner, volunteer, or ask how to help. Contact Hafisa Magezi Foundation in Masaka District, Uganda—hello@hafisamagezi.org.",
    ogImage: "/images/section-planting.png",
    ogImageAlt: "Hands planting seedlings as a symbol of partnership",
  },
} as const;

/** Site imagery: custom Uganda-inspired art + authentic foundation photography. */
export const imageCredits = [
  { file: "hero-uganda-dawn.png", credit: "Custom — Ugandan dawn landscape for Hafisa Magezi" },
  { file: "hero-coffee-hills.png", credit: "Custom — Ugandan coffee hills at golden hour" },
  { file: "section-education.png", credit: "Custom — girls learning in rural Uganda" },
  { file: "section-planting.png", credit: "Custom — planting coffee seedlings" },
  { file: "section-gathering.png", credit: "Custom — community gathering" },
  { file: "custom-education.png", credit: "Custom — girls learning in rural Uganda" },
  { file: "custom-agriculture.png", credit: "Custom — coffee seedlings in Ugandan soil" },
  { file: "custom-community.png", credit: "Custom — community care circle" },
  { file: "custom-planting.png", credit: "Custom — planting hope" },
  { file: "custom-sunrise.png", credit: "Custom — Ugandan sunrise sky" },
  { file: "mission-*.jpg", credit: "Foundation brand illustrations" },
  { file: "grand-opening.jpg and launch set", credit: "Authentic foundation launch photography — Masaka" },
] as const;

export const hero = {
  headline: "Together We Can Change 100,000 Lives",
  subtitle:
    "Girl education, coffee agriculture, and community care—growing hope from Masaka across Uganda.",
  primaryCta: { href: donateUrl, label: "Donate Now", external: true },
  secondaryCta: { href: "/programs", label: "Explore Our Work" },
  backgroundImage: "/images/hero-uganda-dawn.png",
  slides: [
    {
      src: "/images/hero-uganda-dawn.png",
      alt: "Ugandan dawn over rolling hills — hope rising across the land",
      theme: "Hope across Uganda",
    },
    {
      src: "/images/custom-education.png",
      alt: "Ugandan girls learning outdoors under warm light",
      theme: "Girl Child Education",
    },
    {
      src: "/images/hero-coffee-hills.png",
      alt: "Coffee hills in rural Uganda at golden hour",
      theme: "Agriculture",
    },
    {
      src: "/images/custom-community.png",
      alt: "Ugandan women gathering in community care",
      theme: "Community Care",
    },
    {
      src: "/images/women-leaders.jpg",
      alt: "Women leaders at the Hafisa Magezi Foundation launch in Masaka",
      theme: "Rooted in Masaka",
    },
  ],
};

export const compassion = {
  eyebrow: "Our heart",
  title: "A beginning rooted in Masaka",
  body: "On June 27, 2026, community leaders, partners, and families gathered to launch a foundation built on dignity, faith, and opportunity—for girls, farmers, and neighborhoods across Uganda.",
  paragraphs: [
    "What started as a shared conviction is growing into scholarships, coffee seedlings, and care that meet people where they are.",
    "Every gift and volunteer hour helps that first day of hope become a lasting harvest.",
  ],
  image: "/images/section-gathering.png",
  imageAlt: "Ugandan community gathering in care and hope",
  secondaryImage: "/images/women-leaders.jpg",
  secondaryImageAlt: "Women leaders speaking at the foundation launch in Masaka",
};

export const story = {
  eyebrow: "Our Story",
  title: "Hope rooted in community",
  body: "Born from a deep commitment to dignity, faith, and opportunity, the Hafisa Magezi Foundation walks alongside families in Uganda—nurturing girls’ education, sustaining livelihoods through agriculture, and strengthening the bonds that hold communities together.",
  paragraphs: [
    "We began with a simple belief: every girl deserves schooling, every family deserves opportunity, and every community deserves the tools to thrive.",
    "Guided by values of care and service, we partner with local leaders and volunteers to meet people where they are—with respect and hope. From coffee seedlings to classroom sponsorships, our work is designed to take root and multiply across generations.",
  ],
  facts: [
    { label: "Officially launched", value: "June 27, 2026" },
    { label: "Home district", value: "Masaka District" },
    { label: "Nation", value: "Uganda" },
  ],
  collage: [
    {
      src: "/images/launch-stage.jpg",
      alt: "Hafisa Magezi Foundation launch stage with mission banners",
    },
    {
      src: "/images/partner-booth.jpg",
      alt: "Partner booth with Salaam Bakeries, Haffi Juices, and nursery operators",
    },
    {
      src: "/images/women-leaders.jpg",
      alt: "Women leaders speaking at the foundation launch",
    },
    {
      src: "/images/community-leaders.jpg",
      alt: "Community leaders, UPDF officers, and children at the launch",
    },
  ],
};

export const missions = [
  {
    id: "education",
    title: "Girl Child Education",
    description:
      "Scholarships, school kits, mentorship, and safe pathways that keep girls learning—and dreaming—beyond the classroom.",
    accent: "Books, butterflies, and bright futures",
    outcome: "Keeping girls in school with dignity and opportunity",
    image: "/images/mission-education.jpg",
    cinematicImage: "/images/section-education.png",
    imageAlt: "Foundation illustration of a girl learning under warm golden light",
    cinematicAlt: "Ugandan girls learning outdoors under warm light",
    objectPosition: "50% 28%",
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description:
      "Coffee seedlings, training, and sustainable farming support that turn small plots into lasting livelihoods.",
    accent: "Seedlings rising toward golden light",
    outcome: "Building harvests that sustain families for seasons to come",
    image: "/images/mission-agriculture.jpg",
    cinematicImage: "/images/hero-coffee-hills.png",
    imageAlt: "Foundation illustration of golden hands cradling coffee seedlings",
    cinematicAlt: "Coffee hills in rural Uganda at golden hour",
    objectPosition: "50% 55%",
  },
  {
    id: "community",
    title: "Community Support",
    description:
      "Health outreach, faith partnerships, and collaborative care that wrap families in dignity and belonging.",
    accent: "Hands that hold communities together",
    outcome: "Uniting leaders, families, and partners around shared care",
    image: "/images/mission-community.jpg",
    cinematicImage: "/images/section-gathering.png",
    imageAlt: "Foundation illustration of a caring community circle",
    cinematicAlt: "Ugandan community gathering in care and unity",
    objectPosition: "50% 35%",
  },
] as const;

export const impactStats = [
  { value: 500, suffix: "+", label: "Girls Supported" },
  { value: 10000, suffix: "+", label: "Coffee Seedlings", format: "compact" as const },
  { value: 100000, suffix: "", label: "Lives We Aim to Reach", format: "compact" as const },
  { value: 1, suffix: "+", label: "Districts Active (Masaka)" },
];

export const campaign = {
  goal: 100000,
  current: 12480,
  label: "Illustrative progress toward our shared goal",
  eyebrow: "Campaign progress",
  title: "A shared goal of 100,000 lives",
  subtitle:
    "Verified program totals above sit beside an aspirational campaign goal—every scholarship, seedling, and outreach visit moves hope forward.",
};

export const calculator = {
  eyebrow: "Your impact",
  title: "See what your gift can grow",
  subtitle: "Move the slider to discover how compassion turns into classrooms, harvests, and care.",
  min: 10000,
  max: 500000,
  step: 10000,
  defaultAmount: 50000,
  rates: {
    schoolKits: 10000,
    seedlings: 5000,
    outreachDays: 100000,
  },
};

export const mapProjects = [
  {
    id: "masaka",
    name: "Masaka District",
    x: 42,
    y: 68,
    focus: "Home base",
    status: "active" as const,
    description: "Education sponsorships, coffee seedling distribution, and community launch partnerships.",
  },
  {
    id: "central",
    name: "Central Region",
    x: 48,
    y: 52,
    focus: "Education outreach",
    status: "planned" as const,
    description: "Expanding girl-child scholarships and mentorship circles beyond Masaka.",
  },
  {
    id: "west",
    name: "Western Highlands",
    x: 28,
    y: 58,
    focus: "Agriculture",
    status: "planned" as const,
    description: "Coffee and sustainable farming training for smallholder families.",
  },
  {
    id: "east",
    name: "Eastern Corridor",
    x: 68,
    y: 48,
    focus: "Community care",
    status: "planned" as const,
    description: "Faith partnerships and health outreach planned for growth.",
  },
] as const;

export const storyMoments = [
  {
    id: "education",
    beforeLabel: "Before",
    afterLabel: "After",
    before:
      "A girl at risk of leaving school—uncertain of books, fees, and a path forward.",
    after:
      "Sponsored learning, mentorship, and the quiet confidence of showing up every day.",
    image: "/images/section-education.png",
    imageAlt: "Ugandan girls learning outdoors under warm golden light",
    quote: "My daughter walks to school with books and confidence.",
  },
  {
    id: "agriculture",
    beforeLabel: "Before",
    afterLabel: "After",
    before: "A small plot without seedlings or training—seasons of uncertainty.",
    after: "Coffee seedlings, skills, and a harvest that families can plan around.",
    image: "/images/section-planting.png",
    imageAlt: "Hands planting coffee seedlings in Ugandan soil",
    quote: "The seedlings and training changed our harvest.",
  },
] as const;

export const gallery = [
  {
    src: "/images/grand-opening.jpg",
    alt: "Grand opening celebration with community and UPDF guests",
    caption: "Grand opening",
  },
  {
    src: "/images/launch-stage.jpg",
    alt: "Branded launch stage and mission banners",
    caption: "Foundation launch",
  },
  {
    src: "/images/partner-booth.jpg",
    alt: "Partner booth with juices, bakeries, and nursery operators",
    caption: "Partners",
  },
  {
    src: "/images/women-leaders.jpg",
    alt: "Women leaders addressing the community",
    caption: "Women leading",
  },
  {
    src: "/images/community-leaders.jpg",
    alt: "Leaders and children gathered for the launch",
    caption: "Community & partners",
  },
  {
    src: "/images/cake-cutting.jpg",
    alt: "Official cake cutting at the foundation launch",
    caption: "Cake cutting",
    objectPosition: "50% 55%",
  },
  {
    src: "/images/celebration.jpg",
    alt: "Joyful celebration around the foundation cake",
    caption: "Celebration",
    objectPosition: "50% 45%",
  },
  {
    src: "/images/hero-coffee-hills.png",
    alt: "Coffee hills in rural Uganda at golden hour",
    caption: "Coffee hills",
  },
  {
    src: "/images/section-education.png",
    alt: "Girls learning outdoors in Uganda",
    caption: "Learning together",
  },
  {
    src: "/images/section-gathering.png",
    alt: "Community gathering in warm Ugandan light",
    caption: "Community care",
  },
  {
    src: "/images/custom-agriculture.png",
    alt: "Coffee seedlings in rich Ugandan soil",
    caption: "Living harvests",
  },
  {
    src: "/images/hero-uganda-dawn.png",
    alt: "Custom Ugandan dawn over green hills",
    caption: "Hope at dawn",
  },
] as {
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
}[];

export const homeGallery = gallery;

export const milestones = [
  {
    phase: "2025",
    title: "Foundation established",
    text: "A vision for education, agriculture, and community care takes formal shape.",
  },
  {
    phase: "Jun 2026",
    title: "Community launch",
    text: "June 27, 2026 — Masaka District gathers to celebrate a new chapter of hope.",
  },
  {
    phase: "Growth",
    title: "Coffee distribution",
    text: "Thousands of seedlings reach smallholder farmers, planting economic resilience.",
  },
  {
    phase: "Education",
    title: "Education sponsorship",
    text: "Girls receive scholarships, supplies, and mentorship to stay in school.",
  },
  {
    phase: "Alliance",
    title: "Partnerships",
    text: "UPDF, Islamic leadership, local businesses, and CSR allies join the mission.",
  },
  {
    phase: "Ahead",
    title: "Future expansion",
    text: "Programs grow district by district—widening circles of lasting impact.",
  },
];

export const partners = [
  { name: "UPDF", role: "Institutional partner" },
  { name: "Islamic Leadership", role: "Faith & community guidance" },
  { name: "Haffi Tea & Juices", role: "Livelihood enterprise" },
  { name: "Salaam Bakeries", role: "Local business ally" },
  { name: "Local Communities", role: "Grassroots collaboration" },
  { name: "CSR Partners", role: "Shared social impact" },
];

export const donationAmounts = [
  {
    id: "10k",
    label: "UGX 10,000",
    value: 10000,
    impact: "Helps provide school supplies for a girl in need.",
  },
  {
    id: "50k",
    label: "UGX 50,000",
    value: 50000,
    impact: "Funds a seedling pack and training for a smallholder farmer.",
  },
  {
    id: "100k",
    label: "UGX 100,000",
    value: 100000,
    impact: "Supports a month of community outreach and care.",
  },
  {
    id: "custom",
    label: "Custom",
    value: null,
    impact: "Give what you can—every contribution grows hope.",
  },
] as const;

export const testimonials = [
  {
    name: "Amina N.",
    role: "Parent, Masaka",
    quote:
      "My daughter walks to school with books and confidence. This foundation restored our hope.",
    initials: "AN",
  },
  {
    name: "Joseph K.",
    role: "Coffee farmer",
    quote:
      "The seedlings and training changed our harvest. We can plan for the seasons ahead.",
    initials: "JK",
  },
  {
    name: "Fatima S.",
    role: "Community volunteer",
    quote:
      "Serving with Hafisa Magezi feels like family—faithful, warm, and focused on real change.",
    initials: "FS",
  },
  {
    name: "David M.",
    role: "Local partner",
    quote:
      "Their work is dignified and professional. Partners feel proud to stand beside them.",
    initials: "DM",
  },
];

export const volunteerRoles = [
  { id: "plant", label: "Plant seedlings", detail: "Join distribution days and nursery support." },
  { id: "teach", label: "Mentor girls", detail: "Share skills, encouragement, and presence." },
  { id: "outreach", label: "Community outreach", detail: "Help with health and care visits." },
  { id: "events", label: "Events & logistics", detail: "Make launches and gatherings run with grace." },
] as const;

export const volunteer = {
  title: "Lend your hands. Grow hope.",
  body: "Plant trees, teach children, support outreach, and help communities flourish. Every hour you give becomes someone else’s brighter tomorrow.",
  cta: "Become a Volunteer",
  image: "/images/section-planting.png",
  imageAlt: "Hands planting coffee seedlings — growing hope in Uganda",
};

export const donation = {
  backgroundImage: "/images/custom-sunrise.png",
  eyebrow: "Give with heart",
  title: "Your gift grows futures",
  subtitle:
    "Choose an amount and help a girl stay in school, a farmer plant tomorrow, and a community rise with dignity.",
};

export const contact = {
  eyebrow: "Contact",
  title: "We would love to hear from you",
  subtitle:
    "Reach out about partnerships, volunteering, or how we can walk alongside your community.",
  email: "hello@hafisamagezi.org",
  details: [
    {
      label: "Location",
      value: "Masaka District, Uganda",
    },
    {
      label: "Email",
      value: "hello@hafisamagezi.org",
      href: "mailto:hello@hafisamagezi.org",
    },
  ],
  formNote: "Your email app will open so you can send us the message.",
};

export const pageHeroes = {
  about: {
    eyebrow: "About us",
    title: "A foundation built on dignity and faith",
    subtitle:
      "From Masaka to communities across Uganda, we grow hope through education, agriculture, and care.",
    image: "/images/section-gathering.png",
    imageAlt: "Ugandan community gathering in care and unity",
  },
  programs: {
    eyebrow: "Our programs",
    title: "Three pillars of lasting change",
    subtitle:
      "Education, agriculture, and community support—woven together so hope can take root.",
    image: "/images/section-education.png",
    imageAlt: "Ugandan girls learning with hope and focus",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Connect with our mission",
    subtitle: "Whether you give, partner, or volunteer—every step forward matters.",
    image: "/images/section-planting.png",
    imageAlt: "Hands planting seedlings as a symbol of partnership",
  },
} as const;

export const footer = {
  mission:
    "We inspire hope and grow futures—empowering girls, strengthening families, and transforming communities across Uganda with compassion and sustainable development.",
  quickLinks: [
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/contact", label: "Contact" },
    { href: donateUrl, label: "Donate", external: true },
  ],
  socials: [] as { label: string; href: string; placeholder?: boolean }[],
};
