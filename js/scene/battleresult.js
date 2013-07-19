 var battleresult = function(){}
battleresult.prototype.onDidLoadFromCCB = function()
{
};


battleresult.prototype.init = function(result,info)
{
    if(!result){
    //fail
        return;
    }

    //success
    var rewards = wl.parse_reward(info.reward);
    var filtered = wl.filter_rate(rewards);

    var obj,ui
    for(var k in filtered){
        obj = wl.gvars.role[filtered[k][1]].apply(wl.gvars.role,filtered[k][2]);
        if(obj != null){
            ui = wl.create_ui(obj);
            this.rootNode.addChild(ui);
        }
    }
};