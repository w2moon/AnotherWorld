var stageinfo = function(){};

stageinfo.prototype.onDidLoadFromCCB = function(){
};

stageinfo.prototype.onCreate = function(stageid,submapid){
    this.info = stage[stageid];
    this.submapid = submapid;

    
    //show name
    this.lblstagename.setString(lang(this.info.name));

    //show enemy
    this.einfo = null;
    this.elevel = 1;
    var heroes = parse_enemy(this.info.hero);
    if(heroes.length > 0 && wl.tonumber(heroes[0][0]) != 0){
        this.einfo = enemy[wl.tonumber(heroes[0][0])];
        this.elevel = wl.tonumber(heroes[0][1]);
    }
    else{
        var enemies = parse_enemy(this.info.enemy);
        for(var i=enemies.length-1;i>=0;i--){
            if(wl.tonumber(enemies[i][0]) == 0){
                continue;
            }
            cc.log("en"+wl.tonumber(enemies[i][0]))
            this.einfo = enemy[wl.tonumber(enemies[i][0])];
            this.elevel = wl.tonumber(enemies[i][1]);
            break;
        }
        
    }

    var enemysoul = soulbase[this.einfo.soulid];
    
    var avatar = parse_action_params(enemysoul.avatar);
    var ske = avatar.shift();
    var card = wl.load_scene("uicard",ske,avatar);
    card.setPosition(this.travellercard.getPosition());
    this.rootNode.addChild(card);
    this.travellercard.removeFromParent();
    
    this.lblenemyname.setString(lang(enemysoul.name));

    //show reward
    var rewards = parse_skill_params(this.info.reward);

    if(!wl.gvars.role.isCompleteStage(stageid)){
        var tmp = parse_skill_params(this.info.rewardfirst);
        rewards = tmp.concat(rewards);
    }

    
    var x = null;
    var y = 167;

    for(var r in rewards){
        var reward = wl.load_scene("rewardslot",rewards[r][1],wl.tonumber(rewards[r][2]));
        if(x == null){
            x = this.rootNode.getContentSize().width/2 - (rewards.length-1)*(5+reward.controller.bg.getContentSize().width)/2;
        }
        reward.setPosition(cc.p(x,y));
        this.rootNode.addChild(reward);

        x = x + 5+reward.controller.bg.getContentSize().width;
    }
    
};

stageinfo.prototype.onPressStart = function(){
    if(this.info.hpcost > wl.gvars.role.getHP()){
        wl.popmsg(lang("BATTLE_NOTENOUGH_HP"));
        return;
    }
    if(this.info.levelneed > wl.gvars.role.getLevel()){
        wl.popmsg(lang("BATTLE_NOTENOUGH_LEVEL"));
        return;
    }
     var msg = wl.msg.create("battle_stage");
     msg.stage_id = this.info.id;
     msg.level = 1;
     msg.submap = this.submapid;
     wl.http.send(msg,this.on_battle_stage,this);

    
};

stageinfo.prototype.on_battle_stage = function(ret){
    if(ret.rc != retcode.BATTLE_RESULT_WIN && ret.rc != retcode.BATTLE_RESULT_FAIL){
        cc.log("on_battle_stage failed:"+ret.rc);
        return;
    }
    wl.run_scene(this.info.res,this.info,ret);
};

stageinfo.prototype.onPressCancel = function(){
    this.rootNode.removeFromParent()
};