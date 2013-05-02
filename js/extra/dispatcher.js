

if (typeof wl.dispatcher !== 'object') {
    wl.dispatcher = {}
}

(function(){

if(typeof wl.dispatcher.registed === "undefined"){
    wl.dispatcher.registed = {}
}

wl.dispatcher.register = function(event,func){
    if(typeof wl.dispatcher.registed[event] === "undefined"){
        wl.dispatcher.registed[event] = new Array()
    }
   if(arguments.length === 2){
        wl.dispatcher.registed[event].push({func:func,args:null})
   }
   else{
        wl.dispatcher.registed[event].push({func:func,args:Array.prototype.slice.call(arguments, 2)})
   }
}

var equal_args = function(args1,args2){
    if(args1 == args2){
        return true
    }
    if(args1.length != args2.length){
        return false
    }
    for(var k=0;k<args1.length;++k){
        if(args1[k] != args2[k]){
            return false
        }
    }
    return true
}


wl.dispatcher.unregister = function(event,func){
    if(typeof wl.dispatcher.registed[event] === "undefined"){
        return
    }
    var args2 = null;
    if(arguments.length > 2){
        args2 = Array.prototype.slice.call(arguments, 2)
    }
    var empty = true
    for(var k=0;k<wl.dispatcher.registed[event].length;++k){
        var args = wl.dispatcher.registed[event][k]
        if(args !== null 
        && args.func === func 
        && equal_args(args.args,args2)
        ){
            wl.dispatcher.registed[event][k] = null
        }
        else
        {
            empty = false
        }
    }
    if(empty){
        wl.dispatcher.registed[event] = null
    }
}

wl.dispatcher.notify = function(event){
    var queue = wl.dispatcher.registed[event]

    var args = null
    if(arguments.length > 1){
        args = Array.prototype.slice.call(arguments, 1)
    }
    for(var k=0;k<queue.length;++k){
        if(queue[k].args != null){
            if(queue[k].args.length>1){
                var newargs = new Array()
                for(var i=1;i<queue[k].args.length;++i){
                    newargs.push(queue[k].args[i])
                }
                for(var i=0;i<args.length;++i){
                    newargs.push(args[i])
                }
                queue[k].func.apply(queue[k].args[0],newargs)
            }
            else{
                queue[k].func.apply(queue[k].args[0],args)
            }
        }
        else{
            queue[k].func.apply(null,args)
        }
        
    }
}

}());