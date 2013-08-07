var mainmap = function(){};

mainmap.prototype.onDidLoadFromCCB = function(){
    this.submapid = 1
};

mainmap.prototype.onPressSubmap = function(n){
	
    this.rootNode.getParent().controller.onPressSubmap(n.getTag())
    
};