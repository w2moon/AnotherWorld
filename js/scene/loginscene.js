
    wl.create_loginscene = function(){
         var scene = cc.Scene.create();

         ///////////////////////////////////////////////////
         scene.start_loading = function(){

            this._loadinglayer = wl.create_uiloading();

            this.addChild(this._loadinglayer);

         }
         scene.stop_loading = function(){

             this.removeChild(this._loadinglayer,true);

            this._loadinglayer = null;

         }

         ///////////////////////////////////////////////////////////
         scene.req_register = function(userid,pwd){
            this.start_loading();

            var msg = wl.msg.create("register");
            msg.userid = userid;
            msg.pwd = pwd;
            wl.http.send(msg,scene.on_register,this);

            

         }
         scene.on_register = function(ret){
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
         scene.req_login = function(userid,pwd,region){
            this.start_loading();

            var msg = wl.msg.create("login");
            

            msg.userid = userid;
            msg.pwd = pwd;
            msg.region = region;
            
            cc.log("logining");
            wl.http.send(msg,scene.on_login,this);
         }
         scene.on_login = function(ret){
             this.stop_loading();

             wl.msg.init(ret);

             g.id = ret.id;
             g.region = ret.region;

             

            cc.log("logined:"+ret.userid);

            this.req_region_enter();
         }


         ////////////////////////////////////////////////////////////////
         scene.req_region_list = function(){
             this.start_loading();

             wl.http.set_server(LOGIN_SERVER);

            var msg = wl.msg.create("region_list");
            wl.http.send(msg,scene.on_region_list,this);
         }
         scene.on_region_list = function(ret){
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

         scene.choose_region = function(){
         }

         scene.on_show_region = function(){
         }


         //////////////////////////////////////////////////////////
         scene.req_region_enter = function(){
             this.start_loading();
             wl.http.set_server(g.regions[g.region].url);

             var msg = wl.msg.create("region_enter");

            wl.http.send(msg,scene.on_region_enter,this);
         }
         scene.on_region_enter = function(ret){
            this.stop_loading();

            if(ret.rc == retcode.PLAYER_NOTEXIST){
                this.req_create_role();
            }
            else{
                cc.log("region entered");
                this.start_game();
            }
         }

         /////////////////////////////////////////////////
         scene.req_create_role = function(){
             this.start_loading();
             cc.log("create role");
             var msg = wl.msg.create("role_create");
             msg.name = "tester";

             wl.http.send(msg,scene.on_create_role,this);
         }
          scene.on_create_role = function(ret){
            this.stop_loading();

            if(ret.rc != retcode.OK){
                cc.log("create role error:"+ret.rc);
            }
            else{
                cc.log("role created");
                this.start_game();
            }
         }

         ///////////////////////////////////////////
         scene.start_game = function(){
            var scene = wl.create_battlescene();
            cc.Director.getInstance().replaceScene(scene);
         }

         scene.req_region_list();

         

         return scene;
    };
   

var loginscene = function(){};

loginscene.prototype.onDidLoadFromCCB = function()
{
    cc.log("loaded");
    this.lblRegion.setString("loading");
};

loginscene.prototype.onPressStart = function()
{
    cc.log("start");
    //this.req_region_list();
    var aboutNode = cc.BuilderReader.load("battlescene");
	this.rootNode.addChild(aboutNode);
	
	aboutNode.rootNode.ok.setString("fight");
	
	var chanode = cc.BuilderReader.load("charactor");
	aboutNode.addChild(chanode);
	var pos = aboutNode.myhero.getPosition();
	var size = cc.Director.getInstance().getWinSize();
	chanode.setPosition(cc.p(size.width/2,size.height/2));
	

	//chanode.setPosition(pos);
	
	
	
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
                this.start_game();
            }
         }

         ///////////////////////////////////////////
         loginscene.prototype.start_game = function(){
            var scene = wl.create_battlescene();
            cc.Director.getInstance().replaceScene(scene);
         }