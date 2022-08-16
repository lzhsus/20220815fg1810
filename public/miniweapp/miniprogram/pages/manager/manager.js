const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
import {uploadFile} from '../../services/uploadFile';

var plugin = requirePlugin("WechatSI");
let manager = null;
let innerAudioContext = null;
let innerAudioContext2 = null;

Page({
    data: {
        pageShow:"manager",

        isTouch:false,
        managerShow:false,
        managerItem:{},
        recognizes:[],
        translate:{
            type:1,//1中文转英文 2英文转中文
            en:"en_US",
            lfromText:"英文",
            zh:"zh_CN",
            ltoText:"中文"
        },
        lfromText:'',
        ltoText:'',
        filename:'',

        playStatus:false,
        playStatus2:false,

        settingShow:false
    },
    onLoad(){
        manager = plugin.getRecordRecognitionManager();
        let _this = this;
        manager.onRecognize = function(res) {
            _this.setData({
                recognizes:_this.data.recognizes.concat([res])
            })
        }
        manager.onStop = async function(res) {
            _this.setData({
                managerShow:false,
                managerItem:res
            })
            let path = await uploadFile(res.tempFilePath,'mp3');
            // 音频是否上传成功
            if(!path['success']) return;
            Api.managerLog({
                duration:res.duration,
                fileSize:res.fileSize,
                result:res.result,
                path:path['fileID'].replace('cloud://lzhsus-1g4h29bs69c66542.6c7a-lzhsus-1g4h29bs69c66542-1301447037/','https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/')
            })
        }
        manager.onStart = function(res) {
            _this.setData({
                managerShow:true
            })
        }
        manager.onError = function(res) {
            _this.setData({
                managerShow:false
            })
            manager.stop();
            console.error("error msg", res)
        }
    },
    onShow: function () {

    },
    // 复制
    setClipboardData(){
        wx.setClipboardData({
            data: this.data.managerItem.result,
            success (res) {
                wx.showToast({
                    title: '复制成功！',
                    icon:"none"
                })
            }
        })
    },
    changeTabNavClick(e){
        let {pageshow} = e.currentTarget.dataset;
        console.log(e)
        if(this.data.pageShow == pageshow) return;
        this.setData({
            pageShow:pageshow
        })
    },
    playIconClick2(){
        this.onMusicPlay2()
    },
    playIconClick(){
        this.onMusicPlay()
    },
    // 切换语言
    changeTranslateClick(){
        let {translate} = this.data;
        translate.type = translate.type==1?2:1;
        this.setData({
            translate:translate
        })
    },
    bindInputTranslate(e){
        this.setData({
            lfromText:e.detail.value
        })
    },
    async startTranslate(){
        if(!this.data.lfromText){
            wx.showModal({
                content:"请输入需要翻译的语句",
                showCancel:false
            })
            return
        }
        wx.showLoading({
            title: '加载中',
        })
        let res = await this.translate(this.data.lfromText);
        wx.hideLoading()
        if(!res.success){
            wx.showModal({
                content:"翻译失败，请联系管理！",
                showCancel:false
            })
            return
        }
        this.setData({
            ltoText:res.result
        })
        let file = await this.downloadFile(res.filename);
        console.log('file',file)
        let path = await uploadFile(file,'mp3','translate_log');
        console.log('path',path)
        // // 音频是否上传成功
        if(!path['success']) return;
        let filename = path['fileID'].replace('cloud://lzhsus-1g4h29bs69c66542.6c7a-lzhsus-1g4h29bs69c66542-1301447037/','https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/')
        Api.translateLog({
            lfrom:res.origin,
            ltoText:res.result,
            path:filename
        })
        this.setData({
            filename:filename
        })
    },
    downloadFile(url){
        return new Promise((resolve,reject)=>{
            wx.downloadFile({
                url: url, //仅为示例，并非真实的资源
                success (res) {
                    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                    if (res.statusCode === 200) {
                        resolve(res.tempFilePath)
                    }else{
                        reject()
                    }
                },
                fail:err=>{
                    reject()
                }
            })
        })
    },
    // 开始翻译
    translate(content){
        let {translate} = this.data;
        let lfrom,lto;
        if( translate.type==1 ){
            lfrom = translate['zh']
            lto = translate['en']
        }else{
            lfrom = translate['en']
            lto = translate['zh']
        }
        console.log(lfrom,lto)
        return new Promise((resolve,reject)=>{
            plugin.translate({
                lfrom:lfrom||"en_US",
                lto:lto||"zh_CN",
                content:content,
                tts:true,//合成音频
                success: function(res) {
                    if(res.retcode == 0) {
                        resolve(Object.assign(res,{
                            success:true
                        }))
                    } else {
                        resolve(Object.assign(res,{
                            success:false
                        }))
                    }
                },
                fail: function(res) {
                    resolve(Object.assign(res,{
                        success:false
                    }))
                }
            })
        })
    },
    // 监听音频的播放
    onMusicPlay(){ 
        if(!this.data.managerItem.tempFilePath) return
        let _this = this;
        wx.showLoading({
            title: '加载中',
        });
        innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.src = _this.data.managerItem.tempFilePath; 
        innerAudioContext.onPlay(()=> {
            console.log('开始播放');
            _this.setData({
                playStatus:true
            })
            wx.hideLoading();
        });
        innerAudioContext.onPause((res)=> {
            console.log('播放暂停');
            _this.setData({
                playStatus:false
            })
        });
        innerAudioContext.onEnded((res)=> {
            console.log('播放结束');
            _this.setData({
                playStatus:false
            })
        });
        // 播放语音
        if( !this.data.playStatus ){
            innerAudioContext.play();
        }else{
            innerAudioContext.pause();
        }
    },
    onMusicPlay2(){ 
        if(!this.data.filename) return
        let _this = this;
        console.log(this.data.filename)
        wx.showLoading({
            title: '加载中',
        });
        innerAudioContext2 = wx.createInnerAudioContext();
        innerAudioContext2.src = this.data.filename; 
        innerAudioContext2.onPlay(()=> {
            console.log('开始播放');
            wx.hideLoading();
            _this.setData({
                playStatus2:true
            })
        });
        innerAudioContext2.onPause((res)=> {
            console.log('播放暂停');
            _this.setData({
                playStatus2:false
            })
        });
        innerAudioContext2.onEnded((res)=> {
            console.log('播放结束');
            _this.setData({
                playStatus2:false
            })
        });
        innerAudioContext2.onError((res)=>{
            console.log('加载失败',res)
            wx.hideLoading();
            _this.setData({
                playStatus2:false
            })
        })
        // 播放语音
        if( !this.data.playStatus2 ){
            innerAudioContext2.play();
        }else{
            innerAudioContext2.pause();
        }
    },
    startManagerTick(){
        manager.start({duration:30000, lang: "zh_CN"});
    },
    // 录音 按下
    bindtouchstart(){
        if( this.data.isTouch) return;
        this.setData({
            isTouch:true
        })
        this.startManagerTick();
        // wx.getSetting({
        //     success:(res)=>{
        //         this.setData({
        //             isTouch:true
        //         })
        //         if (res.authSetting['scope.record']) {
        //             this.startManagerTick();
        //         }else{
        //             this.setData({
        //                 settingShow:true,
        //                 isTouch:false
        //             })
        //         }
        //     }
        // })
    },
    closeCLick(){
        this.setData({
            settingShow:false,
            isTouch:false
        })
    },
    bindtouchmove(e){},
    // 松开
    bindtouchend(){
        this.isTouch = false;
        manager.stop();
    },
    onUnload(){
        if(innerAudioContext){
            innerAudioContext.destroy()
        }
        if(innerAudioContext2){
            innerAudioContext2.destroy()
        }
    },
	openSetting(){
		wx.openSetting({
			success:(res)=> {
                let settingShow;
                if( res.authSetting['scope.record'] ){
                    settingShow = false
                    wx.showToast({
                        title: '请重新录音！',
                        icon: 'none',
                        duration: 2000
                    })
                }else{
                    settingShow = true
                    wx.showToast({
                        title: '请勾选"录音"权限！',
                        icon: 'none',
                        duration: 2000
                    })
                }
                this.setData({
                    settingShow:settingShow
                })
			},
			fail:(res)=>{}
		})
	}
})