/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        spaceMono: ["Space Mono", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
    colors: {
      primary: "#000000",
      secondary: "#FCF7E6",
      tertiary: "#FFFFFF",
      bgModal: "#1E1E1E",
      modalHover: "#bfb9a3",
    },
    screens: {
      sm: "390px",
      "2xl": "1512px",
    },
    fontWeight: {
      medium: "500",
      bold: "700",
    },
  },
  plugins: [],
};
