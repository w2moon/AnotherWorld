
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

    on_event : function(warrior,event,event_targets){   
        if(this.getBase().eventid != event){
            return;
        }
        if(this.getBase().eventisenemy != warrior.isEnemy(warrior)){
            return;
        }

        if(this.getBase().eventisself == 1 && this.warrior != warrior){
            cc.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!self")
            return;
        }

        if(!this.canBeCast(warrior,event_targets)){
            return;
        }
        cc.log("event:"+event+" "+this.getBase().eventisself)

        this.cast(warrior,event_targets);

        
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
    canBeCast : function(trigger,event_targets){
        if(this.warrior.energy < this.getBase().energy){
            return false;
        }
        if(this.cooldown !== 0){
            return false;
        }
        if(!this.isTargetValid(this.getBase().target1type,this.getBase().target1num,this.getBase().target1needalive,trigger,event_targets) 
        || !this.isTargetValid(this.getBase().target2type,this.getBase().target2num,this.getBase().target2needalive,trigger,event_targets)){
            return false;
        }
        return true;
    },
    isTargetValid : function(type,num,needalive,trigger,event_targets){
        if(type == targettype.none){
            return true;
        }
        var targets = this.battlefield.select_target(this.warrior.getPlayer(),this.warrior,type,num,this.warrior.getTraveller().getNature(),needalive,trigger,event_targets);
        return targets.length != 0;
    },
    cast : function(trigger,event_targets){
        this.warrior.setEnergy(this.warrior.getEnergy() - this.getBase().energy);
        this.startCoolDown();

        this.target_take_effect( this.getBase().target1type,
                                           this.getBase().target1num,
                                           this.getBase().target1needalive,
                                           this.getBase().target1action,
                                           this.getBase().target1particle,
                                           this.getBase().target1effecttype,
                                           this.getBase().target1effectvalue,trigger,event_targets);
        this.target_take_effect(this.getBase().target2type,
                                          this.getBase().target2num,
                                          this.getBase().target2needalive,
                                          this.getBase().target2action,
                                          this.getBase().target2particle,
                                          this.getBase().target2effecttype,
                                          this.getBase().target2effectvalue,trigger,event_targets);

        this.do_action_and_particle(this.warrior,this.getBase().useraction,this.getBase().userparticle);
        this.do_action_and_particle(this.battlefield,this.getBase().battlefieldaction,this.getBase().battlefieldparticle);
                            
        return this.getBase().duration;
    },

    target_take_effect : function(type,num,needalive,action,particle,effecttype,effectvalue,trigger,event_targets){
        if(type == targettype.none){
            return;
        }
        var targets = this.battlefield.select_target(this.warrior.getPlayer(),this.warrior,type,num,this.warrior.getTraveller().getNature(),needalive,trigger,event_targets);
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
        return this.skillbase.eventid == triggertype.active;
    }

    

};