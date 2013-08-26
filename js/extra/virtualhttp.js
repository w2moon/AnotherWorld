
if (wl.virtualhttp == null) {
    wl.virtualhttp = function(folder){
        this.msgs = [];
        this.folder = folder;

        this.loaded = {};
        this.node = cc.Node.create();
        this.node.retain();

        this.scene = null;
        
        var virtual = this;
        this.node.schedule(function(dt){ virtual.step(dt);});
        
    };
    
    wl.virtualhttp.prototype = {
        setTimeoutForConnect : function(dt){},
        
        send : function(obj,func,funcobj){
            if(!this.can_process(obj)){
                return false;    
            }
            this.msgs.push([obj,func,funcobj]);
            return true;
        },
        
        step:function(dt){
            cc.log("step")
            while(this.msgs.length > 0){
                msg = this.msgs.shift()
                ret = this.process(msg[0])
                if(msg[2] != null){
                    msg[1].apply(msg[2],[ret])
                }
                else{
                    msg[1](ret)
                }
            }
        },
        
        can_process:function(info){
            if(this.loaded[info.code] == null){
                try{
                    require(this.folder+"/"+info.code+".js");
                    this.loaded[info.code] == 1;
                }
                catch(e){
                    return false;
                }
            }
            return true;
        },

        process : function(info){
            func = eval("virtual_"+info.code);
            return func(info)
        },

        attach : function(scene){
            if(this.scene != null){
                this.node.removeFromParent(false);
            }
            this.scene = scene;
            scene.addChild(this.node);
            cc.log("attach")
            
           
        },
        
        
        set_error_func : function(func,obj){
        },
        
        set_server : function(s){
        }


    };
}