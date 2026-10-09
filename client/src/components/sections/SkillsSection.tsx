import React, { useState } from 'react';
import { Layers, Globe, Smartphone, BrainCircuit, Shield, CheckCircle2, Sparkles, Terminal } from 'lucide-react';
import { SKILLS_DATA } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'BrainCircuit': return <BrainCircuit className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      default: return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center sm:items-start mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>02 // CAPABILITIES & CRAFT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Technical Skills & <span className="gradient-electric">Stack Matrix</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Verified repertoire spanning native and cross-platform mobile app development, modern full-stack web architectures, applied AI assistants, and hands-on cybersecurity practices.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl glass-card border border-white/5 max-w-fit">
          {SKILLS_DATA.map((category, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={category.title}
                type="button"
                id={`skill-tab-${index}`}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-electric text-white shadow-glow-subtle font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                {getCategoryIcon(category.iconName)}
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Panel */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/5 gap-2">
            <div>
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <span>{SKILLS_DATA[activeTab].title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                {SKILLS_DATA[activeTab].description}
              </p>
            </div>
            <span className="text-xs font-mono text-electric-light px-3 py-1 rounded-full bg-electric/10 border border-electric/25 max-w-fit">
              {SKILLS_DATA[activeTab].skills.length} Competencies
            </span>
          </div>

          {/* Skill Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS_DATA[activeTab].skills.map((skill) => (
              <div
                key={skill.name}
                className={`p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                  skill.highlight
                    ? 'bg-white/[0.04] border-electric/35 hover:border-electric shadow-glow-subtle'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${skill.highlight ? 'bg-electric/20 text-electric-light' : 'bg-white/5 text-zinc-400'}`}>
                    {skill.highlight ? <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-sm font-medium text-zinc-200">
                    {skill.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Overview Grid across 4 Disciplines */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Mobile & Native', desc: 'Android (Kotlin), Flutter, React Native', icon: Smartphone },
            { label: 'Web & Full-Stack', desc: 'React 19, Next.js, Node.js, Express', icon: Globe },
            { label: 'Applied AI & Vision', desc: 'Groq Llama 3.3, MediaPipe, Three.js', icon: BrainCircuit },
            { label: 'Cybersecurity & CTF', desc: 'Ethical Hacking, CTF, API Hardening', icon: Shield },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-4 rounded-xl glass-card border border-white/5">
                <Icon className="w-4 h-4 text-cyan-400 mb-2" />
                <h4 className="text-xs font-semibold text-zinc-200">{item.label}</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5 font-mono">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
