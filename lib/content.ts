export const site = {
  name: "Hafisa Magezi Foundation",
  legalName: "Hafisa Magezi Foundation Limited",
  shortName: "Hafisa Magezi",
  tagline: "SIP. SUPPORT. EMPOWER.",
  title: "Hafisa Magezi Foundation — Empowering Lives Across Uganda",
  description:
    "Hafisa Magezi Foundation Limited empowers people across Uganda through education and skills, livelihoods and sustainable agriculture, health and wellbeing, environmental resilience, and partnerships built on dignity.",
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
    title: "Hafisa Magezi Foundation — Empowering Lives Across Uganda",
    description: site.description,
    ogImage: "/images/hero-empowerment.jpg",
    ogImageAlt: "People working together with purpose across Uganda’s green hills",
  },
  about: {
    title: "About Hafisa Magezi Foundation | Leadership & Story",
    description:
      "Meet Hafisa Magezi Foundation Limited—our story, leadership, partners, and programmes empowering communities from Kampala and Masaka across Uganda.",
    ogImage: "/images/community-solidarity.jpg",
    ogImageAlt: "Community partners learning and serving together in Uganda",
  },
  programs: {
    title: "Programs | Skills, Livelihoods, Health & Empowerment",
    description:
      "Explore six programmes of lasting change: care and dignity, education and skills, livelihoods and agriculture, health and wellbeing, environment and resilience, and partnerships.",
    ogImage: "/images/empower-learners.jpg",
    ogImageAlt: "Learners building skills and confidence in Uganda",
  },
  contact: {
    title: "Contact Hafisa Magezi Foundation | Kampala, Uganda",
    description:
      "Partner, volunteer, or ask how to support. Contact Hafisa Magezi Foundation Limited in Kampala—hello@hafisamagezi.org · +256 775 721 332.",
    ogImage: "/images/coffee-seedlings-tray.jpg",
    ogImageAlt: "Healthy coffee seedlings ready for distribution",
  },
} as const;

/** Site imagery: empowerment photography + authentic foundation launch photos. */
export const imageCredits = [
  { file: "hero-empowerment.jpg", credit: "Custom — empowerment across Ugandan hills" },
  { file: "empower-learners.jpg", credit: "Custom — learners building futures" },
  { file: "empower-mentorship.jpg", credit: "Custom — peer mentorship and mutual support" },
  { file: "coffee-harvest.jpg", credit: "Custom — premium coffee cherry presentation" },
  { file: "coffee-seedlings-tray.jpg", credit: "Custom — coffee seedlings ready for distribution" },
  { file: "farmer-empowered.jpg", credit: "Custom — thriving coffee livelihoods" },
  { file: "community-solidarity.jpg", credit: "Custom — community training and partnership" },
  { file: "health-wellbeing.jpg", credit: "Custom — health education with dignity" },
  { file: "environment-resilience.jpg", credit: "Custom — tree planting and climate resilience" },
  { file: "hero-uganda-dawn.png", credit: "Custom — Ugandan dawn landscape for Hafisa Magezi" },
  { file: "hero-coffee-hills.png", credit: "Custom — Ugandan coffee hills at golden hour" },
  { file: "custom-agriculture.png", credit: "Custom — coffee seedlings in Ugandan soil" },
  { file: "grand-opening.jpg and launch set", credit: "Authentic foundation launch photography — Masaka" },
] as const;

export const hero = {
  headline: "Empowering People Who Rise—and Lift Others",
  subtitle:
    "Education and skills, thriving coffee livelihoods, and community strength—growing opportunity from Kampala and Masaka across Uganda.",
  primaryCta: { href: donateUrl, label: "Support the mission", external: true },
  secondaryCta: { href: "/programs", label: "Explore Our Work" },
  backgroundImage: "/images/hero-empowerment.jpg",
  slides: [
    {
      src: "/images/hero-empowerment.jpg",
      alt: "People working together with purpose across Uganda’s green hills",
      theme: "Empowerment across Uganda",
    },
    {
      src: "/images/empower-learners.jpg",
      alt: "Learners studying together with focus and pride",
      theme: "Education & Skills",
    },
    {
      src: "/images/coffee-harvest.jpg",
      alt: "Premium ripe coffee cherries presented on a woven tray",
      theme: "Coffee & Livelihoods",
    },
    {
      src: "/images/coffee-seedlings-tray.jpg",
      alt: "Healthy coffee seedlings in trays ready for distribution",
      theme: "Seeds We Share",
    },
    {
      src: "/images/community-solidarity.jpg",
      alt: "Community members learning and supporting one another",
      theme: "Mutual Support",
    },
  ],
};

