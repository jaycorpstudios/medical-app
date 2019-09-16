const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const manifestContent = require('./src/manifest.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const srcPath = path.resolve(__dirname, 'src')
const {GenerateSW} = require('workbox-webpack-plugin');

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
          test: /\.module\.scss$/i,
          loaders: ['style-loader',{
            loader: 'css-loader',
            options: {
              modules: true,
              // localIdentName: '[local]---[hash:base64:5]', //ThemeDropDown---3WNSL
              localIdentName: '[name]__[local]___[hash:base64:5]', //"ThemeDropDown-module__DropDown___2MKzx"
              sourceMap: true,
            }
          },
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
          test: /\.scss$/,
          exclude: /\.module\.scss$/i,
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
        filename: './index.html'
      }),
      new CopyWebpackPlugin([
             { from: 'theme/installation/**/*'},
          ], { context: srcPath }
      ),
      new ManifestPlugin({
          writeToFileEmit: false,
          fileName: 'manifest.json',
          seed: manifestContent
      }),
      new GenerateSW( {
        swDest: 'shell-app.js',
        importWorkboxFrom: 'local',
        skipWaiting: true,
        clientsClaim: true
      })
    ]
  }
}

module.exports = config
