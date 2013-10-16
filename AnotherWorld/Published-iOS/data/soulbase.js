var elemtype = {
    fire:0,
    water:1
};

var racetype = {
    human:0
};

var professions = {
    warrior:0,
    mage:1
};

var soulbase = [
    {id:1,icon:"soul.png",avatar:"head.png",profession:professions.warrior,name:"soul",race:racetype.human,setid:0,rarityclass:1,elemtype:elemtype.fire,skillid:3000,MaxHP:100,Attack:2,Heal:1,Defense:1,Speed:2,Dodge:0,Crit:0},
    {id:2,icon:"soul.png",avatar:"head.png",profession:professions.mage,name:"soul",race:racetype.human,setid:0,rarityclass:1,elemtype:elemtype.fire,skillid:3000,MaxHP:100,Attack:2,Heal:1,Defense:1,Speed:2,Dodge:0,Crit:0},
];


soulbase = wl.csv_idmap("soulbase.csv");

rolecfg = wl.csv_cfg("rolecfg.csv");
rolelevel = wl.csv_idmap("rolelevel.csv");
MAX_ROLE_LEVEL = 0;
for(var k in rolelevel){
    MAX_ROLE_LEVEL+=1;
}

rarityclass = wl.csv_idmap("rarityclass.csv");

travellerbase = wl.csv_idmap("travellerbase.csv");
travellerskill = wl.csv_idmap("travellerskill.csv");

lotterypool = wl.csv_idmap("lotterypool.csv");
submaps = wl.csv_idmap("submaps.csv");
enemy = wl.csv_idmap("enemy.csv");

stage = wl.csv_idmap("stage.csv");

blueprint = wl.csv_idmap("blueprint.csv");
material = wl.csv_idmap("material.csv");

wl.getLevelupExp = function(curlevel,rarity){
    return curlevel + curlevel*curlevel*rarity;
};


var combineid = {};

var combineidex = {};

var combinerace = {};

var combineraceex = {};

var mutation = {};

for(var k in soulbase){
    var info = soulbase[k];
    if(info['canmutate'] == 1){
        if (mutation[info['rarityclass']] == null){
            mutation[info['rarityclass']] = [];
        }
        mutation[info['rarityclass']].push(k);
    }

    if(info['fatherid'] != 0){
        if(combineid[info['fatherid']] == null){
            combineid[info['fatherid']] = {'mapid':{},'maptype':{}};
        }
        if(info['motherid'] != 0){
            combineid[info['fatherid']]['mapid'][info['motherid']] = info['id'];
        }
        else{
            combineid[info['fatherid']]['maptype'][info['motherrace']] = info['id'];
        }
    }    
        
    if(info['fatherrace'] != 0){
        if (combinerace[info['fatherrace']] == null){
            combinerace[info['fatherrace']] = {'mapid':{},'maptype':{}};
        }
        if (info['motherid'] != 0){
            combinerace[info['fatherrace']]['mapid'][info['motherid']] = info['id'];
        }
        else{
            combinerace[info['fatherrace']]['maptype'][info['motherrace']] = info['id'];
        }
    }
            
    if(info['motherid'] != 0){
        if (combineidex[info['motherid']] == null){
            combineidex[info['motherid']] = {'mapid':{},'maptype':{}};
        }
        if(info['fatherid'] != 0){
            combineidex[info['motherid']]['mapid'][info['fatherid']] = info['id'];
        }
        else{
            combineidex[info['motherid']]['maptype'][info['fatherrace']] = info['id'];
        }
    }
    
    if(info['motherrace'] != 0){
        if(combineraceex[info['motherrace']] == null){
            combineraceex[info['motherrace']] = {'mapid':{},'maptype':{}};
        }
        if(info['fatherid'] != 0){
            combineraceex[info['motherrace']]['mapid'][info['fatherid']] = info['id'];
        }
        else{
            
            combineraceex[info['motherrace']]['maptype'][info['fatherrace']] = info['id'];
        }
    }
}


            
wl.get_combineid = function(soulbaseid1,soulbaseid2){
    var soultype1 = soulbase[soulbaseid1]['race'];
    var soultype2 = soulbase[soulbaseid2]['race'];
    if(combineid[soulbaseid1] != null){
        if(combineid[soulbaseid1]['mapid'][soulbaseid2] != null){
            return combineid[soulbaseid1]['mapid'][soulbaseid2];
        }
        if(combineid[soulbaseid1]['maptype'][soultype2] != null){
            return combineid[soulbaseid1]['maptype'][soultype2];
        }
    }
        
    if(combinerace[soultype1] != null){
        cc.log(soultype1)
        cc.log(soultype2)
        cc.log(combineraceex[soultype1]['maptype'][soultype2])
        if(combinerace[soultype1]['mapid'][soulbaseid2] != null){
            return combinerace[soultype1]['mapid'][soulbaseid2];
        }
        if(combinerace[soultype1]['maptype'][soultype2] != null){
            return combinerace[soultype1]['maptype'][soultype2];
        }
    }
        
    if(combineidex[soulbaseid2] != null){
        if (combineidex[soulbaseid1]['mapid'][soulbaseid2] != null){
            return combineidex[soulbaseid1]['mapid'][soulbaseid2];
        }
        if (combineidex[souylbaseid1]['maptype'][soultype2] != null){
            return combineidex[soulbaseid1]['maptype'][soultype2];
        }
    }
        
    if(combineraceex[soultype2] != null){
        if(combineraceex[soultype1]['mapid'][soulbaseid2] != null ){
            return combineraceex[soultype1]['mapid'][soulbaseid2];
        }
        if(combineraceex[soultype1]['maptype'][soultype2] != null){
            return combineraceex[soultype1]['maptype'][soultype2];
        }
    }
        
    return null;
};

cc.log(wl.get_combineid(4000,1000))
