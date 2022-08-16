const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        list:[],
        word:'',
        isLoadEnd:false,
        loading:false,
        hotname:''
    },
    onLoad (options) {
        this.setData({
            hotname:options.hotname
        })
        // this.getGarbageData()
    },

    onShow: function () {

    },
    bindinput(e){
        this.setData({
            word:e.detail.value
        })
    },
    bindconfirm(){
        this.getGarbageData()
    },
    getGarbageData(){
        if(this.data.loading) return;
        let word = this.data.word||this.data.hotname
        if(!word){
            wx.showToast({
                title: '请输入搜索关键词',
                icon:'none',
                duration:2000
            })
            return
        }
        this.setData({
            loading:true
        })
        Api.garbageData({
            word:word
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                this.setData({
                    list:res.list||[]
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
            this.setData({
                isLoadEnd:true,
                loading:false
            })
        })
    }
})