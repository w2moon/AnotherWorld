wl.empty_role = function(name,userid){
    
    return {
    userid:userid || "1",
    name:name,
    id:wl.local_id(),
    exp:0,
    level:0,
    hp:rolelevel[1].maxhp,
    copper:rolecfg.initCopper,
    gold:rolecfg.initGold,
    charged:0,
    lastseed:0,
    slot1:0,
    slot2:0,
    slot3:0,
    slot4:0,
    slot5:0,
    extrasoulnum:0,
    extraequipmentnum:0,
    extratravellernum:0,
    date_lastupdate:0,
    date_lastenter:0,
    date_create:0,
    travellers:[],
    souls:[],
    equipments:[],
    stages:{},
    blueprints:[],
    materials:{},
    meeted:[]
    };
};

wl.create_equip = function(baseid){
    return {
    id:wl.local_id(),
    baseid : baseid,
    travellerid : 0,
    star : 0,
    exp : 0,
    level : 1,
    skillexp : 0,
    skilllevel : 1
    };
};

wl.create_soul = function(baseid){
    return {
    id:wl.local_id(),
    baseid : baseid,
    travellerid : 0,
    exp : 0,
    level : 1,
    skillexp : 0,
    skilllevel : 1
    };
};

wl.merge_reward = function(ret,lr){
            ret.equipments.concat(lr.equipments);
            ret.souls.concat(lr.souls);
            ret.blueprints.concat(lr.blueprints);
            ret.materials = wl.dict_add(ret.materials,lr.materials);
            ret.addexp += lr.addexp;
            ret.addhp += lr.addhp;
            ret.addcopper += lr.addcopper;
            ret.addgold += lr.addgold;
            ret.addlevel += lr.addlevel;
            ret.addextrasoulnum += lr.addextrasoulnum;
            ret.addextraequipmentnum += lr.addextraequipmentnum;
            ret.addextratravellernum += lr.addextratravellernum;
};

wl.virtual_role_save = function(){
    var role = {};
    for(var k in wl.gvars.role.dbobj){
        if(wl.gvars.role.dbobj[k] == null){
            continue;
        }
        if(typeof(wl.gvars.role.dbobj[k]) != "object"){
            role[k] = wl.gvars.role.dbobj[k];
        }
        else if(wl.gvars.role.dbobj[k].length == null){
            role[k] = {};
            for(var i in wl.gvars.role.dbobj[k]){
                role[k][i] = wl.gvars.role.dbobj[k][i];
            }
        }
        else{
            role[k] = [];
            for(var i in wl.gvars.role.dbobj[k]){
                if( typeof(wl.gvars.role.dbobj[k][i]) != "object"){
                    role[k].push(wl.gvars.role.dbobj[k][i]);
                }
                else if(wl.gvars.role.dbobj[k][i].dbobj != null)
                {
                    role[k] = wl.gvars.role.dbobj[k][i].dbobj;
                }
                else{
                    cc.log("virtual save:"+k+" "+i);
                }
            }
        }
    }
    for(var k in wl.gvars.role){
        if(k == "dbobj"){
            continue;
        }
        
        if(typeof(wl.gvars.role[k]) == "function"){
             continue;
        }
        if(wl.gvars.role[k].length == null){
            role[k] = {};
            for(var i in wl.gvars.role[k]){
                
                role[k][i] = wl.gvars.role[k][i];
            }
        }
        else{
            role[k] = [];
            for(var i in wl.gvars.role[k]){
                if( typeof(wl.gvars.role[k][i]) != "object"){
                    role[k].push(wl.gvars.role[k][i]);
                }
                else if(wl.gvars.role[k][i].dbobj != null)
                {
                    role[k].push(wl.gvars.role[k][i].dbobj);
                }
                else{
                    cc.log("virtual save:"+k+" "+i);
                }
            }
        }
    }
    wl.set("role_"+wl.gvars.role.getUserId(),wl.toJSONString(role));
};

