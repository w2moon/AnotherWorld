
cc.log(typeof wl.http)


if(USE_VIRTUAL_HTTP){
    wl.http = wl.virtualhttp_create()
}
else
{
    wl.http = {}
(function(){
var TIMEOUT_TIME = 20

var RECONNECT_TIMES = 3

var SERVER = ""

var httpclient = httpclient || null
 cc.log(USE_VIRTUAL_HTTP)

httpclient = cc.HttpClient.getInstance()

httpclient.setTimeoutForConnect(TIMEOUT_TIME)

wl.http.on_error = function(res){
    var req = res.getHttpRequest()
      if(typeof wl.http.func_error != "undefined"){
                if(typeof wl.http.obj_error != "undefined"){
                    wl.http.func_error.apply(wl.http.obj_error,[req])
                }
                else{
                    wl.http.func_error(req)
                }
            }
            else{
                
                cc.log(res.getResponseCode()+":"+res.getErrorBuffer())
                
            }
}

wl.http.on_response = function(hc,response){
    var req = response.getHttpRequest()
    if(response.getResponseCode() == 200)
    {
        var obj = wl.parseJSON(response.getResponseData())
        if(obj.rc != 0){
            cc.log("http error:"+obj.rc)
        }
        if(typeof req.func != "undefined"){
            req.args.push(obj)
            req.func.apply(req.obj,req.args)
        }
        else{
            cc.log("net handler function not be defined")
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
            wl.http.on_error(response)
        }
    }
}

wl.http.set_error_func = function(func,obj){
    wl.http.func_error = func
    wl.http.obj_error = obj
}

wl.http.set_server = function(s){
    SERVER = s
}

wl.http.send = function(obj,func,funcobj)
{
    if(SERVER == ""){
        cc.log("not set server")
        return
    }
    var msg = wl.toJSONString(obj)

    var req = new cc.HttpRequest()
    req.setRequestType(1)
    var sig = hex_md5(msg+SECRET_KEY)
   
    req.setUrl(SERVER+sig)
    req.setRequestData(msg,msg.length)
    req.setResponseCallback(wl.http,wl.http.on_response)
    req.reconnect_times = RECONNECT_TIMES
    if(typeof func != "undefined"){
        req.func = func
        req.obj = funcobj
        req.args = Array.prototype.slice.call(arguments, 3)
         
    }
    cc.log(SERVER+sig)
    cc.log(msg)
    httpclient.send(req)
}
}());
}


