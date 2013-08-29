(function(){


  wl.skillactions.assist_attack = function(skill,trigger,event_targets){
        var params = parse_action_params(skill.getBase().param);
        var targets = event_targets;
        

        var tasks = [];
        
        var possrc = skill.getBattleField().getAttackPosition(skill.warrior);
        
        tasks.push([skill.warrior,skill.warrior.particle,[params[2]]]);
        tasks.push([skill,skill.delay,[0.4]]);

        for(var k in targets){
            var posdes = skill.getBattleField().getAttackPosition(targets[k]);

            tasks.push([wl.actionbase,wl.actionbase.move_to, [skill.warrior,posdes]]);
            tasks.push([skill,skill.delay,[MOVE_INTERVAL]]);

            tasks.push([targets[k],targets[k].defense,[skill.warrior]]);
            tasks.push([skill,skill.delay,[0.01]]);
            
            tasks.push([skill.warrior,skill.warrior.attack, [targets[k],params[0],parseInt(params[1]),true]]);
            tasks.push([skill,skill.delay,[0.4]]);

            break;
        }

        
        
        tasks.push([wl.actionbase,wl.actionbase.move_to, [skill.warrior,possrc]]);
        tasks.push([skill,skill.delay,[MOVE_INTERVAL]]);
        
        skill.getBattleField().addTasks(tasks);
  };

  }());