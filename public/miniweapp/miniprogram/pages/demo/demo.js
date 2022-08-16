
import * as flash from '../../flash/config';
import createjs from "../../vendor/createjs/createjs";
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
var updateFrameStep = 8;

Page({
    data: {
        time:"",
        timeText:"0",
        playGameStart:false,
        countDownTime:3,
        canvasW:100,
        canvasH:100
    },
    async onLoad (opt) {
        mixinsIndex.onLoad(opt);
        await this.loadCanvas();
        this.countDown()
    },
    onShow: function () {

    },
    countDown(){
        setTimeout(res=>{
            if(this.data.countDownTime>0){
                this.setData({
                    countDownTime:this.data.countDownTime-1
                })
                this.countDown()
            }else{
                this.setData({
                    playGameStart:true,
                    popShow:""
                })
                this.startPlayGame()
            }
        },1000)
    },
    startPlayGame(){
        var event = new createjs.Event('startPlayGame');
        createjs.globalDispatcher.dispatchEvent(event)
        this.startCountTime()
    },
    startCountTime(){
        setTimeout(res=>{
            if(this.data.playGameStart) this.startCountTime()
            let time = Number(this.data.time)+1;
            if(time%10==0) updateFrameStep = updateFrameStep+0.5;
            this.setData({
                time:time,
                timeText:common.formatSeconds(time)
            })
        },1000)
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
                flash.loadInit('index',res=>{
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
        this.setData({
            playGameStart:false
        })
        if(onUnload) return;
        this.userRankingFunc()
    },
    userRankingFunc(){
        let userInfo = common.LS.get('userinfo_count');
        console.log('userInfo',userInfo)
        Api.userRanking({
            time:this.data.time,
            nickName:userInfo.nickName,
            avatarUrl:userInfo.avatarUrl,
            gender:userInfo.gender
        }).then(res=>{
            if(res.success){
                wx.showToast({
                    title: '数据记录成功！',
                    icon: 'success',
                    duration: 1000,
                    complete:res=>{
                        wx.redirectTo({
                            url:"/pages/ranking/ranking"
                        })
                    }
                })
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
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