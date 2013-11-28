 var combinesoul = function(){}


 var SOUL_ORDER_DEFAULT = 0;
 var SOUL_ORDER_RARITY = 1;
 var SOUL_ORDER_DEFAULT_REVERSE = 2;
 var SOUL_ORDER_RARITY_REVERSE = 3;
  var SOUL_ORDER_NUM = 4;

  combinesoul.prototype.onDidLoadFromCCB = function () {

      this.fathercard = null;
      this.mothercard = null;
      this.childcard = null;
      this.objs = [];
      this.isChoosingFather = true;
     
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

      this.rootNode.addChild(this.chooseLayer, 1);

      this.lblcost.setString(0);
      this.lblhas.setString(wl.gvars.role.getCopper());

      if (wl.gvars.role.getSoulNum() < 2) {
          this.lbltitle.setString(lang("TXT_COMBINE_TITLE"));
          wl.popmsg(lang("TXT_COMBINE_NUM"), this.rootNode);
          this.chooseLayer.setVisible(false);
      }
      else {
          this.lbltitle.setString(lang("TXT_CHOOSE_FATHER"));
          wl.warn_obj(this.lbltitle);
          this.show(null, SOUL_ORDER_DEFAULT);
          this.animate();
      }



  };

combinesoul.prototype.animate = function()
{
    var size = this.rootNode.getContentSize();
    this.chooseLayer.setPosition(cc.p(0,-size.height*42.3/100));
    
    this.chooseLayer.runAction(cc.MoveTo.create(0.2,cc.p(0,0)));
};

combinesoul.prototype.onPressFather = function()
{
    this.isChoosingFather = true;
    this.lbltitle.setString(lang("TXT_CHOOSE_FATHER"));
    wl.warn_obj(this.lbltitle);
    this.clearChild();
    this.show(null, SOUL_ORDER_DEFAULT, true);
};

combinesoul.prototype.onPressMother = function()
{
    this.isChoosingFather = false;
    this.lbltitle.setString(lang("TXT_CHOOSE_MOTHER"));
    wl.warn_obj(this.lbltitle);
    this.clearChild();
    this.show(null, SOUL_ORDER_DEFAULT, true);
};

combinesoul.prototype.show = function (race, order, notanim) {
    this.menu.setEnabled(false);

    this.chooseLayer.setVisible(true);
    this.chooseRace(race);
    this.chooseOrder(order, notanim);

};

combinesoul.prototype.onPressOrder = function()
{
    this.chooseRace(this.race);
    this.chooseOrder((this.order+1)%SOUL_ORDER_NUM);
};

