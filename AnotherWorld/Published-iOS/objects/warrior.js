wl.warrior = function(player,battlefield,traveller){
    this.player = player;
    this.battlefield = battlefield;
    this.traveller = traveller;

    this.guarder = null;

    this.ui = null;

    this.hp = 0;
    this.maxhp = 0;
    this.energy = 0;
    this.maxenergy = 0;


 
    this.base_property = {}
    this.extra_property = {}
    this.rate_property = {}

    this.skills = [];
    this.buffs = [];
    this.disabled = 0;
    this.skilldisabled = 0;

    this.modifier_damage_percent = 0;

    var skills = traveller.getSkills();
    for(var k in skills){
        this.skills.push(new wl.skill(this,this.battlefield,skills[k][1],skillbase[skills[k][0]],skills[k][2]))
    }

};

wl.warrior.prototype = {
    getClass : function(){return "warrior";},
    battle_init : function(ui){
        this.ui = ui;
        this.setMaxHP(this.traveller.getProperty("MaxHP"));
        this.setHP(this.traveller.getProperty("MaxHP"));
        
        var maxenergy = 3;
        /*
        for(var k in this.skills){
            this.skills[k].battle_init();
            if(this.skills[k].isActiveSkill() && this.skills[k].getNeedEnergy() > maxenergy){
                maxenergy = this.skills[k].getNeedEnergy();
            }
        }
        */
        this.setMaxEnergy(maxenergy);
        this.setEnergy(0);
        wl.dispatcher.notify(this,"battle_init");
    },

    getProperty : function(name){
        var v = (this.getBaseProperty(name) + this.getExtraProperty(name))*(1+this.getRateProperty(name));
        if( v < 0 ){
            return 0;
        }
        return v;
    },

    getBaseProperty : function(name){
        return (this.base_property[name] || 0)+this.traveller.getProperty(name);
    },
    incBaseProperty : function(name,v){
        if(this.base_property[name] == null){
            this.base_property[name] = 0;
        }
        this.base_property[name] += v;

        wl.dispatcher.notify(this,"inc"+name,v);
    },

    decBaseProperty : function(name,v){
        if(this.base_property[name] == null){
            this.base_property[name] = 0;
        }
        this.base_property[name] -= v;

        wl.dispatcher.notify(this,"dec"+name,v);
    },

    getExtraProperty : function(name){
        return this.extra_property[name] || 0;
    },

    incExtraProperty : function(name,v){
        if(this.extra_property[name] == null){
            this.extra_property[name] = 0;
        }
        this.extra_property[name] += v;

        wl.dispatcher.notify(this,"incExtra"+name,v);
    },

    decExtraProperty : function(name,v){
        if(this.extra_property[name] == null){
            this.extra_property[name] = 0;
        }
        this.extra_property[name] -= v;

        wl.dispatcher.notify(this,"decExtra"+name,v);
    },

    getRateProperty : function(name){
        return this.rate_property[name] || 0;
    },

    incRateProperty : function(name,v){
        if(this.rate_property[name] == null){
            this.rate_property[name] = 0;
        }
        this.rate_property[name] += v;

        wl.dispatcher.notify(this,"incRate"+name,v);
    },

    decRateProperty : function(name,v){
        if(this.rate_property[name] == null){
            this.rate_property[name] = 0;
        }
        this.rate_property[name] -= v;

        wl.dispatcher.notify(this,"decRate"+name,v);
    },

 

  



  
    getUI : function(){
        return this.ui;
    },

     getBattleField : function(){
        return this.battlefield;
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
  
    
/////////////////////////////
    incDisabled : function(v){
        this.disabled += v;
    },
    decDisabled : function(v){
        this.disabled -= v;
    },
    isDisabled : function(){
        return this.disabled > 0;
    },


    incSkillDisabled : function(v){
        this.skilldisabled += v;
    },
    decSkillDisabled : function(v){
        this.skilldisabled -= v;
    },
    isSkillDisabled : function(){
        return this.skilldisabled > 0;
    },

   

    incModifierDamagePercent : function(v){
        this.modifier_damage_percent += v;
        cc.log("modifier_damage_percent "+this.modifier_damage_percent)
    },
    decModifierDamagePercent : function(v){
        this.modifier_damage_percent -= v;
    },
    getModifierDamagePercent : function(){
        return this.modifier_damage_percent;
    },

    incHP : function(v){
        var isCrit = wl.rand() < this.getProperty("Crit");
        if(isCrit){
            v *=2;
        }
        this.setHP(wl.clamp(this.getHP()+v,0,this.getMaxHP()))

        wl.dispatcher.notify(this,"incHP",v,isCrit);
    },
    decHP : function(v){
        if(wl.rand() < this.getProperty("Dodge")){
            wl.dispatcher.notify(this,"dodge",v);
            return;
        }
        var isCrit = wl.rand() < this.getProperty("Crit");
        if(isCrit){
            v *=2;
        }
        this.setHP(wl.clamp(this.getHP()-v,0,this.getMaxHP()))

        wl.dispatcher.notify(this,"decHP",v,isCrit);

        if(this.isDead()){
            this.dead();
        }
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


    beDefender : function(attacker){
        wl.dispatcher.notify(this,"beDefender",[attacker]);
    },

    setGuarder : function(warrior){
        this.guarder = warrior;
    },

    getGuarder : function(){
        return this.guarder;
    },

    beGuarder : function(warrior){
        warrior.setGuarder(this);
        wl.dispatcher.notify(this,"beGuarder",[warrior]);
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
                    break;
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
                buff.refreshDuration();
            }
            
        }
        else{
            var isnew = true;
            for(var k in this.buffs){
                if(this.buffs[k].getId() == buffid){
                   this.buffs[k].addLink(trigger);
                   this.buffs[k].refreshDuration();
                   isnew = false;
                   break;
                }
            }
            if(isnew){
                var buff = new wl.buff(this,this.battlefield,buffinfo);
                buff.addLink(trigger);
                this.buffs.push(buff);
            }
        }
        
    },

    removeBuff : function(buffid,trigger){
        for(var k in this.buffs){
            if(this.buffs[k].getId() == buffid && this.buffs[k].hasLink(trigger)){
                this.buffs[k].removeLink(trigger);
                if(this.buffs[k].isCleared()){
                    this.buffs[k].destroy();
                    this.buffs.splice(k,1);
                }
                return;
            }
        }
    },

    clearBuffs : function(){
        for(var k in this.buffs){
            this.buffs[k].destroy();
        }
        this.buffs = [];
    },
    /////////////////////////////////////////////////////////////////

    

    isDead : function(){return this.getHP() <= 0;},

    dead : function() {
        this.clearBuffs();
        wl.dispatcher.notify(this,"dead");
    },

    

    calc_damage : function(attacker,defenser,protype,prorate){
        var damage = attacker.getProperty('Attack') - defenser.getProperty('Defense');
        damage = parseInt(damage*(1+defenser.getModifierDamagePercent()));
        if(damage <= 0)
        {
            damage = 1;
        }
        return damage;
    },

    calc_heal : function(healer,reciever,protype,prorate){
        var v = healer.getProperty('Heal');
        if(v < 0)
        {
            v = 0;
        }
        return v;
    },

    canAction : function(){
        if(this.isDisabled()){
            return false;
        }

        if(this.isDead()){
            return false;
        }

        return true;
    },

    action : function(){
        
              for(var k in this.skills){
                if(this.skills[k].isActiveSkill() && this.skills[k].canBeCast()){
                    return this.skills[k].cast();
                }
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

    attack : function(target,protype,prorate,nottriggerevent){
        var realtarget = target
        if(target.getGuarder() != null){
            realtarget = target.getGuarder();
            this.getBattleField().addTask(realtarget,realtarget.moveBack);
            target.setGuarder(null);
        }
       

        var damage = this.calc_damage(this,realtarget,protype,prorate);
        realtarget.decHP(damage);
            
      if(nottriggerevent !== true){
        wl.dispatcher.notify(this,"attack",[realtarget]);
    }
        

        
    },

    defense : function(attacker){
        if(this.getGuarder() != null){
             wl.dispatcher.notify(this.getGuarder(),"defense",[attacker]);
        }
        else{
             wl.dispatcher.notify(this,"defense",[attacker]);
        }
    },

    heal : function(target,protype,prorate,nottriggerevent){
        var realtarget = target
        var value = this.calc_heal(this,realtarget,protype,prorate)
        realtarget.incHP(value);
        if(nottriggerevent !== true){
            wl.dispatcher.notify(this,"heal",[realtarget],value);
        }
    },

    particle : function(particle){
         wl.dispatcher.notify(this,"particle",particle);
    },

   

    /////////////////////////////////////////////////////////
    moveTo : function(des){
        wl.dispatcher.notify(this,"moveTo",des);
    },
    moveBack : function(){
        wl.dispatcher.notify(this,"moveBack");
    },

    ///////////////////////////////
    on_event : function(){
        var args = Array.prototype.slice.call(arguments, 0);
        var tasks = [];
         for(var k in this.skills){
                if(!this.skills[k].isActiveSkill()){
                   // var arr = new Array();
                  //  arr.push(this.skills[k]);
                   // arr.push(this.skills[k].on_event);
                   // for(var i in args){
                  //      arr.push(args[i]);
                  //  }
                    //this.battlefield.addTaskTail.apply(this.battlefield,arr);
                    tasks.push([this.skills[k],this.skills[k].on_event,args]);

                    //this.skills[k].on_event.apply(this.skills[k],args);
                }
         }
         this.battlefield.addTasks(tasks);
    }
   
};