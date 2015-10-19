var path = require('path');
var webpack = require('webpack');

var envPlugin = new webpack.DefinePlugin({
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
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  plugins: [
    envPlugin
  ]
};