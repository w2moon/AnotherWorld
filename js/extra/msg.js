

if (typeof wl.msg !== 'object') {
    wl.msg = {}
}

(function(){

if(typeof wl.msg.header === "undefined"){
    wl.msg.header = null
}

wl.msg.init = function(header)
{
    wl.msg.header = new Object()
    wl.msg.header.userid=header.userid
    wl.msg.header.session=header.session
}

wl.msg.new = function(code)
{
    var message = new Object()
    message.code = code
    message.ver = VERSION

    var cur = new Date()
    message.time = cur.getTime()
    if(wl.msg.header != null)
    {
        message.userid = wl.msg.header.userid
        message.session = wl.msg.header.session
    }
     
    return message
}
}());