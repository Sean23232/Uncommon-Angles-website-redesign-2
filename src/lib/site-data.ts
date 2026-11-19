export const BRAND = {
  name: "UnCommon Angles, Inc.",
  shortName: "UnCommon Angles",
  founder: "Matt Young",
  founded: "1997",
  location: "Buena Vista, Colorado",
  phone: "719-395-6777",
  phoneHref: "tel:+17193956777",
  email: "matt@uncommonangles.com",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "custom-home-construction",
    title: "Custom Home Construction",
    description:
      "From the first foundation pour to the final detail, we build homes shaped around the way you want to live — and the budget you want to keep.",
    image: "/images/img_sl_8.png",
    alt: "Completed Colorado home with stone and timber exterior",
  },
  {
    slug: "structural-construction",
    title: "Structural Construction",
    description:
      "Dependable structural work for new builds and complex projects, delivered with the hands-on oversight of an experienced crew.",
    image: "/images/img_sl_7.png",
    alt: "Structural framing and crane work during home construction",
  },
  {
    slug: "foundation-and-concrete",
    title: "Foundation and Concrete Work",
    description:
      "Site concrete and foundation work that starts every build on solid ground, including the less visible work that lasts the longest.",
    image: "/images/Project-1.jpeg",
    alt: "Foundation and structure of a custom home under construction",
  },
  {
    slug: "framing-and-carpentry",
    title: "Framing and Carpentry",
    description:
      "Precise framing and rough carpentry that keep projects on schedule and give every finished surface a straight, true foundation.",
    image: "/images/Zrzut-ekranu-2018-04-05-o-10.26.27.png",
    alt: "Framing and structure of a home under construction",
  },
  {
    slug: "roofing",
    title: "Roofing",
    description:
      "Roof installation as part of a complete structural build, detailed to protect the home and complement its architecture.",
    image: "/images/Project-6.jpeg",
    alt: "Finished roofline of a Colorado home",
  },
  {
    slug: "exterior-carpentry",
    title: "Exterior Carpentry",
    description:
      "Decks, porches, trim, and timber details that make a home feel settled into its Colorado surroundings.",
    image: "/images/SECOND-LEFT.jpeg",
    alt: "Timber-clad home with custom exterior deck and staircase",
  },
  {
    slug: "interior-carpentry",
    title: "Interior Carpentry",
    description:
      "Custom cabinetry, built-ins, doors, beams, and finish work — the details that turn a structure into a home.",
    image: "/images/Third-right.jpeg",
    alt: "Custom wood cabinetry and beams in a finished kitchen",
  },
  {
    slug: "decorative-concrete",
    title: "Decorative Concrete Work",
    description:
      "Site and decorative concrete solutions that add durability and character to patios, walks, and outdoor living areas.",
    image: "/images/First-on-the-right.jpeg",
    alt: "Exterior of a completed custom home with site work",
  },
  {
    slug: "residential-commercial-support",
    title: "Residential and Commercial Construction Support",
    description:
      "Whether you are building new or need experienced help getting a job back on schedule, we work with homeowners and general contractors alike.",
    image: "/images/Project-3.jpeg",
    alt: "Contemporary custom home completed by UnCommon Angles",
  },
];

export type SeedProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  details: string;
  coverImage: string;
  featured: boolean;
  sortOrder: number;
  photos: { url: string; caption: string }[];
};

