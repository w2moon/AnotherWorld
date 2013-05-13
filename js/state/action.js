

state_action = function(){
     cc.log("action")
                    if(this.idx_acting < this.travellers.length){
                        var traveller = this.travellers[this.idx_acting]
                        traveller.card.attack()
                    }
                    else
                    {
                        this.state = state_endturn
                    }

                    this.idx_acting++;
}