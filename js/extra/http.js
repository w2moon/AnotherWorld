var TIMEOUT_TIME = 20

var RECONNECT_TIMES = 3

require("extra/hashlib.js")
require("extra/json.js")



var httpclient = cc.HttpClient.getInstance()
httpclient.setTimeoutForConnect(TIMEOUT_TIME)

httpclient.on_response = function(httpclient,response){
    if(response.getResponseCode() == 200)
    {
        var obj = response.getResponseData().parseJSON()
        cc.log(obj.result)
    }
    else
    {
        var req = response.getHttpRequest()
        if(req.reconnect_times > 0)
        {
            req.reconnect_times--;
            httpclient.send(req)
        }
        else
        {
            cc.log("error response")
        }
    }
}
 

var http = new Object()
http.send = function(obj)
{
    var msg = obj.toJSONString()

    var req = new cc.HttpRequest()
    req.setRequestType(1)
    var sig = hex_md5(msg+SECRET_KEY)
    req.setUrl(SERVER+sig)
    req.setRequestData(msg,msg.length)
    req.setResponseCallback(httpclient,httpclient.on_response)
    req.reconnect_times = RECONNECT_TIMES
    httpclient.send(req)
}
