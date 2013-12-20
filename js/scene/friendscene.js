var friendscene = function () { };

friendscene.prototype.onDidLoadFromCCB = function () {
};


friendscene.prototype.onCreate = function () {
    this.bars = [];

    var con = this.boxbg.getContentSize();

    this.activefriendnum = 0;
    this.searchbar = null;

    this.conheight = con.height;
    this.scroll = wl.scroll_layer(con.width, con.height);

    this.boxbg.addChild(this.scroll);

    this.searchbar = wl.load_scene("searchbar", this, this.invite);
    this.searchbar.setPosition(this.rootNode.getContentSize().width / 2, this.conheight - 77 / 2 - 5);
    this.boxbg.addChild(this.searchbar);

    var sl = cc.Sprite.create("equip/shou.png");
    sl.setPosition(cc.p(sl.getContentSize().width / 2 - 9, con.height - sl.getContentSize().height / 2 - 3));
    this.boxbg.addChild(sl);

    var sr = cc.Sprite.create("equip/shou.png");
    sr.setPosition(cc.p(con.width - sr.getContentSize().width / 2 + 9, con.height - sl.getContentSize().height / 2 - 3));
    sr.setFlipX(true);
    this.boxbg.addChild(sr);

    this.lblnum.setString("0/" + MAX_FRIEND_NUM);
    this.editing = false;
    this.btnfb.setVisible(false);
    this.onPressList();

};

friendscene.prototype.onPressBack = function () {
    wl.run_scene("mainscene");
};

friendscene.prototype.clearObjs = function () {
    for (var i = 0; i < this.bars.length; ++i) {
        this.bars[i].removeFromParent();
    }
    this.bars = [];
};

friendscene.prototype.onPressList = function () {

    this.btnlist.selected();
    this.btnadd.unselected();
    this.btnfb.unselected();

    this.btnedit.setVisible(true);
    this.lbledit.setVisible(true);
    this.activebg.setVisible(true);

    if (this.searchbar != null) {
        this.searchbar.setVisible(false);
    }

    this.clearObjs();

    var msg = wl.msg.create("friend_list");
    wl.http.send(msg, this.on_friend_list, this);

    this.updateRewardList();
};

friendscene.prototype.updateRewardList = function () {
    var msg = wl.msg.create("friend_reward_list");
    wl.http.send(msg, this.on_friend_reward_list, this);
};

friendscene.prototype.on_friend_reward_list = function (ret) {
    var reward = parse_skill_params(ret.reward);
    if (this.rewardbtns != null) {
        for (var i = 0; i < this.rewardbtns.length; ++i) {
            this.rewardbtns[i].removeFromParent();
        }
    }
    this.rewardbtns = [];

    var x = 100;
    var y = 25;
    for (var i in reward) {
        var btn = wl.load_scene("rewardbtn", i, reward[i], this, this.onPressReward);
        btn.setPosition(x, y);
        this.activebg.addChild(btn);

        this.rewardbtns.push(btn);

        x += 98;
    }
};

friendscene.prototype.onPressReward = function (idx) {
    var msg = wl.msg.create("friend_reward_get");
    msg.reward_idx = idx;
    wl.http.send(msg, this.on_friend_reward_get, this);
};

