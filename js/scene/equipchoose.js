
var equipchoose = function(){};

equipchoose.prototype.onDidLoadFromCCB = function(){
};


equipchoose.prototype.onCreate = function(slot,oldtraveller,traveller){
    this.slot = slot;
    this.oldtraveller = oldtraveller;
    this.traveller = traveller;

    this.showPage(this.slot);
};

equipchoose.prototype.onPressBack = function(){
};

equipchoose.prototype.onPressOrder = function(){
};

equipchoose.prototype.onPressTag = function(n){
    this.showPage(n.getTag());
};

equipchoose.prototype.showPage = function(type){
    this["btn"+type].selected();
    if(type == EQUIP_SOUL){
    }
    else{
    }
};

var equipbar = function(){};

equipbar.prototype.onDidLoadFromCCB = function(){
};


equipbar.prototype.onCreate = function(equip){
    this.equip = equip;
    
};

equipbar.prototype.onPressTakeOff = function(){
};

equipbar.prototype.onPressPutOn = function(){
};
