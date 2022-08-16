
import * as flash from '../../flash/config';
import createjs from "../../vendor/createjs/createjs";
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';

Page({
    data: {
        canvasW:100,
        canvasH:100
    },
    async onLoad (opt) {
        mixinsIndex.onLoad(opt);
        await this.loadCanvas();
    },
    onShow: function () {

    },

    canvasEvent: function (e) {
        flash.handleEvent(e);
        return false;
    },
    loadCanvas(){
        return new Promise((resolve,reject)=>{
            var info = wx.getSystemInfoSync();
            var dpr = info.pixelRatio;
            var w = info.windowWidth;
            var h = info.windowHeight;
            this.setData({
                canvasW:w,
                canvasH:h
            })
            flash.canvasInit(w,h,wx).then(()=>{
                flash.loadInit('magicgirl',res=>{
                    resolve()
                })
            })
            
            createjs.globalDispatcher.removeAllEventListeners('indexInit')
            createjs.globalDispatcher.addEventListener('indexInit',res=>{

            })
            createjs.globalDispatcher.removeAllEventListeners('flashGameOverTick')
            createjs.globalDispatcher.addEventListener('flashGameOverTick',res=>{
                this.flashDispose()
            }) 
        })
    },
    flashDispose(onUnload){
        if(createjs){
            createjs.Ticker.removeEventListener("tick",this.updateFrame);
        }
        if(onUnload) return;
    },
    onUnload: function () {
        updateFrameStep = 8;
        this.flashDispose(true)
    },
    onShareAppMessage (res) {
        let shareObj = {
            title: "从未放弃，无所畏惧的你！",
            imageUrl: "https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/share-icon.png?sign=a3405bc98afd3bbda9c76d72ee6571e9&t=1612153450",
            path: "/pages/my/my?scene=onshare",
        } 
        return shareObj;
    }
})