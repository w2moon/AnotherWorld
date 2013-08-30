var resultlevelup = function(){};

var EXP_ADD_TIME = 0.2;

resultlevelup.prototype.onDidLoadFromCCB = function(){
     
    
    
};

resultlevelup.prototype.onCreate = function(info){
     this.info = info;
     var card = wl.load_scene("uicard",info.traveller.getSoul().getSkeleton(),info.traveller.getSoul().getAvatar(),info.traveller.getImg());
     this.rootNode.addChild(card);

     this.pospre = this.prelevel.getPosition();
     this.posarrow = this.arrow.getPosition();
     this.posnext = this.nextlevel.getPosition();

     this.prelevel.setPosition(this.posarrow);
     this.prelevel.setString("LV"+info.pro[0].level);

     this.arrow.setVisible(false);
     this.nextlevel.setVisible(false);

     this.lblhp.setString(info.pro[0].hp);
     this.lbladdhp.setString("");
     this.lblattack.setString(info.pro[0].attack);
     this.lbladdattack.setString("");
     this.lbldefense.setString(info.pro[0].defense);
     this.lbladddefense.setString("");
     this.lblheal.setString(info.pro[0].heal);
     this.lbladdheal.setString("");

     this.expbar.setScaleX(info.pro[0].startexp/info.pro[0].maxexp);
        
     this.idx = 0;

};

resultlevelup.prototype.playAnim = function(){
    this.elapsetime = 0;
    this.endpercent = info.pro[this.idx].endexp/info.pro[this.idx].maxexp;
    this.rootNode.update = function(dt){ this.controller.step(dt);};
    this.rootNode.scheduleUpdate();
};

resultlevelup.prototype.endAnim = function(){
    
    if(this.info.pro.length - 1 == this.idx){
        return true;
    }

    this.rootNode.unscheduleUpdate();
    this.prelevel.stopAllActions();
     this.nextlevel.stopAllActions();
      this.arrow.stopAllActions();
       this.lbladdhp.stopAllActions();
        this.lbladdattack.stopAllActions();
         this.lbladddefense.stopAllActions();
          this.lbladdheal.stopAllActions();
           this.rootNode.stopAllActions();

           this.prelevel.setPosition(this.pospre);
           this.nextlevel.setPosition(this.posnext);
           this.nextlevel.setVisible(1);
           this.nextlevel.setString("LV"+this.info.pro[this.idx].level);
           this.nextlevel.setScale(1);
           this.arrow.setVisible(1);
           this.arrow.setScale(1);
           this.lbladdhp.setScale(1);
           this.lbladdattack.setScale(1);
           this.lbladddefense.setScale(1);
           this.lbladdheal.setScale(1);

           this.lbladdhp.setVisible(1);
           this.lbladdattack.setVisible(1);
           this.lbladddefense.setVisible(1);
           this.lbladdheal.setVisible(1);
           
           this.idx = this.info.pro.length - 1;
            this.lbladdhp.setString("+"+(this.info.pro[this.idx].hp - this.info.pro[0].hp));
            this.lbladdattack.setString("+"+(this.info.pro[this.idx].attack - this.info.pro[0].attack));
            this.lbladddefense.setString("+"+(this.info.pro[this.idx].defense - this.info.pro[0].defense));
            this.lbladdheal.setString("+"+(this.info.pro[this.idx].heal - this.info.pro[0].heal));

            this.expbar.setScaleX(this.info.pro[this.idx].endexp/this.info.pro[this.idx].maxexp);

            return false;
};

resultlevelup.prototype.step = function(dt){
    this.elapsetime += dt;

    if(this.elapsetime <  EXP_ADD_TIME){
        this.expbar.setScaleX(this.endpercent*this.elapsetime/EXP_ADD_TIME);
    }
    else{
        this.expbar.setScaleX(this.endpercent);

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
            

            this.lbladdhp.runAction(cc.Sequence.create(cc.DelayTime.create(EXP_ADD_TIME),cc.Show.create(),cc.ScaleTo.create(EXP_ADD_TIME/2,1.5),cc.CallFunc.create(this.changeAddPro,this),cc.ScaleTo.create(EXP_ADD_TIME/2,1)));
            this.lbladdattack.runAction(cc.Sequence.create(cc.DelayTime.create(EXP_ADD_TIME),cc.Show.create(),cc.ScaleTo.create(EXP_ADD_TIME/2,1.5),cc.ScaleTo.create(EXP_ADD_TIME/2,1)));
            this.lbladddefense.runAction(cc.Sequence.create(cc.DelayTime.create(EXP_ADD_TIME),cc.Show.create(),cc.ScaleTo.create(EXP_ADD_TIME/2,1.5),cc.ScaleTo.create(EXP_ADD_TIME/2,1)));
            this.lbladdheal.runAction(cc.Sequence.create(cc.DelayTime.create(EXP_ADD_TIME),cc.Show.create(),cc.ScaleTo.create(EXP_ADD_TIME/2,1.5),cc.ScaleTo.create(EXP_ADD_TIME/2,1)));
    
        }

        if(this.idx < this.info.pro.length){
            this.rootNode.runAction(cc.Sequence.create(cc.DelayTime.create(0.7),cc.CallFunc.create(this.continueAnim,this)));
        }
        this.rootNode.unscheduleUpdate();

    }
};

resultlevelup.prototype.changeAddPro = function(){
    this.lbladdhp.setString("+"+(this.info.pro[this.idx].hp - this.info.pro[0].hp));
            this.lbladdattack.setString("+"+(this.info.pro[this.idx].attack - this.info.pro[0].attack));
            this.lbladddefense.setString("+"+(this.info.pro[this.idx].defense - this.info.pro[0].defense));
            this.lbladdheal.setString("+"+(this.info.pro[this.idx].heal - this.info.pro[0].heal));
}

resultlevelup.prototype.changeNextLevel = function(){
    this.nextlevel.setString("LV"+this.info.pro[this.idx].level);
}

resultlevelup.prototype.continueAnim = function(){
    this.elapsetime = 0;
    this.endpercent = info.pro[this.idx].endexp/info.pro[this.idx].maxexp;
    this.rootNode.scheduleUpdate();
}