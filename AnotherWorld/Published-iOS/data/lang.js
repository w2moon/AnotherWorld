
(function(){
 if(USE_CCB){
    lang = function(s){
        return s;
    };
    return;
 }
var code = cc.Application.getInstance().getCurrentLanguage();
var name = "en";
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