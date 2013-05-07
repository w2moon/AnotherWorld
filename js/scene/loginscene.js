
    wl.create_loginscene = function(){
         var scene = cc.Scene.create()

         ///////////////////////////////////////////////////
         scene.start_loading = function(){

            this._loadinglayer = wl.create_uiloading()

            this.addChild(this._loadinglayer)

         }
         scene.stop_loading = function(){

             this.removeChild(this._loadinglayer,true)

            this._loadinglayer = null

         }

         ///////////////////////////////////////////////////////////
         scene.req_register = function(userid,pwd){
            this.start_loading()

            var msg = wl.msg.new("register")
            msg.userid = userid
            msg.pwd = pwd
            wl.http.send(msg,scene.on_register,this)

            

         }
         scene.on_register = function(ret){
            this.stop_loading()

            if(ret.rc != retcode.OK){
                cc.log("register failed")
                return
            }
            wl.set("registed","true")
            cc.log("registed")

            this.req_region_enter()
         }

         ///////////////////////////////////////////////////////////////
         scene.req_login = function(userid,pwd,region){
            this.start_loading()

            var msg = wl.msg.new("login")
            

            msg.userid = userid
            msg.pwd = pwd
            msg.region = region
            
            cc.log("logining")
            wl.http.send(msg,scene.on_login,this)
         }
         scene.on_login = function(ret){
             this.stop_loading()

             wl.msg.init(ret)

             g.id = ret.id
             g.region = ret.region

             

            cc.log("logined:"+ret.userid)

            this.req_region_enter()
         }


         ////////////////////////////////////////////////////////////////
         scene.req_region_list = function(){
             this.start_loading()

             wl.http.set_server(LOGIN_SERVER)

            var msg = wl.msg.new("region_list")
            wl.http.send(msg,scene.on_region_list,this)
         }
         scene.on_region_list = function(ret){
           // cc.log("get region list:"+ret.regions.length())
            for(var k in ret.regions){
                cc.log(k+" "+ret.regions[k].url)
            }

            g.regions = ret.regions

            var id = cc.Util.macAddress()
            var pwd = id

            if(wl.get("registed") == "")
            {
                this.req_register(id,pwd)
            }
            else
            {
                this.req_login(id,pwd,"region1")
            }
         }

         scene.choose_region = function(){
         }

         scene.on_show_region = function(){
         }


         //////////////////////////////////////////////////////////
         scene.req_region_enter = function(){
             this.start_loading()

             wl.http.set_server(g.regions[g.region].url)

             var msg = wl.msg.new("region_enter")

            wl.http.send(msg,scene.on_region_enter,this)
         }
         scene.on_region_enter = function(ret){
            if(ret.rc == retcode.PLAYER_NOTEXIST){
                this.req_create_role()
            }
            else{
                cc.log("region entered")
            }
         }

         /////////////////////////////////////////////////
         scene.req_create_role = function(){
             this.start_loading()
             cc.log("create role")
             var msg = wl.msg.new("role_create")
             msg.name = "tester"

             wl.http.send(msg,scene.on_create_role,this)
         }
          scene.on_create_role = function(ret){
            if(ret.rc != retcode.OK){
                cc.log("create role error:"+ret.rc)
            }
            else{
                cc.log("role created")
            }
         }

         scene.req_region_list()

         

         return scene
    }
   

