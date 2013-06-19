(function(){


  wl.skillactions.assist_attack = function(skill,trigger,event_targets){
        
        var targets = event_targets;
        

        var tasks = [];

        var possrc = skill.getBattleField().getAttackPosition(skill.warrior);
        
        
        for(var k in targets){
            
            var posdes = skill.getBattleField().getAttackPosition(targets[k]);

            tasks.push([wl.actionbase,wl.actionbase.move_to, [skill.warrior,posdes]]);
            tasks.push([skill,skill.delay,[0.4]]);


            
            tasks.push([skill.warrior,skill.warrior.attack, [targets[k]]]);
            tasks.push([skill.warrior,skill.warrior.incEnergy, [1]]);
            tasks.push([skill,skill.delay,[0.4]]);

            break;
        }

        
        
        tasks.push([wl.actionbase,wl.actionbase.move_to, [skill.warrior,possrc]]);
        tasks.push([skill,skill.delay,[0.4]]);
        
        skill.getBattleField().addTasks(tasks);
  };

  }());