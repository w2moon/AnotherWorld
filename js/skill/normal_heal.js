(function(){


  wl.skillactions.normal_heal = function(skill,trigger,event_targets){
      
        var params = parse_action_params(skill.getBase().param);
        var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,params[0],parseInt(params[1]),naturetype.lowesthp,true,trigger,event_targets);
        
        

        var tasks = [];
        
        
        for(var k in targets){


            
            tasks.push([skill.warrior,skill.warrior.heal, [targets[k],params[2],parseInt(params[3])]]);
            tasks.push([targets[k],targets[k].particle,[params[4]]]);
            
            tasks.push([skill,skill.delay,[0.4]]);

             
        }
        tasks.push([skill.warrior,skill.warrior.incEnergy, [1]]);
        
        
        
        skill.getBattleField().addTasks(tasks);
  };

  }());