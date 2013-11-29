var starupresult = function () { };

starupresult.prototype.onDidLoadFromCCB = function () {
    this.title.setString(lang("TXT_STARUP_SUCCESS"));
    this.btnok.setString(lang("TXT_OK"));
};

starupresult.prototype.onCreate = function (soulid, func, funcobj) {

    this.soul = wl.gvars.role.getSoul(soulid);
    this.func = func;
    this.funcobj = funcobj;
    var size = this.rootNode.getContentSize();
    this.card = wl.create_soulcard(this.soul.getBaseId());
    this.card.setPosition(size.width / 2, size.height / 2);
    this.rootNode.addChild(this.card);
};

starupresult.prototype.onPressOK = function () {
    this.func.apply(this.funcobj);
};