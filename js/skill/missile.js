(function(){


  wl.skillactions.missile = function(skill,trigger,event_targets){

       var params = parse_skill_params(skill.getBase().param);
        
       var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,targettype.enemy,parseInt(params[0]),skill.warrior.getTraveller().getNature(),true,trigger,event_targets);
        
       var tasks = [];
        
       var possrc = skill.getBattleField().getAttackPosition(skill.warrior);

       tasks.push([skill.warrior,skill.warrior.magic, []]);

       
       
       for(var k in targets){
            
            var posdes = skill.getBattleField().getAttackPosition(targets[k]);

            var token = wl.create_uitoken();
            token.addBodyImage(param[1]);
            token.addBodyParticle(param[2]);
            token.setExplodeParticle(param[3]);
            skill.getBattleField().addChild(token);
            token.hide();

            tasks.push([token,token.show, []]);

            tasks.push([token,token.moveTo,[posdes]]);

            tasks.push([token,token.explode, []]);
          
       }
 
       skill.getBattleField().addTasks(tasks);
  };

  }());