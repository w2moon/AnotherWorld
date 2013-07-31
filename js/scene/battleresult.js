 var battleresult = function(){}
battleresult.prototype.onDidLoadFromCCB = function()
{
};


battleresult.prototype.onCreate = function(result,info)
{
    if(!result){
    //fail
        return;
    }

    //success
    var rewards = wl.parse_skill_params(info.reward);
    var filtered = wl.filter_rate(rewards);

    var obj,ui
    for(var k in filtered){
        obj = wl.gvars.role[filtered[k][1]].apply(wl.gvars.role,filtered[k].slice(2));
        if(obj != null){
            ui = wl.create_ui(obj);
            this.rootNode.addChild(ui);
        }
    }
};