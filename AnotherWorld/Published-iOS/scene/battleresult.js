 var battleresult = function(){}
battleresult.prototype.onDidLoadFromCCB = function()
{
};


battleresult.prototype.onCreate = function(result,info,clientresult)
{
    this.result = result;

    if(result.virtualhttp && result.rc != clientresult){
        cc.log("result not same with server");
        return;
    }
    
    if(result.rc == retcode.BATTLE_RESULT_FAIL){
    //fail
      //  return;
    }

    var completestate = wl.gvars.role.completeStage(result.stage_id,result.level);

    if(result.virtualhttp){
        //win
        result.reward = wl.addReward(parse_skill_params(info.reward),result.level);
        if(!wl.gvars.role.isCompleteStage(info.id)){
             var tmp = wl.addReward(parse_skill_params(this.info.rewardfirst),result.level);
             wl.merge_reward(result.reward,tmp);
        }

        if(completestate == COMPLETE_FIRST || completestate == COMPLETE_LEVEL){
            var stages = parse_action_params(submaps[result.submap].stages);
            var allclear = true;
            for(var k in stages){
                if(!wl.gvars.role.isCompleteStage(stages[k],result.level)){
                    allclear = false;
                    break;
                }
            }
            if(allclear){
                var equip = wl.gvars.role.findEquip(submaps[result.submap].trinket);
                if(equip == null){
                    result.trinket = wl.create_equip(submaps[result.submap].trinket);
                }
                else{
                    result.trinket = wl.copy(equip.dbobj);
                    result.trinket.skilllevel = result.level;
                }
            }
         }
    }
    else{
        wl.gvars.role.setHP(result.reward.hp);
        wl.gvars.role.setCopper(result.reward.copper);
        wl.gvars.role.setGold(result.reward.gold);
        wl.gvars.role.setExp(result.reward.exp);
        wl.gvars.role.setLevel(result.reward.level);
        wl.gvars.role.setExtraSoulNum(result.reward.extrasoulnum);
        wl.gvars.role.setExtraEquipmentNum(result.reward.extraequipmentnum);
        wl.gvars.role.setExtraTravellerNum(result.reward.extratravellernum);
    }

    
    
    
    var rewards = [];
    for(var k in result.reward){
        switch(k)
        {
        case "equipments":
            for(var sk in result.reward[k]){
                wl.gvars.role.addEquip(result.reward[k][sk]);
                rewards.push([1,"addEquip",result.reward[k][sk].baseid]);
            }
        break;
        case "souls":
            for(var sk in result.reward[k]){
                wl.gvars.role.addSoul(result.reward[k][sk]);
                rewards.push([1,"addSoul",result.reward[k][sk].baseid]);
            }
        break;
        case "addexp":
            if(result.reward[k] == 0){
                continue;
            }
            if(result.virtualhttp){
                wl.gvars.role.addExp(result.reward[k]);
            }
            rewards.push([1,"addExp",result.reward[k]]);
        break;
        case "addhp":
            if(result.reward[k] == 0){
                continue;
            }
            if(result.virtualhttp){
                wl.gvars.role.addHP(result.reward[k]);
            }
            rewards.push([1,"addHP",result.reward[k]]);
        break;
        case "addcopper":
            if(result.reward[k] == 0){
                continue;
            }
            if(result.virtualhttp){
                wl.gvars.role.addCopper(result.reward[k]);
            }
            rewards.push([1,"addCopper",result.reward[k]]);
        break;
        case "addgold":
            if(result.reward[k] == 0){
                continue;
            }
            if(result.virtualhttp){
                wl.gvars.role.addGold(result.reward[k]);
            }
            rewards.push([1,"addGold",result.reward[k]]);
        break;
        case "addlevel":
            if(result.reward[k] == 0){
                continue;
            }
            if(result.virtualhttp){
                wl.gvars.role.addLevel(result.reward[k]);
            }
            rewards.push([1,"addLevel",result.reward[k]]);
        break;
        case "addextrasoulnum":
            if(result.reward[k] == 0){
                continue;
            }
            if(result.virtualhttp){
                wl.gvars.role.addExtraSoulNum(result.reward[k]);
            }
            rewards.push([1,"addExtraSoulNum",result.reward[k]]);
        break;
        case "addextraequipmentnum":
            if(result.reward[k] == 0){
                continue;
            }
            if(result.virtualhttp){
                wl.gvars.role.addExtraEquipmentNum(result.reward[k]);
            }
            rewards.push([1,"addExtraEquipmentNum",result.reward[k]]);
        break;
        case "addextratravellernum":
            if(result.reward[k] == 0){
                continue;
            }
            if(result.virtualhttp){
                wl.gvars.role.addExtraTravellerNum(result.reward[k]);
            }
            rewards.push([1,"addExtraTravellerNum",result.reward[k]]);
        break;
        }
    }

    if(result.trinket != null){
        wl.gvars.role.addEquip(result.trinket);
        rewards.push([1,"addEquip",result.trinket.baseid]);
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



battleresult.prototype.onPressOK = function()
{
    wl.run_scene("mainscene",this.result.submap);
};