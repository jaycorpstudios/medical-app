const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const devProperties = require('./properties/properties-dev')

const config = (env, args) => {
  const commonConfig = common(env, args)
  return merge(commonConfig, {
    devServer: {
      compress: true,
      hot: true,
      port: 8000,
      historyApiFallback: true,
      open: true,
      host: 'localhost',
      watchOptions: {
        ignored: /node_modules/
      }
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(devProperties)
    ]
  })
}

module.exports = config
