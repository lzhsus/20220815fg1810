const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        pageShow:'',
        qaList:[],
        qaItem:{},
        index:0,
        resultData:{},
        resultListData:[],
        gameOver:false,
        isQaResult:-1, 
        code:""
    },
    async onLoad (opt) {
        this.setData({  
            code:opt.code
        })
        this.getAnswergameApiLevelsdetail(opt.code)
    },
    getAnswergameApiLevelsdetail(code){
        return Api.answergameApiLevelsdetail({count:false,code:code}).then(res=>{
            if(res.success){
                res = res.result||[]
                let list = res.map(item=>{
                    item.choice = ''
                    return item;
                })
                console.log(res)
                this.setData({
                    qaList:list,
                    qaItem:list[0],
                    pageShow:'index'
                })
            }else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
            }
        })
    },
    // 选择其中一题
    async choiceQaItem(e){
        let { key } = e.currentTarget.dataset;
        let { resultListData,qaItem } = this.data;
        qaItem.qa_choice = key;
        // 得分
        let isQaResult = 0;
        qaItem.isScore = 0;
        if(key==qaItem.qa.result){
            qaItem.isScore = 1;
            isQaResult = 1;
        }
        resultListData.push(qaItem)
        this.setData({
            resultListData:resultListData,
            qaItem:qaItem,
            isQaResult:isQaResult
        })
        // 记录这一题结果
        wx.showLoading({
          title: '下一题准备中...',
        })
        let item = JSON.parse(JSON.stringify(qaItem));
            delete item._id;
        await Api.answergameApiQaAnswerItem(item)
        setTimeout(()=>{
            wx.hideLoading()
            this.nextQaItem()
        },1000)
    },
    // 
    nextQaItem(){
        let { index,qaList } = this.data;
        index = index+1;
        // 最后一题
        console.log(index,qaList.length)
        if(index>=qaList.length){
            this.getAnswergameApiCreate()
            return
        }
        this.setData({
            qaItem:qaList[index],
            index:index,
            isQaResult:-1
        })
    },
    setresultListData(){
        let resultListData = this.data.resultListData;
        let data = {
            score:resultListData.filter(item=>{ return item.isScore }).length,
            code:resultListData[0].code,
            level:resultListData[0].level,
            qa_id:resultListData[0].qa_id,
            data:resultListData
        }
        return data;
    },
    // 提交结果
    getAnswergameApiCreate(){
        let data = this.setresultListData()
        console.log(data)
        Api.answergameApiCreate(data).then(res=>{
            if(res.success){
                res = res.result||{};

                this.setData({
                    gameOver:true,
                    resultData:data
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    backHome(){
        wx.navigateBack()
    },
    againGame(){
        this.setData({
            qaList:[],
            qaItem:{},
            index:0,
            resultData:{},
            resultListData:[],
            gameOver:false,
        })
        this.getAnswergameApiLevelsdetail(this.data.code)
    },
    onShow() {
        
    },
})