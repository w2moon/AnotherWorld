
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

    getNature : function(){return this.dbobj.nature;},
    setNature : function(v){ this.dbobj.nature = v;},

    getSoulId : function(){return this.dbobj.soulid;},
    setSoulId : function(v){ this.dbobj.soulid = v;},

    getWeaponId : function(){return this.dbobj.weaponid;},
    setWeaponId : function(v){ this.dbobj.weaponid = v;},

    getClothId : function(){return this.dbobj.clothid;},
    setClothId : function(v){ this.dbobj.clothid = v;},

    getTrinketId : function(){return this.dbobj.trinketid;},
    setTrinketId : function(v){ this.dbobj.trinketid = v;},

    getImg : function(){return this.dbobj.img;},
    setImg : function(v){ this.dbobj.img = v;},

    //////////////////////////////////////////
    
    getOwner:function(){return this.owner;},
 
    getSkill1Base : function(){
        if(this.getSkill1Id() == 0){
            return null;
        } 
        return skillbase[this.getSkill1Id()-1];
    },
    getSkill2Base : function(){
        if(this.getSkill2Id() == 0){
            return null;
        } 
        return skillbase[this.getSkill2Id()-1];
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


    getSoul : function(){return this.owner.getSoul(this.getSoulId());},

    getWeapon : function(){return this.owner.getEquipment(this.getWeaponId());},
    getCloth : function(){return this.owner.getEquipment(this.getClothId());},
    getTrinket : function(){return this.owner.getEquipment(this.getTrinketId());},

    ////////////////////////////////////////////////////////////

    getProperty : function(name){
        var v = 0;
        if(this.getWeapon()){
            v += this.getWeapon().getBase()[name];
        }
        if(this.getCloth()){
            v += this.getCloth().getBase()[name];
        }
        if(this.getTrinket()){
            v += this.getTrinket().getBase()[name];
        }
        if(this.getSoul()){
            v += this.getSoul().getBase()[name];
        }
        return v;
    },

    getMaxHP : function(){ return this.getProperty("maxhp");},
    getAttack : function(){ return this.getProperty("attack");},
    getMagic : function(){ return this.getProperty("magic");},
    getDefense : function(){ return this.getProperty("defense");},
    getMagicDefense : function(){ return this.getProperty("magicdefense");},
    getSpeed : function(){ return this.getProperty("speed");},
    getDodge : function(){ return this.getProperty("dodge");},
    getCrit : function(){ return this.getProperty("crit");}

    //////////////////////////////////

   
};

var traveller = function(){
    this.init = function(player,cfg){
        //traveller.prototype.init.apply(this,[baseid])
        this.owner = player
        this.cfg = cfg
        this.hp = cfg.hp
        this.speed = cfg.speed
    }

    this.isDead = function(){
        return this.getHP() <= 0;
    }
    this.getName = function(){
        cc.log("soul"+this.getBase())
    }

    this.getOwner = function(){
        return this.owner;
    }
    this.getTargetType = function(){
        return this.cfg.targettype;
    }
     this.getTargetNum = function(){
        return this.cfg.targetnum;
    }
     this.getNature = function(){
        return this.cfg.nature;
    }
    this.getTargetNeedAlive = function(){
        return this.cfg.targetneedalive;
    }

    this.getMaxHP = function(){
        return this.cfg.hp
    }

    this.getHP = function(){
        return this.hp;
    }
    this.setHP = function(hp){
        if(hp<0){
            hp = 0;
        }
        this.hp = hp;
    }

    this.getSpeed = function(){
        return this.speed
    }

    this.getAttack = function(){
        return this.cfg.attack;
    }

    this.getDefense = function(){
        return this.cfg.defense;
    }

    this.getImg = function(){
        return this.cfg.img
    }

    this.defense = function(){
        this.card.defense()
    }
    
    this.attack = function(targets){
        this.card.attack()

        for(var k in targets){
            var damage = this.getAttack() - targets[k].getDefense()
            targets[k].setHP(targets[k].getHP()-damage)
            targets[k].card.setPercent(targets[k].getHP()/targets[k].getMaxHP())
            targets[k].defense()
            if(targets[k].getHP()<=0){
                targets[k].card.dead()
            }
        }

        return 1
    }
}
wl.extend(traveller,item)