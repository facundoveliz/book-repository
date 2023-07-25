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
        background: {
          50: "#fffffc",
          100: "#fffffc",
          200: "#fffef7",
          300: "#fcfaf0",
          400: "#fcf8e8",
          500: "#f9f1db",
          600: "#e0d2b1",
          700: "#baa47b",
          800: "#967950",
          900: "#70512d",
          950: "#472b13",
        },
        foreground: {
          50: "#f7f6f2",
          100: "#f0ede4",
          200: "#d6cfbc",
          300: "#bfb49b",
          400: "#8f7d60",
          500: "#5f4b32",
          600: "#543f28",
          700: "#47311d",
          800: "#382212",
          900: "#2b180a",
          950: "#1c0d04",
        },
        primary: {
          50: "#fcfcfa",
          100: "#fcfbf5",
          200: "#f7f5e9",
          300: "#f0ebd8",
          400: "#e6dcbc",
          500: "#dbcca3",
          600: "#c4b184",
          700: "#a3895a",
          800: "#85663a",
          900: "#634421",
          950: "#40250d",
        },
        secondary: {
          50: "#fffffc",
          100: "#fcfcfa",
          200: "#faf8f0",
          300: "#f7f5e9",
          400: "#f0ead8",
          500: "#eae1c8",
          600: "#d4c5a3",
          700: "#b09a71",
          800: "#8c7048",
          900: "#694a28",
          950: "#452911",
        },
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(12rem, 1fr))",
      },
      display: ["group-hover"],
      fontFamily: {
        inter: ["Inter"],
        playfair: ["Playfair"],
      },
    },
  },
  plugins: [],
};
