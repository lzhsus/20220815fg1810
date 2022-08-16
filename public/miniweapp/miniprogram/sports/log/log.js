const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        stepList:[],
        runInfo:{},
        isindex:1
    },
    async onLoad (options) {
        await common.loadFontFaceInit('https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/fonts/Eighty-Eight.ttf','Eighty-Eight')
        this.getWxRunInfo()
    },
    changeTabIndex(e){
        let { index } = e.currentTarget.dataset;
        this.setData({
            isindex:index
        })
    },
    getWxRunInfo(){
        Api.wxRunInfo().then(res=>{
            if(res['success']){
                res = res.result||{};
                res.total['calorie_t'] = common.formatMoney(res.total['calorie']);
                res.total['step_t'] = common.formatMoney(res.total['step']||0);
                res.total['distance_t'] = common.formatMoney((res.total['distance']/1000));

                let list = (res.list||[]).map(item=>{
                    item['calorie_t'] = common.formatMoney(item['calorie']);
                    item['step_t'] = common.formatMoney(item['step']||0,0);
                    item['distance_t'] = common.formatMoney((item['distance']/1000));

                    item['time'] = common.moment(item.timestamp*1000).format("YYYY-MM-DD");
                    return item;
                })
                this.setData({
                    runInfo:res,
                    stepList:list
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    onShow: function () {

    },
})