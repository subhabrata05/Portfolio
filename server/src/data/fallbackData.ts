export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  technologies: string[];
  tags: string[]; // Alias for client compatibility
  imageUrls: string[];
  imageUrl?: string;
  featured: boolean;
  published: boolean;
  githubUrl?: string;
  liveDemoUrl?: string;
  liveUrl?: string; // Alias for client compatibility
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  mediaUrl: string;
  aspectRatio?: string;
  tag: string;
}

export const FALLBACK_PROFILE = {
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
      description: "Shipping real products across native Android (Kotlin) and cross-platform ecosystems (Flutter & React Native) with focus on clean architecture and fluid 60fps animations."
    },
    {
      title: "Full-Stack Web & Applied AI",
      description: "Designing decoupled, production-grade web systems with Express REST APIs, low-latency Groq/Llama LLM assistants (JARVIS), and real-time computer vision interfaces (U.L.T.R.O.N.)."
    },
    {
      title: "Cybersecurity & Leadership",
      description: "Instilling security-first instincts into every build—ethical hacking fundamentals, CTF challenges, and API hardening—alongside leading a 100+ member college organization."
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

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: "proj-jarvis",
    title: "JARVIS — Personal AI Chat Assistant",
    slug: "jarvis-ai-assistant",
    summary: "Full-stack conversational AI assistant with a React 19 frontend and an Express REST backend powered by Groq's low-latency Llama-3.3-70b-versatile model.",
    description: "Built a full-stack AI assistant with a React 19 frontend and an Express REST API backend. Integrated Groq’s llama-3.3-70b-versatile model for fast, low-latency conversational responses. Engineered a production backend with CORS-protected endpoints, request-logging middleware, and a health-check endpoint. Designed a clean API contract to keep the frontend and AI backend decoupled and independently deployable.",
    category: "AI & ML",
    technologies: ["React 19", "Node.js", "Express", "Groq LLM API", "Llama 3.3 70B", "REST APIs", "CORS"],
    tags: ["React 19", "Node.js", "Express", "Groq LLM API", "Llama 3.3 70B", "REST APIs", "CORS"],
    imageUrls: ["/assets/projects/jarvis.webp"],
    imageUrl: "/assets/projects/jarvis.webp",
    featured: true,
    published: true,
    githubUrl: "https://github.com/subhabrata05",
    liveDemoUrl: "#",
    liveUrl: "#",
    sortOrder: 0
  },
  {
    id: "proj-ultron",
    title: "U.L.T.R.O.N. — Interactive 3D Orb Interface",
    slug: "ultron-3d-orb-interface",
    summary: "Hands-free 3D interactive interface using Three.js for real-time rendering, MediaPipe computer-vision hand tracking, and Web Speech API voice control.",
    description: "Built a hands-free 3D interface using Three.js for real-time rendering inside a Next.js application. Integrated MediaPipe computer-vision hand-tracking to drive 10+ gesture controls entirely via webcam. Layered in Web Speech API voice commands and full keyboard-shortcut parity, creating three independent input modes.",
    category: "Creative Tech",
    technologies: ["Next.js", "React 19", "Three.js", "MediaPipe", "Computer Vision", "Web Speech API"],
    tags: ["Next.js", "React 19", "Three.js", "MediaPipe", "Computer Vision", "Web Speech API"],
    imageUrls: ["/assets/projects/ultron.webp"],
    imageUrl: "/assets/projects/ultron.webp",
    featured: true,
    published: true,
    githubUrl: "https://github.com/subhabrata05",
    liveDemoUrl: "#",
    liveUrl: "#",
    sortOrder: 1
  },
  {
    id: "proj-mobile-apps",
    title: "Cross-Platform & Native Mobile Applications",
    slug: "cross-platform-mobile-apps",
    summary: "Suite of mobile applications spanning native Android (Kotlin), Flutter, and React Native with Firebase integration and offline persistence.",
    description: "Engineered scalable mobile applications focusing on native responsiveness, battery efficiency, and cross-platform flexibility. Developed native Android apps with Kotlin utilizing modern Jetpack libraries, alongside multi-platform Flutter and React Native deployments connected to Firebase authentication and cloud databases.",
    category: "App Development",
    technologies: ["Android (Kotlin)", "Flutter", "React Native", "Firebase", "REST APIs"],
    tags: ["Android (Kotlin)", "Flutter", "React Native", "Firebase", "REST APIs"],
    imageUrls: ["/assets/projects/mobile-apps.webp"],
    imageUrl: "/assets/projects/mobile-apps.webp",
    featured: true,
    published: true,
    githubUrl: "https://github.com/subhabrata05",
    liveDemoUrl: "#",
    liveUrl: "#",
    sortOrder: 2
  },
  {
    id: "proj-portfolio-3d",
    title: "Cinematic 3D Parallax Portfolio & Admin Studio",
    slug: "cinematic-3d-portfolio",
    summary: "Production WebGL portfolio platform with interactive 3D procedural shaders, GSAP, and a JWT-protected Express backend.",
    description: "High-performance digital presence combining React 19, Three.js (R3F), and GSAP parallax timelines with a typed Node.js/Express REST backend. Features a protected Admin Studio with JWT authorization, project CRUD, and contact message processing.",
    category: "Web Development",
    technologies: ["React 19", "TypeScript", "Three.js", "R3F", "Tailwind CSS", "GSAP", "Prisma", "Express", "JWT"],
    tags: ["React 19", "TypeScript", "Three.js", "R3F", "Tailwind CSS", "GSAP", "Prisma", "Express", "JWT"],
    imageUrls: ["/assets/projects/portfolio-3d.webp"],
    imageUrl: "/assets/projects/portfolio-3d.webp",
    featured: true,
    published: true,
    githubUrl: "https://github.com/subhabrata05",
    liveDemoUrl: "#",
    liveUrl: "#",
    sortOrder: 3
  }
];

export const FALLBACK_CREATIVE: CreativeItem[] = [
  {
    id: "media-1",
    title: "Geometric Monoliths & Urban Solitude",
    category: "Photography",
    caption: "Capturing structural symmetry, natural shadows, and urban life through disciplined framing and high-contrast monochrome tones.",
    mediaUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    tag: "Architectural Symmetry"
  },
  {
    id: "media-2",
    title: "Golden Hour Atmosphere & Kinetic Streets",
    category: "Photography",
    caption: "Ambient evening tones, warm highlights, and authentic street moments documenting human emotion and natural lighting.",
    mediaUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    tag: "Street & Environmental"
  },
  {
    id: "media-3",
    title: "Cinematic Rhythm & Mood Indigo Post-Production",
    category: "Video Editing",
    caption: "Paced pacing cuts, calibrated color curves in DaVinci Resolve, dynamic beat matching, and audio layer mixing for college festival and cultural events.",
    mediaUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    tag: "Color Grading & Pacing"
  },
  {
    id: "media-4",
    title: "Computational Hand-Tracking & 3D Shaders",
    category: "Creative Technology",
    caption: "Bridging computer vision and real-time graphics: MediaPipe hand gestures manipulating procedural Three.js particle meshes.",
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tag: "MediaPipe & Three.js"
  }
];
