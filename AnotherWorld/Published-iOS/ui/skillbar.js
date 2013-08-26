var skillbar = function(){};

skillbar.prototype.onDidLoadFromCCB = function(){
};

skillbar.prototype.getEquipIcon = function(){
        switch(this.from)
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

skillbar.prototype.onCreate = function(skill){
    this.skill = skillbase[skill[0]];
    this.from = skill[2];
    this.skilllevel = skill[1];

    this.img = cc.Sprite.create(this.skill.icon);
    this.img.setPosition(this.icon.getContentSize().width/2,this.icon.getContentSize().height/2);
    this.icon.addChild(this.img);

    this.equip = cc.Sprite.create(this.getEquipIcon());
    this.equip_icon.setVisible(false);

    this.equip.setPosition(this.equip_icon.getPosition());
    this.rootNode.addChild(this.equip)

    this.lblname.setString(this.skill.name);
   
    this.desc.setString(this.skill.description);
    this.level.setString("LV"+this.skilllevel);
};