/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    fontFamily: { urbanist: ["Urbanist"] },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ],
};
