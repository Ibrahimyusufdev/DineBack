/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"]
      },
      colors: {
        darkRed: "#D13800",
        blue: "#007DF8",
        green: "#1EBE2C",
        darkerBlue: "#344BFD",
        flesh: "#FFE3D4",
        white: "#FFFFFF",
        black: "000000",
        silver: "#F6F6F6"

      }
    },
  },
  plugins: [],
}
