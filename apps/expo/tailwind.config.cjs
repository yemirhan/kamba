/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@acme/tailwind-config")],
  theme: {
    extend: {
      colors: {
        background: "#212529"
      }
    }
  }
};
