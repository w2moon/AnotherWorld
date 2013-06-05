wl.functask = function(){
var tasks = []

this.add = function(obj,func){
    tasks.reverse();
     if(arguments.length === 2){
        tasks.push([obj,func])
     }
     else{
        tasks.push([obj,func,Array.prototype.slice.call(arguments, 2)])
     }
     tasks.reverse();
};

this.adds = function(calls){
    tasks.reverse();

    for(var k=calls.length-1;k>=0;k--){
        tasks.push(calls[k])
    }

    tasks.reverse();
};

this.addtail = function(obj,func){
    if(arguments.length === 2){
        tasks.push([obj,func])
     }
     else{
        tasks.push([obj,func,Array.prototype.slice.call(arguments, 2)])
     }
}

this.remove = function(obj,func){
    for(var k in tasks){
        if(tasks[k][0] == obj
        || tasks[k][1] == func){
            tasks.splice(k,1);
            return;
        }
    }
};

this.next = function(){
    var task = tasks.shift();
    var dt = null;
    /*
    
    while(task != null && dt == null){
        dt = task[1].apply(task[0],task[2]);
        if(dt == null){
            task = tasks.shift();
        }
    }
    */
    if(task != null){
        dt = task[1].apply(task[0],task[2]) || 0.01;
    }
    return  dt;
};

}