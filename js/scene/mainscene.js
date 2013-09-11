var mainscene = function(){};

var NORMAL_LAYER = 1;
var MASK_LAYER = 2;
var INFO_LAYER = 3;

mainscene.prototype.onDidLoadFromCCB = function(){
       cc.log(wl.gvars.role.getLevelInfo().maxexp)
    this.lbl_name.setString(wl.gvars.role.getName());
    this.lbl_level.setString(wl.gvars.role.getLevel());
    this.lbl_gold.setString(wl.gvars.role.getGold());
    this.lbl_copper.setString(wl.gvars.role.getCopper());
    this.lbl_energy_value.setString(wl.gvars.role.getHP()+"/"+wl.gvars.role.getMaxHP());
    
    this.exp_bar.setScaleX(wl.gvars.role.getExp()/wl.gvars.role.getMaxExp());
    
    //this.energy_bar.setScaleX();
    
    for(var i=1;i<=SLOT_NUM;++i){
        var travellerid = wl.gvars.role["getSlot"+i]();
        if(travellerid == 0){
            this["slot"+i].setVisible(false);
            continue;
        }
        this["slot"+i].setVisible(true);

        var traveller = wl.gvars.role.getTraveller(travellerid);
        this["card"+i] = wl.load_scene("uicard",traveller.getSoul().getSkeleton(),traveller.getSoul().getAvatar(),traveller.getImg());
        this["card"+i].setPosition(this.menu.convertToWorldSpace(this["slot"+i].getPosition()));
        this.rootNode.addChild(this["card"+i]);

        /*
        info={traveller:traveller,mainreward:[1,"addGold",20],rewards:[[1,"addGold",100],[1,"addEquip",1]],pro:[{level:1,hp:10,attack:10,defense:10,heal:10,startexp:20,maxexp:100,endexp:100},{level:2,hp:11,attack:11,defense:11,heal:11,startexp:0,maxexp:200,endexp:200},{level:3,hp:12,attack:12,defense:12,heal:12,startexp:0,maxexp:100,endexp:50}]}
        var t = wl.load_scene("resultreward",info);
        var c = this.rootNode.getContentSize();
        t.setPosition(cc.p(c.width/2,c.height/2));
        t.controller.playAnim();
        this.rootNode.addChild(t);
        */
      //  this.rootNode.scheduleOnce(function(){t.controller.endAnim();},1);
        

    }
    
    this.maskbg.setZOrder(MASK_LAYER);

    
    
};

mainscene.prototype.onCreate = function(newtraveller){
    
    if(newtraveller != null){
        var slot = wl.gvars.role.getTravellerSlot(newtraveller.getId());
        cc.log(slot)
        cc.log(newtraveller.getId())
        if(slot != null){
            this.showSlotInfo(slot,newtraveller);
        }
    }
};


mainscene.prototype.onPressSlot = function(n){
    this.showSlotInfo(n.getTag());
};

mainscene.prototype.showSlotInfo = function(slot,newtraveller){
    this.menu.setEnabled(false);
    this.maskbg.setVisible(true);
    
     var traveller = wl.gvars.role.getTraveller(wl.gvars.role["getSlot"+slot]());
    var info = wl.load_scene("travellerinfo",traveller,newtraveller);
    var p1 = this["card"+slot].getPosition();
    var p2 = info.getContentSize();
    info.setPosition(cc.p(-p2.width/2,-p2.height/2));
    this["card"+slot].addChild(info);
    
    this["card"+slot].setZOrder(INFO_LAYER);
    
    var size = this.rootNode.getContentSize();
    this["card"+slot].runAction(cc.MoveTo.create(0.2,cc.p(size.width/2,size.height/2)));
    
   
    if(newtraveller){
        traveller = newtraveller;
    }
    this.datapanel = wl.load_scene("datapanel",traveller);
    this.datapanel.setZOrder(INFO_LAYER);
    this.rootNode.addChild(this.datapanel);

    this.datapanel.setPosition(cc.p(0,-(this.datapanel.controller.dataheader.getContentSize().height/2+size.height/2)));
    this.datapanel.runAction(cc.MoveTo.create(0.2,cc.p(0,this.datapanel.controller.h-size.height/2)));
};

mainscene.prototype.onShowMainMap = function(){
    this.rootNode.animationManager.runAnimationsForSequenceNamed("fadeout");
    this.rootNode.animationManager.setCompletedAnimationCallback(this,this.on_fadeout_finish);
    
    for(var i=1;i<=SLOT_NUM;++i){
        if(this["card"+i] == null){
            continue;
        }
        this["card"+i].controller.playAnim("move",true);
        var curp = this["card"+i].getPosition();
        this["card"+i].runAction(cc.MoveTo.create(0.2,cc.p(curp.x+30,curp.y-330)));
    }
    
};

mainscene.prototype.on_fadeout_finish = function(){
    wl.run_scene("mapcontainer",0);
};

mainscene.prototype.onTravellerBack = function(slot){
    this["card"+slot].runAction(cc.MoveTo.create(0.2,this.menu.convertToWorldSpace(this["slot"+slot].getPosition())));
    this.datapanel.runAction(cc.MoveTo.create(0.2,cc.p(0,-(this.datapanel.controller.dataheader.getContentSize().height/2+this.rootNode.getContentSize().height/2))));
};

mainscene.prototype.onTravellerModified = function(slot){
    this["card"+slot].setZOrder(NORMAL_LAYER);
    
    this.datapanel.removeFromParent();
    
    this.menu.setEnabled(true);
    this.maskbg.setVisible(false);
};

mainscene.prototype.onSoulCombine = function(){
    cc.log("combinesoul")
    wl.run_scene("combinesoul");
};

mainscene.prototype.onSoulStarup = function(){
    cc.log("starupsoul")
    wl.run_scene("starupsoul");
};

mainscene.prototype.onEquipMake = function(){
     cc.log("equipmake")
    wl.run_scene("equipmake");
};

mainscene.prototype.onEquipStarup = function(){
    cc.log("equipstarup")
    wl.run_scene("equipstarup");
};


