
wl.skill = function(warrior,battlefield,level,skillbase,from){
    this.level = level;
    this.skillbase = skillbase;
    this.warrior = warrior;
    this.battlefield = battlefield;
    this.cooldown = 0;
    this.from = from;
    
};

wl.skill.prototype = {
    battle_init : function(){
        this.cooldown = 0;

    },

    getClass : function(){return "skill";},
    on_event : function(warrior,event,event_targets){
        if(this.getBase().event_id != event){
           
            return;
        }
       
        if((this.getBase().event_trigger == "ally_except_me"|| this.getBase().event_trigger == "all_except_me")
        && this.warrior == warrior){
         
            return;
        }
        else if(this.getBase().event_trigger == "self" && this.warrior != warrior){
            return;
        }
        else if( (this.getBase().event_trigger == "enemy" && !this.warrior.isEnemy(warrior))
        || (this.getBase().event_trigger != "enemy" && this.warrior.isEnemy(warrior))){
         
            return;
        }

       

        if(!this.canBeCast(warrior,event_targets)){
         
            return;
        }
        var fargs = Array.prototype.slice.call(arguments, 3);
        var args = [];
        args.push(warrior);
        args.push(event_targets);
        for(var k in fargs){
            args.push(fargs[k])
        }
       
       return this.cast.apply(this,args);
        //return this.cast(warrior,event_targets);

        
    },

    

    getBase : function(){
        return this.skillbase
    },

    getBattleField : function(){
        return this.battlefield;
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
        this.cooldown = parseInt(this.getBase().cooldown);
    },
    update : function(){
        this.cooldown--;
        if(this.cooldown<0){
            this.cooldown = 0;
        }
    },
    canBeCast : function(trigger,event_targets){
        if(wl.rand() > this.getBase().max_cast_rate)
        {
            return false;
        }
        if(!this.isActiveSkill() && this.warrior.isSkillDisabled()){
            
            return false;
        }
        if(this.warrior.energy < this.getBase().energy){
            return false;
        }
        if(this.cooldown !== 0){
            return false;
        }
        

        if(this.getBase().condition != ""){
            var conditions = parse_skill_params(this.getBase().condition);
            for(var k=0;k<conditions.length;++k){
               if(conditions[k][0] != "" && !this.isTargetValid(conditions[k][0],parseInt(conditions[k][2]),conditions[k][1] == "alive",trigger,event_targets)){
              
                    return false;
               }
            }
        }
       /* else{
            if(!this.isTargetValid(this.getBase().target1type,this.getBase().target1num,this.getBase().target1needalive,trigger,event_targets) 
            || !this.isTargetValid(this.getBase().target2type,this.getBase().target2num,this.getBase().target2needalive,trigger,event_targets)){
                return false;
            }
        }
        */
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
        if(this.getBase().energy != 0){
            this.warrior.decEnergy(this.getBase().energy);
        }
        cc.log(this.getBase().id)
        this.startCoolDown();
        var fargs = Array.prototype.slice.call(arguments, 2);
        var args = [];
        args.push(this);
        args.push(trigger);
        args.push(event_targets);
        for(var k in fargs){
            args.push(fargs[k])
        }
        if(this.getBase().action != "")
        {
            if(typeof(wl.skillactions[this.getBase().action]) != "function"){
                cc.log("not found function:"+this.getBase().action)
            }
            //wl.skillactions[this.getBase().action](this,trigger,event_targets);
             wl.skillactions[this.getBase().action].apply(wl.skillactions,args);
        }
        else 
        if(this.getBase().actions != ""){
            var actions = parse_skill_params(this.getBase().actions);
        }
        else
        {
            this.do_action_and_particle(this.warrior,this.getBase().useraction,this.getBase().userparticle);
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

        
            this.do_action_and_particle(this.battlefield,this.getBase().battlefieldaction,this.getBase().battlefieldparticle);
    
        }

        if(parseInt(this.skillbase.id/1000) > 2){
            this.warrior.getUI().controller.showUseSkill(lang(this.getBase().name));               
        }
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
        return this.skillbase.event_id == gameevent.action;
    },

    delay : function(dt){
        return dt;
    }



    

};