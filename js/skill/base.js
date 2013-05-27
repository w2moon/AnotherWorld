 wl.skillactions =  wl.skillactions || {};

 (function(){

  wl.actionbase =  {};

  wl.actionbase.callback = function(callback){
    var args = Array.prototype.slice.call(arguments, 1);

    callback.apply(null,args);
  }

 wl.actionbase.move_to = function(from,to,callback){

    var posdes = to.getPosition();
    var anim = cc.Sequence.create(cc.MoveTo.create(0.4,cc.p(posdes.x,posdes.y)),
                                  cc.CallFunc.create(wl.actionbase.callback,wl.actionbase,Array.prototype.slice.call(arguments, 2)));

    from.runAction(anim)
 };

 }());