const path = require('path')
const webpack = require('webpack')

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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['', '.jsx', '.js']
  }
}
