/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        primary: "#26C9DF",
        accent: "#1348B0",
        text: "#F5F5F5",
      },
      background: "linear-gradient(165deg, #20c4d9, #1348b0)",
      fontFamily: {
        heading: "Montserrat",
        content: "Source Code Pro",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeIn2: {
          "0%": { opacity: 0 },
          "100%": { opacity: 0.5 },
        },
        line: {
          "0%": { height: 0 },
          "100%": { height: "85%" },
        },
      },
      animation: {
        fadeIn: "fadeIn 5s",
        fadeIn2: "fadeIn2 2s",
        line: "line 2s 1",
      },
      gridTemplateRows: {
        myGrid: "repeat(auto-fill, minmax(150px, 1fr))",
      },
    },
  },
  plugins: [],
};
