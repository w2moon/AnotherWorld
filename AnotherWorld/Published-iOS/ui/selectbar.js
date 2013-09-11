var selectbar = function(){};

selectbar.prototype.onDidLoadFromCCB = function(){
};

selectbar.prototype.onCreate = function(icon,func,data){
    this.icon = cc.Sprite.create(icon);
    this.func = func;
    this.data = data;
    this.rootNode.addChild(this.icon);
};

selectbar.prototype.onSelect = function(n){
    this.func(this.data,n);
};