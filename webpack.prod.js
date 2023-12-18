const {merge} = require('webpack-merge') 
const baseUrl = require('./webpack.config')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')




module.exports = merge( baseUrl, {
  mode: 'production',
  optimization: {
    chunkIds: 'deterministic', // 固定id
    // 导入模块时分析哪些函数有被使用
    usedExports:  true,
    minimize: true,
    minimizer: [

      new TerserPlugin({
        parallel: true // 并发构建 多进程

      })
    ],
    // 运行时的相关代码额外拆开到一个分块中
    runtimeChunk:  {
      name: 'runtime'
    },
    // 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
    // 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
    // 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
    // 当加载初始化页面时，并发请求的最大数量小于或等于 30
    splitChunks: {
      chunks: 'async', // all 所有模块 | async 所有异步加载模块| initial 初始化的模块
      minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）。
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30, // 按需加载时最大并行请求数
      maxInitialRequests: 30, // 入口点的最大并行请求数
      enforceSizeThreshold: 50000, //强制执行拆分的体积阈值和其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略。
      cacheGroups: {
        // 将第三方库（如lodash、axios）分割到一个单独的vendor chunk中
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级
          reuseExistingChunk: true, // 重用现有块
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }
  },
  module: {
    rules: [
      // ...其他规则
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // css 提取
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css',
      chunkFilename: 'css/[contenthash]_chunk.css'
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-[contenthash]-bundle.js',
    chunkFilename: 'js/[contenthash]-chunk.js',
    clean: true
  },
})