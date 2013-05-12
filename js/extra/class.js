
wl.extend = function(c,parent){
			c.prototype = parent
}

    wl.create = function (o) {  
         function F() {}  
         F.prototype = o;  
         return new F();  
     };  
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