export const compassion = {
  eyebrow: "Our beginning",
  title: "A beginning rooted in community",
  body: "On June 27, 2026, leaders, partners, and families gathered in Masaka to launch a foundation built on dignity, skills, and opportunity—helping people stand strong and support others.",
  paragraphs: [
    "What started as a shared conviction is growing into scholarships, vocational pathways, coffee seedlings, health outreach, and partnerships that multiply impact.",
    "Every partnership and volunteer hour helps people build livelihoods, skills, and the confidence to lift their communities.",
  ],
  image: "/images/community-solidarity.jpg",
  imageAlt: "Community partners learning and serving together",
  secondaryImage: "/images/empower-mentorship.jpg",
  secondaryImageAlt: "A mentor supporting a learner with shared focus and care",
};

export const story = {
  eyebrow: "Our Story",
  title: "Empowerment rooted in community",
  body: "Hafisa Magezi Foundation Limited walks alongside people across Uganda—building education and skills, strengthening livelihoods through sustainable agriculture, and uniting communities around health, resilience, and shared service.",
  paragraphs: [
    "We believe every person deserves the tools to stand on their feet: learning pathways, productive farms, healthy communities, and partners who serve with respect.",
    "From coffee seedlings and vocational mentorship to health education and tree planting, our work is designed to take root—and for those we support to become supporters of others.",
  ],
  facts: [
    { label: "Community launch", value: "June 27, 2026" },
    { label: "Registered office", value: "Kampala" },
    { label: "Programmes", value: "Masaka & Uganda" },
  ],
  collage: [
    {
      src: "/images/launch-stage.jpg",
      alt: "Hafisa Magezi Foundation launch stage celebration",
    },
    {
      src: "/images/partner-booth.jpg",
      alt: "Partner booth with Salaam Bakeries, Haffi Juices, and nursery operators",
    },
    {
      src: "/images/grand-opening.jpg",
      alt: "Grand opening celebration with community partners",
    },
    {
      src: "/images/community-leaders.jpg",
      alt: "Community leaders and partners at the foundation launch",
    },
  ],
};

/** Homepage flagship pillars (3). */
export const missions = [
  {
    id: "education",
    title: "Education & Skills",
    description:
      "Scholarships, scholastic materials, mentorship, vocational training, and career guidance—pathways that help learners grow and give back.",
    accent: "Learning that lifts generations",
    outcome: "Building confident learners who mentor others",
    image: "/images/empower-learners.jpg",
    cinematicImage: "/images/empower-mentorship.jpg",
    imageAlt: "Learners building skills and confidence together",
    cinematicAlt: "Peer mentorship—those who rise lifting others",
    objectPosition: "50% 35%",
  },
  {
    id: "agriculture",
    title: "Livelihoods & Agriculture",
    description:
      "Coffee seedlings, climate-smart farming, entrepreneurship, financial literacy, and savings groups that turn plots into lasting income.",
    accent: "Healthy harvests. Shared prosperity.",
    outcome: "Growing livelihoods families can plan around",
    image: "/images/coffee-harvest.jpg",
    cinematicImage: "/images/farmer-empowered.jpg",
    imageAlt: "Premium ripe coffee cherries presented with care",
    cinematicAlt: "A confident farmer among thriving young coffee trees",
    objectPosition: "50% 45%",
  },
  {
    id: "community",
    title: "Community Strength",
    description:
      "Health and wellbeing, environmental resilience, care with dignity, and partnerships that mobilise volunteers and resources for lasting change.",
    accent: "People who support people",
    outcome: "Uniting partners around shared strength",
    image: "/images/community-solidarity.jpg",
    cinematicImage: "/images/health-wellbeing.jpg",
    imageAlt: "Community members collaborating in training and service",
    cinematicAlt: "Health education delivered with dignity and care",
    objectPosition: "50% 40%",
  },
] as const;

