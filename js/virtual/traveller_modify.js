virtual_traveller_modify = function(info){
    var ret = {};
    ret.rc = retcode.OK;
    var role = wl.parseJSON(wl.get("role_"+info.userid));

    var traveller = null;
    for(var k in role.travellers){
        if(info.id == role.travellers[k].id){
            traveller = role.travellers[k];
            break;
        }
    }

    if(traveller == null){
        ret.rc = retcode.TRAVELLER_NOTEXIST;
        return ret;
    }

    if(info.name != null){
        traveller.name = info.name;
    }
    if(info.gender != null){
        traveller.gender = info.gender;
    }
    if(info.age != null){
        traveller.age = info.age;
    }
    if(info.img != null){
        traveller.img = info.img;
    }

    if(info.soul != null){
        if(traveller.soulid != 0){
            for(var k in role.souls){
                if(traveller.soulid == role.souls[k].id){
                    role.souls[k].travellerid = 0;
                    break;
                }
            }
        }
        traveller.soulid = info.soul;
        for(var k in role.souls){
            if(info.soul == role.souls[k].id){
                 role.souls[k].travellerid = traveller.id;
                 break;
            }
        }
    }

    if(info.weaponr != null){
        if(traveller.weaponrid != 0){
            for(var k in role.equipments){
                if(traveller.weaponrid == role.equipments[k].id){
                    role.equipments[k].travellerid = 0;
                    break;
                }
            }
        }
        traveller.weaponrid = info.weaponr;
        for(var k in role.equipments){
            if(info.weaponr == role.equipments[k].id){
                 role.equipments[k].travellerid = traveller.id;
                 break;
            }
        }
    }

    if(info.weaponl != null){
        if(traveller.weaponlid != 0){
            for(var k in role.equipments){
                if(traveller.weaponlid == role.equipments[k].id){
                    role.equipments[k].travellerid = 0;
                    break;
                }
            }
        }
        traveller.weaponlid = info.weaponl;
        for(var k in role.equipments){
            if(info.weaponl == role.equipments[k].id){
                 role.equipments[k].travellerid = traveller.id;
                 break;
            }
        }
    }

    if(info.cloth != null){
        if(traveller.clothid != 0){
            for(var k in role.equipments){
                if(traveller.clothid == role.equipments[k].id){
                    role.equipments[k].travellerid = 0;
                    break;
                }
            }
        }
        traveller.clothid = info.cloth;
        for(var k in role.equipments){
            if(info.cloth == role.equipments[k].id){
                 role.equipments[k].travellerid = traveller.id;
                 break;
            }
        }
    }

    if(info.trinket != null){
        if(traveller.trinketid != 0){
            for(var k in role.equipments){
                if(traveller.trinketid == role.equipments[k].id){
                    role.equipments[k].travellerid = 0;
                    break;
                }
            }
        }
        traveller.trinketid = info.trinket;
        for(var k in role.equipments){
            if(info.trinket == role.equipments[k].id){
                 role.equipments[k].travellerid = traveller.id;
                 break;
            }
        }
    }

    wl.set("role_"+info.userid,wl.toJSONString(role));

    return ret;
};