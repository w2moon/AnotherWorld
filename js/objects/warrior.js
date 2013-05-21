wl.warrior = function(player,battlefield,traveller){
    this.player = player;
    this.battlefield = battlefield;
    this.traveller = traveller;

    this.hp = 0;
    this.maxhp = 0;
    this.energy = 0;
    this.maxenergy = 0;

    this.extra_attack = 0;
    this.extra_defense = 0;
    this.extra_magic = 0;
    this.extra_magicdefense = 0;
    this.extra_speed = 0;
    this.extra_dodge = 0;
    this.extra_crit = 0;

    this.skills = [];

    if(traveller.getSoul().getSkillBase() !== null){
        this.skills.push( new wl.skill(this,battlefield,traveller.getSoul().getSkillLevel(),traveller.getSoul().getSkillBase()) );
    }
   
    if(traveller.getSkill1Base() != null){
        this.skills.push(  new wl.skill(this,battlefield,traveller.getSkill1Level(),traveller.getSkill1Base()));
    }
    if(traveller.getSkill2Base() != null){
        this.skills.push( new wl.skill(this,battlefield,traveller.getSkill2Level(),traveller.getSkill2Base()));
    }
};

wl.warrior.prototype = {
    battle_init : function(){
        this.setMaxHP(this.traveller.getMaxHP());
        this.setHP(this.traveller.getMaxHP());
        
        var maxenergy = 0;
        for(var k in this.skills){
            this.skills[k].battle_init();
            if(this.skills[k].isActiveSkill() && this.skills[k].getNeedEnergy() > maxenergy){
                maxenergy = this.skills[k].getNeedEnergy();
            }
        }
        this.setMaxEnergy(maxenergy);
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

    getHP : function(){
        return this.hp;
    },
    setHP : function(hp){ 
        this.hp = hp;
    },

    setMaxHP : function(v){
        this.maxhp = v;
    },
    getMaxHP : function(){
        return this.maxhp;
    },
///////////////////////////
    getAttack : function(){
        var attack = this.getBaseAttack() + this.getExtraAttack();
        if(attack < 0){
            return 0;
        }
        return attack;
    },
    getBaseAttack : function(){
        return this.traveller.getAttack();
    },
    getExtraAttack : function(){
        return this.extra_attack;
    },
    setExtraAttack : function(v){
        this.extra_attack = v;
    },

    getDefense : function(){
        var defense = this.getBaseDefense() + this.getExtraDefense();
        if(defense < 0){
            return 0;
        }
        return defense;
    },
    getBaseDefense : function(){
        return this.traveller.getDefense();
    },
    getExtraDefense : function(){
        return this.extra_defense;
    },
    setExtraDefense : function(v){
        this.extra_defense = v;
    },

    getMagic : function(){
        var magic = this.getBaseMagic() + this.getExtraMagic();
        if(magic < 0){
            return 0;
        }
        return magic;
    },
    getBaseMagic : function(){
        return this.traveller.getMagic();
    },
    getExtraMagic : function(){
        return this.extra_magic;
    },
    setExtraMagic : function(v){
        this.extra_magic = v;
    },

    getMagicDefense : function(){
        var magicdefense = this.getBaseMagicDefense() + this.getExtraMagicDefense();
        if(magicdefense < 0){
            return 0;
        }
        return magicdefense;
    },
    getBaseMagicDefense : function(){
        return this.traveller.getMagicDefense();
    },
    getExtraMagicDefense : function(){
        return this.extra_magicdefense;
    },
    setExtraMagicDefense : function(v){
        this.extra_magicdefense = v;
    },

    getSpeed : function(){
        var speed = this.getBaseSpeed() + this.getExtraSpeed();
        if(speed < 0){
            return 0;
        }
        return speed;
    },
    getBaseSpeed : function(){
        return this.traveller.getSpeed();
    },
    getExtraSpeed : function(){
        return this.extra_speed;
    },
    setExtraSpeed : function(v){
        this.extra_speed = v;
    },

    getDodge : function(){
        var dodge = this.getBaseDodge() + this.getExtraDodge();
        if(dodge < 0){
            return 0;
        }
        return dodge;
    },
    getBaseDodge : function(){
        return this.traveller.getDodge();
    },
    getExtraDodge : function(){
        return this.extra_dodge;
    },
    setExtraDodge : function(v){
        this.extra_dodge = v;
    },

    getCrit : function(){
        var crit = this.getBaseCrit() + this.getExtraCrit();
        if(crit < 0){
            return 0;
        }
        return crit;
    },
    getBaseCrit : function(){
        return this.traveller.getCrit();
    },
    getExtraCrit : function(){
        return this.extra_crit;
    },
    setExtraCrit : function(v){
        this.extra_crit = v;
    },
/////////////////////////////
    incHP : function(v){
        this.setHP(wl.clamp(this.getHP()+v,0,this.getMaxHP()))

        wl.dispatcher.notify(this,"inc_hp",v);
    },
    decHP : function(v){
        this.setHP(wl.clamp(this.getHP()-v,0,this.getMaxHP()))

        wl.dispatcher.notify(this,"decHP",v);
    },
    incMaxHP : function(v){
        this.setMaxHP(this.getMaxHP()+v)

        wl.dispatcher.notify(this,"inc_maxhp",v);
    },
    decMaxHP : function(v){
        this.setMaxHP(wl.clamp(this.getMaxHP()-v,0,this.getMaxHP()))

        wl.dispatcher.notify(this,"dec_maxhp",v);
    },

    incEnergy : function(v){
        this.setEnergy(wl.clamp(this.getEnergy()+v,0,this.getMaxEnergy()))

        wl.dispatcher.notify(this,"inc_eng",v);
    },
    decEnergy : function(v){
        this.setEnergy(wl.clamp(this.getEnergy()-v,0,this.getMaxEnergy()))

        wl.dispatcher.notify(this,"dec_eng",v);
    },
    incMaxEnergy : function(v){
        this.setMaxEnergy(this.getMaxEnergy()+v)

        wl.dispatcher.notify(this,"inc_maxeng",v);
    },
    decMaxEnergy : function(v){
        this.setMaxEnergy(wl.clamp(this.getMaxEnergy()-v,0,this.getMaxEnergy()))

        wl.dispatcher.notify(this,"dec_maxeng",v);
    },

    incExtraAttack : function(v){
        this.setExtraAttack(this.getExtraAttack()+v)

        wl.dispatcher.notify(this,"inc_extraattack",v);
    },
    decExtraAttack : function(v){
        this.setExtraAttack(this.getExtraAttack()-v)

        wl.dispatcher.notify(this,"dec_extraattack",v);
    },

    incExtraDefense : function(v){
        this.setExtraDefense(this.getExtraDefense()+v)

        wl.dispatcher.notify(this,"inc_extradefense",v);
    },
    decExtraDefense : function(v){
        this.setExtraDefense(this.getExtraDefense()-v)

        wl.dispatcher.notify(this,"dec_extradefense",v);
    },

    incExtraMagic : function(v){
        this.setExtraMagic(this.getExtraMagic()+v)

        wl.dispatcher.notify(this,"inc_extramagic",v);
    },
    decExtraMagic : function(v){
        this.setExtraMagic(this.getExtraMagic()-v)

        wl.dispatcher.notify(this,"dec_extramagic",v);
    },

    incExtraMagicDefense : function(v){
        this.setExtraMagicDefense(this.getExtraMagicDefense()+v)

        wl.dispatcher.notify(this,"inc_extramagicdefense",v);
    },
    decExtraMagicDefense : function(v){
        this.setExtraMagicDefense(this.getExtraMagicDefense()-v)

        wl.dispatcher.notify(this,"dec_extramagicdefense",v);
    },

    incExtraSpeed : function(v){
        this.setExtraSpeed(this.getExtraSpeed()+v)

        wl.dispatcher.notify(this,"inc_extraspeed",v);
    },
    decExtraSpeed : function(v){
        this.setExtraSpeed(this.getExtraSpeed()-v)

        wl.dispatcher.notify(this,"dec_extraspeed",v);
    },

    incExtraDodge : function(v){
        this.setExtraDodge(this.getExtraDodge()+v)

        wl.dispatcher.notify(this,"inc_extradodge",v);
    },
    decExtraDodge : function(v){
        this.setExtraDodge(this.getExtraDodge()-v)

        wl.dispatcher.notify(this,"dec_extradodge",v);
    },

    incExtraCrit : function(v){
        this.setExtraCrit(this.getExtraCrit()+v)

        wl.dispatcher.notify(this,"inc_extracrit",v);
    },
    decExtraCrit : function(v){
        this.setExtraCrit(this.getExtraCrit()-v)

        wl.dispatcher.notify(this,"dec_extracrit",v);
    },
    /////////////////////////////////////////////////////////////////

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

    

    isDead : function(){return this.getHP() <= 0;},

    calc_damage : function(attacker,defenser){
        var damage = attacker.getAttack() - defenser.getDefense();
        if(damage <= 0)
        {
            damage = 1;
        }
        return damage;
    },

    action : function(){
        if(!this.isDead()){

              for(var k in this.skills){
                if(this.skills[k].isActiveSkill() && this.skills[k].canBeCast()){
                    return this.skills[k].cast();
                }
              }
              
              return this.attack();
              
         }
         return 0;
    },

    newturn : function(){
    },

    endturn : function(){
        for(var k in this.skills){
              this.skills[k].stepCoolDown();
        }
    },

    attack : function(){
     //  var targets = this.select_target(warrior.getTraveller().getOwner(),traveller,traveller.getTargetType(),traveller.getTargetNum(),traveller.getNature(),traveller.getTargetNeedAlive());

        var targets = this.battlefield.select_target(this.getPlayer(),this,0,1,this.getTraveller().getNature(),true);
                              
        this.energy++;

        for(var k in targets){
            targets[k].defense(this);

            var damage = this.calc_damage(this,targets[k]);
            targets[k].decHP(damage);
            
        }
        wl.dispatcher.notify(this,"attack",this,targets);
        return 1;
    },

    defense : function(attacker){
        wl.dispatcher.notify(this,"defense",this,attacker);
    }

   
};