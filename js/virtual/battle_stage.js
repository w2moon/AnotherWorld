virtual_battle_stage = function(info){
    var ret = {};
    var role = wl.parseJSON(wl.get("role_"+info.userid));

    ret.rc = retcode.BATTLE_RESULT_WIN;
    ret.virtualhttp = true;
    ret.level = info.level;
    ret.stage_id = info.stage_id;
    ret.submap = info.submap;
    ret.reward = {};
    wl.set("role_"+info.userid,wl.toJSONString(role));
    return ret;
};