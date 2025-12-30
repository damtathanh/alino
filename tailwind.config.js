/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
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
