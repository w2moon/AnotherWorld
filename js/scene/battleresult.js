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
              var x = 0;
              var y = 0;
              var reward = wl.load_scene("rewardslot",filtered[k][1],filtered[k][2]);
              reward.setPosition(cc.p(x,y));
              this.lootpanel.addChild(reward);

              x = x + reward.controller.bg.getContentSize().width;
              
        }
    }
};