 var equipmake = function(){}
equipmake.prototype.onDidLoadFromCCB = function()
{
    this.choosedid = null;

    var size = this.rootNode.getContentSize();
    this.scroll = wl.clipping_layer(size.width,size.height/3);

    this.rootNode.addChild(this.scroll);

    
    
    this.selecttype();

    this.orderby(ORDER_DEFAULT);
};

var sort_blueprint_rarity = function(t1,t2){
    return  equipments[blueprint[t2.id].equipid].rarityclass<equipments[blueprint[t1.id].equipid].rarityclass;
   };

var sort_blueprint_canmake = function(t1,t2){
     var r1 = wl.gvars.role.canMakeBlueprint(t1.id);
     var r2 = wl.gvars.role.canMakeBlueprint(t2.id);
     if(r1==r2){
        return sort_blueprint_rarity(t1,t2);
     }
     else if(r1){
        return -1;
     }
     else if(r2){
        return 1;
     }
};

equipmake.prototype.selecttype = function(type){
    var blueprints = wl.gvars.role.getBlueprints(type);
    for(var k in this.blueprints){
        this.blueprints.removeFromParent();
    }
    this.blueprints = [];
    for(var k in blueprints){
        var s = wl.load_scene("bluebar",this,blueprints[k]);
        s.id = blueprints[k];
        this.scroll.addChild(s);
        this.blueprints.push(s);
    }
};

equipmake.prototype.orderby = function(order){
        this.curorder = order;
        switch(order)
        {
        case ORDER_DEFAULT:
            this.blueprints.sort(sort_blueprint_canmake);
        break;
        case ORDER_RARITY:
            this.blueprints.sort(sort_blueprint_rarity);
        break;
        
        }

        var x = 0;
        var y = 0;
        for(var k in this.blueprints){
            this.blueprints.setPosition(x,y);
            y = y + 50;
        }
    },

equipmake.prototype.onChoosePluePrint = function(blueid,selectednode)
{
    if(this.selectednode != null){
        this.selectednode.unselected();
    }
    this.selectednode.selected();
    this.selectednode = selectednode;
    this.choosedid = blueid;

    var base = blueprint[blueid];

    this.lblcost.setString(base.copper);

    if(this.equip != null){
        this.equip.removeFromChild();
    }
    this.equip = cc.Sprite.create(equipmentbase[base.equipid].icon);
    this.equip.setPosition(this.menu.convertToWorldSpace(this.btnoutput.getPosition()));
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
        wl.popmsg(lang("MAKE_NEED_CHOOSE_BLUEPRINT"));
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

    this.equip.removeFromChild();

};