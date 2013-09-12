virtual_soul_starup = function(info){
    var ret = {};
    ret.rc = retcode.OK;
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

    var s1 = role_get_soul(info.soulid1);
    var s2 = role_get_soul(info.soulid2);

    if(s1.baseid != s2.baseid){
        ret.rc = retcode.STARUP_NOT_SAME_SOUL;
        return ret;
    }
    
    var rarity = rarityclass[soulbase[s1.baseid].rarityclass];
    var starupcopper = parse_action_params(rarity.starupcopper);
    var star = wl.clamp(s1.star + s2.star + 1,0,starupcopper.length);
    if(starupcopper[star-1] > role.copper){
        ret.rc = retcode.STARTUP_NOT_ENOUGH_COPPER;
        return ret;
    }

    if(s1.star >= starupcopper.length || s2.star >= starupcopper.length){
        ret.rc = retcode.STARUP_ALREADY_MAX_STAR;
        return ret;
    }

    if(s1.level != rarity.maxlevel || s2.level != rarity.maxlevel){
        ret.rc = retcode.STARUP_NOT_FULL_LEVEL;
        return ret;
    }

    role.copper -= starupcopper[star-1];
    s1.star = star;
    s1.exp = 0;
    s1.level = 0;
    ////////
                 if(s1.travellerid != 0 && s2.travellerid != 0 )
        {
            if(s2.travellerid == role.slot5){
                traveller = role_get_traveller(s1.travellerid);
                traveller.soulid = 0;

                var traveller = role_get_traveller(s2.travellerid);
                traveller.soulid = s1.id;
                s1.travellerid = s2.travellerid;

                
            }
            else{
                

                traveller = role_get_traveller(s2.travellerid);
                traveller.soulid = 0;
            }
            
        }
        else (s2.travellerid != 0)
        {
            var traveller = role_get_traveller(s2.travellerid);
                traveller.soulid = s1.id;
                s1.travellerid = s2.travellerid;

              
        }
        /////
    role_delete_soul(s2.id);

    ret.soul = s1;
    wl.set("role_"+info.userid,wl.toJSONString(role));
    return ret;
};