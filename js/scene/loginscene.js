
    
   

var loginscene = function(){};


loginscene.prototype.onDidLoadFromCCB = function()
{
    cc.log("loaded");
    this.lblRegion.setString("loading");
 
    /*

   cc.log(lang["SKILL_NAME_1001"])
    var aboutNode = cc.BuilderReader.load("sk_human");
	this.rootNode.addChild(aboutNode);
    var size = cc.Director.getInstance().getWinSize();
	aboutNode.setPosition(cc.p(size.width/2,size.height/2));
    aboutNode.animationManager.runAnimationsForSequenceNamed("stand");
    aboutNode.on_animation_finish = function()
{
	 this.animationManager.runAnimationsForSequenceNamed("stand");
   
}
    aboutNode.animationManager.setCompletedAnimationCallback(aboutNode,aboutNode.on_animation_finish);
    */
    
    var img = cc.Image.create();
    img.initWithImageFile("h3.jpg",0);

    var mask = cc.Image.create();
    mask.initWithImageFile("human_head.png",1);
    var arr = img.parse("haarcascades/haarcascade_frontalface_alt.xml",1);
    if(arr.length == 0){
        cc.log("not found heads");
    }
    else
    {
        cc.log("detected:"+arr.length)
    }
    var y = 50;
    for(var k in arr){
        var r = arr[k].getValue();
        cc.log(r.x+" "+r.y+" "+r.width+" "+r.height);
        var subimg = img.createSubImage(r);

        var efimg = subimg.effect(4);
        var masked = subimg.mask(mask);
        var t2d = cc.Texture2D.create()
        t2d.initWithImage(masked);
        
        var header = cc.Sprite.createWithTexture(t2d)
        var size = cc.Director.getInstance().getWinSize();
        header.setPosition(cc.p(size.width/2,y));
        y=y+header.getContentSize().height;
        this.rootNode.addChild(header);
        
    }
    
};

var battlescene = function(){}
battlescene.prototype.onDidLoadFromCCB = function()
{
    var pos = this.myhero.getPosition();
    cc.log("hero"+pos.x)
    
 //   var chanode = cc.BuilderReader.load("sk_human");
 //   this.rootNode.addChild(chanode);
    
    
   
}

var charactor = function(){}

loginscene.prototype.onPressStart = function()
{
    cc.log("start");
   
    if(false){
         this.req_region_list();
    }
    else
    {
    var aboutNode = cc.BuilderReader.load("battlescene");
	this.rootNode.addChild(aboutNode);
	
 
   
	
	//var chanode = cc.BuilderReader.load("sk_human");
//this.rootNode.addChild(chanode);
  
	//var pos = aboutNode.controller.myhero.getPosition();
	//var size = cc.Director.getInstance().getWinSize();
	//chanode.setPosition(cc.p(size.width/2,size.height/2));
	

	//chanode.setPosition(pos);
	}

	
	
};

////////////////////////////////////////////////////////////////////////////
  loginscene.prototype.start_loading = function(){

            this._loadinglayer = wl.create_uiloading();

            this.rootNode.addChild(this._loadinglayer);

         }
         loginscene.prototype.stop_loading = function(){

             this.rootNode.removeChild(this._loadinglayer,true);

            this._loadinglayer = null;

         }

         ///////////////////////////////////////////////////////////
         loginscene.prototype.req_register = function(userid,pwd){
            this.start_loading();

            var msg = wl.msg.create("register");
            msg.userid = userid;
            msg.pwd = pwd;
            wl.http.send(msg,this.on_register,this);

            

         }
         loginscene.prototype.on_register = function(ret){
            this.stop_loading();

            if(ret.rc != retcode.OK && !(ret.rc == retcode.USERID_EXIST &&ret.userid == cc.Util.macAddress()) ){
                cc.log("register failed");
                return;
            }
            wl.set("registed","true");
            cc.log("registed");

            this.req_login(ret.userid,ret.pwd,"region1");
         }

         ///////////////////////////////////////////////////////////////
         loginscene.prototype.req_login = function(userid,pwd,region){
            this.start_loading();

            var msg = wl.msg.create("login");
            

            msg.userid = userid;
            msg.pwd = pwd;
            msg.region = region;
            
            cc.log("logining");
            wl.http.send(msg,this.on_login,this);
         }
         loginscene.prototype.on_login = function(ret){
             this.stop_loading();

             wl.msg.init(ret);

             g.id = ret.id;
             g.region = ret.region;

             

            cc.log("logined:"+ret.userid);

            this.req_region_enter();
         }


         ////////////////////////////////////////////////////////////////
         loginscene.prototype.req_region_list = function(){
             this.start_loading();

             wl.http.set_server(LOGIN_SERVER);

            var msg = wl.msg.create("region_list");
            wl.http.send(msg,this.on_region_list,this);
         }
         loginscene.prototype.on_region_list = function(ret){
            this.stop_loading();

            for(var k in ret.regions){
                cc.log(k+" "+ret.regions[k].url);
            }

            g.regions = ret.regions;

            var id = cc.Util.macAddress();
            var pwd = id;
             

            if(wl.get("registed") == null || wl.get("registed") == "")
            {
                this.req_register(id,pwd);
            }
            else
            {
                this.req_login(id,pwd,"region1");
            }
         }

         loginscene.prototype.choose_region = function(){
         }

         loginscene.prototype.on_show_region = function(){
         }


         //////////////////////////////////////////////////////////
         loginscene.prototype.req_region_enter = function(){
             this.start_loading();
             wl.http.set_server(g.regions[g.region].url);

             var msg = wl.msg.create("region_enter");

            wl.http.send(msg,this.on_region_enter,this);
         }
         loginscene.prototype.on_region_enter = function(ret){
            this.stop_loading();

            if(ret.rc == retcode.PLAYER_NOTEXIST){
                this.req_create_role();
            }
            else{
                cc.log("region entered");
                wl.gvars.role = new wl.role(ret.player);

                this.start_game();
            }
         }

         /////////////////////////////////////////////////
         loginscene.prototype.req_create_role = function(){
             this.start_loading();
             cc.log("create role");
             var msg = wl.msg.create("role_create");
             msg.name = "tester";

             wl.http.send(msg,this.on_create_role,this);
         }
          loginscene.prototype.on_create_role = function(ret){
            this.stop_loading();

            if(ret.rc != retcode.OK){
                cc.log("create role error:"+ret.rc);
            }
            else{
                cc.log("role created");

                wl.gvars.role = new wl.role(ret.player);

                this.start_game();
            }
         }

         ///////////////////////////////////////////
         loginscene.prototype.start_game = function(){
           // var scene = wl.create_travellercreate();
           var scene = wl.create_battlescene();
            cc.Director.getInstance().replaceScene(scene);
         }