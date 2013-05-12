
if (typeof wl.itemfactory !== 'object') {
    wl.itemfactory = {};
}

(function(){


wl.itemfactory.loaded = {}

wl.itemfactory.create = function(type){
	if(wl.itemfactory.loaded[type] == null)
		{
            require("objects/"+type+".js")
            wl.itemfactory.loaded[type] = true
		}
		wl.itemfactory.command = 'new '+type+'()'
		return eval(wl.itemfactory.command)
}

}());