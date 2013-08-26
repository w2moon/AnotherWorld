
if(typeof SECRET_KEY == "undefined"){
SECRET_KEY = 'ebv2*u)qdlk+u9wdtl-1cl6ct5gfj-3wu$!6of*gjy+f2zsc@b';

LOGIN_SERVER = 'http://192.168.0.78:8080/anotherworld/account/';
//LOGIN_SERVER = 'http://192.168.1.105:8080/anotherworld/account/';
//LOGIN_SERVER = 'http://www.loviyou.com:8080/anotherworld/account/';

USE_VIRTUAL_HTTP = true;

VERSION = 1;


if(typeof( cc.Util) != "undefined"){
	USE_CCB = false;
    
}
else{
    USE_CCB = true;
    USE_VIRTUAL_HTTP = true;
}

 HEAD_MASK = "human_head.png"

 MAX_BATTLE_TURN = 30;

 ACTION_INTERVAL = 0.5;

 UPDATE_WAIT = 0.016;

 DEFAULT_HEAD_WIDTH = 256;
 DEFAULT_HEAD_HEIGHT = 256;

 EQUIP_WEAPONR = 0;
 EQUIP_WEAPONL = 1;
 EQUIP_CLOTH = 2;
 EQUIP_TRINKET = 3;
 EQUIP_NUM = 4;

 EQUIP_SOUL = 4;
 EQUIP_SKILL1 = 5;
 EQUIP_SKILL2 = 6;

 SLOT_NUM = 5;

 HERO_IDX = 4;


 ORDER_DEFAULT = 0;
 ORDER_RARITY = 1;
 ORDER_NAME = 2;
}