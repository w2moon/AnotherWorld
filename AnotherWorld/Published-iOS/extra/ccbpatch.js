
if(USE_CCB){
    cc.Util = {
        macAddress : function(){
            return "test_macaddress";
        }
    };
    
    var ccuser_data_mem = {};
    var ccuser_data_funcs = {
        getStringForKey : function(key){
            return ccuser_data_mem[key];
        },
        setStringForKey : function(key,value){
            ccuser_data_mem[key] = value
        }
    }
    cc.UserDefault = {
        getInstance : function(){
            return ccuser_data_funcs;
        }
    };
}