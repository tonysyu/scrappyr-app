var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,
  entry: './scrappyr/static/js/index',
  output: {
      path: path.resolve('./scrappyr/static/webpack_bundles/'),
      filename: "[name]-[hash].js"
  },
  devtool: 'source-map',
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets:['es2015', 'es2017', 'react']
        },
        include: path.join(__dirname, 'scrappyr/static/js')
      }
    ]
  }
}
