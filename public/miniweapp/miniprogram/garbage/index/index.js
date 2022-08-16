const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {

    },
    onLoad (options) {
        // this.getGarbageData()
    },

    onShow: function () {

    },
    openSearchClick(){
        wx.navigateTo({
          url: '/garbage/search/search',
        })
    }
})