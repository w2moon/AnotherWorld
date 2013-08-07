// Autogenerated main.js file

require("jsb.js");

require("MainScene.js");
require("app.js");
require("config.js");
require("data/anim.js");
require("data/buffbase.js");
require("data/equipmentbase.js");
require("data/equipmentset.js");
require("data/itembase.js");
require("data/lang.js");
require("data/retcode.js");
require("data/skillbase.js");
require("data/soulbase.js");
require("data/soulset.js");
require("extra/class.js");
require("extra/dispatcher.js");
require("extra/functask.js");
require("extra/gfunc.js");
require("extra/hashlib.js");
require("extra/header.js");
require("extra/http.js");
require("extra/json.js");
require("extra/msg.js");
require("extra/seedrandom.js");
require("extra/virtualhttp.js");
require("header.js");
require("objects/buff.js");
require("objects/equipment.js");
require("objects/item.js");
require("objects/itemfactory.js");
require("objects/player.js");
require("objects/role.js");
require("objects/skill.js");
require("objects/soul.js");
require("objects/traveller.js");
require("objects/warrior.js");
require("scene/battlefield.js");
require("scene/battleresult.js");
require("scene/battlescene.js");
require("scene/loginscene.js");
require("scene/mainmap.js");
require("scene/mainscene.js");
require("scene/pvpscene.js");
require("scene/questscene.js");
require("scene/storescene.js");
require("scene/submapscene.js");
require("scene/travellercreate.js");
require("scene/travellermodify.js");
require("scene/travellername.js");
require("skill/add_buffer.js");
require("skill/assist_attack.js");
require("skill/assist_heal.js");
require("skill/base.js");
require("skill/counter_attack.js");
require("skill/guard.js");
require("skill/instant_kill.js");
require("skill/missile.js");
require("skill/normal_attack.js");
require("skill/normal_heal.js");
require("skill/valuebase_heal.js");
require("state/action.js");
require("state/anim.js");
require("state/endturn.js");
require("state/finish.js");
require("state/newturn.js");
require("state/normal.js");
require("state/start.js");
require("ui/card.js");
require("ui/charactor.js");
require("ui/create_ui.js");
require("ui/indicator.js");
require("ui/loading.js");
require("ui/stageinfo.js");
require("ui/token.js");
require("ui/uiitem.js");
require("ui/uisoul.js");


function main()
{
	cc.FileUtils.getInstance().loadFilenameLookup("fileLookup.plist");
    //cc.Texture2D.setDefaultAlphaPixelFormat(6);
	var director = cc.Director.getInstance();
    var scene = cc.BuilderReader.loadAsScene("loginscene");
    var runningScene = director.getRunningScene();
    if (runningScene === null) director.runWithScene(scene);
    else director.replaceScene(scene);
}
main();