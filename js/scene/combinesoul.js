 var combinesoul = function(){}
combinesoul.prototype.onDidLoadFromCCB = function()
{
    this.fathercard = null;
    this.mothercard = null;
    this.childcard = null;
    this.objs = [];
    this.isChoosingFather = true;

      var size = this.rootNode.getContentSize();
    this.scroll = wl.scroll_layer(size.width,size.height/3);

    this.rootNode.addChild(this.scroll);


    this.show(null,ORDER_DEFAULT);
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

combinesoul.prototype.show = function(race,order)
{
    
    

    this.chooseRace(race);
    this.chooseOrder(order);


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
        var s = wl.load_scene("selectbar",souls[k].getBase().icon,this,this.onChoosed,souls[k].getId());
        s.id = souls[k].getId();
        this.objs.push(s);
        this.scroll.addChild(s);
    }
};

var sort_soul_rarity = function(t1,t2){
    return  soulbase[t2.id].rarityclass<soulbase[t1.id].rarityclass;
};


combinesoul.prototype.chooseOrder = function(order)
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

    var x = 0;
    var y = 0;
    for(var k in this.objs){
        this.objs[k].setPosition(x,y);
        y += 50;
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
       n.selected();
        this.fathercard = wl.create_soulcard(soul.getBaseId());
        this.fathercard.setPosition(this.father.getPosition());
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
        n.selected();
        this.mothercard = wl.create_soulcard(soul.getBaseId(),true);
        this.mothercard.soulid = soulid;
        this.mothercard.node = n;
        this.mothercard.setPosition(this.mother.getPosition());
        this.rootNode.addChild(this.mothercard);
    
    }
    this.isChoosingFather = !this.isChoosingFather;

    if(this.fathercard != null && this.mothercard != null){
        var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
        var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
        var bid = wl.get_combineid(fathersoul.getBaseId(),mothersoul.getBaseId());
        var rarity = rarityclass[soulbase[bid]['rarityclass']]

        this.lblcost.setString(rarity['combinecopper']);
        //this.lblmutation.setString(rarity['mutation']);
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

               
        }
        else (mothersoul.getTravellerId() != 0)
        {
            var traveller = wl.gvars.role.getTraveller(mothersoul.getTravellerId());
                traveller.setSoulId(ret.soul.id);

              
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

        var soul = wl.gvars.role.getSoul(ret.soul.id);
        
        this.childcard = wl.create_soulcard(soul.getBaseId());
        this.childcard.soulid = ret.soul.id;
        this.childcard.setPosition(this.child.getPosition());
        this.rootNode.addChild(this.childcard); 

        this.show(null,ORDER_DEFAULT);
        
};