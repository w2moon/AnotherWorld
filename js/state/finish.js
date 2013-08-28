state_finish=function(){
     cc.log("finish")

     var battleresult = wl.load_scene("battleresult",this.result,this.info,this.clientresult);
    battleresult.setPosition(cc.p(this.rootNode.getContentSize().width/2,this.rootNode.getContentSize().height/2));
     this.rootNode.addChild(battleresult);
    
    this.state = state_anim;
     return ACTION_INTERVAL
}