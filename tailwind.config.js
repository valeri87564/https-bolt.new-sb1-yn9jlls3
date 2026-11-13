/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Lilita One"', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        red: { DEFAULT: '#D7261B', dark: '#9E1A12', light: '#FF5A4E' },
        blue: { DEFAULT: '#0A74C2', dark: '#075086', light: '#3CB4FF' },
        green: { DEFAULT: '#128A44', dark: '#0B5E2E', light: '#4ADE80' },
        yellow: { DEFAULT: '#FFC21A', dark: '#C98F0B', light: '#FFE07A' },
        ink: {
          950: '#0F1115',
          900: '#171A20',
          800: '#21252D',
          700: '#2C313B',
          600: '#3E434E',
          400: '#9AA0AB',
          200: '#D5D9E0',
          50: '#F6F7F9',
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        bob: 'bob 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};
