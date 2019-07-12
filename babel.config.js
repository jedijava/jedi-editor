module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ["@babel/preset-env", { debug: false, modules: "umd" }],
      ["@babel/preset-react"],
      ["@emotion/babel-preset-css-prop"]
    ],
    plugins: [
      ["@babel/plugin-proposal-class-properties"],
      ["add-module-exports"]
    ]
  };
};
