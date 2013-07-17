
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

wl.run_scene=function(s){
 var director = cc.Director.getInstance();
 var scene = cc.BuilderReader.loadAsScene(s);
 var runningScene = director.getRunningScene();
 if (runningScene === null) director.runWithScene(scene);
 else director.replaceScene(scene);

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

wl.seed = function(seed){
    return Math.seedrandom(seed);
};

wl.rand = function(){
    return Math.random();
};

wl.copyfunc = function(src,dst){
    for(var k in src){
        dst[k] = src[k];
    }
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

wl.gvars = {};

wl.csv_lang = function(file){
    if(USE_CCB)
    {
        return function(){return "ccb not load text"};
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
}

wl.csv_map = function(file){
    if(USE_CCB){
        return {};
    }
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
    if(USE_CCB){
        return {};
    }
    var ret = {};
     var str = cc.FileUtils.getInstance().getStringFromFile(file);
    var arr = wl.load_csv(str)
    for(var k=1;k<arr.length;++k){
         var obj = {}
         for(var idx in arr[0]){
              obj[arr[0][idx]] = wl.tonumber(arr[k][idx]);
         }
         ret[wl.tonumber(obj[arr[0][0]])] = obj;
        
    }
    return ret;
};

wl.csv_object = function(file){
    if(USE_CCB){
        return [];
    }
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