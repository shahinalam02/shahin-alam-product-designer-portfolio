export interface CaseStudy {
  id: number;
  tag: string;
  category: 'fin' | 'web' | 'mob';
  categoryLabel: string;
  themeClass: 'c1' | 'c2' | 'c3';
  accentColor: string;
  title: string;
  headlineQuote: string;
  lead: string;
  problem: string;
  context: string;
  role: string;
  timeline: string;
  tools: string[];
  goals: string[];
  outcome: string;
  methods: string[];
  findings: { title: string; desc: string; note: string }[];
  insights: { title: string; desc: string }[];
  options: { label: string; title: string; desc: string; chosen?: boolean }[];
  choiceReason: string;
  decisions: { title: string; why: string; tradeOff: string }[];
  beforeJourney: string[];
  afterJourney: string[];
  solutionHeadline: string;
  solutionCta: string;
  learnings: { title: string; desc: string }[];
}

export const CASE_STUDIES: Record<number, CaseStudy> = {
  1: {
    id: 1,
    tag: "Case 01 · Fintech / SaaS",
    category: "fin",
    categoryLabel: "Fintech / SaaS",
    themeClass: "c1",
    accentColor: "#C6F34F",
    title: "Users don't understand the product.",
    headlineQuote: "Users don't understand the product.",
    lead: "How a dense fintech dashboard was transformed into a structured journey with one clear next step.",
    problem: "New users arrived at the dashboard and froze. Seven metrics, five navigation tabs, and twelve setup cards competed for their attention all at once.",
    context: "A data-heavy fintech and treasury dashboard introducing multiple advanced financial concepts on first login.",
    role: "Lead Product Designer (UX, UI, Information Architecture)",
    timeline: "8 weeks · Discovery to Hand-off",
    tools: ["Figma", "UserTesting", "Maze", "Linear", "Tailwind CSS"],
    goals: [
      "Help new users reach their first valuable insight within 3 minutes",
      "Progressively disclose advanced reporting without crowding day-one onboarding",
      "Establish a resilient design system architecture for future financial instruments"
    ],
    outcome: "Simplified a complex multi-metric experience into a guided product journey with a 48% drop in first-day support inquiries.",
    methods: [
      "User Observation Sessions",
      "Customer Success Ticket Audit",
      "Information Architecture Card Sorting",
      "Clickstream Funnel Analysis"
    ],
    findings: [
      {
        title: "Information Paralysis",
        desc: "Users spent an average of 42 seconds scanning before making their first click, often clicking arbitrary tabs out of confusion.",
        note: "Usability testing cohort (n=14)"
      },
      {
        title: "Hidden Value Milestone",
        desc: "Users who linked an account retained at 3.4x higher rates, yet the connection step was tucked inside a sub-settings menu.",
        note: "Funnel drop-off analytics"
      },
      {
        title: "Jargon Obstacle",
        desc: "Financial terminology was presented without real-time contextual definitions or preview states.",
        note: "Direct user interviews"
      }
    ],
    insights: [
      {
        title: "Order matters more than decoration",
        desc: "The interface didn't suffer from bad styling; it suffered from an inverted sequence where setup details preceded core value."
      },
      {
        title: "People need a next step, not an entire tour",
        desc: "Multi-step tooltips and coachmarks were immediately dismissed. Users learn by completing real tasks with instant feedback."
      },
      {
        title: "Power users shouldn't pay for beginners",
        desc: "By designing progressive disclosure pathways, advanced analytics remain one click away while keeping the primary flow pristine."
      }
    ],
    options: [
      {
        label: "A",
        title: "Interactive Modal Tour",
        desc: "A 5-step modal walk-through explaining every card before allowing interaction."
      },
      {
        label: "B",
        title: "Guided Pathway (Chosen)",
        desc: "One single dominant action card ('Connect your first account') with ambient progress and quiet secondary tools.",
        chosen: true
      },
      {
        label: "C",
        title: "Contextual Tooltip Hints",
        desc: "Passive pulsed dots indicating feature hints scattered throughout the dense screen."
      }
    ],
    choiceReason: "Modal tours front-load information that users immediately forget. Tooltip hints fail to establish clear hierarchy. The guided path gave users an effortless starting point while maintaining direct utility.",
    decisions: [
      {
        title: "One primary action per screen",
        why: "Every screen must have an unmistakable next step. If every card screams for attention, none gets it.",
        tradeOff: "Secondary export and configuration tools are placed behind a clean contextual menu."
      },
      {
        title: "Introduce features only when needed",
        why: "Advanced portfolio modeling makes sense only after real data is synchronized, not before.",
        tradeOff: "New signups discover deep reporting slightly later in their overall lifecycle."
      },
      {
        title: "Real-time state confirmation",
        why: "Financial transactions require immediate reassurance that actions executed correctly.",
        tradeOff: "Requires dedicated status toast and receipt animation states to design and implement."
      }
    ],
    beforeJourney: ["Sign up", "Full dashboard dump", "Confusing tooltip tour", "Search settings", "Connect account", "First insight"],
    afterJourney: ["Sign up", "Connect first account", "Instant live insight"],
    solutionHeadline: "Connect your first account",
    solutionCta: "Connect securely",
    learnings: [
      {
        title: "Start from the first 60 seconds",
        desc: "How a user feels during their initial minute defines whether they perceive the product as complex or intuitive."
      },
      {
        title: "Cutting explanation clarifies more than adding it",
        desc: "Removing 60% of instructional copy and letting the action speak for itself dramatically improved comprehension."
      }
    ]
  },
  2: {
    id: 2,
    tag: "Case 02 · Web product",
    category: "web",
    categoryLabel: "Web product",
    themeClass: "c2",
    accentColor: "#C6F34F",
    title: "The interface feels outdated.",
    headlineQuote: "The interface feels outdated.",
    lead: "How a cluttered marketing platform rebuilt its visual hierarchy around one clear promise and one clear action.",
    problem: "The previous site suffered from competing banners, fragmented typography, and unclear positioning. Potential buyers couldn't articulate what the software actually did.",
    context: "A B2B SaaS website redesign balancing lead generation, product capability showcases, and enterprise credibility.",
    role: "Website & Brand Experience Designer",
    timeline: "6 weeks · Audit to Production Build",
    tools: ["Figma", "Hotjar", "Tailwind CSS", "TypeScript", "Google Analytics"],
    goals: [
      "Clarify the core value proposition above the fold in under 5 seconds",
      "Direct inbound traffic to an effortless demo booking experience",
      "Modernize the design language to match modern B2B standards"
    ],
    outcome: "Reduced bounce rate by 34% and lifted demo form completions by 62% in the first quarter post-launch.",
    methods: [
      "Heatmap & Scroll Depth Analysis",
      "Executive & Sales Team Stakeholder Interviews",
      "Competitor Landscape Benchmarking",
      "Copywriting & Value Proposition Sprints"
    ],
    findings: [
      {
        title: "Hero Confusion",
        desc: "Over 68% of visitors bounced without scrolling past the carousel banner, which cycled through 4 unrelated announcements.",
        note: "Hotjar session recording review"
      },
      {
        title: "Competing CTAs",
        desc: "The homepage presented 7 different buttons: 'Read Whitepaper', 'Watch Video', 'Schedule Call', 'Login', 'Contact Sales', etc.",
        note: "CTA inventory audit"
      },
      {
        title: "Buried Customer Proof",
        desc: "Enterprise client logos and case study metrics were hidden at the very bottom of the page.",
        note: "Scroll depth analytics"
      }
    ],
    insights: [
      {
        title: "Hierarchy is 80% of perceived modernism",
        desc: "Clients often describe lack of visual discipline as 'outdated'. Clean contrast, tight typography, and whitespace fix this immediately."
      },
      {
        title: "Proof belongs immediately after the promise",
        desc: "Customer validation logos and concrete metrics work best when placed right beside the primary headline, not exiled to the footer."
      },
      {
        title: "One audience, one primary goal",
        desc: "Designing for both enterprise buyers and existing users in the same hero space dilutes impact for both."
      }
    ],
    options: [
      {
        label: "A",
        title: "Cosmetic Reskin",
        desc: "Keep the existing carousel and structure, but update fonts, borders, and colors."
      },
      {
        label: "B",
        title: "Focused Single-Action Hero (Chosen)",
        desc: "A bold, punchy headline, one unambiguous CTA button, and prominent customer logos underneath.",
        chosen: true
      },
      {
        label: "C",
        title: "Storytelling Long-Scroll",
        desc: "A narrative journey with 9 distinct animated chapters."
      }
    ],
    choiceReason: "A cosmetic reskin would have preserved the conversion-killing structural noise. The focused hero gave visitors crystal clarity on what the product offers and how to get started.",
    decisions: [
      {
        title: "Eliminate the hero carousel",
        why: "Carousels conceal information and frustrate visitors with unprompted motion.",
        tradeOff: "Secondary product marketing updates moved to a dedicated 'What's New' page."
      },
      {
        title: "Single primary CTA: 'Book a demo'",
        why: "Prevents analysis paralysis and aligns directly with the business's highest converting channel.",
        tradeOff: "Self-guided product video is now accessed via a quiet secondary modal."
      },
      {
        title: "High-contrast architectural layout",
        why: "Elevates brand perception from a generic startup to an established industry leader.",
        tradeOff: "Requires rigorous design tokens and strict photo art-direction."
      }
    ],
    beforeJourney: ["Land on page", "Auto-rotating carousel", "Scroll past 4 generic stock photos", "Unsure which button to click", "Bounce"],
    afterJourney: ["Land on page", "Absorb value proposition in 3s", "Click 'Book a demo'"],
    solutionHeadline: "One clear promise, one clear action.",
    solutionCta: "Book a demo",
    learnings: [
      {
        title: "Clarity beats cleverness every single time",
        desc: "Replacing abstract marketing jargon with simple, direct verbs transformed customer response."
      },
      {
        title: "Designing for developers early saves weeks",
        desc: "Specifying tokenized spacing and responsive breakpoints from day one made the implementation frictionless."
      }
    ]
  },
  3: {
    id: 3,
    tag: "Case 03 · Mobile app",
    category: "mob",
    categoryLabel: "Mobile app",
    themeClass: "c3",
    accentColor: "#FFD84A",
    title: "There are too many steps.",
    headlineQuote: "There are too many steps.",
    lead: "How an exhausting 6-step mobile checkout was streamlined into a fast 2-stage flow that respects user time.",
    problem: "Customers were abandoning a critical mobile purchase flow halfway through. Users faced 19 form inputs, optional surveys, and hidden fees.",
    context: "A high-frequency mobile commerce and subscription application where speed directly impacts revenue.",
    role: "Mobile Product Designer (iOS & Android Native Patterns)",
    timeline: "5 weeks · Prototype & User Testing",
    tools: ["Figma", "Protopie", "SwiftUI concepts", "Mixpanel"],
    goals: [
      "Cut mobile completion time from 4.2 minutes down to under 90 seconds",
      "Eliminate unnecessary questions from the critical transaction path",
      "Provide complete pricing transparency with zero post-click surprises"
    ],
    outcome: "Reduced abandonment by 52%, raised flow completion rates to 89%, and increased repeat mobile transactions.",
    methods: [
      "Mobile Thumb-Zone Heatmapping",
      "Step-by-Step Drop-Off Funnel Instrumentation",
      "Rapid Paper Prototyping & Guerilla Testing",
      "Apple Pay & Google Pay Native Checkout Evaluation"
    ],
    findings: [
      {
        title: "Fatigue at Step 3",
        desc: "Over 44% of total drop-offs occurred when asking for secondary billing addresses and marketing preferences.",
        note: "Drop-off step telemetry"
      },
      {
        title: "Hidden Fees Frustration",
        desc: "Users abandoned immediately upon discovering tax and delivery surcharges on the final confirmation screen.",
        note: "User observation recordings"
      },
      {
        title: "Small Keyboard Friction",
        desc: "Manual entry for card numbers without autofill or camera scan resulted in frequent validation errors.",
        note: "Mobile keyboard analytics"
      }
    ],
    insights: [
      {
        title: "Effort must follow value, not precede it",
        desc: "Asking users to fill optional surveys before completing their transaction creates immense resentment."
      },
      {
        title: "Visible progress sustains momentum",
        desc: "When users know an interaction is only 2 simple stages, completion rates skyrocket compared to ambiguous 'Step X of ??' flows."
      },
      {
        title: "Smart defaults eliminate 70% of typing",
        desc: "Shipping same as billing, auto-detecting card types, and native biometric payments remove mechanical drag."
      }
    ],
    options: [
      {
        label: "A",
        title: "Accordion One-Pager",
        desc: "One giant scrolling page with collapsible accordions for each section."
      },
      {
        label: "B",
        title: "Two-Stage Flow with Native Pay (Chosen)",
        desc: "Stage 1: Delivery & Summary; Stage 2: Biometric One-Tap Pay (Apple/Google Pay) with instant confirmation.",
        chosen: true
      },
      {
        label: "C",
        title: "Progressive Chat Bot",
        desc: "Conversational question-by-question message bubble interface."
      }
    ],
    choiceReason: "The accordion one-pager felt overwhelming on small mobile viewports. The conversational bot felt gimmicky for repeated purchases. The 2-stage native flow delivered speed, transparency, and ergonomic thumb reach.",
    decisions: [
      {
        title: "Move surveys post-purchase",
        why: "Never allow non-essential market research to stand between a paying user and confirmation.",
        tradeOff: "Survey response rate drops by 20%, but total completed sales jump dramatically."
      },
      {
        title: "Show full breakdown from second one",
        why: "Surprise fees at checkout destroy trust. Total price including taxes is visible from screen 1.",
        tradeOff: "Requires dynamic real-time geolocation tax calculation on the backend."
      },
      {
        title: "Full-width bottom thumb action",
        why: "Easy reach for single-handed mobile usage without finger acrobatics.",
        tradeOff: "Fixed bottom bar requires strict safe-area margin handling."
      }
    ],
    beforeJourney: ["Add item", "Create account", "Billing address", "Shipping address", "Shipping method", "Payment info", "Marketing survey", "Review"],
    afterJourney: ["Add item", "Review summary & address", "One-tap confirm"],
    solutionHeadline: "Just the essentials",
    solutionCta: "Pay with Face ID",
    learnings: [
      {
        title: "Mobile fiercely punishes excess",
        desc: "Every extra input field on a touchscreen has double the abandonment cost of desktop."
      },
      {
        title: "Biometric checkout changes customer psychology",
        desc: "When payment feels as effortless as glancing at a phone, customer hesitation evaporates."
      }
    ]
  }
};

