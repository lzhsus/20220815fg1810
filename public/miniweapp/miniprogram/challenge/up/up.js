const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';

Page({
    data: {
        pageShow:"",
        levels:[],
        qa:{},
        qa_id:-1
    },

    async onLoad (options) {
        await this.getAnswergameApiLevels()
    },
    getAnswergameApiLevels(){
        return Api.answergameApiLevels().then(res=>{
            if(res.success){
                res = res.result||{};
                this.setData({
                    pageShow:"index",
                    levels:(res.list||[]).map(item=>{ return Object.assign(item,{show:false}) })
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        });
    },
    getAnswergameApiLevelsdetail(code,index){
        return Api.answergameApiLevelsdetail({count:true,code:code}).then(res=>{
            if(res.success){
                res = res.result||{}
                if(res.qa_id==12){
                    wx.showToast({
                        title: '该题库已经录入完成！',
                        icon:'none'
                    })
                    return
                }
                let levels = this.data.levels;
                levels = levels.map(item=>{ return Object.assign(item,{show:false}) });
                levels[index].show = true;
                this.setData({qa_id:res.qa_id||0,levels:levels})
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    },
    async changeTagClick(e){
        let { index } = e.target.dataset;
        let levels = this.data.levels;
        await this.getAnswergameApiLevelsdetail(levels[index].code,index)
    },
    inputTap(e){
        let { name } = e.target.dataset;
        let qa = this.data.qa;
        qa[name] = e.detail;
        this.setData({qa})
    },
    submitClick(){
        let levels = this.data.levels.filter(item=>{ return item.show; })
        if(!levels.length){
            wx.showToast({
                title: '请选择第几关',
                icon:"none"
            })
            return
        }
        let data = {
            level:levels[0].level,
            code:levels[0].code,
            qa_id:this.data.qa_id+1,
            qa:this.data.qa
        } 
        Api.answergameApiUp(data).then(res=>{
            if(res.success){
                this.setData({qa:{}})
                this.getAnswergameApiLevels()
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false 
                })
            }
        })
        console.log(data)
    },
    onShow: function () {

    },
})