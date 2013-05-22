wl.functask = function(){
var tasks = {}

wl.functask.add = function(obj,func){
     if(arguments.length === 2){
        tasks.push([obj,func])
     }
     else{
        tasks.push([obj,func,Array.prototype.slice.call(arguments, 2)])
     }
};

wl.functask.remove = function(obj,func){
    for(var k in tasks){
        if(tasks[k][0] == obj
        || tasks[k][1] == func){
            tasks.splice(k,1);
            return;
        }
    }
};

wl.functask.next = function(){
    var task = tasks.pop();
    if(task == null){
        return false;
    }
    task[1].apply(task[0],task[2]);
};

}