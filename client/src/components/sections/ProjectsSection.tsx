import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  Sparkles, 
  Filter, 
  Code2, 
  X, 
  Layers, 
  CheckCircle, 
  Eye, 
  RefreshCw 
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import type { ProjectItem } from '../../types/portfolio';
import { fetchPublishedProjects } from '../../services/api';
import { GithubIcon } from '../ui/SocialIcons';

const CATEGORIES = ['All', 'Web Development', 'App Development', 'AI & ML', 'Creative Tech'];

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPublishedProjects();
      if (data && data.length > 0) {
        setProjects(data);
        setIsLiveConnected(true);
      }
    } catch {
      // Gracefully maintain verified fallback portfolio data
      setIsLiveConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();

    const handleProjectsUpdated = () => {
      loadProjects();
    };

    window.addEventListener('portfolio:projects-updated', handleProjectsUpdated);
    return () => window.removeEventListener('portfolio:projects-updated', handleProjectsUpdated);
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 relative z-10 border-t border-white/5 bg-background-surface/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-xs font-mono mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>03 // FEATURED ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Selected <span className="gradient-electric">Software Projects</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Full-stack web architectures, mobile ergonomics, applied AI tooling, and creative WebGL experiments. Designed with modular code and clean state boundaries.
            </p>
          </div>

          {/* Live DB Connection Badge & Sync Button */}
          <div className="flex items-center gap-2 self-center sm:self-auto shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border border-white/10 text-[11px] font-mono text-zinc-300">
              <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'}`} />
              <span>{isLiveConnected ? 'PostgreSQL Live Sync' : 'Static Fallback Ready'}</span>
            </div>
            <button
              type="button"
              onClick={loadProjects}
              aria-label="Refresh projects from database"
              title="Refresh projects"
              disabled={isLoading}
              className="p-2 rounded-full glass-card hover:bg-white/10 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-electric-light' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mr-2 font-mono">
            <Filter className="w-3.5 h-3.5 text-electric-light" />
            <span>Filter:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              id={`project-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-electric text-white shadow-glow-subtle font-semibold'
                  : 'glass-card text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project: ProjectItem) => (
            <article
              key={project.id}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top accent gradient line */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ 
                  background: `linear-gradient(90deg, transparent, ${project.accentColor || '#3b82f6'}, transparent)` 
                }} 
              />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-blue-300">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-white group-hover:text-electric-light transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="text-zinc-300 text-sm leading-relaxed mb-4 font-normal">
                  {project.summary}
                </p>

                {/* In-depth details */}
                <p className="text-zinc-400 text-xs leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/5 group-hover:border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links & Detail Trigger */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-electric/15 hover:bg-electric/25 text-blue-300 hover:text-white border border-electric/30 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Architecture</span>
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`project-github-${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}

                  {project.liveUrl && project.liveUrl !== '#' ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`project-live-${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Informative Footer Box */}
        <div className="mt-12 p-4 rounded-xl glass-card border border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <Code2 className="w-4 h-4 text-electric-light" />
            <span>Built with clean component boundaries. Project data is centrally configured and editable.</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-electric-light hover:underline underline-offset-4 flex items-center gap-1"
          >
            <span>Subhabrata's GitHub Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Project Case Study / Architecture Modal */}
        {activeModalProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveModalProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <div
              className="relative max-w-2xl w-full glass-card rounded-2xl p-6 sm:p-8 border border-white/15 shadow-glass-heavy animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                id="modal-project-close-btn"
                aria-label="Close project modal"
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full glass-pill text-zinc-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono px-3 py-0.5 rounded-full bg-electric/15 text-blue-300 border border-electric/30">
                  {activeModalProject.category}
                </span>
                {activeModalProject.role && (
                  <span className="text-xs font-mono text-zinc-400">
                    • {activeModalProject.role}
                  </span>
                )}
              </div>

              <h3 id="modal-project-title" className="text-2xl font-display font-bold text-white mb-2">
                {activeModalProject.title}
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {activeModalProject.description}
              </p>

              {/* Architecture Highlights */}
              {activeModalProject.architectureHighlights && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-electric-light uppercase tracking-wider mb-3">
                    <Layers className="w-4 h-4" />
                    <span>Technical Architecture & Decisions</span>
                  </div>
                  <div className="space-y-2.5">
                    {activeModalProject.architectureHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        <CheckCircle className="w-4 h-4 text-electric-light shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-8">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Technologies Applied
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-zinc-300 hover:text-white text-xs font-medium transition-colors ml-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
