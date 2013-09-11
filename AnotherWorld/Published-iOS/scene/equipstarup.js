 var equipstarup = function(){}
equipstarup.prototype.onDidLoadFromCCB = function()
{
    this.target = null;
    this.selected = [];
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

    var equip = wl.gvars.role.getEquipment(e);
    equip.id = e;
    equip.setPosition(this.equipplace.getPosition());
    this.rootNode.addChild(equip);
    this.target = equip;
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
    if(e == this.traget.id){
        return false;
    }
    for(var k in this.selected ){
        if(this.selected[k].id == e){
            return false;
        }
    }
    return true;
}

equipstarup.prototype.onAddSelect = function(e)
{
    if(!this.canBeSelect(e)){
        wl.popmsg(lang("ENHENCE_CANNOT_BE_SELECT"));
        return;
    }

    var equip = wl.gvars.role.getEquipment(e);
    equip.id = e;
    this.rootNode.addChild(equip);
    this.selected.push(equip);

    this.redrawSelect();
};

equipstarup.prototype.onDeleteSelect = function(e)
{
    for(var k in this.selected ){
        if(this.selected[k] == e){
            this.selected[k].removeFromParent();
            this.selected.splice(k,1);
            break;
        }
    }

    this.redrawSelect();
};

equipstarup.prototype.redrawSelect = function(){
    var copper = 0;
    var totalexp = 0;

    for(var k in this.selected ){
        var e = wl.gvars.role.getEquipment(this.selected[k].id);
        var rarity = rarityclass[soulbase[e.baseid].rarityclass];
        copper += rarity.enhencecopper;
        totalexp += rarityclass.enhenceexp;
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

        var rarity = rarityclass[soulbase[e.baseid].rarityclass];
        copper += rarity.enhencecopper;
        totalexp += rarityclass.enhenceexp;
    }

    if(wl.gvars.role.getCopper() < copper){
        wl.popmsg(lang("ENHENCE_NOT_ENOUGH_COPPER"));
        return;
    }

     var msg = wl.msg.create("equip_enhence");
     msg.equip = this.equip.id;
     msg.consume = [];
     for(var k in this.selected){
        msg.consume.push(this.selected[k].id);
     }
     wl.http.send(msg,this.on_equip_enhence,this);
};

equipstarup.prototype.on_equip_enhence = function(ret)
{
    if(ret.rc != retcode.OK){
        cc.log("enhence fail:"+ret.rc);
        return;
    }

     var copper = 0;

    for(var k in this.selected){
        var e = wl.gvars.role.getEquipment(this.selected[k].id);
        
        var rarity = rarityclass[soulbase[e.baseid].rarityclass];
        copper += rarity.enhencecopper;

        wl.gvars.role.deleteEquip(this.selected[k].id);
    }
    wl.gvars.role.subCopper(copper);
    wl.gvars.role.addEquip(ret.equip);
};