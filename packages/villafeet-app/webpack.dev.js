const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')

const config = (env, args) => {
  const commonConfig = common(env, args)
  return merge(commonConfig, {
    devServer: {
      compress: true,
      hot: true,
      port: 8000,
      historyApiFallback: true,
      open: true,
      host: '0.0.0.0',
      watchOptions: {
        ignored: /node_modules/
      }
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

module.exports = config
