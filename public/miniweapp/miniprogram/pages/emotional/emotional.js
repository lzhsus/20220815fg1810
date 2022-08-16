
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';

Page({
    data: {
		isIOS:common.isIOS(),
		postCommentValue:'',
		dialogueLog:[],
		mainHeight:0
    },

    onLoad(opt) {
        mixinsIndex.onLoad(opt);
		let dialogueLog = common.LS.get('dialogueLog_emotional');
		this.setData({
			dialogueLog:dialogueLog||[]
		})
		this.scrollBottom()
    },
	sendClickMsg(){
		let {dialogueLog,postCommentValue} = this.data;
		let userinfo_count = common.LS.get('userinfo_count');
		if(userinfo_count['emotional_msg']['count']>=userinfo_count['restrict_count']['qinggan']){
			wx.showModal({
				content:"该场景使用次数已上限，请前面我的查看获取方法！",
				showCancel:false
			})
			return
		}
		if(!postCommentValue){
			wx.showToast({
			  	title: '请先选择以上类型',
				icon:"none",
			})
			return
		}
		dialogueLog.push({
			type:1,//1用户 2系统
			msg:postCommentValue,
			time:common.getNewTime(),
		})
		this.getInvokeMsg(postCommentValue)
		this.setData({
			dialogueLog:dialogueLog,
			postCommentValue:''
		})
		this.scrollBottom()
	},
    bindinput(e){
		this.setData({
			postCommentValue:e.detail.value
		})
    },
    async scrollBottom(){
		let mainHeight = this.data.mainHeight||0
		if(!mainHeight){
			mainHeight = await getMainHeight()
		}

        const query = wx.createSelectorQuery()
        query.selectAll('.main-li').boundingClientRect()
        query.exec(res=>{
			let scrollTop = 0;
            res[0].forEach(item=>{
                scrollTop=scrollTop+item.height+50;
            })
            scrollTop = scrollTop>mainHeight?scrollTop-mainHeight:0;

			this.setData({
				mainHeight:mainHeight,
				scrollTop:scrollTop+100,
			})
        })
		
		function getMainHeight() {
			return new Promise((resolve,reject)=>{
				const query = wx.createSelectorQuery()
				query.select('#mainWeapp').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec(function(res){
					console.log('res',res)
					resolve(res[0].height)
				})
			})
		}
    },
	getInvokeMsg(text){
		let {dialogueLog} = this.data;
		Api.invokeEmotional({
			p:text
		}).then(res=>{
			if(res.success){
				console.log(res)
				let avatar = appConfig.ossPath+`weixin_acatar/20210126_00${~~(Math.random()*40)+1}.jpg`;
				dialogueLog.push(Object.assign(res.result||{},{
					type:2,//1用户 2系统
					time:common.getNewTime(),
					avatar:avatar
				}))
				let userinfo_count = common.LS.get('userinfo_count');
				userinfo_count.emotional_msg['count']=userinfo_count.emotional_msg['count']+1
				common.LS.put('userinfo_count',userinfo_count);
				common.LS.put('dialogueLog_emotional',dialogueLog);
				this.setData({
					dialogueLog:dialogueLog
				})
				this.scrollBottom()
			}else{
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
			}
		})
	},
    onShareAppMessage (res) {
        let shareObj = {
            title: "从未放弃，无所畏惧的你！",
            imageUrl: "https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/share-icon.png?sign=a3405bc98afd3bbda9c76d72ee6571e9&t=1612153450",
            path: "/pages/my/my?scene=onshare",
        } 
        return shareObj;
    }
})
