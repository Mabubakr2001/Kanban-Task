"use-strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "./src/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "assets/images/[name].[ext]",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 8800,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Kanban Task",
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["index"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/assets"),
          to: path.resolve(__dirname, "./dist/assets"),
        },
      ],
    }),
    new MiniCssExtractPlugin({ filename: "styles/style.css" }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
