const webpackConfig = require("./webpack.config.base.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = function(env, argv) {
  // webpackConfig.optimization = {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         chunks: "initial",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // };
  webpackConfig.plugins.push(
    new CleanWebpackPlugin({
      verbose: true
    })
  );

  return webpackConfig;
};
