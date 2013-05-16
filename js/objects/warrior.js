wl.warrior = function(traveller){
    this.traveller = traveller;

    this.hp = 0;
};

wl.warrior.prototype = {
    battle_init : function(){
        this.setHP(this.getMaxHP());
    },

    getHP : function(){return this.hp;},
    setHP : function(hp){ 
        if(hp<0){
            hp=0;
        } 
        var old = this.hp;
        this.hp = hp;
        if(old < hp){
            wl.dispatcher.notify("hpinc"+this.traveller.getId(),this);
        }
        else if(old > hp){
            wl.dispatcher.notify("hpdec"+this.traveller.getId(),this);
        }
    },

    isDead : function(){return this.getHP() <= 0;},

    calc_damage : function(attacker,defenser){
        var damage = attacker.traveller.getAttack() - defenser.traveller.getDefense();
        if(damage < 0)
        {
            damage = 0;
        }
        return damage;
    },

    attack : function(targets){
        wl.dispatcher.notify("attack"+this.traveller.getId(),this);
        for(var k in targets){
            targets[k].defense(this);

            var damage = this.calc_damage(this,targets[k]);
            targets[k].setHP(targets[k].getHP()-damage)
        }
        return 1;
    },

    defense : function(attacker){
        wl.dispatcher.notify("defense"+this.getId(),this,attacker);
    }
};