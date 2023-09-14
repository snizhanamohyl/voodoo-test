import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default {
  root: "src",
  build: {
    outDir: "../dist",
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
    }),
  ],
};
