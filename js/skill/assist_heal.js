(function(){


  wl.skillactions.assist_heal = function(skill,trigger,event_targets){
      
        var params = parse_action_params(skill.getBase().param);
        var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,params[0],parseInt(params[1]),naturetype.lowesthp,true,trigger,event_targets);
        
        

        var tasks = [];
        
        tasks.push([skill.warrior,skill.warrior.particle,[params[4]]]);
        tasks.push([skill,skill.delay,[0.4]]);
        for(var k in targets){


            
            tasks.push([skill.warrior,skill.warrior.heal, [targets[k],params[2],parseInt(params[3]),true]]);

            tasks.push([skill.warrior,skill.warrior.particle,[params[5]]]);
            
           
        }
        tasks.push([skill,skill.delay,[0.4]]);
        
        
        
        skill.getBattleField().addTasks(tasks);
  };

  }());