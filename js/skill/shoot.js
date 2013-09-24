(function(){


  wl.skillactions.shoot = function(skill,trigger,event_targets){
  
       var params = parse_action_params(skill.getBase().param);
        
       var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,targettype.enemy,parseInt(params[1]),params[0],true,trigger,event_targets);
        
       var tasks = [];
        

       
 
       for(var k in targets){
            
            tasks.push([skill.warrior,skill.warrior.shoot, []]);
            tasks.push([skill,skill.delay,[0.4]]);

            var posdes = skill.getBattleField().getAttackPosition(targets[k]);
            var token = wl.create_uitoken();
            token.addBodyImage(params[2]);
            token.addBodyParticle(params[3]);
            token.setExplodeParticle(params[4]);
            token.setPosition(possrc);

            skill.getBattleField().addChild(token);
            token.hide();
            tasks.push([token,token.show, []]);
            if(params[5] == "curve"){
                tasks.push([token,token.curveTo,[params[8],posdes,wl.randPosition(possrc,params[9],params[10]),wl.randPosition(possrc,params[11],params[12]),true]]);
            }
            else{
                tasks.push([token,token.curveTo,[params[8],posdes,true]]);
            }
            
            tasks.push([skill,skill.delay,[params[8]]]);

             tasks.push([targets[k],targets[k].beDefender,[skill.warrior]]);
            tasks.push([skill,skill.delay,[0.01]]);

            tasks.push([targets[k],targets[k].defense,[skill.warrior]]);
            tasks.push([skill,skill.delay,[0.01]]);

            tasks.push([token,token.explode, [skill.getBattleField(),posdes]]);
          tasks.push([skill.warrior,skill.warrior.attack, [targets[k],params[6],parseInt(params[7])]]);
       }


       skill.getBattleField().addTasks(tasks);
  };

  }());