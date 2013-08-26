var equipbar = function(){};

equipbar.prototype.onDidLoadFromCCB = function(){
};

equipbar.prototype.getProIcon = function(){
        switch(this.equip)
        {
        case EQUIP_WEAPONR:
            return "traveller/eq_equipment_skill.png";
        break;
        case EQUIP_WEAPONL:
            return "traveller/eq_equipment_skill.png";
        break;
        case EQUIP_CLOTH:
            return "traveller/eq_body_skill.png";
        break;
        case EQUIP_TRINKET:
            return "traveller/eq_flower_skill.png";
        break;
        case EQUIP_SOUL:
            return "traveller/eq_head_skill.png";
        break;
        case EQUIP_SKILL1:
            return "traveller/eq_head_skill.png";
        break;
        case EQUIP_SKILL2:
            return "traveller/eq_head_skill.png";
        break;
        }
    },

equipbar.prototype.onCreate = function(equip){
    this.equip = equip;
    cc.log("addequp")
    var base = this.equip.getBase();


   /*
    this.icon.init(base.icon);

    this.name.setString(lang(base.name));

    if(equip.hasSkill()){
        var skillinfo = skillbase[equip.getSkillId()];
        this.skillicon.init(skillinfo.icon);
        this.lbldesc.setString(lang(skillinfo.description));
    }
    else{
        this.skillicon.setVisible(false);
        this.lbldesc.setString(lang(base.description));
    }

    if(wl.gvars.role.isEquiped(equip.getId())){
        this.lblstatus.setVisible(true);
        this.newmark.setVisible(false);
        this.bg.init("equip/bg_equipment_now.png");

        this.line = cc.Sprite.create("equip/line_select.png");
        this.line.setPosition(this.bg.getContentSize().width/2,this.bg.getContentSize().height/2);
        this.rootNode.addChild(this.line);
    }
    else{
        this.lblstatus.setVisible(false);
        if(this.equip.isNew()){
            this.equip.notNew();
            this.newmark.setVisible(true);
        }
        else{
            this.newmark.setVisible(false);
        }
    }

    var proicon = null;
    var maxpro = 0;
    if(base.MaxHP != 0)
    {
        proicon = "traveller/HP.png";
        maxpro = base.MaxHP;
    }
    if(base.Attack != 0)
    {
        proicon = "traveller/atk.png";
        maxpro = base.Attack;
    }
    if(base.Defense != 0)
    {
        proicon = "traveller/def.png";
        maxpro = base.Defense;
    }
    if(base.Heal != 0)
    {
        proicon = "traveller/rec.png";
        maxpro = base.Heal;
    }

    if(proicon == null){
        this.proicon.setVisible(false);
        this.lblpro.setVisible(false);
    }
    else{
        this.proicon.init(proicon);
        this.lblpro.setString(maxpro);
    }

    
   */
    
   // this.level.setString("LV"+this.equip.getLevel());
};

equipbar.prototype.onPressTakeOff = function(){
};

equipbar.prototype.onPressPutOn = function(){
};