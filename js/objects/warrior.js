wl.warrior = function(player,battlefield,traveller){
    this.player = player;
    this.battlefield = battlefield;
    this.traveller = traveller;

    this.hp = 0;
    this.maxhp = 0;
    this.energy = 0;
    this.maxenergy = 0;

    this.extra_attack = 0;

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
            if(this.skills[k].getBase().energy > maxenergy){
                maxenergy = this.skills[k].getBase().energy;
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

    setMaxHP : function(v){
        this.maxhp = v;
    },
    getMaxHP : function(){
        return this.maxhp;
    },

    incHP : function(v){
        this.setHP(wl.clamp(this.getHP()+v,0,this.getMaxHP()))

        wl.dispatcher.notify(this,"inc_hp",v);
    },
    decHP : function(v){
        this.setHP(wl.clamp(this.getHP()-v,0,this.getMaxHP()))

        wl.dispatcher.notify(this,"dec_hp",v);
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

              for(var k in this.skills){
                if(this.skills[k].canBeCast()){
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

        wl.dispatcher.notify(this,"attack");
        for(var k in targets){
            targets[k].defense(this);

            var damage = this.calc_damage(this,targets[k]);
            targets[k].decHP(damage);
            
        }
        return 1;
    },

    defense : function(attacker){
        wl.dispatcher.notify(this,"defense");
    }
};