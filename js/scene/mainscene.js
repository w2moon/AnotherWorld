var mainscene = function(){};

mainscene.prototype.onDidLoadFromCCB = function(){
       
    this.lbl_name.setString(wl.gvars.role.getName());
    this.lbl_level.setString(wl.gvars.role.getLevel());
    this.lbl_gold.setString(wl.gvars.role.getGold());
    this.lbl_copper.setString(wl.gvars.role.getCopper());
    this.lbl_energy_value.setString(wl.gvars.role.getHP()+"/"+wl.gvars.role.getMaxHP());
    
    this.exp_bar.setScaleX(wl.gvars.role.getExp()/wl.gvars.role.getMaxExp());
    
    //this.energy_bar.setScaleX();
    
    for(var i=1;i<=SLOT_NUM;++i){
        var travellerid = wl.gvars.role["getSlot"+i]();
        if(travellerid == 0){
            this["slot"+i].setVisible(false);
            continue;
        }
        this["slot"+i].setVisible(true);

        var traveller = wl.gvars.role.getTraveller(travellerid);
        this["card"+i] = wl.load_scene("uicard",traveller.getSoul().getSkeleton(),traveller.getSoul().getAvatar(),traveller.getImg());
        this["card"+i].setPosition(this.menu.convertToWorldSpace(this["slot"+i].getPosition()));
        this.rootNode.addChild(this["card"+i]);

    }

    
    
};

mainscene.prototype.onCreate = function(newtraveller){
    
    if(newtraveller != null){
        var slot = wl.gvars.role.getTravellerSlot(newtraveller.getId());
        cc.log(slot)
        cc.log(newtraveller.getId())
        if(slot != null){
            this.showSlotInfo(slot,newtraveller);
        }
    }
};


mainscene.prototype.onPressSlot = function(n){
    this.showSlotInfo(n.getTag());
};

mainscene.prototype.showSlotInfo = function(slot,newtraveller){
    this.menu.setEnabled(false);
    this.maskbg.setVisible(true);
    cc.log("slot:"+slot)
    var info = wl.load_scene("travellerinfo",wl.gvars.role.getTraveller(wl.gvars.role["getSlot"+slot]()),newtraveller);
    var p1 = this["card"+slot].getPosition();
    var p2 = info.getContentSize();
    info.setPosition(cc.p(-p2.width/2,-p2.height/2));
    this["card"+slot].addChild(info);

    info.controller.datapanel.setPosition(cc.p(p2.width/2-p1.x,info.controller.datapanel.controller.h-p1.y));
};

mainscene.prototype.onShowMainMap = function(){
    wl.run_scene("mapcontainer",0);
};

mainscene.prototype.onTravellerModified = function(){
    this.menu.setEnabled(true);
    this.maskbg.setVisible(false);
};

