 wl.skillactions =  wl.skillactions || {};

 (function(){

  wl.actionbase =  {};


 wl.actionbase.move_to = function(from,posdes){
    from.getUI().runAction(cc.MoveTo.create(0.4,posdes))
    return 0.4;
 };

 }());