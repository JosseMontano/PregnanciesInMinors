/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#282828",
        secondary:"#5937d2",
        secondary_child:"#9381d3",
        thertiary:"#aa28ca",
        thertiary_child:"#ead5f6",
        quaternary:"#26daa3",
        quaternary_child:"#66d3b1",
        quinary:"#e99822",
        quinary_child:"#e3af63",
      },
      height: {
        75: "300px",
        102: "400px"
  
      },
    },
  },
  plugins: [],
};
