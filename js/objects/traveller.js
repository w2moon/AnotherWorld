

var traveller = function(){
    this.init = function(cfg){
        //traveller.prototype.init.apply(this,[baseid])
        this.cfg = cfg
        this.hp = cfg.hp
        this.speed = cfg.speed
    }

    this.isDead = function(){
        return this.getHP() <= 0;
    }
    this.getName = function(){
        cc.log("soul"+this.getBase())
    }

    this.getHP = function(){
        return this.hp;
    }
    this.setHP = function(hp){
        if(hp<0){
            hp = 0;
        }
        this.hp = hp;
    }

    this.getSpeed = function(){
        return this.speed
    }

    this.getAttack = function(){
        return this.cfg.attack;
    }

    this.getDefense = function(){
        return this.cfg.defense;
    }

    this.getImg = function(){
        return this.cfg.img
    }
}
wl.extend(traveller,item)