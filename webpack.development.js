"use strict";

var webpackConfig = require("./webpack.config.base.js");
var path = require("path");
module.exports = function(env, argv) {
  webpackConfig.devtool = "inline-source-map";
  webpackConfig.devServer = {
    contentBase: path.join(__dirname, "dev"),
    open: true,
    host: "127.0.0.1", // 0.0.0.0 localhost
    port: 8088
  };
  return webpackConfig;
};
