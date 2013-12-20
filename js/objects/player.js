

wl.player = function (role, battlefield) {
    this.role = role;
    this.battlefield = battlefield;

    this.energy = 0;

    this.warriors = [];
    var travellers = role.getSlotTravellers();
    for (var k in travellers) {
        if (travellers[k] != null) {
            this.warriors.push(new wl.warrior(this, battlefield, travellers[k]));
        }
        else {
            this.warriors.push(null)
        }
    }
};

wl.player.prototype = {
    getClass: function () { return "player"; },
    battle_init: function () {
        for (var k in this.warriors) {
            if (this.warriors[k] != null) {
                this.warriors[k].battle_init();
            }
        }
    },
    getEnergy: function () {
        return this.energy;
    },
    incEnergy: function (v) {
        this.energy += v;

        this.refreshSkillState();
    },
    decEnergy: function (v) {
        this.energy -= v;

        this.refreshSkillState();
    },
    refreshSkillState: function () {
        for (var k in this.warriors) {
            if (this.warriors[k] != null) {
                this.warriors[k].refreshSkillState();
            }
        }
    },
    isDead: function () {
        if (this.warriors[HERO_IDX] != null) {
            return this.warriors[HERO_IDX].isDead();
        }

        for (var k in this.warriors) {
            if (this.warriors[k] != null && !this.warriors[k].isDead()) {
                return false;
            }
        }
        return true;

    },
    getWarriors: function () {
        return this.warriors;
    }

};