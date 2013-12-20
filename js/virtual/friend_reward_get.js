virtual_friend_reward_get = function (info) {
    var ret = {};
    ret.rc = retcode.OK;
    ret.virtualhttp = true;
    ret.reward_idx = info.reward_idx;
    ret.reward = {};
    return ret;
};