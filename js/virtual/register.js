virtual_register = function(info){
    ret = {};
    ret.rc = retcode.OK;
    ret.userid = info.userid;
    ret.pwd = info.pwd;

    wl.set("user_pwd_"+info.userid,info.pwd)
    wl.set("user_id_"+info.userid,""+wl.sysrand())
    return ret;

};