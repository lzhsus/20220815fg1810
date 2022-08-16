import canvasAutoRotation from "vendor/createjs/canvas_auto_rotation";
import flexpos from "vendor/createjs/flexpos";
const res = require('vendor/createjs/createjs-res');
// 音乐
import { Howl, Howler } from 'howler';
import SoundManage from "vendor/sound/sound-manage";
import AppData from "../common/AppData";

var indexSound;
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
    indexSound = new SoundManage("./static/sounds/game-bg",{
        formats: [ "mp3"],
        loop: true,
    });
}else{
    indexSound = new Howl({
        src: ["./static/sounds/game-bg.mp3"],
        loop: true,
    });
}

vueApp.globalDispatcher.$on("musicPlay",musicPlayFunc);
function musicPlayFunc(obj){
    if(!obj.status){
        indexSound.stop();
    }else{
        indexSound.play();
    }
}


var flashObj={
  loading: {name: 'loading'},
  bottomLayer: {name: "bg"},
  topLayer: {name: "nav"},
  middleLayer: {
    index:{name:"index"},
    game:{name:"game"},
  },
  asset: {

  },
  firstPage: 'index',
  firstload: ['index'],
  preload: ["game"],
  preloadNum: 1,
};
var flash;
function resize(data){
    if(data&&data.orientation=='landscape'){
      canvasAutoRotation.setDesign("landscape",1600,750)
    }else{
      canvasAutoRotation.setDesign("portrait",750,1600)
    }
    let stageRect = canvasAutoRotation.canvasResize(
        $("#canvas")[0],
        $(window).width(),
        $(window).height()
    );
    AppData.stageRect = stageRect
    flexpos.displayResetPos(stageRect.width, stageRect.height);
}
// 页面
function gotoPageHandler(e){
//   vueApp.Loading.show();
    console.log("gotopage--done-start")
  flash.goto(e.page).done(()=>{
      console.log("gotopage--done-end")
      setTimeout(()=>{
        //   vueApp.Loading.hide();
      },50);
  });
}
export default function(data){
//   vueApp.Loading.show()
    if(data&&data.firstPage){
        flashObj['firstPage'] = data.firstPage;
    }
    if(data&&data.firstload){
        flashObj['firstload'] = data.firstload;
    }
    
    flash = new res.Flash(document.getElementById('canvas'));
    vueApp.flash = flash
    flash.loadInit(flashObj)
    .done((lib) => {
        setTimeout(()=>{
          vueApp.Loading.hide();
          if(AppData.musicStatus){
              indexSound.play();
          }
        },100);
    })
    vueApp.globalDispatcher.$on("gotoPage",gotoPageHandler);
    vueApp.globalDispatcher.$on("canvasOrientation",resize);
    canvasAutoRotation.setRootDisplay(flash.getRootDisplay());
    $(window).on("resize",resize); 
    resize();
}