const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
import {
    setShareImgLink,
    uploadFiles
} from '../../services/uploadFile.js';
Page({
    data: {
        createList:[{img_url:"",msg:''}],
        userInfo:{},
        img_url:'',
        addressChecked:false,
        address:'',
        createShow:false
    },
    async onLoad(opt) {     
        this.setData({createShow:opt.show||false})   
        mixinsIndex.onLoad(opt);
        this.getUserInfo()
        wx.setNavigationBarTitle({
            title: this.data.createShow?"发布":"敬请期待"
        })
    },
    onShow: function () {
    },
    openAddressData(){
        if(this.data.addressChecked){
            this.setData({
                addressChecked:false
            })
            return
        }
        wx.choosePoi({
            success:res=>{
                console.log(res)
                if(res.type==0){
                    this.setData({
                        addressChecked:false,
                        address:''
                    })
                }
                if(res.type==1){
                    this.setData({
                        addressChecked:true,
                        address:res.city
                    })
                }
                if(res.type==2){
                    this.setData({
                        addressChecked:true,
                        address:res.address+' '+res.name
                    })
                }
            },
            fail:err=>{
                this.setData({
                    addressChecked:false
                })
            }
        })
    },
    adddataClick(){
        let createList = this.data.createList
        createList.push({img_url:"",msg:''})
        this.setData({
            createList:createList
        })
    },
    delClick(e){
        let {index} = e.currentTarget.dataset;
        let createList = this.data.createList
        createList.splice(index,1)
        this.setData({
            createList:createList
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
    bindinput(e){
        let {index} = e.currentTarget.dataset;
        let createList = this.data.createList;

        createList[index].msg = e.detail.value;
        this.setData({
            createList:createList
        })
    },
    openImageClick(e){
        let {index} = e.currentTarget.dataset;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: async (res) => {
                // tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;

                let createList = this.data.createList;
                createList[index].img_url = tempFilePaths[0]
                this.setData({
                    createList:createList
                })
            }
        })
    },
    async submitClick(){
        // if(!this.data.desc||!this.data.img_url){
        //     wx.showModal({
        //         content: '请选择图片已经信息描述！',
        //         showCancel:false
        //     })
        //     return
        // }
        wx.showLoading({
            title:'加载中',
            mask:true
        });
        let createList = this.data.createList
        for(let i=0;i<createList.length;i++){
            let image = await common.compressImage2(createList[i].img_url);
            var images = await uploadFiles([image], 'forum')
            createList[i].img_url = images[0].fileID.replace("cloud://lzhsus-1g4h29bs69c66542.6c7a-lzhsus-1g4h29bs69c66542-1301447037/","https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/")
        }
        Api.formatUp({
            // desc:this.data.desc,
            // img_url:images[0].fileID.replace("cloud://lzhsus-1g4h29bs69c66542.6c7a-lzhsus-1g4h29bs69c66542-1301447037/","https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/"),
            list:createList,
            address:this.data.addressChecked?this.data.address:'',
            userInfo:{
                avatarUrl:this.data.userInfo.avatarUrl,
                nickName:this.data.userInfo.nickName,
                openId:this.data.userInfo.openId,
                unionId:this.data.userInfo.unionId||"",
                gender:this.data.userInfo.gender||"",
            }
        }).then(res=>{
            wx.hideLoading()
            if(res.success){
                wx.showToast({
                    title: '提交成功',
                })
                setTimeout(()=>{
                    wx.navigateBack()
                },1000)
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    }
})