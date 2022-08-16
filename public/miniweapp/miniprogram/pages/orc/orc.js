const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
import {uploadFile} from '../../services/uploadFile';

Page({
    data: {

    },
    onLoad(options) {
        
    },
    success(data){
        Api.wxServerApiCreate(data).then(res=>{
            if(res['success']){
                console.log(res)
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