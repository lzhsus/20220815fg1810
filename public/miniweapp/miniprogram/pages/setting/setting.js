const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({

    data: {
        pageShow:false,
        subscribeList: [],
    },

    async onLoad(options) {
        let _sendlist = await Api._sendData();
        let res = await Api.apiSend({},true);
        if(!res['success']){
            wx.showModal({
                content:res.mag,
                showCancel:false
            })
            return;
        }
        res = res.result||{};
        _sendlist = _sendlist.map(item=>{
            let count = res.list.filter((obj)=>{ return item.id==obj.id; })
            item.count = count.length;
            return Object.assign(item,item.count?count[0]:{});
        })

        this.setData({
            subscribeList:_sendlist,
            pageShow:true
        })
    },
    // 订阅
   async subscribeSubmit(e) {
       let { index,item } = e.currentTarget.dataset;
       let subscribeList = this.data.subscribeList;
        wx.showLoading({
            title: '加载中',
        })
        let _send = item.id
        let msg = await common.subscribeMessage([_send])
        if( msg[_send]&&msg[_send]=='accept' ){
            await Api.apiSend({id:_send})
            subscribeList[index].count = subscribeList[index].count + 1;
            this.setData({
                subscribeList:subscribeList
            })
            wx.showToast({
                title: '设置提醒成功！',
                icon: 'none',
                duration: 2000
            })
        }
        wx.hideLoading()
    },
    openSetting() {
        wx.openSetting({
            withSubscriptions: true,
            success: (res) => {
                if (res.subscriptionsSetting.mainSwitch) {
                    wx.showModal({
                        content: "您已成功开通订阅消息提醒！",
                        showCancel: false
                    })
                } else {
                    wx.showModal({
                        content: "您已拒绝接受订阅消息提醒,您将不在接受任何形式的消息提醒！",
                        showCancel: false
                    })
                }
            }
        })
    },
})