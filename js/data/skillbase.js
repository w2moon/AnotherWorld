
var skilltype = {
    physicattack:0,
    magicattack:1,
    defense:2,
    heal:3,
    special:4
};

var gameevent = {
    battle_start:0,
battle_end:1,

//user turn isenemy
action_start:2,
action_end:3,

//user targets isenemy
attack_before:4,
attack_after:5,
heal_before:6,
heal_after:7,
dodge_before:8,
dodge_after:9,
crit_before:10,
crit_after:11,
skill_before:12,
skill_after:13,

//user value isenemy
hpinc:14,
hpdec:15,
attackinc:16,
attackdec:17,
defenseinc:18,
defensedec:19,
specialattackinc:20,
specialattackdec:21,
specialdefenseinc:22,
specialdefensedec:23,
speedinc:24,
speeddec:25,
dodgeinc:26,
dodgedec:27,
critinc:28,
critdec:29,

//deader causer
dead:30,

action:31,
slash:32,
magic:33,
dodge:34,
crit:35
};

var roleaction = {
    attack:0,
    magic:1,
    defense:2
};

var skillbase= [
    {'id':1,'icon':'soul.png','name':'skill1','type':skilltype.physicattack,'expclass':1,'specialrate':1,
    'eventid':gameevent.attack_after,'eventisenemy':0,'eventvalue':0,'rate':0.5,'cooldown':3,
    'useraction':'magic','userparticle':'',
    'target1type':'enemy','target1num':0,target1needalive:true,'target1action':'defense','target1particle':'','target1effecttype':'hp','target1effectvalue':-10,
     'target2type':'','target2num':0,target2needalive:false,'target2action':'','target2particle':'','target2effecttype':'','target2effectvalue':0},
];

