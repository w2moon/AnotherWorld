
 
 var battleresult = function(){}
battleresult.prototype.onDidLoadFromCCB = function()
{
};


battleresult.prototype.onCreate = function(result,info,clientresult)
{

  if(!USE_CCB){
        this.rootNode.registerWithTouchDispatcher();
     }
     this.rootNode.onTouchesBegan = function( touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };
    this.rootNode.onMouseDown = function( event) {
        this.controller.onMouseDown(event);
        return true;
    };

    this.result = result;
    
    if(result.virtualhttp == null ){
        if(result.rc != clientresult){
            cc.log("result not same with server");
            return;
        }
    }
    else{
      result.rc = clientresult;
    }
    if(result.rc == retcode.BATTLE_RESULT_FAIL){
    //fail
        if(result.virtualhttp){
            var role = wl.parseJSON(wl.get("role_"+wl.gvars.role.getUserId()));
            role.hp -= info.hpcost;
            wl.set("role_"+wl.gvars.role.getUserId(),wl.toJSONString(role));
        }
        this.ended = true;
        return;
    }
    
    var sun = wl.load_scene("rollsun");
    sun.setPosition(cc.p(-this.rootNode.getContentSize().width/2,-82));
    wl.repeat_anim(sun,"start")
    this.rootNode.addChild(sun,-1);

    wl.gvars.role.subHP(info.hpcost);
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
        //wl.gvars.role.setHP(result.reward.hp);
        wl.gvars.role.setCopper(result.reward.copper);
        wl.gvars.role.setGold(result.reward.gold);
       // wl.gvars.role.setExp(result.reward.exp);
       // wl.gvars.role.setLevel(result.reward.level);
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
                wl.gvars.role.meet(result.reward[k][sk].baseid);
                rewards.push([1,"addSoul",result.reward[k][sk].baseid]);
                
            }
        break;
        case "blueprints":
            for(var sk in result.reward[k]){
                wl.gvars.role.addBlueprint(result.reward[k][sk]);
                rewards.push([1,"addBlueprint",result.reward[k][sk]]);
            }
        break;
        case "materials":
       
            for(var sk in result.reward[k]){
                wl.gvars.role.addMaterial(sk,result.reward[k][sk]);
                rewards.push([1,"addMaterial",sk,result.reward[k][sk]]);
            }
        break;
        case "addexp":
       // cc.log("c "+result.reward[k] )
            if(result.reward[k] == 0){
                //continue;
            }
           // if(result.virtualhttp){
             this.exppro = wl.gvars.role.addExp(result.reward[k]);
           // }
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
                cc.log("copper:"+wl.gvars.role.dbobj)
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


    if(result.virtualhttp){
        wl.virtual_role_save();
    }
   

    this.exppro.rewards = rewards;
    this.idx = 0;
     
    

  

    this.showNext();
    
};



battleresult.prototype.onPressOK = function()
{
    wl.run_scene("mapcontainer",this.result.submap);
};

battleresult.prototype.onTouchesBegan = function(touches,event)
{
	var loc = touches[0].getLocation();
	this.showNext();
};

battleresult.prototype.onMouseDown = function(event)
{
	var loc = event.getLocation();
	this.showNext();
};


battleresult.prototype.showNext = function()
{
    if(this.ended){
        wl.run_scene("mapcontainer",this.result.submap);
        return;
    }
    if(this.clip == null){
        var csize = this.bg.getContentSize();
        this.clip = wl.clipping_layer(csize.width,csize.height);
        this.clip.setPosition(-csize.width/2,-csize.height/2)
        this.rootNode.addChild(this.clip);
    }
    if(this.prescene){
        if(!this.prescene.controller.endAnim()){
            return;
        }
        this.prescene.removeFromParent();
        this.prescene = null;
    }

    var s = this.clip.getContentSize();
    while(this.idx < this.exppro.traveller.length && this.exppro.traveller[this.idx] != null){
        if(this.exppro.traveller[this.idx].pro.length >= 2){
            this.prescene = wl.load_scene("resultlevelup",this.exppro.traveller[this.idx]);
          
            this.prescene.setPosition(cc.p(s.width*3/2,s.height/2));
            this.clip.addChild(this.prescene);

            this.prescene.runAction(cc.Sequence.create(cc.MoveTo.create(0.4,cc.p(s.width/2,s.height/2)),cc.CallFunc.create(this.prescene.controller.playAnim,this.prescene.controller)));

            this.idx += 1;
            return;
        
        }
        this.idx += 1;
    }
     this.prescene = wl.load_scene("resultreward",this.exppro);
     
     this.prescene.setPosition(cc.p(s.width*3/2,s.height/2));
     this.prescene.runAction(cc.Sequence.create(cc.MoveTo.create(0.4,cc.p(s.width/2,s.height/2)),cc.CallFunc.create(this.prescene.controller.playAnim,this.prescene.controller)));

     this.clip.addChild(this.prescene);
     this.ended = true;
};