/** Full programme mandate for /programs (6 registered objectives, empowerment-framed). */
export const programmeAreas = [
  {
    id: "care",
    title: "Care & Dignity",
    description:
      "Humanitarian assistance, healthcare support, counselling, and essentials that help people stabilize—and move forward with strength.",
    accent: "Stability that unlocks potential",
    outcome: "Walking with people until they can walk further on their own",
    image: "/images/empower-mentorship.jpg",
    imageAlt: "Support offered with respect and mutual care",
    objectPosition: "50% 35%",
  },
  {
    id: "education",
    title: "Education & Skills",
    description:
      "Scholarships, scholastic materials, mentorship, vocational training, and career guidance for children and youth of every background.",
    accent: "Skills for a lifetime",
    outcome: "Learners who grow into mentors and leaders",
    image: "/images/empower-learners.jpg",
    imageAlt: "Students learning with focus and pride",
    objectPosition: "50% 35%",
  },
  {
    id: "livelihoods",
    title: "Livelihoods & Economic Empowerment",
    description:
      "Entrepreneurship, financial literacy, savings groups, sustainable agriculture, and income-generating activities—led by healthy coffee and seedling distribution.",
    accent: "From seed to harvest",
    outcome: "Income pathways that strengthen whole households",
    image: "/images/coffee-seedlings-tray.jpg",
    imageAlt: "Healthy coffee seedlings ready for distribution",
    objectPosition: "50% 50%",
  },
  {
    id: "health",
    title: "Health, Water & Wellbeing",
    description:
      "Medical outreach, health education, safe water initiatives, sanitation facilities, and hygiene promotion delivered with dignity.",
    accent: "Well communities thrive",
    outcome: "Health knowledge and care that communities can sustain",
    image: "/images/health-wellbeing.jpg",
    imageAlt: "Community health education in a clean, welcoming setting",
    objectPosition: "50% 40%",
  },
  {
    id: "environment",
    title: "Environment & Resilience",
    description:
      "Tree planting, climate-smart agriculture, clean energy awareness, disaster response readiness, and sustainable community infrastructure.",
    accent: "Land that lasts",
    outcome: "Greener communities prepared for tomorrow",
    image: "/images/environment-resilience.jpg",
    imageAlt: "Community tree planting for a resilient landscape",
    objectPosition: "50% 45%",
  },
  {
    id: "partnerships",
    title: "Partnerships & Service",
    description:
      "Mobilising partners, volunteers, and resources for compassion, community service, advocacy, and sustainable programmes that improve lives.",
    accent: "Stronger together",
    outcome: "Networks of people who lift one another",
    image: "/images/community-solidarity.jpg",
    imageAlt: "Partners and volunteers serving side by side",
    objectPosition: "50% 40%",
  },
] as const;

export const impactStats = [
  { value: 500, suffix: "+", label: "Learners Empowered" },
  { value: 10000, suffix: "+", label: "Seedlings Distributed", format: "compact" as const },
  { value: 100000, suffix: "", label: "Lives We Aim to Reach", format: "compact" as const },
  { value: 1, suffix: "+", label: "Districts Active (Masaka)" },
];

export const campaign = {
  goal: 100000,
  current: 12480,
  label: "Aspirational progress toward our shared goal",
  eyebrow: "Impact in motion",
  title: "Strength that multiplies",
  subtitle:
    "Programme totals below mark the work underway—every scholarship, seedling pack, and outreach day strengthens someone who can strengthen others.",
};

export const calculator = {
  eyebrow: "Your impact",
  title: "See what partnership can grow",
  subtitle:
    "Move the slider to discover how partnership turns into skills, harvests, and community strength.",
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
    focus: "Programme launch",
    status: "active" as const,
    description:
      "Education pathways, coffee seedling distribution, and community partnerships rooted in our Masaka launch.",
  },
  {
    id: "kampala",
    name: "Kampala",
    x: 50,
    y: 48,
    focus: "Registered office",
    status: "active" as const,
    description:
      "Registered office in Kawempe / Kyebando—coordinating programmes and partnerships nationwide.",
  },
  {
    id: "west",
    name: "Western Highlands",
    x: 28,
    y: 58,
    focus: "Agriculture",
    status: "planned" as const,
    description: "Coffee and climate-smart farming training for growing livelihoods.",
  },
  {
    id: "east",
    name: "Eastern Corridor",
    x: 68,
    y: 48,
    focus: "Community strength",
    status: "planned" as const,
    description: "Health outreach, partnerships, and community resilience planned for growth.",
  },
] as const;

