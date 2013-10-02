
(function(){
 /*
 if(USE_CCB){
    lang = function(s){
        return s;
    };
    return;
 }*/
var code = "cn";
 if(!USE_CCB){
    code = cc.Application.getInstance().getCurrentLanguage();
 }
var name = "cn";
switch(code)
{
case cc.LANGUAGE_ENGLISH:
break;
case cc.LANGUAGE_CHINESE:
    name = "cn";
break;
}
lang = wl.csv_lang("localization_"+name+".csv");


}());