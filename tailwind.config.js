/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: { urbanist: ["Urbanist"] },
    // colors: {
    //   primary: '#1B1850',
    //   secondary: '#F2BFF9',
    //   accent: '#F1598F',
    //   background: '#EFF3FF',
    //   text: '#7F8490'
    // },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
};
