
const Api = require('../../services/api/index');
import * as common from '../../common/common';
import appConfig from '../../common/app_config';
import mixinsIndex from '../../mixins/index';

Page({
    data: {
		isIOS:common.isIOS(),
		postCommentValue:'',
		mode:0,
		dialogueLog:[],
		mainHeight:0,
		
		windowWidth: 0,
		windowHeight: 0,
		x:0,
		y:0,
		xp:0, //标记每次移动的起始点
		yp:0,
    },

    onLoad(opt) {
        mixinsIndex.onLoad(opt);
		this.wxGetSystemInfoSync()
		let dialogueLog = common.LS.get('dialogueLog_msg');
		this.setData({
			dialogueLog:dialogueLog||[]
		})
		this.scrollBottom()
    },
	sendClickMsg(){
		let {dialogueLog,postCommentValue,mode} = this.data;
		let userinfo_count = common.LS.get('userinfo_count');
		if(userinfo_count['jokebot_msg']['count']>=userinfo_count['restrict_count']['xiaohua']){
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
			mode:mode,
			time:common.getNewTime(),
		})
		this.getInvokeMsg(mode)
		this.setData({
			dialogueLog:dialogueLog,
			mode:0,
			postCommentValue:''
		})
		this.scrollBottom()
	},
	changeTageClick(e){
		let { mode,text } = e.currentTarget.dataset;
		this.setData({
			mode:mode,
			postCommentValue:text
		})
	},
	copyClick(e){
		let { msg } = e.currentTarget.dataset;
		common.copyData(msg)
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
	getInvokeMsg(mode){
		let {dialogueLog} = this.data;
		Api.invokeMsg({
			mode:mode||1
		}).then(res=>{
			if(res.success){
				let avatar = appConfig.ossPath+`weixin_acatar/20210126_00${~~(Math.random()*40)+1}.jpg`;
				dialogueLog.push(Object.assign(res.result||{},{
					type:2,//1用户 2系统
					time:common.getNewTime(),
					avatar:avatar
				}))
				let userinfo_count = common.LS.get('userinfo_count');
				userinfo_count['jokebot_msg']['count']=userinfo_count['jokebot_msg']['count']+1
				common.LS.put('userinfo_count',userinfo_count);
				common.LS.put('dialogueLog_msg',dialogueLog);
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
	move(e) {
		this.setData({
			xp:e.detail.x,
			yp:e.detail.y,
		})
	},
	touchStart() {},
	touchEnd(e) {
		this.setData({
			y:this.data.yp>500?500:this.data.yp,
		})
		let isTrue = this.data.xp>=this.data.windowWidth/2?1:0;
		this.setData({
			x:isTrue==1?this.data.windowWidth:0,
		})
	},
	wxGetSystemInfoSync() {
		return new Promise((resolve, reject) => {
			try {
				const {
					windowWidth,
					windowHeight
				} = wx.getSystemInfoSync();
				this.setData({
					windowWidth: windowWidth,
					windowHeight: windowHeight
				})
				resolve()
			} catch (e) {
				this.setData({
					windowWidth: 375,
					windowHeight: 650
				})
				resolve()
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
