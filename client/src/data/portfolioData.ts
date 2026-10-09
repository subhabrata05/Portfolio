import type { 
  ProfileInfo, 
  ProjectItem, 
  CreativeItem, 
  SkillCategory, 
  EducationItem, 
  JourneyMilestone 
} from '../types/portfolio';

export const PROFILE_DATA: ProfileInfo = {
  name: "Subhabrata Dey",
  title: "Full-Stack & App Developer | Cybersecurity Enthusiast",
  tagline: "Building high-performance native Android, Flutter, React & Node.js systems with a security-first engineering mindset.",
  institution: "University of Engineering & Management (UEM) Jaipur",
  degree: "B.Tech in Computer Science & Engineering (Expected 2028)",
  location: "Jaipur, Rajasthan, India",
  phone: "+91 7477354574",
  bio: "Full-stack and cross-platform app developer shipping real products from native Android (Kotlin) to Flutter and React Native. Pairs modern engineering with a cybersecurity mindset honed through hands-on CTF competitions and secure coding practices. President of a 100+ member college club (Atrang), represented UEM at MOOD INDIGO (IIT Bombay), and selected as an open-source contributor for GirlScript Summer of Code (GSSOC) 2026 out of 95,000+ applicants.",
  pillars: [
    {
      title: "Mobile & Cross-Platform Development",
      subtitle: "Android Kotlin, Flutter & React Native",
      description: "Shipping real products across native Android (Kotlin) and cross-platform ecosystems (Flutter & React Native) with focus on clean architecture, fluid 60fps animations, and offline resilience.",
      iconName: "Smartphone"
    },
    {
      title: "Full-Stack Web & Applied AI",
      subtitle: "React 19, Next.js, Node.js & Groq LLMs",
      description: "Designing decoupled, production-grade web systems with Express REST APIs, low-latency Groq/Llama LLM assistants (JARVIS), and real-time computer vision interfaces (U.L.T.R.O.N.).",
      iconName: "Cpu"
    },
    {
      title: "Cybersecurity & Leadership",
      subtitle: "CTF Practice, Secure Coding & Club President",
      description: "Instilling security-first instincts into every build—ethical hacking fundamentals, CTF challenges, and API hardening—alongside leading a 100+ member college club and representing UEM at IIT Bombay.",
      iconName: "Shield"
    }
  ],
  socials: {
    github: "https://github.com/subhabrata05",
    linkedin: "https://linkedin.com/in/subhabrata-dey-53892440b",
    email: "deysubhabrata010@gmail.com",
    phone: "+91 7477354574",
    instagram: "https://instagram.com"
  }
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "University of Engineering & Management (UEM)",
    period: "Expected 2028",
    location: "Jaipur, Rajasthan, India",
    score: "CGPA: 6.85",
    status: "3rd Year (Current)",
    description: "Rigorous academic and practical engineering curriculum focusing on full-stack web and mobile development, applied AI, cybersecurity, and computer science systems.",
    focus: "Full-Stack Software Architecture, Mobile Systems, Applied AI, Cybersecurity",
    keyCourses: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java / C++)",
      "Database Management Systems & SQL",
      "Operating Systems & Computer Networks",
      "Software Engineering & Agile Methodologies",
      "Web Technologies & Distributed Architectures"
    ]
  },
  {
    degree: "Higher Secondary (Class XII) — CBSE",
    institution: "Kendriya Vidyalaya, Adra",
    period: "2023",
    location: "Adra, India",
    score: "Percentage: 65%",
    status: "Completed",
    description: "Senior secondary education with focus on Science, Mathematics, and Computer Science fundamentals."
  },
  {
    degree: "Secondary (Class X) — CBSE",
    institution: "Kendriya Vidyalaya, Adra",
    period: "2021",
    location: "Adra, India",
    score: "Percentage: 91%",
    status: "Completed",
    description: "High academic achievement in Mathematics, Science, and Analytical Problem Solving."
  }
];

