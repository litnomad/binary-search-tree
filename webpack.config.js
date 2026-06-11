import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/script.test.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
};
