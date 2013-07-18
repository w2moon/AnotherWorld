var submapscene = function(){};

submapscene.prototype.onDidLoadFromCCB = function(){
    this.stageid = 1;
};

submapscene.prototype.onPressStage = function(){
};

submapscene.prototype.showStageInfo = function(){
    var infopage = wl.load_scene("stageinfo");
    infopage.init(this.stageid);
    this.rootNode.addChild(infopage);
};