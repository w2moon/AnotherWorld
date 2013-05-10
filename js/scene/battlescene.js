  wl.create_battlescene = function(){
         var scene = cc.Scene.create();

         var player = {};

         var position = [
         [[0,0]],
         [[0,0],[100,100]],
         [[0,0],[50,180],[180,50]],
         [[0,0],[50,180],[100,100],[180,50]],
         [[0,0],[0,150],[80,100],[130,50],[150,0]],
         ];


         var traveller = wl.itemfactory.create("traveller");
         traveller.level = 5;
         traveller.soul = wl.itemfactory.create("soul");

         player.travellers = [traveller,traveller,traveller,traveller,traveller];

         var x = 150;
         var y = 150;
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

         return scene;
  }
