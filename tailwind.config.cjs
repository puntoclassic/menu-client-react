/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    "badge-primary",
    "badge-secondary",
    "badge-info",
    "badge-danger",
    "badge-success"
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
