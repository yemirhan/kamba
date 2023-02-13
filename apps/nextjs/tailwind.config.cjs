/** @type {import("tailwindcss").Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
      },
    },
  },
  presets: [require("@acme/tailwind-config")],
};
