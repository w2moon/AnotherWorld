
var traveller = function(){
    this.init = function(cfg){
        //traveller.prototype.init.apply(this,[baseid])
        this.cfg = cfg
    }
    this.getName = function(){
        cc.log("soul"+this.getBase())
    }

    this.getImg = function(){
        return cfg.img
    }
}
wl.extend(traveller,item)