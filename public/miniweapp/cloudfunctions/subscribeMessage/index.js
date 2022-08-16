// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
    throwOnNotFound: false
})
const _ = db.command;
const $ = _.aggregate
// 云函数入口函数
    const log = cloud.logger()
exports.main = async (event, context) => {
    const {
        OPENID
    } = cloud.getWXContext();
    let parsms = event.data;
    try {
        let moduleList = [{
            id: "SaHm16y6Cjdod2w_EgbZhyhjUyKA4U72QRTUwjAJE30",
            name: "签到提醒",
            sendData: {
                page: 'pages/my/my',
                data: {
                    thing2: { value: "每日签到奖励次数~" },
                    time3: { value: dateFormat("YYYY-mm-dd", new Date()) }
                }
            }
        },{
            id: "5yQAF93upO98903L2z96L1ypnfWmHuSmUemDZxNXp-M",
            name: "运动打卡提醒",
            sendData: {
                page: 'pages/my/my',
                data: {
                    thing1:{ value:"每天晚上5公里" },
                    thing5:{ value:"当前行走2000米" },
                    phrase4:{ value:"未完成" },
                }
            }
        }]
        // let sendData = {
        //     page: 'pages/my/my',
        //     data: {
        //         thing2: { value: "每日签到奖励次数~" },
        //         time3: { value: dateFormat("YYYY-mm-dd", new Date()) }
        //     }
        // }
        var _sendList = await db.collection('msg_send').aggregate().limit(9999).end();
        let _list = _sendList.list||[]
        let hous = new Date().getHours();
        if(hous<12){
            _list = _list.filter(res=>{ return res.id==moduleList[0].id })
        }else{
            _list = _list.filter(res=>{ return res.id==moduleList[1].id })
        }
        let msgList = [],newArr = []; 
        for(let i=0;i<_list.length;i++){
            if(!newArr.some(res=>{return res.openId==_list[i].openId})){
                newArr.push(_list[i]);
                break;
            }
        }
        for (let i = 0; i < newArr.length; i++) {
            let sendData = moduleList.filter(item=>{ return item.id==newArr[i].id }).map(item=>{ return item.sendData; })
            msgList.push(subscribeMessage(sendData[0], newArr[i]))
        }
        let list = await Promise.all(msgList);
        
        log.info({ name: '_send_log',list: list });

        for(let i=0;i<list.length;i++){
            let _id = list[i].item._id;
            db.collection('msg_send').where({ _id: _id }).remove()
        }
        var res = {
            errcode:200,
            msg: "操作成功!",
            result:{},
            success:true,
            timestamp:new Date().getTime()
        }
    }catch (error) {
        var res = {
             errcode:404,
             msg: "网络错误",
             result:error,
             success:false,
             timestamp:new Date().getTime()
        }
    }
    return res;
}

function subscribeMessage(_send, item) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = Object.assign(_send, {
                touser: item.openId,
                templateId: item.id,
            })
            
            log.info(data)
            await cloud.openapi.subscribeMessage.send(data);
            resolve({code:1,item})
        } catch (error) {
            resolve({code:0,item})
        }
    })
}
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}