var displayArr = [];
var dynamicSizeMc = [];
/**
 *  pos:{top right bottom left center}
 *  lockAt:{}
 */
var cw = 0;
var ch = 0;

function addDisplay(mc, pos = {}, lockAtMC) {
    var obj = {display: mc, pos: pos, lockAtMC: lockAtMC};
    displayArr.push(obj);
    setDisplayPos(obj);
}

/***
 * 用法
 flexpos.addDynamicSizeMc(_self.bg)
 flexpos.addDisplay(_self.bg, {left: 0, top: 0})
 let stageRect = canvasAutoRotation.canvasResize($("#canvas")[0], $(window).width(), $(window).height());
 flexpos.update(stageRect.width, stageRect.height);
 */

function addDynamicSizeMc(mc, size = "fullscreen") {
    //目前只用于背景
    var obj = {display: mc, size: size};
    dynamicSizeMc.push(obj);
    // if(size=="fullscreen"){
    // 	changeSize(mc,size)
    // }
    // else{
    // 	changeSize(mc,size);
    // }
}


function changeSize(w, h) {
    console.log("changesizeeeeee", w, h, dynamicSizeMc)
    for (let i = 0; i < dynamicSizeMc.length; i++) {
        let shape = dynamicSizeMc[i].display;
        let bounds = shape.getBounds();
        let nscaleX = w / bounds.width;
        let nscaleY = h / bounds.height;
        shape.scaleX = nscaleX;
        shape.scaleY = nscaleY;
    }
}

function removeDisplay(mc) {
    for (var i = 0; i < displayArr.length; i++) {
        if (displayArr[i] == mc) {
            displayArr.splice(i, 1);
        }
    }
    ;
}

function displayResetPos($cw, $ch) {
    cw = $cw ? $cw : cw;
    ch = $ch ? $ch : ch;
    var lookRect = {x: 0, y: 0, width: cw, height: ch};
    displayArr.forEach((obj) => {
        setDisplayPos(obj, lookRect);
    })
}

function setDisplayPos(obj, lookRect) {
    if (!lookRect) {
        lookRect = {x: 0, y: 0, width: cw, height: ch};
    }
    if (obj.lockAtMC) {
        lookRect = obj.lockAtMC.getBounds();
    }
    var x=0,y=0;
    if(obj.pos.center){
		x=lookRect.x+lookRect.width/2;
		y=lookRect.y+lookRect.height/2;
	}else{
        // lookRect.temp = lookRect.width;
        // lookRect.width = lookRect.height;
        // lookRect.height = lookRect.temp;

		if(typeof obj.pos.left=='number'){
			x=lookRect.x+obj.pos.left;
		}else if(typeof obj.pos.perLeft=='number'){
			x=lookRect.x+lookRect.width*obj.pos.perLeft/100;
		}else if(typeof obj.pos.right =='number'){
			x=lookRect.x+lookRect.width-obj.pos.right;
		}else if(typeof obj.pos.perRight=='number'){
			x=lookRect.x+lookRect.width-lookRect.width*obj.pos.perRight/100;
		}

		if(typeof obj.pos.top=='number'){
			y=lookRect.y+obj.pos.top;
		}else if(typeof obj.pos.perTop=='number'){
			y=lookRect.y+lookRect.height*obj.pos.perTop/100;
		}else if(typeof obj.pos.bottom =='number'){
			y=lookRect.y+lookRect.height-obj.pos.bottom;
		}else if(typeof obj.pos.perBottom=='number'){
			y=lookRect.y+lookRect.height-lookRect.height*obj.pos.perBottom/100;
		}
	}
    // obj.display.
    if(obj.pos.global){
        var point=obj.pos.container.localToLocal(x,y,obj.display.parent)
        obj.display.x=point.x;
        obj.display.y=point.y;
    }else{
        obj.display.x=x;
        obj.display.y=y;
    }
    // console.log(obj.display.x,obj.display.y)
}

function update(w, h) {

    changeSize(w, h);
    displayResetPos(w, h);
}

export default {
    update: update,
    addDynamicSizeMc: addDynamicSizeMc,
    addDisplay: addDisplay,
    removeDisplay: removeDisplay,
    displayResetPos: displayResetPos,
}
