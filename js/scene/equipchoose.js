
var equipchoose = function(){};

equipchoose.prototype.onDidLoadFromCCB = function(){
};


equipchoose.prototype.onCreate = function(slot,oldtraveller,traveller){
    this.slot = slot;
    this.oldtraveller = oldtraveller;
    this.traveller = traveller;
    this.type = null;
    this.order = ORDER_DEFAULT;
    this.showPage(this.slot);
};

equipchoose.prototype.onPressBack = function(){
};

equipchoose.prototype.onPressOrder = function(){
};

equipchoose.prototype.onPressTag = function(n){
    this.showPage(n.getTag());
};

equipchoose.prototype.showPage = function(type){
    if(this.type == type){
        return;
    }
    if(this.type != null){
        this["btn"+this.type].unselected();
    }
    cc.log(this.type +" "+type)
    this.type = type;
    this["btn"+type].selected();
    this.objs = wl.gvars.role.getObjects(type);
    wl.gvars.role.orderObjects(this.order,this.objs);

    cc.log("num:"+this.objs.length);

    var y = 0;
    var h = 0;
    for(var k in this.objs){
         var bar = wl.load_scene("equipbar",this.objs[k]);
        bar.setPosition(cc.p(this.scroll.getContentSize().width/2,y));
        this.scroll.addChild(bar,-1);
        h = h + bar.controller.bg.getContentSize().height;
        y = y + bar.controller.bg.getContentSize().height;
    }
};



