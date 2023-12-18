const path = require('path')

const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.config')


module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000
  },
  optimization: {
    chunkIds: 'named',
  }
})