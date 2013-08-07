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

lotterypool = wl.csv_pool("lotterypool.csv");
submaps = wl.csv_idmap("submaps.csv");
enemy = wl.csv_idmap("enemy.csv");

stage = wl.csv_idmap("stage.csv");