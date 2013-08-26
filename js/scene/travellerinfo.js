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

   // this.rootNode.registerScriptTouchHandler(2);
    this.rootNode.onTouchEnded = function(){cc.log("touched");}

    this.lblhp.setString(this.traveller.getProperty("MaxHP"));
    this.lblattack.setString(this.traveller.getProperty("Attack"));
    this.lbldefense.setString(this.traveller.getProperty("Defense"));
    this.lblheal.setString(this.traveller.getProperty("Heal"));

    var skills = this.traveller.getSkills();
    var h = 0;
    var y = 0;
    for(var k in skills){
        var bar = wl.load_scene("skillbar",skills[k]);
        bar.setPosition(cc.p(this.datapanel.getContentSize().width/2,y));
        this.datapanel.addChild(bar);
        h = h + this.dataheader.getContentSize().height;
        y = y + this.dataheader.getContentSize().height;
    }
    
    this.datapanel.setPosition(cc.p(0,this.datapanel.getPosition().y+h));
};

travellerinfo.prototype.onPressEquip = function(n){
   cc.log("equipchoose");
    wl.run_scene("equipchoose",n.getTag(),this.oldtraveller,this.traveller);
};


travellerinfo.prototype.onApply = function(traveller){
     var msg = wl.msg.create("traveller_modify");
     if(this.traveller.getName() != this.oldtraveller.getName()){
        msg.name = this.traveller.getName();
     }
     if(this.traveller.getSoulId() != this.oldtraveller.getSoulId()){
        msg.soul = this.traveller.getSoulId();
     }
     if(this.traveller.getWeaponrId() != this.oldtraveller.getWeaponrId()){
        msg.weaponr = this.traveller.getWeaponrId();
     }
     if(this.traveller.getWeaponlId() != this.oldtraveller.getWeaponlId()){
        msg.weaponl = this.traveller.getWeaponlId();
     }
     if(this.traveller.getClothId() != this.oldtraveller.getClothId()){
        msg.cloth = this.traveller.getClothId();
     }
     if(this.traveller.getTrinketId() != this.oldtraveller.getTrinketId()){
        msg.trinket = this.traveller.getTrinketId();
     }
    
     wl.http.send(msg,this.on_traveller_modify,this);
};


travellerinfo.prototype.on_traveller_modify = function(ret){
    if(ret.rc == retcode.OK){
        wl.gvars.role.addTraveller(ret.traveller);
    }
    else{
    }
};
