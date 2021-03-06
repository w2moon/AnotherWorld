
if (typeof wl.dispatcher !== 'object') {
    wl.dispatcher = {}
}

(function(){

if(typeof wl.dispatcher.registed === "undefined"){
    wl.dispatcher.registed = {}
}

if(typeof wl.dispatcher.objects === "undefined"){
    wl.dispatcher.objects = []
}

if(typeof wl.dispatcher.objectsallevent === "undefined"){
    wl.dispatcher.objectsallevent = []
}

var find_obj = function(obj){
    for(var k in wl.dispatcher.objects){
        if(wl.dispatcher.objects[k][0] == obj){
            return wl.dispatcher.objects[k][1];
        }
    }
    return null;
};

var find_objallevent = function(obj){
     for(var k in wl.dispatcher.objectsallevent){
        if(wl.dispatcher.objectsallevent[k][0] == obj){
            return wl.dispatcher.objectsallevent[k][1];
        }
    }
    return null;
};

wl.dispatcher.registerobj = function(obj,func){
    var processer = find_objallevent(obj);
    if(processer == null){
        processer = [];
        wl.dispatcher.objectsallevent.push([obj,processer])
    }

     if(arguments.length === 2){
        processer.push({func:func,args:null})
     }
     else{
        processer.push({func:func,args:Array.prototype.slice.call(arguments, 2)})
     }
};

wl.dispatcher.unregisterobj = function(obj,func){
    var processer = find_objallevent(obj);
    if(processer == null){
        return;
    }
     if(arguments.length > 2){
        args2 = Array.prototype.slice.call(arguments, 2)
    }
    var empty = true;
    for(var k in processer){
        if(processer[k].func === func 
        && equal_args(processer[k].args,args2)
        ){
            processer[k] = null
        }
        else
        {
            empty = false
        }
    }

    if(empty){
         for(var k in wl.dispatcher.objectsallevent){
        if(wl.dispatcher.objectsallevent[k][0] == obj){
            wl.dispatcher.objectsallevent.splice(k,1);
            break;
        }
    }
    }
};

wl.dispatcher.register = function(obj,event,func){
    
   if(obj != null){
     var events = find_obj(obj);
     if(events == null){
         events = {};
         wl.dispatcher.objects.push([obj,events]);
     }
     if(typeof events[event] === "undefined"){
        events[event] = new Array();
     }
    
     if(arguments.length === 3){
        events[event].push({func:func,args:null});
     }
     else{
        events[event].push({func:func,args:Array.prototype.slice.call(arguments, 3)});
     }
   }
   else{
     if(typeof wl.dispatcher.registed[event] === "undefined"){
        wl.dispatcher.registed[event] = new Array()
     }
    
     if(arguments.length === 3){
        wl.dispatcher.registed[event].push({func:func,args:null})
     }
     else{
        wl.dispatcher.registed[event].push({func:func,args:Array.prototype.slice.call(arguments, 3)})
     }
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


wl.dispatcher.unregister = function(obj,event,func){
    if(obj == null && typeof wl.dispatcher.registed[event] !== "undefined"){
        
    
    var args2 = null;
    if(arguments.length > 3){
        args2 = Array.prototype.slice.call(arguments, 3)
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
    if(obj != null){
        var events = find_obj(obj);
        if(events == null){
            return;
        }
        if(typeof events[event] === "undefined"){
            return;
        }
          var args2 = null;
    if(arguments.length > 3){
        args2 = Array.prototype.slice.call(arguments, 3)
    }
    var empty = true
    for(var k=0;k<events[event].length;++k){
        var args = events[event][k]
        if(args !== null 
        && args.func === func 
        && equal_args(args.args,args2)
        ){
            events[event][k] = null
        }
        else
        {
            empty = false
        }
    }
    if(empty){
        events[event] = null
    }
    var needclear = true;
    for(var k in events){
        if(events[k]!==null){
            needclear = false;
        }
    }
    if(needclear){
        for(var k in wl.dispatcher.objects){
        if(wl.dispatcher.objects[k][0] == obj){
            wl.dispatcher.objects.splice(k,1);
            return;
        }
    }
    }
    }
}

wl.dispatcher.notify = function(obj,event){

            
            
    if(typeof wl.dispatcher.registed[event] != "undefined"){
        var queue = wl.dispatcher.registed[event]

        var args = null
        if(arguments.length > 2){
            args = Array.prototype.slice.call(arguments, 2)
        }
        for(var k=0;k<queue.length;++k){
            if(queue[k].args != null){
                if(queue[k].args.length>1){
                    var newargs = new Array()
                    for(var i=1;i<queue[k].args.length;++i){
                        newargs.push(queue[k].args[i])
                    }
                    if(args!=null)
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
     
    if(obj != null){
        var events = find_obj(obj);
         if(events != null && typeof events[event] !== "undefined"){
           
         
    
        var queue = events[event];
        var args = null
        if(arguments.length > 2){
            args = Array.prototype.slice.call(arguments, 2)
        }
        for(var k=0;k<queue.length;++k){
            if(queue[k].args != null){
                if(queue[k].args.length>1){
                    var newargs = new Array()
                    for(var i=1;i<queue[k].args.length;++i){
                        newargs.push(queue[k].args[i])
                    }
                    if(args!=null)
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
    }


    var processer = find_objallevent(obj);
    if(processer != null){
        
        var args = null
        if(arguments.length > 2){
            args = Array.prototype.slice.call(arguments, 2)
        }
          

        for(var k in processer){
            if(processer[k].args != null){
            if( processer[k].args.length > 1){
                 var newargs = new Array()
                 newargs.push(obj);
                 newargs.push(event);
                for(var i=1;i<queue[k].args.length;++i){
                    newargs.push(processer[k].args[i])
                }
                if(args!=null)
                for(var i=0;i<args.length;++i){
                    newargs.push(args[i])
                }
                processer[k].func.apply(processer[k].args[0],newargs)
            }
            else{
                var newargs = new Array()
                 newargs.push(obj);
                 newargs.push(event);
                 if(args!=null)
                  for(var i=0;i<args.length;++i){
                    newargs.push(args[i])
                }
                processer[k].func.apply(processer[k].args[0],newargs)
            }
            }
            else{
                var newargs = new Array()
                 newargs.push(obj);
                 newargs.push(event);
                 if(args!=null)
                  for(var i=0;i<args.length;++i){
                    newargs.push(args[i])
                }
                processer[k].func.apply(null,newargs)
            }
        }
    }
}

}());