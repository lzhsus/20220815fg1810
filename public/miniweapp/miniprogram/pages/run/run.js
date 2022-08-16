const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        pageShow:false,
        runInfo:{},
        openSttingShow:false,
        targetStep:false,
        targetStepNum:0,
        userInfo:{}
    },
   async onLoad (options) {
        this.getWxRunInfo()
    },
    onShow: function () {
        let userInfo = common.LS.get('userinfo_count');
        this.setData({
            userInfo:userInfo
        })
    },
    openMoreLog(){
        wx.navigateTo({
          url: '/sports/log/log',
        })
    },
    getWxRunInfo(){
        Api.wxRunInfo().then(res=>{
            if(res['success']){
                res = res.result||{};
                res.total['calorie_t'] = common.formatMoney(res.total['calorie']);
                res.total['step_t'] = common.formatMoney(res.total['step']||0,0);
                res.total['distance_t'] = common.formatMoney((res.total['distance']/1000));
                if(res.isToday==1){
                    res.today['calorie_t'] = common.formatMoney(res.today['calorie']);
                    res.today['step_t'] = common.formatMoney(res.today['step']||0,0);
                    res.today['distance_t'] = common.formatMoney((res.today['distance']/1000));
                    res.schedule = common.scheduleLoading(res.today['step'],res.target_step,180)
                    res.scheduleSH = common.scheduleSH(res.today['step'],res.target_step)
                }else{
                    res.today['calorie_t'] = 0;
                    res.today['step_t'] = 0;
                    res.today['distance_t'] = 0;
                    res.schedule = 0
                }
                this.setData({
                    runInfo:res,
                    pageShow:true
                })
                console.log(res)
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    getTodayDate(){
        wx.getWeRunData({
            success:(res)=> {
                Api.wxServerApiRun({
                    weRunData: wx.cloud.CloudID(res.cloudID)
                }).then(res=>{
                    if(res['success']){
                        this.getWxRunInfo()
                    }
                })
            },
            fail:(res)=>{
                console.log(res);
                this.setData({
                    openSttingShow:true
                })
            }
        })
    },
    openSetting(){
        wx.openSetting({
            success: (res) => {
                if( res.authSetting['scope.werun'] ){
                    this.setData({
                        openSttingShow:false
                    })
                    wx.showToast({
                        title: '设置成功！',
                        icon: 'none',
                    });
                }else{
                    wx.showToast({
                        title: '请允许使用微信运动步数！',
                        icon: 'none',
                        duration: 3000,
                    });
                }
            },
            fail:(err)=>{
                console.log(err)
            }
        })
    },
    closePop(){
        this.setData({
            targetStep:false
        })
    },
    openTargetStep(){
        this.setData({
            targetStep:true
        })
    },
    bindinput(e){
        let { value } = e.detail;
        this.setData({
            targetStepNum:value
        })
    },
    submitTagetStep(){
        if(this.data.targetStepNum<1000){
            wx.showToast({
                title: '最低设置步数不可低于1000！',
                icon:"none",
                duration:1000
            })
            return
        }
        if(this.data.targetStepNum%1000!=0){
            wx.showToast({
                title: '设置步数必须为1000的倍数！',
                icon:"none",
                duration:1000
            })
            return
        }
        Api.fieldUpdata({
            name:"user_info",
            data:{
                target_step:this.data.targetStepNum
            }
        }).then(res=>{
            if(res.success){
                wx.showToast({
                    title: '更新成功',
                    icon:'none',
                    duration:1000
                })
                this.closePop()
                this.getWxRunInfo()
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 运动
    openRuningClick(){
        if(!this.data.userInfo.avatarUrl){
            wx.showModal({
                content: '请先前往我的页面，完成首次签到！',
                showCancel:false
            })
            return
        }
        wx.navigateTo({
            url: '/sports/running/running',
        })
    },
    // 社区
    openForumPages(){
        if(!this.data.userInfo.avatarUrl){
            wx.showModal({
                content: '请先前往我的页面，完成首次签到！',
                showCancel:false
            })
            return
        }
        wx.navigateTo({
            url: '/forum/index/index',
        })
    },
    // 答题
    openAnswerPages(){
        if(!this.data.userInfo.avatarUrl){
            wx.showModal({
                content: '请先前往我的页面，完成首次签到！',
                showCancel:false
            })
            return
        }
        wx.navigateTo({
            url: '/challenge/index/index',
        })
    },
    oenGoodsPage(){
        wx.navigateToMiniProgram({
            appId: 'wxe7bd80f710c7cb35',
            path: '/pages/index/index?scene=run',
        });
    }
})