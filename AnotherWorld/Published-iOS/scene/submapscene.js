var submapscene = function(){};

submapscene.prototype.onDidLoadFromCCB = function(){
    this.stageid = 1;
};

submapscene.prototype.onPressStage = function(n){
    this.showStageInfo(n.getTag())
};

submapscene.prototype.showStageInfo = function(stageid){
    var infopage = wl.load_scene("stageinfo",stageid);
    this.rootNode.addChild(infopage);
};