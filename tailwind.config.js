/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        avito: {
          blue: '#00aa00', // We can use Avito's brand green or blue. Let's make a beautiful custom green/blue theme. Avito actually uses brand green #00aa00 (or brand turquoise) and blue #009cf0
          green: '#73b431',
          blue: '#009cf0',
          dark: '#2a2c2e',
        }
      }
    },
  },
  plugins: [],
}
