wl.create_ui = function(obj){

    var img = "";

    switch(obj.getClass()){

        case "player":{
        }
        break;
        case "role":{
        }
        break;
        case "skill":
        case "buff":
        case "equipment":
        case "soul":{
            img = obj.getBase().icon;
        }
        break;
        case "traveller":{
            img = obj.getImg();
        }
        break;
        case "warrior":{
        }
        break;
        
    }
};