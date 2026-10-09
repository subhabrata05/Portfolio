import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Volume2, VolumeX, Lock } from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Overview', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#journey' },
  { name: 'Creative', href: '#creative' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(() => soundFX.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section intersection detection
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = () => {
    soundFX.playChime(580, 0.04);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 pb-2 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Monogram Brand */}
        <a 
          href="#hero" 
          id="nav-brand-logo"
          aria-label="Subhabrata Dey Home"
          onClick={handleNavClick}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric via-blue-600 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow-subtle">
            <div className="w-full h-full bg-background-surface rounded-[10px] flex items-center justify-center">
              <span className="font-display font-bold text-sm tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                SD
              </span>
            </div>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors">
              Subhabrata Dey
            </span>
            <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse"></span>
              CSE @ UEM Jaipur
            </span>
          </div>
        </a>

        {/* Floating Desktop Nav Glass Pill */}
        <nav 
          aria-label="Main Navigation"
          className={`hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full glass-pill transition-all duration-300 ${
            scrolled ? 'shadow-glass-heavy border-white/10 bg-background-surface/85 backdrop-blur-glass' : 'bg-background-surface/50 border-white/5'
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                id={`nav-link-${item.name.toLowerCase()}`}
                onClick={handleNavClick}
                className={`relative px-3 py-1.5 text-xs font-medium tracking-wide rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-electric/20 text-glow'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-gradient-to-r from-electric to-cyan-400"></span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Soundscape Toggle */}
          <button
            type="button"
            id="nav-audio-toggle"
            aria-label={isMuted ? 'Enable ambient audio' : 'Mute ambient audio'}
            title={isMuted ? 'Enable Cinematic Audio' : 'Mute Ambient Sound'}
            onClick={handleToggleSound}
            className={`p-2 rounded-xl glass-pill transition-all duration-200 ${
              !isMuted 
                ? 'text-cyan-300 bg-electric/20 border-electric/40 shadow-glow-subtle' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Admin Studio Trigger */}
          {onOpenAdmin && (
            <button
              type="button"
              id="nav-admin-trigger"
              aria-label="Open Admin Studio"
              title="Open Admin Studio (Ctrl+Shift+A)"
              onClick={onOpenAdmin}
              className="p-2 rounded-xl glass-pill text-zinc-400 hover:text-electric-light hover:bg-white/5 transition-colors hidden sm:flex items-center justify-center"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          <a
            href="#contact"
            id="nav-cta-contact"
            onClick={handleNavClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-electric to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-glow-subtle hover:shadow-glow-electric transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            id="nav-mobile-menu-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl glass-pill text-zinc-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto glass-card rounded-2xl p-4 border border-white/10 shadow-glass-heavy pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                id={`mobile-nav-link-${item.name.toLowerCase()}`}
                onClick={() => {
                  handleNavClick();
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'bg-electric/20 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                }`}
              >
                {item.name}
              </a>
            ))}

            <div className="pt-2 border-t border-white/5 mt-1 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => {
                  handleNavClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-electric text-white hover:bg-blue-600 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Get in Touch</span>
              </a>

              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white glass-pill"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Studio</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
