var stageinfo = function(){};

stageinfo.prototype.onDidLoadFromCCB = function(){
};

stageinfo.prototype.onCreate = function(stageid){
    this.info = stage[stageid]

    /*
    //show name
    this.lblname.setString(lang(this.info.name));

    //show enemy
    this.einfo = null;
    this.elevel = 1;
    var heroes = parse_enemy(this.info.hero);
    if(heroes.length > 0 && wl.tonumber(heroes[0][0]) == 0){
        this.einfo = enemy[wl.tonumber(heroes[0][0])];
        this.elevel = wl.tonumber(heroes[0][1]);
    }
    else{
        var enemies = parse_enemy(this.info.enemy);
        for(var i=enemies.length-1;i>=0;i--){
            if(enemies[i][0] == 0){
                continue;
            }
            this.einfo = enemy[wl.tonumber(enemies[i][0])];
            this.elevel = wl.tonumber(enemies[i][1]);
            break;
        }
        
    }

    var enemysoul = soulbase[this.einfo.soulid];
    
    var card = wl.load_scene("uicard",parse_action_params(enemysoul.avatar)[0]); 
    this.rootNode.addChild(card);

    //show reward
    var rewards = wl.parse_skill_params(this.info.reward);
    var x = 0;
    var y = 0;
    for(var r in rewards){
        var reward = wl.load_scene("rewardslot",rewards[r][1],rewards[r][2]);
        reward.setPosition(cc.p(x,y));
        this.lootpanel.addChild(reward);

        x = x + reward.controller.bg.getContentSize().width;
    }
    */
};

stageinfo.prototype.onPressStart = function(){
    wl.run_scene(this.info.res,this.info,1);
};

stageinfo.prototype.onPressCancel = function(){
    this.rootNode.removeFromParent()
};