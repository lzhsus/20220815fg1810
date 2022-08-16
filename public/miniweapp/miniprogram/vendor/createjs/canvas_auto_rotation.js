var designW=750;
var designH=1200;
var stageW;
var stageH;
var rootMC;
var orientation='portrait';//landscape

var dpr = 1;
var w;
var h;
var info=wx.getSystemInfoSync();
dpr = info.pixelRatio;
w=info.screenWidth
h=info.screenHeight


function setDesign(o='portrait',w,h){
  orientation=o;
  designW=w;
  designH=h;
}
function setRootDisplay(mc){
  rootMC=mc;
}
function getStageWH(){
  return {width:stageW,height:stageH};
}
function canvasResize(canvas,cb){
  if(!rootMC){
    console.error("没有设定旋转mc");
    return;
  }
  let canvasW=w*dpr;
  let canvasH=h*dpr;
  let tempProp=w/h;
  let scale=1;
  if(orientation=='portrait'){
    if(w>h){
      var scaleW= w / designH * dpr;
      var scaleH=h / designW * dpr;
      scale=scaleH;
      
      rootMC.scaleX=rootMC.scaleY=scale*dpr;
      rootMC.rotation=-90;
      rootMC.x=0;
      rootMC.y=designW*scale;
      stageW=canvasH/scale;
      stageH=canvasW/scale;
      
    }else{
      var scaleW= w / designW ;
      var scaleH=h / designH ;
      scale=scaleW;
      console.log(scale)
      rootMC.scaleX=rootMC.scaleY=1;
      rootMC.rotation=0;
      rootMC.x=0;
      rootMC.y=0;
      stageW=canvasW/scale;
      stageH=canvasH/scale;
      console.log(w,designW,dpr,scale)
    }
  }else{
    if(w<h){
      var scaleW= w / designW * dpr;
      var scaleH=h / designH * dpr;
      scale=scaleW;
      
      rootMC.scaleX=rootMC.scaleY=scale*dpr;
      rootMC.rotation=90;
      rootMC.x=designW*scale;
      rootMC.y=0;
      stageW=canvasH/scale;
      stageH=canvasW/scale;
      
    }else{
      var scaleW= w / designH * dpr;
      var scaleH=h / designW * dpr;
      scale=scaleH;
      rootMC.scaleX=rootMC.scaleY=scale*dpr;
      rootMC.rotation=0;
      rootMC.x=0;
      rootMC.y=0;
      stageW=canvasW/scale;
      stageH=canvasH/scale;
      
    }
  }
  // displayResize(stageW,stageH);
  if(typeof cb=="function"){
    cb(stageW,stageH);
  }
  console.log(scale)
  return {width:stageW,height:stageH};
}
export default {
  setDesign:setDesign,
  setRootDisplay:setRootDisplay,
  canvasResize:canvasResize,
  getStageWH:getStageWH,
}