var parse_enemy = function(str){
    
    var parts = str.split(/;/);
    var arr = [];
    if(str.charAt(str.length-1) == ";"){
        parts.pop()
    }
    var tmp 
    for(var i=0;i<parts.length;++i){
        tmp = parts[i].split(/,/)
        if(parts[i].charAt(parts[i].length-1) == ","){
            tmp.pop()
        }
        arr.push(tmp)
    }
    return arr;
};  
  
var battlescene = function(){}
battlescene.prototype.onDidLoadFromCCB = function()
{
   // var pos = this.myhero.getPosition();
  //  cc.log("hero"+pos.x)
    
 //   var chanode = cc.BuilderReader.load("sk_human");
 //   this.rootNode.addChild(chanode);
   
 cc.log("good")
};

battlescene.prototype.onCreate = function(info,result)
{
    cc.log("battlecreate")
    this.order_traveller = 1;
    this.order_activate = 2;
    this.info = info;

    this.clientresult = retcode.BATTLE_RESULT_FAIL;
    this.result = result;
    
  //  cc.Director.getInstance().getScheduler().setTimeScale(5);

    cc.log("bg "+this.info.bg)
    var bg = cc.Sprite.create(this.info.bg);
    var c = bg.getContentSize();
    bg.setPosition(cc.p(c.width/2,c.height/2));
    this.rootNode.addChild(bg);


    var enemies = parse_enemy(this.info.enemy)
    
    var bfname = "battlefield1"
    if(enemies.length >=1){
    }
    this.battlefield = wl.load_scene(bfname)
    this.level = result.level;
    this.rootNode.addChild(this.battlefield)
    


    this.functask = new wl.functask();
    this.speeded = false;
    
    var roles = [wl.gvars.role,new wl.role(wl.role_from_enemy(this.info,enemies,this.level))];
    this.initBattle(roles);
    this.start();

};

battlescene.prototype.toggle_speed = function()
{
    var scheduler = cc.Director.getInstance().getScheduler()
    if(this.speeded){
        scheduler.setTimeScale(1);
    }
    else{
        scheduler.setTimeScale(4);
    }
    this.speeded = !this.speeded;
};

battlescene.prototype.addTask = function(){
     this.functask.add.apply(this.functask,Array.prototype.slice.call(arguments, 0))
};
battlescene.prototype.addTaskTail = function(){
     this.functask.addtail.apply(this.functask,Array.prototype.slice.call(arguments, 0))
};
battlescene.prototype.addTasks = function(){
     this.functask.adds.apply(this.functask,Array.prototype.slice.call(arguments, 0))       
};

battlescene.prototype.initBattle = function(roles)
{
    this.players = [];
    this.warriors = [];
    for(var k in roles){
       var player = new wl.player(roles[k],this);
       this.players.push(player);
       this.init_role(player,k);
    }
};

 battlescene.prototype.init_role = function(player,idx){
            var warriors = player.getWarriors();
           // var positions = group_position[idx][warriors.length-1]
     var tail = "";
     if (idx != 0){
         tail = "_flip";
     }
            for(var k in warriors){
                
                this.battlefield.removeChild(this.battlefield.controller['card'+idx+"_"+k])
                if(warriors[k] == null){
                    continue;
                }
                
                  var card = wl.load_scene("uicard",warriors[k].getTraveller().getSoul().getSkeleton()+tail,warriors[k].getTraveller().getSoul().getAvatar(),warriors[k].getTraveller().getImg(),warriors[k]); //wl.create_uicard(warriors[k]);
               
                  var pos = this.battlefield.controller['card'+idx+"_"+k].getPosition();
                
	              card.setPosition(pos)
                 
                  this.battlefield.addChild(card);

                  warriors[k].battle_init(card);
                  this.warriors.push(warriors[k]);
                
                  wl.dispatcher.registerobj(warriors[k],this.on_warrior_event,this);
            }
            
         };

battlescene.prototype.getAttackPosition = function(warrior){
    
            return warrior.getUI().getPosition();
};

battlescene.prototype.on_warrior_event = function(){
            var args = Array.prototype.slice.call(arguments, 0);
            for(var k in this.warriors){
                if(this.warriors[k]!=null)
                this.warriors[k].on_event.apply(this.warriors[k],args);
            }
};

