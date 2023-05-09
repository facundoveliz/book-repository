/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // TODO: change this names
      colors: {
        background: "#0b1622",
        "background-variant": "#101b27",

        primary: "#09a0de",
        "primary-variant": "#16adeb",

        secondary: "#e13333",
        "secondary-variant": "#df3131",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(12rem, 1fr))",
      },
      display: ["group-hover"],
    },
  },
  plugins: [],
};
