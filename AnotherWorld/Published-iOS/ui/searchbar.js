var searchbar = function(){};

searchbar.prototype.onDidLoadFromCCB = function () {
};

searchbar.prototype.onCreate = function (obj, objfunc) {
    this.obj = obj;
    this.objfunc = objfunc;

    this.lblid.setString(lang("TXT_YOUR_ID"+wl.gvars.role.getId()));

};

searchbar.prototype.onPressSearch = function (n) {
    this.objfunc.apply(this.obj);
};