module.exports = {
  purge: ["./src/**/*.svelte", "./public/*.html"],
  theme: {
    extend: {},
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
};
