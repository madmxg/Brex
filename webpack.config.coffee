path = require "path"
webpack = require "webpack"

envPlugin = new webpack.DefinePlugin
  ENV_BROWSER: JSON.stringify "chrome"

module.exports =
  context: path.join __dirname + "/src"
  entry:
    bg: "./coffee/bg/chrome.coffee"
    cs: "./coffee/cs/chrome.coffee"
  output:
    path: path.join __dirname + "/build"
    filename: "[name].js"
  module:
    loaders: [
      {
        test: /\.coffee$/, loader: "coffee-loader"
      }
    ]
  plugins: [
    envPlugin
  ]