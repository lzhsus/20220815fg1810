const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';

Page({
    data: {
        rankingList:[]
    },
    onLoad (opt) {
        mixinsIndex.onLoad(opt);
        this.getUserRankinglist()
    },
    onShow: function () {

    },
    // 上拉监控
    onPullDownRefresh(){    
        appConfig.stopPullDownRefresh = true
        this.getUserRankinglist()
    },
    getUserRankinglist(){
        Api.userRankinglist().then(res=>{
            if(res.success){
                res = res.result||{}
                let list = res.list||[]
                list = list.map(item=>{
                    item.timetext = common.formatSeconds(item.time,'zh')+''
                    return item
                })
                this.setData({
                    rankingList:list
                })
                if( appConfig.stopPullDownRefresh ) {
                    wx.stopPullDownRefresh()
                    appConfig.stopPullDownRefresh = false
                }
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
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