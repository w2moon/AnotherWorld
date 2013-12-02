
wl.create_travellername = function(){
};

var travellername = function(){};

travellername.prototype.onDidLoadFromCCB = function(){
    var traveller = wl.gvars.role.getTraveller(wl.gvars.role.getHero());
    this.card = wl.load_scene("uicard",traveller.getSoul().getSkeleton(),traveller.getSoul().getAvatar(),traveller.getImg());
    this.card .setPosition(this.char.getPosition());
    this.rootNode.addChild(this.card );

    this.lblatk.setString(traveller.getProperty("Attack"));
    this.lbldef.setString(traveller.getProperty("Defense"));
    this.lblheal.setString(traveller.getProperty("Heal"));
    this.lblhp.setString(traveller.getProperty("MaxHP"));
    this.char.removeFromParent();
};

travellername.prototype.onPressStart = function(){
    wl.run_scene("mainscene");
};

travellername.prototype.onPressRandom = function(){
    
};