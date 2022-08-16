import appConfig from '../../common/app_config';

Page({
    data: {
        webviewUrl: '',
    },

    async onLoad (opt) {
        let link = opt.link?decodeURIComponent(opt.link):appConfig[appConfig.envVersion].serverPathQH+'html/campaign/argame/index.html?music_id='+opt.music_id;
        this.setData({
            webviewUrl:link
        })
    },
    bindmessage(e){

    },
    binderror(e){
        console.log('error',e)
    },
    onShow: function () {

    },
})