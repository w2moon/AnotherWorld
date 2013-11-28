virtual_friend_applicant_list = function (info) {
    var ret = {};
    ret.rc = retcode.OK;
    ret.friends = [];
    ret.friends.push(wl.empty_role("searched", "searched"));

    return ret;
};