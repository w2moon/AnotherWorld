
var soul = function(){
    this.init = function(baseid){
        soul.prototype.init.apply(this,[baseid])
    }
    this.getName = function(){
        cc.log("soul"+this.getBase())
    }
}
wl.extend(soul,item)