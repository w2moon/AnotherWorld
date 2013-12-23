// Autogenerated main.js file

require("jsb.js");

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
require("extra/ccbpatch.js");
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
require("scene/combinesoul.js");
require("scene/equipchoose.js");
require("scene/equipmake.js");
require("scene/equipstarup.js");
require("scene/friendscene.js");
require("scene/loginscene.js");
require("scene/mainmap.js");
require("scene/mainscene.js");
require("scene/mapcontainer.js");
require("scene/pvpscene.js");
require("scene/questscene.js");
require("scene/starupsoul.js");
require("scene/storescene.js");
require("scene/submapscene.js");
require("scene/travellercreate.js");
require("scene/travellerinfo.js");
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
require("skill/multi_attack.js");
require("skill/normal_attack.js");
require("skill/normal_heal.js");
require("skill/normal_magic.js");
require("skill/shoot.js");
require("skill/valuebase_heal.js");
require("state/action.js");
require("state/anim.js");
require("state/endturn.js");
require("state/finish.js");
require("state/newturn.js");
require("state/normal.js");
require("state/start.js");
require("ui/applicantbar.js");
require("ui/bluebar.js");
require("ui/card.js");
require("ui/charactor.js");
require("ui/create_ui.js");
require("ui/datapanel.js");
require("ui/equipbar.js");
require("ui/equipmakeresult.js");
require("ui/friendbar.js");
require("ui/indicator.js");
require("ui/infobox.js");
require("ui/loading.js");
require("ui/prochange.js");
require("ui/resultlevelup.js");
require("ui/resultreward.js");
require("ui/rewardbtn.js");
require("ui/rewardslot.js");
require("ui/searchbar.js");
require("ui/selectbar.js");
require("ui/skillbar.js");
require("ui/soulbar.js");
require("ui/stageinfo.js");
require("ui/starupresult.js");
require("ui/token.js");
require("ui/uiitem.js");
require("ui/uisoul.js");
require("virtual/battle_ranking.js");
require("virtual/battle_stage.js");
require("virtual/equip_enhence.js");
require("virtual/equip_make.js");
require("virtual/friend_applicant_list.js");
require("virtual/friend_apply.js");
require("virtual/friend_approve.js");
require("virtual/friend_delete.js");
require("virtual/friend_list.js");
require("virtual/friend_refuse.js");
require("virtual/friend_reward_get.js");
require("virtual/friend_reward_list.js");
require("virtual/login.js");
require("virtual/mail_read.js");
require("virtual/mail_receive.js");
require("virtual/mail_send.js");
require("virtual/region_enter.js");
require("virtual/region_list.js");
require("virtual/register.js");
require("virtual/role_create.js");
require("virtual/role_search.js");
require("virtual/role_slot.js");
require("virtual/soul_combine.js");
require("virtual/soul_starup.js");
require("virtual/traveller_create.js");
require("virtual/traveller_modify.js");


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