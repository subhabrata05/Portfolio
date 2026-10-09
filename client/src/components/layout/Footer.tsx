import React from 'react';
import { ArrowUp, Mail, Lock } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { PROFILE_DATA } from '../../data/portfolioData';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-8 border-t border-white/5 bg-background relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white tracking-wide">
              {PROFILE_DATA.name}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-cyan-400 font-mono">B.Tech CSE @ UEM Jaipur</span>
          </div>
          <p className="text-xs text-zinc-400">
            Full-Stack & App Developer • Android / Flutter / React • Cybersecurity Enthusiast
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${PROFILE_DATA.socials.email}`}
            id="footer-email-link"
            aria-label="Email Subhabrata Dey"
            title={PROFILE_DATA.socials.email}
            className="p-2.5 rounded-xl glass-card text-zinc-400 hover:text-white hover:border-electric/40 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={PROFILE_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-github-link"
            aria-label="GitHub Profile"
            title="GitHub: subhabrata05"
            className="p-2.5 rounded-xl glass-card text-zinc-400 hover:text-white hover:border-electric/40 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PROFILE_DATA.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-linkedin-link"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
            className="p-2.5 rounded-xl glass-card text-zinc-400 hover:text-white hover:border-electric/40 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Right Side: Back to Top & Admin Trigger */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400">
            © {new Date().getFullYear()} Subhabrata Dey
          </span>

          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              aria-label="Open Admin Studio"
              title="Open Admin Studio (Ctrl+Shift+A)"
              className="p-2 rounded-xl glass-card text-zinc-400 hover:text-electric-light hover:border-electric/30 transition-colors"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            id="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 rounded-xl glass-pill text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-electric-light" />
          </button>
        </div>

      </div>
    </footer>
  );
};
