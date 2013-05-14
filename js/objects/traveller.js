

var traveller = function(){
    this.init = function(player,cfg){
        //traveller.prototype.init.apply(this,[baseid])
        this.owner = player
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

    this.getOwner = function(){
        return this.owner;
    }
    this.getTargetType = function(){
        return this.cfg.targettype;
    }
     this.getTargetNum = function(){
        return this.cfg.targetnum;
    }
     this.getNature = function(){
        return this.cfg.nature;
    }

    this.getMaxHP = function(){
        return this.cfg.hp
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

    this.defense = function(){
        this.card.defense()
    }

    this.attack = function(targets){
        this.card.attack()

        for(var k in targets){
            var damage = this.getAttack() - targets[k].getDefense()
            targets[k].setHP(targets[k].getHP()-damage)
            targets[k].card.setPercent(targets[k].getHP()/targets[k].getMaxHP())
            targets[k].defense()
            if(targets[k].getHP()<=0){
                targets[k].card.dead()
            }
        }

        return false
    }
}
wl.extend(traveller,item)