import Api from '../services/api/index';
import appConfig from '../common/app_config';

export default {
    data: {
        pageShow: '',
        popShow: '',
        prePop: '',
    },
    methods: {

    },
    onLoad(opt) {
        let q = opt['q']?decodeURIComponent(opt.q):'';
        appConfig.scene = opt['scene']? decodeURIComponent(opt.scene):appConfig.scene||'';
        appConfig.scene = q||appConfig.scene
        if( appConfig.scene ) {
            wx.reportAnalytics('scene', {
                scene: appConfig.scene||'',
            });
        }
    }
}
