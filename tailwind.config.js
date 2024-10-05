/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", flowbite.content()],
  theme: {
    extend: {
      height: {
        48: "48rem",
      },
      width: {
        110: "28rem",
      },
    },
  },
  plugins: [flowbite.plugin(), daisyui],
};
