

state_action = function(){

var attack_end = function(){
   this.state = state_action
}




var func = function(){
     cc.log("action")
                    if(this.idx_acting < this.travellers.length){
                        var traveller = this.travellers[this.idx_acting];
                       

                        var targets = this.select_target(traveller.getOwner(),traveller.getTargetType(),traveller.getTargetNum(),traveller.getNature());
                        cc.log("target:"+targets.length+" speed:"+targets[0].getSpeed())

                        if(traveller.attack(targets)){
                           this.state = state_anim
                        }
                        
                        this.idx_acting++;
                             while(this.idx_acting < this.travellers.length && this.travellers[this.idx_acting].isDead()){
                                   this.idx_acting++
                               }
                        
                        
                    }
                    else
                    {
                        this.state = state_endturn
                    }

                   
}
return func;
}()