virtual_login = function(info){
    ret = {};
    if(wl.get("user_pwd_"+info.userid) != info.pwd){
        ret.rc = retcode.PWD_ERROR;
        return ret;
    }
    ret.rc = retcode.OK;
    ret.region = "region1";
    ret.session = wl.sysrand();

     
    ret.id = wl.get("user_id_"+info.userid,""+wl.sysrand())
    ret.userid = info.userid;

    return ret;
}