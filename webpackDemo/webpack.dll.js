/*
  使用dll技术，对某些库进行单独打包
  使用webpack --config webpack.dll.js 来运行该webpack配置
*/

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露出去是什么内容

  },
  plugins: [
    // 打包生成一个manifest.json，提供和jquery的映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json'), // 输出的文件路径
    }),
  ],
  mode: 'production',
};