wl.addReward = function(reward,level){
    var ret = {
        addexp:0,
        addhp:0,
        addcopper:0,
        addgold:0,
        addlevel:0,
        addextrasoulnum:0,
        addextraequipmentnum:0,
        addextratravellernum:0,
        equipments:[],
        souls:[],
        blueprints:[],
        materials:{}
    };
    for(var k in reward){
        if(wl.rand() >= reward[k][0]){
            continue;
        }
        switch(reward[k][1])
        {
        case "addEquip":
            ret.equipments.push(wl.create_equip(reward[k][2]));
        break;
        case "addSoul":
            ret.souls.push(wl.create_soul(reward[k][2]));
        break;
        case "addBlueprint":
            ret.blueprints.push(reward[k][2]);
        break;
        case "addMaterial":
            
            if(ret.materials[reward[k][2]] == null){
                ret.materials[reward[k][2]] = wl.tonumber(reward[k][3]);
            }
            else{
                ret.materials[reward[k][2]] += wl.tonumber(reward[k][3]);
            }
            
        break;
        case "addExp":
            ret.addexp = ret.addexp + reward[k][2]*level;
        break;
         case "addHP":
            ret.addhp = ret.addhp + reward[k][2];
        break;
        case "addCopper":
            ret.addcopper = ret.addcopper + reward[k][2]*level;
        break;
        case "addGold":
            ret.addgold = ret.addgold + reward[k][2];
        break;
        case "addLevel":
            ret.addlevel = ret.addlevel + reward[k][2];
        break;
        case "addExtraSoulNum":
            ret.addextrasoulnum = ret.addextrasoulnum + reward[k][2];
        break;
        case "addExtraEquipmentNum":
            ret.addextraequipmentnum = ret.addextraequipmentnum + reward[k][2];
        break;
        case "addExtraTravellerNum":
            ret.addextratravellernum = ret.addextratravellernum + reward[k][2];
        break;
        case "lotteryPool":
            var lr = wl.lotteryPool(reward[k][2]);
            wl.merge_reward(ret,lr);        
        break;
        }
    }

    cc.log("aaa "+ret.materials[1])
    return ret;
};

wl.lotteryPool = function(pid){
    return wl.addReward(parse_skill_params(lotterypool[pid].pool),1);
};

wl.tmp_dbrole = function(name){
    return {
        userid:"1",
        name:name,
        id:wl.local_id(),
        exp:0,
        level:0,
        hp:10,
        copper:0,
        gold:0,
        charged:0,
        lastseed:0,
        slot1:0,
        slot2:0,
        slot3:0,
        slot4:0,
        slot5:5,
        extrasoulnum:0,
        extraequipmentnum:0,
        extratravellernum:0,
        date_lastupdate:0,
        date_lastenter:0,
        date_create:0,

        travellers:[
            {id:1,name:"1",img:"",exp:0,level:1,view:1,skill1id:2000,skill1exp:0,skill1level:1,skill2id:1000,skill1exp:0,skill1level:1,nature:2,soulid:2,weaponid:1,clothid:2,trinketid:3,slot:[1,0,2,3],pro:[]},
            {id:2,name:"2",img:"",exp:0,level:1,view:1,skill1id:2400,skill1exp:0,skill1level:1,skill2id:1001,skill1exp:0,skill1level:0,nature:2,soulid:1,weaponid:0,clothid:0,trinketid:0,slot:[],pro:[]},
            {id:3,name:"3",img:"",exp:0,level:1,view:1,skill1id:2000,skill1exp:0,skill1level:1,skill2id:1400,skill1exp:0,skill1level:0,nature:2,soulid:1,weaponid:0,clothid:0,trinketid:0,slot:[],pro:[]},
            {id:4,name:"4",img:"",exp:0,level:1,view:1,skill1id:2000,skill1exp:0,skill1level:1,skill2id:1600,skill1exp:0,skill1level:0,nature:2,soulid:1,weaponid:0,clothid:0,trinketid:0,slot:[],pro:[]},
            {id:5,name:"5",img:"",exp:0,level:1,view:1,skill1id:2000,skill1exp:0,skill1level:1,skill2id:1002,skill1exp:0,skill1level:0,nature:2,soulid:1,weaponid:0,clothid:0,trinketid:0,slot:[],pro:[]}
        ],
        souls:[
            {id:1,baseid:1,star:0,exp:0,level:1,skillexp:0,skilllevel:1},
            {id:2,baseid:2,star:0,exp:0,level:2,skillexp:0,skilllevel:1},
            {id:3,baseid:1,star:0,exp:0,level:1,skillexp:0,skilllevel:1},
            {id:4,baseid:1,star:0,exp:0,level:1,skillexp:0,skilllevel:1},
            {id:5,baseid:1,star:0,exp:0,level:1,skillexp:0,skilllevel:1}
        ],
        equipments:[
            {id:1,baseid:1,exp:0,level:1},
            {id:2,baseid:2,exp:0,level:1},
            {id:3,baseid:3,exp:0,level:1}
        ]

    };
};

