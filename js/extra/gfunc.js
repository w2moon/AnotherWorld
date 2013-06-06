
wl.get = function(name){
   return cc.UserDefault.getInstance().getStringForKey(name)
};

wl.set = function(name,value){
    cc.UserDefault.getInstance().setStringForKey(name,value)
};

wl.clamp = function(v,min,max){
    if(v<min){
        v = min;
    }
    if(v>max){
        v = max;
    }
    return v;
};

wl.rand = function(){
    return Math.random();
};

wl.copyfunc = function(src,dst){
    for(var k in src){
        dst[k] = src[k];
    }
};

wl.isNoneString = function(str){
    return typeof(str) === "undefined" || str === null || str === "";
};

wl.toArc = function(d){
    return d*Math.PI/180;
};

wl.toDegree = function(a){
    return a*180/Math.PI;
};

wl.getRotation = function(src,dst){
    return -wl.toDegree(Math.atan((dst.y-src.y)/(dst.x-src.x)));
};

wl.randPosition = function(center,radiusmin,radiusmax){
    var p = radiusmin + Math.random()*(radiusmax - radiusmin);
    var d = wl.toArc(Math.random()*360)
    return cc.p(p*Math.cos(d),p*Math.sin(d));
};

wl.ccpSub = function(p1,p2){
    return cc.p(p1.x-p2.x,p1.y-p2.y);
};

wl.ccpAdd = function(p1,p2){
    return cc.p(p1.x+p2.x,p1.y+p2.y);
};

wl.gvars = {};