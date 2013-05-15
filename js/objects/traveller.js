
wl.traveller = function(dbobj,owner){
    this.dbobj = dbobj;
    this.owner = owner;
}

wl.traveller.prototype = {
    getOwner:function(){return this.owner;},

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
    setTrinketId : function(v){ this.dbobj.trinketid = v;}
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