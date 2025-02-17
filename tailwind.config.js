/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        active:"#0aad0a",
        main:"#1bc61f",
        "unhover-button": "#49d14c",
        "dark-bg": "#1a202c",
        "dark-input-bg":"#e8f0fe",
      }
    },
  },
  plugins: [],
}