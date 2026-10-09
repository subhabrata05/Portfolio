import { useEffect } from "react";
import "./App.css";

/**
 * =======================================================================
 * PORTFOLIO CONFIGURATION
 * Replace any placeholder values below with your verified production data.
 * =======================================================================
 */
export const PORTFOLIO_CONFIG = {
  name: "SUBHABRATA DEY",
  firstName: "SUBHABRATA",
  lastName: "DEY",
  year: "2026",
  email: "subhabratadey.contact@gmail.com", // CONFIG: Primary contact email
  github: "https://github.com/Subhabrata-Dey", // CONFIG: GitHub profile
  linkedin: "https://linkedin.com/in/subhabrata-dey", // CONFIG: LinkedIn profile
  location: "Kolkata / Jaipur, India",
  tagline: {
    prefix: "Building at the intersection of ",
    highlight1: "Code",
    middle: ",",
    highlight2: "Creativity",
    suffix: " & Ideas.",
  },
  description:
    "Computer Science Engineering student at UEM Jaipur. Developer, creative thinker, and future product builder.",
  navigation: [
    { label: "ABOUT", href: "#about" },
    { label: "INTERESTS", href: "#interests" },
    { label: "WORK", href: "#work" },
    { label: "CONTACT", href: "#contact" },
  ],
  interests: [
    {
      title: "App & Web Engineering",
      desc: "Architecting responsive, high-performance web systems and cross-platform mobile apps with React, Flutter, and Android (Kotlin).",
      tags: ["React 19", "Flutter", "Android", "TypeScript"],
    },
    {
      title: "Immersive & Creative Tech",
      desc: "Crafting modern 3D orbital experiences, interactive shaders, and kinetic user interfaces with dark luxury aesthetics.",
      tags: ["Three.js", "WebGL", "GSAP", "Creative UI"],
    },
    {
      title: "Systems & Cybersecurity",
      desc: "Exploring system security, Capture-The-Flag (CTF) challenges, API authentication, and robust cloud services.",
      tags: ["Cybersecurity", "CTF", "Node.js", "PostgreSQL"],
    },
  ],
  work: [
    {
      title: "Smart Waste Management IoT Platform",
      category: "Full Stack & IoT",
      desc: "Live dashboard tracking sensor-equipped waste bins, real-time telemetry, and dynamic driver route optimization.",
      tech: ["React", "Express", "IoT Sensors", "PostgreSQL"],
      link: "#contact",
    },
    {
      title: "Futuristic 3D Cinematic Portfolio",
      category: "Creative Technology",
      desc: "Dark luxury portfolio featuring kinetic CSS/Three.js orbital physics, atmospheric neon lighting, and CMS dashboard.",
      tech: ["React 19", "Three.js", "Tailwind CSS", "GSAP"],
      link: "#home",
    },
    {
      title: "Automated Student & Campus Management",
      category: "Enterprise Application",
      desc: "Campus automation platform supporting multi-role auth, grade tracking, and real-time announcements.",
      tech: ["Android / Kotlin", "Node.js", "JWT Auth", "SQLite"],
      link: "#contact",
    },
  ],
};

