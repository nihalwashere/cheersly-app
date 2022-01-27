module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
    sass: {
      loaderOptions: {
        additionalData: `
        @import "/src/styles/colors.scss";
        `,
      },
    },
  },
};
