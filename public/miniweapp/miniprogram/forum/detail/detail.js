const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        userInfo:{},
        itemDetail:{},
        postCommentValue:"",
        placeholder:"请输入评论内容...",
        target_user:{},
    },
    async onLoad(opt) {        
        mixinsIndex.onLoad(opt);
        this.getUserInfo()
        if(!opt._id){
            wx.showModal({
                content: '文章id不存在！',
                showCancel:false,
                success:()=>{
                    wx.switchTab({
                      url: '/pages/my/my',
                    })
                }
            })
            return
        }
        let res = await Api.formatDetail({_id:opt._id})
        if(!res.success){
            wx.showModal({
                content: res.msg,
                showCancel:false
            })
            return
        }
        res = res.result||{}
        this.setComment(res)
    },

    onShow: function () {
    },
    setComment(res){
        let comment = res.comment||[]
        comment = comment.map(item=>{
            item.time = common.moment(new Date(res.create_time)).format("YYYY-MM-DD HH:mm:ss")
            item.userInfo.mobile = item.userInfo.mobile?common.checkMobileTxt(item.userInfo.mobile+''):item.userInfo.nickName
            return item;
        })

        for(let i=0;i<comment.length-1;i++){
            for(let j=0;j<comment.length-1;j++){
                if(comment[i]._id==comment[j+1].target_user._id){
                    let list = comment[i].targetList||[]
                    list.push(comment[j+1])
                    comment[j+1].show = true;
                    comment[i].targetList = list;
                }
            }
        }
        comment = comment.filter(item=>{ return !item.show; })
        res.comment = comment
        if(!res.list) res.list = [{img_url:res.img_url,msg:res.msg||res.desc||res.msg.value}]
        console.log(res)
        this.setData({
            itemDetail:res
        })
    },
    selClickTarget(e){
        let { item } = e.currentTarget.dataset;
        let { target_user,placeholder } = this.data;
        console.log(item)
        if(target_user&&target_user.userInfo){
            target_user = {}
            placeholder = '请输入评论内容...'
        }else{
            target_user.userInfo = item.userInfo;
            placeholder = "正在回复@"+item.userInfo.nickName
        }
        this.setData({
            target_user:target_user,
            placeholder:placeholder
        })
    },
    bindinput(e){
        this.setData({
            postCommentValue:e.detail.value
        })
    },
    bindconfirm(){
        console.log(this.data.itemDetail)
        if(!this.data.postCommentValue){
            wx.showToast({
                title: '评论信息不可为空！',
                icon:"none",
                duration:2000
            })
            return
        }
        let { postCommentValue,itemDetail,userInfo,target_user } = this.data;
        let data = {
            msg:postCommentValue,
            pro_id:itemDetail._id,
            userInfo:userInfo,
            target_user:target_user,
            id:common.moment().format("YYYYMMDDHHMMSS")
        }
        Api.formatCommentt(data).then(res=>{
            if(res.success){
                res= res.result||{}
                let itemDetail = this.data.itemDetail;
                if(target_user&&target_user.userInfo){
                    itemDetail.comment.forEach(element => {
                        if(element.userInfo.openId==target_user.userInfo.openId){
                            element.targetList.push(Object.assign(data,{
                                time:common.moment().format("YYYY-MM-DD HH:mm:ss"),
                                openId:itemDetail.openId
                            }))
                        }
                    });
                }else{
                    itemDetail.comment.push(Object.assign(data,{
                        time:common.moment().format("YYYY-MM-DD HH:mm:ss"),
                        openId:itemDetail.openId
                    }))
                }
                this.setComment(itemDetail)
                this.setData({
                    postCommentValue:''
                })

                wx.showToast({
                    title: '评论成功！',
                    icon:"none",
                    duration:2000
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    getUserInfo(){
        Api.userInfo().then(res=>{
            if(res.success){
                res = res.result||{};
                if(!res.avatarUrl){
                    wx.showModal({
                        content: '您当前暂未获取用户信息，请先到我的页面完成签到',
                        showCancel:false,
                        success:()=>{
                            wx.switchTab({
                              url: '/pages/my/my',
                            })
                        }
                    })
                }
                this.setData({
                    userInfo:res
                })
            }
        })
    },
    onShareAppMessage(e){
        let shareObj = {}
        if(e.from=='button'){
            let { id,imageurl,name } = e.target.dataset
            shareObj = {
                title:name,
                imageUrl:imageurl,
                path:"/forum/detail/detail?_id="+id
            }
        }else{
            shareObj = {
                title:"H羞羞语言",
                imageUrl:"",
                path:"/pages/my/my"
            }
        }
        return shareObj;
    }
})