virtual_soul_combine = function(info){
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


                
                

                if(wl.rand() < rarity.mutation){
                    var ids = mutation[rarity['id']]
                    bid = ids[parseInt(ids.length*wl.rand())]
                    
                }

                var soul = {
                            id:wl.local_id(),
                            baseid:bid,
                            exp:0,
                            star:1,
                            level:1,
                            skillexp:0,
                            skilllevel:1,
                            travellerid : 0
                };
                role.souls.push(soul);
                ret['soul'] = soul;

                 var meeted = false;
    for(var k in role.meeted){
         if(role.meeted[k] == bid){
            meeted = true;
            break;
        }
    }
    if(!meeted){
        role.meeted.push(bid);
    }

                ////////
                 if(fathersoul.travellerid != 0 && mothersoul.travellerid != 0 )
        {
            if(mothersoul.travellerid == role.slot5){
                var traveller = role_get_traveller(mothersoul.travellerid);
                traveller.soulid = soul.id;
                soul.travellerid = traveller.id;

                traveller = role_get_traveller(fathersoul.travellerid);
                traveller.soulid = 0;
            }
            else{
                var traveller = role_get_traveller(fathersoul.travellerid);
                traveller.soulid = soul.id;
                soul.travellerid = traveller.id;

                traveller = role_get_traveller(mothersoul.travellerid);
                traveller.soulid = 0;
            }
            
        }
        else if(fathersoul.travellerid != 0)
        {
            var traveller = role_get_traveller(fathersoul.travellerid);
               traveller.soulid = soul.id;
               soul.travellerid = traveller.id;

               
        }
        else if(mothersoul.travellerid != 0)
        {
            var traveller = role_get_traveller(mothersoul.travellerid);
            cc.log(mothersoul.travellerid)
            cc.log(mothersoul.travellerid != 0)
            cc.log(typeof(mothersoul.travellerid))
            if(traveller!=null){
                traveller.soulid = soul.id;
                soul.travellerid = traveller.id;
            }
            else{
                cc.log("s t m null")
            }

            
        }
        /////
                role_delete_soul(info.soulid1);
                role_delete_soul(info.soulid2);
            }

        }

   
    
    wl.set("role_"+info.userid,wl.toJSONString(role));
    return ret;
};