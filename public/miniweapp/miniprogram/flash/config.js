import canvasAutoRotation from "../vendor/createjs/canvas_auto_rotation";
const res = require('../vendor/createjs/createjs-res');
import createjs from "../vendor/createjs/createjs.js";
import AppData from "../common/AppData";

var flashObj={
    loading: {name: 'loading'},
    bottomLayer: {name: "bg"},
    topLayer: {name: "nav"},
    middleLayer: {
        index:{name:"index"},
        magicgirl:{name:"magicgirl"}
    },
    asset: {},
    firstPage: 'index',
    firstload: ['index','magicgirl'],
    preload: [],
    preloadNum: 1,
  };
var flash;
var canvas;
var isInit=false;

function resize(){
    let stageRect = canvasAutoRotation.canvasResize(
        canvas
    );
    AppData.stageRect = stageRect
    // flexpos.displayResetPos(stageRect.width, stageRect.height);
}
function gotoPageHandler(e){
    var event = new createjs.Event('initCanvasImages');
    event.page = e.page;
    if(e&&e.questionDatas){
        event.questionDatas = e.questionDatas;
    }
    if(e&&e.picture){
        event.picture = e.picture
    }
    createjs.globalDispatcher.dispatchEvent(event);

    flash.goto(e.page).then(()=>{
        
    });
}
export const loadInit=function(firstPage,cb){
    flashObj['firstPage']=firstPage;
    flashObj['firstload']=[firstPage];
    flash = new res.Flash(createjs.canvas);
    flash.loadInit(flashObj)
    .then((lib) => {
        console.log('flash load init')
        cb&&cb()
    })
    isInit=true;
    console.log('---------------------')
    createjs.globalDispatcher.addEventListener('gotoPage',gotoPageHandler)
    canvasAutoRotation.setRootDisplay(flash.getRootDisplay());
    resize();
}
export const handleEvent=function(e){
    e.changedTouches=JSON.parse(JSON.stringify(e.changedTouches));
    e.changedTouches.map(function(changedTouch){
        if(!changedTouch.x&&!changedTouch.y){
            changedTouch.x=changedTouch.clientX-e.currentTarget.offsetLeft
            changedTouch.y=changedTouch.clientY-e.currentTarget.offsetTop
        }
        changedTouch.x*=prop;
        changedTouch.y*=prop;
        return changedTouch;
    })
    e.touches.map(function(touch){
        if(!touch.x&&!touch.y){
            touch.x=touch.clientX-e.currentTarget.offsetLeft
            touch.y=touch.clientY-e.currentTarget.offsetTop
        }
        touch.x*=prop;
        touch.y*=prop;
        return touch;
    })
    flash.handleEvent(e);
}
var prop;
export const canvasInit= async function(w,h,$wx){
    prop=750/w;
    createjs.canvasW = w;
    createjs.canvasH = h;
    await new Promise(function(resolve,reject){
        var query = $wx.createSelectorQuery();
        query.select('#canvas').node().exec((res) => {
            createjs.canvas = res[0].node
            res[0].node.width = 750
            res[0].node.height =h*(750/w)
            resolve();
        })
    })
    
    await new Promise(function(resolve,reject){
        var query = $wx.createSelectorQuery();
        query.select('#cacheCanvas').node().exec((hitRes) => {
            createjs.cacheCanvas = hitRes[0].node;
            resolve();
        });
    });
    await new Promise(function(resolve,reject){
        var query = $wx.createSelectorQuery();
        query.select('#hitTestCanvas').node().exec((hitRes) => {
            hitRes[0].node.width = 1 
            hitRes[0].node.height = 1 
            createjs.DisplayObject._hitTestCanvas = hitRes[0].node
            createjs.DisplayObject._hitTestContext = createjs.DisplayObject._hitTestCanvas.getContext("2d");
            resolve();
        });
    })
    
}

// 暂停持续渲染
export const stopTickUpdata = function(){
    if(!isInit)return;
    flash.stopTick()
}
// 继续渲染
export const startTickUpdata = function(){
    if(!isInit)return;
    flash.startTick()
}
export const destory = function(){
    if(!isInit)return;

    canvasAutoRotation.setRootDisplay(null);
    if(flash){
        flash.destory()
        flash=null;
    }
    createjs.globalDispatcher.removeEventListener('gotoPage',gotoPageHandler)
   
}