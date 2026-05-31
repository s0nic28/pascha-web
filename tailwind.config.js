/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        black: "#050302",
        brown: "#2a160f",
        deepbrown: "#120b08",
        gold: "#d4a550",
        cream: "#fff7e6"
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        gold: "0 0 60px rgba(212, 165, 80, 0.25)"
      }
    }
  },
  plugins: []
};