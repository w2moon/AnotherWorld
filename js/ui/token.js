(function(){

var bezierat = function( a,b,c,d,t )
{
    return (Math.pow(1-t,3) * a + 
            3*t*(Math.pow(1-t,2))*b + 
            3*Math.pow(t,2)*(1-t)*c +
            Math.pow(t,3)*d );
};

uitoken_proto = {
        addBodyImage : function(img){
            if(wl.isNoneString(img)){
                return;
            }
            this.bodyimage = cc.Sprite.create(img);
            this.addChild(this.bodyimage);
         },
         addBodyParticle : function(particle){
            if(wl.isNoneString(particle)){
                return;
            }
            this.bodyparticle = cc.ParticleSystem.create(particle);
            this.bodyparticle.setDuration(cc.PARTICLE_DURATION_INFINITY);
            this.bodyparticle.setPositionType(cc.PARTICLE_TYPE_RELATIVE);
            this.bodyparticle.setPosition(0,0);
            this.addChild(this.bodyparticle);
         },
         setExplodeParticle : function(particle){
            this.explodeParticle = particle;
         },
         explode : function(obj,pos){
            if(this.bodyimage != null){
                this.removeChild(this.bodyimage,true);
                this.bodyimage = null;
            }
            if(this.bodyparticle != null){
                this.removeChild(this.bodyparticle,true);
                this.bodyparticle = null;
            }
            if(!wl.isNoneString(this.explodeParticle)){
                var particle = cc.ParticleSystem.create(this.explodeParticle);
                particle.setPosition(pos);
			    particle.setAutoRemoveOnFinish(true);
                obj.addChild(particle);
            }

            this.getParent().removeChild(this,true);

         },
         hide : function(){
            this.setVisible(false);
         },
         show : function(){
            this.setVisible(true);
         },
         moveTo : function(dt,pos,needrotate){
            if(needrotate){
                var src = this.getPosition();
                this.setRotation(wl.getRotation(src,pos));
            }
            this.runAction(cc.MoveTo.create(dt,pos));
            
         },
         curveUpdate : function(dt){
            if(this.elapsed > this.bezierduration){
                this.unschedule();
            }
            this.elapsed += dt;
            var percent = this.elapsed/this.bezierduration;


            var xa = 0;
            var xb = this.beziercp1.x;
            var xc = this.beziercp2.x;
            var xd = this.bezierdst.x;

            var ya = 0;
            var yb = this.beziercp1.y;
            var yc = this.beziercp2.y;
            var yd = this.bezierdst.y;

            var x = bezierat(xa, xb, xc, xd, percent);
            var y = bezierat(ya, yb, yc, yd, percent);

            var currentPos = this.getPosition();
            var diff = wl.ccpSub(currentPos, this.bezierpre);
            this.beziersrc = wl.ccpAdd( this.beziersrc, diff);

            var newPos = wl.ccpAdd( this.beziersrc, cc.p(x,y));
            this.setPosition(newPos);

             if(this.needrotate){
                this.setRotation(wl.getRotation(this.bezierpre,newPos));
            }

            this.bezierpre = newPos;

           
            
         },
         curveTo : function(dt,pos,cpos1,cpos2,needrotate){
            this.bezierduration = dt;
            this.beziersrc = this.getPosition();
            this.bezierdst = wl.ccpSub(pos,this.beziersrc);
            this.beziercp1 = wl.ccpSub(cpos1,this.beziersrc);
            this.beziercp2 = wl.ccpSub(cpos2,this.beziersrc);
            this.needrotate = needrotate;
            this.elapsed = 0;
            this.bezierpre = this.getPosition();

            this.schedule(this.curveUpdate);
         }
};

wl.create_uitoken = function(){
         var layer = cc.Layer.create();
         layer.setAnchorPoint(cc.p(0,0))
         wl.copyfunc(uitoken_proto,layer);
        
         return layer;
}

}());