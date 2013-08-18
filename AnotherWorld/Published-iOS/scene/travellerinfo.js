var travellerinfo = function(){};

travellerinfo.prototype.onDidLoadFromCCB = function(){
    
      
    
    
};

travellerinfo.prototype.onCreate = function(traveller){
    cc.log(traveller.getProperty("MaxHP"))
    this.lblhp.setString(traveller.getProperty("MaxHP"));
    this.lblattack.setString(traveller.getProperty("Attack"));
    this.lbldefense.setString(traveller.getProperty("Defense"));
    this.lblheal.setString(traveller.getProperty("Heal"));
};