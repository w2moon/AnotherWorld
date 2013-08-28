var mainmap = function(){};

mainmap.prototype.onDidLoadFromCCB = function(){
    // this.rootNode.scheduleOnce(function(){this.controller.menu.setHandlerPriority(PRIORITY_MAP);});
    for(var k in submaps){
        if(!wl.gvars.role.canEnterSubMap(k)){
            if(this["submap"+submaps[k].id] == null){
                cc.log("not found:"+k+" stagebtn:"+submaps[k].id);
                continue;
            }
            this["submap"+submaps[k].id].setVisible(false);
        }
    }
};

mainmap.prototype.onPressSubmap = function(n){
	cc.log("presssubmap"+n.getTag())
    this.rootNode.getParent().controller.onPressSubmap(n.getTag())
    
};
