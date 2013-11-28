 var equipmake = function(){}
 equipmake.prototype.onDidLoadFromCCB = function () {
     this.choosedid = null;

     var size = this.rootNode.getContentSize();
     var center = cc.p(size.width / 2, size.height * 42.3 / 100);

     var spr = cc.Sprite.create("equip/bg_equipment1.png");
     var con = spr.getContentSize();

     spr.setPosition(center);

     this.chooseLayer = cc.Layer.create();
     this.chooseLayer.addChild(spr);

     this.conheight = con.height;
     this.scroll = wl.scroll_layer(con.width, con.height);

     this.chooseLayer.addChild(this.scroll);



     var sl = cc.Sprite.create("equip/shou.png");
     sl.setPosition(cc.p(sl.getContentSize().width / 2 - 9, con.height - sl.getContentSize().height / 2 - 3));
     this.chooseLayer.addChild(sl);

     var sr = cc.Sprite.create("equip/shou.png");
     sr.setPosition(cc.p(con.width - sr.getContentSize().width / 2 + 9, con.height - sl.getContentSize().height / 2 - 3));
     sr.setFlipX(true);
     this.chooseLayer.addChild(sr);

     this.rootNode.addChild(this.chooseLayer, 1);

     this.lbltitle.setString(lang("TXT_MAKE_TITLE"));
     this.selecttype();

     this.orderby(ORDER_DEFAULT);

     this.animate();

     this.lblhas.setString(wl.gvars.role.getCopper());

     for (var i = 1; i <= 5; ++i) {
        
         var lbl = this["lbl" + i];
         var lblbg = this["sp" + i];
         lbl.setVisible(false);
         lblbg.setVisible(false);
     }
     this.lblcost.setString(0);
 };

 equipmake.prototype.animate = function () {
     var size = this.rootNode.getContentSize();
     this.chooseLayer.setPosition(cc.p(0, -size.height * 42.3 / 100));

     this.chooseLayer.runAction(cc.MoveTo.create(0.2, cc.p(0, 0)));
 };

var sort_blueprint_rarity = function(t1,t2){
    return  equipments[blueprint[t2.id].equipid].rarityclass<equipments[blueprint[t1.id].equipid].rarityclass;
   };

var sort_blueprint_canmake = function(t1,t2){
     var r1 = wl.gvars.role.canMakeBlueprint(t1.id);
     var r2 = wl.gvars.role.canMakeBlueprint(t2.id);
     if(r1==r2){
        return sort_blueprint_rarity(t1,t2);
     }
     else if(r1){
        return -1;
     }
     else if(r2){
        return 1;
     }
};

equipmake.prototype.onPressBack = function()
{
    wl.run_scene("mainscene");
};

equipmake.prototype.selecttype = function (type) {
    this.bluetype = type;
    var blueprints = wl.gvars.role.getBlueprints(type);
    for (var k in this.blueprints) {
        this.blueprints.removeFromParent();
    }
    this.blueprints = [];
    
    for (var k in blueprints) {
        var s = wl.load_scene("bluebar", this, blueprints[k]);
        s.id = blueprints[k];
        this.scroll.addChild(s);
        this.blueprints.push(s);

    }
};

equipmake.prototype.orderby = function (order, notanim) {
    this.curorder = order;
    switch (order) {
        case ORDER_DEFAULT:
            this.blueprints.sort(sort_blueprint_canmake);
            break;
        case ORDER_RARITY:
            this.blueprints.sort(sort_blueprint_rarity);
            break;

    }

    this.lbltitle.setString(lang("TXT_MAKE_CHOOSE"));
    wl.warn_obj(this.lbltitle);
    var x = this.rootNode.getContentSize().width / 2;
    var y = this.conheight - 77 / 2 - 10;
    for (var k in this.blueprints) {
        if (notanim) {
            this.blueprints[k].setPosition(x, y);
        }
        else {
            if (k % 2 == 0) {
                this.blueprints[k].setPosition(x + this.rootNode.getContentSize().width, y);
            }
            else {
                this.blueprints[k].setPosition(x - this.rootNode.getContentSize().width, y);
            }
            this.blueprints[k].runAction(cc.Sequence.create(cc.DelayTime.create(0.2), cc.EaseSineOut.create(cc.MoveTo.create(0.3, cc.p(x, y)))));
        }
        y -= 77;
    }
},

