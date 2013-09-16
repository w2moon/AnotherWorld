var travellerinfo = function(){};

travellerinfo.prototype.onDidLoadFromCCB = function(){
    
      
    
    
};

travellerinfo.prototype.onCreate = function(traveller,copyed_traveller){
    this.oldtraveller = traveller;
    if(copyed_traveller == null)
    {
        this.traveller = traveller.copy();
    }
    else{
        this.traveller = copyed_traveller;
    }


    if(this.traveller.getSoulId() != 0){
        var soul = cc.Sprite.create(this.traveller.getSoul().getBase().icon);
        soul.setPosition(cc.p(this.soul_mask.getContentSize().width/2,this.soul_mask.getContentSize().height/2));
        this.soul_mask.addChild(soul);
    }
   
    if(this.traveller.getWeaponrId() != 0){
        var equip = cc.Sprite.create(this.traveller.getEquip(EQUIP_WEAPONR).getBase().icon);
        equip.setPosition(cc.p(this.weaponr_mask.getContentSize().width/2,this.weaponr_mask.getContentSize().height/2));
        this.weaponr_mask.addChild(equip);
    }
    
    if(this.traveller.getWeaponlId() != 0){
        var equip = cc.Sprite.create(this.traveller.getEquip(EQUIP_WEAPONL).getBase().icon);
        equip.setPosition(cc.p(this.weaponl_mask.getContentSize().width/2,this.weaponl_mask.getContentSize().height/2));
        this.weaponl_mask.addChild(equip);
    }

    if(this.traveller.getClothId() != 0){
        var equip = cc.Sprite.create(this.traveller.getEquip(EQUIP_CLOTH).getBase().icon);
        equip.setPosition(cc.p(this.cloth_mask.getContentSize().width/2,this.cloth_mask.getContentSize().height/2));
        this.cloth_mask.addChild(equip);
    }

    if(this.traveller.getTrinketId() != 0){
        var equip = cc.Sprite.create(this.traveller.getEquip(EQUIP_TRINKET).getBase().icon);
        equip.setPosition(cc.p(this.trinket_mask.getContentSize().width/2,this.trinket_mask.getContentSize().height/2));
        this.trinket_mask.addChild(equip);
    }

    
    

    

    if(!USE_CCB){
     this.rootNode.registerWithTouchDispatcher();
     }


     this.rootNode.onTouchesBegan = function( touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };
    this.rootNode.onMouseDown = function( event) {
        this.controller.onMouseDown(event);
        return true;
    };

};

travellerinfo.prototype.onTouchesBegan = function(touches,event)
{
	var loc = touches[0].getLocation();
	this.processClick(loc);
};

travellerinfo.prototype.onMouseDown = function(event)
{
	var loc = event.getLocation();
	this.processClick(loc);
};

travellerinfo.prototype.processClick = function(loc)
{
	this.onApply();

};

travellerinfo.prototype.onPressEquip = function(n){
    wl.run_scene("equipchoose",n.getTag(),this.oldtraveller,this.traveller);
};


travellerinfo.prototype.onApply = function(){
     var msg = wl.msg.create("traveller_modify");

     msg.id = this.oldtraveller.getId();

     var modified = false;

     if(this.traveller.getName() != this.oldtraveller.getName()){
        msg.name = this.traveller.getName();
        modified = true;
     }
     if(this.traveller.getSoulId() != this.oldtraveller.getSoulId()){
        msg.soul = this.traveller.getSoulId();
        modified = true;
     }
     if(this.traveller.getWeaponrId() != this.oldtraveller.getWeaponrId()){
        msg.weaponr = this.traveller.getWeaponrId();
        modified = true;
     }
     if(this.traveller.getWeaponlId() != this.oldtraveller.getWeaponlId()){
        msg.weaponl = this.traveller.getWeaponlId();
        modified = true;
     }
     if(this.traveller.getClothId() != this.oldtraveller.getClothId()){
        msg.cloth = this.traveller.getClothId();
        modified = true;
     }
      if(this.traveller.getTrinketId() != this.oldtraveller.getTrinketId()){
        msg.trinket = this.traveller.getTrinketId();
        modified = true;
     }
    
     if(modified){
        wl.http.send(msg,this.on_traveller_modify,this);
     }
     else{
        this.close();
     }
};


travellerinfo.prototype.on_traveller_modify = function(ret){
    if(ret.rc == retcode.OK){
        wl.gvars.role.addTraveller(ret.traveller);
        

        this.close();
    }
    else{
        cc.log("traveller modify fail:"+ret.rc)
    }
    
};

travellerinfo.prototype.close = function(){
    
    this.rootNode.animationManager.runAnimationsForSequenceNamed("popin");
    this.rootNode.animationManager.setCompletedAnimationCallback(this,this.on_fadeout_finish);
   
    wl.get_scene().controller.onTravellerBack(wl.gvars.role.getTravellerSlot(this.traveller.getId()));
};

travellerinfo.prototype.on_fadeout_finish = function(){
    wl.get_scene().controller.onTravellerModified(wl.gvars.role.getTravellerSlot(this.traveller.getId()));
    this.rootNode.removeFromParent();
};