wl.role = function(dbobj){
    this.dbobj = dbobj;

    this.travellers = [];

    for(var k in dbobj.travellers){
        this.travellers.push(new wl.traveller(dbobj.travellers[k],this));
    }
    dbobj.travellers = null;

    this.souls = [];
    for(var k in dbobj.souls){
        this.souls.push(new wl.soul(dbobj.souls[k]));
    }
    dbobj.souls = null;

    this.equipments = [];
    for(var k in dbobj.equipments){
        this.equipments.push(new wl.equipment(dbobj.equipments[k]));
    }
    dbobj.equipments = null;
};

wl.create_enemy = function(tmp,num,factor,enemyid,enemylevel){
    var einfo = enemy[wl.tonumber(enemyid)];
        var traveller = {
                            id:wl.local_id(),
                            name:lang(einfo.name),
                            img:"",
                            exp:0,
                            level:wl.tonumber(enemylevel),
                            skill1id:einfo.skill1id,
                            skill1level:einfo.skill1level*factor,
                            skill1exp:0,
                            skill2id:einfo.skill1id,
                            skill2level:einfo.skill1level*factor,
                            skill2exp:0,
                            MaxHP:einfo.MaxHP*factor,
                            Attack:einfo.Attack*factor,
                            Defense:einfo.Defense*factor,
                            Heal:einfo.Heal*factor,
                            nature:4,
                            slot:[]
                         };
        for(var i=0;i<EQUIP_NUM;++i){
            traveller.slot[i] = 0;
        }
        tmp['slot'+num] = traveller.id;
        if(einfo.soulid != 0){
            var soul = {
                            id:wl.local_id(),
                            baseid:einfo.soulid,
                            exp:0,
                            star:einfo.soulstar,
                            level:einfo.soullevel*factor,
                            skillexp:0,
                            skilllevel:einfo.soulskilllevel*factor
                        };
            tmp.souls.push(soul);

            traveller.soulid=soul.id;

            wl.gvars.role.meet(einfo.soulid);
        }
        else{
            traveller.soulid = 0;
        }

        if(einfo.weaponrid != 0){
            var weaponr = {
                            id:wl.local_id(),
                            baseid:einfo.weaponrid,
                            exp:0,
                            level:einfo.weaponrlevel*factor,
                            skillexp:0,
                            skilllevel:einfo.weaponrskilllevel*factor
                        };
            tmp.equipments.push(weaponr);

            traveller.slot[EQUIP_WEAPONR]=weaponr.id;
        }
        else{
            traveller.slot[EQUIP_WEAPONR] = 0;
        }
        
        if(einfo.weaponlid != 0){
            var weaponl = {
            id:wl.local_id(),
            baseid:einfo.weaponlid,
            exp:0,
            level:einfo.weaponllevel*factor,
            skillexp:0,
            skilllevel:einfo.weaponlskilllevel*factor
            };
            tmp.equipments.push(weaponl);
            
            traveller.slot[EQUIP_WEAPONL]=weaponl.id;
        }
        else{
            traveller.slot[EQUIP_WEAPONL] = 0;
        }

        if(einfo.clothid != 0){
            var cloth = {
                            id:wl.local_id(),
                            baseid:einfo.clothid,
                            exp:0,
                            level:einfo.clothlevel*factor,
                            skillexp:0,
                            skilllevel:einfo.clothskilllevel*factor
                        };
            tmp.equipments.push(cloth);

            traveller.slot[EQUIP_CLOTH]=cloth.id;
        }
        else{
            traveller.slot[EQUIP_CLOTH] = 0;
        }

        if(einfo.trinketid != 0){
            var trinket = {
                            id:wl.local_id(),
                            baseid:einfo.trinketid,
                            exp:0,
                            level:einfo.trinketlevel*factor,
                            skillexp:0,
                            skilllevel:einfo.trinketskilllevel*factor
                        };
            tmp.equipments.push(trinket);

            traveller.slot[EQUIP_TRINKET]=trinket.id;
        }
        else{
            traveller.slot[EQUIP_TRINKET] = 0;
        }


        tmp.travellers.push(traveller)
};

