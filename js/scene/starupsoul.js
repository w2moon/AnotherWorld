 var starupsoul = function(){}
starupsoul.prototype.onDidLoadFromCCB = function()
{
    this.fathercard = null;
    this.mothercard = null;
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

starupsoul.prototype.onChooseSoul1 = function()
{
};

starupsoul.prototype.onChooseSoul2 = function()
{
};

starupsoul.prototype.onChoosed = function(isFather,soulid)
{
    if(this.isChoosed(soulid)){
        wl.popmsg(lang("STARUPSOUL_CANNOT_USE_SAME_SOULID"));
        return;
    }

    if(isFather){
        if(this.fathercard != null){
            this.fathercard.removeFromParent();
        }
        if(this.mothercard != null){
            if(wl.gvars.role.getSoul(this.mothercard.soulid).getBaseId() != wl.gvars.role.getSoul(soulid).getBaseId()){
                wl.popmsg(lang("STARUP_NOT_SAME_SOUL"));
                return;
            }
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
        if(this.fathercard != null){
            if(wl.gvars.role.getSoul(this.fathercard.soulid).getBaseId() != wl.gvars.role.getSoul(soulid).getBaseId()){
                wl.popmsg(lang("STARUP_NOT_SAME_SOUL"));
                return;
            }
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
        var rarity = rarityclass[soulbase[fathersoul.baseid]['rarityclass']]

        var starupcopper = parse_action_params(rarity.starupcopper);
        var star = wl.clamp(fathersoul.star + mothersoul.star + 1,0,starupcopper.length);
        if(starupcopper[star - 1] > role.copper){
            
        }

        this.lblcost.setString(starupcopper[star - 1]);
    }
};

starupsoul.prototype.onPressStarup = function()
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