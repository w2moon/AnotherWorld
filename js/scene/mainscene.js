var mainscene = function(){};

mainscene.prototype.onDidLoadFromCCB = function(){
    this.submapid = 1
    
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

mainscene.prototype.onShowMainMap = function(){
    this.showmap("mainmap");
};