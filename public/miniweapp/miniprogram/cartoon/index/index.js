const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
import { haibaoGet,cardImages } from './haibao';
Page({
    data: {
        pageShow: '',
        o:{w:750,h:900},
        haibaoImgurl:""
    },
    async onLoad(options) {

        wx.showLoading({
          title: '信息初始化..',
        })
        await this.initCanvas();
        
        await cardImages("haibaoCanvas")
        
        wx.hideLoading()
        wx.showToast({
            title: '初始化完成',
            icon:"none",
            duration:1000
        })
    },
    async createHaiBaoImage(){
        let haibaoImgurl = await haibaoGet({
            isComponents:true,
            id: "haibaoCanvas",
            width:this.data.o.w,
            height:this.data.o.h,
            text:"103",
            color:"#54c7e9"
        });
        console.log('haibaoImgurl',haibaoImgurl)
        this.setData({
            haibaoImgurl:haibaoImgurl
        })
    },
    onShow: function () {

    },
    async initCanvas(){
        // 初始化图片
        const _this = this;
        return new Promise((resolve,rejects)=>{
            const query = wx.createSelectorQuery();
            query.select("#canvasBox").fields({ size: true }).exec((res) => {   
                console.log(res)
                let o = {w:750,h:900}
                if(res&&res.length){
                    o = {
                        w:res[0].width*2,
                        h:res[0].height*2
                    }
                }
                console.log(o)
                _this.setData({o})
                resolve()
            })
        })
    }
})