

(function(){


  wl.skillactions.guard = function(skill,trigger,event_targets){
       var tasks = [];
        
       var possrc = skill.getBattleField().getAttackPosition(skill.warrior);
       var posdes = skill.getBattleField().getAttackPosition(trigger);

       tasks.push([wl.actionbase,wl.actionbase.move_to, [skill.warrior,posdes]]);

       tasks.push([skill.warrior,skill.warrior.beGuarder,[trigger]]);
        
       skill.getBattleField().addTasks(tasks);
  };

  }());