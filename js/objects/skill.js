
wl.skill = function(id){
    this.id = id
    this.getName = function(){
        cc.log("skill"+skillbase[id].name)
    }

    this.getIcon = function(){
        return skillbase[id].icon
    }
}