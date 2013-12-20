 var starupsoul = function(){}
 starupsoul.prototype.onDidLoadFromCCB = function () {
     this.fathercard = null;
     this.mothercard = null;
     this.isChoosingFather = true;
     this.objs = [];
     this.isFirstEnter = true;
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

     this.objlayer.addChild(this.chooseLayer, 1);

     this.maskbg.setOpacity(0);

     if (this.hasStarUpSoul()) {
         this.lbltitle.setString(lang("TXT_STARUP_BASE"));
         wl.warn_obj(this.lbltitle);
         this.show(null, ORDER_DEFAULT);
         this.animate();
     }
     else {
         this.lbltitle.setString(lang("TXT_STARUP_TITLE"));
         this.chooseLayer.setVisible(false);
         wl.popmsg(lang("TXT_STARUP_LEVELLIMIT"), this.rootNode);
     }


 };

 starupsoul.prototype.animate = function () {
     var size = this.rootNode.getContentSize();
     this.chooseLayer.setPosition(cc.p(0, -size.height * 42.3 / 100));

     this.chooseLayer.runAction(cc.MoveTo.create(0.2, cc.p(0, 0)));
 };

 starupsoul.prototype.hasStarUpSoul = function () {
     return wl.gvars.role.getCanStarUpSouls(this.race).length >= 2;
};

starupsoul.prototype.isChoosed = function(soulid){
     if(this.fathercard != null && this.fathercard.soulid == soulid){
            return true;
     }
     if(this.mothercard != null && this.mothercard.soulid == soulid){
            return true;
     }

    return false;
};

starupsoul.prototype.onChooseBase = function () {
    if (!this.hasStarUpSoul()) {

        this.lbltitle.setString(lang("TXT_STARUP_TITLE"));
        this.chooseLayer.setVisible(false);
        wl.popmsg(lang("TXT_STARUP_LEVELLIMIT"), this.rootNode);
        return;
    }
    this.isChoosingFather = true;
    this.lbltitle.setString(lang("TXT_STARUP_BASE"));
    wl.warn_obj(this.lbltitle);
    this.clearChild();
    this.show(null, SOUL_ORDER_DEFAULT, true);
};

starupsoul.prototype.onChooseSeed = function() {
    if (!this.hasStarUpSoul()) {

        this.lbltitle.setString(lang("TXT_STARUP_TITLE"));
        this.chooseLayer.setVisible(false);
        wl.popmsg(lang("TXT_STARUP_LEVELLIMIT"), this.rootNode);
        return;
    }
    this.isChoosingFather = false;
    this.lbltitle.setString(lang("TXT_STARUP_SEED"));
    wl.warn_obj(this.lbltitle);
    this.clearChild();
    this.show(null, SOUL_ORDER_DEFAULT, true);
};
starupsoul.prototype.showCombineUI = function () {
    this.chooseLayer.setVisible(false);
    this.menu.setEnabled(true);
    this.lbltitle.setString(lang("TXT_STARUP_TITLE"));
    wl.warn_obj(this.lbltitle);
}
starupsoul.prototype.onPressBack = function()
{
    if (this.chooseLayer.isVisible()) {
        
        this.showCombineUI();
    }
    else {
        wl.run_scene("mainscene");
    }
};

starupsoul.prototype.show = function (race, order, notanim)
{

    this.menu.setEnabled(false);

    this.chooseLayer.setVisible(true);

    this.chooseRace(race);
    this.chooseOrder(order, notanim);


};

starupsoul.prototype.onPressOrder = function () {
    this.chooseRace(this.race);
    this.chooseOrder((this.order + 1) % SOUL_ORDER_NUM);
};


starupsoul.prototype.chooseRace = function (race) {
    if (race != null) {
        this.race = race;
    }
    for (var k in this.objs) {
        this.objs[k].removeFromParent();
    }
    this.objs = [];
    var souls = null;
    if (!this.isChoosingFather) {
        if (this.fathercard != null) {
            souls = wl.gvars.role.getSeedSouls(this.fathercard.soulid);
        }
        else {
            this.isChoosingFather = true;
            souls = wl.gvars.role.getCanStarUpSouls(this.race);
            this.lbltitle.setString(lang("TXT_STARUP_BASE"));
            wl.warn_obj(this.lbltitle);
        }
    }
    else {
        souls = wl.gvars.role.getCanStarUpSouls(this.race);
    }

    for (var k in souls) {
        var s = wl.load_scene("soulbar", souls[k], this, this.onChoosed);
        s.id = souls[k].getId();
        if (this.fathercard != null && this.fathercard.soulid == souls[k].getId()) {
            this.fathercard.node = s.controller;
        }
        else if (this.mothercard != null && this.mothercard.soulid == souls[k].getId()) {
            this.mothercard.node = s.controller;
        }
        this.objs.push(s);
        this.scroll.addChild(s);
    }
};

var sort_soul_rarity = function (t1, t2) {
    return soulbase[t2.id].rarityclass < soulbase[t1.id].rarityclass;
};

