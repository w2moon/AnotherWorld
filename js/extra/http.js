var timeout = 20

require("extra/hashlib.js")
require("extra/json.js")

var httpclient = cc.HttpClient.getInstance()
httpclient.setTimeoutForConnect(timeout)

function send(obj)
end