const path = require('path')
const HtmlWepackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'first-webpack.bundle.js'
  },
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
  plugins: [ new HtmlWepackPlugin({template: './index.html'})]
}