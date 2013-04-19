var msg = new Object()
msg.header = null

msg.init = function(header)
{
    msg.header = new Object()
    msg.header.userid=header.userid
    msg.header.session=header.session
}

msg.new = function(code)
{
    var message = new Object()
    message.code = code

    if(msg.header != null)
    {
        message.userid = msg.header.userid
        message.session = msg.header.session
    }
     
    return message
}