state_endturn = function(){
                    cc.log("endturn")
                    for(var k in this.warriors){
                        this.warriors[k].endturn();
                    }
                    this.state = state_newturn
                    this.turn++;
                    return ACTION_INTERVAL
}