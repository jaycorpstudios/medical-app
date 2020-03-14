// Webpack PROD Configuration
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

const config = (env, args) => {
  const commonConfig = common(env, args);
  return merge(commonConfig, {
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].chunk.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
    ],
  })
};

module.exports = config;
