var mainmap = function(){};

mainmap.prototype.onDidLoadFromCCB = function(){
    for(var k in submaps){
        if(!wl.gvars.role.canEnterSubMap(k)){
            this["submap"+submaps[k].id].setVisible(false);
        }
    }
};

mainmap.prototype.onPressSubmap = function(n){
	
    this.rootNode.getParent().controller.onPressSubmap(n.getTag())
    
};