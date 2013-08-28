var submapscene = function(){};

submapscene.prototype.onDidLoadFromCCB = function(){
    // this.rootNode.scheduleOnce(function(){this.controller.menu.setHandlerPriority(PRIORITY_MAP);});
};

submapscene.prototype.onCreate = function(submapid){
    this.submapid = submapid;
    var stages = parse_action_params(submaps[submapid].stages);
    for(var i in stages){
        if(!wl.gvars.role.canEnterStage(stages[i])){
            cc.log(stages[i])
            this["stage"+stages[i]].setVisible(false);
        }
    }
};

submapscene.prototype.onPressStage = function(n){
    this.showStageInfo(n.getTag())
};

submapscene.prototype.showStageInfo = function(stageid){
    var infopage = wl.load_scene("stageinfo",stageid,this.submapid);
    this.rootNode.addChild(infopage);
};