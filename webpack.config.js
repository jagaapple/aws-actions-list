const path = require("path");
const webpack = require("webpack");

const srcDir = path.resolve(__dirname, "src");
const distDir = path.resolve(__dirname, ".dist");

const version = require("./package.json").version;
const copyright = `
aws-actions-list v${version}
https://github.com/jagaapple/aws-actions-list

Copyright 2019, Jaga Apple and other contributors.
Licensed under MIT (https://github.com/jagaapple/aws-actions-list/blob/master/LICENSE)

Date: 2019-05-06T00:00Z
`;

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
  plugins: [new webpack.BannerPlugin(copyright)],
};
