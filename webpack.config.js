'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const webpack = require('webpack');

const envPlugin = new webpack.DefinePlugin({
  ENV_BROWSER: JSON.stringify('chrome')
});

module.exports = {
  context: path.join(__dirname + '/src'),
  entry: {
    bg: './coffee/bg/chrome.js',
    cs: './coffee/cs/chrome.js'
  },
  output: {
    path: path.join(__dirname + '/build'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js/,
      loader: 'babel?optional[]=runtime',
      exclude: /node_modules/
    }]
  },
  plugins: [
    envPlugin
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },
  devtool: NODE_ENV == 'development' ? 'source-map' : null,
  watch: NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 100
  }
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true,
          unsafe: true
        }
      })
  );
}