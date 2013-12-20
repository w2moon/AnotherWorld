var infobox = function(){};

infobox.prototype.onDidLoadFromCCB = function () {
};

infobox.prototype.onCreate = function (msg, func, funcowner) {
    var BLANK_SIZE = 4;
    var CHAR_SIZE = 8;
    var arr = wl.analyze_string(msg);
    var txt = "";
    var sprs = [];
    for (var i = 0; i < arr.length; ++i) {
        if (typeof (arr[i]) == "string") {
            txt += arr[i];
        }
        else {
            switch (arr[i][0]) {
                case "img":
                    var spr = cc.Sprite.create(arr[i][1]);
                    //(wl.ansi_length(txt)+1) * CHAR_SIZE + spr.getContentSize().width/2
                    sprs.push([wl.ansi_length(txt) * CHAR_SIZE + spr.getContentSize().width, spr]);
                    this.box.addChild(spr);
                    var num = Math.ceil(spr.getContentSize().width / BLANK_SIZE);
                    for (var k = 0; k < num; ++k) {
                        txt += " ";
                    }
                    break;
            }
        }
    }

    var pos = this.lblinfo.getPosition();
    pos.x -= wl.ansi_length(txt) * CHAR_SIZE / 2;

    for (var i = 0; i < sprs.length; ++i) {
        sprs[i][1].setPosition(cc.p(sprs[i][0] + pos.x , pos.y));
    }
    this.lblinfo.setString(txt);
    this.func = func;
    this.funcowner = funcowner;

    wl.foreach_call(this.body, "setOpacity", 0);
    wl.fade_delay(this.body, 0, 0.3, 0, 255, this.showedup, this);

    this.box.setScale(0.8);
    this.box.runAction(cc.EaseElasticOut.create(cc.ScaleTo.create(0.3, 1)));
};

infobox.prototype.showedup = function () {
    wl.foreach_call(this.body, "setOpacity", 255);
};

infobox.prototype.onPressOK = function () {
    if (this.func) {
        this.func.apply(this.funcowner);
    }

    wl.fade_delay(this.body, 0, 0.3, 255, 0, this.closeFinish, this);
    
};

infobox.prototype.closeFinish = function () {
    if (this.func) {
        this.func.apply(this.funcowner);
    }
    wl.foreach_ifcall(this.rootNode.getParent(), function () { return true; }, "setEnabled", true);
    this.rootNode.removeFromParent();

    
};