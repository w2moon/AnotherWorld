var datapanel = function(){};

datapanel.prototype.onDidLoadFromCCB = function(){
    
      
    
    
};

datapanel.prototype.onCreate = function(traveller){

    this.traveller = traveller;

    this.lblhp.setString(this.traveller.getProperty("MaxHP"));
    this.lblattack.setString(this.traveller.getProperty("Attack"));
    this.lbldefense.setString(this.traveller.getProperty("Defense"));
    this.lblheal.setString(this.traveller.getProperty("Heal"));

    var skills = this.traveller.getSkills();
    this.h = 5;
    var y = this.dataheader.getPosition().y - this.dataheader.getContentSize().height/2;
    
    for(var k in skills){
        var bar = wl.load_scene("skillbar",skills[k]);
        bar.setPosition(cc.p(this.rootNode.getContentSize().width/2,y));
        this.rootNode.addChild(bar,-1);
        this.h += bar.controller.bg.getContentSize().height;
        y = y - bar.controller.bg.getContentSize().height;
    }
   // this.datapanel.setPosition(cc.p(0,h-this.datapanel.getContentSize().height/2));
};