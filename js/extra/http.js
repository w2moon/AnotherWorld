

if (typeof wl.http !== 'object') {
    wl.http = {}
}

(function(){
var TIMEOUT_TIME = 20

var RECONNECT_TIMES = 3

var httpclient = null
if(USE_VIRTUAL_HTTP){
    httpclient = wl.virtualhttp_create()
}
else{
    httpclient = cc.HttpClient.getInstance()
}
httpclient.setTimeoutForConnect(TIMEOUT_TIME)

httpclient.on_response = function(httpclient,response){
    var req = response.getHttpRequest()
    if(response.getResponseCode() == 200)
    {
        var obj = wl.parseJSON(response.getResponseData())
        if(typeof req.func != "undefined"){
            req.args.push(obj)
            req.func.apply(req.obj,req.args)
        }
    }
    else
    {
        
        if(req.reconnect_times > 0)
        {
            req.reconnect_times--;
            httpclient.send(req)
        }
        else
        {
            if(typeof wl.http.func_error != "undefined"){
                if(typeof wl.http.obj_error != "undefined"){
                    wl.http.func_error.apply(wl.http.obj_error,[req])
                }
                else{
                    wl.http.func_error(req)
                }
            }
            else{
                cc.log(response.getErrorBuffer())
            }
        }
    }
}

wl.http.set_error_func = function(func,obj){
    wl.http.func_error = func
    wl.http.obj_error = obj
}

wl.http.send = function(obj,func,funcobj)
{
    var msg = wl.toJSONString(obj)

    var req = new cc.HttpRequest()
    req.setRequestType(1)
    var sig = hex_md5(msg+SECRET_KEY)
    req.setUrl(SERVER+sig)
    req.setRequestData(msg,msg.length)
    req.setResponseCallback(httpclient,httpclient.on_response)
    req.reconnect_times = RECONNECT_TIMES
    if(typeof func != "undefined"){
        req.func = func
        req.obj = funcobj
        req.args = Array.prototype.slice.call(arguments, 3)
         
    }
    httpclient.send(req)
}
}());
 


