/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkRed: "#D13800",
        darkBlue: "#007DF8",
        darkGreen: "#1EBE2C",
        darkerBlue: "#344BFD",
        flesh: "#FFE3D4",
        silver: "#F6F6F6"
      }
    },
  },
  plugins: [],
}