starupsoul.prototype.chooseOrder = function (order, notanim)
{
    if(order != null){
        this.order = order;
    }

    switch(this.order){
       
       case ORDER_DEFAULT:
       break;
       case ORDER_RARITY:
            this.objs.sort(sort_soul_rarity);
       break;
       case ORDER_DEFAULT_REVERSE:
            this.objs.reverse();
       break;
       case ORDER_RARITY_REVERSE:
            this.objs.sort(sort_soul_rarity);
            this.objs.reverse();
       break;
    }

var x = this.rootNode.getContentSize().width / 2;
var y = this.conheight - 77 / 2 - 15; // this.rootNode.getContentSize().height / 2 - 90;
for (var k in this.objs) {
    if (notanim) {
        this.objs[k].setPosition(x, y);
    }
    else {
        if (k % 2 == 0) {
            this.objs[k].setPosition(x + this.rootNode.getContentSize().width, y);
        }
        else {
            this.objs[k].setPosition(x - this.rootNode.getContentSize().width, y);
        }
        this.objs[k].runAction(cc.Sequence.create(cc.DelayTime.create(0.2), cc.EaseSineOut.create(cc.MoveTo.create(0.3, cc.p(x, y)))));
    }
    y -= 77;
}
}

starupsoul.prototype.clearChild = function () {
    
};



starupsoul.prototype.onChoosed = function(soulid,n)
{
    if(this.isChoosed(soulid)){
        if (this.fathercard != null && this.fathercard.soulid == soulid) {
            this.fathercard.node.unselected();
            this.fathercard.removeFromParent();
            this.fathercard = null;
        }
        else {
            this.mothercard.node.unselected();
            this.mothercard.removeFromParent();
            this.mothercard = null;
        }
        return;
    }

    if(this.isChoosingFather){
        
        if(this.mothercard != null){
            if(wl.gvars.role.getSoul(this.mothercard.soulid).getBaseId() != wl.gvars.role.getSoul(soulid).getBaseId()){
                //wl.popmsg(lang("STARUP_NOT_SAME_SOUL"));
                //return;
                this.mothercard.node.unselected();
                this.mothercard.removeFromParent();
                this.mothercard = null;

            }
        }
        if(this.fathercard != null){
            this.fathercard.node.unselected();
            this.fathercard.removeFromParent();
        }

        var soul = wl.gvars.role.getSoul(soulid);
      // n.selected();
        this.fathercard = wl.create_soulcard(soul.getBaseId());
        this.fathercard.setPosition(this.menu.convertToWorldSpace(this.basesoul.getPosition()));
         this.fathercard.soulid = soulid;
          this.fathercard.node = n;
        this.objlayer.addChild(this.fathercard);
    }
    else{
        
        if(this.fathercard != null){
            if(wl.gvars.role.getSoul(this.fathercard.soulid).getBaseId() != wl.gvars.role.getSoul(soulid).getBaseId()){
                //wl.popmsg(lang("STARUP_NOT_SAME_SOUL"));
                // return;
                this.fathercard.node.unselected();
                this.fathercard.removeFromParent();
                this.fathercard = null;
            }
        }
        if(this.mothercard != null){
            this.mothercard.node.unselected();
            this.mothercard.removeFromParent();
        }

         var soul = wl.gvars.role.getSoul(soulid);
       // n.selected();
        this.mothercard = wl.create_soulcard(soul.getBaseId(),true);
        this.mothercard.soulid = soulid;
        this.mothercard.node = n;
        this.mothercard.setPosition(this.menu.convertToWorldSpace(this.seedsoul.getPosition()));
        this.objlayer.addChild(this.mothercard);
    }
    this.isChoosingFather = !this.isChoosingFather;
    this.menu.setEnabled(true);

    if(this.fathercard != null && this.mothercard != null){
        var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
        var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
        var rarity = rarityclass[fathersoul.getBase()['rarityclass']]

        var starupcopper = parse_action_params(rarity.starupcopper);
        var star = wl.clamp(fathersoul.star + mothersoul.star + 1,0,starupcopper.length);
        if(starupcopper[star - 1] > wl.gvars.role.getCopper()){
            
        }
        this.showCombineUI();
        this.lblcost.setString(starupcopper[star - 1]);
    }
    else if (this.isFirstEnter) {
        this.isFirstEnter = false;
        this.isChoosingFather = false;
        this.show(null, SOUL_ORDER_DEFAULT, true);
        this.lbltitle.setString(lang("TXT_STARUP_SEED"));
        wl.warn_obj(this.lbltitle);
    }
    else if (this.fathercard == null) {
        this.isChoosingFather = true;
        this.show(null, SOUL_ORDER_DEFAULT, true);
        this.lbltitle.setString(lang("TXT_STARUP_BASE"));
        wl.warn_obj(this.lbltitle);
    }
    else if (this.mothercard == null) {
        this.isChoosingFather = false;
        this.show(null, SOUL_ORDER_DEFAULT, true);
        this.lbltitle.setString(lang("TXT_STARUP_SEED"));
        wl.warn_obj(this.lbltitle);
    }
};

