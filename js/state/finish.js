state_finish=function(){
     cc.log("finish")

     var battleresult = wl.load_scene("battleresult",this.result,this.info);
     this.rootNode.addChild(battleresult);
     return ACTION_INTERVAL
}