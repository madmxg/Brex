module.exports =
  localStorage:
    set: (key, value)->
      localStorage[key] = value
    get: (key)->
      localStorage[key]
    clear: ->
      localStorage.clear()
  ajax: require "./ajax.coffee"