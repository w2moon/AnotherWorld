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
require("skill/missile.js");
require("skill/add_buffer.js");
require("skill/normal_heal.js");
require("skill/assist_heal.js");
require("skill/valuebase_heal.js");
require("skill/instant_kill.js");

require("ui/loading.js");
require("ui/indicator.js");
require("ui/card.js");
require("ui/token.js");


require("state/normal.js");
require("state/start.js");
require("state/newturn.js");
require("state/action.js");
require("state/endturn.js");
require("state/finish.js");

require("scene/loginscene.js");
require("scene/battlescene.js");
require("scene/mainscene.js");
require("scene/travellercreate.js");
require("scene/travellermodify.js");
require("scene/travellername.js");
