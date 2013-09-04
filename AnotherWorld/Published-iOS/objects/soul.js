
wl.soul = function(dbobj){
    this.dbobj = dbobj
};

wl.soul.prototype = {
    getClass : function(){return "soul";},
    setdbobj : function(dbobj){this.dbobj = dbobj;},
    getId : function(){return this.dbobj.id;},
    setId : function(id){ this.dbobj.id = id;},

    getIdx : function(){return EQUIP_SOUL;},

    getBaseId : function(){return this.dbobj.baseid;},
    setBaseId : function(baseid){ this.dbobj.baseid = baseid;},

    getExp : function(){return this.dbobj.exp;},
    setExp : function(id){ this.dbobj.exp = exp;},

    getLevel : function(){return this.dbobj.level;},
    setLevel : function(level){ this.dbobj.level = level;},
    
    getMaxLevel : function(){
        return rarityclass[this.getBase().rarityclass].maxlevel;
    },
    getMaxExp : function(){
        return wl.getLevelupExp(this.dbobj.level,this.getBase().rarityclass);
    },

    isEquiped : function(){
        return this.dbobj.travellerid != 0;
        
    },

     getProperty : function(name){
       
         return parseInt(soul.getBase()[name]*(1+soul.getStar()*0.1)*(soul.getLevel()/soul.getMaxLevel()));
        
    },

    addExp : function(v){
        var pro = []
           pro.push({level:this.dbobj.level,startexp:this.dbobj.exp,maxexp:this.getMaxExp(),endexp:this.dbobj.exp+v,hp:getProperty("MaxHP"),attack:getProperty("Attack"),defense:getProperty("Defense"),heal:getProperty("Heal")});
       
        this.dbobj.exp += v;
        while(this.dbobj.exp >= this.getMaxExp() && this.dbobj.level < this.getMaxLevel()){
            this.dbobj.exp -= this.getMaxExp();
            this.dbobj.level += 1;

             pro[pro.length-1].endexp = 0;
                
                if(this.dbobj.level == MAX_ROLE_LEVEL){
                    pro.push({level:this.dbobj.level,startexp:0,maxexp:0,endexp:0,hp:getProperty("MaxHP"),attack:getProperty("Attack"),defense:getProperty("Defense"),heal:getProperty("Heal")});
                }
                else{
                    pro.push({level:this.dbobj.level,startexp:0,maxexp:this.getMaxExp(),endexp:this.dbobj.exp,hp:getProperty("MaxHP"),attack:getProperty("Attack"),defense:getProperty("Defense"),heal:getProperty("Heal")});
                }
        }

        if(this.dbobj.level >= this.getMaxLevel()){
            this.dbobj.exp = 0;
        }

        return pro;
    },

    isNew : function(){ return this.dbobj.isnew == 1;},
    notNew : function(){ this.dbobj.isnew = 0;},

    getSkillExp : function(){return this.dbobj.skillexp;},
    setSkillExp : function(v){ this.dbobj.skillexp = v;},

    getSkillLevel : function(){return this.dbobj.skilllevel;},
    setSkillLevel : function(v){ this.dbobj.skilllevel = v;},

    getStar : function(){ return this.dbobj.star;},
    setStar : function(v){this.dbobj.star = v;},

    /////////////////

    getBase : function() {return soulbase[this.getBaseId()];},

    getSkeleton : function(){
        return parse_action_params(this.getBase().avatar)[0]
    },

     getAvatar : function(){
        var arr = parse_action_params(this.getBase().avatar);
        arr.shift();
        return arr;
    },

    getSkillId : function(){return this.getBase().skillid;},
    hasSkill : function(){ return this.getBase().skillid != 0;}
   
};