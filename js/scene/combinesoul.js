 var combinesoul = function(){}
combinesoul.prototype.onDidLoadFromCCB = function()
{
    this.fathercard = null;
    this.mothercard = null;
    this.childcard = null;
};

combinesoul.prototype.onPressFather = function()
{
    
};

combinesoul.prototype.onPressMother = function()
{
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

combinesoul.prototype.onChoosed = function(isFather,soulid)
{
    if(this.isChoosed(soulid)){
        wl.popmsg(lang("COMBINESOUL_CANNOT_USE_SAME_SOULID"));
        return;
    }

    if(isFather){
        if(this.fathercard != null){
            this.fathercard.removeFromParent();
        }

        var soul = wl.gvars.role.getSoul(soulid);
        this.fathercard.soulid = soulid;
        this.fathercard = wl.create_soulcard(soul.getBaseId());
        this.fathercard.setPosition(this.father.getPosition());
        this.rootNode.addChild(this.fathercard);
    }
    else{
        if(this.mothercard != null){
            this.mothercard.removeFromParent();
        }

        var soul = wl.gvars.role.getSoul(soulid);
        this.mothercard.soulid = soulid;
        this.mothercard = wl.create_soulcard(soul.getBaseId(),true);
        this.mothercard.setPosition(this.mother.getPosition());
        this.rootNode.addChild(this.mothercard);
    }

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
};

combinesoul.prototype.onPressBack = function()
{
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
        return;
    }

     var fathersoul = wl.gvars.role.getSoul(this.fathercard.soulid);
        var mothersoul = wl.gvars.role.getSoul(this.mothercard.soulid);
        var bid = wl.get_combineid(fathersoul.getBaseId(),mothersoul.getBaseId());
        var rarity = rarityclass[soulbase[bid]['rarityclass']]

        wl.gvars.role.setCopper(wl.gvars.role.getCopper() - rarity['combinecopper']);

        wl.gvars.role.deleteSoul(this.fathercard.soulid);
        wl.gvars.role.deleteSoul(this.mothercard.soulid);
        wl.gvars.role.addSoul(ret.soul);
        
};