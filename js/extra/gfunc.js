
wl.get = function(name){
   return cc.UserDefault.getInstance().getStringForKey(name)
}

wl.set = function(name,value){
    cc.UserDefault.getInstance().setStringForKey(name,value)
}