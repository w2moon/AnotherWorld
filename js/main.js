﻿// Autogenerated main.js file

require("jsb_cocos2d.js");
require("jsb_cocosbuilder.js");
require("jsb_opengl.js");
require("jsb_sys.js");




require("header.js")

var base = function(n){
    cc.log("base")
   
    base.init(this,n)
}
 base.init = function(self,n){
        self.bn = n
    }
var animal = function(n){
   
    animal.init(this,n)
    cc.log("animal")
}

 animal.init = function(self,n){
        animal.prototype.init(self,n)
        self.an = n
    }
wl.extend(animal,base)

var cat = function(n){
    
    cat.init(this,n)
    cc.log("cat")
    this.t = function(a,b,c,d){
        cc.log(a)
    }

    this.p = function(){
        cc.log(this.an+this.bn+this.cn)
        var f = this.t
        var args = Array.prototype.slice.call(arguments, 1);

        cc.log(arguments.length)

        f.apply(this,[1,2,3,4])
    }
}
cat.init = function(self,n){
        cat.prototype.init(self,n)
        self.cn = n
    }
wl.extend(cat,animal)


function main()
{

var c = new cat(1)
 c.p(1,2,3,4,5)
var t = cc.UserDefault.getInstance().getStringForKey("account_info")
cc.log("info:"+t)

    var ttt = wl.itemfactory.create("soul")
    ttt.getName()
    onLogin = function(userid,name){
        cc.log("login")
        cc.log(userid+name)
    }
    wl.dispatcher.register("login",c.t,c,1)

    wl.dispatcher.notify("login","userid","name")
	//cc.FileUtils.getInstance().loadFilenameLookup("fileLookup.plist");
    //cc.Texture2D.setDefaultAlphaPixelFormat(6);
	var director = cc.Director.getInstance();
    var scene = wl.create_loginscene();//cc.BuilderReader.loadAsScene("MainScene");





    //var info = {"code":"login","userid":"1","ip":"192.168.0.1","pwd":"222","time":"1"}
    //wl.http.send(info)


    var runningScene = director.getRunningScene();
    if (runningScene === null) director.runWithScene(scene);
    else director.replaceScene(scene);
}
main();
