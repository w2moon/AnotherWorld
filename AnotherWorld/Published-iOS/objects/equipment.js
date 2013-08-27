wl.equipment = function(dbobj){
    this.dbobj = dbobj;
};

wl.equipment.prototype = {
    getClass : function(){return "equipment";},
    setdbobj : function(dbobj){this.dbobj = dbobj;},
    getId : function(){return this.dbobj.id;},
    setId : function(id){ this.dbobj.id = id;},

    getBaseId : function(){return this.dbobj.baseid;},
    setBaseId : function(baseid){ this.dbobj.baseid = baseid;},

    getExp : function(){return this.dbobj.exp;},
    setExp : function(id){ this.dbobj.exp = exp;},

    getLevel : function(){return this.dbobj.level;},
    setLevel : function(level){ this.dbobj.level = level;},
    
    getMaxLevel : function(){
        return rarityclass[this.getBase().rarityclass].maxlevel;
    },

    getType : function(){
        return this.getBase().type;
    },

     isEquiped : function(){
        return this.dbobj.travellerid != 0;
        
    },

    //////////////////////////
    getBase : function() { return equipmentbase[this.dbobj.baseid];},
    getSkillId : function(){return this.getBase().skillid;},
    hasSkill : function(){ return this.getBase().skillid != 0;},

    isNew : function(){ return this.dbobj.isnew == 1;},
    notNew : function(){ this.dbobj.isnew = 0;},
    getSkillLevel : function(){return this.dbobj.skilllevel}
};

