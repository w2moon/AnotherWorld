var stageinfo = function(){};

stageinfo.prototype.onDidLoadFromCCB = function(){
};

stageinfo.prototype.onCreate = function(stageid){
    this.info = stage[stageid]
};

stageinfo.prototype.onPressStart = function(){
    wl.run_scene(this.info.res,this.info);
};

stageinfo.prototype.onPressCancel = function(){
    this.rootNode.removeFromParent()
};