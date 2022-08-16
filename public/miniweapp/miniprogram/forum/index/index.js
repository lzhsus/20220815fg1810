const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        forumList:[],
        userInfo:{}
    },
    async onLoad(opt) {        
        mixinsIndex.onLoad(opt);
        this.getUserInfo()
    },
    getFormatList(){
        Api.formatList().then(res=>{
            if(res.success){
                res = res.result||{}
                let list = res.list.map(item=>{
                    if(!item.list) item.list = [];
                    if(!item.list) item.list = [item];
                    
                    item.create_time = common.moment(item.create_time).format("YYYY-MM-DD HH:mm:ss")
                    return item;
                })
                this.setData({
                    forumList:list
                })
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    },
    followUserInfo(e){
        let { item,index } = e.currentTarget.dataset;
        if(item.format_num) return;
        if(this.data.userInfo.openId==item.userInfo.openId){
            wx.showToast({
                title: '不可关注自己...',
                icon:'none',
                duration:2000
            })
            return
        }
        Api.formatFollow({
            target_openId:item.userInfo.openId
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                let forumList = this.data.forumList
                forumList[index].format_num = 1;
                this.setData({
                    forumList:forumList
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    openDetail(e){
        let { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: '/forum/detail/detail?_id='+id,
        })
    },
    openPageUp(){
        wx.navigateTo({
            url: '/forum/create/create?show=true'
        })
    },
    onShow: function () {
        this.getFormatList()
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
})