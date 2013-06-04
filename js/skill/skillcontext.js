var skillcontext = function(skill,trigger,event_targets){
    this.skill = skill;
    this.selected = null;
    this.trigger = trigger;
    this.event_targets = event_targets;
};

skillcontext.prototype = {
    getSkill : function(){
        return this.skill;
    },
    setSelected : function(selected){
        this.selected = selected;
    },
    getSelected : function(){
        return selected;
    },
    getTrigger : function(){
        return this.trigger;
    },
    getEventTargets : function(){
        return this.event_targets;
    }
};