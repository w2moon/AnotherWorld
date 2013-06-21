wl.buff = function(warrior,battlefield,buffbase){
    this.warrior = warrior;
    this.battlefield = battlefield;
    this.buffbase = buffbase;

    this.triggers = [];

    this.stack = 1;

    this.resttime = this.buffbase.duration+1;
    this.intervaltime = this.buffbase.interval;


   // this.on_start();
    this.addTask(this.on_start);
};

wl.buff.prototype = {

    getId : function(){
        return this.buffbase.id;
    },

    addLink : function(trigger){
        this.triggers.push(trigger);
    },
    removeLink : function(trigger){
        for(var k in this.triggers){
            if(this.triggers[k] === trigger){
                this.triggers.splice(k,1);
                return;
            }
        }
    },
    hasLink : function(trigger){
        for(var k in this.triggers){
            if(this.triggers[k] === trigger){
                return true;
            }
        }
        return false;
    },

    isCleared : function(){
        return this.triggers.length == 0;
    },

    destroy : function(){
        this.addTask(this.on_end);
    },

    getStack : function(){
        return this.stack;
    },

    setStack : function(s){
        if(s!=this.stack){
            if(this.buffbase.startlogic != ""){
                this.warrior[this.buffbase.startlogic](this.buffbase.startvalue*(s-this.stack));
            }
        }
        this.stack = s;
    },

    update : function(){
        if(this.buffbase.interval != -1){
            this.intervaltime--;
            if(this.intervaltime == 0){
                this.intervaltime = this.buffbase.interval;
                //this.on_interval();
                this.addTask(this.on_interval);
            }
        }
        if(this.buffbase.duration != -1){
            this.resttime--;
            if(this.resttime == 0){
                //this.on_end();
                this.addTask(this.on_end);
                return true;//to delete
            }
        }
        return false;
        
    },

    refreshDuration : function(){
        this.resttime = this.buffbase.duration+1;
    },

    on_start : function(){
    cc.log("start buff"+this.buffbase.startaction+" "+this.buffbase.id)
        if(this.buffbase.startlogic == ""){
            return;
        }
        this.warrior[this.buffbase.startlogic](this.buffbase.startvalue*this.stack);
        this.do_action_and_particle(this.warrior,this.buffbase.startaction,this.buffbase.startparticle);
    },
    on_interval : function(){
    cc.log("interval buff")
        if(this.buffbase.intervallogic == ""){
            return;
        }
        this.warrior[this.buffbase.intervallogic](this.buffbase.intervalvalue*this.stack);
        this.do_action_and_particle(this.warrior,this.buffbase.intervalaction,this.buffbase.intervalparticle);
    },
    on_end : function(){
    cc.log("end buff")
        if(this.buffbase.endlogic == ""){
            return;
        }
        this.warrior[this.buffbase.endlogic](this.buffbase.endvalue*this.stack);
        this.do_action_and_particle(this.warrior,this.buffbase.endaction,this.buffbase.endparticle);
    },

     do_action_and_particle : wl.skill.prototype.do_action_and_particle,

     addTask : function(func){
        var arr = new Array();
        arr.push(this);
        arr.push(func);
        this.battlefield.addTask.apply(this.battlefield,arr);
     }
      
};