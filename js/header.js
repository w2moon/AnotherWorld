var g = g || {};

require("config.js");

require("extra/header.js");

require("data/retcode.js");
require("data/buffbase.js");
require("data/lang.js");
require("data/skillbase.js");
require("data/equipmentbase.js");
require("data/soulbase.js");
require("data/equipmentset.js");
require("data/soulset.js");



require("objects/itemfactory.js");
require("objects/skill.js");
require("objects/buff.js");
require("objects/item.js");
require("objects/equipment.js");
require("objects/soul.js");
require("objects/traveller.js");
require("objects/warrior.js");
require("objects/role.js");
require("objects/player.js");

require("skill/base.js");
require("skill/guard.js");
require("skill/normal_attack.js");
require("skill/assist_attack.js");
require("skill/counter_attack.js");
require("skill/multi_attack.js");
require("skill/missile.js");
require("skill/add_buffer.js");
require("skill/normal_heal.js");
require("skill/assist_heal.js");
require("skill/valuebase_heal.js");
require("skill/normal_magic.js");
require("skill/instant_kill.js");
require("skill/shoot.js");

require("ui/loading.js");
require("ui/indicator.js");
require("ui/card.js");
require("ui/token.js");
require("ui/stageinfo.js");
require("ui/create_ui.js");
require("ui/skillbar.js");
require("ui/equipbar.js");
require("ui/bluebar.js");
require("ui/selectbar.js");
require("ui/soulbar.js");
require("ui/rewardslot.js");
require("ui/datapanel.js");
require("ui/resultreward.js");
require("ui/resultlevelup.js");
require("ui/infobox.js");
require("ui/starupresult.js");
require("ui/equipmakeresult.js");

require("state/normal.js");
require("state/start.js");
require("state/newturn.js");
require("state/action.js");
require("state/endturn.js");
require("state/finish.js");
require("state/anim.js");

require("scene/loginscene.js");
require("scene/battlescene.js");
require("scene/battlefield.js");
require("scene/battleresult.js");
require("scene/mainscene.js");
require("scene/submapscene.js");
require("scene/mainmap.js");
require("scene/pvpscene.js");
require("scene/travellercreate.js");
require("scene/travellermodify.js");
require("scene/travellername.js");
require("scene/travellerinfo.js");
require("scene/equipchoose.js");
require("scene/mapcontainer.js");
require("scene/combinesoul.js");
require("scene/starupsoul.js");
require("scene/equipmake.js");
require("scene/equipstarup.js");