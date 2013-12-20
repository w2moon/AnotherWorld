var applicantbar = function(){};

applicantbar.prototype.onDidLoadFromCCB = function () {
};

applicantbar.prototype.onCreate = function (friend, obj, approvefunc, refusefunc) {
    this.friend = friend;
    this.obj = obj;
    this.approvefunc = approvefunc;
    this.refusefunc = refusefunc;

    this.lblname.setString(this.friend.getName());
    this.lbllevel.setString(lang("TXT_LEVEL") + this.friend.getLevel());
    this.lblvalue.setString(lang("TXT_VALUE") + this.friend.getValue());


};

applicantbar.prototype.onPressApprove = function (n) {
    this.approvefunc.apply(this.obj, [this.friend]);
};

applicantbar.prototype.onPressRefuse = function (n) {
    this.refusefunc.apply(this.obj, [this.friend]);
};