export const SEED_PROJECTS: SeedProject[] = [
  {
    slug: "contemporary-mountain-home",
    title: "Contemporary Mountain Home",
    category: "Contemporary Homes",
    description:
      "Clean lines, generous glass, and an open connection to the mountain landscape — an example of the contemporary work documented in our project archive.",
    details:
      "Contemporary design • Extensive glazing • Structural and finish carpentry • Colorado setting",
    coverImage: "/images/Project-3.jpeg",
    featured: true,
    sortOrder: 1,
    photos: [
      { url: "/images/Project-3.jpeg", caption: "Contemporary exterior with mountain views" },
      { url: "/images/Zrzut-ekranu-2018-04-05-o-10.25.02.png", caption: "Modern exterior detailing" },
      { url: "/images/img_sl_9.png", caption: "Timber and stone exterior detail" },
    ],
  },
  {
    slug: "timber-clad-residence",
    title: "Timber-Clad Residence",
    category: "Craftsman Homes",
    description:
      "Warm wood siding, a substantial deck, and an inviting entry — a residence that shows the value of careful exterior carpentry.",
    details: "Exterior carpentry • Custom deck and stairs • Wood siding • Mountain setting",
    coverImage: "/images/SECOND-LEFT.jpeg",
    featured: true,
    sortOrder: 2,
    photos: [
      { url: "/images/SECOND-LEFT.jpeg", caption: "Timber-clad residence and deck" },
      { url: "/images/img_sl_8.png", caption: "Stone and timber exterior detail" },
    ],
  },
  {
    slug: "log-home-interior",
    title: "Log Home Interior",
    category: "Log Homes",
    description:
      "Exposed timber ceilings, custom built-ins, and a stone hearth define this interior from our log home work. The original company testimonials include log home projects in Garfield, Colorado.",
    details: "Interior carpentry • Custom built-ins • Stone fireplace • Timber ceiling",
    coverImage: "/images/img_sl_3.png",
    featured: true,
    sortOrder: 3,
    photos: [
      { url: "/images/img_sl_3.png", caption: "Stone hearth and custom built-ins" },
      { url: "/images/img_sl_4.png", caption: "Timber ceiling and open living space" },
      { url: "/images/img_sl_2.png", caption: "Sliding barn doors and custom shelving" },
      { url: "/images/img_sl_5.png", caption: "Bedroom finish carpentry" },
    ],
  },
  {
    slug: "custom-kitchen-carpentry",
    title: "Custom Kitchen Carpentry",
    category: "Interior Carpentry",
    description:
      "Rich wood cabinetry, reclaimed-look flooring, and handcrafted beams show the level of detail our crew brings to interior finish work.",
    details: "Custom cabinetry • Reclaimed wood flooring • Exposed beams • Finish carpentry",
    coverImage: "/images/Third-right.jpeg",
    featured: true,
    sortOrder: 4,
    photos: [
      { url: "/images/Third-right.jpeg", caption: "Custom kitchen cabinetry and island" },
      { url: "/images/First-on-the-right.jpeg", caption: "Interior finish detail" },
    ],
  },
  {
    slug: "custom-home-under-construction",
    title: "Custom Home Under Construction",
    category: "Custom Homes",
    description:
      "A look at the structural phase of a custom build — the foundation, framing, and weather-tight shell that come before the finished surfaces.",
    details: "Foundation • Structure • Framing • Weather-tight shell",
    coverImage: "/images/Project-1.jpeg",
    featured: true,
    sortOrder: 5,
    photos: [
      { url: "/images/Project-1.jpeg", caption: "Structure of a custom home under construction" },
      { url: "/images/img_sl_7.png", caption: "Framing and structural work in progress" },
    ],
  },
  {
    slug: "mountain-view-home",
    title: "Mountain View Home",
    category: "Custom Homes",
    description:
      "A completed home with an elevated deck and broad mountain views — the kind of outdoor living space that makes Colorado homes distinctive.",
    details: "Exterior carpentry • Raised deck • Mountain views • Custom home",
    coverImage: "/images/img_sl_9.png",
    featured: true,
    sortOrder: 6,
    photos: [
      { url: "/images/img_sl_9.png", caption: "Mountain-facing home and deck" },
      { url: "/images/Project-2.jpeg", caption: "Completed home exterior" },
    ],
  },
  {
    slug: "traditional-colorado-home",
    title: "Traditional Colorado Home",
    category: "Traditional Farmhouses",
    description:
      "A traditional pitched-roof home from our archive, reflecting the range of styles UnCommon Angles has built over decades in the Buena Vista area.",
    details: "Traditional form • Roofing • Exterior carpentry • Residential construction",
    coverImage: "/images/Project-6.jpeg",
    featured: false,
    sortOrder: 7,
    photos: [
      { url: "/images/Project-6.jpeg", caption: "Traditional home exterior" },
      { url: "/images/Project-4.jpeg", caption: "Residential exterior detail" },
    ],
  },
  {
    slug: "southwest-influenced-home",
    title: "Southwest-Influenced Home",
    category: "Custom Homes",
    description:
      "Earthen tones, rounded forms, and deep-set windows show another direction in the custom homes documented from the company's work.",
    details: "Custom home • Distinctive masonry • Site concrete • Colorado design",
    coverImage: "/images/img_sl_6.png",
    featured: false,
    sortOrder: 8,
    photos: [
      { url: "/images/img_sl_6.png", caption: "Southwest-influenced custom home" },
      { url: "/images/Project-5.jpeg", caption: "Completed exterior" },
    ],
  },
  {
    slug: "structural-framing-project",
    title: "Structural Framing Project",
    category: "Structural Construction",
    description:
      "Crane-set framing and structural carpentry in progress. This is the careful, physical work behind every dependable build.",
    details: "Structural construction • Crane-set framing • Rough carpentry • On-site coordination",
    coverImage: "/images/img_sl_7.png",
    featured: false,
    sortOrder: 9,
    photos: [
      { url: "/images/img_sl_7.png", caption: "Structural framing with crane" },
      { url: "/images/Zrzut-ekranu-2018-04-05-o-10.26.27.png", caption: "Framing nearing completion" },
      { url: "/images/Project-7.jpeg", caption: "Structure taking shape" },
    ],
  },
  {
    slug: "stone-and-timber-home",
    title: "Stone and Timber Home",
    category: "Custom Homes",
    description:
      "Natural stone, timber accents, and a covered entry create a home that feels grounded in its mountain setting.",
    details: "Stone work • Timber entry • Custom home • Exterior carpentry",
    coverImage: "/images/img_sl_8.png",
    featured: false,
    sortOrder: 10,
    photos: [
      { url: "/images/img_sl_8.png", caption: "Stone and timber home exterior" },
      { url: "/images/Project-3.jpeg", caption: "Contemporary custom home detail" },
    ],
  },
];

