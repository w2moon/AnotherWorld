
SECRET_KEY = 'ebv2*u)qdlk+u9wdtl-1cl6ct5gfj-3wu$!6of*gjy+f2zsc@b';

LOGIN_SERVER = 'http://192.168.0.78:8080/anotherworld/account/';
//LOGIN_SERVER = 'http://192.168.1.105:8080/anotherworld/account/';
//LOGIN_SERVER = 'http://www.loviyou.com:8080/anotherworld/account/';

USE_VIRTUAL_HTTP = false;

VERSION = 1;

USE_CCB = true;
if(typeof( cc.Util) != "undefined"){
	USE_CCB = false;
}

var MAX_BATTLE_TURN = 30;

var ACTION_INTERVAL = 0.5;

var UPDATE_WAIT = 0.016;

var DEFAULT_HEAD_WIDTH = 256;
var DEFAULT_HEAD_HEIGHT = 256;

var EQUIP_WEAPON = 0;
var EQUIP_CLOTH = 1;
var EQUIP_TRINKET = 2;
var EQUIP_NUM = 3;