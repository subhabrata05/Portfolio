import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroScene } from './HeroScene';

interface CanvasContainerProps {
  className?: string;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({ className = '' }) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Graceful, lightweight fallback for devices that cannot handle WebGL or prefer reduced motion
  if (!hasWebGL || prefersReducedMotion) {
    return (
      <div 
        aria-hidden="true" 
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/30 via-background to-background" />
        <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-1/3 left-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]" />
        {/* Subtle geometric SVG lines representing 3D wireframe fallback */}
        <svg className="absolute right-10 top-1/3 w-80 h-80 opacity-15 text-blue-400 stroke-current fill-none" viewBox="0 0 100 100">
          <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" strokeWidth="0.5" />
          <polygon points="50 20, 80 35, 80 65, 50 80, 20 65, 20 35" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="15" strokeWidth="0.5" />
        </svg>
      </div>
    );
  }

  return (
    <div 
      aria-hidden="true" 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* Background ambient radial glow layers */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-600/10 via-transparent to-transparent pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.8]} // Capped device pixel ratio for silky smooth 60fps
        gl={{ 
          antialias: true, 
          powerPreference: 'high-performance',
          alpha: true 
        }}
        className="w-full h-full pointer-events-auto"
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
};
