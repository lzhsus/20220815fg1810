var _self;
var libs=this;
import AppData from "../common/AppData";
function construct(display){
	_self=display;
    _self.addEventListener("added",addStageHandler);
	console.log('_self',_self)
	_self.ruleMC.addEventListener("click",ruleMC)
	_self.giftMC.addEventListener("click",giftMC)
	// _self.rangMC.addEventListener("click",rangMC)
	_self.startMC.addEventListener("click",startMC)
	_self.invMC.addEventListener("click",invMC)
	_self.gitBoxMC.addEventListener("click",gitBoxMC);
	_self.musicIcon.addEventListener("click",musicIcon);
	_self.orderCarBtn.addEventListener("click",orderCarBtn);

	vueApp.globalDispatcher.$on("musicPlay",musicPlayFunc);
	vueApp.globalDispatcher.$on("updataServerData",updataServerData);
}

function musicPlayFunc(obj){
    // alert('config'+JSON.stringify(obj))
    if(!obj.status){
        _self.musicIcon.gotoAndStop(1)
    }else{
        _self.musicIcon.gotoAndStop(0)
    }
}

function addStageHandler(e){
    _self.addEventListener("tick",init);
	_self.invNum.txt.orgX = _self.invNum.txt.x;
	_self.invNum.num000.visible = false;
	_self.invNum.txt.x = _self.invNum.txt.orgX + 22;

	_self.gitBoxMC.num000.visible = false;
	_self.gitBoxMC.num000.orgX = _self.gitBoxMC.num000.x;
	_self.gitBoxMC.num001.orgX = _self.gitBoxMC.num001.x;
	_self.gitBoxMC.num001.x = 94;
}

function musicIcon(){
	AppData.musicStatus = !AppData.musicStatus;
	vueApp.globalDispatcher.$emit("musicPlay", { status: AppData.musicStatus });
}
function init(e){
	_self.btnMC.gotoAndStop(1)
    if(_self.currentFrame==_self.totalFrames-1){
        _self.removeEventListener("tick",init);
		vueApp.globalDispatcher.$emit("indexLoadingEnd");
    }
}
// 更新数据
function updataServerData(data={}){
	// 剩余游戏次数
	if(data.playCount>=0){
		var count = data.playCount>=100?99:data.playCount;
		var str = getLength((count + '')||0,2);
		let isVisible=true;
		var tempX = 0;
		for(let i=0;i<str.length;i++){
			_self.invNum['num00'+i].visible = true;
			if(str[i]==0&&isVisible&&str.length-1!=i){
				tempX+=22;
				_self.invNum['num00'+i].visible=false;
			}else{
				isVisible=false;
			}
			_self.invNum['num00'+i].gotoAndStop(str[i])
		}
		console.log('tempX',tempX)
		_self.invNum.txt.x = _self.invNum.txt.orgX + tempX;
	}
	// 剩余抽奖次数
	if(data.lotteryCount>=0){
		if(data.lotteryCount>=10){
			var count = data.lotteryCount>=100?99:data.lotteryCount;
			var str = getLength((count + '')||0,2);
			for(let i=0;i<str.length;i++){
				_self.gitBoxMC['num00'+i].visible = true;
				_self.gitBoxMC['num00'+i].gotoAndStop(str[i]||0)
			}
			_self.gitBoxMC.num000.x = _self.gitBoxMC.num000.orgX;
			_self.gitBoxMC.num001.x = _self.gitBoxMC.num001.orgX;
		}else{
			_self.gitBoxMC.num000.visible = false;
			_self.gitBoxMC.num001.gotoAndStop(data.lotteryCount||0)
			_self.gitBoxMC.num001.x = 94;
		}
	}
	// 是否领取过通行证
	if(data.isGetCard==1){
		_self.btnMC.gotoAndStop(1)
	}else{
		_self.btnMC.gotoAndStop(0)
	}
}
function musicIcon(){
	AppData.musicStatus = !AppData.musicStatus;
	vueApp.globalDispatcher.$emit("musicPlay", { status: AppData.musicStatus });
}
function ruleMC(){
	vueApp.globalDispatcher.$emit("ruleMC");
}
function giftMC(){
	vueApp.globalDispatcher.$emit("giftMC");
}
function rangMC(){
	vueApp.globalDispatcher.$emit("rangMC");
}
function startMC(){
	vueApp.globalDispatcher.$emit("startMC");
}
function invMC(){
	vueApp.globalDispatcher.$emit("invMC");
}
function gitBoxMC(){
	vueApp.globalDispatcher.$emit("gitBoxMC");
}
function orderCarBtn(){
	vueApp.globalDispatcher.$emit("orderCarBtn");
}
function getLength(str,len){
    let arr = (str+'').split('');
    let _list = []
    for(let i=0;i<len-arr.length;i++){
        _list.push("0")
    }
    return [].concat(_list,arr).join('')
}
module.exports.construct=construct;