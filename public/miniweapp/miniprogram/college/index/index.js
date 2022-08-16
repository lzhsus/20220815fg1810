const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        list:[],
        yearList:[2021,2020,2019,2018,2017,2016,2015],
        yearIndex:0,
        provinceList:["北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西壮族自治区","海南省","重庆市","四川省","贵州省","云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区","台湾省","香港特别行政区","澳门特别行政区"],
        provinceIndex:0,
        provinceShow:false,
        default_provinceIndex:0,
        isTow:false
    },
    onLoad: function (options) {
        
    },
    onShow: function () {

    },
    openEchartClick(){
        wx.navigateTo({
          url: '/college/chart/chart?province='+this.data.provinceList[this.data.provinceIndex]
        })
    },
    changeYearClick(e){
        let { index } = e.currentTarget.dataset;
        this.setData({
            yearIndex:index
        })
        this.getcollegeList()
    },
    provinceChangeClick(e){
        let { index } = e.currentTarget.dataset;
        this.setData({provinceIndex:index})
    },
    openProvinceChange(){
        this.setData({
            provinceShow:true
        })
    },
    provinceCancel(){
        this.setData({provinceIndex:this.data.default_provinceIndex,provinceShow:false})
    },
    provinceConfirm(){
        this.setData({
            default_provinceIndex:this.data.provinceIndex,
            provinceShow:false
        })
        this.getcollegeList()
    },
    getcollegeList(){
        Api.collegeList({
            province:this.data.provinceList[this.data.provinceIndex],
            year:Number(this.data.yearList[this.data.yearIndex]),
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                let list = res.list||[]
                let isTow = false
                if(list.some(item=>{ return item.num02 })){
                    isTow = true
                }
                this.setData({
                    list:list,
                    isTow:isTow
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    }
})