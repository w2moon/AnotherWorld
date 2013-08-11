
SECRET_KEY = 'ebv2*u)qdlk+u9wdtl-1cl6ct5gfj-3wu$!6of*gjy+f2zsc@b';

LOGIN_SERVER = 'http://192.168.0.78:8080/anotherworld/account/';
//LOGIN_SERVER = 'http://192.168.1.105:8080/anotherworld/account/';
//LOGIN_SERVER = 'http://www.loviyou.com:8080/anotherworld/account/';

USE_VIRTUAL_HTTP = false;

VERSION = 1;


if(typeof( cc.Util) != "undefined"){
	USE_CCB = false;
    
}
else{
    USE_CCB = true;
    USE_VIRTUAL_HTTP = true;
}

var HEAD_MASK = "human_head.png"

var MAX_BATTLE_TURN = 30;

var ACTION_INTERVAL = 0.5;

var UPDATE_WAIT = 0.016;

var DEFAULT_HEAD_WIDTH = 256;
var DEFAULT_HEAD_HEIGHT = 256;

var EQUIP_WEAPONR = 0;
var EQUIP_WEAPONL = 1;
var EQUIP_CLOTH = 2;
var EQUIP_TRINKET = 3;
var EQUIP_NUM = 4;

var SLOT_NUM = 5;

var HERO_IDX = 4;