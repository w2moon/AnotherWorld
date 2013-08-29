var submapscene = function(){};

submapscene.prototype.onDidLoadFromCCB = function(){
    // this.rootNode.scheduleOnce(function(){this.controller.menu.setHandlerPriority(PRIORITY_MAP);});
};

submapscene.prototype.onCreate = function(submapid){
    this.submapid = submapid;
    var stages = parse_action_params(submaps[submapid].stages);
    for(var i in stages){
        if(wl.gvars.role.canEnterStage(stages[i])){
            this["stage"+stages[i]].setVisible(true);
        }
    }
};

submapscene.prototype.onPressStage = function(n){
    this.rootNode.getParent().controller.menu.setEnabled(false);
    this.menu.setEnabled(false);
    this.showStageInfo(n.getTag());
};

submapscene.prototype.showStageInfo = function(stageid){
    var infopage = wl.load_scene("stageinfo",stageid,this.submapid);
    this.rootNode.addChild(infopage);
};