combinesoul.prototype.chooseRace = function (race) {
    if (race != null) {
        this.race = race;
    }
    for (var k in this.objs) {
        this.objs[k].removeFromParent();
    }
    this.objs = [];
    var souls = wl.gvars.role.getSouls(this.race);
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

var sort_soul_rarity = function(t1,t2){
    return  soulbase[t2.id].rarityclass<soulbase[t1.id].rarityclass;
};


combinesoul.prototype.chooseOrder = function (order, notanim) {
    if (order != null) {
        this.order = order;
    }

    switch (this.order) {

        case SOUL_ORDER_DEFAULT:
            break;
        case SOUL_ORDER_RARITY:
            this.objs.sort(sort_soul_rarity);
            break;
        case SOUL_ORDER_DEFAULT_REVERSE:
            this.objs.reverse();
            break;
        case SOUL_ORDER_RARITY_REVERSE:
            this.objs.sort(sort_soul_rarity);
            this.objs.reverse();
            break;
    }

    var x = this.rootNode.getContentSize().width / 2;
    var y = this.conheight-77/2-15;// this.rootNode.getContentSize().height / 2 - 90;
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
combinesoul.prototype.clearChild = function(){
    if(this.childcard != null){
        this.childcard.removeFromChild();
        this.childcard = null;
    }
};

combinesoul.prototype.isChoosed = function(soulid){
     if(this.fathercard != null && this.fathercard.soulid == soulid){
            return true;
     }
     if(this.mothercard != null && this.mothercard.soulid == soulid){
            return true;
     }

    return false;
};

combinesoul.prototype.onChoosed = function (soulid, n) {
    if (this.isChoosed(soulid)) {
        // wl.popmsg(lang("COMBINESOUL_CANNOT_USE_SAME_SOULID"));
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
    if (this.isChoosingFather) {
        if (this.fathercard != null) {
            this.fathercard.node.unselected();
            this.fathercard.removeFromParent();
        }

        var soul = wl.gvars.role.getSoul(soulid);
        //   n.selected();
        this.fathercard = wl.create_soulcard(soul.getBaseId());
        var pos = this.father.getPosition();
        pos.x += 5;
        pos.y += 30;
        this.fathercard.setPosition(pos);
        this.fathercard.soulid = soulid;
        this.fathercard.node = n;
        this.rootNode.addChild(this.fathercard);
    }
    else {
        if (this.mothercard != null) {
            this.mothercard.node.unselected();
            this.mothercard.removeFromParent();
        }

        var soul = wl.gvars.role.getSoul(soulid);
        //  n.selected();
        this.mothercard = wl.create_soulcard(soul.getBaseId(), true);
        this.mothercard.soulid = soulid;
        this.mothercard.node = n;
        var pos = this.mother.getPosition();
        pos.x += 5;
        pos.y += 30;
        this.mothercard.setPosition(pos);
        this.rootNode.addChild(this.mothercard);

    }
    this.isChoosingFather = !this.isChoosingFather;

    //this.chooseLayer.setVisible(false);
    this.menu.setEnabled(true);
    if (this.fathercard != null && this.mothercard != null) {
        var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
        var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
        var bid = wl.get_combineid(fathersoul.getBaseId(), mothersoul.getBaseId());
        if (soulbase[bid] == null) {
            cc.log("combine error : " + fathersoul.getBaseId() + " " + mothersoul.getBaseId());
        }
        var rarity = rarityclass[soulbase[bid]['rarityclass']]

        this.lblcost.setString(rarity['combinecopper']);
        //this.lblmutation.setString(rarity['mutation']);

        
        this.showCombineUI();
        if (wl.gvars.role.isMeeted(bid)) {
        }
        else {
        }
    }
    else if (this.isFirstEnter) {
        this.isFirstEnter = false;
        this.isChoosingFather = false;
        this.show(null, SOUL_ORDER_DEFAULT, true);
        this.lbltitle.setString(lang("TXT_CHOOSE_MOTHER"));
        wl.warn_obj(this.lbltitle);
    }
    else if (this.fathercard == null) {
        this.isChoosingFather = true;
        this.show(null, SOUL_ORDER_DEFAULT, true);
        this.lbltitle.setString(lang("TXT_CHOOSE_FATHER"));
        wl.warn_obj(this.lbltitle);
    }
    else if (this.mothercard == null) {
        this.isChoosingFather = false;
        this.show(null, SOUL_ORDER_DEFAULT, true);
        this.lbltitle.setString(lang("TXT_CHOOSE_MOTHER"));
        wl.warn_obj(this.lbltitle);
    }

};



combinesoul.prototype.onPressChild = function()
{
    cc.log("show child");
};

combinesoul.prototype.onPressBack = function () {
    if (this.chooseLayer.isVisible()) {
        // this.chooseLayer.setVisible(false);
        //this.lbltitle.setString(lang("TXT_COMBINE_TITLE"));
        // wl.warn_obj(this.lbltitle);
        // this.menu.setEnabled(true);
        this.showCombineUI();
    }
    else {
        wl.run_scene("mainscene");
    }
};

combinesoul.prototype.onPressCombine = function () {
    if (this.fathercard == null || this.mothercard == null) {
        wl.popmsg(lang("COMBINE_NOT_CHOOSE_PARENT"));
        return;
    }
    var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
    var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
    var bid = wl.get_combineid(fathersoul.getBaseId(), mothersoul.getBaseId());
    var rarity = rarityclass[soulbase[bid]['rarityclass']]

    if (wl.gvars.role.getCopper() < rarity['combinecopper']) {
        wl.popmsg(lang("COMBINE_NOT_ENOUGH_COPPER"));
        return;
    }

    var msg = wl.msg.create("soul_combine");
    msg.soulid1 = this.fathercard.soulid;
    msg.soulid2 = this.mothercard.soulid;
    wl.http.send(msg, this.on_soul_combine, this);

    this.menu.setEnabled(false);
    this.menutitle.setEnabled(false);

};

 combinesoul.prototype.showCombineUI = function () {
     this.chooseLayer.setVisible(false);
     this.menu.setEnabled(true);
     this.lbltitle.setString(lang("TXT_COMBINE_TITLE"));
      wl.warn_obj(this.lbltitle);
 }

 combinesoul.prototype.on_soul_combine = function (ret) {
     if (ret.rc != retcode.OK) {
         wl.popmsg(lang("COMBINE_FAIL"));
         cc.log(ret.rc);
         return;
     }

     var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
     var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
     var bid = wl.get_combineid(fathersoul.getBaseId(), mothersoul.getBaseId());
     var rarity = rarityclass[soulbase[bid]['rarityclass']]

     wl.gvars.role.subCopper(rarity['combinecopper']);

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
     else if (fathersoul.getTravellerId() != 0) {
         var traveller = wl.gvars.role.getTraveller(fathersoul.getTravellerId());
         traveller.setSoulId(ret.soul.id);


     }
     else (mothersoul.getTravellerId() != 0)
     {
         var traveller = wl.gvars.role.getTraveller(mothersoul.getTravellerId());
         if (traveller != null) {
             traveller.setSoulId(ret.soul.id);
         }
         else {
             cc.log("t m null")
         }
         cc.log("ggggg")

     }

     wl.gvars.role.deleteSoul(this.fathercard.soulid);
     wl.gvars.role.deleteSoul(this.mothercard.soulid);

     if (ret.soul.baseid != bid) {
         //mutaition
     }

     wl.gvars.role.addSoul(ret.soul);


     wl.play_animation(this.rootNode, this.father.getPosition().x, this.father.getPosition().y + 40, 0.075, "anim/combo4/;1;16").setScale(2); ;
     var tmp = wl.play_animation(this.rootNode, this.father.getPosition().x, this.father.getPosition().y + 40, 0.03, "anim/combo1/;1;21");
     tmp.setRotation(90);
     tmp.setScale(2);
     wl.play_animation(this.rootNode, this.mother.getPosition().x, this.mother.getPosition().y + 40, 0.075, "anim/combo4/;1;16").setScale(2);
     tmp = wl.play_animation(this.rootNode, this.mother.getPosition().x, this.mother.getPosition().y + 40, 0.03, "anim/combo1/;1;21");
     tmp.setRotation(90);
     tmp.setScale(2);

     wl.fade(this.fathercard, 0.4, 255, 0, this.combineParentEnd,this);
     wl.fade(this.mothercard, 0.4, 255, 0, this.combineParentEnd,this);

     this.animnum = 2;

     if (this.childcard != null) {
         this.childcard.removeFromParent();
         this.childcard = null;
     }

     this.child.setVisible(false);
     this.btnok.setVisible(false);
     this.lblcombine.setVisible(false);
     var soul = wl.gvars.role.getSoul(ret.soul.id);
     wl.gvars.role.meet(soul.getBaseId());

     this.childcard = wl.create_soulcard(soul.getBaseId());
     this.childcard.soulid = ret.soul.id;
     var pos = this.child.getPosition();
     pos.y -= 40;
     this.childcard.setPosition(pos);
     this.rootNode.addChild(this.childcard);

     this.childcard.setVisible(false);


     //    this.show(null,ORDER_DEFAULT);

 };

 combinesoul.prototype.combineParentEnd = function () {
     this.animnum--;
     cc.log(this.animnum)
     if (this.animnum > 0) {
         return;
     }
     cc.log("animnum")
     this.fathercard.removeFromParent();
     this.fathercard = null;

     this.mothercard.removeFromParent();
     this.mothercard = null;

     wl.shake(10, 10, 0.8,10, this.rootNode)

     this.childcard.setVisible(true);
     wl.foreach_call(this.childcard, "setOpacity", 0);
     wl.fade_delay(this.childcard,0.8, 0.3, 0, 255, this.combineChildEnd,this);
     
     wl.play_animation_delay(this.rootNode, 0.5, this.child.getPosition().x, this.child.getPosition().y + 150, 0.05, "anim/combo2/;1;13").setScale(5);

     wl.play_animation_delay(this.rootNode, 0.5 * wl.sysrand(), this.child.getPosition().x + 100, this.child.getPosition().y + 70, 0.05, "anim/combo2/;1;13").setScale(2);
     wl.play_animation_delay(this.rootNode, 0.5 * wl.sysrand(), this.child.getPosition().x - 100, this.child.getPosition().y + 70, 0.05, "anim/combo2/;1;13").setScale(2);
     wl.play_animation_delay(this.rootNode, 0.5 * wl.sysrand(), this.child.getPosition().x, this.child.getPosition().y - 20, 0.05, "anim/combo2/;1;13").setScale(2);
     wl.play_animation_delay(this.rootNode, 0.5 * wl.sysrand(), this.child.getPosition().x + 140, this.child.getPosition().y + 10, 0.05, "anim/combo2/;1;13").setScale(2);
     wl.play_animation_delay(this.rootNode, 0.5 * wl.sysrand(), this.child.getPosition().x - 140, this.child.getPosition().y + 10, 0.05, "anim/combo2/;1;13").setScale(2);

     wl.play_animation_delay(this.rootNode, 0.5, this.child.getPosition().x, this.child.getPosition().y - 30, 0.03, "anim/combo/;1;16").setScale(1.5);

     wl.play_animation_delay(this.rootNode, 0.8, this.child.getPosition().x, this.child.getPosition().y - 10, 0.05, "anim/combo3/;1;15").setScale(3);

 };

 combinesoul.prototype.combineChildEnd = function () {

     cc.log("combineChildEnd")
     this.cost_bg.setVisible(false);



     var size = this.rootNode.getContentSize();
     this.rootNode.setPosition(0, 0);
     this.datapanel = wl.load_scene("datapanel", wl.traveller_create(this.childcard.soulid, wl.gvars.role));
     this.rootNode.addChild(this.datapanel);

     this.datapanel.setPosition(cc.p(0, -(this.datapanel.controller.dataheader.getContentSize().height / 2 + size.height / 2)));
     this.datapanel.runAction(cc.MoveTo.create(0.2, cc.p(0, this.datapanel.controller.h - size.height / 2)));

     wl.wait_touch(this.combineFinished,this);
 };

 combinesoul.prototype.combineFinished = function () {

     cc.log("combineFinished")
     this.datapanel.removeFromParent();
     this.datapanel = null;
     this.menu.setEnabled(true);
     this.menutitle.setEnabled(true);
     this.cost_bg.setVisible(true);

     this.child.setVisible(true);
     this.btnok.setVisible(true);
     this.lblcombine.setVisible(true);

     if (this.childcard != null) {
         this.childcard.removeFromParent();
         this.childcard = null;
     }
     this.lblcost.setString(0);
     this.lblhas.setString(wl.gvars.role.getCopper());
     this.show(null, SOUL_ORDER_DEFAULT);
     this.animate();
 };