export type SeedTestimonial = {
  author: string;
  quote: string;
  context: string;
  featured: boolean;
  sortOrder: number;
};

export const SEED_TESTIMONIALS: SeedTestimonial[] = [
  {
    author: "Rocketsngold",
    quote:
      "Uncommon Angles completed all the work on my custom build except for the electrical and plumbing. We are very pleased with their work and professionalism.",
    context: "Custom home build",
    featured: true,
    sortOrder: 1,
  },
  {
    author: "Linneasimons",
    quote:
      "Uncommon Angles took an architects plan and turned it into our dream home. Matt Young and his team do fantastic work. They undertook the challenge of a small but surprisingly complicated house and made it look simple. They helped us modify the plans to work with our local environment and provided great ideas for making our house a wonderful home. Most of the work was done by Matt’s team of employees. When he used contractors, they were top notch. I would recommend them to anyone",
    context: "Dream home from an architect's plan",
    featured: true,
    sortOrder: 2,
  },
  {
    author: "Roberta Smith",
    quote:
      "Matt and his team built an energy efficient custom home for me in Salida, Colorado in 2013. They were efficient, very hardworking, trustworthy and always listened to my needs and responded quickly and fairly. As a single woman building a house it was not easy to find someone who respected what I envisioned but Matt did.",
    context: "Custom home · Salida, Colorado",
    featured: true,
    sortOrder: 3,
  },
  {
    author: "Criss Criss",
    quote:
      "You have built me a wonderful home and my family are very happy here thank you very much. best team. best company.",
    context: "Custom home",
    featured: false,
    sortOrder: 4,
  },
  {
    author: "Woody Swain",
    quote:
      "Matt and his crew did an excellent job building our “Swain Family Log Cabin”. The quality of construction was excellent, their work was affordable and competitively priced, and they were a pleasure to work with. No surprises on cost, the construction timeframe was appropriate, and they always found good solutions to the construction challenges (especially in the mountains) that they encountered along the way.",
    context: "Swain Family Log Cabin",
    featured: true,
    sortOrder: 5,
  },
  {
    author: "Brian Yates, Principal of Buena Vista High School",
    quote:
      "I give my full endorsement to the professional service and abilities of Uncommon Angles. I am without any doubts, confident in the construction and construction managment abilities of the gentleman of Uncommon Angles. I am sure you will find them most courteous, generous and a pleasure to work with.",
    context: "Client endorsement",
    featured: false,
    sortOrder: 6,
  },
  {
    author: "Woody Swain",
    quote:
      "It has been a sincere pleasure to work with you and the rest of the crew at Uncommon Angles in the building of our log home in Garfield, Colorado, and I would be pleased to take with any of your potential clients about the high quality and value of the work you do.",
    context: "Log home · Garfield, Colorado",
    featured: false,
    sortOrder: 7,
  },
  {
    author: "DeLarue Building Co.",
    quote:
      "I have worked with Uncommon Angles, Inc. on many custom home projects and have been very happy with the professionalism, competency, and attention to detail that Matt and his crew have. They have been an integral part of each project they have worked with me on, and I would give them an excellent endorsement! Thanks to the whole team at UnCommon Angles!",
    context: "General contractor partnership",
    featured: true,
    sortOrder: 8,
  },
  {
    author: "Katty Daly",
    quote:
      "Matt and his crew built our home for us in 2010-11. His work is exemplary. His attention to detail and superb craftsmanship have resulted in a home that, for the past 7 years, has needed no repairs or tweaks. That alone is enough to recommend him. On a personal level, he is wonderful to work with.",
    context: "Custom home · 2010–2011",
    featured: true,
    sortOrder: 9,
  },
  {
    author: "Steve T.",
    quote:
      "Matt built a beautiful house. The quality of build is superb. Matt constantly looked for high value materials, and the results show. The house is a showcase in the neighborhood, yet was very economical to build. Structurally, the house is quite solid, and the building envelop very tight. I would not hesitate to recommend Uncommon Angles.",
    context: "Custom home",
    featured: false,
    sortOrder: 10,
  },
  {
    author: "Steve Pike",
    quote:
      "Matt, owner of Uncommon Angles and his crew are very talented in all aspects of the construction industry. Not only are they true Craftsman they run a great business while providing cot containment avenues for projects they perform on. Highly Recommended!",
    context: "Client recommendation",
    featured: false,
    sortOrder: 11,
  },
];

