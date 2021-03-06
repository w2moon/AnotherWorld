state_finish=function(){
     cc.log("finish")
     cc.Director.getInstance().getScheduler().setTimeScale(1);

    var size = this.rootNode.getContentSize();
     this.on_result_logofinish = function(){
        this.resultlogo.removeFromParent();

        var battleresult = wl.load_scene("battleresult",this.result,this.info,this.clientresult);
        battleresult.setPosition(cc.p(this.rootNode.getContentSize().width/2,this.rootNode.getContentSize().height/2));
        this.rootNode.addChild(battleresult);
     };
     if(this.clientresult == retcode.BATTLE_RESULT_WIN){
        this.resultlogo = wl.load_scene("uiwin");
         this.resultlogo.animationManager.runAnimationsForSequenceNamed("start");

        this.resultbg = wl.load_scene("winbg");
         this.resultbg.setPosition(cc.p(-size.width/2,-size.height/2));
         this.resultbg.animationManager.runAnimationsForSequenceNamed("start");
        this.resultlogo.addChild(this.resultbg,-1);
        this.resultbg.on_animation_finish = function(){this.animationManager.runAnimationsForSequenceNamed("start");};
        this.resultbg.animationManager.setCompletedAnimationCallback(this.resultbg,this.resultbg.on_animation_finish);
        
        this.resultlogo.animationManager.setCompletedAnimationCallback(this,this.on_result_logofinish);
        this.rootNode.addChild(this.resultlogo);
    }
    else{   
        this.resultlogo = wl.load_scene("uifail");
        this.resultlogo.animationManager.runAnimationsForSequenceNamed("start");
        
        this.resultbg = wl.load_scene("failbg");
        
        this.resultbg.animationManager.runAnimationsForSequenceNamed("start");
        this.resultlogo.addChild(this.resultbg,-1);
        this.resultbg.on_animation_finish = function(){this.animationManager.runAnimationsForSequenceNamed("start");};
        this.resultbg.animationManager.setCompletedAnimationCallback(this.resultbg,this.resultbg.on_animation_finish);
        
        this.resultlogo.animationManager.setCompletedAnimationCallback(this,this.on_result_logofinish);
        this.rootNode.addChild(this.resultlogo);
                
    }

     
    
    this.state = state_anim;
     return ACTION_INTERVAL
}