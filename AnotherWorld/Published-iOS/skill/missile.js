(function(){


  wl.skillactions.missile = function(skill,trigger,event_targets){
  
       var params = parse_action_params(skill.getBase().param);
        
       var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,targettype.enemy,parseInt(params[0]),skill.warrior.getTraveller().getNature(),true,trigger,event_targets);
        
       var tasks = [];
        
       var possrc = skill.getBattleField().getAttackPosition(skill.warrior);

       tasks.push([skill.warrior,skill.warrior.magicCastStart, []]);
 
       for(var k in targets){
            
            var posdes = skill.getBattleField().getAttackPosition(targets[k]);
            var token = wl.create_uitoken();
            token.addBodyImage(params[1]);
            token.addBodyParticle(params[2]);
            token.setExplodeParticle(params[3]);
            token.setPosition(possrc);

            skill.getBattleField().addChild(token);
            token.hide();
            tasks.push([token,token.show, []]);
            if(params[4] == "curve"){
                tasks.push([token,token.curveTo,[params[5],posdes,wl.randPosition(possrc,params[6],params[7]),wl.randPosition(possrc,params[8],params[9]),true]]);
            }
            else{
                tasks.push([token,token.curveTo,[params[5],posdes,true]]);
            }
            
            tasks.push([skill,skill.delay,[params[5]]]);
            tasks.push([token,token.explode, [skill.getBattleField(),posdes]]);
          
       }

       tasks.push([skill.warrior,skill.warrior.magicCastFinish, []]);

       skill.getBattleField().addTasks(tasks);
  };

  }());