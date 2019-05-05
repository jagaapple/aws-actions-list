const path = require("path");

const srcDir = path.resolve(__dirname, "src");
const distDir = path.resolve(__dirname, ".dist");

module.exports = {
  mode: "production",
  target: "node",
  entry: path.join(srcDir, "index.ts"),
  output: {
    path: distDir,
    filename: "aws-actions-list.min.js",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
    ],
  },
};
