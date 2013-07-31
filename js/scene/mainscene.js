var mainscene = function(){};

mainscene.prototype.onDidLoadFromCCB = function(){
    this.submapid = 1
};

mainscene.prototype.onPressSubmap = function(n){
	
    var submap = wl.load_scene(submaps[n.getTag()].res)
    this.rootNode.addChild(submap)
};