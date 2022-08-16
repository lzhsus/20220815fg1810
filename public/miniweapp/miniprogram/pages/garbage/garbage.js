const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        type:3,
        list:[],
        hotname:'',
        isLoadEnd:false
    },
    onLoad () {
        this.getGarbageList()
        this.getGarbageHotlist()
    },
    onShow: function () {

    },
    getGarbageHotlist(){
        Api.garbageHotlist().then(res=>{
            if(res.success){
                res = res.result||{}
                this.setData({
                    hotname:res.name
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    getGarbageList(){
        Api.garbageList({
            type:this.data.type
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                this.setData({
                    list:res.list||[],
                    isLoadEnd:true
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    changeItemClick(e){
        let { index } = e.currentTarget.dataset
        this.setData({
            type:index
        })
        this.getGarbageList()
    },
    openSearchClick(){
        wx.navigateTo({
          url: '/garbage/search/search?hotname='+this.data.hotname,
        })
    }
})