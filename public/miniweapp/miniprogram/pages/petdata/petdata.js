
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        pageShow:false,
        petList:[],
        tabIndex:1,
        tabLis:[]
    },
    async onLoad (opt) {
        mixinsIndex.onLoad(opt);
        let list = await Api.tabList();
        this.setData({
            tabLis:list
        })
        this.getPetList()
    },
    getPetList(){
        Api.proPetList({
            type:this.data.tabIndex,
        }).then(res=>{
            if(res['success']){
                res = res.result||{}
                this.setData({
                    petList:res.list||[],
                    pageShow:true
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                  })
            }
        })
    },
    tabChangeClick(e){
        let {id} = e.currentTarget.dataset;
        this.setData({
            tabIndex:id
        })
        this.getPetList()
    },
    openDogDetail(e){
        let {petid,coverurl,type} = e.currentTarget.dataset;
        console.log(e)
        wx.navigateTo({
          url: '/pages/dogdetail/dogdetail?petid='+petid+"&coverurl="+coverurl+'&type='+type,
        })
    },
    onShow: function () {

    },
})