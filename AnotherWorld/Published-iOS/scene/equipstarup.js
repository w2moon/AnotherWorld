 
 var equipstarup = function(){}
 equipstarup.prototype.onDidLoadFromCCB = function () {
     this.target = null;
     this.selected = [];

     this.objs = [];


     var size = this.rootNode.getContentSize();
     var center = cc.p(size.width / 2, size.height * 42.3 / 100);

     var spr = cc.Sprite.create("equip/bg_equipment1.png");
     var con = spr.getContentSize();

     spr.setPosition(center);

     this.chooseLayer = cc.Layer.create();
     this.chooseLayer.addChild(spr);

     this.conheight = con.height;
     this.scroll = wl.scroll_layer(con.width, con.height);

     this.chooseLayer.addChild(this.scroll);



     var sl = cc.Sprite.create("equip/shou.png");
     sl.setPosition(cc.p(sl.getContentSize().width / 2 - 9, con.height - sl.getContentSize().height / 2 - 3));
     this.chooseLayer.addChild(sl);

     var sr = cc.Sprite.create("equip/shou.png");
     sr.setPosition(cc.p(con.width - sr.getContentSize().width / 2 + 9, con.height - sl.getContentSize().height / 2 - 3));
     sr.setFlipX(true);
     this.chooseLayer.addChild(sr);

     this.rootNode.addChild(this.chooseLayer, 1);

     this.lblchooseend.setVisible(false);
     this.btnchooseend.setVisible(false);

     this.lblok.setString(lang("TXT_ENHENCE_START"));

     

 };

 equipstarup.prototype.showTitleNormal = function () {
     this.lbltitle.setString(lang("TXT_ENHENCE_TITLE"));
     wl.warn_obj(this.lbltitle);
 };

 equipstarup.prototype.showTitleTarget = function () {
     this.lbltitle.setString(lang("TXT_ENHENCE_TARGET"));
     wl.warn_obj(this.lbltitle);
 };

 equipstarup.prototype.showTitleChoose = function () {
     this.lbltitle.setString(lang("TXT_ENHENCE_CHOOSE"));
     wl.warn_obj(this.lbltitle);
 };

equipstarup.prototype.onCreate = function(equipid)
{
    if(equipid == null){
        this.showtarget();
    }
    else{
        this.onChooseTarget(equipid);
        this.showall();
    }
};

equipstarup.prototype.onPressBack = function()
{
    wl.run_scene("mainscene");
};

equipstarup.prototype.clearObjs = function(){
     for(var k in this.objs){
        this.objs[k].removeFromParent();
    }
    this.objs = [];
};

equipstarup.prototype.clearSelected = function () {
    for (var k in this.selected) {
        this.selected[k].removeFromParent();
    }
    this.selected = [];
};

equipstarup.prototype.selecttype = function (type) {
    this.bluetype = type;
    var blueprints = wl.gvars.role.getBlueprints(type);
    for (var k in this.blueprints) {
        this.blueprints.removeFromParent();
    }
    this.blueprints = [];

    for (var k in blueprints) {
        var s = wl.load_scene("bluebar", this, blueprints[k]);
        s.id = blueprints[k];
        this.scroll.addChild(s);
        this.blueprints.push(s);

    }
};

equipstarup.prototype.showtarget = function () {

    this.clearObjs();
    this.showTitleTarget();
    this.chooseLayer.setVisible(true);
    var equips = wl.gvars.role.getObjects();


    var x = this.rootNode.getContentSize().width / 2;
    var y = this.conheight - 77 / 2 - 10;
    for (var k in equips) {
        var equip = wl.load_scene("selectbar", equips[k], this, this.onChooseTarget);
        equip.setPosition(x, y);
        equip.controller.check.setVisible(false);
        equip.controller.checkbox.setVisible(false);
        this.scroll.addChild(equip);

        this.objs.push(equip);

        y -= 70;
    }
};

equipstarup.prototype.showall = function () {
    this.clearObjs();
    this.chooseLayer.setVisible(true);
    this.showTitleChoose();
    this.lblchooseend.setVisible(true);
    this.btnchooseend.setVisible(true);

    //this.selected = [];
    var equips = wl.gvars.role.getObjects();


    var x = this.rootNode.getContentSize().width / 2;
    var y = this.conheight - 77 / 2 - 10;
    for (var k in equips) {
        if (equips[k].getId() == this.target.id) {
            continue;
        }
        var equip = wl.load_scene("selectbar", equips[k], this, this.onChooseSelect);
        equip.setPosition(x, y);
        this.scroll.addChild(equip);

        this.objs.push(equip);

        y -= 70;
    }

    this.redrawSelect();
};

