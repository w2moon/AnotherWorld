var mainscene = function(){};

mainscene.prototype.onDidLoadFromCCB = function(){
    this.submapid = 1
};

mainscene.prototype.onPressSubmap = function(){
    var submap = wl.load_scene(submaps[this.submapid].res)
    this.rootNode.addChild(submap)
};