

(function(){

  var move_end = function(skill,trigger,event_targets){
  };

  wl.skillactions.guard = function(skill,trigger,event_targets){
        wl.actionbase.move_to(skill.warrior,trigger,move_end,skill,trigger,event_targets);
  };

  }());