battlescene.prototype.delayupdate = function(t){
            this.rootNode.runAction(cc.Sequence.create(cc.DelayTime.create(t),cc.CallFunc.create(this.turn_process,this)));
};

          
battlescene.prototype.start = function(){
            this.turn = 1;
            this.state = state_normal;
            //this.schedule(this.turn_process,1);
            this.delayupdate(ACTION_INTERVAL);
            cc.log("schedule")

            wl.dispatcher.notify(this,"battle_start");
};


battlescene.prototype.turn_process = function(){
            var dt = this.functask.next();
            if(dt != null){
                this.delayupdate(dt)
                return;
            }
            this.delayupdate(this.state.apply(this))
            
};
 
 var sort_hp = function(t1,t2){return t2.getHP()>t1.getHP();}

 var nature_select = function(objs,nature_type,num,out_array,selecthero,needalive){
          //num can be negative
            switch(nature_type)
            {
            case naturetype.left:
            {
                for(var k in objs){
                    if(k==HERO_IDX || objs[k] == null){
                        continue;
                    }
                    if(num==0){
                        
                        break;
                    }
                    if((needalive && !objs[k].isDead())
                    || (!needalive && objs[k].isDead())){
                            out_array.push(objs[k]);
                            num--;
                        }
                    
                }
                if(selecthero && (out_array.length===0 || num < 0) && objs[HERO_IDX] != null){
                    out_array.push(objs[HERO_IDX])
                }
            }
            break;
            case naturetype.right:
            {
                for(var k=objs.length-1;k>=0;k--){
                    if(k==HERO_IDX || objs[k] == null){
                        continue;
                    }
                    if(num==0){
                        break;
                    }
                    if((needalive && !objs[k].isDead())
                    || (!needalive && objs[k].isDead())){
                            out_array.push(objs[k]);
                            num--;
                        }
                }
                if(selecthero && (out_array.length==0  || num < 0) && objs[HERO_IDX] != null){
                    out_array.push(objs[HERO_IDX])
                }
            }
            break;
            case naturetype.random:
            {
                var arr = []
                for(var i in objs){
                    if(objs[k] != null
                       &&((needalive && !objs[k].isDead())
                    || (!needalive && objs[k].isDead()))){
                        if(i == HERO_IDX && !selecthero)
                        {
                        }
                        else
                        {
                            arr.push(objs[i]);
                        }
                    }
                }
                while(arr.length >0 &&num>0){
                    
                    var k = Math.random()*arr.length
                    out_array.push(arr[k]);
                    arr.splice(k,1);
                    num--;
                }
            }
            break;

            case naturetype.randommulti:
            {
                var arr = []
                for(var i in objs){
                    if(objs[k] != null
                       &&((needalive && !objs[k].isDead())
                    || (!needalive && objs[k].isDead()))){
                        if(i == HERO_IDX && !selecthero)
                        {
                        }
                        else
                        {
                            arr.push(objs[i]);
                        }
                    }
                }
                while(arr.length >0 &&num>0){
                    
                    var k = Math.random()*arr.length
                    out_array.push(arr[k]);
                    num--;
                }
            }
            break;
           
            case naturetype.lowesthp:
            {
                if(num == -1){
                    for(var k in objs){
                        if(objs[k]!=null && !objs[k].isDead()){
                            if(k == HERO_IDX  && !selecthero)
                            {
                                
                            }
                            else
                            {
                            out_array.push(objs[k]);
                            }
                        }
                    }
                }
                else{
                for(var k in objs){
                    if(objs[k] == null || objs[k].isDead()){
                        continue;
                    }
                    if(out_array.length < num){
                        out_array.push(objs[k])
                    }
                    else{
                        out_array.sort(sort_hp);
                        for(var i in out_array){
                            if(objs[k].getHP() < out_array[i].getHP()){
                                out_array[0] = objs[k]
                                break;
                            }
                        }
                        
                    }
                }
                }

               
            }
            break;
            }
           
};


