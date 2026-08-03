import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: { 
        company: ["var(--font-company)", "sans-serif"], 
        sans: ["var(--font-sans)"],
      },
      colors: {
        primary: '#E6C200',
        accent: '#FFD700',
        'bg-tint': '#FFF2AF',
        dark: '#1D0101',
        verified: '#1D9BF0',
      },
      borderRadius: {
        card: '1.25rem',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
