/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      brightness: {
        10: "0.1",
        20: "0.2",
        30: "0.3",
        40: "0.4",
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss"), require("daisyui")],
};
