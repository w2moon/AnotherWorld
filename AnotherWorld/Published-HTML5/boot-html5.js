(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:true,
        showFPS:true,
        loadExtension:true,
        frameRate:60,
        tag:'gameCanvas', //the dom element to run cocos2d on
        //engineDir:'../../../../cocos2d/',
        SingleEngineFile:'cocos2d-html5.min.js',
        appFiles:[
          'MainScene.js',
    'app.js',
    'config.js',
    'data/anim.js',
    'data/buffbase.js',
    'data/equipmentbase.js',
    'data/equipmentset.js',
    'data/itembase.js',
    'data/lang.js',
    'data/retcode.js',
    'data/skillbase.js',
    'data/soulbase.js',
    'data/soulset.js',
    'extra/class.js',
    'extra/dispatcher.js',
    'extra/functask.js',
    'extra/gfunc.js',
    'extra/hashlib.js',
    'extra/header.js',
    'extra/http.js',
    'extra/json.js',
    'extra/msg.js',
    'extra/seedrandom.js',
    'extra/virtualhttp.js',
    'header.js',
    'objects/buff.js',
    'objects/equipment.js',
    'objects/item.js',
    'objects/itemfactory.js',
    'objects/player.js',
    'objects/role.js',
    'objects/skill.js',
    'objects/soul.js',
    'objects/traveller.js',
    'objects/warrior.js',
    'scene/battlefield.js',
    'scene/battleresult.js',
    'scene/battlescene.js',
    'scene/loginscene.js',
    'scene/mainmap.js',
    'scene/mainscene.js',
    'scene/pvpscene.js',
    'scene/questscene.js',
    'scene/storescene.js',
    'scene/submapscene.js',
    'scene/travellercreate.js',
    'scene/travellermodify.js',
    'scene/travellername.js',
    'skill/add_buffer.js',
    'skill/assist_attack.js',
    'skill/assist_heal.js',
    'skill/base.js',
    'skill/counter_attack.js',
    'skill/guard.js',
    'skill/instant_kill.js',
    'skill/missile.js',
    'skill/normal_attack.js',
    'skill/normal_heal.js',
    'skill/valuebase_heal.js',
    'state/action.js',
    'state/anim.js',
    'state/endturn.js',
    'state/finish.js',
    'state/newturn.js',
    'state/normal.js',
    'state/start.js',
    'ui/card.js',
    'ui/charactor.js',
    'ui/create_ui.js',
    'ui/indicator.js',
    'ui/loading.js',
    'ui/stageinfo.js',
    'ui/token.js',
    'ui/uiitem.js',
    'ui/uisoul.js',

            'resources-html5.js',
            'boot2-html5.js'
            ]

};
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

            //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile
    });
})();