friendscene.prototype.on_friend_reward_get = function (ret) {
    if (ret.rc != retcode.OK) {
        return;
    }
    if (ret.virtualhttp != null) {
        ret.reward = wl.addReward([this.rewardbtns[ret.reward_idx].controller.reward], 1);
    }

    this.rewardbtns[ret.reward_idx].controller.taked();
    this.rewardbtns.splice(ret.reward_idx,1);

    for (var k in ret.reward) {

        switch (k) {
            case "equipments":
                for (var sk in ret.reward[k]) {
                    wl.gvars.role.addEquip(ret.reward[k][sk]);
                }
                break;
            case "souls":
                for (var sk in ret.reward[k]) {
                    wl.gvars.role.addSoul(ret.reward[k][sk]);
                    wl.gvars.role.meet(ret.reward[k][sk].baseid);

                }
                break;
            case "blueprints":
                for (var sk in ret.reward[k]) {
                    wl.gvars.role.addBlueprint(ret.reward[k][sk]);
                }
                break;
            case "materials":

                for (var sk in ret.reward[k]) {
                    wl.gvars.role.addMaterial(sk, ret.reward[k][sk]);
                }
                break;
            case "addexp":
                // cc.log("c "+ret.reward[k] )
                if (ret.reward[k] == 0) {
                    //continue;
                }
                // if(result.virtualhttp){
                this.exppro = wl.gvars.role.addExp(ret.reward[k]);
                // }
                break;
            case "addhp":
                if (ret.reward[k] == 0) {
                    continue;
                }
                if (result.virtualhttp) {
                    wl.gvars.role.addHP(ret.reward[k]);
                }
                break;
            case "addcopper":
                if (ret.reward[k] == 0) {
                    continue;
                }
                if (ret.virtualhttp) {
                    wl.gvars.role.addCopper(ret.reward[k]);
                }
                break;
            case "addgold":
                if (ret.reward[k] == 0) {
                    continue;
                }
                if (ret.virtualhttp) {
                    wl.gvars.role.addGold(ret.reward[k]);
                }
                break;
            case "addlevel":
                if (ret.reward[k] == 0) {
                    continue;
                }
                if (result.virtualhttp) {
                    wl.gvars.role.addLevel(ret.reward[k]);
                }
                break;
            case "addextrasoulnum":
                if (ret.reward[k] == 0) {
                    continue;
                }
                if (ret.virtualhttp) {
                    wl.gvars.role.addExtraSoulNum(ret.reward[k]);
                }
                break;
            case "addextraequipmentnum":
                if (ret.reward[k] == 0) {
                    continue;
                }
                if (result.virtualhttp) {
                    wl.gvars.role.addExtraEquipmentNum(ret.reward[k]);
                }
                break;
            case "addextratravellernum":
                if (ret.reward[k] == 0) {
                    continue;
                }
                if (result.virtualhttp) {
                    wl.gvars.role.addExtraTravellerNum(ret.reward[k]);
                }
                break;
        }
    }




    if (ret.virtualhttp) {
        wl.virtual_role_save();
    }

};

friendscene.prototype.on_friend_list = function (ret) {
    wl.gvars.friends = [];


    var x = this.rootNode.getContentSize().width / 2;
    var y = this.conheight - 77 / 2 -5;

    this.bars = [];
    for (var i = 0; i < ret.friends.length; ++i) {
        var friend = new wl.role(ret.friends[i]);
        wl.gvars.friends.push(friend);


        var bar = wl.load_scene("friendbar", friend,this,this.onDelete);
        bar.setPosition(x,y);
        this.bars.push(bar);
        this.scroll.addChild(bar);

        y -= 62;
    }

    this.lblnum.setString(wl.gvars.friends.length + "/" + MAX_FRIEND_NUM);
};

friendscene.prototype.getActiveFreindNum = function () {

    var now = wl.get_time();
    if (this.last_get_num_time == now) {
        return this.last_active_num;
    }
    this.last_active_num = 0;
    for (var i = 0; i < wl.gvars.friends.length; ++i) {
        if (wl.day_distance(wl.gvars.friends[i].getLastEnterTime(), now) == 0) {
            this.last_active_num++;
        }
    }
    return this.last_active_num;
};



friendscene.prototype.onDelete = function (friend) {
    var msg = wl.msg.create("friend_delete");
    msg.role_id = friend.getId();
    wl.http.send(msg, this.on_friend_delete, this);
};

friendscene.prototype.on_friend_delete = function (ret) {
    cc.log("friend deleted");
    if (ret.rc == retcode.OK) {
        var x = this.rootNode.getContentSize().width / 2;
        var y = this.conheight - 77 / 2 - 5;

        var corrected = false;
        for (var i = 0; i < wl.gvars.friends.length; ++i) {
            cc.log(wl.gvars.friends[i].getId() +" "+ret.role_id)
            if (wl.gvars.friends[i].getId() == ret.role_id) {
                corrected = true;
                wl.gvars.friends.splice(i, 1);
                break;
            }
        }
        if (!corrected) {
            return;
        }
        for (var i = 0; i < this.bars.length; ++i) {
            if (this.bars[i].controller.friend.getId() == ret.role_id) {
                this.bars[i].removeFromParent();
                this.bars.splice(i,1);
                break;
            }
        }
        for (var i = 0; i < this.bars.length; ++i) {
            this.bars[i].setPosition(x, y);

            y -= 62;
        }
        this.lblnum.setString(wl.gvars.friends.length + "/" + MAX_FRIEND_NUM);
    }
};


