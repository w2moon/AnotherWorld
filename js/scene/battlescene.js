  wl.create_battlescene = function(){
         var scene = cc.Scene.create();

         var player = {};


         var traveller = wl.itemfactory.create("traveller");
         traveller.level = 5;
         traveller.soul = wl.itemfactory.create("soul");

         player.travellers = [traveller,traveller,traveller,traveller,traveller];

         var x = 0;
         var y = 240;
         var radius = 90;
		 var degree = 90/player.travellers.length;

         for(var k in player.travellers){
            var card = wl.create_uicard(player.travellers[k]);

            if(k==0){
                card.setPosition(cc.p(x,y));
            }
            else
            {
				var d = 90-k*degree;
				var dx = x+radius*Math.cos(d);
				var dy = y+radius*Math.sin(d);
                card.setPosition(cc.p(dx,dy));
            }

            scene.addChild(card);

          }

         return scene;
  }
