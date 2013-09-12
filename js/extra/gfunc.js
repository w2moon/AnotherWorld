(function(){ 
 if(USE_CCB){
     wl.winscale = cc.Director.getInstance().contentScaleFactor();
 }
 else{
     wl.winscale = cc.Director.getInstance().getContentScaleFactor()
 }

wl.get = function(name){
   return cc.UserDefault.getInstance().getStringForKey(name)
};

wl.set = function(name,value){
    cc.UserDefault.getInstance().setStringForKey(name,value)
};

wl.popmsg = function(msg){
    cc.log(msg);
};
 
 wl.repeat_anim = function(o,anim){
 o.animationManager.runAnimationsForSequenceNamed(anim);
    o.animationManager.setCompletedAnimationCallback(o,function(){this.animationManager.runAnimationsForSequenceNamed(anim);});
 
 };

wl.create_soulcard = function(soulbaseid,flip){
    var soul = soulbase[soulbaseid];
    var avatar = parse_action_params(soul.avatar);
    var ske = avatar[0];
    if(flip){
        ske = ske + "_flip";
    }
   avatar.shift();
   return wl.load_scene("uicard",ske,avatar,""); 
};

wl.clipping_layer = function(w,h){
    if(USE_CCB){
        return cc.Layer.create();
    }
    var clipper = cc.ClippingNode.create();
    clipper.setContentSize(cc.size(w,h));

    var drawnode = cc.DrawNode.create();
    var rect = [cc.p(0,0),cc.p(w,0),cc.p(w,h),cc.p(0,h)];

    var white = cc.c4f(1,1,1,1);
    drawnode.drawPoly(rect,white,1,white);
    clipper.setStencil(drawnode);


    return clipper;
};

wl.scroll_layer = function(w,h){
    if(USE_CCB){
        return cc.Layer.create();
    }

    var container = cc.Layer.create();
    container.setAnchorPoint(cc.p(0,0));
    container.setPosition(cc.p(0,0));
    var size = cc.size(w,h);
    
    //container.setContentSize(size);

    
    
    var scroll = cc.ScrollView.create(size,container);
    scroll.setDirection(1);
    scroll.setBounceable(true);
    return scroll;
};

wl.filter_rate = function(arr){
    var r = 0;
    var todelete = []
    for(var k in arr){
        r = wl.rand();
        if(r<arr[k][0]){
            todelete.push(arr[k]);
        }
    }

    for(var k in todelete){
        for(var k in arr){
            if(todelete[k] == arr[k]){
                arr.splice(k,1);
                break;
            }
        }
    }
};

wl.parse_reward = function(str){
    var parts = str.split(/;/);
    var arr = [];
    var spled,tmp
    for(var i=0;i<parts.length;++i){
        spled = parts[i].split(/,/);
        var tmp = spled[1].match(/\(([\w,.]+)\)/)[1].split(/,/);
        for(var k in tmp){
            tmp[k] = wl.tonumber(tmp[k])
        }
        arr.push([wl.tonumber(spled[0]),spled[1].match(/\w+/)[0],tmp])
    }
    return arr;
  
};

wl.get_scene=function(){
    return cc.Director.getInstance().getRunningScene().getChildren()[0];
}

wl.run_scene=function(s){
 var director = cc.Director.getInstance();
 var scene = cc.BuilderReader.loadAsScene(s);
 var runningScene = director.getRunningScene();
  if(USE_VIRTUAL_HTTP){
    wl.http.attach(scene);
 }
 if (runningScene === null) director.runWithScene(scene);
 else director.replaceScene(scene);
 


 
  if(arguments.length > 1 && scene.getChildren()[0].controller!=null && scene.getChildren()[0].controller.onCreate){
       
             var args = Array.prototype.slice.call(arguments, 1);
            scene.getChildren()[0].controller.onCreate.apply(scene.getChildren()[0].controller,args);
 
    }
};

wl.load_scene=function(s){
    var scene = cc.BuilderReader.load(s);


     if(arguments.length > 1 && scene.controller!=null && scene.controller.onCreate){
       
             var args = Array.prototype.slice.call(arguments, 1);
            scene.controller.onCreate.apply(scene.controller,args);
        
    }
    return scene;
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

var v_local_id = 0;
wl.local_id = function(){
    v_local_id++;
    return v_local_id;
}

wl.seed = function(seed){
    return Math.seedrandom(seed);
};

wl.rand = function(){
    return Math.random();
};

wl.sysrand = function(){
    return Math.sysrandom();
};
wl.copyfunc = function(src,dst){
    for(var k in src){
        dst[k] = src[k];
    }
};
wl.copyarr = function(src,dst){
    for(var k in src){
        dst.push(src[k]);
    }
};

wl.copy = function(obj){
    var newobj = {}
    for(var k in obj){
        if(typeof(obj[k]) == "object"){
            newobj[k] = wl.copy(obj[k]);
        }
        else{
            newobj[k] = obj[k];
        }
    }

    return newobj;
};

wl.callstack = function() {  
var i = 0;  
var fun = arguments.callee;  
do {  
fun = fun.arguments.callee.caller;
cc.log(++i + ': ' + fun);
} while (fun);  
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

wl.set_texture = function(spr,file){
 if(!USE_CCB){
    var image = new cc.Image();
    image.initWithImageFile(file,1);
    var tex = cc.Texture2D.create();
    tex.initWithImage(image);
    spr.setTexture(tex);
 }
};

wl.gvars = {
    role:null
};

 wl.csv_pool = function(file){
 
 };

 wl.dict_add = function(d1,d2){
    var d = {};

    for(var k in d1){
        if(d2[k] != null){
        d[k] = d1[k] + d2[k];
        }
        else
        {
        d[k] = d1[k];
        }
    }
    return d;
  };
 
wl.csv_lang = function(file){
    if(USE_CCB)
    {
       // return function(){return "ccb not load text"};
    }
    var ret = {};
     var str = cc.FileUtils.getInstance().getStringFromFile(file);
    var arr = wl.load_csv(str)
    for(var k=1;k<arr.length;++k){
         ret[arr[k][0]] = arr[k][1];
        
    }
    var lang = function(name){
        if(ret[name] != null){
            return ret[name];
        }
        else{
            return name;
        }
    };
    return lang;
};

wl.tonumber = function(v){
    if(typeof(v) != "string" || v == ""){
        return v;
    }
    if(isNaN(v)){
        return v;
    }
    else
    {
        if(v.search(/\./) == 0){
            return parseInt(v);
        }
        else{
            return parseFloat(v);
        }
    }
};

wl.csv_cfg = function(file){
    
    var ret = {};
    var str = cc.FileUtils.getInstance().getStringFromFile(file);
    var arr = wl.load_csv(str)
    for(var k=1;k<arr.length;++k){
         ret[arr[k][0]] = wl.tonumber(arr[k][1]);   
    }
    return ret;
};

wl.csv_map = function(file){
    
    var ret = {};
     var str = cc.FileUtils.getInstance().getStringFromFile(file);
    var arr = wl.load_csv(str)
    for(var k=1;k<arr.length;++k){
        
         var obj = {}
         for(var idx in arr[0]){
             obj[arr[0][idx]] = wl.tonumber(arr[k][idx]);
         }
         ret[obj[arr[0][0]]] = obj;
        
    }
    return ret;
};

wl.csv_idmap = function(file){
    
    var ret = {};
     var str = cc.FileUtils.getInstance().getStringFromFile(file);
    var arr = wl.load_csv(str)
    for(var k=1;k<arr.length;++k){
        if(arr[k].length == 1 && arr[k][0] == ""){
            break;
        }
         var obj = {}
         for(var idx in arr[0]){
              obj[arr[0][idx]] = wl.tonumber(arr[k][idx]);
         }
         ret[wl.tonumber(obj[arr[0][0]])] = obj;
        
    }
    return ret;
};

wl.csv_object = function(file){
    
    var ret = [];
     var str = cc.FileUtils.getInstance().getStringFromFile(file);
    var arr = wl.load_csv(str)
    for(var k=1;k<arr.length;++k){
         var obj = {}
         for(var idx in arr[0]){
              obj[arr[0][idx]] = arr[k][idx];
         }
         ret.push(obj);
        
    }
    return ret;
};

wl.get_rand = function(dictobj){
    var r = wl.sysrand();
    var v = 0;
    for(var k in dictobj){
        v = v + dictobj[k].rate;
        if(r < v){
            return dictobj[k];
        }
    }
    return null;
};


wl.load_csv = function( strData, strDelimiter,rowstoread ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
                (
                        // Delimiters.
                        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                        // Quoted fields.
                        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                        // Standard fields.
                        "([^\"\\" + strDelimiter + "\\r\\n]*))"
                ),
                "gi"
                );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        var numread = 0;
        while (arrMatches = objPattern.exec( strData )){
                
                // Get the delimiter that was found.
                var strMatchedDelimiter = arrMatches[ 1 ];

                // Check to see if the given delimiter has a length
                // (is not the start of string) and if it matches
                // field delimiter. If id does not, then we know
                // that this delimiter is a row delimiter.
                if ( strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)){
                        numread++;
                        if (rowstoread && rowstoread == numread) break;
                        // Since we have reached a new row of data,
                        // add an empty row to our data array.
                        arrData.push( [] );

                }


                // Now that we have our delimiter out of the way,
                // let's check to see which kind of value we
                // captured (quoted or unquoted).
                if (arrMatches[ 2 ]){

                        // We found a quoted value. When we capture
                        // this value, unescape any double quotes.
                        var strMatchedValue = arrMatches[ 2 ].replace(
                                new RegExp( "\"\"", "g" ),
                                "\""
                                );
                                
                        

                } else {

                        // We found a non-quoted value.
                        var strMatchedValue = arrMatches[ 3 ];

                }
                

            

                // Now that we have our value string, let's add
                // it to the data array.
                arrData[ arrData.length - 1 ].push( strMatchedValue );
                
                
        }
        // Return the parsed data.
        return( arrData );
};

 }());
