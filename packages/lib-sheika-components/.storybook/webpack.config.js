const path = require('path');

const config = {
  module: {
    rules: [
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader'
          }
        ],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/i,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  resolve: {
    extensions: ['.scss', '.sass', '.css', '.js', '.jsx'],
  },
}

module.exports = config
