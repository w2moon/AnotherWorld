virtual_soul_combine = function(info){
    var ret = {};
    var role = wl.parseJSON(wl.get("role_"+info.userid));

    var role_get_soul = function(soulid){
        for(var k in role.souls){
            if(role.souls[k].id == soulid){
                return role.souls[k];
            }
        }
        return null;
    };

    var role_delete_soul = function(soulid){
        for(var k in role.souls){
            if(role.souls[k].id == soulid){
                role.souls.splice(k,1);
                break;
            }
        }
        return;
    };

    var role_get_traveller = function(travellerid){
        for(var k in role.travellers){
            if(role.travellers[k].id == travellerid){
                return role.travellers[k];
            }
        }
        return null;
    };
     var fathersoul = role_get_soul(info.soulid1);
        var mothersoul = role_get_soul(info.soulid2);
        if(fathersoul == null || mothersoul == null){
            ret.rc = retcode.COMBINE_NOT_FOUND_SOUL;
        }
        else{
            var bid = wl.get_combineid(fathersoul.baseid,mothersoul.baseid);
            if(bid == null){
                ret.rc = retcode.COMBINE_CAN_NOT_COMBINED;
            }
            else{
                var rarity = rarityclass[soulbase[bid]['rarityclass']];

                if(role.copper < rarity['combinecopper']){
                    ret.rc = retcode.COMBINE_NOT_ENOUGH_COPPER;
                }
                else{
                    role.copper -= rarity['combinecopper'];
                }

                if(fathersoul.travellerid != 0){
                    role_get_traveller(fathersoul.travellerid).soulid = 0;
                }
                 if(mothersoul.travellerid != 0){
                    role_get_traveller(mothersoul.travellerid).soulid = 0;
                }

                role_delete_soul(info.soulid1);
                role_delete_soul(info.soulid2);

                if(wl.rand() < rarity.mutation){
                    var ids = mutation[rarity['id']]
                    bid = ids[parseInt(ids.length*wl.rand())]
                    
                }

                var soul = {
                            id:wl.local_id(),
                            baseid:bid,
                            exp:0,
                            star:0,
                            level:1,
                            skillexp:0,
                            skilllevel:1
                };
                role.souls.push(soul);
                ret['soul'] = soul;
            }

        }


    wl.set("role_"+info.userid,wl.toJSONString(role));
    return ret;
};