import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary — Barn Red (CTAs, key accents)
        barn: {
          50: '#fdf2ef',
          100: '#fbe0d9',
          200: '#f6bdb0',
          400: '#de7258',
          500: '#d45e42',
          600: '#C94A2E',
          700: '#a83b23',
          800: '#8a2f1c',
          900: '#6e2515',
        },
        // Harvest Yellow (highlights, badges, warmth)
        harvest: {
          100: '#fef8e3',
          200: '#fdf0c0',
          300: '#fbe491',
          400: '#F6C85F',
          500: '#f2b535',
          600: '#d99a1e',
          700: '#b37d16',
        },
        // Field Green (trust, grounding sections)
        field: {
          50: '#f0f7f4',
          100: '#daeee5',
          200: '#b4dccb',
          400: '#5fa688',
          600: '#2F6B4F',
          700: '#285c43',
          800: '#204b36',
          900: '#183a29',
          950: '#0e2418',
        },
        // Clay (secondary accent)
        clay: {
          200: '#efd4c0',
          400: '#cc9574',
          600: '#B86F46',
          700: '#9a5c37',
        },
        // Ink (text hierarchy)
        ink: {
          50: '#f7f8f9',
          100: '#eef0f2',
          200: '#d5d9de',
          300: '#b3bac3',
          400: '#8d97a3',
          500: '#6b7685',
          600: '#546070',
          700: '#3f4d5c',
          800: '#2d3a47',
          900: '#1F2933',
          950: '#141c23',
        },
        // Page backgrounds
        cream: '#FFF7E8',
        // Sky — info panels
        sky: {
          50: '#f4f9ff',
          100: '#E8F2FF',
          200: '#c8dffe',
        },
        // Graphite — borders, muted UI
        graphite: {
          400: '#6b7785',
          500: '#546070',
          600: '#38414A',
          700: '#2c333b',
        },
        // Sprout — success/positive
        sprout: {
          100: '#e8f5d6',
          400: '#9BCB77',
          600: '#6aaa41',
        },
        // Warning wheat — risk/attention
        wheat: {
          100: '#fef3e2',
          400: '#F2A541',
          600: '#d4831e',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
