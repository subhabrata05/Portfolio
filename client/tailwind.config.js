/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#070709',       // Obsidian base
          surface: '#0c0d13',       // Dark charcoal surface
          elevated: '#12141e',      // Elevated charcoal card
          subtle: '#181b26'         // Border and subtle fills
        },
        electric: {
          DEFAULT: '#3b82f6',       // Electric blue
          hover: '#2563eb',
          light: '#60a5fa',
          glow: 'rgba(59, 130, 246, 0.35)',
          muted: '#1e3a8a',
          cyan: '#06b6d4',
        },
        charcoal: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.07)',
          glow: 'rgba(59, 130, 246, 0.28)'
        }
      },
      fontFamily: {
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-electric': '0 0 25px -4px rgba(59, 130, 246, 0.35)',
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.35)',
        'glow-subtle': '0 0 15px -2px rgba(59, 130, 246, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-heavy': '0 16px 48px 0 rgba(0, 0, 0, 0.65)',
      },
      backdropBlur: {
        'glass': '16px',
        'glass-heavy': '24px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