export const DIAGNOSIS_OPTIONS = [
  {
    key: "new",
    label: "I'm building a new product",
    caseId: 1,
    tag: "Starting from scratch",
    headline: "Start with the structure, not the decoration.",
    why: "New products succeed when the user journey is clear from day one. I help founders and teams turn messy requirements into an intuitive, high-converting product path.",
    cta: "Start your project",
    href: "#/contact",
    secondaryCta: "See Case 01",
    secondaryHref: "#/case/1"
  },
  {
    key: "complex",
    label: "My product feels complicated",
    caseId: 1,
    tag: "Case 01 · Fintech / SaaS",
    headline: "Users don't understand the product.",
    why: "Complexity is usually an ordering problem, not a feature problem. See how a dense fintech platform was restructured into a clear progressive journey.",
    cta: "Explore Case 01"
  },
  {
    key: "convert",
    label: "My website isn't converting",
    caseId: 2,
    tag: "Case 02 · Web product",
    headline: "One clear promise, one clear action.",
    why: "Conversion depends on visual hierarchy and immediate clarity. Case 02 details how stripping away competing noise created a 62% lift in lead completions.",
    cta: "Explore Case 02"
  },
  {
    key: "dated",
    label: "My UI looks outdated",
    caseId: 2,
    tag: "Case 02 · Web product",
    headline: "Modern design is mostly clarity and hierarchy.",
    why: "A true redesign is far more than new gradients or fonts. I rework hierarchy, contrast, and layout architecture together for enduring quality.",
    cta: "Explore Case 02"
  },
  {
    key: "audit",
    label: "I need a UX audit",
    caseId: 3,
    tag: "Case 03 · Mobile app",
    headline: "Find where people are struggling.",
    why: "An audit pinpoints friction across critical funnels. Case 03 illustrates how identifying hidden drop-off points reduced mobile abandonment by 52%.",
    cta: "Explore Case 03"
  },
  {
    key: "unsure",
    label: "I'm not sure yet",
    caseId: 0,
    tag: "60-second interactive demo",
    headline: "Let me show you how I diagnose a product.",
    why: "Not sure where the leaks are? That's completely normal. Try the interactive 60-second diagnosis below to see my exact thought process.",
    cta: "See How I Think",
    href: "#thinking"
  }
];

