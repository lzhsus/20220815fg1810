const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        promotionList:[],
        qrImg:""
    },
    async onLoad (options) {
        let res = await Api.promotionList()
        if(!res.success){
            wx.showModal({
                content: res.msg,
                showCancel:false
            })
            return
        }
        res = res.result||{}
        this.setData({
            promotionList:res.list
        })
    },
    openQRCode(e){
        let { item } = e.target.dataset;
        wx.previewImage({
            current: item.qrImg, // 当前显示图片的http链接
            urls: [item.qrImg] // 需要预览的图片http链接列表
        })
    },
    openShare(e){
        let { item } = e.target.dataset;
        wx.setClipboardData({
            data:item.share_txt,
            success:function (res) {
                wx.showToast({
                    title: '复制成功',
                    icon:"none"
                })
            }
        })
    },
    onShow: function () {

    },

})