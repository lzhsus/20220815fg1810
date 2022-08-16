const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';
let customs = require('./customs');
Page({
    data: {
        popShow:"",
        pageUnload:false,
        userInfo:{},
        customsList:[],

        _editCustomsItem:{},
        _defaultIndex:0,
        
    },

    async onLoad (options) {
        console.log(customs)
        let res = await Api.getYugongUserInfo()
        if(!res.success){
            wx.showModal({
                content: res.msg,
                showCancel:false
            })
            return
        }
        res = res.result||{};
        res._createChildSpeed = res.createChildSpeed.toFixed(2)
        let customsList = customs.map(item=>{
            res.customs.forEach((e)=>{
                if(e.id==item.id){
                    item = Object.assign(item,e)
                }
            })
            if(item.num>item._num.length){
                item.needChild = item._num[item._num.length-1];
            }else{
                item.needChild = item._num[item.num];
            }
            return item;
        })
        this.setData({
            pageShow:'index',
            userInfo:res,
            customsList:customsList
        })
        this.updataInitDefault()
    },
    onShow () {

    },
    // 点击房子
    tickClickHouse(){
        let { userInfo } = this.data;
        userInfo.maxChildNumber = userInfo.maxChildNumber+userInfo.houseClass;
        userInfo.childNumber = userInfo.childNumber+userInfo.houseClass;
        this.setData({ userInfo })
    },
    // 初始化更新
    updataInitDefault(){
        this.updataMaxChildNumber();
        this.updataChildNumber();
    },
    // 实时更新显示的数量
    updataChildNumber(){
        let { pageUnload,userInfo } = this.data;
        if(pageUnload) return;
        setTimeout(()=>{
            this.updataChildNumber()
            if(userInfo.childNumber>=userInfo.maxChildNumber) return;
            let _num = parseInt(userInfo.createChildSpeed/10);
            userInfo.childNumber = userInfo.childNumber + (_num<=0?1:_num);
            this.setData({ userInfo })
        },100)
    },
    // 每秒更新最大数量
    updataMaxChildNumber(){
        let { pageUnload,userInfo } = this.data;
        if(pageUnload) return;
        setTimeout(()=>{
            userInfo.maxChildNumber = userInfo.maxChildNumber+userInfo.createChildSpeed;
            this.updataMaxChildNumber()
            this.setData({ userInfo })
        },1000)
    },
    // 更新生成子孙的速度
    updataCreateChildSpeed(){
        let { userInfo,customsList } = this.data;
        let _speed = 1
        customsList.forEach((item=>{
            if(item.isOpen&&item.num>=1){
                _speed+=item.num*item.speed
            }
        }))
        userInfo.createChildSpeed = _speed
        this.setData({ userInfo })
    },
    // 选择要派遣的等级 
    openJoinCustom(e){
        let { customsList } = this.data;
        let { item,index } = e.currentTarget.dataset;

        if(customsList.length-1!=index){
            item._next = customsList[index+1].nextNum
        }
        this.setData({
            _defaultIndex:index,
            _editCustomsItem:item,
            popShow:'_editCustoms'
        })
    },
    // 确认派遣
    submitCustoms(){
        let { customsList,_editCustomsItem,userInfo,_defaultIndex } = this.data;
        if(userInfo.childNumber<_editCustomsItem.needChild){
            wx.showToast({
                title: '当前子孙数量不足\n\n点击屏幕生成吧！',
                icon:"none"
            })
            this.setData({popShow:''})
            return
        }
        let _index = 0;
        userInfo.maxChildNumber = userInfo.maxChildNumber-_editCustomsItem.needChild;
        userInfo.childNumber = userInfo.childNumber-_editCustomsItem.needChild;
        
        customsList.forEach(((item,index)=>{
            if(item.id==_editCustomsItem.id){
                item.num++;
                _index = index
                if(item.num>item._num.length){
                    item.needChild = item._num[item._num.length-1];
                }else{
                    item.needChild = item._num[item.num];
                }
            }
        }))
        // 当前等级大于下一级需要的数量
        if(customsList[_index].num>=customsList[_index+1].nextNum){
            customsList[_index+1].isOpen = true;
        }
        this.setData({customsList,userInfo})
        this.updataCreateChildSpeed()

        
        this.openJoinCustom({currentTarget:{
            dataset:{
                item:customsList[_defaultIndex],
                index:_defaultIndex
            }
        }})
    },
    closePop(){
        this.setData({
            popShow:''
        })
    },
    getUpdataYugongData(data){
        let { userInfo,customsList } = this.data;
        let customs = customsList.filter(item=>{ return item.isOpen }).map(item=>{ return {id:item.id,num:item.num,isOpen:item.isOpen} })
        Api.updataYugongData({
            updata:true,
            data:{
                maxChildNumber:userInfo.maxChildNumber,
                createChildSpeed:userInfo.createChildSpeed,
                childNumber:parseInt(userInfo.maxChildNumber),
                customs:customs||[]
            }
        })
    },
    onHide(){
        this.getUpdataYugongData()
    },
    onUnload(){
        this.getUpdataYugongData()
        this.setData({
            pageUnload:true
        })
    }
})