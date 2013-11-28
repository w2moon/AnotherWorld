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
};

equipmakeresult.prototype.onPressContinue = function () {
    this.func.apply(this.funcobj);
};

equipmakeresult.prototype.onPressEnhence = function () {
};

equipmakeresult.prototype.onPressPuton = function () {
};