export const PROCESS_STAGES = [
  {
    num: "01",
    name: "Discover",
    question: "What are we actually solving?",
    description: "Before touching a design tool, I question the brief. We look at real usage data, talk to users, and interview stakeholders to uncover the real problem behind the request.",
    deliverables: [
      "Stakeholder & Founder Alignment",
      "Analytics & User Drop-off Audit",
      "Customer Friction Interviews",
      "Competitive Landscape Analysis"
    ]
  },
  {
    num: "02",
    name: "Define",
    question: "What deserves our immediate focus?",
    description: "We turn raw research into clear product principles and a prioritized roadmap. Instead of trying to fix everything at once, we solve the highest-impact friction points first.",
    deliverables: [
      "Validated Problem Statement",
      "Core User Journey Mapping",
      "Constraint & Priority Framework",
      "Success Metrics & KPIs"
    ]
  },
  {
    num: "03",
    name: "Design",
    question: "How can we make this radically simpler?",
    description: "I explore structural architecture and flows before jumping to polished UI. We test multiple structural directions, choose the strongest, and craft a cohesive design system.",
    deliverables: [
      "Information Architecture",
      "Interactive Prototypes",
      "Polished UI & Component System",
      "Responsive Layouts (Desktop & Mobile)"
    ]
  },
  {
    num: "04",
    name: "Demonstrate",
    question: "Does the solution genuinely work?",
    description: "Design isn't finished when the Figma file is exported. We validate with real users, collaborate directly with developers on production constraints, and track live outcomes.",
    deliverables: [
      "Usability Validation Tests",
      "Developer Handoff with Token Specs",
      "Edge-case & Error State Guides",
      "Post-Launch Measurement"
    ]
  }
];

