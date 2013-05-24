var bufftype = {
    negative:0,
    positive:1
};

var buffbase = [
    {id:1,name:"buff1",duration:5,interval:-1,type:bufftype.negative,icon:"soul.png",multiple:0,stack:1,startlogic:"decAttack",startvalue:5,startaction:"",startparticle:"",intervallogic:"",intervalvalue:0,intervalaction:"",intervalparticle:"",endlogic:"incAttack",endvalue:5,endaction:"",endparticle:"",compose:"1,2"},
    {id:2,name:"buff2",duration:-1,interval:2,type:bufftype.positive,icon:"soul.png",multiple:1,stack:5,startlogic:"",startvalue:0,startaction:"",startparticle:"",intervallogic:"incHP",intervalvalue:10,intervalaction:"",intervalparticle:"",endlogic:"",endvalue:0,endaction:"",endparticle:"",compose:"1,2"},

];