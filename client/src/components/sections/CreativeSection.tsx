import React, { useState, useEffect } from 'react';
import { Camera, Eye, X, Sliders, Info } from 'lucide-react';
import { CREATIVE_DATA } from '../../data/portfolioData';
import type { CreativeItem } from '../../types/portfolio';

export const CreativeSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<CreativeItem | null>(null);

  const categories = ['All', 'Photography', 'Video Editing', 'Creative Technology'];

  const filteredMedia = selectedCategory === 'All'
    ? CREATIVE_DATA
    : CREATIVE_DATA.filter((item) => item.category === selectedCategory);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="creative" className="py-24 px-4 sm:px-8 relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center sm:items-start mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-xs font-mono mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>05 // VISUAL ARTS & CREATIVE TECHNOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Cinematic Photography & <span className="gradient-electric">Video Editing</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Framing light, perspective, and motion. How lens craft and post-production pacing inform deliberate, responsive software interfaces.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              id={`creative-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-electric text-white shadow-glow-subtle font-semibold'
                  : 'glass-card text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-white/10 flex flex-col group cursor-pointer"
              onClick={() => setActiveItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveItem(item);
                }
              }}
              aria-label={`View creative work: ${item.title}`}
            >
              {/* Media Image Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-background-elevated">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-surface via-transparent to-transparent opacity-85" />
                
                {/* Category & Tag badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full glass-pill text-white font-medium border border-white/10">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-electric/25 text-blue-200 border border-electric/30">
                    {item.tag}
                  </span>
                </div>

                {/* Hover Preview Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/40 backdrop-blur-xs">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-xs font-medium text-white shadow-glass">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Expand Details</span>
                  </span>
                </div>
              </div>

              {/* Media Metadata & Caption */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-electric-light transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                    {item.caption}
                  </p>
                </div>

                {item.gearNotes && (
                  <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                    <Sliders className="w-3.5 h-3.5 text-electric-light shrink-0" />
                    <span className="truncate">{item.gearNotes}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox for Detail View */}
        {activeItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveItem(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-creative-title"
          >
            <div 
              className="relative max-w-4xl w-full glass-card rounded-2xl overflow-hidden border border-white/15 shadow-glass-heavy animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                id="modal-close-btn"
                aria-label="Close modal preview"
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full glass-pill text-zinc-300 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[85vh] overflow-y-auto">
                {/* Full-view media */}
                <div className="relative aspect-[16/9] w-full bg-black">
                  <img
                    src={activeItem.mediaUrl}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-electric/20 text-blue-300 border border-electric/30">
                      {activeItem.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      • {activeItem.tag}
                    </span>
                  </div>

                  <h3 id="modal-creative-title" className="text-2xl font-display font-bold text-white mb-3">
                    {activeItem.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                    {activeItem.caption}
                  </p>

                  {activeItem.gearNotes && (
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 text-xs font-mono text-zinc-300">
                      <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block mb-0.5 font-sans font-semibold uppercase text-[10px]">
                          Technical & Workflow Notes
                        </span>
                        <span>{activeItem.gearNotes}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
