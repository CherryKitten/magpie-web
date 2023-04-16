/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rp: {
          base: "#232136",
          surface: "#2a273f",
          overlay: "#393552",
          muted: "#6e6a86",
          subtle: "#908caa",
          text: "#e0def4",
          love: "#eb6f92",
          gold: "#f6c177",
          rose: "#ea9a97",
          pine: "#3e8fb0",
          foam: "#9ccfd8",
          iris: "#c4a7e7",
          highlightLow: "#2a283e",
          highlightMed: "#44415a",
          highlightHigh: "#56526e",
        },
      },
    },
  },
  plugins: [],
}
