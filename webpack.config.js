var path = require("path");

module.exports = {
  context: path.join(__dirname + "/src"),
  entry: "./coffee/chrome.coffee",
  output: {
    path: path.join(__dirname + "/chrome"),
    filename: "bg.js"
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" }
    ]
  }
}