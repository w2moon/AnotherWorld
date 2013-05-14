  wl.create_battlescene = function(){
         var scene = cc.Scene.create();

         scene.speeded = false;

         scene.toggle_speed = function(){
            cc.log("toggle")
            var scheduler = cc.Director.getInstance().getScheduler()
            if(this.speeded){
                cc.log("speed1");
                scheduler.setTimeScale(1);
            }
            else{
                cc.log("speed4");
                scheduler.setTimeScale(4);
            }
            this.speeded = !this.speeded;
         }
        


         var player1 = {};
          var player2 = {};

          var target = {
            'enemy':0,
            'ally' : 1,
            'all' : 2,
            'self' : 3,
            'allyfront' : 4,
            'allyhero' : 5,
            'enemyfront' : 6,
            'enemyhero' : 7,
            'eventtrigger' : 8,
            'eventtarget' : 9
          };

          var nature = {
            'left':0,
            'right':1,
            'random':2
          }

          
         

         var position = [
         [[0,0]],
         [[0,0],[100,100]],
         [[0,0],[30,120],[120,30]],
         [[0,0],[0,120],[100,100],[120,0]],
         [[30,0],[0,150],[80,120],[160,70],[180,-20]],
         ];

         scene.players = []
         scene.players.push(player1)
         scene.players.push(player2)
         scene.travellers = []

         player1.travellers = []
         player2.travellers = []

         var cfg = {'img':'header.png','baseid':5,'level':9,'rarity':1,
         'elemtype':'fire','hp':10,'attack':5,'defense':1,'targettype':0,'targetnum':1,'nature':0,'specialattack':10,'speed':3,'dodge':0,'critical':0.2,
         'hp%':0.2,'attack%':0.1,'defense%':0.1,'specialattack%':0,'speed%':0,'dodge%':0,'crit%':0,'skillid':1}

         var traveller = wl.itemfactory.create("traveller");
         cfg.speed = 1;
         traveller.init(player1,cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player1.travellers.push(traveller)
         scene.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         cfg.speed = 2;
         traveller.init(player1,cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player1.travellers.push(traveller)
         scene.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         cfg.speed = 3;
         traveller.init(player1,cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player1.travellers.push(traveller)
         scene.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         cfg.speed = 4;
         traveller.init(player1,cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player1.travellers.push(traveller)
         scene.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         cfg.speed = 10;
         traveller.init(player1,cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player1.travellers.push(traveller)
         scene.travellers.push(traveller)


         /////
         traveller = wl.itemfactory.create("traveller");
         cfg.speed = 9;
         traveller.init(player2,cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player2.travellers.push(traveller)
         scene.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         cfg.speed = 8;
         traveller.init(player2,cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player2.travellers.push(traveller)
         scene.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         cfg.speed = 7
         ;
         traveller.init(player2,cfg)
         traveller.soul = wl.itemfactory.create("soul");
         cfg.speed = 6;
         player2.travellers.push(traveller)
         scene.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         cfg.speed = 5;
         traveller.init(player2,cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player2.travellers.push(traveller)
         scene.travellers.push(traveller)

         traveller = wl.itemfactory.create("traveller");
         cfg.speed = 4;
         traveller.init(player2,cfg)
         traveller.soul = wl.itemfactory.create("soul");
         player2.travellers.push(traveller)
         scene.travellers.push(traveller)

        // player.travellers = [traveller,traveller,traveller,traveller,traveller];

         var x = 60;
         var y = 80;
         var radius = 200;
		 var degree = 90/player1.travellers.length;

         for(var k in player1.travellers){
            var card = wl.create_uicard(player1.travellers[k]);

          player1.travellers[k].card = card
				var d = 90-k*degree;
				var dx = x+radius*Math.cos(d/180*3.1415926);
				var dy = y+radius*Math.sin(d/180*3.1415926);

                var pos = position[player1.travellers.length-1][k]
                card.setPosition(cc.p(x+pos[0],y+pos[1]));

                 var lbl = cc.LabelTTF.create(""+player1.travellers[k].getSpeed(),"",24)
                 lbl.setColor(cc.c3b(0,0,0))
                 card.addChild(lbl)
            if(k==0){
                card.setScale(1.5)
            }

            scene.addChild(card);

          }

          var size = cc.Director.getInstance().getWinSize();
          x = size.width-x
          y = size.height-y

          for(var k in player2.travellers){
            var card = wl.create_uicard(player2.travellers[k]);

          player2.travellers[k].card = card
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

                 var lbl = cc.LabelTTF.create(""+player2.travellers[k].getSpeed(),"",24)
                  lbl.setColor(cc.c3b(0,0,0))
                 card.addChild(lbl)
            

            scene.addChild(card);

          }

           var menuitem = cc.MenuItemImage.create("speed.png","speed.png","speed.png",scene.toggle_speed,scene)
         var menu = cc.Menu.create(menuitem)
         menu.setPosition(cc.p(size.width/2,size.height/2))
         scene.addChild(menu)



          ////////////////////////////////////////////
          scene.start = function(){
            this.turn = 1
            this.state = state_normal
            this.schedule(this.turn_process,1);
            cc.log("schedule")
          }

          var sort_traveller = function(t1,t2){return t2.getSpeed()-t1.getSpeed();}

          scene.turn_process = function(){
            this.state.apply(this)
           
            
          }

          var nature_select = function(objs,nature_type,num,out_array){
          //num can be negative
            switch(nature_type)
            {
            case nature.left:
            {
                for(var k in objs){
                    if(k==0){
                        continue;
                    }
                    if(num==0){
                        
                        break;
                    }
                    cc.log("k:"+k)
                    if(!objs[k].isDead()){
                            out_array.push(objs[k]);
                            num--;
                        }
                    
                }
                if(out_array.length==0){
                    out_array.push(objs[0])
                }
            }
            break;
            case nature.right:
            {
                for(var k=objs.length-1;k>=0;k--){
                    if(k==0){
                        continue;
                    }
                    if(num==0){
                        break;
                    }
                    if(!objs[k].isDead()){
                            out_array.push(objs[k]);
                            num--;
                        }
                }
                if(out_array.length==0){
                    out_array.push(objs[0])
                }
            }
            break;
            case nature.random:
            {
                var arr = []
                for(var i in objs){
                    if(!objs[i].isDead()){
                        arr.push(objs[i]);
                    }
                }
                while(arr.length >0 &&num>0){
                    
                    var k = Math.random()*arr.length
                    out_array.push(arr[k])
                    arr.splice(k,1)
                    num--;
                }
            }
            break;
            }
          }

          scene.select_target = function(player,target_type,target_num,nature_type){
            switch(target_type){
                case target.enemy:
                {
                    var targets = [];
                    for(var k in this.players){
                        if(this.players[k] != player){
                            var travellers = this.players[k].travellers;
                            nature_select(this.players[k].travellers,nature_type,target_num,targets);
          
                        }
                    }

                    return targets;
                }
                case target.all:
                {
                    var targets = [];
                    for(var k in this.travellers){
                        targets.push(this.travellers[k])
                    }
                    return targets;
                }
            }
            return 1;
          }

          scene.start()

         return scene;
  }
