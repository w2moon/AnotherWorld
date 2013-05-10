  wl.create_battlescene = function(){
         var scene = cc.Scene.create();

         var player = {};

         var position = [
         [[0,0]],
         [[0,0],[100,100]],
         [[0,0],[30,120],[120,30]],
         [[0,0],[0,120],[100,100],[120,0]],
         [[30,0],[0,150],[80,120],[160,70],[180,-20]],
         ];

         player.travellers = []

         var traveller = wl.itemfactory.create("traveller");
         traveller.init({'img':'header.png','baseid':5,'level':9,'elemtype':'fire','hp':100,'attack':5,'defense':1,'specialattack':10,'speed':3,'dodge':0,'critical':0.2})
         traveller.soul = wl.itemfactory.create("soul");
         player.travellers.push(traveller)

         player.travellers.push(traveller)
         player.travellers.push(traveller)
         player.travellers.push(traveller)
         player.travellers.push(traveller)

        // player.travellers = [traveller,traveller,traveller,traveller,traveller];

         var x = 60;
         var y = 80;
         var radius = 200;
		 var degree = 90/player.travellers.length;

         for(var k in player.travellers){
            var card = wl.create_uicard(player.travellers[k]);

          
				var d = 90-k*degree;
				var dx = x+radius*Math.cos(d/180*3.1415926);
				var dy = y+radius*Math.sin(d/180*3.1415926);

                var pos = position[player.travellers.length-1][k]
                card.setPosition(cc.p(x+pos[0],y+pos[1]));

                 var lbl = cc.LabelTTF.create(""+k,"",24)
                 card.addChild(lbl)
            if(k==0){
                card.setScale(1.5)
            }

            scene.addChild(card);

          }

          var size = cc.Director.getInstance().getWinSize();
          x = size.width-x
          y= size.height-y

          for(var k in player.travellers){
            var card = wl.create_uicard(player.travellers[k]);

          
				var d = 180+k*degree;
				var dx = x-radius*Math.cos(d/180*3.1415926);
				var dy = y-radius*Math.sin(d/180*3.1415926);

                var pos = position[player.travellers.length-1][k]
                card.setPosition(cc.p(x-pos[0],y-pos[1]));

                 var lbl = cc.LabelTTF.create(""+k,"",24)
                 card.addChild(lbl)
            if(k==0){
                card.setScale(1.5)
            }

            scene.addChild(card);

          }

          

         return scene;
  }
