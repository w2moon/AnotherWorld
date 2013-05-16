   
   wl.create_uicard = function(traveller){
         var layer = cc.Layer.create();

         layer.setAnchorPoint(cc.p(0,0))

         layer.traveller = traveller

         var header = cc.Sprite.create(traveller.getImg());
         layer.addChild(header);

         var btop = cc.Sprite.create("boarder.png");
         var size = btop.getContentSize()
         btop.setPosition(cc.p(0,-size.width/2));
         layer.addChild(btop);
         var bbottom = cc.Sprite.create("boarder.png");
         bbottom.setPosition(cc.p(0,size.width/2));
         layer.addChild(bbottom);
         var bleft = cc.Sprite.create("boarder.png");
         bleft.setPosition(cc.p(-(size.width-size.height)/2,0));
         bleft.setRotation(90);
         layer.addChild(bleft);
         var bright = cc.Sprite.create("boarder.png");
         bright.setRotation(90);
         bright.setPosition(cc.p((size.width-size.height)/2,0));
         layer.addChild(bright);

         if(traveller.getSoul() != null){
            var soul = cc.Sprite.create(traveller.getSoul().getBase().icon);
            soul.setPosition(cc.p((size.width-size.height)/2,-size.width/2));
            layer.addChild(soul)
         }

         layer.register_event = function(){
            wl.dispatcher.register("hpinc"+this.traveller.getId(),this.on_hpinc,this);
            wl.dispatcher.register("hpdec"+this.traveller.getId(),this.on_hpdec,this);

            wl.dispatcher.register("attack"+this.traveller.getId(),this.attack,this);
            wl.dispatcher.register("defense"+this.traveller.getId(),this.defense,this);
         }

         layer.unregister_event = function(){
            wl.dispatcher.unregister("hpinc"+this.traveller.getId(),this.on_hpinc,this);
            wl.dispatcher.unregister("hpdec"+this.traveller.getId(),this.on_hpdec,this);

            wl.dispatcher.unregister("attack"+this.traveller.getId(),this.attack,this);
            wl.dispatcher.unregister("defense"+this.traveller.getId(),this.defense,this);
         }

         layer.on_hpinc = function(){
            this.hpbar.setScaleX(this.traveller.getHP()/this.traveller.getMaxHP());
         }

          layer.on_hpdec = function(){
            this.hpbar.setScaleX(this.traveller.getHP()/this.traveller.getMaxHP());

            if(this.traveller.isDead()){
                this.dead();
            }
         }

         layer.move = function(dt){
         cc.log("move")
         var s = cc.Sequence.create(cc.EaseIn.create(cc.ScaleTo.create(0.2,1.2),0.4),cc.EaseOut.create(cc.ScaleTo.create(0.2,1),0.4))
             this.runAction(cc.RepeatForever.create(s))

         }
         layer.stand = function(){
            this.stopAllActions()
         }
         layer.attack = function(flip){
         //flip = 1 from left to right ,-1 from right to left
            flip = flip || 1
           // var slash = cc.Sequence.create(cc.ScaleTo.create(0.2,1.2),cc.RotateTo.create(0.2,-45*flip),cc.RotateTo.create(0.2,45*flip),cc.RotateTo.create(0.1,0),cc.ScaleTo.create(0.2,1))

            var slash = cc.Sequence.create(cc.RotateTo.create(0.2,-45*flip),cc.RotateTo.create(0.2,45*flip),cc.RotateTo.create(0.1,0))
           
            this.runAction(slash)

            var particle = cc.ParticleSystem.create("particles/taken-gem.plist");
			particle.setPosition(-size.width/2,-size.height/2);
			particle.setAutoRemoveOnFinish(true);
            this.addChild(particle)
         }
         layer.defense = function(){
            var dis = 5
            var pos = this.getPosition()
            var anim = cc.Sequence.create(cc.MoveTo.create(0.1,cc.p(pos.x-dis,pos.y)),cc.MoveTo.create(0.2,cc.p(pos.x+dis,pos.y)),cc.MoveTo.create(0.1,cc.p(pos.x,pos.y)))
            //this.runAction(anim)
         }
         layer.magic = function(){
            var dis = 3
            var pos = this.getPosition()
            var start = cc.EaseIn.create(cc.ScaleTo.create(0.2,1.2),0.4)
            var fly = cc.Sequence.create(
            cc.MoveTo.create(0.4,cc.p(pos.x,pos.y-dis)),
            cc.MoveTo.create(0.4,cc.p(pos.x,pos.y+dis)),

            cc.MoveTo.create(0.4,cc.p(pos.x,pos.y-dis)),
            cc.MoveTo.create(0.4,cc.p(pos.x,pos.y+dis)),

            cc.MoveTo.create(0.4,cc.p(pos.x,pos.y-dis)),
            cc.MoveTo.create(0.4,cc.p(pos.x,pos.y+dis))

           /* cc.EaseIn.create(cc.MoveTo.create(0.4,cc.p(pos.x,pos.y-dis)),0.4),
            cc.EaseIn.create(cc.MoveTo.create(0.4,cc.p(pos.x,pos.y+dis)),0.4),

            cc.EaseIn.create(cc.MoveTo.create(0.4,cc.p(pos.x,pos.y-dis)),0.4),
            cc.EaseIn.create(cc.MoveTo.create(0.4,cc.p(pos.x,pos.y+dis)),0.4),

            cc.EaseIn.create(cc.MoveTo.create(0.4,cc.p(pos.x,pos.y-dis)),0.4),
            cc.EaseIn.create(cc.MoveTo.create(0.4,cc.p(pos.x,pos.y+dis)),0.4)*/
            )
            var endfly = cc.EaseIn.create(cc.MoveTo.create(0.2,cc.p(pos.x,pos.y)),0.4)
            var end = cc.EaseIn.create(cc.ScaleTo.create(0.2,1),0.4)

            var anim = cc.Sequence.create(fly,endfly)
            this.runAction(anim)
         }
         layer.hpbar = cc.Sprite.create("boarder.png");
         layer.hpbar.setAnchorPoint(cc.p(0,0.5));
         layer.hpbar.setPosition(cc.p(-size.width/2,size.width/2+20));
         layer.addChild(layer.hpbar);

         layer.deadmark = null;

         layer.dead = function(){
            if(this.deadmark == null){
                    this.deadmark = cc.Sprite.create("dead.png");
                    this.addChild(this.deadmark)
                }
         }

         layer.setPercent = function(p){
            this.hpbar.setScaleX(p);

           
         }

         layer.register_event();
         return layer;
    };
   