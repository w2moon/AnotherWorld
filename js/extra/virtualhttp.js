
if (typeof wl.virtualhttp_create !== 'object') {
    wl.virtualhttp_create = function(){
    //need reponse in next frame
        return cc.HttpClient.getInstance()
    }
}