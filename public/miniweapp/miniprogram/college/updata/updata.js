const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        region: [],
        yeare:'',
        scoreList:[{
            type:'',
            num01:"",
            num02:''
        }]
    },
    onLoad: function (options) {

    },
    onShow: function () {

    },
    async submitClick(){
        let list = this.data.scoreList||[]
        let province = this.data.region[0]
        
        let yeare = this.data.yeare
        for(let i=0;i<list.length;i++){
            await Api.collegeUpdata(Object.assign(list[i],{
                province:province,
                year:Number(yeare),
            }))
        }
    },
    bindRegionChange(e) {
        this.setData({
            region: e.detail.value
        })
    },
    addClickData(){
        let scoreList = this.data.scoreList;
        scoreList.push({
            type:'',
            num01:"",
            num02:''
        })
        this.setData({
            scoreList:scoreList
        })
    },
    inputChangeNum(e){
        let {index,key} = e.currentTarget.dataset;
        let scoreList = this.data.scoreList
        scoreList[index][key] = Number(e.detail.value);
        this.setData({
            scoreList:scoreList
        })
    },
    selectChangeType(e){
        console.log(e)
        let {index} = e.currentTarget.dataset
        // let itemList = ['一批','二批', '三批','艺术类本科','体育类本科','专科'];
        // let itemList = ['一批','二批', '三批','专科','艺术类','体育类'];
        let itemList = ['本科批','自主招生线', '艺术类','体育类','专科'];
        // https://www.eol.cn/e_html/gk/fsx/index.shtml
        let _this = this;
        wx.showActionSheet({
            itemList: itemList,
            success(res) {
                let scoreList = _this.data.scoreList
                console.log(index,scoreList)
                scoreList[index].type = itemList[res.tapIndex]
                _this.setData({
                    scoreList:scoreList
                })
            },
            fail(res) {
                console.log(res.errMsg)
            }
        })
    },
    opendActionSheet() {
        // let itemList = ['2021','2020', '2019','2018','2017','2016'];
        let itemList = ['2020', '2019','2018','2017','2016','2015'];
        let _this = this;
        wx.showActionSheet({
            itemList: itemList,
            success(res) {
                _this.setData({
                    yeare:itemList[res.tapIndex]
                })
            },
            fail(res) {
                console.log(res.errMsg)
            }
        })
    },
    onShareAppMessage(){
        return{
            path:"/college/updata/updata"
        }
    }
})