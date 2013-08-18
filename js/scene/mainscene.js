var mainscene = function(){};

mainscene.prototype.onDidLoadFromCCB = function(){
       
    this.lbl_name.setString(wl.gvars.role.getName());
    this.lbl_level.setString(wl.gvars.role.getLevel());
    this.lbl_gold.setString(wl.gvars.role.getGold());
    this.lbl_copper.setString(wl.gvars.role.getCopper());
    this.lbl_energy_value.setString(wl.gvars.role.getHP()+"/"+wl.gvars.role.getMaxHP());
    
    this.exp_bar.setScaleX(wl.gvars.role.getExp()/wl.gvars.role.getMaxExp());
    
    //this.energy_bar.setScaleX();
    
    this.showmap("mainmap");
    
    
    
};

mainscene.prototype.showmap = function(name){
    if(this.curmap != null){
        this.rootNode.removeChild(this.curmap);
    }
    this.curmap = wl.load_scene(name);
    this.rootNode.addChild(this.curmap);
};

mainscene.prototype.onPressSubmap = function(n){
    this.showmap(submaps[n].res);
};

mainscene.prototype.onShowTraveller = function(n){
    wl.run_scene("travellerinfo",wl.gvars.role.travellers[0])
};

mainscene.prototype.onShowMainMap = function(){
    this.showmap("mainmap");
};