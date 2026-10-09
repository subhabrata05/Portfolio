import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  BookOpen, 
  Sparkles, 
  Users, 
  Trophy, 
  Shield, 
  CheckCircle2, 
  Clock,
  Award
} from 'lucide-react';
import { EDUCATION_DATA, JOURNEY_DATA } from '../../data/portfolioData';
import type { JourneyMilestone } from '../../types/portfolio';

export const JourneySection: React.FC = () => {
  const getMilestoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-4 h-4 text-indigo-400" />;
      case 'Trophy': return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'Shield': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4 text-electric-light" />;
      default: return <Sparkles className="w-4 h-4 text-electric-light" />;
    }
  };

  return (
    <section id="journey" className="py-24 px-4 sm:px-8 relative z-10 border-t border-white/5 bg-background-surface/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center sm:items-start mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>04 // EDUCATION & LEADERSHIP MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Academic Training, <span className="gradient-electric">Leadership & Impact</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            From leading 100+ member student organizations and earning global open-source selections to continuous CS coursework at UEM Jaipur.
          </p>
        </div>

        {/* Education Records */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-electric-light" />
            <h3 className="text-xl font-display font-bold text-white">
              Academic Background
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {EDUCATION_DATA.map((edu) => (
              <div 
                key={edu.degree + edu.institution}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-white/5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-electric/10 border border-electric/25 text-electric-light shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-electric/15 text-blue-300 border border-electric/30">
                          {edu.status}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          {edu.period}
                        </span>
                        {edu.score && (
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <Award className="w-3 h-3 text-emerald-400" />
                            <span>{edu.score}</span>
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl font-display font-bold text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-zinc-300 font-medium mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{edu.location}</span>
                    </div>
                    {edu.focus && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <BookOpen className="w-3.5 h-3.5 text-electric-light" />
                        <span>{edu.focus}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed my-4">
                  {edu.description}
                </p>

                {/* Coursework Matrix when available */}
                {edu.keyCourses && edu.keyCourses.length > 0 && (
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
                      Core Computer Science Foundations:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {edu.keyCourses.map((course) => (
                        <div 
                          key={course}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300"
                        >
                          <CheckCircle2 className="w-3 h-3 text-electric shrink-0" />
                          <span className="truncate">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-8">
            <Clock className="w-5 h-5 text-electric-light" />
            <h3 className="text-xl font-display font-bold text-white">
              Leadership & Milestones Timeline
            </h3>
          </div>

          <div className="relative border-l border-white/10 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10">
            {JOURNEY_DATA.map((milestone: JourneyMilestone) => (
              <div key={milestone.title} className="relative group">
                
                {/* Timeline Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 rounded-full bg-background-elevated border border-electric/40 flex items-center justify-center shadow-glow-subtle group-hover:border-electric transition-colors">
                  {getMilestoneIcon(milestone.iconName)}
                </div>

                {/* Milestone Content Card */}
                <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-electric-light font-semibold">
                        {milestone.year}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {milestone.period}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-zinc-300">
                      {milestone.category}
                    </span>
                  </div>

                  <h4 className="text-lg font-display font-bold text-white group-hover:text-electric-light transition-colors">
                    {milestone.title}
                  </h4>
                  <p className="text-xs font-mono text-cyan-300 mt-0.5 mb-3">
                    {milestone.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                    {milestone.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {milestone.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
