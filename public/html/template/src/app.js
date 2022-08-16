import Vue from "vue";
import { Dialog,Toast,Popup,Area,DatetimePicker } from 'vant';
import Loading from "vendor/ui/loading";
require("assets/css/cropper.css");
require("assets/css/vant/index.css");
require("assets/css/swiper.css");
require("assets/scss/reset.scss");
require("assets/scss/global.scss");
require("vendor/utils/vconsole.js");
let _origin = window.location.origin;
const weixin = require("vendor/weixin/weixin");
import ls from 'vendor/utils/cz-storage';
export const LS = ls;
import query from "vendor/utils/getUrlParms";

Vue.use(Popup);
Vue.use(Area);
Vue.use(DatetimePicker);

let appid = query('appid')||sessionStorage.appid||''; 
if( appid ){
    sessionStorage.appid = appid;
}

/**
 * 全局配置
 */
export const config = {
    serverPath: _origin.indexOf('localhost')!=-1?'https://express-fl55-1632003-1301447037.ap-shanghai.run.tcloudbase.com/':window["serverPath"], 
    // serverPath: window["serverPath"]||'https://ling.intonecc.com/', 
    ossPath: "https://ling-files.eintone.com/",
    mapTxKey: 'LKZBZ-DVTC3-5IV3F-YUGU7-VV6UE-ANFZC',
}
console.log('config',config);
/**
 * 事件管理中心
 */
export const globalDispatcher = new Vue();

export const flash = null;

/**
 * ui
 */
export{ Dialog, Loading, Toast };

/**
 * 百度统计初始化
 */
tracking.baiduInit("");

/**
 * 微信jssdk初始化
 */ 
console.info("微信jssdk初始化...");  
var shareObj = {
    title: "",
    desc: "",
    link: '',
    imgUrl: '',
    success: function (type) {
        tracking.trackEvent(type, "wxshare", "dfw2021"); 
    },
    cancel: function () {
        
    }
};
$.getJSON("//160615fg0007.eintone.com/wx/jsticket?callback=?").done(function (res) {
    if (res.success) {
        weixin.init(res.result.ticket, res.result.appID, shareObj, false);
    }
});
/**
 * 数据管理
 */
export const appData = {};
export function pageInit(app, data={}){
    return new Vue({
        el: "#app",
        data: data,
        render:h=>h(app),
    });
}