export const JOURNEY_DATA: JourneyMilestone[] = [
  {
    year: "3rd Year (Current)",
    period: "2024 — Present",
    title: "President | Atrang — College Cultural Club",
    category: "Leadership",
    subtitle: "Leading 100+ Members • Tech & Operations Head",
    description: "Lead a core team to oversee full technical and operational functioning; progressed from Member to Technical Coordinator to President. Owned all technical execution for club events, including stage/AV setup, registrations, and on-ground tech operations. Represented the college and coordinated participation at MOOD INDIGO, IIT Bombay’s flagship cultural festival.",
    tags: ["Leadership", "Team Management", "Technical Execution", "Stage / AV Setup", "IIT Bombay Mood Indigo"],
    iconName: "Users"
  },
  {
    year: "May — Aug 2026",
    period: "2026",
    title: "Contributor | GirlScript Summer of Code (GSSOC) 2026",
    category: "Achievements",
    subtitle: "Open Source Contributor • Selected from 95,000+ Applicants",
    description: "Selected as a contributor for the prestigious GirlScript Summer of Code (GSSOC) 2026 open-source program from a highly competitive pool of 95,000+ applicants worldwide. Actively contributing code, reviewing pull requests, and building community software.",
    tags: ["Open Source", "GSSOC 2026", "Git / GitHub", "Collaboration", "Code Review"],
    iconName: "Sparkles"
  },
  {
    year: "Ongoing",
    period: "2024 — Present",
    title: "Cybersecurity Community & CTF Practitioner",
    category: "Engineering",
    subtitle: "Hands-on CTF Challenges & Secure Coding Practice",
    description: "Active in cybersecurity communities, engaging in hands-on Capture The Flag (CTF) challenges, ethical hacking practice, web exploitation analysis, secure coding practices, CORS protection, and API hardening.",
    tags: ["Ethical Hacking", "CTF Challenges", "Secure Coding", "CORS & API Hardening", "Network Security"],
    iconName: "Shield"
  },
  {
    year: "Hackathon",
    period: "2025",
    title: "Top 15 Finalist | College Hackathon",
    category: "Achievements",
    subtitle: "Shipped Working Demo • 3 Rounds of Judging",
    description: "Ideated, prototyped, and shipped a working full-stack demo under intense time constraints, successfully placing in the Top 15 after three rounds of rigorous technical and product judging.",
    tags: ["Hackathon", "Top 15", "Rapid Prototyping", "Demo Under Pressure", "Product Thinking"],
    iconName: "Trophy"
  },
  {
    year: "Foundations",
    period: "2023 — 2024",
    title: "B.Tech CSE at UEM Jaipur & Mobile Development",
    category: "Academics",
    subtitle: "Native Android (Kotlin), Flutter & React Native",
    description: "Commenced undergraduate studies in Computer Science & Engineering at UEM Jaipur. Built native Android apps in Kotlin and expanded to Flutter and React Native cross-platform workflows, pairing systems with relational and NoSQL databases.",
    tags: ["Android (Kotlin)", "Flutter", "React Native", "Data Structures", "Algorithms"],
    iconName: "GraduationCap"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-jarvis",
    title: "JARVIS — Personal AI Chat Assistant",
    slug: "jarvis-ai-assistant",
    summary: "Full-stack conversational AI assistant with a React 19 frontend and an Express REST backend powered by Groq's low-latency Llama-3.3-70b-versatile model.",
    description: "A production-grade conversational AI platform engineered with a high-performance React 19 client and a decoupled Express REST backend. Integrates Groq’s high-speed llama-3.3-70b-versatile model for near-instant conversational responses, CORS-protected endpoints, request-logging middleware, and health diagnostics.",
    architectureHighlights: [
      "Built a full-stack AI assistant with a React 19 frontend and an Express REST API backend",
      "Integrated Groq’s llama-3.3-70b-versatile model for fast, low-latency conversational responses",
      "Engineered a production backend with CORS-protected endpoints, request-logging middleware, and a health-check endpoint",
      "Designed a clean API contract to keep the frontend and AI backend decoupled and independently deployable"
    ],
    role: "Lead Full-Stack Developer",
    category: "AI & ML",
    tags: ["React 19", "Node.js", "Express", "Groq LLM API", "Llama 3.3 70B", "REST APIs", "CORS"],
    featured: true,
    githubUrl: "https://github.com/subhabrata05",
    liveUrl: "#",
    accentColor: "#06b6d4"
  },
  {
    id: "proj-ultron",
    title: "U.L.T.R.O.N. — Interactive 3D Orb Interface",
    slug: "ultron-3d-orb-interface",
    summary: "Hands-free 3D interactive interface using Three.js for real-time rendering, MediaPipe computer-vision hand tracking, and Web Speech API voice control.",
    description: "An exploratory sci-fi hands-free digital environment rendering real-time 3D geometry inside Next.js and React 19. Tracks 10+ distinct hand gestures entirely via webcam using MediaPipe, layered alongside Web Speech API voice command recognition and full keyboard-shortcut parity across three independent input modes.",
    architectureHighlights: [
      "Built a hands-free 3D interface using Three.js for real-time rendering inside a Next.js application",
      "Integrated MediaPipe computer-vision hand-tracking to drive 10+ gesture controls entirely via webcam",
      "Layered in Web Speech API voice commands and full keyboard-shortcut parity, creating three independent input modes",
      "Optimized WebGL rendering pipeline ensuring responsive 60fps performance across devices"
    ],
    role: "Lead Creative Technologist & Frontend Engineer",
    category: "Creative Tech",
    tags: ["Next.js", "React 19", "Three.js", "MediaPipe", "Computer Vision", "Web Speech API"],
    featured: true,
    githubUrl: "https://github.com/subhabrata05",
    liveUrl: "#",
    accentColor: "#3b82f6"
  },
  {
    id: "proj-mobile-apps",
    title: "Cross-Platform & Native Mobile Applications",
    slug: "cross-platform-mobile-apps",
    summary: "Suite of mobile applications spanning native Android (Kotlin), Flutter, and React Native with Firebase integration and offline persistence.",
    description: "Engineered scalable mobile applications focusing on native responsiveness, battery efficiency, and cross-platform flexibility. Developed native Android apps with Kotlin utilizing modern Jetpack libraries, alongside multi-platform Flutter and React Native deployments connected to Firebase authentication and cloud databases.",
    architectureHighlights: [
      "Native Android (Kotlin) development leveraging Coroutines, Jetpack components, and reactive architecture",
      "Cross-platform applications built with Flutter and React Native with shared business logic",
      "Firebase authentication, cloud Firestore data synchronization, and offline-first persistence",
      "Custom UI animations, bottom sheets, and ergonomic thumb-friendly touch interactions"
    ],
    role: "Mobile App Engineer",
    category: "App Development",
    tags: ["Android (Kotlin)", "Flutter", "React Native", "Firebase", "REST APIs", "Mobile UI"],
    featured: true,
    githubUrl: "https://github.com/subhabrata05",
    liveUrl: "#",
    accentColor: "#6366f1"
  },
  {
    id: "proj-portfolio-3d",
    title: "Cinematic 3D Parallax Portfolio & Admin Studio",
    slug: "cinematic-3d-portfolio",
    summary: "Interactive WebGL digital space with procedural lighting, React Three Fiber, GSAP, and a full-stack Express backend with a protected Admin Studio.",
    description: "High-performance digital presence combining React 19, Three.js (R3F), and GSAP parallax timelines with a typed Node.js/Express REST backend. Features a protected Admin Studio with JWT authorization, project CRUD, and contact message processing.",
    architectureHighlights: [
      "Custom procedural 3D core with lerped cursor tracking and additive blended particle fields",
      "GSAP ScrollTrigger timeline orchestration for smooth section reveals without scroll-hijacking",
      "Full-stack Express backend with typed PostgreSQL Prisma models and Zod schema validation",
      "Protected Admin Studio with JWT authentication, project CRUD, and contact message management"
    ],
    role: "Full-Stack Architect & 3D Designer",
    category: "Web Development",
    tags: ["React 19", "TypeScript", "Three.js", "R3F", "Tailwind CSS", "GSAP", "Prisma", "Express", "JWT"],
    featured: true,
    githubUrl: "https://github.com/subhabrata05",
    liveUrl: "#",
    accentColor: "#8b5cf6"
  }
];