equipstarup.prototype.updateTarget = function(){
    this.lbllevel.setString("LV"+this.target.equip.getLevel());
    this.lblexp.setString(this.target.equip.getExp()+"/"+this.target.equip.getMaxExp());
};

equipstarup.prototype.onChooseTarget = function(e)
{
    if(!this.canBeTarget(e)){
        wl.popmsg(lang("ENHENCE_CANNOT_BE_TARGET"));
        return;
    }
    if(this.target != null){
        this.target.removeFromParent();
    }


    var equip = cc.Sprite.create(wl.gvars.role.getEquipment(e).getBase().icon);
    equip.equip = wl.gvars.role.getEquipment(e);
    equip.id = e;
    
    equip.setPosition(this.menu.convertToWorldSpace(this.btnequip.getPosition()));
    this.rootNode.addChild(equip);
    this.target = equip;

    this.updateTarget();

    this.showall();
};




equipstarup.prototype.canBeTarget = function(e)
{
    for(var k in this.selected ){
        if(this.selected[k].id == e){
            return false;
        }
    }
    return true;
}
equipstarup.prototype.canBeSelect = function(e)
{
   
    for(var k in this.selected ){
        if(this.selected[k].id == e){
            return false;
        }
    }
    return true;
}

equipstarup.prototype.onChooseSelect = function (e) {
    if (e == this.target.id) {
        return;
    }
    if (this.canBeSelect(e)) {
        var n = cc.Sprite.create(wl.gvars.role.getEquipment(e).getBase().icon);
        this.rootNode.addChild(n);
        n.id = e;
        
        this.selected.push(n);

        this.redrawSelect();
    }
    else {

        for (var k in this.selected) {
            if (this.selected[k].id == e) {
                this.selected[k].removeFromParent();
                this.selected.splice(k, 1);
                break;
            }
        }
        this.redrawSelect();
    }


};

equipstarup.prototype.onChooseEnd = function () {
    this.chooseLayer.setVisible(false);
    this.lblchooseend.setVisible(false);
    this.btnchooseend.setVisible(false);

    this.showTitleNormal();
};

equipstarup.prototype.redrawSelect = function () {
    var copper = 0;
    var totalexp = 0;

    for (var k in this.selected) {
        var e = wl.gvars.role.getEquipment(this.selected[k].id);
        var rarity = rarityclass[e.getBase().rarityclass];
        copper += rarity.enhencecopper;
        totalexp += rarityclass.enhenceexp;

        var idx = wl.tonumber(k) + 1;
        if (idx > 5) {
            continue;
        }

        this.selected[k].setPosition(this.menubox.convertToWorldSpace(this["btnbox" + idx].getPosition()));
    }

    if (this.objs[0] != null && this.objs[0].controller.invalidmask != null) {
        if (this.selected.length >= ENHENCE_MAX_NUM) {
            for (var i in this.objs) {
                if (this.canBeSelect(this.objs[i].controller.equip.getId())) {
                    this.objs[i].controller.invalidmask.setVisible(true);
                    this.objs[i].controller.btncheck.setEnabled(false);
                }
                else {
                    this.objs[i].controller.invalidmask.setVisible(false);
                    this.objs[i].controller.btncheck.setEnabled(true);
                }
            }
        }
        else {
            for (var i in this.objs) {
                this.objs[i].controller.invalidmask.setVisible(false);
                this.objs[i].controller.btncheck.setEnabled(true);
            }
        }
    }

    this.lblcost.setString(copper);
    this.lbltotalexp.setString(totalexp);

    if (this.target != null) {
        this.lblname.setString(lang(this.target.equip.getBase().name));

        if (this.selected.length > 0) {
            var newequip = this.target.equip.copy();
            newequip.addExp(totalexp);
            this.lblatk.setString(this.target.equip.getProperty("Attack") + "->" + newequip.getProperty("Attack"));
            this.lbldef.setString(this.target.equip.getProperty("Defense") + "->" + newequip.getProperty("Defense"));
            this.lblheal.setString(this.target.equip.getProperty("Heal") + "->" + newequip.getProperty("Heal"));
            this.lblhp.setString(this.target.equip.getProperty("MaxHP") + "->" + newequip.getProperty("MaxHP"));
        }
        else {
            this.lblatk.setString(this.target.equip.getProperty("Attack"));
            this.lbldef.setString(this.target.equip.getProperty("Defense"));
            this.lblheal.setString(this.target.equip.getProperty("Heal"));
            this.lblhp.setString(this.target.equip.getProperty("MaxHP"));
        }

    }
};

