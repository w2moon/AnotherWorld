var resultreward = function(){};

resultreward.prototype.onDidLoadFromCCB = function(){
    
      
    
    
};

resultreward.prototype.onCreate = function(info){
    this.info = info;

     this.pospre = this.prelevel.getPosition();
     this.posarrow = this.arrow.getPosition();
     this.posnext = this.nextlevel.getPosition();

     this.prelevel.setPosition(this.posarrow);
     this.prelevel.setString("LV"+info.pro[0].level);

     this.arrow.setVisible(false);
     this.nextlevel.setVisible(false);

      this.expbar.setScaleX(info.pro[0].startexp/info.pro[0].maxexp);
      this.lblexp.setString(this.info.pro[0].startexp+"/"+this.info.pro[0].maxexp);
        
     this.idx = 0;
   
};

resultreward.prototype.playAnim = function(){
    this.elapsetime = 0;
    this.endpercent = info.pro[this.idx].endexp/info.pro[this.idx].maxexp;
    this.rootNode.update = function(dt){ this.controller.step(dt);};
    this.rootNode.scheduleUpdate();
};


resultreward.prototype.endAnim = function(){
    
    if(this.info.pro.length - 1 == this.idx){
        return true;
    }

    this.rootNode.unscheduleUpdate();
    this.prelevel.stopAllActions();
     this.nextlevel.stopAllActions();
      this.arrow.stopAllActions();
      
           this.rootNode.stopAllActions();

           this.prelevel.setPosition(this.pospre);
           this.nextlevel.setPosition(this.posnext);
           this.nextlevel.setVisible(1);
           this.nextlevel.setString("LV"+this.info.pro[this.idx].level);
           this.nextlevel.setScale(1);
           this.arrow.setVisible(1);
           this.arrow.setScale(1);
          

        
           
           this.idx = this.info.pro.length - 1;
           
            this.expbar.setScaleX(this.info.pro[this.idx].endexp/this.info.pro[this.idx].maxexp);
            this.lblexp.setString(this.info.pro[this.idx].endexp+"/"+this.info.pro[this.idx].maxexp);

            return false;
};
resultreward.prototype.step = function(dt){
    this.elapsetime += dt;

    if(this.elapsetime <  EXP_ADD_TIME){
        var rate = this.endpercent*this.elapsetime/EXP_ADD_TIME;
        this.expbar.setScaleX(rate);

        this.lblexp.setString(parseInt(this.info.pro[this.idx].maxexp*rate)+"/"+this.info.pro[this.idx].maxexp);
    }
    else{
        this.expbar.setScaleX(this.endpercent);
        this.lblexp.setString(this.info.pro[this.idx].endexp+"/"+this.info.pro[this.idx].maxexp);


        this.idx += 1;
        
        if(this.endpercent>=1){
        if(this.idx == 1){
            this.prelevel.runAction(cc.EaseElasticOut.create(cc.MoveTo.create(EXP_ADD_TIME*2,this.pospre)));
        
            this.nextlevel.setString("LV"+this.info.pro[this.idx].level);
            this.nextlevel.setPosition(this.posarrow);
            this.nextlevel.runAction(cc.Sequence.create(cc.DelayTime.create(EXP_ADD_TIME),cc.Show.create(),cc.EaseElasticOut.create(cc.MoveTo.create(EXP_ADD_TIME,this.posnext))));
        
            this.arrow.setScale(0);
            this.arrow.runAction(cc.Sequence.create(cc.DelayTime.create(EXP_ADD_TIME),cc.Show.create(),cc.EaseElasticOut.create(cc.ScaleTo.create(EXP_ADD_TIME,1))));

            
            
        }
        else{
            this.nextlevel.runAction(cc.Sequence.create(cc.DelayTime.create(EXP_ADD_TIME),cc.Show.create(),cc.ScaleTo.create(EXP_ADD_TIME/2,1.5),cc.CallFunc.create(this.changeNextLevel,this),cc.ScaleTo.create(EXP_ADD_TIME/2,1)));
    
        }
            

           
        }

        if(this.idx < this.info.pro.length){
            this.rootNode.runAction(cc.Sequence.create(cc.DelayTime.create(0.7),cc.CallFunc.create(this.continueAnim,this)));
        }
        else{
            this.showMainReward();
            this.showNormalReward();
        }
        this.rootNode.unscheduleUpdate();

    }
};


resultreward.prototype.changeNextLevel = function(){
    this.nextlevel.setString("LV"+this.info.pro[this.idx].level);
};

resultreward.prototype.continueAnim = function(){
    this.elapsetime = 0;
    this.endpercent = info.pro[this.idx].endexp/info.pro[this.idx].maxexp;
    this.rootNode.scheduleUpdate();
};

resultreward.prototype.showMainReward = function(){
};

resultreward.prototype.showNormalReward = function(){
    for(var k in this.info.rewards){
    }
};