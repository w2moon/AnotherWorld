var selectbar = function(){};

selectbar.prototype.onDidLoadFromCCB = function(){
};

selectbar.prototype.onCreate = function (equip, obj, func) {

    this.obj = obj;
    this.func = func;
    this.equip = equip;

    var base = equip.getBase();
    wl.set_texture(this.icon, base.icon);

    this.name.setString(lang(base.name));

    if (equip.hasSkill()) {
        var skillinfo = skillbase[equip.getSkillId()];
        wl.set_texture(this.skillicon, skillinfo.icon);
        this.lbldesc.setString(lang(skillinfo.description));
    }
    else {
        this.skillicon.setVisible(false);
        this.lbldesc.setString(lang(base.description));
    }

    if (equip.isEquiped()) {
        this.lblstatus.setVisible(true);
        this.newmark.setVisible(false);

    }
    else {
        this.lblstatus.setVisible(false);
        if (this.equip.isNew()) {
            this.newmark.setVisible(true);
        }
        else {
            this.newmark.setVisible(false);
        }

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

    this.invalidmask.setVisible(false);

    if (this.obj.canBeSelect(this.equip.getId())) {
        this.check.setVisible(false);
    }
    else {
        this.check.setVisible(true);
        
    }


    this.mask.setVisible(false);
};

selectbar.prototype.onSelect = function (n) {
    if (this.obj.canBeSelect(this.equip.getId())) {
        this.check.setVisible(true);
    }
    else {
        this.check.setVisible(false);
    }
    this.func.apply(this.obj, [this.equip.getId(), n]);
    
};