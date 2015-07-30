$ = require "jquery"

module.exports =
  get: (param, cb)->
    param.method = "GET"
    @ajax param, cb

  post: (param, cb)->
    param.method = "POST"
    @ajax param, cb

  head: (param, cb)->
    param.method = "HEAD"
    @ajax param, cb

  ajax: (param, cb)->
    url = param.url
    data = param.data or ""
    method = param.method
    headers = param.headers or {}

    req = $.ajax(
      url: url
      data: data
      headers: headers
      method: method
    )
    req.done (data, textStatus, jqXHR)->
      cb err: false, value: data
    req.fail (jqXHR, textStatus, errorThrown)->
      cb err: true, value: textStatus