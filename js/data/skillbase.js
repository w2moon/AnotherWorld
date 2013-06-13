
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
            none:'none',
            'enemy':'enemy',//first front then hero
            'ally' : 'ally',//first front then hero
            'all' : 'all',
            'self' : 'self',
            'onlyallyfront' : 'onlyallyfront',
            'onlyallyhero' : 'onlyallyhero',
            'onlyenemyfront' : 'onlyenemyfront',
            'onlyenemyhero' : 'onlyenemyhero',
            'eventtrigger' : 'eventtrigger',
            'eventtarget' : 'eventtarget',

            selected : 'selected'
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

var parse_skill_params = function(str){
    var parts = str.split(/;/);
    var arr = [];
    for(var i=0;i<parts.length;++i){
        arr.push(parts[i].split(/,/))
    }
    return arr;
};

var parse_action_params = function(str){
    return str.split(/,/);
   
};



var skillbase= [
    {'id':1,'icon':'soul.png','name':'skill1','type':skilltype.physicattack,'expclass':1,'specialrate':1,
    'eventid':gameevent.active,'eventisenemy':0,eventisself:0,'rate':1,'cooldown':0,energy:0,customaction:"normalattack",
    condition:"self,alive,1;enemy,alive,1;",
    actions:"self,select(enemy alive 1);self,moveto(selected);selected,beDefender;self,attack;selected,defense;self,moveback",
    'useraction':'magic','userparticle':'particles/taken-gem.plist',
    battlefieldaction:"",battlefieldparticle:"",duration:1,
    'target1type':targettype.enemy,'target1num':-1,target1needalive:true,'target1action':'defense','target1particle':'particles/taken-gem.plist','target1effecttype':'decHP','target1effectvalue':5,
     'target2type':targettype.none,'target2num':0,target2needalive:false,'target2action':'','target2particle':'','target2effecttype':'','target2effectvalue':0},
    
     {'id':2,'icon':'soul.png','name':'skill2','type':skilltype.heal,'expclass':1,'specialrate':1,customaction:'guard',
    'eventid':"beDefender",'eventisenemy':0,eventisself:0,'rate':1,'cooldown':0,energy:0,
    condition:"self,alive,1;",
    'useraction':'','userparticle':'particles/taken-gem.plist',
    battlefieldaction:"",battlefieldparticle:"",duration:1,
    'target1type':targettype.eventtarget,'target1num':1,target1needalive:true,'target1action':'defense','target1particle':'particles/taken-gem.plist','target1effecttype':'incHP','target1effectvalue':5,
     'target2type':targettype.none,'target2num':0,target2needalive:false,'target2action':'','target2particle':'','target2effecttype':'','target2effectvalue':0},
      
      {'id':3,'icon':'soul.png','name':'skill1','type':skilltype.magicattack,'expclass':1,'specialrate':1,
    'eventid':gameevent.active,'eventisenemy':0,eventisself:0,'rate':1,'cooldown':0,energy:0,customaction:"missile",
    condition:"self,alive,1;enemy,alive,1;",
    param:"1,boarder_top.png,particles/taken-gem.plist,particles/taken-gem.plist,curve,1,10,100,10,20,magic,0.5",
    'useraction':'magic','userparticle':'particles/taken-gem.plist',
    battlefieldaction:"",battlefieldparticle:"",duration:1,
    'target1type':targettype.enemy,'target1num':-1,target1needalive:true,'target1action':'','target1particle':'','target1effecttype':'addBuff','target1effectvalue':1,
     'target2type':targettype.none,'target2num':0,target2needalive:false,'target2action':'','target2particle':'','target2effecttype':'','target2effectvalue':0},
     
];

