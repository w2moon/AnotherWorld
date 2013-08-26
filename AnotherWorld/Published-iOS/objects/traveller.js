
wl.traveller = function(dbobj,owner){
    this.dbobj = dbobj;
    this.owner = owner;

    this.hp = 0;
}

wl.traveller.prototype = {
    getClass : function(){return "traveller";},

    setdbobj : function(dbobj){this.dbobj = dbobj;},

    copy : function(){
        return new wl.traveller(wl.copy(this.dbobj),this.owner);
    },

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
              
                skills.push([this.getEquip(i).getSkillId(),this.getEquip(i).getSkillLevel(),i]);
            }
        }
        if(this.getSoul() && this.getSoul().hasSkill()){
            skills.push([this.getSoul().getSkillId(),this.getSoul().getSkillLevel(),EQUIP_SOUL]);
        }
        if(this.getSkill1Id() != 0){
            skills.push([this.getSkill1Id(),this.getSkill1Level(),EQUIP_SKILL1]);
        }
        if(this.getSkill2Id() != 0){
            skills.push([this.getSkill2Id(),this.getSkill2Level(),EQUIP_SKILL2]);
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

    

    getWeaponrId : function(){return this.dbobj.weaponrid;},
    setWeaponrId : function(v){ this.dbobj.weaponrid = v;},

    getWeaponlId : function(){return this.dbobj.weaponlid;},
    setWeaponlId : function(v){ this.dbobj.weaponlid = v;},

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
        if(this.dbobj==null){
            var i = 0;
            var fun = arguments.callee;
            do {
                fun = fun.arguments.callee.caller;
                cc.log(++i + ': ' + fun);
            } while (fun);
        }
        if(this.dbobj.slot[pos] == 0){
            return null;
        }
        return this.owner.getEquipment(this.dbobj.slot[pos]);
    },

    getObject : function(pos){
        if(pos == EQUIP_SOUL){
            return this.getSoul();
        }
        return this.getEquip(pos);
    },

    setEquip : function(pos,equipid){
        this.dbobj.slot[pos] = equipid;
    },

    getProperty : function(name){
        var v = 0;
        var equip
        for(var i=0;i<EQUIP_NUM;++i)
        {
            equip = this.getEquip(i);
            if(equip != null){
                v += parseInt(equip.getBase()[name] * (equip.getLevel()/equip.getMaxLevel()));
            }
        }
        if(this.getSoul()){
            var soul = this.getSoul()
            if(soul!=null){
                v += parseInt(soul.getBase()[name]*(1+soul.getStar()*0.1)*(soul.getLevel()/soul.getMaxLevel()));
            }
        }
        v += this.dbobj[name]*this.getLevel() || 0;
        return v;
    },

    setProperty : function(name,value){
        this.dbobj[name] = value;
    }

   
};
