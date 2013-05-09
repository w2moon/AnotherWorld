
var traveller = function(){
    this.init = function(baseid){
        traveller.prototype.init.apply(this,[baseid])
    }
    this.getName = function(){
        cc.log("soul"+this.getBase())
    }

    this.getImg = function(){
        return "header.png"
    }
}
wl.extend(traveller,item)