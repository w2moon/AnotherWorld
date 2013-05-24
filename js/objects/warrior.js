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
    this.buffs = [];

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
            cc.log(this.skills[k].isActiveSkill()+" "+this.skills[k].getNeedEnergy())
            if(this.skills[k].isActiveSkill() && this.skills[k].getNeedEnergy() > maxenergy){
                maxenergy = this.skills[k].getNeedEnergy();
            }
        }
        this.setMaxEnergy(maxenergy);
        this.setEnergy(0);
        wl.dispatcher.notify(this,"battle_init");
    },

    isEnemy : function(warrior){
        return this.getPlayer() != warrior.getPlayer();
    },

    isAlly : function(warrior){
        return this.getPlayer() == warrior.getPlayer();
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

        wl.dispatcher.notify(this,"incHP",v);
    },
    decHP : function(v){
        this.setHP(wl.clamp(this.getHP()-v,0,this.getMaxHP()))

        wl.dispatcher.notify(this,"decHP",v);
    },
    incMaxHP : function(v){
        this.setMaxHP(this.getMaxHP()+v)

        wl.dispatcher.notify(this,"incMaxHP",v);
    },
    decMaxHP : function(v){
        this.setMaxHP(wl.clamp(this.getMaxHP()-v,0,this.getMaxHP()))

        wl.dispatcher.notify(this,"decMaxHP",v);
    },

    incEnergy : function(v){
        this.setEnergy(wl.clamp(this.getEnergy()+v,0,this.getMaxEnergy()))

        wl.dispatcher.notify(this,"incEnergy",v);
    },
    decEnergy : function(v){
        this.setEnergy(wl.clamp(this.getEnergy()-v,0,this.getMaxEnergy()))

        wl.dispatcher.notify(this,"decEnergy",v);
    },
    incMaxEnergy : function(v){
        this.setMaxEnergy(this.getMaxEnergy()+v)

        wl.dispatcher.notify(this,"incMaxEnergy",v);
    },
    decMaxEnergy : function(v){
        this.setMaxEnergy(wl.clamp(this.getMaxEnergy()-v,0,this.getMaxEnergy()))

        wl.dispatcher.notify(this,"decMaxEnergy",v);
    },

    incExtraAttack : function(v){
        this.setExtraAttack(this.getExtraAttack()+v)

        wl.dispatcher.notify(this,"incExtraAttack",v);
    },
    decExtraAttack : function(v){
        this.setExtraAttack(this.getExtraAttack()-v)

        wl.dispatcher.notify(this,"decExtraAttack",v);
    },

    incExtraDefense : function(v){
        this.setExtraDefense(this.getExtraDefense()+v)

        wl.dispatcher.notify(this,"incExtraDefense",v);
    },
    decExtraDefense : function(v){
        this.setExtraDefense(this.getExtraDefense()-v)

        wl.dispatcher.notify(this,"decExtraDefense",v);
    },

    incExtraMagic : function(v){
        this.setExtraMagic(this.getExtraMagic()+v)

        wl.dispatcher.notify(this,"incExtraMagic",v);
    },
    decExtraMagic : function(v){
        this.setExtraMagic(this.getExtraMagic()-v)

        wl.dispatcher.notify(this,"decExtraMagic",v);
    },

    incExtraMagicDefense : function(v){
        this.setExtraMagicDefense(this.getExtraMagicDefense()+v)

        wl.dispatcher.notify(this,"incExtraMagicDefense",v);
    },
    decExtraMagicDefense : function(v){
        this.setExtraMagicDefense(this.getExtraMagicDefense()-v)

        wl.dispatcher.notify(this,"decExtraMagicDefense",v);
    },

    incExtraSpeed : function(v){
        this.setExtraSpeed(this.getExtraSpeed()+v)

        wl.dispatcher.notify(this,"incExtraSpeed",v);
    },
    decExtraSpeed : function(v){
        this.setExtraSpeed(this.getExtraSpeed()-v)

        wl.dispatcher.notify(this,"decExtraSpeed",v);
    },

    incExtraDodge : function(v){
        this.setExtraDodge(this.getExtraDodge()+v)

        wl.dispatcher.notify(this,"incExtraDodge",v);
    },
    decExtraDodge : function(v){
        this.setExtraDodge(this.getExtraDodge()-v)

        wl.dispatcher.notify(this,"decExtraDodge",v);
    },

    incExtraCrit : function(v){
        this.setExtraCrit(this.getExtraCrit()+v)

        wl.dispatcher.notify(this,"incExtraCrit",v);
    },
    decExtraCrit : function(v){
        this.setExtraCrit(this.getExtraCrit()-v)

        wl.dispatcher.notify(this,"decExtraCrit",v);
    },

    addBuff : function(buffid,trigger){

        var buffinfo = buffbase[buffid];
        
        if(buffinfo.multiple == 1)
        {
            var buff = null;
            for(var k in this.buffs){
                if(this.buffs[k].getId() == buffid
                && this.buffs[k].hasLink(trigger)){
                    buff = this.buffs[k];
                }
            }
            if(buff == null){
                buff = new wl.buff(this,this.battlefield,buffinfo);
                buff.addLink(trigger);
                this.buffs.push(buff);
            }
            else{
                if(buffinfo.stack > buff.getStack()){
                    buff.setStack( buff.getStack() + 1);
                }
            }
            
        }
        else{
            for(var k in this.buffs){
                if(this.buffs[k].getId() == buffid){
                   this.buffs[k].addLink(trigger);
                }
            }
        }
        
    },

    removeBuff : function(buffid,trigger){
        for(var k in this.buffs){
            if(this.buffs[k].getId() == buffid && this.buffs[k].hasLink(trigger)){
                this.buffs[k].removeLink(trigger);
                if(this.buffs[k].isCleared()){
                    this.buffs.splice(k,1);
                }
                return;
            }
        }
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
              this.skills[k].update();
        }
        var todelete = []
        for(var k in this.buffs){
              if(this.buffs[k].update()){
                    todelete.push(this.buffs[k]);
              }
        }
        for(var k in todelete){
            for(var i in this.buffs){
                if(this.buffs[i] === todelete[k]){
                    this.buffs.splice(i,1);
                    break;
                }
            }
        }
    },

    attack : function(){
     //  var targets = this.select_target(warrior.getTraveller().getOwner(),traveller,traveller.getTargetType(),traveller.getTargetNum(),traveller.getNature(),traveller.getTargetNeedAlive());

        var targets = this.battlefield.select_target(this.getPlayer(),this,0,1,this.getTraveller().getNature(),true);
                              
        this.incEnergy(1);

        for(var k in targets){
            targets[k].defense(this);

            var damage = this.calc_damage(this,targets[k]);
            targets[k].decHP(damage);
            
        }
        wl.dispatcher.notify(this,"attack",targets);
        return 1;
    },

    defense : function(attacker){
        wl.dispatcher.notify(this,"defense",[attacker]);
    },

    ///////////////////////////////
    on_event : function(){
        var args = Array.prototype.slice.call(arguments, 0);
         for(var k in this.skills){
                if(!this.skills[k].isActiveSkill()){
                    var arr = new Array();
                    arr.push(this.skills[k]);
                    arr.push(this.skills[k].on_event);
                    for(var i in args){
                        arr.push(args[i]);
                    }
                    this.battlefield.addTask.apply(this.battlefield,arr);
                }
         }
    }
   
};