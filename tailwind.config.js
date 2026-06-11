/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          emerald: '#008c7f',
          sand: '#f6f1e9',
          coffee: '#2f2a25',
        },
      },
    },
  },
 darkMode: 'class',
  plugins: [],
}