"use strict";

module.exports = function(env, argv) {
  // console.log("####env=" + env + ",argv=" + JSON.stringify(argv));
  var config = require(`./webpack.${argv.mode}.js`);
  var result = config(env, argv);
  // console.log("配置=" + JSON.stringify(result));
  return result;
};
