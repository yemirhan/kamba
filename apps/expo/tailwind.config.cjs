/** @type {import("tailwindcss").Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  presets: [require("@acme/tailwind-config")],
  theme: {
    extend: {
      colors: {
        background: "#262626",
        "background-secondary": "#202020",
        "text-dark": "#808080",
        primary: "#E4692A",
        secondary: "#4A5BF3",
        danger: "#571717",
        success: "#206500",
        gray: colors.zinc,
      },
    },
  },
};
