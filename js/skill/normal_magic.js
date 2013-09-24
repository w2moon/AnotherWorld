(function(){


  wl.skillactions.normal_magic = function(skill,trigger,event_targets){
      
        var params = parse_action_params(skill.getBase().param);
        var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,params[0],parseInt(params[1]),skill.warrior.getTraveller().getNature(),true,trigger,event_targets);
        

        var tasks = [];
       
        if(params[4] != null){
              tasks.push([skill.warrior,skill.warrior.particle,[params[4]]]);
     
                tasks.push([skill,skill.delay,[0.4]]);
        }
        
        
        for(var k in targets){
           

            tasks.push([targets[k],targets[k].beDefender,[skill.warrior]]);
            tasks.push([skill,skill.delay,[0.01]]);

            tasks.push([targets[k],targets[k].defense,[skill.warrior]]);
            tasks.push([skill,skill.delay,[0.01]]);

            
            tasks.push([skill.warrior,skill.warrior.attack, [targets[k],params[2],parseInt(params[3])]]);
            
            tasks.push([skill,skill.delay,[0.4]]);
        }
        tasks.push([skill.warrior,skill.warrior.incEnergy, [1]]);
        
        
        skill.getBattleField().addTasks(tasks);
  };

  }());