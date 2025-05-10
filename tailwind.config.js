// tailwind.config.js
module.exports = {
  darkMode: 'class', // you control dark mode via a class
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light",], // or custom themes
  }
}