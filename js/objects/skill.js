
wl.skill = function(warrior,battlefield,level,skillbase){
    this.level = level;
    this.skillbase = skillbase;
    this.warrior = warrior;
    this.battlefield = battlefield;
    this.cooldown = 0;
    
};

wl.skill.prototype = {
    battle_init : function(){
        this.cooldown = 0;
    },
    getBase : function(){
        return this.skillbase
    },
    startCoolDown : function(){
        this.cooldown = this.getBase().cooldown;
    },
    stepCoolDown : function(){
        this.cooldown--;
        if(this.cooldown<0){
            this.cooldown = 0;
        }
    },
    canBeCast : function(){
        if(this.warrior.energy < this.getBase().energy){
            return false;
        }
        if(this.cooldown !== 0){
            return false;
        }
        return true;
    },
    cast : function(){
        this.warrior.setEnergy(this.warrior.getEnergy() - this.getBase().energy);
        this.startCoolDown();
        return 1;
    }
};