   
   wl.create_uiloading = function(){
         var layer = cc.Layer.create()

         layer.lbl = cc.LabelTTF.create("wait","",24)
         var size = cc.Director.getInstance().getWinSize();
         layer.lbl.setPosition(cc.p(size.width/2,size.height/2))
         layer.addChild(layer.lbl)

         layer.lbl.runAction(cc.RepeatForever.create(cc.RotateBy.create(1,90)))


        
         return layer
    }
   