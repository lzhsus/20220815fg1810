module.exports = (function (lib, img, cjs, ss, an) {

    var p; // shortcut to reference prototypes
    lib.webFontTxtInst = {}; 
    var loadedTypekitCount = 0;
    var loadedGoogleCount = 0;
    var gFontsUpdateCacheList = [];
    var tFontsUpdateCacheList = [];
    lib.ssMetadata = [];
    
    
    
    lib.updateListCache = function (cacheList) {		
        for(var i = 0; i < cacheList.length; i++) {		
            if(cacheList[i].cacheCanvas)		
                cacheList[i].updateCache();		
        }		
    };		
    
    lib.addElementsToCache = function (textInst, cacheList) {		
        var cur = textInst;		
        while(cur != exportRoot) {		
            if(cacheList.indexOf(cur) != -1)		
                break;		
            cur = cur.parent;		
        }		
        if(cur != exportRoot) {		
            var cur2 = textInst;		
            var index = cacheList.indexOf(cur);		
            while(cur2 != cur) {		
                cacheList.splice(index, 0, cur2);		
                cur2 = cur2.parent;		
                index++;		
            }		
        }		
        else {		
            cur = textInst;		
            while(cur != exportRoot) {		
                cacheList.push(cur);		
                cur = cur.parent;		
            }		
        }		
    };		
    
    lib.gfontAvailable = function(family, totalGoogleCount) {		
        lib.properties.webfonts[family] = true;		
        var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
        for(var f = 0; f < txtInst.length; ++f)		
            lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		
    
        loadedGoogleCount++;		
        if(loadedGoogleCount == totalGoogleCount) {		
            lib.updateListCache(gFontsUpdateCacheList);		
        }		
    };		
    
    lib.tfontAvailable = function(family, totalTypekitCount) {		
        lib.properties.webfonts[family] = true;		
        var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
        for(var f = 0; f < txtInst.length; ++f)		
            lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		
    
        loadedTypekitCount++;		
        if(loadedTypekitCount == totalTypekitCount) {		
            lib.updateListCache(tFontsUpdateCacheList);		
        }		
    };
    // symbols:
    // helper functions:
    
    function mc_symbol_clone() {
        var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
        clone.gotoAndStop(this.currentFrame);
        clone.paused = this.paused;
        clone.framerate = this.framerate;
        return clone;
    }
    
    function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
        var prototype = cjs.extend(symbol, cjs.MovieClip);
        prototype.clone = mc_symbol_clone;
        prototype.nominalBounds = nominalBounds;
        prototype.frameBounds = frameBounds;
        return prototype;
        }
    
    
    (lib.元件9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#000000").s().p("AgvDpIAAnRIBfAAIAAHRg");
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.元件9, new cjs.Rectangle(-4.7,-23.3,9.5,46.6), null);
    
    
    (lib.元件8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#000000").s().p("AgvDpIAAnRIBfAAIAAHRg");
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.元件8, new cjs.Rectangle(-4.7,-23.3,9.5,46.6), null);
    
    
    (lib.元件6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#000000").s().p("ACaBgIAAiHIgFAGQgKAKgPAAQgHAAgFgCIk2AAIAAhGIE2AAIAAACQAFgCAHAAQAPAAAKALIAFAFIAAgBIAtAAIAACwg");
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.元件6, new cjs.Rectangle(-19.9,-9.6,39.8,19.2), null);
    
    
    (lib.元件5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#000000").s().p("AhYG1QgYg7AAhTQAAg6ALguQhDgZg1g8QhbhnAAiRQAAiSBbhoQBchnCBAAQCCAABbBnQBcBoAACSQAACRhcBnQhNBXhoAOQAIAoAAAwQAABTgYA7QgXA7ggAAQgiAAgXg7g");
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.元件5, new cjs.Rectangle(-31.3,-49.6,62.7,99.2), null);
    
    
    (lib.元件3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#000000").s().p("AlFEAIAAn/IKLAAIAAH/g");
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.元件3, new cjs.Rectangle(-32.6,-25.6,65.2,51.2), null);
    
    
    (lib.补间8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.元件9();
        this.instance.parent = this;
        this.instance.setTransform(17.4,0);
    
        this.instance_1 = new lib.元件8();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-17.3,0);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-22.1,-23.3,44.2,46.6);
    
    
    (lib.补间7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.元件9();
        this.instance.parent = this;
        this.instance.setTransform(16.8,-23,1,1,5.5,0,0,-0.1,-23.1);
    
        this.instance_1 = new lib.元件8();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-16.7,-23,1,1,-4.7,0,0,0.1,-23.1);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-21.6,-23.6,43.2,47.3);
    
    
    (lib.补间6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.元件9();
        this.instance.parent = this;
        this.instance.setTransform(16.8,-23,1,1,2,0,0,-0.1,-23.1);
    
        this.instance_1 = new lib.元件8();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-16.7,-23,1,1,-4.7,0,0,0.1,-23.1);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-21.6,-23.6,43.2,47.2);
    
    
    (lib.补间5 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.元件9();
        this.instance.parent = this;
        this.instance.setTransform(16.8,-22.8,1,1,7.2,0,0,-0.1,-23);
    
        this.instance_1 = new lib.元件8();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-16.7,-22.9,1,1,-4.7,0,0,0.1,-23.1);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-21.6,-23.7,43.2,47.4);
    
    
    (lib.补间4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.元件9();
        this.instance.parent = this;
        this.instance.setTransform(17.1,-22.8,1,1,7.2,0,0,-0.1,-23);
    
        this.instance_1 = new lib.元件8();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-16.4,-22.8,1,1,0.8,0,0,0.1,-23);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-21.9,-23.7,43.8,47.4);
    
    
    (lib.补间3 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.元件9();
        this.instance.parent = this;
        this.instance.setTransform(16.8,-22.7,1,1,7.2,0,0,-0.1,-23);
    
        this.instance_1 = new lib.元件8();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-16.7,-22.8,1,1,-7.7,0,0,0.1,-23);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-21.5,-23.7,43.2,47.5);
    
    
    (lib.补间2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.元件9();
        this.instance.parent = this;
        this.instance.setTransform(16.9,0.2);
    
        this.instance_1 = new lib.元件8();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-16.7,-22.8,1,1,-7.7,0,0,0.1,-23);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-21.5,-23.7,43.2,47.5);
    
    
    (lib.补间1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.元件9();
        this.instance.parent = this;
        this.instance.setTransform(17.4,0);
    
        this.instance_1 = new lib.元件8();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-17.3,0);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-22.1,-23.3,44.2,46.6);
    
    
    (lib.元件7 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.补间1("synched",0);
        this.instance.parent = this;
        this.instance.setTransform(26.2,-3.7);
    
        this.instance_1 = new lib.补间2("synched",0);
        this.instance_1.parent = this;
        this.instance_1.setTransform(26.7,-3.9);
        this.instance_1._off = true;
    
        this.instance_2 = new lib.补间3("synched",0);
        this.instance_2.parent = this;
        this.instance_2.setTransform(26.7,-3.9);
        this.instance_2._off = true;
    
        this.instance_3 = new lib.补间4("synched",0);
        this.instance_3.parent = this;
        this.instance_3.setTransform(26.4,-3.8);
        this.instance_3._off = true;
    
        this.instance_4 = new lib.补间5("synched",0);
        this.instance_4.parent = this;
        this.instance_4.setTransform(26.7,-3.8);
        this.instance_4._off = true;
    
        this.instance_5 = new lib.补间6("synched",0);
        this.instance_5.parent = this;
        this.instance_5.setTransform(26.7,-3.7);
        this.instance_5._off = true;
    
        this.instance_6 = new lib.补间7("synched",0);
        this.instance_6.parent = this;
        this.instance_6.setTransform(26.7,-3.7);
        this.instance_6._off = true;
    
        this.instance_7 = new lib.补间8("synched",0);
        this.instance_7.parent = this;
        this.instance_7.setTransform(26.2,-3.7);
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},10).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_3}]},6).to({state:[{t:this.instance_4}]},6).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_6}]},4).to({state:[{t:this.instance_7}]},10).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:26.7,y:-3.9},10).wait(41));
        this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},10).to({_off:true},9).wait(32));
        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(10).to({_off:false},9).to({_off:true,x:26.4,y:-3.8},6).wait(26));
        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},6).to({_off:true,x:26.7},6).wait(20));
        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(25).to({_off:false},6).to({_off:true,y:-3.7},5).wait(15));
        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(31).to({_off:false},5).to({_off:true},4).wait(11));
        this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(36).to({_off:false},4).to({_off:true,x:26.2},10).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(4.1,-27,44.2,46.6);
    
    
    (lib.元件4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.元件6();
        this.instance.parent = this;
        this.instance.setTransform(-20,-5.7,1,1,0,0,0,-20,-5.7);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:-19.9,rotation:3,x:-19.9},6).to({regX:-20,rotation:-2.7,x:-20},7).to({regX:-19.9,regY:-5.9,rotation:1.7,x:-19.9,y:-5.9},6).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-19.9,-9.6,39.8,19.2);
    
    
    (lib.元件2 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.元件5();
        this.instance.parent = this;
        this.instance.setTransform(-0.8,50.6,1,1,0,0,0,-0.8,50.6);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:-1.6,regY:49.9,rotation:-6.5,x:-1.5,y:50},6).to({regX:0.8,regY:48.2,rotation:0,x:0.8,y:48.2},7).to({regX:-1.7,regY:48.1,rotation:3.2,x:-1.7,y:48.1},6).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-31.3,-49.6,62.7,99.2);
    
    
    (lib.元件1 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 右腿
        this.instance = new lib.元件7();
        this.instance.parent = this;
        this.instance.setTransform(9.4,70.6,1,1.77,0,0,0,0,0.1);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    
        // 左手
        this.instance_1 = new lib.元件4();
        this.instance_1.parent = this;
        this.instance_1.setTransform(-12.9,-22.3,0.927,1,0,0,180);
    
        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));
    
        // 右手
        this.instance_2 = new lib.元件4();
        this.instance_2.parent = this;
        this.instance_2.setTransform(90.6,-22.3);
    
        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));
    
        // 身体
        this.instance_3 = new lib.元件3();
        this.instance_3.parent = this;
        this.instance_3.setTransform(38.1,-6.3);
    
        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));
    
        // 头-脖子
        this.instance_4 = new lib.元件2();
        this.instance_4.parent = this;
        this.instance_4.setTransform(41.9,-76.5);
    
        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.元件1, new cjs.Rectangle(-31.4,-126.1,141.9,231.1), null);
    
    
    // stage content:
    (lib.magicgirl = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 人物
        this.instance = new lib.元件1();
        this.instance.parent = this;
        this.instance.setTransform(302.1,411.1);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(645.7,920.5,141.9,231.1);
    // library properties:
    lib.properties = {
        width: 750,
        height: 1271,
        fps: 25,
        color: "#FFFFFF",
        opacity: 1.00,
        webfonts: {},
        manifest: [],
        preloads: []
    };
    
    
    
    
    })