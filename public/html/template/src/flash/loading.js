import flexpos from "vendor/createjs/flexpos";
var _self;
var libs=this;
function construct(display){
	_self=display;
	_self.progress = progress;
	_self.notify = notify;
    _self.regY=800;
    flexpos.addDisplay(_self,{perTop:50})
    console.log('_self',_self)
}
function progress(per,page){
    if(page=='game'){
        vueApp.Toast.loading({
            duration:per>=100?200:0,
            forbidClick:false,
            message:`当前资源加载进度${per}%...`
        })
    }
}
function notify(){
    return new Promise((resove,reject)=>{
        setTimeout(()=>{
            resove()
        },10)
    })
}
module.exports.construct=construct;