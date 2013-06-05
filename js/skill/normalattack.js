(function(){


  wl.skillactions.normalattack = function(skill,trigger,event_targets){
      
        var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,targettype.enemy,1,skill.warrior.getTraveller().getNature(),true,trigger,event_targets);
        
        

        var tasks = [];

        var possrc = skill.getBattleField().getAttackPosition(skill.warrior);
        
        
        for(var k in targets){
            
            var posdes = skill.getBattleField().getAttackPosition(targets[k]);

            tasks.push([wl.actionbase,wl.actionbase.move_to, [skill.warrior,posdes]]);

            tasks.push([targets[k],targets[k].beDefender,[skill.warrior]]);

            
            tasks.push([skill.warrior,skill.warrior.attack, [targets[k]]]);
            tasks.push([skill.warrior,skill.warrior.incEnergy, [1]]);
        }

        
        
        tasks.push([wl.actionbase,wl.actionbase.move_to, [skill.warrior,possrc]]);
        
        skill.getBattleField().addTasks(tasks);
  };

  }());