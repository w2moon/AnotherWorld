var stageinfo = function(){};

stageinfo.prototype.onDidLoadFromCCB = function(){
};

stageinfo.prototype.onCreate = function(stageid){
    cc.log(stageid)
    this.info = stage[stageid]
    cc.log(this.info )
};

stageinfo.prototype.onPressStart = function(){
    wl.run_scene(this.info.res,this.info);
};

stageinfo.prototype.onPressCancel = function(){
    
};