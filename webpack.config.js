const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/app.ts",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.ttf$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        title: "CodeQuest",
      }),
      new MonacoWebpackPlugin({
        languages: ["html", "css", "javascript"],
        features: [
          "bracketMatching",
          "clipboard",
          "coreCommands",
          "cursorUndo",
          "find",
          "folding",
          "hover",
          "indentation",
          "lineSelection",
          "links",
          "multicursor",
          "smartSelect",
          "suggest",
          "wordHighlighter",
          "wordOperations",
        ],
      }),
    ],
    devServer: {
      static: "./dist",
      port: 3000,
      hot: true,
      open: true,
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
