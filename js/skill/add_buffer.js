(function(){


  wl.skillactions.add_buffer = function(skill,trigger,event_targets){
      
        var params = parse_action_params(skill.getBase().param);
        var targets = event_targets
        cc.log(skill.warrior.getTraveller().getName())

        var tasks = [];

        tasks.push([skill.warrior,skill.warrior.particle,[params[2]]]);
        tasks.push([skill,skill.delay,[0.4]]);
        

        if(params[0] == targettype.eventtarget){
             for(var k in targets){
                if(params[4] != null){
                    tasks.push([targets[k],targets[k].particle,[params[4]]]);
                    cc.log(targets[k].getTraveller().getName())
                }
                tasks.push([targets[k],targets[k].addBuff,[parseInt(params[1])]]);
                tasks.push([skill,skill.delay,[0.01]]);
            }
        }
        else{
             var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,params[0],parseInt(params[3]),skill.warrior.getTraveller().getNature(),true,trigger,event_targets);
       
            for(var k in targets){
                if(params[4] != null){
                    tasks.push([targets[k],targets[k].particle,[params[4]]]);
                }
                tasks.push([targets[k],targets[k].addBuff,[parseInt(params[1])]]);
                tasks.push([skill,skill.delay,[0.01]]);
            }
        }
       /* else{
            
            tasks.push([skill.warrior,skill.warrior.addBuff,[parseInt(params[1])]]);
            tasks.push([skill,skill.delay,[0.01]]);
        }*/

         
        
        skill.getBattleField().addTasks(tasks);
  };

  }());