equipstarup.prototype.onPressEquip = function () {
    this.clearSelected();
    this.showtarget();
    
};

equipstarup.prototype.onPressBox = function (n) {
    var idx = n.getTag() - 1;
    if (this.selected[idx] == null) {
   
        this.showall();
    }
    else {
        this.selected[idx].removeFromParent();
        this.selected.splice(idx, 1);
        this.showall();
    }
};

equipstarup.prototype.onPressEnhence = function()
{
    if(this.target == null){
        wl.popmsg(lang("ENHENCE_TARGET_NOT_SELECT"));
        return;
    }
    if(this.selected.length == 0){
        wl.popmsg(lang("ENHENCE_SELECT_NOT_SELECT"));
        return;
    }

     var target = wl.gvars.role.getEquipment(this.target.id);
    if( target.getLevel() >=target.getMaxLevel()){
        wl.popmsg(lang("ENHENCE_ALREADY_MAX_LEVEL"));
        return;
    }

    var copper = 0;
    var totalexp = 0;

    for(var k in this.selected){
        var e = wl.gvars.role.getEquipment(this.selected[k].id);
        if(e == null){
             wl.popmsg(lang("EQUIP_NOTEXIST"));
            return;
        }

        var rarity = rarityclass[e.getBase().rarityclass];
        copper += rarity.enhencecopper;
        totalexp += rarityclass.enhenceexp;
    }

    if(wl.gvars.role.getCopper() < copper){
        wl.popmsg(lang("ENHENCE_NOT_ENOUGH_COPPER"));
        return;
    }

     var msg = wl.msg.create("equip_enhence");
     msg.equip = this.target.id;

     cc.log("enhence "+msg.equip)
     msg.consume = [];
     for(var k in this.selected){
        msg.consume.push(this.selected[k].id);
     }
     wl.http.send(msg,this.on_equip_enhence,this);
};

equipstarup.prototype.on_equip_enhence = function (ret) {
    if (ret.rc != retcode.OK) {
        cc.log("enhence fail:" + ret.rc);
        return;
    }

    var copper = 0;

    var cpos = this.target.getPosition();

    for (var k in this.selected) {
        var e = wl.gvars.role.getEquipment(this.selected[k].id);

        var rarity = rarityclass[e.getBase().rarityclass];
        copper += rarity.enhencecopper;

        wl.gvars.role.deleteEquip(this.selected[k].id);
        
        wl.fade(this.selected[k], 0.3, 255, 0);
        var pos = this.selected[k].getPosition();
        var anim = wl.play_animation(this.rootNode, pos.x, pos.y, 0.03, "anim/bomb/;1;14");
        anim.runAction(cc.MoveTo.create(0.4, cpos));
    }
    
    wl.gvars.role.subCopper(copper);
    wl.gvars.role.addEquip(ret.equip);

    this.lblcost.setString(0);
    this.lbltotalexp.setString(0);

    wl.fade(this.target, 0.3, 255, 0, this.starupFadeOut, this);
    wl.play_animation_delay(this.rootNode, 0.5, cpos.x, cpos.y, 0.05, "anim/levelup2/;1;14").setScale(2);

};

equipstarup.prototype.starupFadeOut = function () {
    wl.fade(this.target, 0.3, 0, 255, this.starupFadeIn, this);
};

equipstarup.prototype.starupFadeIn = function () {
    for (var k in this.selected) {
        this.selected[k].removeFromParent();
    }
    this.selected = [];

    this.lblatk.setString(this.target.equip.getProperty("Attack"));
    this.lbldef.setString(this.target.equip.getProperty("Defense"));
    this.lblheal.setString(this.target.equip.getProperty("Heal"));
    this.lblhp.setString(this.target.equip.getProperty("MaxHP"));

    wl.warn_obj(this.lblatk);
    wl.warn_obj(this.lbldef);
    wl.warn_obj(this.lblheal);
    wl.warn_obj(this.lblhp);
};