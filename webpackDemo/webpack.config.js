const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

/**
  HMR： hot module replacement 热模块替换
  作用：一个模块发生变化，只会重新打包这一个模块，而不是所有模块，极大提示构建速度
  样式文件： 如果使用的时style-loader，可以使用HMR功能，因为style-loader内部实现了
  js文件：默认不能使用HMR功能
  html：默认不能使用HMR功能，并且会导致问题：html文件不能被热更新了（不用做HMR功能）
    解决：修改entry入口，将html文件引入
 */

/**
  缓存：
    1. babel缓存 -- 不希望babel的兼容性代码每次都重新编译，希望加上缓存
      cacheDirectory: true
    2. 文件缓存 -- 浏览器可能会缓存我们的文件，导致新的修改没有生效
      --> 在输出的js和css的文件名后加hash --> 每次打包所有的js和css都有一个新的hash，导致没修改的代码文件也被刷新了
      --> 使用chunkhash做到只有修改部分的代码文件有新的hash,更加chunk生成的hash，如果打包来源于同一个chunk，那么hash值一样 --> 输出的js和css文件名还是一样的，因为css是在js中被引入的，同属于一个chunk
      --> 使用contenthash： 根据文件内容生成hash
 */
/**
  tree shaking 树摇
  将项目中没有用到的代码去除
  条件：1. production环境 2. 使用es6的模块化方式

  在package.json中配置
  "sideEffects": false表示我们认为所有的代码都没有副作用，全都可以进行tree shaking，这样可能会把css文件 babel polyfill也删掉
  --> 使用 "sideEffects": ["*.css"]就可以让webpack不对css文件进行tree shaking
 */
const ENV = 'development';

// 设置nodejs环境变量
process.env.NODE_ENV = ENV;

