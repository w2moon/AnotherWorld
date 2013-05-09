
var soul = function(){
    this.init = function(baseid){
        soul.prototype.init.apply(this,[baseid])
    }
    this.getName = function(){
        cc.log("soul"+this.getBase())
    }

    this.getImg = function(){
        return "soul.png"
    }
}
wl.extend(soul,item)