export type ContentItem = { key: string; value: string; label: string; group: string };

export const DEFAULT_CONTENT: ContentItem[] = [
  {
    key: "hero_headline",
    label: "Hero headline",
    group: "Homepage",
    value: "Built With Purpose. Crafted to Last.",
  },
  {
    key: "hero_text",
    label: "Hero description",
    group: "Homepage",
    value:
      "From custom homes to complex construction projects, UnCommon Angles brings your vision to life through dependable craftsmanship, thoughtful planning, and quality workmanship.",
  },
  {
    key: "about_story",
    label: "About introduction",
    group: "Homepage",
    value:
      "In 1997, Matt Young, a native of Buena Vista, saw the need for an honest, dependable construction company. Since then, his mission has been to deliver the same trusted service on every job — from custom homes to large commercial investments.",
  },
  {
    key: "cta_headline",
    label: "Contact banner headline",
    group: "Homepage",
    value: "Have a Project in Mind? Let’s Build Something Great.",
  },
  {
    key: "cta_text",
    label: "Contact banner text",
    group: "Homepage",
    value:
      "Whether you're planning a custom home or need experienced construction support, we'd be happy to discuss your project.",
  },
  {
    key: "footer_description",
    label: "Footer description",
    group: "Company",
    value:
      "Custom home building and structural construction in Buena Vista, Colorado and the surrounding mountain region. Founded by Matt Young in 1997.",
  },
  {
    key: "phone",
    label: "Phone number",
    group: "Company",
    value: BRAND.phone,
  },
  {
    key: "email",
    label: "Email address",
    group: "Company",
    value: BRAND.email,
  },
  {
    key: "facebook_url",
    label: "Facebook profile URL",
    group: "Social Media",
    value: "https://www.facebook.com/UnCommon-Angles-Inc-Custom-Builders-127577100671928/",
  },
  {
    key: "instagram_url",
    label: "Instagram profile URL",
    group: "Social Media",
    value: "",
  },
  {
    key: "linkedin_url",
    label: "LinkedIn profile URL",
    group: "Social Media",
    value: "",
  },
  {
    key: "review_platform_url",
    label: "Preferred review platform URL (optional)",
    group: "Social Media",
    value: "https://www.houzz.com/professionals/home-builders/uncommon-angles-inc-pfvwus-pf~789546412",
  },
];

export const IMAGE_LIBRARY = [
  "/images/img_sl_1.png",
  "/images/img_sl_2.png",
  "/images/img_sl_3.png",
  "/images/img_sl_4.png",
  "/images/img_sl_5.png",
  "/images/img_sl_6.png",
  "/images/img_sl_7.png",
  "/images/img_sl_8.png",
  "/images/img_sl_9.png",
  "/images/Project-1.jpeg",
  "/images/Project-2.jpeg",
  "/images/Project-3.jpeg",
  "/images/Project-4.jpeg",
  "/images/Project-5.jpeg",
  "/images/Project-6.jpeg",
  "/images/Project-7.jpeg",
  "/images/First-on-the-right.jpeg",
  "/images/SECOND-LEFT.jpeg",
  "/images/Third-right.jpeg",
  "/images/Zrzut-ekranu-2018-04-05-o-10.25.02.png",
  "/images/Zrzut-ekranu-2018-04-05-o-10.26.27.png",
  "/images/Zrzut-ekranu-2018-04-05-o-10.27.36.png",
];

export const PROJECT_CATEGORIES = [
  "Custom Homes",
  "Log Homes",
  "Contemporary Homes",
  "Traditional Farmhouses",
  "Craftsman Homes",
  "Interior Carpentry",
  "Structural Construction",
];
