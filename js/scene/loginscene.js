
    wl.create_loginscene = function(){
         var scene = cc.Scene.create()

         scene.start_loading = function(){
            this._loadinglayer = wl.create_uiloading()
            this.addChild(this._loadinglayer)
         }
         scene.stop_loading = function(){
             this.removeChild(this._loadinglayer,true)
            this._loadinglayer = null
         }

         scene.req_register = function(){
            var msg = wl.msg.new("register")

            this.start_loading()

            wl.http.send(msg,scene.on_register,this)

            

         }
         scene.on_register = function(){
            this.stop_loading()
         }

         scene.req_login = function(){
         }
         scene.on_login = function(){
         }

         scene.req_region = function(){
         }
         scene.on_region = function(){
         }

         scene.choose_region = function(){
         }

         scene.on_show_region = function(){
         }

         scene.req_register()

         return scene
    }
   

