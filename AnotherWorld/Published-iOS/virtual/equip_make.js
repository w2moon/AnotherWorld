virtual_equip_make = function(info){
    var ret = {};
    ret.rc = retcode.OK;
    var role = wl.parseJSON(wl.get("role_"+info.userid));

    var hasblue = false;
    for(var k in role.blueprints)
    {
        if(role.blueprints == info.blueprint){
            hasblue = true;
            break;
        }
    }
    if(!hasblue){
        return ret;
    }

    var base = blueprint[info.blueprint];
    if(role.copper < base.copper){
        return ret;
    }
    

    for(var i=1;i<=6;++i){
        if(base["mid"+i] == 0){
            continue;
        }
        if(role.materials[base["mid"+i]] < base["mnum"+i]){
            return ret;
        }
    }

    role.copper -= base.copper;

    for(var i=1;i<=6;++i){
        if(base["mid"+i] == 0){
            continue;
        }
        role.materials[base["mid"+i]] -= base["mnum"+i];
    }

    ret.equip = wl.create_equip(base.equipid);
    role.equipments.push(ret.equip);

    wl.set("role_"+info.userid,wl.toJSONString(role));
    return ret;
};