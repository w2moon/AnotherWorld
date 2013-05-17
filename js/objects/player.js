

wl.player = function(role,battlefield){
    this.role = role;
    this.battlefield = battlefield;
    
    this.warriors = [];
    var travellers = role.getSlotTravellers();
    for(var k in travellers){
        this.warriors.push(new wl.warrior(this,battlefield,travellers[k]));
    }
};

wl.player.prototype = {
    battle_init : function(){
        for(var k in this.warriors){
            this.warriors[k].battle_init();
        }
    },
    isDead : function(){
        for(var k in this.warriors){
            if(!this.warriors[k].isDead()){
                return false;
            }
        }
        return true;
    },
    getWarriors : function(){
        return this.warriors;
    },
};