export const storyMoments = [
  {
    id: "education",
    pathwayLabel: "Pathway",
    outcomeLabel: "Outcome",
    pathway:
      "A young learner seeking a clear path—books, skills, and someone who believes in their future.",
    outcome:
      "Sponsored learning, mentorship, and the confidence to grow—and one day guide others.",
    pathwayQuote: "I am ready to learn—and to build a future I can share.",
    outcomeQuote: "I study with purpose—and I help younger students too.",
    startImage: "/images/empower-learners.jpg",
    startImageAlt: "Learners building futures with focus and pride",
    growthImage: "/images/empower-mentorship.jpg",
    growthImageAlt: "A mentor guiding a younger learner with shared focus",
    tabLabel: "Education",
  },
  {
    id: "agriculture",
    pathwayLabel: "Pathway",
    outcomeLabel: "Outcome",
    pathway:
      "A farmer ready to grow—seeking healthy seedlings, training, and a harvest worth presenting.",
    outcome:
      "Coffee seedlings, skills, and a thriving plot families can plan seasons around.",
    pathwayQuote: "Give us healthy seedlings—and we will grow with care.",
    outcomeQuote: "The seedlings and training changed our harvest.",
    startImage: "/images/coffee-seedlings-tray.jpg",
    startImageAlt: "Healthy coffee seedlings prepared for distribution",
    growthImage: "/images/coffee-harvest.jpg",
    growthImageAlt: "Premium ripe coffee cherries presented with care",
    tabLabel: "Livelihoods",
  },
  {
    id: "health",
    pathwayLabel: "Pathway",
    outcomeLabel: "Outcome",
    pathway:
      "Families seeking clear health knowledge, clean water practices, and outreach they can trust.",
    outcome:
      "Health education and care delivered with dignity—so communities stay strong enough to thrive.",
    pathwayQuote: "We want knowledge that keeps our households well.",
    outcomeQuote: "Healthy families have the strength to lift others.",
    startImage: "/images/health-wellbeing.jpg",
    startImageAlt: "Community health education in a welcoming setting",
    growthImage: "/images/community-solidarity.jpg",
    growthImageAlt: "Neighbours learning and supporting one another",
    tabLabel: "Health",
  },
  {
    id: "partnerships",
    pathwayLabel: "Pathway",
    outcomeLabel: "Outcome",
    pathway:
      "People ready to serve—looking for partners, skills, and a place to multiply their impact.",
    outcome:
      "Volunteers and allies who mentor, plant, and advocate—lifting others as they rise.",
    pathwayQuote: "I want my hands to matter for someone else’s future.",
    outcomeQuote: "Together we turn one act of support into many.",
    startImage: "/images/environment-resilience.jpg",
    startImageAlt: "Community planting for a resilient landscape",
    growthImage: "/images/farmer-empowered.jpg",
    growthImageAlt: "A confident farmer among thriving young coffee trees",
    tabLabel: "Partnerships",
  },
] as const;

export const gallery = [
  {
    src: "/images/grand-opening.jpg",
    alt: "Grand opening celebration with community and partners",
    caption: "Grand opening",
    kind: "field" as const,
    size: "wide" as const,
  },
  {
    src: "/images/empower-learners.jpg",
    alt: "Learners building skills together",
    caption: "Learning together",
    kind: "vision" as const,
    size: "tall" as const,
  },
  {
    src: "/images/launch-stage.jpg",
    alt: "Foundation launch stage celebration in Masaka",
    caption: "Foundation launch",
    kind: "field" as const,
    size: "wide" as const,
  },
  {
    src: "/images/coffee-harvest.jpg",
    alt: "Premium ripe coffee cherries presented on a tray",
    caption: "Coffee presentation",
    kind: "vision" as const,
    size: "square" as const,
  },
  {
    src: "/images/community-leaders.jpg",
    alt: "Leaders and partners gathered for the launch",
    caption: "Community & partners",
    kind: "field" as const,
    size: "tall" as const,
  },
  {
    src: "/images/coffee-seedlings-tray.jpg",
    alt: "Healthy coffee seedlings ready for distribution",
    caption: "Seedlings shared",
    kind: "vision" as const,
    size: "wide" as const,
  },
  {
    src: "/images/partner-booth.jpg",
    alt: "Partner booth with juices, bakeries, and nursery operators",
    caption: "Local partners",
    kind: "field" as const,
    size: "square" as const,
  },
  {
    src: "/images/farmer-empowered.jpg",
    alt: "Confident farmer among thriving young coffee trees",
    caption: "Thriving livelihoods",
    kind: "vision" as const,
    size: "tall" as const,
  },
  {
    src: "/images/celebration.jpg",
    alt: "Joyful celebration around the foundation cake",
    caption: "Celebration",
    kind: "field" as const,
    size: "wide" as const,
    objectPosition: "50% 45%",
  },
  {
    src: "/images/empower-mentorship.jpg",
    alt: "Mentorship and mutual support",
    caption: "Lifting others",
    kind: "vision" as const,
    size: "square" as const,
  },
  {
    src: "/images/cake-cutting.jpg",
    alt: "Official cake cutting at the foundation launch",
    caption: "Launch day",
    kind: "field" as const,
    size: "tall" as const,
    objectPosition: "50% 55%",
  },
  {
    src: "/images/community-solidarity.jpg",
    alt: "Community training and partnership",
    caption: "Community strength",
    kind: "vision" as const,
    size: "wide" as const,
  },
  {
    src: "/images/health-wellbeing.jpg",
    alt: "Health education delivered with dignity",
    caption: "Health & wellbeing",
    kind: "vision" as const,
    size: "square" as const,
  },
  {
    src: "/images/environment-resilience.jpg",
    alt: "Tree planting for community resilience",
    caption: "Green resilience",
    kind: "vision" as const,
    size: "tall" as const,
  },
  {
    src: "/images/hero-coffee-hills.png",
    alt: "Coffee hills in rural Uganda at golden hour",
    caption: "Coffee hills",
    kind: "vision" as const,
    size: "wide" as const,
  },
] as {
  src: string;
  alt: string;
  caption: string;
  kind: "field" | "vision";
  size: "wide" | "tall" | "square";
  objectPosition?: string;
}[];

