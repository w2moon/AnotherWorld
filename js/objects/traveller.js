
wl.traveller = function(dbobj,owner){
    this.dbobj = dbobj;
    this.owner = owner;

    this.hp = 0;
}

wl.traveller.prototype = {
    getId : function(){return this.dbobj.id;},
    setId : function(id){ this.dbobj.id = id;},

    getName : function(){return this.dbobj.name;},
    setName : function(name){ this.dbobj.name = name;},

    getExp : function(){return this.dbobj.exp;},
    setExp : function(id){ this.dbobj.exp = exp;},

    getLevel : function(){return this.dbobj.level;},
    setLevel : function(level){ this.dbobj.level = level;},

    getView : function(){return this.dbobj.view;},
    setView : function(view){ this.dbobj.view = view;},

    getNature : function(){return this.dbobj.nature;},
    setNature : function(v){ this.dbobj.nature = v;},

    getSoulId : function(){return this.dbobj.soulid;},
    setSoulId : function(v){ this.dbobj.soulid = v;},
    getSoul : function(){return this.owner.getSoul(this.getSoulId());},

    getImg : function(){return this.dbobj.img;},
    setImg : function(v){ this.dbobj.img = v;},

    getOwner : function(){return this.owner;},

    getSkills : function(){
        var skills = [];
        for(var i=0;i<EQUIP_NUM;++i)
        {
            var equip = this.getEquip(i);
            if(equip != null && equip.hasSkill()){
              
                skills.push([this.getEquip(i).getSkillId(),this.getEquip(i).getSkillLevel()]);
            }
        }
        if(this.getSoul() && this.getSoul().hasSkill()){
            skills.push([this.getSoul().getSkillId(),this.getSoul().getSkillLevel()]);
        }
        return skills;
    },

    ///////////////////////////////////////////////////////////

    getSkill1Id : function(){return this.dbobj.skill1id;},
    setSkill1Id : function(v){ this.dbobj.skill1id = v;},

    getSkill1Exp : function(){return this.dbobj.skill1exp;},
    setSkill1Exp : function(v){ this.dbobj.skill1exp = v;},

    getSkill1Level : function(){return this.dbobj.skill1level;},
    setSkill1Level : function(v){ this.dbobj.skill1level = v;},

    getSkill2Id : function(){return this.dbobj.skill2id;},
    setSkill2Id : function(v){ this.dbobj.skill2id = v;},

    getSkill2Exp : function(){return this.dbobj.skill2exp;},
    setSkill2Exp : function(v){ this.dbobj.skill2exp = v;},

    getSkill2Level : function(){return this.dbobj.skill2level;},
    setSkill2Level : function(v){ this.dbobj.skill2level = v;},

    

    getWeaponId : function(){return this.dbobj.weaponid;},
    setWeaponId : function(v){ this.dbobj.weaponid = v;},

    getClothId : function(){return this.dbobj.clothid;},
    setClothId : function(v){ this.dbobj.clothid = v;},

    getTrinketId : function(){return this.dbobj.trinketid;},
    setTrinketId : function(v){ this.dbobj.trinketid = v;},

   

    //////////////////////////////////////////
    
    
 
    getSkill1Base : function(){
        if(this.getSkill1Id() == 0){
            return null;
        } 
        return skillbase[this.getSkill1Id()];
    },
    getSkill2Base : function(){
        if(this.getSkill2Id() == 0){
            return null;
        } 
        return skillbase[this.getSkill2Id()];
    },
    /*
    getSkills : function(){
        var skills = []
        var soul = this.getSoul();
        var skill = soul.getSkillBase();
        if(skill != null){
            skills.push(new wl.skill(soul.getSkillLevel(),skill));
        }
        skill = this.getSkill1Base();
        if(skill != null){
            skills.push(new wl.skill(soul.getSkill1Level(),skill));
        }
        skill = this.getSkill2Base();
        if(skill != null){
            skills.push(new wl.skill(soul.getSkill2Level(),skill));
        }
    },
    */


    

    getWeapon : function(){return this.owner.getEquipment(this.getWeaponId());},
    getCloth : function(){return this.owner.getEquipment(this.getClothId());},
    getTrinket : function(){return this.owner.getEquipment(this.getTrinketId());},

   

    getMaxHP : function(){ return this.getProperty("maxhp");},
    getAttack : function(){ return this.getProperty("attack");},
    getMagic : function(){ return this.getProperty("magic");},
    getDefense : function(){ return this.getProperty("defense");},
    getMagicDefense : function(){ return this.getProperty("magicdefense");},
    getSpeed : function(){ return this.getProperty("speed");},
    getDodge : function(){ return this.getProperty("dodge");},
    getCrit : function(){ return this.getProperty("crit");},

    //////////////////////////////////

    ////////////////////////////////////////////////////////////
    //new
    getEquip : function(pos){
        return this.owner.getEquipment(this.dbobj.slot[pos]);
    },

    setEquip : function(pos,equipid){
        this.dbobj.slot[pos] = equipid;
    },

    getProperty : function(name){
        var v = 0;
        for(var i=0;i<EQUIP_NUM;++i)
        {
            v += this.getEquip(i).getBase()[name];
        }
        if(this.getSoul()){
            v += this.getSoul().getBase()[name];
        }
        v += this.dbobj[name] || 0;
        return v;
    },

    setProperty : function(name,value){
        this.dbobj[name] = value;
    }

   
};
