var bluebar = function(){};

bluebar.prototype.onDidLoadFromCCB = function(){
};

bluebar.prototype.onCreate = function(linker,blueid){
    this.blueid = blueid;
    this.linker = linker;

    this.icon = cc.Sprite.create(blueprint[blueid].icon);
    this.rootNode.addChild(this.icon);
};

bluebar.prototype.onChooseBlue = function(n){
    this.linker.onChoosePluePrint(this.blueid,n);
};