export const homeGallery = gallery;

export const milestones = [
  {
    phase: "2025",
    title: "Foundation established",
    text: "A vision for skills, livelihoods, and community strength takes formal shape.",
    status: "done" as const,
  },
  {
    phase: "Jun 2026",
    title: "Community launch",
    text: "June 27, 2026 — Masaka gathers to celebrate a new chapter of empowerment.",
    status: "done" as const,
  },
  {
    phase: "Jul 2026",
    title: "Company registration",
    text: "Hafisa Magezi Foundation Limited registered in Kampala as a company limited by guarantee.",
    status: "done" as const,
  },
  {
    phase: "Growth",
    title: "Coffee distribution",
    text: "Thousands of healthy seedlings reach farmers—planting income and resilience.",
    status: "active" as const,
  },
  {
    phase: "Education",
    title: "Skills & sponsorship",
    text: "Learners receive scholarships, materials, mentorship, and vocational pathways.",
    status: "active" as const,
  },
  {
    phase: "Alliance",
    title: "Partnerships",
    text: "UPDF, faith leadership, local businesses, and CSR allies join the mission.",
    status: "active" as const,
  },
  {
    phase: "Ahead",
    title: "Future expansion",
    text: "Programmes grow district by district—widening circles of people who lift others.",
    status: "planned" as const,
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

export const leadership = {
  eyebrow: "Leadership",
  title: "Guided by people who serve",
  subtitle:
    "Directors of Hafisa Magezi Foundation Limited—stewarding programmes with integrity and shared purpose.",
  image: "/images/grand-opening.jpg",
  imageAlt: "Foundation leaders and partners at the community launch",
  members: [
    { name: "Namusoke Sulaina Aaliyat", role: "Director" },
    { name: "Namusoke Zainah", role: "Director & Company Secretary" },
    { name: "Namusoke Zaharah", role: "Director" },
    { name: "Namusoke Hawah", role: "Director" },
    { name: "Musoke Ashiraf", role: "Director" },
    { name: "Namusoke Faridah", role: "Director & Deputy Secretary" },
  ],
};

export const donationAmounts = [
  {
    id: "10k",
    label: "UGX 10,000",
    value: 10000,
    impact: "Learning materials for a student building their path forward.",
  },
  {
    id: "50k",
    label: "UGX 50,000",
    value: 50000,
    impact: "A seedling pack and training for a farmer growing a livelihood.",
  },
  {
    id: "100k",
    label: "UGX 100,000",
    value: 100000,
    impact: "A month of community outreach, health education, and care.",
  },
  {
    id: "custom",
    label: "Custom",
    value: null,
    impact: "Invest at any level—every partnership strengthens someone who can strengthen others.",
  },
] as const;

export const testimonials = [
  {
    name: "Amina N.",
    role: "Parent & mentor, Masaka",
    quote:
      "My child walks to school with books and confidence—and now helps younger learners too.",
    initials: "AN",
  },
  {
    name: "Joseph K.",
    role: "Coffee farmer",
    quote:
      "The seedlings and training changed our harvest. We present quality coffee and plan for the seasons ahead.",
    initials: "JK",
  },
  {
    name: "Fatima S.",
    role: "Community volunteer",
    quote:
      "Serving with Hafisa Magezi feels like family—faithful, warm, and focused on real empowerment.",
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
  { id: "teach", label: "Mentor learners", detail: "Share skills, encouragement, and presence." },
  { id: "outreach", label: "Community outreach", detail: "Help with health education and care visits." },
  { id: "events", label: "Events & logistics", detail: "Make launches and gatherings run with grace." },
] as const;

export const volunteer = {
  title: "Lend your hands. Grow strength.",
  body: "Plant trees, mentor learners, support outreach, and help communities flourish. Every hour you give becomes someone else’s capacity to rise—and lift others.",
  cta: "Become a Volunteer",
  image: "/images/environment-resilience.jpg",
  imageAlt: "Community planting for a resilient, healthy landscape",
};

export const donation = {
  backgroundImage: "/images/farmer-empowered.jpg",
  backgroundImageAlt: "A confident farmer among thriving young coffee trees",
  eyebrow: "Invest in empowerment",
  title: "Your partnership grows futures",
  subtitle:
    "Choose an amount and invest in skills, healthy coffee livelihoods, and communities that support one another.",
  ctaLabel: "Invest now",
};

export const contact = {
  eyebrow: "Contact",
  title: "We would love to hear from you",
  subtitle:
    "Reach out about partnerships, volunteering, or how we can walk alongside your community.",
  email: "hello@hafisamagezi.org",
  phone: "+256 775 721 332",
  details: [
    {
      label: "Registered office",
      value: "Kyebando, Kawempe — Kampala, Uganda",
    },
    {
      label: "Programmes",
      value: "Masaka District & across Uganda",
    },
    {
      label: "Phone",
      value: "+256 775 721 332",
      href: "tel:+256775721332",
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
    title: "A foundation built on dignity and empowerment",
    subtitle:
      "From our Kampala registered office and Masaka programmes, we grow skills, livelihoods, and community strength across Uganda.",
    image: "/images/community-solidarity.jpg",
    imageAlt: "Community partners united in service and learning",
  },
  programs: {
    eyebrow: "Our programmes",
    title: "Six pathways of lasting empowerment",
    subtitle:
      "Care, skills, livelihoods, health, environment, and partnerships—woven so people can stand strong and support others.",
    image: "/images/farmer-empowered.jpg",
    imageAlt: "A thriving coffee livelihood rooted in skill and care",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Connect with our mission",
    subtitle: "Whether you give, partner, or volunteer—every step forward strengthens someone who can strengthen others.",
    image: "/images/coffee-seedlings-tray.jpg",
    imageAlt: "Healthy seedlings shared as a symbol of partnership",
  },
} as const;

export const footer = {
  mission:
    "Hafisa Magezi Foundation Limited empowers people across Uganda—building skills, livelihoods, health, and resilient communities so people who rise can lift others.",
  legalLine: "Company limited by guarantee without share capital · Registered in Kampala, Uganda",
  quickLinks: [
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/contact", label: "Contact" },
    { href: donateUrl, label: "Support the mission", external: true },
  ],
  socials: [] as { label: string; href: string; placeholder?: boolean }[],
};

export const programJourney = {
  eyebrow: "Our programmes",
  title: "Three pillars of lasting empowerment",
  subtitle:
    "Education and skills, livelihoods and agriculture, and community strength—woven so opportunity can take root and multiply.",
};

export const storyMomentsHeading = {
  eyebrow: "Impact stories",
  title: "From first step to lasting strength",
};

export const testimonialsHeading = {
  eyebrow: "Community voices",
  title: "Stories that keep us moving",
  subtitle: "Real voices from parents, farmers, volunteers, and partners across Uganda.",
};

export const timelineHeading = {
  eyebrow: "Our journey",
  title: "A timeline of growing strength",
};

export const mapHeading = {
  eyebrow: "Where we work",
  title: "Roots and reach across Uganda",
  subtitle:
    "Kampala registered office and Masaka programmes—with planned expansion for skills, livelihoods, and community strength.",
};

export const photoRiverHeading = {
  eyebrow: "In the field",
  title: "Empowerment in motion",
  subtitle:
    "Real moments from our people—woven with the work of skills, harvests, and community strength.",
};
