
wl.get = function(name){
   return cc.UserDefault.getInstance().getStringForKey(name)
}

wl.set = function(name,value){
    cc.UserDefault.getInstance().setStringForKey(name,value)
}

wl.clamp = function(v,min,max){
    if(v<min){
        v = min;
    }
    if(v>max){
        v = max;
    }
    return v;
}