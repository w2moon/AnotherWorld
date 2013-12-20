var rewardbtn = function(){};

rewardbtn.prototype.onDidLoadFromCCB = function () {
};

rewardbtn.prototype.onCreate = function (idx, reward, obj, objfunc) {
    this.reward = reward;
    this.idx = idx;
    this.obj = obj;
    this.objfunc = objfunc;

    var num = this.obj.getActiveFreindNum();
    if (num > this.reward[0]) {
        num = this.reward[0];
        this.greenbg.setVisible(true);
        this.redbg.setVisible(false);
    }
    else {
        this.greenbg.setVisible(false);
        this.redbg.setVisible(true);
    }
    this.lbltxt.setString(num + "/" + this.reward[0]);

    var img = null;
    var text = "";
    switch (this.reward[1]) {
        case "addExp":
            img = "mainscene/MM_level_star.png";
            text = "" + this.reward[2];
            break;
        case "lotteryPool":
            img = "mainscene/MM_level_star.png";
            break;
        case "addGold":
            img = "mainscene/MM_diamond.png";
            text = "" + this.reward[2];
            break;
        case "addCopper":
            img = "mainscene/MM_makalong.png";
            text = "" + this.reward[2];
            break;
        case "addEquip":
            img = equipmentbase[this.reward[2]].icon;
            break;
        case "addSoul":
            img = soulbase[this.reward[2]].icon;
            break;
        case "addBlueprint":
            img = blueprint[this.reward[2]].icon;
            break;
        case "addMaterial":
            img = material[this.reward[2]].icon;
            text = "x" + this.reward[3];
            break;
        default:
            cc.log("reward error type:" + this.reward[1]);
            return;
            break;
    }

    if (img != null) {
        var spr = cc.Sprite.create(img);
        if (spr.getContentSize().width >= this.icon.getContentSize().width) {
            wl.set_texture(this.icon, img);
        }
        else {

            spr.setPosition(this.icon.getPosition());
            this.icon.removeFromParent();
            this.objlayer.addChild(spr);
            this.icon = spr;
        }


        //this.lbldesc.setString(text);
        //this.lbldesc.setVisible(false);
        if (text != "") {
            this.lblnum.setString(text);
        }
        else {
            this.spnum.setVisible(false);
        }
    }

};

rewardbtn.prototype.onPress = function (n) {
    this.objfunc.apply(this.obj,[this.idx]);
};

rewardbtn.prototype.taked = function () {
    wl.warn_obj(this.icon);
    wl.fade_delay(this.rootNode, 0.2, 0.3, 255, 0,this.rootNode.removeFromParent,this.rootNode);
};