friendscene.prototype.onPressEdit = function () {
    this.editing = !this.editing;
    for (var i = 0; i < this.bars.length; ++i) {
        this.bars[i].controller.btndelete.setVisible(this.editing);
        if (this.editing) {
            wl.warn_obj(this.bars[i].controller.btndelete);
        }
    }
};

friendscene.prototype.onPressAdd = function () {

    this.btnlist.unselected();
    this.btnadd.selected();
    this.btnfb.unselected();

    this.btnedit.setVisible(false);
    this.lbledit.setVisible(false);
    this.activebg.setVisible(false);

    if (this.searchbar != null) {
        this.searchbar.setVisible(true);
    }
    else {
        this.searchbar = wl.load_scene("searchbar",this,this.invite);
        this.searchbar.setPosition(this.rootNode.getContentSize().width / 2, this.conheight - 77 / 2 - 5);
        this.boxbg.addChild(this.searchbar);
    }

    this.clearObjs();


    var msg = wl.msg.create("friend_applicant_list");
    wl.http.send(msg, this.on_applicant_list, this);
};

friendscene.prototype.invite = function (friendid) {
    var msg = wl.msg.create("friend_apply");
    msg.role_id = friendid;
    wl.http.send(msg, this.on_friend_apply, this);
};

friendscene.prototype.on_friend_apply = function (ret) {
cc.log("apply")
    if (ret.rc == retcode.OK) {
        wl.popmsg(lang("FRIEND_INVITE_OK"));
    }
    else {
        wl.popmsg(lang("FRIEND_NOT_FOUND"));
    }
};

friendscene.prototype.on_applicant_list = function (ret) {
    wl.gvars.applicants = [];


    var x = this.rootNode.getContentSize().width / 2;
    var y = this.conheight - 77 / 2 - 5 -62;

    this.bars = [];
    for (var i = 0; i < ret.friends.length; ++i) {
        var friend = new wl.role(ret.friends[i]);
        wl.gvars.applicants.push(friend);


        var bar = wl.load_scene("applicantbar", friend,this,this.approve,this.refuse);
        bar.setPosition(x, y);
        this.bars.push(bar);
        this.scroll.addChild(bar);

        y -= 62;
    }

    //this.lblnum.setString(wl.gvars.friends.length + "/" + MAX_FRIEND_NUM);
};

friendscene.prototype.approve = function (applicant) {
    var msg = wl.msg.create("friend_approve");
    msg.role_id = applicant.getId();
    wl.http.send(msg, this.on_friend_approve, this);
};



friendscene.prototype.on_friend_approve = function (ret) {
    if (ret.rc == retcode.OK) {
        //wl.popmsg(lang("FRIEND_APPROVE_OK"));
        var friend = this.removeApplicant(ret.role_id);
        if (friend != null) {
        //
        }
    }
    else {

    }
};

friendscene.prototype.refuse = function (applicant) {
    var msg = wl.msg.create("friend_refuse");
    msg.role_id = applicant.getId();
    wl.http.send(msg, this.on_friend_refuse, this);
};

friendscene.prototype.on_friend_refuse = function (ret) {
    if (ret.rc == retcode.OK) {
        //wl.popmsg(lang("FRIEND_REFUSE_OK"));
        this.removeApplicant(ret.role_id);
        
    }
    else {

    }
};


friendscene.prototype.removeApplicant = function (role_id) {
    var ret = null;
    

    for (var i = 0; i < wl.gvars.applicants.length; ++i) {
        if (wl.gvars.applicants[i].getId() == role_id) {
            ret = wl.gvars.applicants[i];
            wl.gvars.applicants.splice(i, 1);
            break;
        }
    }

    for (var i = 0; i < this.bars.length; ++i) {
        if (this.bars[i].controller.friend.getId() == role_id) {
            this.bars[i].removeFromParent();
            this.bars.splice(i, 1);
            break;
        }
    }

    var x = this.rootNode.getContentSize().width / 2;
    var y = this.conheight - 77 / 2 - 5;
    for (var i = 0; i < this.bars.length; ++i) {
        this.bars[i].setPosition(x, y);

        y -= 62;
    }
    return ret;
};

friendscene.prototype.onPressFB = function () {
};