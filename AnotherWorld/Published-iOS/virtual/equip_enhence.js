virtual_equip_enhence = function(info){
    var ret = {};
    var role = wl.parseJSON(wl.get("role_"+info.userid));

    var role_get_equip = function(eid){
        for(var k in role.equips){
            if(role.equips[k].id == eid){
                return role.equips[k];
            }
        }
        return null;
    };

    var role_delete_equip = function(eid){
        for(var k in role.equips){
            if(role.equips[k].id == eid){
                if(role.equips[k].travellerid != 0){
                    for(var i in role.travellers){
                        if(role.travellers[i].id == role.equips[k].travellerid){
                            if(role.travellers[i].weaponrid == eid){
                                role.travellers[i].weaponrid = 0;
                            }
                            else if(role.travellers[i].weaponlid == eid){
                                role.travellers[i].weaponlid = 0;
                            }
                            else if(role.travellers[i].clothid == eid){
                                role.travellers[i].clothid = 0;
                            }
                            else if(role.travellers[i].trinketid == eid){
                                role.travellers[i].trinketid = 0;
                            }
                            break;
                        }
                    }
                }
                role.equips.splice(k,1);
                break;
            }
        }
    };

    var target = role_get_equip(info.equip);
    if( target.level >= rarityclass[equipmentbase[target.baseid]['rarityclass']].maxlevel){
        ret.rc = retcode.ENHENCE_ALREADY_MAX_LEVEL;
        return ret;
    }

    var equips = [];
    var copper = 0;
    var totalexp = 0;

    for(var k in info.consume){
        var e = role_get_equip(info.consume[k]);
        if(e == null || info.consume[k] == info.equip){
            ret.rc = retcode.EQUIP_NOTEXIST;
            return ret;
        }
        equips.push(e);

        var rarity = rarityclass[soulbase[e.baseid].rarityclass];
        copper += rarity.enhencecopper;
        totalexp += rarityclass.enhenceexp;
    }

    if(copper > role.copper){
        ret.rc = retcode.ENHENCE_NOT_ENOUGH_COPPER;
        return ret;
    }

    role.copper -= copper;
     for(var k in info.consume){
       role_delete_equip(info.consume[k]);
    }

    target.exp += totalexp;

    var rarity = equipmentbase[target.baseid].rarityclass;
    var maxlevel = rarityclass[rarity].maxlevel;
    var needexp = wl.get_levelup_exp(target.level,rarity);
    while(target.exp >= needexp && target.level < maxlevel){
        target.level += 1;
        target.exp -= needexp;
        needexp = wl.get_levelup_exp(target.level,rarity);
    }

    if(target.level >= maxlevel){
        target.exp = 0;
    }

    ret.equip = target;
    

 

    wl.set("role_"+info.userid,wl.toJSONString(role));
    return ret;
};