const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        pageShow:'',
        rankingList:[]
    },
    async onLoad (options) {
        let res = await Api.answergameApiRanking()
        if(!res.success){ 
            wx.showModal({
                content: res.msg,
                showCancel:false
            })
            return
        }
        res = res.result||{};
        this.setData({
            pageShow:'index',
            rankingList:res.list||[]
        }) 

    },
    onShow: function () {

    },
})