equipmake.prototype.onChoosePluePrint = function (blueid, selectednode) {
    if (this.selectednode != null) {
        this.selectednode.unselected();
        this.selectednode = null;
    }

    this.selectednode = selectednode;
    this.selectednode.selected();
    this.choosedid = blueid;

    this.chooseLayer.setVisible(false);

    var base = blueprint[blueid];

    this.lblcost.setString(base.copper);

    if (this.equip != null) {
        this.equip.removeFromChild();
    }
    this.equip = cc.Sprite.create(equipmentbase[base.equipid].icon);
    this.equip.setPosition(this.menu.convertToWorldSpace(this.btnoutput.getPosition()));
    this.rootNode.addChild(this.equip);
    // this.lblname.setString(lang(equipmentbase[base.equipid].name));
    this.lblcost.setString(base.copper);
    for (var i = 1; i <= 5; ++i) {
        var btn = this["btn" + i];
        if (btn.spr) {
            btn.spr.removeFromParent();
        }
        var lbl = this["lbl" + i];
        var lblbg = this["sp" + i];
        lbl.setVisible(false);
        lblbg.setVisible(false);
        if (base["mid" + i] == 0) {
            continue;
        }
        var mbase = material[base["mid" + i]];
        var mnum = base["mnum" + i];


        btn.spr = cc.Sprite.create(mbase.icon);
        btn.spr.setPosition(this.menu.convertToWorldSpace(btn.getPosition()));
        this.rootNode.addChild(btn.spr);

        this.updateNumber(i);


    }
};

equipmake.prototype.updateNumber = function (idx) {
    var base = blueprint[this.choosedid];
    var lbl = this["lbl" + idx];
        var lblbg = this["sp" + idx];
        lbl.setVisible(false);
        lblbg.setVisible(false);
        if (base["mid" + idx] == 0) {
            return;
        }
        var mbase = material[base["mid" + idx]];
        var mnum = base["mnum" + idx];

        lbl.setVisible(true);
        lblbg.setVisible(true);
        var cnum = wl.gvars.role.getMaterialNum(mbase.id);
        lbl.setString(cnum + "/" + mnum);
        if (cnum >= mnum) {
            //can
            lbl.setColor(cc.c4b(0, 125, 0, 255));

        }
        else {
            //not
            lbl.setColor(cc.c4b(255, 0, 0, 255));
        }
};

equipmake.prototype.onPressMake = function () {
    if (this.choosedid == null) {
        wl.popmsg(lang("MAKE_NEED_CHOOSE_BLUEPRINT"));
        return;
    }

    var base = blueprint[this.choosedid];
    if (wl.gvars.role.getCopper() < base.copper) {
        wl.popmsg(lang("MAKE_NOTENOUGH_COPPER"));
        return;
    }
    for (var i = 1; i <= 5; ++i) {
        if (base["mid" + i] == 0) {
            continue;
        }


        if (wl.gvars.role.getMaterialNum(base["mid" + i]) < base["mnum" + i]) {
            wl.popmsg(lang("MAKE_NOTENOUGH_MATERIAL"));
            return;
        }

    }
    this.menu.setEnabled(false);
    this.menutitle.setEnabled(false);
    var msg = wl.msg.create("equip_make");
    msg.blueprint = this.choosedid;
    wl.http.send(msg, this.on_equip_make, this);
};

equipmake.prototype.on_equip_make = function (ret) {
    if (ret.equip == null) {
        wl.popmsg(lang("MAKE_EQUIP_FAIL"));
        this.menu.setEnabled(true);
        this.menutitle.setEnabled(true);
        return;
    }

    var base = blueprint[this.choosedid];

    wl.gvars.role.subCopper(base.copper)

    for (var i = 1; i <= 5; ++i) {
        if (base["mid" + i] == 0) {
            continue;
        }
        wl.gvars.role.subMaterialNum(base["mid" + i], base["mnum" + i]);
        this.updateNumber(i);

    }
    wl.gvars.role.addEquip(ret.equip);
    this.lblhas.setString(wl.gvars.role.getCopper());
    this.equipresultui = wl.load_scene("equipmakeresult", ret.equip.id, this.onMakeFinish,this);
    this.rootNode.addChild(this.equipresultui);



};

equipmake.prototype.onPressOutput = function () {
};

equipmake.prototype.onPressMaterial = function () {
};

equipmake.prototype.onMakeFinish = function () {

    this.menu.setEnabled(true);
    this.menutitle.setEnabled(true);
    this.equipresultui.removeFromParent();
    this.equipresultui = null;
};