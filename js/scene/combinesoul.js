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


      this.scroll = wl.scroll_layer(con.width, con.size);
      this.scroll.setPosition(center);

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
      this.show(null, SOUL_ORDER_DEFAULT);
      this.animate();
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
    this.clearChild();
};

combinesoul.prototype.onPressMother = function()
{
    this.isChoosingFather = false;
    this.clearChild();
};

combinesoul.prototype.show = function(race,order,notanim)
{
    
    
this.chooseLayer.setVisible(true);
    this.chooseRace(race);
    this.chooseOrder(order,notanim);


};

combinesoul.prototype.onPressOrder = function()
{
    this.chooseRace(this.race);
    this.chooseOrder((this.order+1)%SOUL_ORDER_NUM);
};

combinesoul.prototype.chooseRace = function(race)
{
    if(race != null){
        this.race = race;
    }
    for(var k in this.objs){
        this.objs[k].removeFromParent();
    }
    this.objs = [];
    var souls = wl.gvars.role.getSouls(this.race);
    for(var k in souls){
        var s = wl.load_scene("soulbar",souls[k],this,this.onChoosed);
        s.id = souls[k].getId();
        this.objs.push(s);
        this.scroll.addChild(s);
    }
};

var sort_soul_rarity = function(t1,t2){
    return  soulbase[t2.id].rarityclass<soulbase[t1.id].rarityclass;
};


combinesoul.prototype.chooseOrder = function(order,notanim)
{
    if(order != null){
        this.order = order;
    }

    switch(this.order){
       
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

    var x = 0;
    var y =this.rootNode.getContentSize().height/2-90;
    for(var k in this.objs){
        if(notanim){
             this.objs[k].setPosition(x,y);
        }
        else
        {
            if(k%2==0){
                this.objs[k].setPosition(x + this.rootNode.getContentSize().width,y);
            }
            else{
                this.objs[k].setPosition(x - this.rootNode.getContentSize().width,y);
            }
            this.objs[k].runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.EaseSineOut.create(cc.MoveTo.create(0.3,cc.p(x,y)))));
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

combinesoul.prototype.onChoosed = function(soulid,n)
{
    if(this.isChoosed(soulid)){
        wl.popmsg(lang("COMBINESOUL_CANNOT_USE_SAME_SOULID"));
        return;
    }

    if(this.isChoosingFather){
        if(this.fathercard != null){
            this.fathercard.node.unselected();
            this.fathercard.removeFromParent();
        }

        var soul = wl.gvars.role.getSoul(soulid);
    //   n.selected();
        this.fathercard = wl.create_soulcard(soul.getBaseId());
        var pos = this.father.getPosition();
        pos.y += 40;
        this.fathercard.setPosition(pos);
         this.fathercard.soulid = soulid;
          this.fathercard.node = n;
        this.rootNode.addChild(this.fathercard);
    }
    else{
        if(this.mothercard != null){
            this.mothercard.node.unselected();
            this.mothercard.removeFromParent();
        }

        var soul = wl.gvars.role.getSoul(soulid);
      //  n.selected();
        this.mothercard = wl.create_soulcard(soul.getBaseId(),true);
        this.mothercard.soulid = soulid;
        this.mothercard.node = n;
        var pos = this.mother.getPosition();
        pos.y += 40;
        this.mothercard.setPosition(pos);
        this.rootNode.addChild(this.mothercard);
    
    }
    this.isChoosingFather = !this.isChoosingFather;

    this.chooseLayer.setVisible(false);
    if(this.fathercard != null && this.mothercard != null){
        var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
        var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
        var bid = wl.get_combineid(fathersoul.getBaseId(),mothersoul.getBaseId());
        if(soulbase[bid] == null){
            cc.log("combine error : "+fathersoul.getBaseId() +" "+mothersoul.getBaseId());
        }
        var rarity = rarityclass[soulbase[bid]['rarityclass']]

        this.lblcost.setString(rarity['combinecopper']);
        //this.lblmutation.setString(rarity['mutation']);

        if(wl.gvars.role.isMeeted(bid)){
        }
        else{
        }
    }
    else if(this.isFirstEnter)
    {
        this.isFirstEnter = false;
        this.isChoosingFather = false;
        this.show(null,SOUL_ORDER_DEFAULT,true);
    }
  
};



combinesoul.prototype.onPressChild = function()
{
    cc.log("show child");
};

combinesoul.prototype.onPressBack = function()
{
    wl.run_scene("mainscene");
};

combinesoul.prototype.onPressCombine = function()
{
    if(this.fathercard == null || this.mothercard == null){
        wl.popmsg(lang("COMBINE_NOT_CHOOSE_PARENT"));
        return;
    }
        var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
        var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
        var bid = wl.get_combineid(fathersoul.getBaseId(),mothersoul.getBaseId());
        var rarity = rarityclass[soulbase[bid]['rarityclass']]

        if(wl.gvars.role.getCopper() < rarity['combinecopper']){
            wl.popmsg(lang("COMBINE_NOT_ENOUGH_COPPER"));
            return;
        }

         var msg = wl.msg.create("soul_combine");
     msg.soulid1 = this.fathercard.soulid;
    msg.soulid2 = this.mothercard.soulid;
     wl.http.send(msg,this.on_soul_combine,this);
    
};

combinesoul.prototype.on_soul_combine = function(ret)
{
    if(ret.rc != retcode.OK){
        wl.popmsg(lang("COMBINE_FAIL"));
        cc.log(ret.rc);
        return;
    }

     var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
        var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
        var bid = wl.get_combineid(fathersoul.getBaseId(),mothersoul.getBaseId());
        var rarity = rarityclass[soulbase[bid]['rarityclass']]

        wl.gvars.role.subCopper(rarity['combinecopper']);

        if(fathersoul.getTravellerId() != 0 && mothersoul.getTravellerId() != 0 )
        {
            if(mothersoul.getTravellerId() == wl.gvars.role.getHero()){
                var traveller = wl.gvars.role.getTraveller(mothersoul.getTravellerId());
                traveller.setSoulId(ret.soul.id);

                traveller = wl.gvars.role.getTraveller(fathersoul.getTravellerId());
                traveller.setSoulId(0);
            }
            else{
                var traveller = wl.gvars.role.getTraveller(fathersoul.getTravellerId());
                traveller.setSoulId(ret.soul.id);

                traveller = wl.gvars.role.getTraveller(mothersoul.getTravellerId());
                traveller.setSoulId(0);
            }
            
        }
        else if(fathersoul.getTravellerId() != 0)
        {
            var traveller = wl.gvars.role.getTraveller(fathersoul.getTravellerId());
                traveller.setSoulId(ret.soul.id);
             cc.log("fffff")

               
        }
        else (mothersoul.getTravellerId() != 0)
        {
            var traveller = wl.gvars.role.getTraveller(mothersoul.getTravellerId());
            if(traveller != null){
                traveller.setSoulId(ret.soul.id);
            }
            else{
                cc.log("t m null")
            }
            cc.log("ggggg")
              
        }

        wl.gvars.role.deleteSoul(this.fathercard.soulid);
        wl.gvars.role.deleteSoul(this.mothercard.soulid);

        if(ret.soul.baseid != bid){
        //mutaition
        }
    
        wl.gvars.role.addSoul(ret.soul);

       

        this.fathercard.removeFromParent();
        this.fathercard = null;
        this.mothercard.removeFromParent();
        this.mothercard = null;

        if(this.childcard != null){
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

    //    this.show(null,ORDER_DEFAULT);
        
};