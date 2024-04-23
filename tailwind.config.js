/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#282828",
      },
      height: {
        75: "300px",
        102: "400px"
  
      },
    },
  },
  plugins: [],
};
