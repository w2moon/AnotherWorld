 var equipstarup = function(){}
equipstarup.prototype.onDidLoadFromCCB = function()
{
    this.target = null;
    this.selected = [];

    this.objs = [];
    

     var size = this.rootNode.getContentSize();
    this.scroll = wl.scroll_layer(size.width,size.height/3);

    this.rootNode.addChild(this.scroll);

    
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

equipstarup.prototype.showtarget = function(){

   this.clearObjs();
     

    var equips = wl.gvars.role.getObjects();

    
    var x = 0;
    var y = 0;
    for(var k in equips){
        var equip = wl.load_scene("selectbar",equips[k].getBase().icon,this.onChooseTarget,equips[k].getId());
        equip.setPosition(x,y);
        this.scroll.addChild(equip);

        this.objs.push(equip);

        y = y + 50;
    }
};

equipstarup.prototype.showall = function(){
    this.clearObjs();
    this.selected = [];
     var equips = wl.gvars.role.getObjects();

    
    var x = 0;
    var y = 0;
    for(var k in equips){
        if(equips[k].getId() == this.target.id){
            continue;
        }
        var equip = wl.load_scene("selectbar",equips[k].getBase().icon,this.onChooseSelect,equips[k].getId());
        equip.setPosition(x,y);
        this.scroll.addChild(equip);

        this.objs.push(equip);

        y = y + 50;
    }
};

equipstarup.prototype.updateTarget = function(){
    this.lbllevel.setString("LV"+this.target.getLevel());
    this.lblexp.setString(this.target.getExp()+"/"+this.target.getMaxExp());
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

equipstarup.prototype.onChooseSelect = function(e,n)
{
     if(e == this.traget.id){
        return;
    }
    if(this.canBeSelect(e)){
         n.selected();
         n.id = e;
         this.selected.push(n);

         this.redrawSelect();
    }
    else{
         
        for(var k in this.selected ){
            if(this.selected[k].id == e){
                this.selected.splice(k,1);
                break;
            }
        }
        n.unselected();
        this.redrawSelect();
    }

   
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

     this.lblcost.setString(copper);
     this.lbltotalexp.setString(totalexp);

   
};

equipstarup.prototype.onPressEquip = function()
{
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

    this.lblcost.setString(0);
    this.lbltotalexp.setString(0);
    this.updateTarget();
    this.showall();
};