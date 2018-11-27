const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const manifestContent = require('./src/manifest.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const srcPath = path.resolve(__dirname, 'src')

const config = (env, args) => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: [
                '@babel/syntax-dynamic-import', '@babel/plugin-proposal-object-rest-spread'
              ]
            }
          }
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                  srcPath,
              ]
            }
          }
        ]
        },
        {
          test: /\.(png|jpg|gif|ttf|svg|woff2)$/,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      name: '[path][name].[ext]',
                      context: srcPath,
                      useRelativePaths: true
                  }
              }
          ]
      },
      ]
    },
    resolve: {
      alias: {
          'src': srcPath //alias used for sass relative paths
      }
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: './index.html',
        manifestUrl: 'src/manifest.json'
      }),
      new CopyWebpackPlugin([
             { from: 'theme/installation/**/*'},
          ], { context: srcPath }
      ),
      new ManifestPlugin({
          writeToFileEmit: false,
          fileName: 'manifest.json',
          seed: manifestContent
      })
    ]
  }
}

module.exports = config
