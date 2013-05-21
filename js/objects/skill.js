
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

        this.register_event()
    },
    register_event : function(){
        wl.dispatcher.register(this.warrior,this.getBase().eventid,this.on_event,this);
    },
    unregister_event : function(){
        wl.dispatcher.unregister(this.warrior,this.getBase().eventid,this.on_event,this);
    },

    on_event : function(){
        cc.log("event")
    },

    getBase : function(){
        return this.skillbase
    },

    getNeedEnergy : function(){
        return this.skillbase.energy;
    },

    getCoolDown : function(){
        return this.cooldown;
    },
    setCoolDown : function(v){
        this.cooldown = v;
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
        if(!this.isTargetValid(this.getBase().target1type,this.getBase().target1num,this.getBase().target1needalive) 
        || !this.isTargetValid(this.getBase().target2type,this.getBase().target2num,this.getBase().target2needalive)){
            return false;
        }
        return true;
    },
    isTargetValid : function(type,num,needalive){
        if(type == targettype.none){
            return true;
        }
        var targets = this.battlefield.select_target(this.warrior.getPlayer(),this.warrior,type,num,this.warrior.getTraveller().getNature(),needalive);
        return targets.length != 0;
    },
    cast : function(){
        this.warrior.setEnergy(this.warrior.getEnergy() - this.getBase().energy);
        this.startCoolDown();

        this.target_take_effect( this.getBase().target1type,
                                           this.getBase().target1num,
                                           this.getBase().target1needalive,
                                           this.getBase().target1action,
                                           this.getBase().target1particle,
                                           this.getBase().target1effecttype,
                                           this.getBase().target1effectvalue);
        this.target_take_effect(this.getBase().target2type,
                                          this.getBase().target2num,
                                          this.getBase().target2needalive,
                                          this.getBase().target2action,
                                          this.getBase().target2particle,
                                          this.getBase().target2effecttype,
                                          this.getBase().target2effectvalue);

        this.do_action_and_particle(this.warrior,this.getBase().useraction,this.getBase().userparticle);
        this.do_action_and_particle(this.battlefield,this.getBase().battlefieldaction,this.getBase().battlefieldparticle);
                            
        return this.getBase().duration;
    },

    target_take_effect : function(type,num,needalive,action,particle,effecttype,effectvalue){
        if(type == targettype.none){
            return;
        }
        var targets = this.battlefield.select_target(this.warrior.getPlayer(),this.warrior,type,num,this.warrior.getTraveller().getNature(),needalive);
        for(var k in targets){
            targets[k][effecttype](effectvalue);
            this.do_action_and_particle(targets[k],action,particle);
        }
    },

    do_action_and_particle : function(obj,action,particle){
        if(action != ""){
                wl.dispatcher.notify(obj,"action",action);
        }
        if(particle != ""){
                wl.dispatcher.notify(obj,"particle",particle);
        }
    },

    isActiveSkill : function(){
        return this.skillbase.triggertype == triggertype.active;
    },

    

    doEffect : function(){
    }
};