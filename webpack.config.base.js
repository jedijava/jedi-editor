"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    filename: "jedi-editor.js",
    path: __dirname + "/dist",
    libraryTarget: "umd",
    globalObject: "this",
    // libraryExport: 'default',
    library: "JediEditor"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: false,
      template: "./index.html",
      filename: "index.html",
      loader: "html-loader",
      favicon: "./favicon.ico"
    }),
    //提取css注入到html中
    new MiniCssExtractPlugin({
      filename: "./index.css"
    })
  ],
  externals: { react: "React", "react-dom": "ReactDOM" }
};
