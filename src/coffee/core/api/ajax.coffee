module.exports =
  get: (param)->
    param.method = "GET"
    @ajax param

  post: (param)->
    param.method = "POST"
    @ajax param

  head: (param)->
    param.method = "HEAD"
    @ajax param

  ajax: (param)->
    url = param.url
    data = param.data
    method = param.method
    cb = param.success
    headers = param.headers or {}

    req = $.ajax(
      url: url
      data: data
      headers: headers
      method: method
    )
    req.done (data, textStatus, jqXHR)->
      cb null, data
    req.fail (jqXHR, textStatus, errorThrown)->
      cb textStatus, jqXHR