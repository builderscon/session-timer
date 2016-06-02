
module.exports = {
  entry: `${__dirname}/src/js/index.jsx`,
  output: {
    filename: `${__dirname}/public/app.js`
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  }
}
