const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FileListPlugin = require("./plugins/FileListPlugin");

const smp = new SpeedMeasurePlugin();

/** @type {import('webpack').Configuration} */
const config = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     // 开启babel缓存，第二次构建时读取之前的缓存
          //     cacheDirectory: true,
          //   },
          // },
          {
            loader: "asyncErrorLoader",
            options: {
              debug: false,
            },
          },
          "loader3",
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      // {
      //   test: /\.(css|less)$/,
      //   use: ['myStyleLoader'],
      // },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: ["file-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["loader1"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["loader2"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(),
    // new BundleAnalyzerPlugin()
    new CleanWebpackPlugin(),
    new FileListPlugin(),
  ],
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "./loaders")],
  },
  mode: "development",
};

module.exports = smp.wrap(config);
