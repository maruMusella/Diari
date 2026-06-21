/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Libre Baskerville'", 'serif'],
        body: ["'Inter'", 'sans-serif'],
      },
      colors: {
        background: '#0A0F1A',
        foreground: '#F0F2F5',
        muted: '#7A8BA8',
        warm: {
          ivory: '#F0F2F5',
          sand: '#2A3548',
          terracotta: '#E63946',
          blush: '#FF6B6B',
          cream: '#1A2535',
        },
        vivid: {
          red: '#E63946',
          crimson: '#C1121F',
          coral: '#FF6B6B',
          scarlet: '#FF3D3D',
          blue: '#1B6CA8',
          azure: '#2B8FD4',
          deep: '#0D3B66',
          navy: '#0A1628',
          frost: '#4DA8DA',
          ice: '#A8D8EA',
        },
        pastel: {
          peach: '#FFB4A2',
          mint: '#A8D8EA',
          lavender: '#C4B1D4',
          sky: '#4DA8DA',
          rose: '#FF6B6B',
          apricot: '#FFB07C',
        },
      },
    },
  },
  plugins: [],
}
