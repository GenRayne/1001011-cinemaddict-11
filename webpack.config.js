const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`
  },
  devtool: `sourcemap`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};
