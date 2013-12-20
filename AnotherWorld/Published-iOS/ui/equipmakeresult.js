var equipmakeresult = function () { };

equipmakeresult.prototype.onDidLoadFromCCB = function () {
    this.title.setString(lang("TXT_MAKE_SUCCESS"));
    this.lblcontinue.setString(lang("TXT_MAKE_CONTINUE"));
    this.lblenhence.setString(lang("TXT_MAKE_ENHENCE"));
    this.lblequip.setString(lang("TXT_MAKE_PUTON"));


   
};

equipmakeresult.prototype.onCreate = function (equipid, func, funcobj) {

    this.equip = wl.gvars.role.getEquipment(equipid);
    this.func = func;
    this.funcobj = funcobj;
    var size = this.rootNode.getContentSize();
    this.card = cc.Sprite.create(this.equip.getBase().avatar);
    this.card.setPosition(size.width / 2, size.height / 2);
    this.rootNode.addChild(this.card);

    this.card.setScale(2)
    this.card.setOpacity(0);
    this.card.runAction(cc.Sequence.create(cc.DelayTime.create(0.2),cc.Spawn.create(cc.FadeIn.create(0.3), cc.EaseElasticOut.create(cc.ScaleTo.create(0.8, 1)))));
    

    var pos = this.title.getPosition();
    this.title.setPosition(cc.p(pos.x, pos.y - 100));
    this.title.runAction(cc.Sequence.create(cc.EaseIn.create(cc.MoveTo.create(0.3, pos), 0.4)));
    wl.foreach_call(this.title, "setOpacity", 0);
    wl.fade(this.title, 0.3, 0, 255);

};

equipmakeresult.prototype.onPressContinue = function () {
    this.func.apply(this.funcobj);
};

equipmakeresult.prototype.onPressEnhence = function () {
};

equipmakeresult.prototype.onPressPuton = function () {
};