battlescene.prototype.select_target = function(player,actor,target_type,target_num,nature_type,needalive,trigger,event_targets){
            var targets = [];
            switch(target_type){
                case targettype.enemy:
                {
                    if(nature_type == naturetype.opposite){
                        var target = null;
                        var warriors = player.getWarriors();
                        var enemywarriors = null;
                        for(var k in this.players){
                            if(this.players[k] != player){
                                enemywarriors = this.players[k].getWarriors();
                                break;
                            }
                        }
                        for(var k in warriors){
                            if(warriors[k] == actor){
                                 if(
                                    k != HERO_IDX
                                 && enemywarriors[k] != null
                                 && ((needalive && !enemywarriors[k].isDead())
                                 || (!needalive && enemywarriors[k].isDead()))
                                    ){
                                      target = enemywarriors[k];
                                 }
                                 break;
                            }
                        }
                        if(target == null){
                            for(var k in enemywarriors){
                                    if(enemywarriors[k] != null
                                     &&  ((needalive && !enemywarriors[k].isDead())
                                    || (!needalive && enemywarriors[k].isDead()))){
                                        target = enemywarriors[k];
                                    }
                                    break;
                                
                            }
                        }
                        targets.push(target);
                    }
                    else{
                        for(var k in this.players){
                            if(this.players[k] != player){
                                nature_select(this.players[k].getWarriors(),nature_type,target_num,targets,true,needalive);
                                if(target_num != -1 && targets.length >= target_num){
                                    break;
                                }
                            }
                        }
                    }

                }
                break;
                case targettype.ally:
                {
                    
                    for(var k in this.players){
                        if(this.players[k] == player){
                            nature_select(this.players[k].getWarriors(),nature_type,target_num,targets,true,needalive);
                            if(target_num != -1 && targets.length >= target_num){
                                break;
                            }
                        }
                    }

                }
                break;
                case targettype.all:
                {
                    for(var k in this.warriors){
                       if(
                          this.warriors[k] != null
                        && ((needalive && !this.warriors[k].isDead())
                        || (!needalive && this.warriors[k].isDead()))){
                            targets.push(this.warriors[k])
                        }
                    }
                }
                break;
                case targettype.self:
                {
                     if((needalive && !actor.isDead())
                     || (!needalive && actor.isDead())){
                            targets.push(actor)
                    }
                }
                break;
                 case targettype.onlyallyfront:
                {
                    for(var k in this.players){
                        if(this.players[k] == player){
                            nature_select(this.players[k].getWarriors(),nature_type,target_num,targets,false,needalive);
                            if(target_num != -1 && targets.length >= target_num){
                                break;
                            }
                        }
                    }
                }
                break;
                 case targettype.onlyallyhero:
                {
                    for(var k in this.players){
                        if(this.players[k] == player){
                            var warriors = this.players[k].getWarriors();
                            if(
                            warriors[HERO_IDX] != null
                            && (needalive && !warriors[HERO_IDX].isDead())
                            || (!needalive && warriors[HERO_IDX].isDead())){
                                targets.push(warriors[HERO_IDX])
                            }
                        }
                    }
                }
                break;
                 case targettype.onlyenemyfront:
                {
                     for(var k in this.players){
                        if(this.players[k] != player){
                            var travellers = this.players[k].getSlotTravellers();
                            nature_select(travellers,nature_type,target_num,targets,false,needalive);
                            if(target_num != -1 && targets.length >= target_num){
                                break;
                            }
                        }
                    }
                }
                break;
                 case targettype.onlyenemyhero:
                {
                    for(var k in this.players){
                        if(this.players[k] != player){
                            var warriors = this.players[k].getWarriors();
                                targets.push(warriors[0])
                            if(
                            warriors[HERO_IDX] != null
                            && (needalive && !warriors[HERO_IDX].isDead())
                            || (!needalive && warriors[HERO_IDX].isDead())){
                                targets.push(warriors[HERO_IDX])
                            }
                        }
                    }
                }
                break;
                case targettype.eventtrigger:
                {
                     if((needalive && !trigger.isDead())
                     || (!needalive && trigger.isDead())){
                        targets.push(trigger);
                     }
                }
                break;
                case targettype.eventtarget:
                {
                    for(var k in event_targets){
                        if((needalive && !event_targets[k].isDead())
                     || (!needalive && event_targets[k].isDead())){
                            targets.push(event_targets[k])
                        }
                    }
                }
                break;
                default:
                    cc.log("invalid targettype:"+target_type)
                break;
            }
            return targets;
};

  wl.create_battlescene = function(){
         var scene = cc.Scene.create();

         scene.functask = new wl.functask();
         scene.speeded = false;
         var size = cc.Director.getInstance().getWinSize();
         scene.toggle_speed = function(){
            var scheduler = cc.Director.getInstance().getScheduler()
            if(this.speeded){
                scheduler.setTimeScale(1);
            }
            else{
                scheduler.setTimeScale(4);
            }
            this.speeded = !this.speeded;
         }

         var group_position = [
         [
         [[60,80]],
         [[60,80],[160,180]],
         [[60,80],[90,200],[180,110]],
         [[60,80],[60,200],[160,180],[180,80]],
         [[90,80],[60,230],[140,200],[220,150],[240,-100]],
         ],
         [
         [[260,400]],
         [[260,400],[220,380]],
         [[260,400],[200,450],[290,360]],
         [[260,400],[200,480],[220,380],[320,360]],
         [[230,400],[140,500],[160,410],[240,360],[320,330]],
         ],
         ]

         scene.addTask = function(){
            this.functask.add.apply(this.functask,Array.prototype.slice.call(arguments, 0))
         
         };
          scene.addTaskTail = function(){
            this.functask.addtail.apply(this.functask,Array.prototype.slice.call(arguments, 0))
         };
          scene.addTasks = function(){
            this.functask.adds.apply(this.functask,Array.prototype.slice.call(arguments, 0))
         
         }

         scene.init = function(roles){
            this.players = [];
            this.warriors = [];
            for(var k in roles){
                var player = new wl.player(roles[k],this);
                this.players.push(player);
                this.init_role(player,k);
            }
           
         };

         scene.init_role = function(player,idx){
            var warriors = player.getWarriors();
            var positions = group_position[idx][warriors.length-1]
            for(var k in warriors){
                  var card = wl.create_uicard(warriors[k]);
                  card.setPosition(cc.p(positions[k][0],positions[k][1]));
                  if(k==0){
                        card.setScale(1.5);
                  }
                  scene.addChild(card);

                  warriors[k].battle_init(card);
                  this.warriors.push(warriors[k]);

                  wl.dispatcher.registerobj(warriors[k],this.on_warrior_event,this);
            }
            
         };

         scene.getAttackPosition = function(warrior){
            return warrior.getUI().getPosition();
         };

         scene.on_warrior_event = function(){
            var args = Array.prototype.slice.call(arguments, 0);
            for(var k in this.warriors){
                this.warriors[k].on_event.apply(this.warriors[k],args);
            }
         }

         scene.deinit_role = function(role){
         };
        


         var player1 = {};
          var player2 = {};

         

         

          
         

       

         scene.players = []
         scene.players.push(player1)
         scene.players.push(player2)
         scene.travellers = []

         player1.travellers = []
         player2.travellers = []

         var cfg = {'img':'header.png','baseid':5,'level':9,'rarity':1,
         'elemtype':'fire','hp':10,'attack':5,'defense':1,'targettype':0,'targetnum':1,'targetneedalive':true,'nature':0,'specialattack':10,'speed':3,'dodge':0,'critical':0.2,
         'hp%':0.2,'attack%':0.1,'defense%':0.1,'specialattack%':0,'speed%':0,'dodge%':0,'crit%':0,'skillid':1}

       

        // player.travellers = [traveller,traveller,traveller,traveller,traveller];

         var x = 60;
         var y = 80;
         var radius = 200;
		 var degree = 90/player1.travellers.length;
         /*
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
          */
         var menuitem = cc.MenuItemImage.create("speed.png","speed.png","speed.png",scene.toggle_speed,scene)
         var menu = cc.Menu.create(menuitem)
         menu.setPosition(cc.p(size.width/2,size.height/2))
         scene.addChild(menu)


         scene.delayupdate = function(t){
            this.runAction(cc.Sequence.create(cc.DelayTime.create(t),cc.CallFunc.create(scene.turn_process,this)));
         }

          ////////////////////////////////////////////
          scene.start = function(){
            this.turn = 1;
            this.state = state_normal;
            //this.schedule(this.turn_process,1);
            this.delayupdate(ACTION_INTERVAL);
            cc.log("schedule")

            wl.dispatcher.notify(this,"battle_start");
          }


          scene.turn_process = function(){
            var dt = this.functask.next();
            if(dt != null){
                this.delayupdate(dt)
                return;
            }
            this.delayupdate(this.state.apply(this))
            
          }

         
          

          scene.select_target = function(player,actor,target_type,target_num,nature_type,needalive,trigger,event_targets){
            var targets = [];
            switch(target_type){
                case targettype.enemy:
                {
                    if(nature_type == naturetype.opposite){
                        var target = null;
                        var warriors = player.getWarriors();
                        var enemywarriors = null;
                        for(var k in this.players){
                            if(this.players[k] != player){
                                enemywarriors = this.players[k].getWarriors();
                            }
                        }
                        for(var k in warriors){
                            if(warriors[k] == actor){
                                 if((needalive && !enemywarriors[k].isDead())
                                 || (!needalive && enemywarriors[k].isDead())){
                                      target = enemywarriors[k];
                                 }
                                 break;
                            }
                        }
                        if(target == null){
                            for(var k in enemywarriors){
                                    if((needalive && !enemywarriors[k].isDead())
                                    || (!needalive && enemywarriors[k].isDead())){
                                        target = enemywarriors[k];
                                    }
                                    break;
                                
                            }
                        }
                        targets.push(target);
                    }
                    else{
                        for(var k in this.players){
                            if(this.players[k] != player){
                                nature_select(this.players[k].getWarriors(),nature_type,target_num,targets,true,needalive);
                                if(target_num != -1 && targets.length >= target_num){
                                    break;
                                }
                            }
                        }
                    }

                }
                break;
                case targettype.ally:
                {
                    
                    for(var k in this.players){
                        if(this.players[k] == player){
                            nature_select(this.players[k].getWarriors(),nature_type,target_num,targets,true,needalive);
                            if(target_num != -1 && targets.length >= target_num){
                                break;
                            }
                        }
                    }

                }
                break;
                case targettype.all:
                {
                    for(var k in this.warriors){
                       if((needalive && !this.warriors[k].isDead())
                        || (!needalive && this.warriors[k].isDead())){
                            targets.push(this.warriors[k])
                        }
                    }
                }
                break;
                case targettype.self:
                {
                     if((needalive && !actor.isDead())
                     || (!needalive && actor.isDead())){
                            targets.push(actor)
                    }
                }
                break;
                 case targettype.onlyallyfront:
                {
                    for(var k in this.players){
                        if(this.players[k] == player){
                            nature_select(this.players[k].getWarriors(),nature_type,target_num,targets,false,needalive);
                            if(target_num != -1 && targets.length >= target_num){
                                break;
                            }
                        }
                    }
                }
                break;
                 case targettype.onlyallyhero:
                {
                    for(var k in this.players){
                        if(this.players[k] == player){
                            var warriors = this.players[k].getWarriors();
                            if(!needalive || !warriors[0].isDead()){
                                targets.push(warriors[0])
                            }
                        }
                    }
                }
                break;
                 case targettype.onlyenemyfront:
                {
                     for(var k in this.players){
                        if(this.players[k] != player){
                            var travellers = this.players[k].getSlotTravellers();
                            nature_select(travellers,nature_type,target_num,targets,false,needalive);
                            if(target_num != -1 && targets.length >= target_num){
                                break;
                            }
                        }
                    }
                }
                break;
                 case targettype.onlyenemyhero:
                {
                    for(var k in this.players){
                        if(this.players[k] != player){
                            var warriors = this.players[k].getWarriors();
                            if(!needalive || !warriors[0].isDead()){
                                targets.push(warriors[0])
                            }
                        }
                    }
                }
                break;
                case targettype.eventtrigger:
                {
                     if((needalive && !trigger.isDead())
                     || (!needalive && trigger.isDead())){
                        targets.push(trigger);
                     }
                }
                break;
                case targettype.eventtarget:
                {
                    for(var k in event_targets){
                        if((needalive && !event_targets[k].isDead())
                     || (!needalive && event_targets[k].isDead())){
                            targets.push(event_targets[k])
                        }
                    }
                }
                break;
                default:
                    cc.log("invalid targettype:"+target_type)
                break;
            }
            return targets;
          }

          scene.emit_particle = function(from,to,particle){
          };
        //  wl.gvars.role
          var roles = [new wl.role(wl.tmp_dbrole("role1")),new wl.role(wl.tmp_dbrole("role2"))]
          scene.init(roles)
          scene.start()

         return scene;
  }
