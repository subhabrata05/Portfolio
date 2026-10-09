import React from 'react';
import { GraduationCap, MapPin, Terminal, Compass, Sparkles, Smartphone, Cpu, Shield, Users, Trophy } from 'lucide-react';
import { PROFILE_DATA } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-electric-light" />;
      case 'Shield': return <Shield className="w-5 h-5 text-emerald-400" />;
      default: return <Sparkles className="w-5 h-5 text-electric-light" />;
    }
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-8 relative z-10 border-t border-white/5 bg-background-surface/40">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center sm:items-start mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // BACKGROUND & IDENTITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Engineering Craft Meets <span className="gradient-electric">Security Mindset</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Full-stack and cross-platform app developer shipping real products from native Android (Kotlin) to Flutter and React Native with an instinct for secure, resilient systems.
          </p>
        </div>

        {/* Narrative & Academic Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-electric-light" />
              <span>Full-Stack & Cross-Platform Developer</span>
            </h3>
            
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
              Currently pursuing my <strong className="text-white font-medium">B.Tech in Computer Science & Engineering at UEM Jaipur (Expected 2028, CGPA 6.85)</strong>, I build software with speed, ownership, and deep architectural rigor. My engineering spans native Android development in Kotlin, cross-platform apps in Flutter and React Native, and full-stack web platforms using React 19, Next.js, and Express.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              I actively pair development with a <strong className="text-zinc-200">cybersecurity mindset</strong> honed through hands-on Capture The Flag (CTF) challenges, ethical hacking practice, and API hardening. On campus, I lead as <strong className="text-white">President of Atrang (100+ member college cultural club)</strong>, overseeing technical execution, AV production, and representing the university at <strong className="text-cyan-300">MOOD INDIGO, IIT Bombay</strong>.
            </p>

            {/* Academic & Geographic Quick Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-electric/10 text-electric-light mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block uppercase">Degree Program</span>
                  <span className="text-sm font-medium text-zinc-200">B.Tech CSE • CGPA 6.85</span>
                  <span className="text-xs text-zinc-400 block">{PROFILE_DATA.institution}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block uppercase">Base Location & Contact</span>
                  <span className="text-sm font-medium text-zinc-200">{PROFILE_DATA.location}</span>
                  <span className="text-xs text-zinc-400 block">{PROFILE_DATA.phone} • {PROFILE_DATA.socials.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Snapshot Matrix */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono text-amber-400 tracking-wider uppercase block">
                  Open Source Selection
                </span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="text-lg font-display font-semibold text-white mb-2">
                GSSOC 2026 Contributor
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Selected for the prestigious GirlScript Summer of Code (May – Aug 2026) out of 95,000+ applicants worldwide to contribute to open-source software.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono text-indigo-400 tracking-wider uppercase block">
                  Club Leadership
                </span>
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <h4 className="text-lg font-display font-semibold text-white mb-2">
                President • Atrang (100+ Members)
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Promoted from Member to Tech Coordinator to President. Owned all technical execution, registrations, and represented UEM at MOOD INDIGO (IIT Bombay).
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono text-emerald-400 tracking-wider uppercase block">
                  Hackathons & CTFs
                </span>
                <Trophy className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-lg font-display font-semibold text-white mb-2">
                Top 15 Hackathon & CTF Practitioner
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Placed in the Top 15 in college hackathon after three rounds of judging. Active participant in cybersecurity communities solving hands-on CTF challenges.
              </p>
            </div>

          </div>

        </div>

        {/* 3 Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROFILE_DATA.pillars.map((pillar, idx) => (
            <div 
              key={pillar.title}
              className="glass-card glass-card-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                    {getIcon(pillar.iconName)}
                  </div>
                  <span className="text-xs font-mono text-zinc-400">0{idx + 1}</span>
                </div>
                <h4 className="text-lg font-display font-bold text-white mb-1">
                  {pillar.title}
                </h4>
                <span className="text-xs font-mono text-electric-light block mb-3">
                  {pillar.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