module.exports = {
  // webpack入口
  /*
  1. string: 单入口，打包形成一个chunk，chunk名默认是main
  // 2. array: 多入口，打包形成一个chunk，没什么用
  3. object: 多入口，打包形成多个chunk，此时chunk的名称是对象的key

  2.3.结合，可以做到对于特定的多个chunk打包成一个chunk
  */
  entry: './src/js/index.js',
  // 多入口 可用于多页应用
  // entry: {
  //   main: './src/js/index.js',
  //   test: './src/js/test.js',
  // },
  // webpack输出路径
  output: {
    // 文件名称（路径+名称）
    filename: 'js/[name].[contenthash:10].js',
    // 非入口chunk的名称（通过import动态引入、通过optimization分离的node_modules的chunk）
    chunkFilename: 'js/[name]_chunk.[contenthash:10].js',
    // 输出文件目录（将来所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
    // 所有资源引入的公共路径前缀，所有的资源名前都会加上publicPath，一般用于生产环境
    // publicPath: '/',
    // library: '[name]', // 整个库向外暴露的变量名，当自己做第三名模块有用
    // libraryTarget: 'window', // 变量名添加到哪个变量上 browser
    // libraryTarget: 'global', // 变量名添加到哪个变量上 node
  },

  // 解析模块的规则
  resolve: {
    // 配置解析模块路径的别名
    alias: {
      src: resolve(__dirname, 'src'),
    },
    // 配置省略文件的后缀名
    extensions: ['.js', '.json'],
    // 告诉webpack解析模块找哪个目录
    modules: [resolve(__dirname, 'node_modules'), 'node_modules'],
  },

  // loader配置 下载 使用
  module: {
    rules: [
      {
        // 当loader数量很多的时候，一个文件就会经过多个loader匹配尝试
        // 使用oneOf可以当规则匹配时，只使用第一个匹配规则， 注意如果想让多个loader都用上的时候，要不写入一个规则内，要不拿到oneOf的外部
        oneOf: [
          // 详细的loader配置
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                // 将publicPath改成../来解决引入MiniCssExtractPlugin.loader后css中图片路径错误的问题
                options: {
                  publicPath: '../',
                },
              },
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    // postcss 插件
                    // eslint-disable-next-line global-require
                    require('postcss-preset-env')(),
                  ],
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: [
              // use数组中loader执行顺序是从后往前
              // 创建一个style标签在head中，将js中的样式文件注入到style标签中，
              // 'style-loader',
              // 这个loader取代style-loader，提取css成单独的文件
              {
                loader: MiniCssExtractPlugin.loader,
                // 将publicPath改成../来解决引入MiniCssExtractPlugin.loader后css中图片路径错误的问题
                options: {
                  publicPath: '../',
                },
              },

              // 将css文件变成commonjs模块加载到js中
              'css-loader',
              // css兼容性处理 postcss --> postcss-loader postcss-preset-env
              // postcss-preset-env 帮postcss找到package.json中browserslist中的配置，通过配置加载指定的css兼容性样式
              /**
                 *  "browserslist": {
                     // 要使用开发环境 需要配置process.env.NODE_ENV = 'development'
                      "development": [
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                      ],
                      // 生产环境：默认是看生成环境，与webpack配置的mode无关
                      "production": [
                        ">0.2%",
                        "not dead",
                        "not op_mini all"
                      ]
                    }
                 */
              // 'postcss-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    // postcss 插件
                    // eslint-disable-next-line global-require
                    require('postcss-preset-env')(),
                  ],
                },
              },
              // 将less文件编译成css文件
              'less-loader',
            ],
          },
          {
            // 问题：默认无法处理html中的图片
            // 处理图片资源
            test: /\.(jpg|png|gif)$/,
            // 使用url-loader需要下载url-loader和file-loader
            loader: 'url-loader',
            options: {
              // 图片大小小于8kb，就会被base64处理,写入代码中，
              // 优点：减少请求数量 减小服务器压力
              // 缺点：图片体积会更大
              limit: 8 * 1024,
              // 给图片重命名
              // [hash:10]取图片的hash的前10位
              // [ext]取文件的原扩展名
              name: '[hash:10].[ext]',
              // 输出路径
              outputPath: 'image',
            },
          },
          {
            test: /\.html$/,
            // 处理html文件的img图片（负责引入img，从而能被url-loader处理）
            loader: 'html-loader',
          },
          {
            test: /\.js$/,
            // 排除node_modules下的js文件
            exclude: /node_modules/,
            // 只检查src下的js文件
            include: resolve(__dirname, 'src'),
            // enforce: 'pre', eslint-loader必须放在babel-loader前执行，
            // 但是在两个loader分开的情况下，其顺序无法保证，
            // 因此需要给eslint- loader使用enforce: 'pre'保证在匹配js的情况下，eslint - loader先执行
            use: [
              /*
                开启多进程打包
                进程开启需要600ms，进程通信也要开销
                只有打包消耗时间比较长，才适合使用多进程打包
              */
              // 'thread-loader',
              {
                loader: 'thread-loader',
                options: {
                  workers: 4,
                },
              },
              {
                /**
                  js 兼容性处理：babel-loader @babel/preset-env @babel/core
                  1. 基本js兼容性问题处理 @babel/preset-env
                  问题：只能转换基本语法，如promise不能转换
                  2. 全部js兼容性处理 @babel/polyfill 直接在js中import @babel/polyfill
                  问题：全部兼容都被引入，打包中包含过多的兼容代码，体积过大,不用它
                  3. 按需加载 core-js
                  */
                loader: 'babel-loader',
                options: {
                  // 预设，指示babel做怎样的兼容性处理
                  presets: [
                    [
                      // 注意这里还要一个中括号
                      '@babel/preset-env',
                      {
                        // 按需加载
                        useBuiltIns: 'usage',
                        // 指定corejs版本
                        corejs: {
                          version: 3,
                        },
                        targets: {
                          chrome: '60',
                          firefox: '60',
                          ie: '9',
                          safari: '10',
                        },
                      },
                    ],
                  ],
                  // 开启babel缓存，第二次构建时读取之前的缓存
                  cacheDirectory: true,
                  plugins: [
                    'dynamic-import-webpack',
                  ],
                },
              },
              // {
              //   loader: 'eslint-loader',
              //   options: {
              //     // 自动修复eslint错误
              //     fix: true,
              //   },
              // },
            ],
          },
        ],
      },
    ],
  },
  // plugins配置 下载 引入 使用
  plugins: [
    // 详细的plugins配置
    // html-webpack-plugin
    // 功能： 默认会创建一个空的html，自动 引入打包输出的所有资源
    // 需求： 需要有结构的html文件
    new HtmlWebpackPlugin({
      // 复制./src/index.html  并自动引入打包输出的所有资源
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    // css单独打包
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    // 会生成一个serviceWorker配置文件
    new WorkboxWebpackPlugin.GenerateSW({
      // 删除旧的serviceWorker
      clientsClaim: true,
      // 帮助serviceWorker快速启动
      skipWaiting: true,
    }),
    // 告诉webpack哪些库不参与打包，同时使用时名称也得变
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 将某个文件打包输出，并在html中引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
    }),
  ],

  /**
    1. 可以将node_modules中代码单独打包成一个chunk
    2. 自动分析多入口chunk中有没有公共的文件，有则单独打包成一个chunk
   */
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSize: 0, // 最大无限制
      minChunks: 1, // 要提取的chunk最少被引用一次
      maxAsyncRequests: 5, // 按需加载时，并行加载的最大数量
      minInitialRequests: 3, // 入口js文件最大并行请求数量
    },
    // 将当前模块记录其他模块的hash单独打包为一个文件，用于解决修改a文件导致b文件（b引用了a）的contenthash变化从而产生的缓存失效的问题
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      // 配置生产环境js和css的压缩方案
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 开启source map
        sourceMap: true,
      }),
    ],
  },

  // 如果有些包我们选择使用cdn方式引入，那么就不希望那些包被webpack打包，那就把那些包放到externals中
  // 但是如果lodash加载过慢，导致其他js文件在lodash加载完成前先调用了lodash，会出现问题
  externals: {
    // 忽略库名 -- npm包名
    lodash: {
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_', // indicates global variable
    },
  },

  // 当mode为production时会自动进行js压缩
  mode: ENV,
  // 开发服务器devServer: 用于自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动指令：npx webpack-dev-server
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监视contentBase下所有文件，一旦文件变化就会reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/,
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启HMR热模块替换功能
    // hot: true,
    // 不要启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息外，其他内容都不显示
    quiet: true,
    // 如果出错了，不要全屏提示
    overlay: false,
    // 解决开发环境跨域问题
    // 一旦devserver服务器接收到/api/xxx的请求，就会把请求转发到另一个服务器localhost:3000
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时请求的路径重写，将/api/xxx --> /xxx ,这样我们在使用时，面对一个www.aaa.com/api/xxx的请求，就可以直接调用/xxx了
        pathRewrite: {
          '^api/': '',
        },
      },
    },
  },
  /**
   * https://webpack.docschina.org/configuration/devtool/
  source-map: 外部
    错误代码准确信息和源代码的错误位置

  inline-source-map: 内联 比外部构建速度快
    错误代码准确信息和源代码的错误位置

  hidden-source-map: 外部
    错误代码错误原因，但是没有源代码错误位置，提供的是打包后错误代码的位置

  eval-source-map: 内联 每一个文件都生成对应的source-map, 都在eval
    错误代码准确信息和源代码的错误位置

  nosources-source-map: 外部
    错误代码准确信息但是没有错误代码位置
  cheap-source-map: 外部
    错误代码准确信息但是错误代码位置是打包后的一行，没法看
  cheap-module-source-map: 外部

  开发环境：速度快，调试友好
    速度快（eval>cheap>inline)
    调试友好
      source-map
      cheap-module-source-map
      cheap-source-map
    --> 选择eval-source-map，react和vue都选择了它

  生产环境：源代码要不要隐藏？调试要不要更友好
    内联会让代码体积变大，因此生产环境不用内联的
    source-map
    cheap-source-map
    cheap-module-source-map
    nosouces-source-map
    hidden-source-map

    -->如果不需要隐藏源代码，用source-map
   */

  devtool: 'eval-source-map',
};
