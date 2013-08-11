
if (typeof wl.virtualhttp_create !== 'object') {
    wl.virtualhttp = function(){
        this.msgs = []
    };
    
    wl.virtualhttp.prototype = {
        setTimeoutForConnect : function(dt){},
        
        send : function(obj,func,funcobj){
            this.msgs.push([obj,func,funcobj])
        },
        
        step:function(){
            while(this.msgs.length > 0){
                msg = this.msgs.shift()
                ret = this.process(obj)
                if(msg[2] != null){
                    msg[1].apply(msg[2],ret)
                }
                else{
                    msg[1](ret)
                }
            }
        },
        
        process : function(obj){
            
        },
        
        set_error_func : function(func,obj){
        },
        
        set_server : function(s){
        },


    };
}