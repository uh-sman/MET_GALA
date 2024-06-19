/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dRegular: ["DancingScript-Regular", "sans-serif"],
        dBold: ["DancingScript-Bold", "sans-serif"],
        dSemibold: ["DancingScript-Variable", "sans-serif"],
        dARegular: ["Amita-Regular", "sans-serif"],
        dABold: ["Amita-Bold", "serif"],
      },
    },
  },
  plugins: [],
};
