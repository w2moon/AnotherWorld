 var equipmake = function(){}
equipmake.prototype.onDidLoadFromCCB = function()
{
    this.choosedid = null;
};

equipmake.prototype.onChoosePluePrint = function(blueid)
{
    this.choosedid = blueid;

    var base = blueprint[blueid];

    this.lblcost.setString(base.copper);

    if(this.equip != null){
        this.equip.removeFromChild();
    }
    this.equip = cc.Sprite.create(equipmentbase[base.equipid].icon);
    this.equip.setPosition(this.equipplace.getPosition());
    this.rootNode.addChild(this.equip);
    this.lblname.setString(lang(equipmentbase[base.equipid].name));

    for(var i = 1;i<=6;++i){
        if(base["mid"+i] == 0 ){
            continue;
        }
        var mbase = material[base["mid"+i]];
        var mnum = base["mnum"+i];

        if(wl.gvars.role.getMaterialNum(mbase.id) >= mnum){
        //can
        }
        else{
        //not
        }
    }
};

equipmake.prototype.onPressMake = function()
{
    if(this.choosedid == null){
        return;
    }

      var base = blueprint[this.choosedid];
      if(wl.gvars.role.getCopper() < base.copper){
        wl.popmsg(lang("MAKE_NOTENOUGH_COPPER"));
        return;
      }
      for(var i = 1;i<=6;++i){
        if(base["mid"+i] == 0 ){
            continue;
        }
       

        if(wl.gvars.role.getMaterialNum(base["mid"+i]) < base["mnum"+i]){
            wl.popmsg(lang("MAKE_NOTENOUGH_MATERIAL"));
            return;
        }
       
    }

     var msg = wl.msg.create("equip_make");
     msg.blueprint = this.choosedid;
     wl.http.send(msg,this.on_equip_make,this);
};

equipmake.prototype.on_equip_make = function(ret)
{
    if(ret.equip == null){
        wl.popmsg(lang("MAKE_EQUIP_FAIL"));
        return;
    }

    var base = blueprint[this.choosedid];

    wl.gvars.role.subCopper( base.copper) 
      
      for(var i = 1;i<=6;++i){
        if(base["mid"+i] == 0 ){
            continue;
        }
       wl.gvars.role.subMaterialNum(base["mid"+i],base["mnum"+i]);

       
    }
    wl.gvars.role.addEquip(ret.equip);

};