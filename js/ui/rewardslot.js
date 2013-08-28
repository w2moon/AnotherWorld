var rewardslot = function(){};

rewardslot.prototype.onDidLoadFromCCB = function(){
};

rewardslot.prototype.onCreate = function(type,value){
    var img = null;
    var text = "";
    switch(type)
        {
        case "addExp":
            img = "mainscene/MM_level_star.png";
             text = ""+value;
        break;
        case "lotteryPool":
            img = "mainscene/MM_level_star.png";
            text = lang("WORLD_LOTTERY");
        break;
        case "addGold":
            img = "mainscene/MM_diamond.png";
             text = ""+value;
        break;
        case "addCopper":
            img = "mainscene/MM_makalong.png";
            text = ""+value;
        break;
        case "addEquip":
            img = equipmentbase[value].icon;
            text = lang(equipmentbase[value].name);
        break;
        case "addSoul":
            img = soulbase[value].icon;
            text = lang(soulbase[value].name);
        break;
        default:
            cc.log("reward error type:"+type);
            return;
        break;
        }

    if(img != null){
        var spr = cc.Sprite.create(img);
        spr.setPosition(this.bg.getPosition());
        this.rootNode.addChild(spr);

        this.lbldesc.setString(text);
        this.lbldesc.setVisible(false);
    }
};