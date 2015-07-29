fs = require "fs"
del = require "del"
gulp = require "gulp"
map = require "vinyl-map"
gulpif = require "gulp-if"
gutil = require "gulp-util"
webpack = require "webpack"
rename = require "gulp-rename"
plumber = require "gulp-plumber"
replace = require "gulp-replace"
runSequence = require "run-sequence"

WebpackDevServer = require "webpack-dev-server"
webpackConfig = require "./webpack.config.js"

myDevConfig = Object.create webpackConfig
myDevConfig.devtool = "sourcemap"
myDevConfig.debug = true

webpackCompiler = webpack myDevConfig

gulp.task "watch", ->
  gulp.watch ["./src/coffee/*.coffee"], ["webpack:dev"]



gulp.task "webpack:dev", (cb)->

  webpack(myDevConfig).run (err, stats)->
    if err
      throw new gutil.PluginError "webpack:dev", err

    gutil.log "[webpack:dev]", stats.toString(colors: true)
    cb()


gulp.task "webpack:server", (cb)->

  new WebpackDevServer(webpack(myDevConfig), {
    contentBase: "#{__dirname}/chrome"
    publicPath: "/chrome"
    stats:
      colors: true
  }).listen 8080, "192.168.0.5", (err)->
    if err
      throw new gutil.PluginError "webpack:server", err

    gutil.log "[webpack:server]", "http://localhost:8080/webpack-dev-server/"
    cb()


gulp.task "default", (cb)->
  runSequence(
    [
      "webpack:dev"
      "webpack:server"
    ],
     "watch"
    cb
  )