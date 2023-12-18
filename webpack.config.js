const path = require('path')
const HtmlWepackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000
  },
  // 优化

  
  optimization: {

    
  },
  entry: {
    index: {
      import: './src/index.js',
    },
    main: {
      import: './src/main.js',
    }
  },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'js/[name]-[contenthash]-bundle.js',
  //   chunkFilename: 'js/[contenthash]-chunk.js',
  //   clean: true
  // },
  module: {
    rules: [
      // ...其他规则
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [ 
    new HtmlWepackPlugin({template: './index.html'}),
  ]
}