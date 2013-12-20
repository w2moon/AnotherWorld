var friendbar = function(){};

friendbar.prototype.onDidLoadFromCCB = function () {
};

friendbar.prototype.onCreate = function (friend, obj, objfunc) {
    this.friend = friend;
    this.obj = obj;
    this.objfunc = objfunc;

    this.lblname.setString(this.friend.getName());
    this.lbllevel.setString(lang("TXT_LEVEL") + this.friend.getLevel());
    this.lblvalue.setString(lang("TXT_VALUE") + this.friend.getValue());

    this.btndelete.setVisible(false);

    var now = new Date();
    if (wl.day_distance(this.friend.getLastEnterTime(), now / 1000) == 0) {
        this.mask.setVisible(true);
    }
    else {
        this.mask.setVisible(false);
    }
};

friendbar.prototype.onPressDelete = function (n) {
    this.objfunc.apply(this.obj,[this.friend]);
};