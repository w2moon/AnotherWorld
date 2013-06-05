(function(){


  wl.skillactions.missile = function(skill,trigger,event_targets){

       var params = parse_skill_params(skill.getBase().param);
        
       var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,targettype.enemy,parseInt(params[0]),skill.warrior.getTraveller().getNature(),true,trigger,event_targets);
        
       var tasks = [];
        
       var possrc = skill.getBattleField().getAttackPosition(skill.warrior);

       tasks.push([skill.warrior,skill.warrior.magic, []]);

       
       
       for(var k in targets){
            
            var posdes = skill.getBattleField().getAttackPosition(targets[k]);

            tasks.push([wl.actionbase,wl.actionbase.move_to, [skill.warrior,posdes]]);

            tasks.push([targets[k],targets[k].beDefender,[skill.warrior]]);
          
       }
 
       skill.getBattleField().addTasks(tasks);
  };

  }());