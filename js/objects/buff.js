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
    getClass : function(){return "buff";},
    getId : function(){
        return this.buffbase.id;
    },
    getBase : function(){
        return this.buffbase;
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

    doLogic : function(logic,param,value){
        if(logic == ""){
            return;
        }
        var tmp = parse_skill_params(logic)
        var arr = tmp[i].slice(1)
        arr.push(this.triggers[0])
        for(var i=1;i<tmp.length;++i){
            
            this.warrior[tmp[i][0]].apply(this.warrior,arr)
        }

        /*
        if(param == ""){
            this.warrior[logic](value);
        }
        else{
            this.warrior[logic](param,value);
        }
        */
    },

    setStack : function(s){
        if(s!=this.stack){
            this.doLogic(this.buffbase.startlogic,this.buffbase.startparam,this.buffbase.startvalue*(s-this.stack));
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
        this.doLogic(this.buffbase.startlogic,this.buffbase.startparam,this.buffbase.startvalue*this.stack);
       
        this.do_action_and_particle(this.warrior,this.buffbase.startaction,this.buffbase.startparticle);
    },
    on_interval : function(){
        this.doLogic(this.buffbase.intervallogic,this.buffbase.intervalparam,this.buffbase.intervalvalue*this.stack);
        this.do_action_and_particle(this.warrior,this.buffbase.intervalaction,this.buffbase.intervalparticle);
    },
    on_end : function(){
        this.doLogic(this.buffbase.endlogic,this.buffbase.endparam,this.buffbase.endvalue*this.stack);
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