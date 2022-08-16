import * as echarts from '../../utils/echart/echarts';
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        pageShow:'',
        gameUserInfo:{},
        levels:[]
    },
    async onLoad (options) {
        let res = await Api.answergameApiInfo();
        if(!res.success){
            wx.showModal({
                content: res.msg, 
                showCancel:false
            })
            return
        }
        res = res.result||{}
        console.log(res)
        this.setData({
            gameUserInfo:res
        })
        this.getAnswergameApiLevels() 
    },
    getAnswergameApiLevels(){
        let levels = this.data.gameUserInfo.levels||[];
        return Api.answergameApiLevels().then(res=>{
            if(res.success){
                res = res.result||{};
                let list = res.list||[];
                list = list.map((item,index)=>{
                    let arr = levels.filter(obj=>{ return obj.code==item.code });
                    if(arr.length){
                        item.score = arr[0].score
                    }
                    item.curGrade = common.gradeImage(item.level);
                    console.log(item.curGrade)
                    if(item.score>=12){
                        item.grades = 3
                    }else if(item.score>=5){
                        item.grades = 2
                    }else if(item.score>=1){
                        item.grades = 1
                    }else{
                        item.grades = 0
                    }
                    // 检查上一级
                    item.unlock = false;
                    if(index!=0){
                        if(list[index-1].grades>=2){
                            item.unlock = true;
                        }
                    }else{
                        item.unlock = true;
                    }
                    return item; 
                })
                this.setData({
                    pageShow:"index",
                    levels:list
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        });
    },
    openClickLevel(e){
        let { item } = e.currentTarget.dataset;
        // 检查当前关卡是否开启
        if(!item.unlock){
            wx.showToast({
              title: '您暂未开启当前关卡！',
              icon:"none"
            })
            return
        }
        wx.navigateTo({
          url: '/challenge/qa/qa?code='+item.code,
        })
    },
    openRankingPageClick(){
        wx.navigateTo({
          url: '/challenge/ranking/ranking'
        })
    },
    onShow: function () {

    },
})