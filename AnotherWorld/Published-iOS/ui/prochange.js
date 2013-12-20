var prochange = function () { };

prochange.prototype.onDidLoadFromCCB = function () {




};

prochange.prototype.onCreate = function (orig, cur) {


    this.lblhp.setString(orig[4] + "->" + cur[4]);
    this.lblatk.setString(orig[1] + "->" + cur[1]);
    this.lbldef.setString(orig[2] + "->" + cur[2]);
    this.lblheal.setString(orig[3] + "->" + cur[3]);

    this.lblname.setString("STAR:"+orig[0]);

    
};