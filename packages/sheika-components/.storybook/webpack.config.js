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
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.scss', '.sass'],
  },
}

module.exports = config
