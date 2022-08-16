import AppData from "../common/AppData";
// var GlobalDispatcher=require("../vendor/createjs/global-dispatcher");
import createjs from "../vendor/createjs/createjs";

var _self;
var libs=this;
var updateFrameStep=8;//初始速度
var playGameStart=false;//游戏是否开始
var pressupShow = false;
var badgeIDs = [];
var badgeMcIndex = -1;
function construct(display){
    _self = display;
    _self.bgMC.addEventListener("mousedown",airplaneMouseDownHandler);//按下
    _self.bgMC.addEventListener("pressup",airplanePressUpHandler);//离开
    //按下
    _self.addEventListener("added",addStageHandler);
    // 倒计时结束开始游戏
    createjs.globalDispatcher.addEventListener('startPlayGame',res=>{
        _self.addEventListener("tick",startPlayGameTick);
    })
}	
function addStageHandler(e){
    _self.addEventListener("tick",init);
}
function init(){
    _self.removeEventListener("tick",init);

    var event = new createjs.Event('indexInit');
    createjs.globalDispatcher.dispatchEvent(event)
}
// 开始游戏
let updateFrameChange = false;
function startPlayGameTick(){
    playGameStart = true;
    if(AppData.time%10==0&&!updateFrameChange){
        updateFrameChange = true;
        updateFrameStep = updateFrameStep+0.5;
        setTimeout(res=>{
            updateFrameChange = false;
        },5000)
    }

    if(!pressupShow){
        _self.fjMC.y += 15;
    }else{
        _self.fjMC.y -= 13;
    }   
    ziMCMove()
    addCanvasBadge()
    if(_self.fjMC.y>AppData.stageRect.height){
        endPlayGameTick()
    }
}
let badges_num = 3
function addCanvasBadge(){
    setTimeout(async () => {
        if(badgeMcIndex==-1&&badgeIDs.length<badges_num){
            badgeMcIndex = await randomReturn();
        }
        if(playGameStart&&badgeIDs.length<badges_num){
            addCanvasBadge()
        }
    }, 1000);
}
function randomReturn(){
    return new Promise((resolve,reject)=>{
        returnNum(resolve)
    })
    function returnNum(resolve) {
        let random = ~~(Math.random()*badges_num);
        if(badgeIDs.indexOf(random)!=-1){
            returnNum(resolve)
        }else{
            resolve(random)
        }
    }
}
function badgeMCMoveTick(i){
    badgeIDs.push(i)
    badgeMcIndex = -1;
    _self['hzMC0'+i].show = true;
    _self['hzMC0'+i].x = 200*i+180
    _self['hzMC0'+i].y = AppData.stageRect.height-150;
}
// 完美
function perfectMove(){
    _self['perfectMC'].visible = true;
    _self['perfectMC'].gotoAndPlay(1);
    _self['perfectMC'].addEventListener("tick",perfectTickHandler);
}
function perfectTickHandler(){
	if(_self['perfectMC'].currentFrame==_self['perfectMC'].totalFrames-1){
        _self['perfectMC'].removeEventListener("tick",perfectTickHandler);
        _self['perfectMC'].visible = false;
	}
}
function ziMCMove(){
    for(let i=0;i<3;i++){
        let MC = _self['ziMC0'+i];
        MC.x -= updateFrameStep;
        if(badgeMcIndex>=0&&_self['hzMC0'+badgeMcIndex].mc==MC){
            _self['hzMC0'+badgeMcIndex].x = MC.x
            
            var dis=Math.sqrt(Math.pow(_self['hzMC0'+badgeMcIndex].x-_self['fjMC'].x,2)+Math.pow(_self['hzMC0'+badgeMcIndex].y-_self['fjMC'].y,2))
            // 获取绘制
            if(dis<110){
                perfectMove()
                badgeMCMoveTick(badgeMcIndex)
            }
        }
        if(MC.x < -130){
            MC.x = 930;
            // 离开屏幕
            if(badgeMcIndex>=0&&(_self['hzMC0'+badgeMcIndex].mc==MC)){
                badgeMcIndex = -1;
            }
            // 进入屏幕
            if(badgeMcIndex>=0&&!_self['hzMC0'+badgeMcIndex].mc){
                _self['hzMC0'+badgeMcIndex].mc = MC
                _self['hzMC0'+badgeMcIndex].x = MC.x
                _self['hzMC0'+badgeMcIndex].y = (Math.random()*100+50)+300+(Math.random()*50+50)
            }
        }
        // 检查碰撞
        for(let i=0;i<3;i++){
            let MC = _self['ziMC0'+i];
            
            let pzItem = MC['pzItem']||{}
            pzItem['left'] = MC.x+75*MC.scale
            pzItem['leftW2'] = pzItem['left'] + pzItem['w2'];
            // 到达接触点
            let resultStatus = true;
            if(Math.abs(MC.x-_self.fjMC.x)<=140){
                // console.log('进去区域')
                if(_self.fjMC.y-50<MC.y-900+390){
                    resultStatus = false
                }else if(_self.fjMC.y+50>MC.y){
                    resultStatus = false
                }else{
                    resultStatus = true
                }
            }

            if(!resultStatus){
                endPlayGameTick()
                break
            }
        }
    }
}
// 游戏结束
function endPlayGameTick(){
    if(!playGameStart) return
    playGameStart = false;
    _self.removeEventListener("tick",startPlayGameTick);

    var event = new createjs.Event('flashGameOverTick');
    createjs.globalDispatcher.dispatchEvent(event)
}
function airplaneMouseDownHandler(event){
    if(!event.primary) return;
    pressupShow = true;
}
function airplanePressUpHandler(event){
    if(!event.primary) return;
    pressupShow = false;
}
module.exports.construct=construct;