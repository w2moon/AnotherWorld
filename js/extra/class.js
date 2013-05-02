wl.extend = function(c,parent){
			c.prototype = parent
}
/*
example:
var base = function(n){
    base.init.apply(this,n)
}

base.init = function(n){
        this.bn = n
}

var animal = function(n){ 
    animal.init.apply(this,n)
}
animal.init = function(n){
   base.prototype.init.apply(this,n)
   this.an = n
}
wl.extend(animal,base)
*/
