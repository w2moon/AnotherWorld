(function(){


  wl.skillactions.add_buffer = function(skill,trigger,event_targets){
      
        var params = parse_action_params(skill.getBase().param);
        var targets = event_targets
        

        var tasks = [];

        tasks.push([skill.warrior,skill.warrior.particle,[params[2]]]);
        tasks.push([skill,skill.delay,[0.4]]);

        if(params[0] == targettype.eventtarget){
             for(var k in targets){

                tasks.push([targets[k],targets[k].addBuff,[parseInt(params[1])]]);
                tasks.push([skill,skill.delay,[0.01]]);
            }
        }
        else{
            tasks.push([skill.warrior,skill.warrior.addBuff,[parseInt(params[1])]]);
            tasks.push([skill,skill.delay,[0.01]]);
        }

         
        
        skill.getBattleField().addTasks(tasks);
  };

  }());