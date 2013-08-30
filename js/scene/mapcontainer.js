var mapcontainer = function(){};

mapcontainer.prototype.onDidLoadFromCCB = function(){
       
  
    
};

mapcontainer.prototype.onCreate = function(submapid){
    if(submapid == 0){
        this.showmap("mainmap");
    }
    else{
        this.onPressSubmap(submapid);
    }
};


mapcontainer.prototype.showmap = function(name){
    if(this.curmap != null){
        this.rootNode.removeChild(this.curmap);
    }
    if(name == "mainmap"){
        this.submapid = 0;
    }
    this.curmap = wl.load_scene(name,this.submapid);

    this.rootNode.addChild(this.curmap,-1);
};

mapcontainer.prototype.onPressSubmap = function(submapid){
    this.submapid = submapid;
    this.showmap(submaps[submapid].res);
};

mapcontainer.prototype.onPressBack = function(){
    if(this.submapid == 0){
        wl.run_scene("mainscene");
    }
    else{
        this.showmap("mainmap");
    }
};