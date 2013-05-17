

state_newturn=function(){
var sort_traveller = function(t1,t2){return t2.getSpeed()-t1.getSpeed();}
var func = function(){
                    cc.log("turn:"+this.turn)
                    if(this.turn > MAX_BATTLE_TURN){
                        this.state = state_finish
                        cc.log("exceed max battle turn "+MAX_BATTLE_TURN)
                        return 0
                    }
                    
                    
                   this.travellers.sort(sort_traveller)
                   this.idx_acting = 0;
                   this.state = state_action;

                   for(var k in this.warriors){
                        this.warriors[k].newturn();
                   }

                   return 0;
}
return func
}()