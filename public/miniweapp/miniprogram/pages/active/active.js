const Verse = require('../../utils/jinrishici.js');
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';

Page({
    data: {
        activeList:[]
    },
    onLoad (opt) {
        mixinsIndex.onLoad(opt);
        this.getthirdpartyInfo()
        this.getthirdpartyInfo('http://api.tbk.dingdanxia.com/tbk/activityinfo')
    },
    getthirdpartyInfo(url){
        Api.thirdpartyInfo({
            url:url||'',
            activity_material_id:"27446"
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                let data = res.data||{}
                this.setData({
                    activeList:this.data.activeList.concat([data])
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    
    getActiveList(){
        Api.activeList().then(res=>{
            if(res['success']){
                res = res.result||{}
                this.setData({
                    activeList:res.list||[]
                })
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    },
    openWebView(e){
        let {page,pagepath,appid} = e.currentTarget.dataset;
        if(appid){
            wx.navigateToMiniProgram({
                appId: appid,
                path: pagepath,
            });
        }else{
            common.openWeappLink(page)
        }
    },
    onShow: function () {

    }
})