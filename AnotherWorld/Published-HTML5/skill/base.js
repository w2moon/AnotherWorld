 wl.skillactions =  wl.skillactions || {};

 (function(){

  wl.actionbase =  {};


 wl.actionbase.move_to = function(from,posdes){
    from.getUI().runAction(cc.MoveTo.create(0.4,posdes))
    return 0.4;
 };

/*
skill_start
move_start
move_end
attack_start
attacked_start

attack_end(damage taked,crit,dodge)
attacked_end
heal_start
healed_start
heal_end(heal taked,crit,dodge)
healted_end
...

skill_end
*/

 }());