wl.role_from_enemy = function(sinfo,enemies,level){
    var tmp = {id:wl.local_id(),userid:1,name:lang(sinfo.rolename),travellers:[],souls:[],equipments:[]};
    
    
    var factor = level
    for(var k in enemies){
        var num = wl.tonumber(k)+1;
        if(wl.tonumber(enemies[k][0]) == 0){
            
            tmp['slot'+num] = 0;
            continue;
        }
        wl.create_enemy(tmp,num,factor,wl.tonumber(enemies[k][0]),wl.tonumber(enemies[k][1]));
        
    }
    for(var k in sinfo){
        cc.log(k)
    }
    var heros = parse_enemy(sinfo.hero)
    for(var k in heros){
        if(wl.tonumber(heros[k][0]) == 0){
            continue;
        }
         wl.create_enemy(tmp,HERO_IDX+1,factor,wl.tonumber(heros[k][0]),wl.tonumber(heros[k][1]));
    }
    return tmp;
};

var sort_rarity = function(t1,t2){return t2.getBase().rarityclass<t1.getBase().rarityclass;};
var sort_name = function(t1,t2){return lang(t2.getBase().name)<lang(t1.getBase().name);};

wl.role.prototype = {

    getClass : function(){return "role";},

    getUserId : function(){return this.dbobj.userid;},
    setUserId : function(userid){ this.dbobj.userid = userid;},

    getName : function(){return this.dbobj.name;},
    setName : function(name){ this.dbobj.name = name;},

    getId : function(){return this.dbobj.id;},
    setId : function(id){ this.dbobj.id = id;},

    getExp : function(){return this.dbobj.exp;},
    setExp : function(exp){ this.dbobj.exp = exp;},

    getLevel : function(){return this.dbobj.level;},
    setLevel : function(level){ this.dbobj.level = level;},

    getHP : function(){return this.dbobj.hp;},
    setHP : function(hp){ this.dbobj.hp = hp;},

    subHP : function(hp) { this.dbobj.hp -= hp;if(this.dbobj.hp < 0){this.dbobj.hp=0;cc.log("subhp < 0:"+hp);}},
    addHP : function(hp){ this.dbobj.hp += hp; if(this.dbobj.hp > this.getMaxHP()){this.dbobj.hp = this.getMaxHP()}},
    addCopper : function(v){ this.dbobj.copper += v;},
    subCopper : function(v){ this.dbobj.copper -= v;},
    addGold : function(v){ this.dbobj.gold += v;},
    addExp : function(v){
        var pro = {};
               pro.pro = [{level:this.dbobj.level,startexp:this.dbobj.exp,maxexp:this.getMaxExp(),endexp:this.dbobj.exp+v}];
               pro.traveller = [];
        
        this.dbobj.exp += v;
        
        var leveluped = false;
        
        while(this.dbobj.exp >= this.getMaxExp() && this.dbobj.level < MAX_ROLE_LEVEL){
            this.dbobj.exp -= this.getMaxExp();
            this.dbobj.level += 1;
            leveluped = true;
                pro.pro[pro.pro.length-1].endexp = 0;
                
                if(this.dbobj.level == MAX_ROLE_LEVEL){
                    pro.pro.push({level:this.dbobj.level,startexp:0,maxexp:0,endexp:0});
                }
                else{
                    pro.pro.push({level:this.dbobj.level,startexp:0,maxexp:this.getMaxExp(),endexp:this.dbobj.exp});
                }
        }
        
        
        if(this.dbobj.level >= MAX_ROLE_LEVEL){
            this.dbobj.exp = 0;
        }

        for(var i=1;i<SLOT_NUM;++i){
            var id = this["getSlot"+i]();
            if(id == 0){
                continue;
            }
            var traveller = this.getTraveller(id);

            var soul = traveller.getSoul().addExp(v);
            pro.traveller.push(traveller.addExp(v));

            pro.traveller[pro.traveller.length-1].soul = soul;
        }

        return pro;
    },
    addLevel : function(v){
        this.dbobj.level += v;
    },
    addExtraSoulNum : function(v){
        this.dbobj.extrasoulnum += v;
    },
    addExtraEquipmentNum : function(v){
        this.dbobj.extraequipmentnum += v;
    },
    addExtraTravellerNum : function(v){
        this.dbobj.extratravellernum += v;
    },

    addBlueprint : function(v){
        cc.log("addb"+v)
        for(var k in this.dbobj.blueprints){
            if(this.dbobj.blueprints[k] == v){
                return;
            }
        }
        this.dbobj.blueprints.push(v);
    },

    addMaterial : function(v,n){
        cc.log("addm"+v+" "+n)
        if(this.dbobj.materials[v] == null){
            this.dbobj.materials[v] = n;
        }
        else{
            this.dbobj.materials[v] += n;
        }
    },

    getMaterialNum : function(v){
        return this.dbobj.materials[v] || 0;
    },

    subMaterialNum : function(v,n){
        this.dbobj.materials[v] -= n;
    },

    isMeeted : function(baseid){
        for(var k in this.dbobj.meeted){
            if(this.dbobj.meeted[k] == baseid){
                return true;
            }
        }
        return false;
    },

    meet : function(baseid){
        if(this.isMeeted(baseid)){
            return;
        }
        this.dbobj.meeted.push(baseid);
        
    },
    
    getLevelInfo : function(){return rolelevel[this.getLevel()];},
    getMaxHP : function(){ return this.getLevelInfo().maxhp;},
    getMaxExp : function(){ return this.getLevelInfo().exp;},
    
    getMaxSoulNum : function(){return this.getExtraSoulNum() + this.getLevelInfo().maxsoulnum;},
    getMaxEquipNum : function(){return this.getExtraEquipmentNum() + this.getLevelInfo().maxequipnum;},
    getMaxTravellerNum : function(){return this.getExtraTravellerNum() + this.getLevelInfo().maxtravellernum;},

    getCopper : function(){return this.dbobj.copper;},
    setCopper : function(copper){ this.dbobj.copper = copper;},

    getGold : function(){return this.dbobj.gold;},
    setGold : function(id){ this.dbobj.gold = gold;},

    getCharged : function(){return this.dbobj.charged;},
    setCharged : function(charged){ this.dbobj.charged = charged;},

    getLastSeed : function(){return this.dbobj.lastseed;},
    setLastSeed : function(lastseed){ this.dbobj.lastseed = lastseed;},

    getSlot1 : function(){return this.dbobj.slot1;},
    setSlot1 : function(slot1){ this.dbobj.slot1 = slot1;},
  
    getSlot2 : function(){return this.dbobj.slot2;},
    setSlot2 : function(slot2){ this.dbobj.slot2 = slot2;},

    getSlot3 : function(){return this.dbobj.slot3;},
    setSlot3 : function(slot3){ this.dbobj.slot3 = slot3;},

    getSlot4 : function(){return this.dbobj.slot4;},
    setSlot4 : function(slot4){ this.dbobj.slot4 = slot4;},

    getSlot5 : function(){return this.dbobj.slot5;},
    setSlot5 : function(slot5){ this.dbobj.slot5 = slot5;},

    getHero : function(){return this.dbobj.slot5;},

    getExtraSoulNum : function(){return this.dbobj.extrasoulnum;},
    setExtraSoulNum : function(extrasoulnum){ this.dbobj.extrasoulnum = extrasoulnum;},

    getExtraEquipmentNum : function(){return this.dbobj.extraequipmentnum;},
    setExtraEquipmentNum : function(extraequipmentnum){ this.dbobj.extraequipmentnum = extraequipmentnum;},

    getExtraTravellerNum : function(){return this.dbobj.extratravellernum;},
    setExtraTravellerNum : function(slot1){ this.dbobj.extratravellernum = extratravellernum;},

    getDateLastUpdate : function(){return this.dbobj.date_lastupdate;},
    setDateLastUpdate : function(slot1){ this.dbobj.date_lastupdate = date_lastupdate;},

    getDateLastEnter : function(){return this.dbobj.date_lastenter;},
    setDateLastEnter : function(date_lastenter){ this.dbobj.date_lastenter = date_lastenter;},

    getDateCreate : function(){return this.dbobj.date_create;},
    setDateCreate : function(date_create){ this.dbobj.date_create = date_create;},

    ////////////////////////////

   getTravellerSlot : function(travellerid){
        for(var i=1;i<=SLOT_NUM;++i){
            if(travellerid == this["getSlot"+i]()){
                return i;
            }
        }
        return null;
   },

    addTraveller : function(dbobj){
        var traveller = this.getTraveller(dbobj.id);
        if(traveller == null){
            if(this.getSlot5() == 0){
                this.setSlot5(dbobj.id);
                this.dbobj.name = dbobj.name;
                if(this.dbobj.level == 0){
                    this.dbobj.level = 1;
                }
            }
            this.travellers.push(new wl.traveller(dbobj,this));
        }
        else{
            if(traveller.dbobj.soulid != dbobj.soulid){
                var oldsoul = this.getSoul(traveller.dbobj.soulid);
                //error:add same soul at the same time
                if(oldsoul != null){
                    oldsoul.dbobj.travellerid = 0;
                }
                var newsoul = this.getSoul(dbobj.soulid);
                if(newsoul != null){
                    newsoul.dbobj.travellerid = dbobj.id;
                }
            }
            for(var k in dbobj.slot){
                if(dbobj.slot[k] != traveller.dbobj.slot[k]){
                    var oldequip = this.getEquipment(traveller.dbobj.slot[k]);
                    if(oldequip != null){
                        oldequip.dbobj.travellerid = 0;
                    }
                    var newequip = this.getEquipment(dbobj.slot[k]);
                    if(newequip != null){
                        newequip.dbobj.travellerid = dbobj.id;
                    }
                }
            }
            
            traveller.setdbobj(dbobj);
        }
    },

    isCompleteStage : function(stageid,level){
        return this.dbobj.stages[stageid] != level;
    },

    completeStage : function(stageid,stagelevel){
        var state = COMPLETE_OK;
        if(this.dbobj.stages[stageid] == null)
        {
            state = COMPLETE_FIRST;
        }
        else if(this.dbobj.stages[stageid] < stagelevel){
            state = COMPLETE_LEVEL;
        }
        this.dbobj.stages[stageid] = stagelevel;

        return state;
    },

    canEnterSubMap : function(submapid){
        var needmap = submaps[submapid].needmap;
        if(needmap != 0){
            if(submaps[needmap] == null){
                cc.log("submap:"+submapid+" not found:"+needmap);
                return false;
            }
            var stages = parse_action_params(submaps[needmap].stages);
            for(var k in stages){
                if(!this.canEnterStage(needmap,stages[k])){
                    return false;
                }
            }
        }
        return true;
    },

    canEnterStage : function(stageid){
        if(stage[stageid] == null){
            return false;
        }
        if(stage[stageid].stageneed != 0){
            return this.isCompleteStage(stage[stageid].stageneed);
        }
        return true;
    },

    addEquip : function(dbobj){
       var equip = this.getEquipment(dbobj.id);
        if(equip == null){
            dbobj.isnew = 1;
            this.equipments.push(new wl.equipment(dbobj));
        }
        else{
            equip.setdbobj(dbobj)
        }
    },

    deleteEquip : function(eid){
        for(var k in this.equipments){
            if(this.equipments[k].getId() == eid){
                if(this.equipments[k].isEquiped()){
                    var traveller = wl.gvars.role.getTraveller(this.equipments[k].getTravellerId());
                    if(traveller.getWeaponrId() == eid){
                        traveller.setWeaponrId(0);
                    }
                    else if(traveller.getWeaponlId() == eid){
                        traveller.setWeaponlId(0);
                    }
                    else if(traveller.getClothId() == eid){
                        traveller.setClothId(0);
                    }
                    else if(traveller.getTrinketId() == eid){
                        traveller.setTrinketId(0);
                    }
                }
                this.equipments.splice(k,1);
                return;
            }
        }
    },

    addSoul : function(dbobj){
        var soul = this.getSoul(dbobj.id);
        if(soul == null){
            dbobj.isnew = 1;
            this.souls.push(new wl.soul(dbobj));
        }
        else{
            soul.setdbobj(dbobj)
        }
        
    },

    deleteSoul : function(soulid){
        for(var k in this.souls){
            if(this.souls[k].getId() == soulid){
                 if(this.souls[k].dbobj.travellerid != 0){
                    var traveller = this.getTraveller(this.souls[k].dbobj.travellerid);
                    traveller.setSoulId(0);
                 }

                 this.souls.splice(k,1);

                 break;
            }
        }
        
    },
    
    getTraveller : function(id){
        if(id == 0){
            return null;
        }
        for(var k in this.travellers){
            if(this.travellers[k].getId() == id){
                return this.travellers[k];
            }
        }
        return null;
    },
    
    getSlotTravellers : function(){
        var slots = [];
        var travellerid = 0;
        for(var i=1;i<=5;i++){
           travellerid = this.dbobj["slot"+i];
           if(travellerid != 0){
                slots.push(this.getTraveller(travellerid));
           }
           else
           {
                slots.push(null);
           }
        }
        return slots;
    },

    
     
    orderObjects : function(order,objs){
        switch(order)
        {
        case ORDER_DEFAULT:
        break;
        case ORDER_RARITY:
            objs.sort(sort_rarity);
        break;
        case ORDER_NAME:
            objs.sort(sort_name);
        break;
        }
    },

    canMakeBlueprint : function(blueid){
        var base = blueprint[blueid];

         for(var i = 1;i<=6;++i){
            if(base["mid"+i] == 0 ){
                continue;
            }
           

            if(wl.gvars.role.getMaterialNum(base["mid"+i]) < base["mnum"+i]){
                return false;
            }
        }
        return true;
    },

    getBlueprints : function(type){
        var arr = [];

        if(type != EQUIP_WEAPONR
        &&type != EQUIP_WEAPONL
        &&type != EQUIP_CLOTH
        &&type != EQUIP_TRINKET){
            wl.copyarr(this.dbobj.blueprints,arr);
        }
        else{
            for(var k in this.dbobj.blueprints){
                var equiptype = equipments[blueprint[this.dbobj.blueprints[k]].equipid].type;
                switch(type)
                {
                case EQUIP_WEAPONR:
                    if(equiptype == ETYPE_MAINHAND
                    || equiptype == ETYPE_ONEHAND
                    || equiptype == ETYPE_TWOHAND){
                        arr.push(this.dbobj.blueprints[k]);
                    }
                break;
                case EQUIP_WEAPONL:
                    if(equiptype == ETYPE_OFFHAND
                    || equiptype == ETYPE_ONEHAND){
                        arr.push(this.dbobj.blueprints[k]);
                    }
                break;
                case EQUIP_CLOTH:
                    if(equiptype == ETYPE_CLOTH){
                        arr.push(this.dbobj.blueprints[k]);
                    }
                break;
                case EQUIP_TRINKET:
                    if(equiptype == ETYPE_TRINKET){
                        arr.push(this.dbobj.blueprints[k]);
                    }
                break;
                }
            }
        }
        return arr;
    },

    getObjects : function(type){
        var arr = []
         if(type == EQUIP_SOUL){
                wl.copyarr(this.souls,arr);
         }
         else{
            for(var k in this.equipments){
                switch(type)
                {
                case EQUIP_WEAPONR:
                    if(this.equipments[k].getType() == ETYPE_MAINHAND
                    || this.equipments[k].getType() == ETYPE_ONEHAND
                    || this.equipments[k].getType() == ETYPE_TWOHAND){
                        arr.push(this.equipments[k]);
                    }
                break;
                case EQUIP_WEAPONL:
                    if(this.equipments[k].getType() == ETYPE_OFFHAND
                    || this.equipments[k].getType() == ETYPE_ONEHAND){
                        arr.push(this.equipments[k]);
                    }
                break;
                case EQUIP_CLOTH:
                    if(this.equipments[k].getType() == ETYPE_CLOTH){
                        arr.push(this.equipments[k]);
                    }
                break;
                case EQUIP_TRINKET:
                    if(this.equipments[k].getType() == ETYPE_TRINKET){
                        arr.push(this.equipments[k]);
                    }
                break;
                default:
                    wl.copyarr(this.equipments,arr);
                break;
                }
                
            }
         }

        return arr;
    },

    getSouls : function(race){
        var arr = [];
        if(race == null){
            wl.copyarr(this.souls,arr);
        }
        else{
        for(var k in this.souls){
            if(this.souls[k].getBase().type == race){
                arr.push(this.souls[k]);
            }
        }
        }
        return arr;
    },

    getSoul : function(id){
        if(id == 0){
            return null;
        }
        for(var k in this.souls){
            if(this.souls[k].getId() == id){
                return this.souls[k];
            }
        }
        return null;
    },

    getEquipment : function(id){
        if(id == 0){
            return null;
        }
        for(var k in this.equipments){
            if(this.equipments[k].getId() == id){
                return this.equipments[k];
            }
        }
        return null;
    },
    findEquip : function(baseid){
        for(var k in this.equipments){
            if(this.equipments[k].getBaseId() == baseid){
                return this.equipments[k];
            }
        }
        return null;
    }
};