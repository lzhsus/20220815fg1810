const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        pageShow:'',
        pyqwenanItem:{},
        dialogueItem:{},
        hsjzItem:{},
        caihongpiItem:{},
        tiangouItem:{},
        dujitangItem:{},
        zaoanItem:{},
        wananItem:{},
        qiaomenItem:{},
        healthtipItem:{},
        sayloveItem:{},
        queryMainShow:false
    },
    async onLoad (options) {
        wx.showLoading({
            title:"加载中..."
        })
        await common.loadFontFaceInit('https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/fonts/czy175.ttf?','czy175')
        this.setData({
            pageShow:'index'
        })
        wx.hideLoading()
        // this.getTianapiPyqwenan()
        // this.getTianapiDialogue()
        // this.getTianapiHsjz()
        // this.getTianapiCaihongpi()
    },
    lookQueryIconClick(){
        this.setData({
            queryMainShow:!this.data.queryMainShow
        })
    },
    copyViewClick(e){
        let { content } = e.currentTarget.dataset;
        common.setClipboardData(content)
    },
    // 微信优美文案
    getTianapiPyqwenan(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/pyqwenan/index",
            api:"pyqwenan",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    pyqwenanItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 经典台词
    getTianapiDialogue(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/dialogue/index",
            api:"dialogue",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    dialogueItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 互删语句
    getTianapiHsjz(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/hsjz/index",
            api:"hsjz",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    hsjzItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 彩虹屁
    getTianapiCaihongpi(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/caihongpi/index",
            api:"caihongpi",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    caihongpiItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 舔狗日志
    getTianapiTiangou(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/tiangou/index",
            api:"tiangou",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    tiangouItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 毒鸡汤
    getTianapiDujitang(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/dujitang/index",
            api:"dujitang",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    dujitangItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 早安心语
    getTianapiZaoan(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/zaoan/index",
            api:"zaoan",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    zaoanItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 晚安心语
    getTianapiWanan(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/wanan/index",
            api:"wanan",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    wananItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 生活小技巧
    getTianapiQiaomen(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/qiaomen/index",
            api:"qiaomen",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    qiaomenItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 健康小提示
    getTianapiHealthtip(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/healthtip/index",
            api:"healthtip",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    healthtipItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    getTianapiSaylove(){
        Api.tianapiPyqwenan({
            uri:"http://api.tianapi.com/txapi/saylove/index",
            api:"saylove",
            callback:'obj'
        }).then(res=>{
            if(res.success){
                res = res.result||{},
                this.setData({
                    sayloveItem:res
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    
})