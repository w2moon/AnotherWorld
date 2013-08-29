var equipbar = function(){};

equipbar.prototype.onDidLoadFromCCB = function(){
};



equipbar.prototype.onCreate = function(equip,isequiped,oldtraveller,traveller,slot){
    this.equip = equip;
    this.oldtraveller = oldtraveller;
    this.traveller = traveller;
    this.slot = slot;

    var base = this.equip.getBase();


   
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

    if(isequiped){
        this.lblstatus.setVisible(true);
        this.newmark.setVisible(false);
        this.bg.init("equip/bg_equipment_now.png");

        this.line = cc.Sprite.create("equip/line_select.png");
        this.line.setPosition(0,-this.bg.getContentSize().height/2+2);
        this.rootNode.addChild(this.line);

        this.btnputon.setVisible(false);
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

        this.btntakeoff.setVisible(false);
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

    
   
    
   // this.level.setString("LV"+this.equip.getLevel());
};

equipbar.prototype.onPressTakeOff = function(){
        switch(this.slot)
        {
        case EQUIP_SOUL:
            wl.popmsg(lang("MSG_CANNOT_TAKEOFF_SOUL"));
            return;
        break;
        case EQUIP_WEAPONR:
            this.traveller.dbobj.weaponrid = 0;
            this.traveller.dbobj.slot[EQUIP_WEAPONR] = 0;
        break;
        case EQUIP_WEAPONL:
            this.traveller.dbobj.weaponlid = 0;
            this.traveller.dbobj.slot[EQUIP_WEAPONL] = 0;
        break;
        case EQUIP_CLOTH:
            this.traveller.dbobj.clothid = 0;
            this.traveller.dbobj.slot[EQUIP_CLOTH] =0;
        break;
        case EQUIP_TRINKET:
            this.traveller.dbobj.trinketid = 0;
            this.traveller.dbobj.slot[EQUIP_TRINKET] = 0;
        break;
        }

    wl.run_scene("mainscene",this.traveller);
};

equipbar.prototype.onPressPutOn = function(){
    switch(this.slot)
        {
        case EQUIP_SOUL:
            wl.popmsg(lang("MSG_CANNOT_TAKEOFF_SOUL"));
        break;
        case EQUIP_WEAPONR:
            this.traveller.dbobj.weaponrid = this.equip.getId();
            this.traveller.dbobj.slot[EQUIP_WEAPONR] = this.equip.getId();
        break;
        case EQUIP_WEAPONL:
            this.traveller.dbobj.weaponlid = this.equip.getId();
            this.traveller.dbobj.slot[EQUIP_WEAPONL] = this.equip.getId();
        break;
        case EQUIP_CLOTH:
            this.traveller.dbobj.clothid = this.equip.getId();
            this.traveller.dbobj.slot[EQUIP_CLOTH] = this.equip.getId();
        break;
        case EQUIP_TRINKET:
            this.traveller.dbobj.trinketid = this.equip.getId();
            this.traveller.dbobj.slot[EQUIP_TRINKET] = this.equip.getId();
        break;
        }

    wl.run_scene("mainscene",this.traveller);
};