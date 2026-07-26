/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core dark canvas
        ink: {
          950: '#050508',
          900: '#0a0a12',
          800: '#0f0f1a',
          700: '#161624',
          600: '#1e1e30',
          500: '#2a2a40',
          400: '#3a3a55',
        },
        // Lightning blue
        bolt: {
          50: '#eaf6ff',
          100: '#d2ecff',
          200: '#a8d9ff',
          300: '#74c0ff',
          400: '#3da0ff',
          500: '#0e80f5',
          600: '#0064d6',
          700: '#004eab',
          800: '#003f88',
          900: '#003066',
        },
        // Soft pink accent
        bloom: {
          50: '#fff0f6',
          100: '#ffe0ec',
          200: '#ffc2d9',
          300: '#ff9bbf',
          400: '#ff6ba0',
          500: '#ff4788',
          600: '#ed2a6e',
          700: '#c41857',
          800: '#9c1145',
          900: '#7a0d38',
        },
        // Neutrals
        sand: {
          50: '#f7f7f9',
          100: '#eeeef1',
          200: '#d9d9e0',
          300: '#b8b8c5',
          400: '#8e8ea0',
          500: '#6b6b80',
          600: '#52526a',
          700: '#3e3e54',
          800: '#2a2a3d',
          900: '#1a1a28',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'dash': 'dash 1.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        dash: {
          '0%': { strokeDashoffset: '20' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'grid-dots': 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'grid-lines': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
