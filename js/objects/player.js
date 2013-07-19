

wl.player = function(role,battlefield){
    this.role = role;
    this.battlefield = battlefield;
    

    this.warriors = [];
    var travellers = role.getSlotTravellers();
    for(var k in travellers){
        if(travellers[k] != null){
            this.warriors.push(new wl.warrior(this,battlefield,travellers[k]));
        }
    }
};

wl.player.prototype = {
    getClass : function(){return "player";},
    battle_init : function(){
        for(var k in this.warriors){
            this.warriors[k].battle_init();
        }
    },
    isDead : function(){
        return this.warriors[0].isDead();
        /*
        for(var k in this.warriors){
            if(!this.warriors[k].isDead()){
                return false;
            }
        }
        return true;
        */
    },
    getWarriors : function(){
        return this.warriors;
    }
   
};