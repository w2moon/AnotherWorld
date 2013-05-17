var soul = function(){
    this.init = function(baseid){
        soul.prototype.init.apply(this,[baseid])
    }
    this.getName = function(){
        cc.log("soul"+this.getBase())
    }

    this.getImg = function(){
        return "soul.png"
    }
}
wl.extend(soul,item)


wl.soul = function(dbobj){
    this.dbobj = dbobj
};

wl.soul.prototype = {
    getId : function(){return this.dbobj.id;},
    setId : function(id){ this.dbobj.id = id;},

    getBaseId : function(){return this.dbobj.baseid;},
    setBaseId : function(baseid){ this.dbobj.baseid = baseid;},

    getExp : function(){return this.dbobj.exp;},
    setExp : function(id){ this.dbobj.exp = exp;},

    getLevel : function(){return this.dbobj.level;},
    setLevel : function(level){ this.dbobj.level = level;},


    getSkillExp : function(){return this.dbobj.skillexp;},
    setSkillExp : function(v){ this.dbobj.skillexp = v;},

    getSkillLevel : function(){return this.dbobj.skilllevel;},
    setSkillLevel : function(v){ this.dbobj.skilllevel = v;},

    /////////////////

    getBase : function() {return soulbase[this.dbobj.id-1];},
    getSkillBase : function() { 
        if(this.getBase().skillid == 0)
        {
            return null;
         }; 
         return skillbase[this.getBase().skillid-1];
    }
};