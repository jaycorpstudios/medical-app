const path = require('path');
const srcPath = path.resolve(__dirname, 'src');

const config = (_env, _args) => {
  return {
    module: {
      rules: [
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
    }
  }
}

module.exports = config
