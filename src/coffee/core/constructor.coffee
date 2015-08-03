class Constructor
  object: (prop)->
    new Object(prop)
  array: (items)->
    unless items
      new Array()
    else
      new Array(items)
  true: ->
    new Boolean(true)
  false: ->
    new Boolean(false)
  boolean: (b)->
    !!b
  function: (args, body)->
    unless body
      body = args
      args = ""
    new Function(args, body)
  error: (msg = "Something wrong in plugin ;(", name = "Plugin error")->
    class PlugErr
      constructor: (@message, @name)->
    PlugErr:: = Object.create Error::
    PlugErr::constructor = PlugErr
    new PlugErr(msg, name)
  number: (num)->
    new Number(num) + 0
  date: (val)->
    new Date(val)
  string: (sArgs...)->
    s = sArgs.join ""
    "#{new String(s)}"
  regExp: (pattern, flags = "")->
    new RegExp(pattern, flags)

module.exports = Constructor
