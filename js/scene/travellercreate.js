

wl.create_travellercreate = function(){
    var scene = cc.Scene.create();

    wl.copyfunc(travellercreate.prototype,scene);
    scene.capture_image();
   
    return scene;
};

var travellercreate = function(){};

travellercreate.prototype.onDidLoadFromCCB = function(){
    this.captured = false;
    this.ishuman = 0;
    this.img = "";
};

travellercreate.prototype.onPressPhoto = function(){
    if(USE_CCB){
        return;
    }
    var imagepicker = cc.ImagePicker.getInstance();
    
    imagepicker.useCamera(this,this.on_capture_image,DEFAULT_HEAD_WIDTH,DEFAULT_HEAD_HEIGHT,true);
};

travellercreate.prototype.onPressLib = function(){
    if(USE_CCB){
        return;
    }
    var imagepicker = cc.ImagePicker.getInstance();
    
    imagepicker.usePhotoLibrary(this,this.on_capture_image,DEFAULT_HEAD_WIDTH,DEFAULT_HEAD_HEIGHT,true);
};

travellercreate.prototype.onPressNext = function(){
    if(USE_CCB || this.captured)
    {
       // wl.run_scene("travellername") 
       this.traveller_create();
    }
};

travellercreate.prototype.on_capture_image = function(pickdata){
     cc.log("width:"+pickdata.getWidth())
    this.captured = true;
        cc.log("height:"+pickdata.getHeight())

        var base64data = pickdata.toBase64();

      
        

        var img = new cc.Image()
        img.initWithBase64(base64data,pickdata.getWidth(),pickdata.getHeight())

        var mask = new cc.Image()
        mask.initWithImageFile(HEAD_MASK,1)
        var t2d = cc.Texture2D.create()
        t2d.initWithImage(img.mask(mask))
    
        this.photo_box.initWithTexture(t2d)
        //var spr = cc.Sprite.createWithTexture(t2d)

       // this.addChild(spr);
      //  spr.setPosition(cc.p(160,240));

      var arr = img.parse("haarcascades/haarcascade_frontalface_alt.xml",1);
       if(arr.length != 0){
            this.ishuman = 1;
      }

   this.img = base64data;
        //this.traveller_create(base64data);
    
};

travellercreate.prototype.traveller_create = function(){
    cc.log("ishuman:"+this.ishuman);

     var msg = wl.msg.create("traveller_create");
     msg.name = "name";//to do
     msg.img = this.img;
     msg.gender = 0;
     msg.age = 0;
     msg.ishuman = this.ishuman;
     wl.http.send(msg,this.on_traveller_create,this);

};

travellercreate.prototype.on_traveller_create = function(ret){
    if(ret.rc != retcode.OK ){
        cc.log("on_traveller_create failed:"+ret.rc);
        return;
    }
    cc.log("on_traveller_create ok");
    wl.gvars.role.addTraveller(ret.traveller);
    if(ret.soul != null){
        wl.gvars.role.addSoul(ret.soul);
    }
    
    if(ret.equips != null){
    for(var k in ret.equips){
        wl.gvars.role.addEquip(ret.equips[k])
    }
    }

    wl.run_scene("travellername");
};
