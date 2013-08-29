(function(){


  wl.skillactions.normal_attack = function(skill,trigger,event_targets){
      
        var params = parse_action_params(skill.getBase().param);
        var targets = skill.getBattleField().select_target(skill.warrior.getPlayer(),skill.warrior,params[0],parseInt(params[1]),skill.warrior.getTraveller().getNature(),true,trigger,event_targets);
        

        var tasks = [];
        var possrc = skill.getBattleField().getAttackPosition(skill.warrior);

 tasks.push([skill.warrior.getUI(),skill.warrior.getUI().setZOrder,[skill.getBattleField().order_activate]]);
 
        if(params[4] != null){
              tasks.push([skill.warrior,skill.warrior.particle,[params[4]]]);
     
                tasks.push([skill,skill.delay,[0.4]]);
        }
        
        
        for(var k in targets){
            var posdes = skill.getBattleField().getAttackPosition(targets[k]);

           tasks.push([wl.actionbase,wl.actionbase.move_to, [skill.warrior,posdes]]);
           tasks.push([skill,skill.delay,[MOVE_INTERVAL]]);

            tasks.push([targets[k],targets[k].beDefender,[skill.warrior]]);
            tasks.push([skill,skill.delay,[0.01]]);

            tasks.push([targets[k],targets[k].defense,[skill.warrior]]);
            tasks.push([skill,skill.delay,[0.01]]);

            
            tasks.push([skill.warrior,skill.warrior.attack, [targets[k],params[2],parseInt(params[3])]]);
            
            tasks.push([skill,skill.delay,[0.4]]);
        }
        tasks.push([skill.warrior,skill.warrior.incEnergy, [1]]);
        
        
       tasks.push([wl.actionbase,wl.actionbase.move_to, [skill.warrior,possrc]]);
       tasks.push([skill,skill.delay,[MOVE_INTERVAL]]);
 
 tasks.push([skill.warrior.getUI(),skill.warrior.getUI().setZOrder,[skill.getBattleField().order_traveller]]);
 
        skill.getBattleField().addTasks(tasks);
  };

  }());