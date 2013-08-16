virtual_region_enter = function(info){
    var ret = {};

    

    var data = wl.get("role_"+info.userid);
    if(data == null){
        ret.rc = retcode.PLAYER_NOTEXIST;
    }
    else{
        ret.rc = retcode.OK;
        ret.player = wl.parseJSON(data);
    }
    
    return ret;
};