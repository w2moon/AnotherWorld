virtual_role_create = function(info){
    var ret = {}
    

    if(wl.get("role_"+info.userid) != null){
        ret.rc = retcode.PLAYER_EXIST;
    }
    else{
        ret.rc = retcode.OK;
        ret.player = wl.empty_role(info.name,info.userid);
        wl.set("role_"+info.userid,wl.toJSONString(ret.player))
        
    }

    return ret;
};