module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "yellow-extra-light": "#FFFAEC",
        primary: "#EB5531",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
