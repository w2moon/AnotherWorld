

state_action = function(){

var attack_end = function(){
   this.state = state_action
}




var func = function(){
                   // cc.log("action")
                    var dt = 0;
                    if(this.idx_acting < this.warriors.length){

                        if(this.warriors[this.idx_acting].canAction())
                        {
                            dt = this.warriors[this.idx_acting].action();
                        }

                        this.idx_acting++;
                        while(this.idx_acting < this.warriors.length && (this.warriors[this.idx_acting] == null || this.warriors[this.idx_acting].isDead())){
                              this.idx_acting++
                        }
                    }
                    else{
               
                        for(var k in this.players){
                           if(this.players[k].isDead()){
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