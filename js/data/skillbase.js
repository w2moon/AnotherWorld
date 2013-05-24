
var skilltype = {
    physicattack:0,
    magicattack:1,
    defense:2,
    heal:3,
    special:4
};

 var naturetype = {
            'left':0,
            'right':1,
            'random':2
          }

 var targettype = {
            none:-1,
            'enemy':0,//first front then hero
            'ally' : 1,//first front then hero
            'all' : 2,
            'self' : 3,
            'onlyallyfront' : 4,
            'onlyallyhero' : 5,
            'onlyenemyfront' : 6,
            'onlyenemyhero' : 7,
            'eventtrigger' : 8,
            'eventtarget' : 9
          };

var triggertype = {
    active:0,
    passive:1
};

var gameevent = {

battle_init:-1,
    battle_start:0,
battle_end:1,

//user turn isenemy
action_start:2,
action_end:3,

//user targets isenemy
attacke:4,
defense:5,
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
decHP:15,
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
crit:35,

active:36
};

var roleaction = {
    attack:0,
    magic:1,
    defense:2
};

var skillbase= [
    {'id':1,'icon':'soul.png','name':'skill1','type':skilltype.physicattack,'expclass':1,'specialrate':1,
    'eventid':gameevent.active,'eventisenemy':0,eventisself:0,'rate':0.5,'cooldown':3,energy:1,
    'useraction':'magic','userparticle':'particles/taken-gem.plist',
    battlefieldaction:"",battlefieldparticle:"",duration:1,
    'target1type':targettype.enemy,'target1num':-1,target1needalive:true,'target1action':'defense','target1particle':'particles/taken-gem.plist','target1effecttype':'decHP','target1effectvalue':5,
     'target2type':targettype.none,'target2num':0,target2needalive:false,'target2action':'','target2particle':'','target2effecttype':'','target2effectvalue':0},

     {'id':2,'icon':'soul.png','name':'skill2','type':skilltype.heal,'expclass':1,'specialrate':1,
    'eventid':"attack",'eventisenemy':0,eventisself:1,'rate':0.5,'cooldown':1,energy:0,
    'useraction':'','userparticle':'particles/taken-gem.plist',
    battlefieldaction:"",battlefieldparticle:"",duration:1,
    'target1type':targettype.eventtarget,'target1num':1,target1needalive:true,'target1action':'defense','target1particle':'particles/taken-gem.plist','target1effecttype':'incHP','target1effectvalue':5,
     'target2type':targettype.none,'target2num':0,target2needalive:false,'target2action':'','target2particle':'','target2effecttype':'','target2effectvalue':0},

      {'id':3,'icon':'soul.png','name':'skill1','type':skilltype.physicattack,'expclass':1,'specialrate':1,
    'eventid':gameevent.active,'eventisenemy':0,eventisself:0,'rate':0.5,'cooldown':3,energy:1,
    'useraction':'magic','userparticle':'particles/taken-gem.plist',
    battlefieldaction:"",battlefieldparticle:"",duration:1,
    'target1type':targettype.enemy,'target1num':-1,target1needalive:true,'target1action':'','target1particle':'','target1effecttype':'addBuff','target1effectvalue':1,
     'target2type':targettype.none,'target2num':0,target2needalive:false,'target2action':'','target2particle':'','target2effecttype':'','target2effectvalue':0},

];

