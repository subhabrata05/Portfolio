import React, { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { JourneySection } from './components/sections/JourneySection';
import { CreativeSection } from './components/sections/CreativeSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useScrollAnimations } from './hooks/useScrollAnimations';

export const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [projectsSyncKey, setProjectsSyncKey] = useState(0);

  // Initialize GSAP scroll animations
  useScrollAnimations();

  useEffect(() => {
    // Smooth hash anchor navigation listener
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Admin shortcut: Ctrl + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-zinc-100 selection:bg-electric selection:text-white flex flex-col">
      {/* Cinematic Top Atmospheric Lighting Glow */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-blue-600/12 via-cyan-500/5 to-transparent blur-[130px] pointer-events-none z-0" 
      />

      {/* Persistent Navigation Header */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Complete 7 Portfolio Sections */}
      <main className="flex-1 w-full relative z-10">
        {/* 1. Cinematic 3D Hero */}
        <HeroSection />

        {/* 2. About Me */}
        <AboutSection />

        {/* 3. Skills & Technology */}
        <SkillsSection />

        {/* 4. Featured Projects */}
        <ProjectsSection key={projectsSyncKey} />

        {/* 5. Education & Journey */}
        <JourneySection />

        {/* 6. Photography & Creative Work Gallery */}
        <CreativeSection />

        {/* 7. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Protected Admin Dashboard Modal */}
      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)}
        onProjectChanged={() => setProjectsSyncKey(k => k + 1)}
      />
    </div>
  );
};

export default App;
