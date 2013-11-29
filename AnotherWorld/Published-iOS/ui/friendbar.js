var bluebar = function(){};

bluebar.prototype.onDidLoadFromCCB = function(){
};

bluebar.prototype.onCreate = function (linker, blueid) {
    this.blueid = blueid;
    this.linker = linker;

    var base = equipmentbase[blueprint[blueid].equipid];
    wl.set_texture(this.icon, base.icon);
    this.lblstatus.setVisible(false);
    this.newmark.setVisible(false);
    this.name.setString(lang(base.name) + lang("TXT_BLUEPRINT"));

    if (base.skillid != 0) {
        var skillinfo = skillbase[base.skillid];
        wl.set_texture(this.skillicon, skillinfo.icon);
        this.lbldesc.setString(lang(skillinfo.description));
    }
    else {
        this.skillicon.setVisible(false);
        this.lbldesc.setString(lang(base.description));
    }
    var proicon = null;
    var maxpro = 0;
    if (base.MaxHP != 0) {
        proicon = "traveller/HP.png";
        maxpro = base.MaxHP;
    }
    if (base.Attack != 0) {
        proicon = "traveller/atk.png";
        maxpro = base.Attack;
    }
    if (base.Defense != 0) {
        proicon = "traveller/def.png";
        maxpro = base.Defense;
    }
    if (base.Heal != 0) {
        proicon = "traveller/rec.png";
        maxpro = base.Heal;
    }

    if (proicon == null) {
        this.proicon.setVisible(false);
        this.lblpro.setVisible(false);
    }
    else {
        wl.set_texture(this.proicon, proicon);
        this.lblpro.setString(maxpro);
    }
};

bluebar.prototype.onPressChoose = function (n) {
    this.linker.onChoosePluePrint(this.blueid,n);
};