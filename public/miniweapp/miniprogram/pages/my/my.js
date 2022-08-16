const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';

Page({
    data: {
        pageShow:"",
        userInfo:{},
        queryMainShow:false,
        invPop:false
    },
    onLoad (opt) {
        mixinsIndex.onLoad(opt);
        Api.tabList().then(res=>{
            console.log(res);
        })
    },
    onShow: function () {
        this.getUserInfo()
    },
    closeClickPop(){
        this.setData({
            invPop:false
        })
    },
    openPageClick2(){
        this.setData({
            invPop:true
        })
    },
    opensetPage(){
        // 请先完成每日签到
        if(this.data.userInfo.is_sign!=1){
            wx.showModal({
                content:'请先完成每日签到！',
                showCancel:false
            })
            return
        }
        wx.navigateTo({
          url: '/pages/setting/setting',
        })
    },
    openPageClick(e){
        let { path,isuser } = e.currentTarget.dataset||{};
        if(!path) return;
        // 请先完成每日签到
        if(this.data.userInfo.is_sign!=1&&isuser==1){
            wx.showModal({
                content:'请先完成每日签到！',
                showCancel:false
            })
            return
        }
        wx.navigateTo({
            url: path,
        })
    },
    rankingClick(){
        // 请先完成每日签到
        if(this.data.userInfo.is_sign!=1){
            wx.showModal({
                content:'请先完成每日签到！',
                showCancel:false
            })
            return
        }
        wx.navigateTo({
            url: '/pages/ranking/ranking',
        })
    },
    async siginClick(){
        let _send = 'SaHm16y6Cjdod2w_EgbZhyhjUyKA4U72QRTUwjAJE30'
        let msg = await common.subscribeMessage([_send])
        if( msg[_send]&&msg[_send]=='accept' ){
            Api.apiSend({id:_send})
        }
        if(this.data.userInfo.is_sign==1){
            wx.showModal({
                content:'当天已签到！',
                showCancel:false
            })
            return
        }
        Api.userSign().then(res=>{
            if(res.success){
                res = res.result||{}
                wx.showToast({
                    title: '签到成功！',
                    icon:"success",
                    duration:2000
                })
                let userInfo = this.data.userInfo||{}
                userInfo.is_sign = 1;
                userInfo.restrict_count['kuakua'] = userInfo.restrict_count['kuakua']+(res.count||0)
                userInfo.restrict_count['qinggan'] = userInfo.restrict_count['qinggan']+(res.count||0)
                userInfo.restrict_count['xiaohua'] = userInfo.restrict_count['xiaohua']+(res.count||0)
                this.setData({
                    userInfo:userInfo
                })
				common.LS.put('userinfo_count',userInfo);
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    },
    lookQueryIconClick(){
        this.setData({
            queryMainShow:!this.data.queryMainShow
        })
    },
    openPageUserInfo(){
        // 请先完成每日签到
        if(this.data.userInfo.is_sign!=1){
            wx.showModal({
                content:'请先完成每日签到！',
                showCancel:false
            })
            return
        }
        wx.navigateTo({
          url: '/member/userinfo/userinfo',
        })
    },
    getUserProfile(e){
        let { updata } = e.currentTarget.dataset
        console.log(e)
        wx.getUserProfile({
            desc: '用于完善会员资料！', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (item) => {
                Api.userCreate({
                    updata:1,
                    userInfo:item.userInfo
                },!updata).then(res=>{
                    if(res.success){
                        var userInfo = this.data.userInfo;
                        userInfo = Object.assign(userInfo,res.result);
                        this.setData({
                            userInfo:userInfo
                        })
                        common.LS.put('userinfo_count',userInfo);
                        if(!updata) this.siginClick()
                    }else{
                        wx.showModal({
                            content: res.msg,
                            showCancel:false
                        })
                    }
                })
            },
        })
    },
    getUserInfo(){
        Api.userInfo().then(res=>{
            if(res.success){
                res = res.result||{};
                this.setData({
                    userInfo:res
                })
				common.LS.put('userinfo_count',res);
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
            this.setData({
                pageShow:true
            })
        })
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