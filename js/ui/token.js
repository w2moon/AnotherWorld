

wl.create_uitoken = function(){
         var layer = cc.Layer.create();

         layer.addBodyImage = function(img){
            if(img == ""){
                return;
            }
            this.bodyimage = cc.Sprite.create(img);
            this.addChild(this.bodyimage);
         };
         layer.addBodyParticle = function(particle){
            if(particle == ""){
                return;
            }
            this.bodyparticle = cc.ParticleSystem.create(particle);
            this.addChild(this.bodyparticle);
         };
         layer.setExplodeParticle = function(particle){
            this.explodeParticle = particle;
         };
         layer.explode = function(obj,pos){
            if(this.bodyimage != null){
                this.removeChild(this.bodyimage,true);
            }
            if(this.bodyparticle != null){
                this.removeChild(this.bodyparticle,true);
            }
            if(this.explodeParticle != ""){
                var particle = cc.ParticleSystem.create(this.explodeParticle);
                particle.setPosition(pos.x,pos.y);
			    particle.setAutoRemoveOnFinish(true);
                obj.addChild(particle);
            }

            this.removeFromParentAndCleanup(true);
         };
         layer.hide = function(){
            this.setVisible(false);
         };
         layer.show = function(){
            this.setVisible(true);
         };
         layer.moveTo = function(pos){
            this.runAction(cc.MoveTo.create(0.4,pos))
         };
        
         return layer;
}