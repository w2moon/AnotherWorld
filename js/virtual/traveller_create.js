virtual_traveller_create = function(info){
    var ret = {};

    var role = wl.parseJSON(wl.get("role_"+info.userid));

    var base = wl.get_rand(travellerbase);
    var traveller = {
                            id:wl.local_id(),
                            name:info.name,
                            img:info.img,
                            gender:info.gender,
                            age:info.age,
                            exp:0,
                            level:1,
                            skill1id:0,
                            skill1level:1,
                            skill1exp:0,
                            skill2id:0,
                            skill2level:1,
                            skill2exp:0,
                            MaxHP:15,
                            Attack:4,
                            Defense:4,
                            Heal:4,
                            nature:4,
                            slot:[]
                         };


    switch(parseInt(wl.rand()*4)){
        case 0:
            traveller.MaxHP = 10 + wl.rand()*2;
            break;
        case 1:
            traveller.Attack = 1 + wl.rand()*2;
            break;
        case 2:
            traveller.Defense = 1 + wl.rand()*2;
            break;
        case 3:
            traveller.Heal = 1 + wl.rand()*2;
            break;
    }

    if(info.ishuman == 1){
        var skills = null;
        if(wl.rand()<0.8){
            skills = parse_action_params(travellerskill[idx].common);
        }
        else{
            skills = parse_action_params(travellerskill[idx].uncommon);
        }
        traveller.skill1id = skills[parseInt(wl.rand()*skills.length)];
    }

    if(base.soulbaseid != 0){
        var soul = {
                            id:wl.local_id(),
                            baseid:base.soulbaseid,
                            exp:0,
                            star:0,
                            level:1,
                            skillexp:0,
                            skilllevel:1
                        };
        soul.travellerid = traveller.id;
        traveller.soulid = soul.id;
        ret.soul = soul;
        role.souls.push(soul);
    }
    ret.equips = []
    if(base.weaponrbaseid != 0){
        var equip = {
                            id:wl.local_id(),
                            baseid:base.weaponrbaseid,
                            exp:0,
                            level:1,
                            skillexp:0,
                            skilllevel:1
                        };
        equip.travellerid = traveller.id;
        traveller.weaponrid = equip.id;
        ret.equips.push(equip);
        role.equipments.push(equip);
    }

    if(base.weaponlbaseid != 0){
        var equip = {
                            id:wl.local_id(),
                            baseid:base.weaponlbaseid,
                            exp:0,
                            level:1,
                            skillexp:0,
                            skilllevel:1
                        };
        equip.travellerid = traveller.id;
        traveller.weaponlid = equip.id;
        ret.equips.push(equip);
        role.equipments.push(equip);
    }

    if(base.clothbaseid != 0){
        var equip = {
                            id:wl.local_id(),
                            baseid:base.clothbaseid,
                            exp:0,
                            level:1,
                            skillexp:0,
                            skilllevel:1
                        };
        equip.travellerid = traveller.id;
        traveller.clothid = equip.id;
        ret.equips.push(equip);
        role.equipments.push(equip);
    }

    if(base.trinketbaseid != 0){
        var equip = {
                            id:wl.local_id(),
                            baseid:base.trinketbaseid,
                            exp:0,
                            level:1,
                            skillexp:0,
                            skilllevel:1
                        };
        equip.travellerid = traveller.id;
        traveller.trinketid = equip.id;
        ret.equips.push(equip);
        role.equipments.push(equip);
    }
    

    role.travellers.push(traveller);
    if(role.slot5 == 0){
        role.slot5 = traveller.id;
        role.name = traveller.name;
        role.level = 1;
    }

    wl.set("role_"+info.userid,wl.toJSONString(role));

    ret.rc = retcode.OK;
    ret.traveller = traveller;
    return ret; 
};