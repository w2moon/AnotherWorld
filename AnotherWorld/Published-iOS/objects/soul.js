
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

    addExp : function(v){
        this.dbobj.exp += v;
        while(this.dbobj.exp >= this.getMaxExp() && this.dbobj.level < this.getMaxLevel()){
            this.dbobj.exp -= this.getMaxExp();
            this.dbobj.level += 1;
        }

        if(this.dbobj.level >= this.getMaxLevel()){
            this.dbobj.exp = 0;
        }
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