export const CREATIVE_DATA: CreativeItem[] = [
  {
    id: "creative-1",
    title: "Geometric Monoliths & Urban Solitude",
    category: "Photography",
    caption: "High-contrast architectural exploration emphasizing leading lines, deep cast shadows, and minimal structural geometry.",
    mediaUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    tag: "Architectural Symmetry",
    gearNotes: "Manual exposure, focal length study, high-contrast monochrome calibration"
  },
  {
    id: "creative-2",
    title: "Golden Hour Atmosphere & Kinetic Streets",
    category: "Photography",
    caption: "Capturing fleeting golden reflections, ambient dusk warmth, and natural human rhythms during transit hours.",
    mediaUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    tag: "Street & Environmental",
    gearNotes: "Natural ambient light, wide aperture bokeh, documentary framing"
  },
  {
    id: "creative-3",
    title: "Cinematic Rhythm & Mood Indigo Post-Production",
    category: "Video Editing",
    caption: "Paced pacing cuts, calibrated color curves in DaVinci Resolve, dynamic beat matching, and audio layer mixing for college festival and cultural events.",
    mediaUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    tag: "Color Grading & Pacing",
    gearNotes: "Premiere Pro & DaVinci Resolve, custom LUT workflows, multi-track audio mastering"
  },
  {
    id: "creative-4",
    title: "Computational Hand-Tracking & 3D Shaders",
    category: "Creative Technology",
    caption: "Bridging computer vision and real-time graphics: MediaPipe hand gestures manipulating procedural Three.js particle meshes.",
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tag: "MediaPipe & Three.js",
    gearNotes: "MediaPipe, WebGL fragment shaders, procedural noise synthesis"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile engineering shipping responsive apps from concept to device.",
    iconName: "Smartphone",
    skills: [
      { name: "Android (Kotlin)", level: "Advanced", highlight: true },
      { name: "Flutter", level: "Proficient", highlight: true },
      { name: "React Native", level: "Proficient", highlight: true },
      { name: "Cross-Platform App Dev", level: "Advanced", highlight: true },
      { name: "Mobile UI / UX & Ergonomics", level: "Proficient" },
      { name: "Offline-First Persistence", level: "Proficient" }
    ]
  },
  {
    title: "Web & Full-Stack Development",
    description: "Architecting modern, decoupled web platforms with typed APIs and responsive user interfaces.",
    iconName: "Globe",
    skills: [
      { name: "React & React 19", level: "Advanced", highlight: true },
      { name: "Next.js", level: "Proficient", highlight: true },
      { name: "Node.js & Express", level: "Proficient", highlight: true },
      { name: "TypeScript & JavaScript", level: "Advanced", highlight: true },
      { name: "REST APIs & Endpoints", level: "Advanced", highlight: true },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Prisma & PostgreSQL", level: "Proficient" }
    ]
  },
  {
    title: "Applied AI & Computer Vision",
    description: "Integrating modern LLMs and real-time perceptual intelligence into everyday developer and user tools.",
    iconName: "BrainCircuit",
    skills: [
      { name: "Groq LLM API Integration", level: "Advanced", highlight: true },
      { name: "Llama-3.3-70b Models", level: "Advanced", highlight: true },
      { name: "AI Chat Assistants (JARVIS)", level: "Advanced", highlight: true },
      { name: "MediaPipe Hand-Tracking", level: "Proficient", highlight: true },
      { name: "Three.js 3D Rendering", level: "Proficient" },
      { name: "Web Speech API Voice Control", level: "Proficient" }
    ]
  },
  {
    title: "Cybersecurity & Security Mindset",
    description: "Practicing ethical hacking fundamentals, CTF problem-solving, and building resilient, secure systems.",
    iconName: "Shield",
    skills: [
      { name: "Ethical Hacking Fundamentals", level: "Proficient", highlight: true },
      { name: "Hands-on CTF Challenges", level: "Active Practice", highlight: true },
      { name: "Secure Coding Habits", level: "Advanced", highlight: true },
      { name: "CORS & API Hardening", level: "Advanced", highlight: true },
      { name: "JWT Authentication & Authorization", level: "Advanced" },
      { name: "Input Validation (Zod)", level: "Advanced" }
    ]
  },
  {
    title: "Tools, Platforms & Databases",
    description: "Production toolchains, version control, cloud databases, and deployment infrastructure.",
    iconName: "Layers",
    skills: [
      { name: "Git & GitHub", level: "Advanced", highlight: true },
      { name: "Firebase (Auth / Firestore)", level: "Proficient", highlight: true },
      { name: "MongoDB & MySQL", level: "Proficient", highlight: true },
      { name: "Vercel & Netlify", level: "Proficient" },
      { name: "Postman & REST Testing", level: "Advanced" }
    ]
  }
];