export default function App() {
  // Parallax and cursor-responsive dynamics
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 2 - 1;
      targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}`
      );
    };

    const updatePhysics = () => {
      // Smooth lerping
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      document.documentElement.style.setProperty(
        "--mouse-x",
        currentX.toFixed(4)
      );
      document.documentElement.style.setProperty(
        "--mouse-y",
        currentY.toFixed(4)
      );

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <a href="#about" className="skip-to-content">
        Skip to main content
      </a>

      <main className="portfolio" id="top">
        {/* Navigation Bar */}
        <header className="navbar" role="banner">
          <a className="logo" href="#top" aria-label="Subhabrata Dey Home">
            S<span>—</span>D
          </a>

          <nav aria-label="Main navigation">
            {PORTFOLIO_CONFIG.navigation.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        {/* Hero Section */}
        <section
          className="hero"
          id="home"
          aria-label="Hero Introduction"
        >
          {/* Subtle starfield background */}
          <div className="starfield" aria-hidden="true" />

          {/* Left-hand copy */}
          <div className="hero-copy">
            <p className="eyebrow">
              PORTFOLIO — {PORTFOLIO_CONFIG.year} // UEM JAIPUR
            </p>

            <h1>
              {PORTFOLIO_CONFIG.firstName}
              <span>{PORTFOLIO_CONFIG.lastName}</span>
            </h1>

            <p className="tagline">
              {PORTFOLIO_CONFIG.tagline.prefix}
              <span className="blue">
                {PORTFOLIO_CONFIG.tagline.highlight1}
              </span>
              {PORTFOLIO_CONFIG.tagline.middle}
              <br />
              <span className="purple">
                {PORTFOLIO_CONFIG.tagline.highlight2}
              </span>
              {PORTFOLIO_CONFIG.tagline.suffix}
            </p>

            <p className="description">{PORTFOLIO_CONFIG.description}</p>

            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View work <span aria-hidden="true">↗</span>
              </a>

              <a className="button button-secondary" href="#contact">
                Get in touch <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Right-hand 3D-inspired kinetic orbital scene */}
          <div className="orbital-scene" aria-hidden="true">
            <div className="wire-cage" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="ring ring-back" />
            <div className="ring ring-middle" />
            <div className="ring ring-front" />
            <div className="orb-core" />
            <div className="orb-glow" />
          </div>

          {/* Accessible Scroll Cue */}
          <a
            className="scroll-cue"
            href="#about"
            aria-label="Scroll down to About section"
          >
            <span>SCROLL</span>
            <span className="scroll-line" aria-hidden="true" />
          </a>
        </section>

        {/* 01 — ABOUT Section */}
        <section className="content-section" id="about">
          <p className="eyebrow">01 — ABOUT</p>
          <h2>Curiosity into creation.</h2>
          <p>
            I am a Computer Science Engineering student at the University of
            Engineering &amp; Management (UEM) Jaipur. I build scalable software,
            creative web interfaces, and digital products that solve real-world
            problems.
          </p>
          <p>
            From open-source collaboration in GSSOC &apos;26 to cybersecurity CTFs
            and native Android apps, I focus on clean architecture, smooth user
            experience, and robust engineering.
          </p>
        </section>

        {/* 02 — INTERESTS Section */}
        <section className="content-section" id="interests">
          <p className="eyebrow">02 — INTERESTS</p>
          <h2>Code. Design. Innovation.</h2>
          <p>
            Specialized engineering domains and creative technical explorations:
          </p>

          <div className="cards-grid">
            {PORTFOLIO_CONFIG.interests.map((item) => (
              <article key={item.title} className="card">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
                <div className="card-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 03 — SELECTED WORK Section */}
        <section className="content-section" id="work">
          <p className="eyebrow">03 — SELECTED WORK</p>
          <h2>Engineering &amp; Digital Products.</h2>
          <p>
            A selection of projects exploring IoT architectures, 3D visual
            interfaces, and full-stack software development:
          </p>

          <div className="cards-grid">
            {PORTFOLIO_CONFIG.work.map((project) => (
              <article key={project.title} className="card">
                <div className="card-tags" style={{ marginBottom: "12px" }}>
                  <span className="card-tag">{project.category}</span>
                </div>
                <h3 className="card-title">
                  {project.title}
                  <a
                    href={project.link}
                    aria-label={`View ${project.title}`}
                    style={{ fontSize: "16px", color: "#6487ff" }}
                  >
                    ↗
                  </a>
                </h3>
                <p className="card-desc">{project.desc}</p>
                <div className="card-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="card-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 04 — CONTACT Section */}
        <section className="content-section contact-section" id="contact">
          <p className="eyebrow">04 — CONTACT</p>
          <h2>Have an idea? Let&apos;s talk.</h2>
          <p>
            Whether you are looking to collaborate on open-source, discuss a
            project opportunity, or talk technology — my inbox is always open.
          </p>

          <div className="contact-links">
            <a
              className="contact-link"
              href={`mailto:${PORTFOLIO_CONFIG.email}`}
            >
              ✉ {PORTFOLIO_CONFIG.email} ↗
            </a>
            <a
              className="contact-link"
              href={PORTFOLIO_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a
              className="contact-link"
              href={PORTFOLIO_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer" role="contentinfo">
          <span>
            © {PORTFOLIO_CONFIG.year} {PORTFOLIO_CONFIG.name}. ALL RIGHTS
            RESERVED.
          </span>
          <a href="#top" aria-label="Back to top of page">
            BACK TO TOP ↑
          </a>
        </footer>
      </main>
    </>
  );
}
