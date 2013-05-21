   
   wl.create_uicard = function(warrior){
         var layer = cc.Layer.create();

         layer.setAnchorPoint(cc.p(0,0))

         layer.warrior = warrior

         var header = cc.Sprite.create(warrior.getTraveller().getImg());
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

         if(warrior.getTraveller().getSoul() != null){
            var soul = cc.Sprite.create(warrior.getTraveller().getSoul().getBase().icon);
            soul.setPosition(cc.p((size.width-size.height)/2,-size.width/2));
            layer.addChild(soul)
         }

         layer.register_event = function(){
            wl.dispatcher.register(this.warrior,"inc_hp",this.on_hpinc,this);
            wl.dispatcher.register(this.warrior,"dec_hp",this.on_hpdec,this);

            wl.dispatcher.register(this.warrior,"attack",this.attack,this);
            wl.dispatcher.register(this.warrior,"defense",this.defense,this);

            wl.dispatcher.register(this.warrior,"action",this.on_action,this);
            wl.dispatcher.register(this.warrior,"particle",this.on_particle,this);
         }

         layer.unregister_event = function(){
            wl.dispatcher.unregister(this.warrior,"inc_hp",this.on_hpinc,this);
            wl.dispatcher.unregister(this.warrior,"dec_hp",this.on_hpdec,this);

            wl.dispatcher.unregister(this.warrior,"attack",this.attack,this);
            wl.dispatcher.unregister(this.warrior,"defense",this.defense,this);

            wl.dispatcher.unregister(this.warrior,"action",this.on_action,this);
            wl.dispatcher.unregister(this.warrior,"particle",this.on_particle,this);
         }

         layer.on_hpinc = function(){
            this.hpbar.setScaleX(this.warrior.getHP()/this.warrior.getTraveller().getMaxHP());
         }

          layer.on_hpdec = function(v){
            this.hpbar.setScaleX(this.warrior.getHP()/this.warrior.getTraveller().getMaxHP());

            if(this.warrior.isDead()){
                this.dead();
            }
         }

         layer.on_action = function(action){
            this[action]();
         };

         layer.on_particle = function(particle){
         cc.log("onparticle:"+particle)
            var inst = cc.ParticleSystem.create(particle);
            inst.setPosition(-size.width/2,-size.height/2);
			inst.setAutoRemoveOnFinish(true);
            this.addChild(inst);
         };

         layer.move = function(dt){
         cc.log("move")
         var s = cc.Sequence.create(cc.EaseIn.create(cc.ScaleTo.create(0.2,1.2),0.4),cc.EaseOut.create(cc.ScaleTo.create(0.2,1),0.4))
             this.runAction(cc.RepeatForever.create(s))

         }
         layer.stand = function(){
            this.stopAllActions()
         }
         layer.attack = function(){
         //flip = 1 from left to right ,-1 from right to left
            flip =  1
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
            this.runAction(anim)
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
   