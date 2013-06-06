

wl.create_travellercreate = function(){
    var scene = cc.Scene.create();

    wl.copyfunc(travellercreate.prototype,scene);
    scene.capture_image();
   
    return scene;
};

var travellercreate = function(){};

travellercreate.prototype.onDidLoadFromCCB = function(){
};

travellercreate.prototype.capture_image = function(){
    var imagepicker = cc.ImagePicker.getInstance();
    
    imagepicker.useCamera(this,this.on_capture_image,DEFAULT_HEAD_WIDTH,DEFAULT_HEAD_HEIGHT,true);
};

travellercreate.prototype.on_capture_image = function(pickdata){
     cc.log("width:"+pickdata.getWidth())
        cc.log("height:"+pickdata.getHeight())

        var base64data = pickdata.toBase64();

        cc.log("data:"+base64data.length)
        cc.log("datazip:"+base64data)

        

        var img = new cc.Image()
        img.initWithBase64(base64data,pickdata.getWidth(),pickdata.getHeight())

        var t2d = cc.Texture2D.create()
        t2d.initWithImage(img)
        var spr = cc.Sprite.createWithTexture(t2d)

        this.addChild(spr);
        spr.setPosition(cc.p(160,240));

        this.traveller_create(base64data);
};

travellercreate.prototype.traveller_create = function(img){
     var msg = wl.msg.create("traveller_create");
     msg.img = img;
     wl.http.send(msg,this.on_traveller_create,this);

};

travellercreate.prototype.on_traveller_create = function(ret){
    if(ret.rc != retcode.OK ){
        cc.log("on_traveller_create failed");
        return;
    }
    cc.log("on_traveller_create ok");
};