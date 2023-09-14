/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
    },
    colors: {
      primary: "#000000",
      secondary: "#FCF7E6",
      tertiary: "#FFFFFF",
    },
    screens: {
      sm: "390px",
      "2xl": "1512px",
    },
    // spacing: {
    //   1: "4px",
    //   2: "6px",
    //   3: "8px",
    //   4: "12px",
    //   5: "16px",
    //   6: "24px",
    //   7: "32px",
    //   8: "40px",
    //   9: "48px",
    //   10: "56px",
    //   11: "84px",
    //   12: "120px",
    //   13: "196px",
    // },
    // borderRadius: {
    //   small: "4px",
    //   full: "50%",
    // },
  },
  plugins: [],
};
