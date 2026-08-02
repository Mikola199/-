/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        avito: {
          green: '#00AA00',
          blue: '#009CF0',
          dark: '#1F1F24',
          gray: '#F2F4F7',
          yellow: '#FFD600',
        },
        tiktok: {
          cyan: '#25F4EE',
          pink: '#FE2C55',
          dark: '#010101',
        }
      },
    },
  },
  plugins: [],
}
