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
      },
      animation: {
        fadeIn: "fadeIn 5s",
      },
      gridTemplateRows: {
        myGrid: "repeat(auto-fill, minmax(150px, 1fr))",
      },
    },
  },
  plugins: [],
};
