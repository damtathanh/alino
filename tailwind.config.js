/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#FFFFFF',
        foreground: '#0A0A0A',
        border: '#E5E7EB',
      },
    },
  },
  plugins: [],
}
