virtual_equip_enhence = function(info){
    var ret = {};
    var role = wl.parseJSON(wl.get("role_"+info.userid));

    wl.set("role_"+info.userid,wl.toJSONString(role));
    return ret;
};