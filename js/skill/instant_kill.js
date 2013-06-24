(function(){


  wl.skillactions.instant_kill = function(skill,trigger,event_targets){
      
        var params = parse_action_params(skill.getBase().param);
        var targets = event_targets
        

        var tasks = [];
       
        
        for(var k in targets){
        
            var tokill = false;
            if(params[0] == "hppercent"){
                if((targets[k].getHP()*0.1/targets[k].getMaxHP())<=parseFloat(params[1])){
                    tokill = true;
                }
            }

            if(!tokill){
                continue;
            }

             tasks.push([skill.warrior,skill.warrior.particle,[params[2]]]);
            tasks.push([skill,skill.delay,[0.4]]);


            tasks.push([targets[k],targets[k].particle,[params[3]]]);
            tasks.push([skill,skill.delay,[0.4]]);

            tasks.push([targets[k],targets[k].decHP,[targets[k].getHP()]]);
            tasks.push([skill,skill.delay,[0.01]]);

          
        }
        
        
        skill.getBattleField().addTasks(tasks);
  };

  }());