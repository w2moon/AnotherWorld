virtual_friend_applicant_list = function (info) {
    var ret = {};
    ret.rc = retcode.OK;
    ret.friends = [];
    for (var i = 0; i < 7; ++i) {
        ret.friends.push(wl.empty_role("searched" + i, "searched" + i));
    }
    

    return ret;
};