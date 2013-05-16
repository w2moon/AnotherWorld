

state_action = function(){

var attack_end = function(){
   this.state = state_action
}




var func = function(){
     cc.log("action")
     var dt = 0;
                    if(this.idx_acting < this.travellers.length){
                        var traveller = this.travellers[this.idx_acting];
                       
                       if(!traveller.isDead()){

                      //  var targets = this.select_target(traveller.getOwner(),traveller,traveller.getTargetType(),traveller.getTargetNum(),traveller.getNature(),traveller.getTargetNeedAlive());

                       var targets = this.select_target(traveller.getOwner(),traveller,0,1,0,true);
                        
                        cc.log("target:"+targets.length)
                        
                        dt = traveller.attack(targets);
                        }
                        
                        
                        this.idx_acting++;
                        while(this.idx_acting < this.travellers.length && this.travellers[this.idx_acting].isDead()){
                              this.idx_acting++
                        }
                        
                        
                    }
                    else
                    {
                        for(var k in this.players){
                           if(this.players[k].getSlotTravellers()[0].isDead()){
                               this.state = state_finish
                               return 0
                           }
                        }
                        this.state = state_endturn
                    }

                   return dt
                   
}
return func;
}();