wl.warrior = function(player,battlefield,traveller){
    this.player = player;
    this.battlefield = battlefield;
    this.traveller = traveller;

    this.hp = 0;
    this.maxhp = 0;
    this.energy = 0;
    this.maxenergy = 0;

    if(traveller.getSoul().getSkillBase() !== null){
        this.skillsoul = new wl.skill(this,battlefield,traveller.getSoul().getSkillLevel(),traveller.getSoul().getSkillBase());
    }
    else{
        this.skillsoul = null;
    }
    this.skillultimate = new wl.skill(this,battlefield,traveller.getSkill1Level(),traveller.getSkill1Base());
    this.skillpassive = new wl.skill(this,battlefield,traveller.getSkill2Level(),traveller.getSkill2Base());
};

wl.warrior.prototype = {
    battle_init : function(){
        this.setMaxHP(this.traveller.getMaxHP());
        this.setHP(this.traveller.getMaxHP());
        
        this.setMaxEnergy(this.traveller.getSoul().getBase().energy);
        this.setEnergy(0);
    },

    getPlayer : function(){
        return this.player;
    },

    getTraveller : function(){
        return this.traveller;
    },

    setEnergy : function(v){
        this.energy = v;
    },
    getEnergy : function(){
        return this.energy;
    },

    setMaxEnergy : function(v){
        this.maxenergy = v;
    },
    getMaxEnergy : function(){
        return this.maxenergy;
    },

    setMaxHP : function(v){
        this.maxhp = v;
    },
    getMaxHP : function(){
        return this.maxhp;
    },

    isSkillUltimateActived : function(){
        return this.getEnergy() >= this.getMaxEnergy();
    },

    
    getSkillSoul : function(){
        return this.skillsoul;
    },
    getSkillUltimate : function(){
        return this.skillultimate;
    },
    getSkillPassive : function(){
        return this.skillpassive;
    },

    getHP : function(){return this.hp;},
    setHP : function(hp){ this.hp = hp;},

    isDead : function(){return this.getHP() <= 0;},

    calc_damage : function(attacker,defenser){
        var damage = attacker.traveller.getAttack() - defenser.traveller.getDefense();
        if(damage <= 0)
        {
            damage = 1;
        }
        return damage;
    },

    action : function(){
        if(!this.isDead()){

                     
              if(this.isSkillUltimateActived())
              {
                    return this.getSkillUltimate().cast();
              }
              else
              {
                    return this.attack();
              }
         }
         return 0;
    },

    attack : function(){
     //  var targets = this.select_target(warrior.getTraveller().getOwner(),traveller,traveller.getTargetType(),traveller.getTargetNum(),traveller.getNature(),traveller.getTargetNeedAlive());

        var targets = this.battlefield.select_target(this.getPlayer(),this,0,1,this.getTraveller().getNature(),true);
                              
        this.energy++;

        wl.dispatcher.notify(this,"attack");
        for(var k in targets){
            targets[k].defense(this);

            var damage = this.calc_damage(this,targets[k]);
            targets[k].setHP(wl.clamp(targets[k].getHP()-damage,0,targets[k].getMaxHP()))

            wl.dispatcher.notify(targets[k],"hpdec",damage);
        }
        return 1;
    },

    defense : function(attacker){
        wl.dispatcher.notify(this,"defense");
    }
};