starupsoul.prototype.onPressConfirm = function () {

    if (this.fathercard == null || this.mothercard == null) {
        wl.popmsg(lang("TXT_STARUP_LEVELLIMIT"), this.rootNode);
        return;
    }
    var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
    var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
    var rarity = rarityclass[fathersoul.getBase()['rarityclass']]

    var starupcopper = parse_action_params(rarity.starupcopper);
    var star = wl.clamp(fathersoul.star + mothersoul.star + 1, 0, starupcopper.length);
    if (starupcopper[star - 1] > wl.gvars.role.getCopper()) {
        wl.popmsg(lang("STARTUP_NOT_ENOUGH_COPPER"));
        return;
    }

    this.menu.setEnabled(false);
    this.menutitle.setEnabled(false);
    var msg = wl.msg.create("soul_starup");
    msg.soulid1 = this.fathercard.soulid;
    msg.soulid2 = this.mothercard.soulid;
    wl.http.send(msg, this.on_soul_starup, this);
};

starupsoul.prototype.on_soul_starup = function (ret) {

    if (ret.rc != retcode.OK) {
        cc.log("starup soul fail" + ret.rc);
        this.menu.setEnabled(true);
        this.menutitle.setEnabled(true);
        return;
    }

    var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
    var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
    var rarity = rarityclass[fathersoul.getBase()['rarityclass']];

    if (fathersoul.getTravellerId() != 0 && mothersoul.getTravellerId() != 0) {
        if (mothersoul.getTravellerId() == wl.gvars.role.getHero()) {
            var traveller = wl.gvars.role.getTraveller(mothersoul.getTravellerId());
            traveller.setSoulId(ret.soul.id);

            traveller = wl.gvars.role.getTraveller(fathersoul.getTravellerId());
            traveller.setSoulId(0);
        }
        else {
            var traveller = wl.gvars.role.getTraveller(fathersoul.getTravellerId());
            traveller.setSoulId(ret.soul.id);

            traveller = wl.gvars.role.getTraveller(mothersoul.getTravellerId());
            traveller.setSoulId(0);
        }

    }
    else if (mothersoul.getTravellerId() != 0) {
        var traveller = wl.gvars.role.getTraveller(mothersoul.getTravellerId());
        traveller.setSoulId(ret.soul.id);


    }

    var starupcopper = parse_action_params(rarity.starupcopper);
    var star = wl.clamp(fathersoul.star + mothersoul.star + 1, 0, starupcopper.length);
    wl.gvars.role.subCopper(starupcopper[star - 1]);
    wl.gvars.role.deleteSoul(this.mothercard.soulid);


    this.origpro = [fathersoul.getStar(), fathersoul.getProperty("Attack"), fathersoul.getProperty("Defense"), fathersoul.getProperty("Heal"), fathersoul.getProperty("MaxHP")];
    wl.gvars.role.addSoul(ret.soul);
    this.curpro = [fathersoul.getStar(), fathersoul.getProperty("Attack"), fathersoul.getProperty("Defense"), fathersoul.getProperty("Heal"), fathersoul.getProperty("MaxHP")];
    

    var bpos = this.menu.convertToWorldSpace(this.basesoul.getPosition());
    var spos = this.menu.convertToWorldSpace(this.seedsoul.getPosition());
    wl.play_animation(this.objlayer, spos.x, spos.y, 0.03, "anim/bomb/;1;14");
    wl.play_animation_delay(this.objlayer, 0.5, bpos.x, bpos.y, 0.05, "anim/levelup2/;1;14").setScale(2);

    this.mothercard.removeFromParent();
    this.mothercard = null;

    wl.fade(this.fathercard, 0.3, 255, 0, this.starupFadeOut, this);

};

starupsoul.prototype.starupFadeOut = function () {
    wl.fade(this.fathercard, 0.3, 0, 255, this.starupFadeIn, this);
}

starupsoul.prototype.starupFadeIn = function () {
    this.probox = wl.load_scene("prochange", this.origpro, this.curpro);
    var pos = this.menu.convertToWorldSpace(this.seedsoul.getPosition());
    pos.x -= 10;
    this.probox.setPosition(cc.p(pos.x - 100, pos.y));
    this.objlayer.addChild(this.probox);

    wl.fade(this.probox, 0.5, 0, 255);
    this.probox.runAction(cc.EaseIn.create(cc.MoveTo.create(0.5, pos), 0.4));

    wl.wait_touch(this.onFinish, this);

    this.maskbg.setOpacity(200);


}

starupsoul.prototype.onFinish = function () {
    this.menu.setEnabled(true);
    this.menutitle.setEnabled(true);

    this.probox.removeFromParent();
    this.probox = null;

    this.maskbg.setOpacity(0);
};