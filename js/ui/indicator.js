wl.create_indicator = function(v,max){
    var layer = cc.Layer.create();

    layer.setAnchorPoint(cc.p(0,0))
    layer.v = v;
    layer.max = max;

    layer.lights = [];

    cc.log("max:"+max)

    layer.unitheight = 0
    for(var i=0;i<max;++i){
        var light = cc.Sprite.create("ind_empty.png");
        if(layer.unitheight == 0){
            layer.unitheight = light.getContentSize().height;
        }
        layer.addChild(light);

        layer.lights.push(light);
    }


     layer.top = cc.Sprite.create("ind_tempty.png");
     layer.addChild(layer.top);

     layer.bottom = cc.Sprite.create("ind_bempty.png");
     layer.addChild(layer.bottom);

     layer.setMax = function(v){
        if(v>this.lights.length){
            for(var i=this.lights.length;i<v;++i){
                var light = cc.Sprite.create("ind_empty.png");
                this.addChild(light);
                this.lights.push(light);
            }
        }
        else if(v < this.lights.length){
            for(var i = this.lights.length;i>v;i--){
                this.lights.pop();
            }
        }
        this.max = v;
        this.refresh();
    };

    layer.setValue = function(v) {
        for(var i = 0;i<v;++i){
            this.lights[i].initWithFile("ind_full.png");
        }
         for(var i = v;i<this.lights.length;++i){
            this.lights[i].initWithFile("ind_empty.png");
        }
        this.v = v;

        this.refresh();
    };

    layer.refresh = function(){
        var y = -this.bottom.getContentSize().height;
        this.bottom.setPosition(cc.p(0,y));
        for(var i in this.lights){
            y = y + this.unitheight;
            this.lights[i].setPosition(cc.p(0,y));
        }
        y = y + this.top.getContentSize().height
        this.top.setPosition(cc.p(0,y));
    };

    layer.refresh();

    return layer;
};
