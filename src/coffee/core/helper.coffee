module.exports =
  getCurrentTime: ->
    new Date().valueOf()
  parseJson: (str)->
    try
      JSON.parse str
    catch e
      ""