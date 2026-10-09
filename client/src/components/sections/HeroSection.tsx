import React, { useEffect, useRef } from 'react';
import { ArrowDown, Code, Sparkles, Smartphone, Shield, GraduationCap, Mail, ArrowUpRight, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { CanvasContainer } from '../3d/CanvasContainer';
import { PROFILE_DATA } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

export const HeroSection: React.FC = () => {
  const heroContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user reduced-motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroContainerRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden bg-background"
    >
      {/* 3D Background Canvas Layer with Stars & Glowing 3D Object on the Right */}
      <CanvasContainer />

      {/* Atmospheric Neon Blue & Violet Lighting Glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 -left-20 w-[650px] h-[650px] bg-gradient-to-tr from-violet-600/15 via-blue-600/10 to-transparent blur-[140px] pointer-events-none z-0" 
      />
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 -right-20 w-[700px] h-[700px] bg-gradient-to-bl from-cyan-500/15 via-electric/10 to-violet-600/10 blur-[150px] pointer-events-none z-0" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/25 to-background pointer-events-none z-0" />

      {/* Foreground Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Oversized Cinematic Headline & CTAs */}
          <div className="lg:col-span-8 flex flex-col items-center sm:items-start text-center sm:text-left">
            
            {/* Status & Academic Badges */}
            <div className="hero-reveal flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-electric/30 text-xs text-zinc-300 shadow-glow-subtle">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="font-mono text-cyan-300 font-semibold">B.Tech CSE</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-200 font-medium">UEM Jaipur (Expected 2028)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill border border-amber-500/30 text-xs text-amber-300 bg-amber-500/[0.05]">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono">GSSOC '26 Contributor</span>
              </div>
            </div>

            {/* Oversized “SUBHABRATA DEY” Cinematic Typography */}
            <h1 className="hero-reveal font-display font-extrabold uppercase tracking-tight sm:tracking-tighter text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] leading-[0.88] select-none text-white mb-6">
              <span className="block text-white hover:text-cyan-200 transition-colors drop-shadow-sm">
                SUBHABRATA
              </span>
              <span className="block gradient-neon-violet text-glow-violet">
                DEY
              </span>
            </h1>

            {/* Subtitle / Focus Statement */}
            <p className="hero-reveal text-base sm:text-xl md:text-2xl font-medium text-zinc-300 max-w-2xl mb-3 font-display">
              Full-Stack & App Developer <span className="text-zinc-600">|</span> <span className="text-cyan-400">Cybersecurity Enthusiast</span>
            </p>

            {/* Tagline Statement from Resume */}
            <p className="hero-reveal text-xs sm:text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed mb-8">
              Shipping real products from native Android (Kotlin) to Flutter and React Native. Pairing modern web & mobile engineering with a security-first instinct from hands-on CTF competitions.
            </p>

            {/* Domain Pills */}
            <div className="hero-reveal flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-10 max-w-xl">
              {[
                { label: 'Android (Kotlin)', icon: Smartphone },
                { label: 'Flutter & React Native', icon: Smartphone },
                { label: 'React 19 & Next.js', icon: Code },
                { label: 'Node.js & Express', icon: Code },
                { label: 'Groq LLM AI (JARVIS)', icon: Sparkles },
                { label: 'Cybersecurity & CTF', icon: Shield },
              ].map((tag) => {
                const Icon = tag.icon;
                return (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-zinc-300 bg-white/[0.03] border border-white/5 hover:border-electric/40 hover:bg-white/[0.06] transition-colors"
                  >
                    <Icon className="w-3 h-3 text-electric-light" />
                    {tag.label}
                  </span>
                );
              })}
            </div>

            {/* Action CTA Button Row */}
            <div className="hero-reveal flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                id="hero-btn-projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-electric via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-glow-subtle hover:shadow-glow-electric transition-all duration-300 hover:-translate-y-0.5"
              >
                <Code className="w-4 h-4" />
                <span>Explore Engineering Work</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300" />
              </a>

              <a
                href="#contact"
                id="hero-btn-contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium glass-card hover:bg-white/10 text-zinc-200 hover:text-white transition-all duration-300 hover:-translate-y-0.5 border border-white/10"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Let's Talk</span>
              </a>

              <a
                href="#journey"
                id="hero-btn-journey"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-medium glass-pill hover:bg-white/10 text-zinc-300 hover:text-white transition-all duration-300"
              >
                <GraduationCap className="w-4 h-4 text-electric-light" />
                <span>Education & Leadership</span>
              </a>

              {/* Social Quick-Links */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:pl-2">
                <a
                  href={`mailto:${PROFILE_DATA.socials.email}`}
                  id="hero-social-email"
                  aria-label="Send email to Subhabrata Dey"
                  title={`Email: ${PROFILE_DATA.socials.email}`}
                  className="p-3 rounded-full glass-card hover:bg-white/10 text-zinc-400 hover:text-white hover:border-electric/40 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={PROFILE_DATA.socials.github}
                  id="hero-social-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub: subhabrata05"
                  className="p-3 rounded-full glass-card hover:bg-white/10 text-zinc-400 hover:text-white hover:border-electric/40 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PROFILE_DATA.socials.linkedin}
                  id="hero-social-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                  className="p-3 rounded-full glass-card hover:bg-white/10 text-zinc-400 hover:text-white hover:border-electric/40 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Spatial Framing for the Glowing 3D Object */}
          <div className="lg:col-span-4 hidden lg:flex items-center justify-center relative pointer-events-none min-h-[460px]">
            {/* Ambient Backlight Behind 3D Object */}
            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-electric/20 via-violet-600/15 to-transparent blur-3xl" />
          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">Scroll to explore</span>
        <ArrowDown className="w-4 h-4 text-electric animate-bounce" />
      </div>
    </section>
  );
};
