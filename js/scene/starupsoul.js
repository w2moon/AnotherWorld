 var starupsoul = function(){}
starupsoul.prototype.onDidLoadFromCCB = function()
{
    this.fathercard = null;
    this.mothercard = null;
    this.isChoosingFather = true;
     this.objs = [];
      var size = this.rootNode.getContentSize();
    this.scroll = wl.clipping_layer(size.width,size.height/3);

    this.rootNode.addChild(this.scroll);\

    this.show(null,ORDER_DEFAULT);
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

starupsoul.prototype.onChooseBase = function()
{
    this.isChoosingFather = true;
};

starupsoul.prototype.onChooseSeed = function()
{
    this.isChoosingFather = false;
};


starupsoul.prototype.show = function(race,order)
{
    
    

    this.chooseRace(race);
    this.chooseOrder(order);


};

starupsoul.prototype.chooseRace = function(race)
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
        var s = wl.load_scene("selectbar",souls[k].getBase().icon,this.onChoosed,souls[k].getId());
        s.id = souls[k].getId();
        this.objs.push(s);
        this.scroll.addChild(s);
    }
};



starupsoul.prototype.chooseOrder = function(order)
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

starupsoul.prototype.onChoosed = function(soulid,n)
{
    if(this.isChoosed(soulid)){
        wl.popmsg(lang("STARUPSOUL_CANNOT_USE_SAME_SOULID"));
        return;
    }

    if(this.isChoosingFather){
        
        if(this.mothercard != null){
            if(wl.gvars.role.getSoul(this.mothercard.soulid).getBaseId() != wl.gvars.role.getSoul(soulid).getBaseId()){
                wl.popmsg(lang("STARUP_NOT_SAME_SOUL"));
                return;
            }
        }
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
        
        if(this.fathercard != null){
            if(wl.gvars.role.getSoul(this.fathercard.soulid).getBaseId() != wl.gvars.role.getSoul(soulid).getBaseId()){
                wl.popmsg(lang("STARUP_NOT_SAME_SOUL"));
                return;
            }
        }
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
        var rarity = rarityclass[soulbase[fathersoul.baseid]['rarityclass']]

        var starupcopper = parse_action_params(rarity.starupcopper);
        var star = wl.clamp(fathersoul.star + mothersoul.star + 1,0,starupcopper.length);
        if(starupcopper[star - 1] > role.copper){
            
        }

        this.lblcost.setString(starupcopper[star - 1]);
    }
};

starupsoul.prototype.onPressConfirm = function()
{

if(this.fathercard == null || this.mothercard == null){
    return;
}
var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
        var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
        var rarity = rarityclass[soulbase[fathersoul.baseid]['rarityclass']]

        var starupcopper = parse_action_params(rarity.starupcopper);
        var star = wl.clamp(fathersoul.star + mothersoul.star + 1,0,starupcopper.length);
        if(starupcopper[star - 1] > role.copper){
            wl.popmsg(lang("STARTUP_NOT_ENOUGH_COPPER"));
            return;
        }
 var msg = wl.msg.create("soul_starup");
     msg.soulid1 = this.fathercard.soulid;
    msg.soulid2 = this.mothercard.soulid;
     wl.http.send(msg,this.on_soul_starup,this);
};

starupsoul.prototype.on_soul_starup = function(ret)
{
    if(ret.rc != retcode.OK){
        cc.log("starup soul fail");
        return;
    }

    var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
        var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
        var rarity = rarityclass[soulbase[fathersoul.baseid]['rarityclass']]

        var starupcopper = parse_action_params(rarity.starupcopper);
        var star = wl.clamp(fathersoul.star + mothersoul.star + 1,0,starupcopper.length);
       wl.gvars.role.subCopper(starupcopper[star - 1]);
       wl.gvars.role.deleteSoul(this.mothercard.soulid);
    wl.gvars.role.addSoul(ret.soul);
};