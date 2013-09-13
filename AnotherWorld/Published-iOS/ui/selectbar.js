var selectbar = function(){};

selectbar.prototype.onDidLoadFromCCB = function(){
};

selectbar.prototype.onCreate = function(icon,obj,func,data){
    this.icon = cc.Sprite.create(icon);
    this.obj = obj;
    this.func = func;
    this.data = data;
    this.rootNode.addChild(this.icon);
};

selectbar.prototype.onSelect = function(n){
    this.func.apply(this.obj,[this.data,n]);
};