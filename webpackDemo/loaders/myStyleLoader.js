const CssLoader = require('css-loader');
const LessLoader = require('less-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = async function myStyleLoader(content, map, meta) {
  console.log('content: ', content);
  if (this._module.resource.match(/\.less$/)) {
    await LessLoader.call(this, content);
    await CssLoader.call(this, content);
    await MiniCssExtractPlugin.loader.call(this, content, map, meta);
  } else if (this._module.resource.match(/\.css$/)) {
    await CssLoader.call(this, content, map, meta);
    await MiniCssExtractPlugin.loader.call(this, content, map, meta);
  }
};
