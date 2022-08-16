module.exports = (function (lib, img, cjs, ss, an) {

    var p; // shortcut to reference prototypes
    lib.webFontTxtInst = {}; 
    var loadedTypekitCount = 0;
    var loadedGoogleCount = 0;
    var gFontsUpdateCacheList = [];
    var tFontsUpdateCacheList = [];
    lib.ssMetadata = [
            {name:"index_atlas_", frames: [[0,0,552,980]]},
            {name:"index_atlas_2", frames: [[502,0,180,155],[502,157,128,128],[502,287,128,128],[502,417,128,128],[0,0,500,500]]}
    ];
    
    
    
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
    
    
    
    (lib.happy_190_1612144581821_26 = function() {
        this.spriteSheet = ss["index_atlas_2"];
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();
    
    
    
    (lib.happy_199_1612144581820_21 = function() {
        this.initialize(img.happy_199_1612144581820_21);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0,0,260,1800);
    
    
    (lib.happy_200_1612144581820_17 = function() {
        this.spriteSheet = ss["index_atlas_"];
        this.gotoAndStop(0);
    }).prototype = p = new cjs.Sprite();
    
    
    
    (lib.happy_370_1612144581821_28 = function() {
        this.spriteSheet = ss["index_atlas_2"];
        this.gotoAndStop(1);
    }).prototype = p = new cjs.Sprite();
    
    
    
    (lib.happy_399_1612144581821_27 = function() {
        this.spriteSheet = ss["index_atlas_2"];
        this.gotoAndStop(2);
    }).prototype = p = new cjs.Sprite();
    
    
    
    (lib.happy_423_1612144581820_22 = function() {
        this.spriteSheet = ss["index_atlas_2"];
        this.gotoAndStop(3);
    }).prototype = p = new cjs.Sprite();
    
    
    
    (lib.happy_943_1612144581820_18 = function() {
        this.spriteSheet = ss["index_atlas_2"];
        this.gotoAndStop(4);
    }).prototype = p = new cjs.Sprite();
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
    
    
    (lib.happy_935_1612144581801_0 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#000000").s().p("EhO2CKmMAAAkVLMCdtAAAMAAAEVLg");
    
        this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.happy_935_1612144581801_0, new cjs.Rectangle(-504.7,-887,1009.5,1774.1), null);
    
    
    (lib.happy_880_1612144581819_15 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.happy_943_1612144581820_18();
        this.instance.parent = this;
        this.instance.setTransform(-173.8,-173.8,0.695,0.695);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-173.8,-173.8,347.6,347.6);
    
    
    (lib.happy_677_1612144581812_6 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.happy_370_1612144581821_28();
        this.instance.parent = this;
        this.instance.setTransform(-64,-64);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.happy_677_1612144581812_6, new cjs.Rectangle(-64,-64,128,128), null);
    
    
    (lib.happy_674_1612144581810_4 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.happy_399_1612144581821_27();
        this.instance.parent = this;
        this.instance.setTransform(-64,-64);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.happy_674_1612144581810_4, new cjs.Rectangle(-64,-64,128,128), null);
    
    
    (lib.happy_615_1612144581818_12 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.happy_423_1612144581820_22();
        this.instance.parent = this;
        this.instance.setTransform(-64,-64);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.happy_615_1612144581818_12, new cjs.Rectangle(-64,-64,128,128), null);
    
    
    (lib.happy_419_1612144581819_14 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.happy_943_1612144581820_18();
        this.instance.parent = this;
        this.instance.setTransform(-173.8,-173.8,0.695,0.695);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-173.8,-173.8,347.6,347.6);
    
    
    (lib.happy_346_1612144581813_8 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.happy_190_1612144581821_26();
        this.instance.parent = this;
        this.instance.setTransform(-90,-77.5);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.happy_346_1612144581813_8, new cjs.Rectangle(-90,-77.5,180,155), null);
    
    
    (lib.happy_171_1612144581820_16 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // 图层 1
        this.instance = new lib.happy_199_1612144581820_21();
        this.instance.parent = this;
        this.instance.setTransform(-130,-900);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    
    }).prototype = getMCSymbolPrototype(lib.happy_171_1612144581820_16, new cjs.Rectangle(-130,-900,260,1800), null);
    
    
    (lib.happy_514_1612144581813_9 = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // timeline functions:
        this.frame_11 = function() {
            this.stop()
        }
    
        // actions tween:
        this.timeline.addTween(cjs.Tween.get(this).wait(11).call(this.frame_11).wait(1));
    
        // 图层 1
        this.instance = new lib.happy_880_1612144581819_15("synched",0);
        this.instance.parent = this;
        this.instance.setTransform(0,0,0.406,0.406);
        this.instance.alpha = 0.238;
    
        this.instance_1 = new lib.happy_419_1612144581819_14("synched",0);
        this.instance_1.parent = this;
        this.instance_1.alpha = 0.871;
    
        this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},11).wait(1));
        this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,scaleX:1,scaleY:1,alpha:0.871},11).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-70.6,-70.6,141.2,141.2);
    
    
    // stage content:
    (lib.index = function(mode,startPosition,loop) {
        this.initialize(mode,startPosition,loop,{});
    
        // hzMC00
        this.hzMC00 = new lib.happy_615_1612144581818_12();
        this.hzMC00.parent = this;
        this.hzMC00.setTransform(-363,399);
    
        this.timeline.addTween(cjs.Tween.get(this.hzMC00).wait(1));
    
        // hz-show-icon03.png
        this.hzMC02 = new lib.happy_677_1612144581812_6();
        this.hzMC02.parent = this;
        this.hzMC02.setTransform(-408,628);
    
        this.timeline.addTween(cjs.Tween.get(this.hzMC02).wait(1));
    
        // hz-show-icon02.png
        this.hzMC01 = new lib.happy_674_1612144581810_4();
        this.hzMC01.parent = this;
        this.hzMC01.setTransform(-375.4,181.1,1,1,0,0,0,-2,0);
    
        this.timeline.addTween(cjs.Tween.get(this.hzMC01).wait(1));
    
        // 飞机
        this.fjMC = new lib.happy_346_1612144581813_8();
        this.fjMC.parent = this;
        this.fjMC.setTransform(180.2,552.6);
    
        this.timeline.addTween(cjs.Tween.get(this.fjMC).wait(1));
    
        // 完美
        this.perfectMC = new lib.happy_514_1612144581813_9();
        this.perfectMC.parent = this;
        this.perfectMC.setTransform(366.8,475.8);
        this.perfectMC.visible = false;
    
        this.timeline.addTween(cjs.Tween.get(this.perfectMC).wait(1));
    
        // zhuzi-icon01.png
        this.ziMC02 = new lib.happy_171_1612144581820_16();
        this.ziMC02.parent = this;
        this.ziMC02.setTransform(1586.5,900);
    
        this.timeline.addTween(cjs.Tween.get(this.ziMC02).wait(1));
    
        // zhuzi-icon01.png
        this.ziMC01 = new lib.happy_171_1612144581820_16();
        this.ziMC01.parent = this;
        this.ziMC01.setTransform(1220.6,618);
    
        this.timeline.addTween(cjs.Tween.get(this.ziMC01).wait(1));
    
        // zhuzi-icon01.png
        this.ziMC00 = new lib.happy_171_1612144581820_16();
        this.ziMC00.parent = this;
        this.ziMC00.setTransform(886.4,760.3,1,1,0,0,0,6.3,-15.7);
    
        this.timeline.addTween(cjs.Tween.get(this.ziMC00).wait(1));
    
        // 图层 4
        this.bgMC = new lib.happy_935_1612144581801_0();
        this.bgMC.parent = this;
        this.bgMC.setTransform(416.8,837.4);
        this.bgMC.alpha = 0.012;
    
        this.timeline.addTween(cjs.Tween.get(this.bgMC).wait(1));
    
        // 图层 2
        this.instance = new lib.happy_200_1612144581820_17();
        this.instance.parent = this;
        this.instance.setTransform(0,0,1.402,1.66);
    
        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));
    
    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-97,353.5,2188.5,2082);
    // library properties:
    lib.properties = {
        width: 750,
        height: 1271,
        fps: 25,
        color: "#FFFFFF",
        opacity: 1.00,
        webfonts: {},
        manifest: [
            {src:"images/index/happy_199_1612144581820_21.png", id:"happy_199_1612144581820_21"},
            {src:"images/index/index_atlas_.png", id:"index_atlas_"},
            {src:"images/index/index_atlas_2.png", id:"index_atlas_2"}
        ],
        preloads: []
    };
    
    
    
    
    })