export const SERVICES = [
  {
    id: "product",
    title: "Product Design",
    tag: "For founders & scaling teams",
    lede: "From messy requirements to structured, production-ready product experiences.",
    fit: "You have a vision, product requirements, or an MVP, but need an intuitive product structure and polished interface that users love.",
    whatYouGet: [
      "Complete User Flows & Wireframes",
      "Clickable High-Fidelity Prototype",
      "Production-Grade UI Design (Figma)",
      "Scalable Design System Basics",
      "Responsive Desktop & Mobile Specs"
    ],
    flow: ["Requirements", "Structure", "Flows", "Interface"]
  },
  {
    id: "website",
    title: "Website Design",
    tag: "For SaaS companies & businesses",
    lede: "Websites that clearly communicate value and convert visitors into active customers.",
    fit: "Your product works, but your marketing site is cluttered, confusing, or failing to convert curious visitors into qualified leads.",
    whatYouGet: [
      "Message & Positioning Hierarchy",
      "Wireframe & Content Architecture",
      "Responsive High-Impact UI Design",
      "Clean Developer Specifications & Assets",
      "Accessibility & Performance Guidance"
    ],
    flow: ["Message", "Hierarchy", "Action", "Handoff"]
  },
  {
    id: "mobile",
    title: "Mobile App Design",
    tag: "For iOS & Android applications",
    lede: "Frictionless flows for mobile products people interact with daily.",
    fit: "You are building or refining an app where speed, thumb ergonomics, and repeat habit loops determine long-term retention.",
    whatYouGet: [
      "Native iOS & Android UX Patterns",
      "Thumb-Friendly Navigation & Layouts",
      "High-Fidelity Interactive Prototypes",
      "Modular Mobile Component Library",
      "Micro-interaction & Gesture Specs"
    ],
    flow: ["Core Loop", "Flows", "Prototype", "Native Specs"]
  },
  {
    id: "redesign",
    title: "Product Redesign",
    tag: "For existing software & platforms",
    lede: "Identify friction, rethink information architecture, and redesign what truly matters.",
    fit: "Your software has accrued technical or visual debt over years, leaving users confused and modern competitors looking fresher.",
    whatYouGet: [
      "UX Friction Map & Audit",
      "Prioritized Redesign Roadmap",
      "Redesigned Core Screens & Flows",
      "Side-by-Side Before & After Benchmarks",
      "Phased Rollout Migration Guide"
    ],
    flow: ["Find Friction", "Rethink", "Redesign", "Migrate"]
  },
  {
    id: "audit",
    title: "UX Audit",
    tag: "Rapid 5-day diagnostic assessment",
    lede: "Uncover hidden drop-offs, accessibility bottlenecks, and revenue leaks in your current app.",
    fit: "You know something is off in your funnel but can't pinpoint why, or you want an expert second opinion before committing to major engineering.",
    whatYouGet: [
      "Heuristic Usability Evaluation",
      "Annotated Screen-by-Screen Breakdown",
      "Quick Wins vs. Strategic Rebuild List",
      "Actionable Video Walkthrough",
      "Prioritized Engineering Punch List"
    ],
    flow: ["Review", "Findings", "Priorities", "Action Plan"]
  }
];

