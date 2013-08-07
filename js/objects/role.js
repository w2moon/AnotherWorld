
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
        slot1:1,
        slot2:2,
        slot3:3,
        slot4:4,
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

wl.role_from_enemy = function(sinfo,enemies,level){
    var tmp = {id:wl.local_id(),userid:1,name:lang(sinfo.rolename),travellers:[],souls:[],equipments:[]};
    
    
    var factor = level
    for(var k in enemies){
        var num = wl.tonumber(k)+1;
        if(wl.tonumber(enemies[k][0]) == 0){
            
            tmp['slot'+num] = 0;
            continue;
        }
        var einfo = enemy[wl.tonumber(enemies[k][0])];
        var traveller = {
                            id:wl.local_id(),
                            name:lang(einfo.name),
                            img:"",
                            exp:0,
                            level:wl.tonumber(enemies[k][1]),
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
    }
    return tmp;
};

wl.role.prototype = {

    getClass : function(){return "role";},

    getUserid : function(){return this.dbobj.userid;},
    setUserid : function(userid){ this.dbobj.userid = userid;},

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

    getCopper : function(){return this.dbobj.copper;},
    setCopper : function(copper){ this.dbobj.copper = copper;},

    getGold : function(){return this.dbobj.gold;},
    setGold : function(id){ this.dbobj.gold = gold;},

    getCharged : function(){return this.dbobj.charged;},
    setCharged : function(charged){ this.dbobj.charged = charged;},

    getLastSeed : function(){return this.dbobj.lastseed;},
    setLastSeed : function(lastseed){ this.dbobj.lastseed = lastseed;},

    getSlot1 : function(){return this.dbobj.slot1;},
    setSlot2 : function(slot2){ this.dbobj.slot2 = slot2;},

    getSlot3 : function(){return this.dbobj.slot3;},
    setSlot1 : function(slot1){ this.dbobj.slot1 = slot1;},

    getSlot2 : function(){return this.dbobj.slot2;},
    setSlot3 : function(slot3){ this.dbobj.slot3 = slot3;},

    getSlot4 : function(){return this.dbobj.slot4;},
    setSlot4 : function(slot4){ this.dbobj.slot4 = slot4;},

    getSlot5 : function(){return this.dbobj.slot5;},
    setSlot5 : function(slot5){ this.dbobj.slot5 = slot5;},

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
    }
};