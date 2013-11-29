var infobox = function(){};

infobox.prototype.onDidLoadFromCCB = function () {
};

infobox.prototype.onCreate = function (msg, func, funcowner) {
    this.lblinfo.setString(msg);
    this.func = func;
    this.funcowner = funcowner;

    cc.log("box")
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