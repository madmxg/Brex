$ = require "jquery"

module.exports =
  get: (param, cb)->
    console.log "BG: ajax get"
    param.method = "GET"
    @ajax param, cb

  post: (param, cb)->
    console.log "BG: ajax post"
    param.method = "POST"
    @ajax param, cb

  head: (param, cb)->
    console.log "BG: ajax head"
    param.method = "HEAD"
    @ajax param, cb

  ajax: (param, cb)->
    console.log "BG: ajax ajax"
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
      console.log console.log "BG: ajax response: ", data
      cb err: false, value: data
    req.fail (jqXHR, textStatus, errorThrown)->
      console.log console.log "BG: ajax response err : ", textStatus
      cb err: true, value: textStatus

    return true