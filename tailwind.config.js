module.exports = {
  purge: ["./src/**/*.svelte", "./public/*.html"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
