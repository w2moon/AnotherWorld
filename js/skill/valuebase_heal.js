(function(){


  wl.skillactions.valuebase_heal = function(skill,trigger,event_targets){
      
        var params = parse_action_params(skill.getBase().param);
        var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,params[0],parseInt(params[1]),skill.warrior.getTraveller().getNature(),true,trigger,event_targets);
        

        var tasks = [];
       
        tasks.push([skill.warrior,skill.warrior.particle,[params[3]]]);
        tasks.push([skill,skill.delay,[0.4]]);
        for(var k in targets){
        
           tasks.push([targets[k],targets[k].incHP, [skill.warrior.getProperty(params[5])*parseFloat(params[2])]]);
            tasks.push([targets[k],targets[k].particle,[params[4]]]);
            
          
        }
        tasks.push([skill,skill.delay,[0.4]]);
        
        skill.getBattleField().addTasks(tasks);
  };

  }());