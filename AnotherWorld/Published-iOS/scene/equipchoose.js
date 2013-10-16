
var equipchoose = function(){};

equipchoose.prototype.onDidLoadFromCCB = function(){
    cc.log("equip choose")
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
    wl.run_scene("mainscene",this.traveller);
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
    if(this.scroll != null){
        this.scroll.removeFromParent();
    }
    if(this.type != null){
        this["btn"+this.type].unselected();
    }
    this.type = type;
    this["btn"+type].selected();
    this.objs = wl.gvars.role.getObjects(type);
    var cur = null;

    if(type == EQUIP_SOUL){
        for(var k in this.objs){
            if(this.traveller.isSouled(this.objs[k].getId()))
            {
                cur = this.objs[k];
                this.objs.splice(k,1);
                break;
            }
        }
    }
    else{
        for(var k in this.objs){
            if(this.traveller.isEquiped(this.objs[k].getId()))
            {
                cur = this.objs[k];
                this.objs.splice(k,1);
                break;
            }
        }
    }
    wl.gvars.role.orderObjects(this.order,this.objs);
    if(cur != null){
        var newobjs = [cur];
        this.objs = newobjs.concat(this.objs);
    }


    var container = cc.Layer.create();
    container.setAnchorPoint(cc.p(0,0));
    container.setPosition(cc.p(0,0));

    var size = this.body.getContentSize();
    var x = size.width/2;
    var y = size.height;
    var h = 0;
    for(var k in this.objs){
         var bar = wl.load_scene("equipbar",this.objs[k],cur == this.objs[k],this.oldtraveller,this.traveller,this.type);
        bar.setPosition(cc.p(x,y-bar.controller.bg.getContentSize().height/2-15));
        container.addChild(bar);
        y = y + bar.controller.bg.getContentSize().height;
        h = h + bar.controller.bg.getContentSize().height;
    }

    size.height = size.height - 20;
    container.setContentSize(size);

    
    if(!USE_CCB){
        this.scroll = cc.ScrollView.create(size,container);
        this.scroll.setDirection(1);
        this.scroll.setBounceable(true);
    }
    else{
        this.scroll = container;
    }
    
    this.rootNode.addChild(this.scroll);
};



