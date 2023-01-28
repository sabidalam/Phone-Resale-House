/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        Theme: {
          primary: "#231942",
          secondary: "#5E548E",
          accent: "#9F86C0",
          info: "#BE95C4",
          neutral: "#E0B1CB",

          "base-100": "#ffffff",
        },
      },
    ],
  },
  theme: {

    extend: {},
  },
  plugins: [require("daisyui")],
}
