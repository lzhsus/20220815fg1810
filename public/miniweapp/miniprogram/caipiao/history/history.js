
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
Page({
    data: {
        todayDayList:[],
        code:'',
        priceNum:0,
        consumeNum:0,
        consume_count:0,
        win_count:0
    },
    async onLoad (options) {
        let res =  await Api.userInfo();
        if(!res.success){
            wx.showModal({
                content: res.msg,
                showCancel:false
            })
        }
        res = res.result||{}
        if(res.isCaipiao!=1) return;
        wx.setNavigationBarTitle({
            title: '创建记录'
        })
        this.getCaipiaoList()
    },
    getCaipiaoList(){
        Api.caipiaoList({
            day:''
        }).then(res=>{
            if(res.success){
                res = res.result||{}
                let list = (res.list||[]).map(item=>{
                    // item.day2 = common.moment(item.day).format("YYYY-MM-DD");
                    return item;
                })
                console.log('list',list)
                let arr = []
                let priceNum = 0
                for(let i=0;i<list.length;i++){
                    // 检查是否存在
                    if(arr.some(item=>{ return list[i].day2==item.day2 })){
                        for(let j=0;j<arr.length;j++){
                            if(arr[j].day2==list[i].day2){
                                arr[j].win_code = list[i].win_code||arr[j].win_code
                                arr[j].period = list[i].period||arr[j].period
                                arr[j].list2.push(list[i])
                            }
                        }
                    }else{
                        arr.push({
                            day2:list[i].day2,
                            win_code:list[i].win_code||'',
                            period:list[i].period,
                            list2:[list[i]]
                        })
                    }
                }
                let _num  = 0
                arr.forEach(item=>{
                    if(item.win_code&&item.win_code.length){
                        let list01 = item.win_code.slice(0,5);
                        let list02 = item.win_code.slice(5);
                        item.list2 = item.list2.map(obj=>{
                            let oneNum = 0;
                            let towNum = 0;
                            obj.list.forEach(element=>{
                                element.show = false;
                                if(element.type==1){
                                    if(list01.indexOf(element.num)!=-1){
                                        element.show = true
                                        oneNum++
                                    };
                                }
                                if(element.type==2){
                                    if(list02.indexOf(element.num)!=-1){
                                        element.show = true
                                        towNum++
                                    };
                                }
                            })
                            obj.price = 0
                            if(oneNum==5&&towNum==2){
                                obj.price = '1A+0'
                            }else if(oneNum==5&&towNum==1){
                                obj.price = '1B+0'
                            }else if(oneNum==5&&towNum==0){
                                obj.price = 10000
                            }else if(oneNum==4&&towNum==2){
                                obj.price = 3000
                            }else if(oneNum==4&&towNum==1){
                                obj.price = 300
                            }else if(oneNum==4&&towNum==0){
                                obj.price = 100
                            }else if(oneNum==3&&towNum==2){
                                obj.price = 200
                            }else if(oneNum==3&&towNum==1||oneNum==2&&towNum==2){
                                obj.price = 15
                            }else if(oneNum==3&&towNum==0||oneNum==2&&towNum==1||oneNum==1&&towNum==2||oneNum==0&&towNum==2){
                                obj.price = 5
                            }else{
                                obj.price = 0
                            }
                            obj.price = obj.price+'';
                            if(obj.price!=0) _num++
                            priceNum+=Number(obj.price)
                            return obj;
                        })
                    }
                })
                console.log('arr',arr)
                this.setData({
                    todayDayList:arr,
                    priceNum:priceNum,
                    consumeNum:Number(res.count)*2,
                    consume_count:res.count,
                    win_count:_num
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel:false
                })
            }
        })
    },
    selectTodayTiem(e){
        let { index } = e.currentTarget.dataset;
        let item = this.data.todayDayList[index]
        if(item.win_code.length){
            wx.showToast({
                title: '该日期已发布！',
                icon:"none"
            })
            return 
        }
        wx.showToast({
            title: '已标记时间'+item.day2,
            icon:"none"
        })
        this.setData({
            day2:item.day2
        })
    },
    openChangeRule(){
        this.setData({
            popShow:'rule'
        })
    },
    cloreChangeRule(){
        this.setData({
            popShow:''
        })
    },
    inputCode(e){
        let { value } = e.detail
        this.setData({
            code:value
        })
    },
    onShow: function () {

    },
})