export const SELF_AUDIT_QUESTIONS = [
  {
    id: 0,
    area: "Clarity",
    question: "Can a first-time visitor tell what you offer within 5 seconds?",
    why: "If visitors can't immediately understand the value proposition, they bounce before exploring further."
  },
  {
    id: 1,
    area: "Hierarchy",
    question: "Is there ONE unambiguous primary action on your most important screen?",
    why: "When every button and card screams with equal visual weight, users experience choice paralysis."
  },
  {
    id: 2,
    area: "Cognitive Load",
    question: "Can new users complete your core flow without needing a help guide or tour?",
    why: "Needing tutorials usually signals that the interface is fighting against user mental models."
  },
  {
    id: 3,
    area: "Trust & Feedback",
    question: "Does your interface immediately confirm what happened after critical actions?",
    why: "Ambiguous confirmation leaves users anxious about whether payment or submission succeeded."
  },
  {
    id: 4,
    area: "Evidence",
    question: "Have you watched real users interact with your product in the past 60 days?",
    why: "Designing without ongoing observation leads to building features based on guesswork rather than reality."
  }
];

export const FAQS = [
  {
    q: "Will you understand my business and industry?",
    a: "I start every engagement by listening and asking sharp questions. Before touching any design tool, I learn who your users are, how your business generates revenue, and where customers stall. You know your domain best; my job is to absorb it rapidly and translate it into clear interfaces."
  },
  {
    q: "Will I know what is happening during the project?",
    a: "Yes. You won't experience weeks of radio silence followed by a surprise reveal. You will see sketches, low-fidelity wireframes, and prototypes in progress, along with the reasoning behind each decision. We test and align early."
  },
  {
    q: "What if we don't agree on a design direction?",
    a: "Tell me immediately and tell me why. We evaluate every direction against the validated problem statement and user evidence, not arbitrary personal preference. Catching misalignments at the wireframe stage costs 10x less than altering finished code."
  },
  {
    q: "Can you collaborate directly with software engineers?",
    a: "Yes. I hold a Computer Science & Engineering (CSE) background and have deep frontend fluency in TypeScript, React, and CSS. I design with real-world state machines, component hierarchies, responsive breakpoints, and edge-case error states in mind."
  },
  {
    q: "How do you handle feedback and revisions?",
    a: "I treat feedback as valuable information. When you or a team member comment, I dig into the underlying problem behind the request. If I disagree based on usability evidence or business objectives, I will explain why with clarity and respect."
  }
];
