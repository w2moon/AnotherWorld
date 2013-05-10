  wl.create_battlescene = function(){
         var scene = cc.Scene.create();

         var player1 = {};
          var player2 = {};

         var state = {
            'normal':1,
            'action':2
         };

         var position = [
         [[0,0]],
         [[0,0],[100,100]],
         [[0,0],[30,120],[120,30]],
         [[0,0],[0,120],[100,100],[120,0]],
         [[30,0],[0,150],[80,120],[160,70],[180,-20]],
         ];

         player1.travellers = []
         player2.travellers = []

         var cfg = {'img':'header.png','baseid':5,'level':9,'rarity':1,
         'elemtype':'fire','hp':100,'attack':5,'defense':1,'specialattack':10,'speed':3,'dodge':0,'critical':0.2,
         'hp%':0.2,'attack%':0.1,'defense%':0.1,'specialattack%':0,'speed%':0,'dodge%':0,'crit%':0,'skillid':1}

         var traveller = wl.itemfactory.create("traveller");
         traveller.init(cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player1.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         traveller.init(cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player1.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         traveller.init(cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player1.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         traveller.init(cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player1.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         traveller.init(cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player1.travellers.push(traveller)


         /////
         traveller = wl.itemfactory.create("traveller");
         traveller.init(cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player2.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         traveller.init(cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player2.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         traveller.init(cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player2.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         traveller.init(cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player2.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         traveller.init(cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player2.travellers.push(traveller)

        // player.travellers = [traveller,traveller,traveller,traveller,traveller];

         var x = 60;
         var y = 80;
         var radius = 200;
		 var degree = 90/player1.travellers.length;

         for(var k in player1.travellers){
            var card = wl.create_uicard(player1.travellers[k]);

          
				var d = 90-k*degree;
				var dx = x+radius*Math.cos(d/180*3.1415926);
				var dy = y+radius*Math.sin(d/180*3.1415926);

                var pos = position[player1.travellers.length-1][k]
                card.setPosition(cc.p(x+pos[0],y+pos[1]));

                 var lbl = cc.LabelTTF.create(""+k,"",24)
                 lbl.setColor(cc.c3b(0,0,0))
                 card.addChild(lbl)
            if(k==0){
                card.setScale(1.5)
            }

            scene.addChild(card);

          }

          var size = cc.Director.getInstance().getWinSize();
          x = size.width-x
          y= size.height-y

          for(var k in player2.travellers){
            var card = wl.create_uicard(player2.travellers[k]);

          
				var d = 180+k*degree;
				var dx = x-radius*Math.cos(d/180*3.1415926);
				var dy = y-radius*Math.sin(d/180*3.1415926);

                if(k==0)
                {
                card.setScale(1.5)
                var pos = position[player2.travellers.length-1][k]
                card.setPosition(cc.p(x-pos[0],y-pos[1]));
                }
                else
                {
                var pos = position[player2.travellers.length-1][player2.travellers.length-k]
                card.setPosition(cc.p(x-pos[0],y-pos[1]));
                }

                 var lbl = cc.LabelTTF.create(""+k,"",24)
                  lbl.setColor(cc.c3b(0,0,0))
                 card.addChild(lbl)
            

            scene.addChild(card);

          }



          ////////////////////////////////////////////
          scene.start = function(){
            this.turn = 1
            this.state = state.normal
            this.schedule(this.turn_process,1);
            cc.log("schedule")
          }

          scene.turn_process = function(){
          cc.log("process")
            switch(this.state){
                case state.normal:
                {
                    cc.log("turn:"+this.turn)
                    this.state = state.action;
                }
                break;
                case state.action:
                {
                }
                break;
            }
            
          }

          scene.start()

         return scene;
  }
