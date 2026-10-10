import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.18)',
      },
      colors: {
        ink: '#0f172a',
        accent: '#7c3aed',
        accentSoft: '#a78bfa',
      },
    },
  },
  plugins: [],
};

export default config;
