   
   wl.create_uiloading = function(){
         var layer = cc.Layer.create()

         layer.lbl = cc.LabelTTF.create("wait","",24)
         cc.log(layer.getContentSize().width)
         layer.lbl.setPosition(cc.p(160,240))
         layer.addChild(layer.lbl)

         layer.lbl.runAction(cc.RepeatForever.create(cc.RotateBy.create(1,90)))


        
         return layer
    }
   