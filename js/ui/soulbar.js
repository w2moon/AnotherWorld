var soulbar = function(){};

soulbar.prototype.onDidLoadFromCCB = function(){
};


soulbar.prototype.onCreate = function(soul,obj,func){
    this.soul = soul;
    this.obj = obj;
    this.func = func;
    
    this.lblname.setString(lang(this.soul.getBase().name));
    this.lbldesc.setString(lang(this.soul.getBase().desc));
    this.lbllevel.setString("LV"+this.soul.getLevel());
    this.lblhp.setString(this.soul.getProperty("MaxHP"));
    this.lblatk.setString(this.soul.getProperty("Attack"));
    this.lbldef.setString(this.soul.getProperty("Defense"));
    this.lblheal.setString(this.soul.getProperty("Heal"));
                            
    if((obj.fathercard != null && obj.fathercard.soulid == soul.getId())
       || (obj.mothercard !=null && obj.mothercard.soulid == soul.getId()))
                           {
                           
                           }
                           else{
    this.mask.setVisible(false);
                           }
    this.spnew.setVisible(false);
    wl.set_texture(this.spskill,this.soul.getBase().icon);
    
   };

soulbar.prototype.onPressSelect = function(){
    this.func.apply(this.obj,[this.soul.getId(),this]);
    
    if((this.obj.fathercard != null && this.obj.fathercard.soulid == this.soul.getId())
       || (this.obj.mothercard !=null && this.obj.mothercard.soulid == this.soul.getId()))
    {
        this.mask.setVisible(true);
        this.lblselect.setString(lang("TXT_SELECT"));
    }
    else
    {
        this.lblselect.setString(lang("TXT_CANCEL"));
        this.mask.setVisible(false);
    }
    
    
    
}

soulbar.prototype.onPressIcon= function(){
}