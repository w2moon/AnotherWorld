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
    
    getMaxExp : function(){
        return wl.getLevelupExp(this.getLevel(),this.getBase().rarityclass);
    },
    getMaxLevel : function(){
        return rarityclass[this.getBase().rarityclass].maxlevel;
    },

    getType : function(){
        return this.getBase().type;
    },

     isEquiped : function(){
        return this.dbobj.travellerid != 0;
        
    },

    getTravellerId : function(){
        return this.dbobj.travellerid;
    },

    //////////////////////////
    getBase : function() { return equipmentbase[this.dbobj.baseid];},
    getSkillId : function(){return this.getBase().skillid;},
    hasSkill : function(){ return this.getBase().skillid != 0;},

    isNew : function(){ return this.dbobj.isnew == 1;},
    notNew : function(){ this.dbobj.isnew = 0;},
    getSkillLevel : function(){return this.dbobj.skilllevel},

    getProperty : function(proname){
        return parseInt(this.getBase()[proname]*(this.getLevel()/this.getMaxLevel()));
    }
};

