

(function(){


  wl.skillactions.counter_attack = function(skill,trigger,event_targets){
       var tasks = [];

       var params = parse_action_params(skill.getBase().param);
       tasks.push([skill.warrior,skill.warrior.particle,[params[2]]]);
        tasks.push([skill,skill.delay,[0.4]]);
        
          for(var k in targets){
            var posdes = skill.getBattleField().getAttackPosition(targets[k]);

            tasks.push([targets[k],targets[k].defense,[skill.warrior]]);
            tasks.push([skill,skill.delay,[0.01]]);
            
            tasks.push([skill.warrior,skill.warrior.attack, [targets[k],params[0],parseInt(params[1]),true]]);
            tasks.push([skill,skill.delay,[0.4]]);

            break;
        }

        
       skill.getBattleField().addTasks(tasks);
  };

  }());