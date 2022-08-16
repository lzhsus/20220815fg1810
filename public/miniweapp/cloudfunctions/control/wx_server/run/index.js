const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database({
    throwOnNotFound: false
})
const _ = db.command;
const globalConfig = require('../../config/index')
const $ = db.command.aggregate
// import moment from '../../utils/moment.min';

module.exports =async (event,context,root)=>{
    const {
        OPENID,UNIONID
    } = cloud.getWXContext();
    let parame = event.data||{};
    try {
        let { stepInfoList } = event['weRunData'].data;
        let todayItem = stepInfoList[stepInfoList.length-1];
        
        var data_info = {};
            data_info.openId = OPENID;
            data_info.create_time = db.serverDate();
            data_info.updata_time = db.serverDate();

        let result = await db.collection('wx_run').aggregate().match({
            openId:OPENID
        }).sort({
            timestamp:-1
        }).limit(1).end();

        if(result&&result.list&&result.list.length){
            // 最后一天是当天 只更新当天
            if(todayItem.timestamp==result.list[0].timestamp){
                for(let i=0;i<stepInfoList.length;i++){
                    await db.collection('wx_run').where({
                        timestamp:stepInfoList[i].timestamp
                    }).update({
                        data:{
                            step:stepInfoList[i].step,
                            updata_time:db.serverDate()
                        }
                    })
                }
            }else{
                for(let i=0;i<stepInfoList.length;i++){
                    if(stepInfoList[i].timestamp>result.list[0].timestamp){
                        await db.collection('wx_run').add({
                            data:Object.assign(data_info,stepInfoList[i])
                        })
                    }
                }
            }
        }else{
            for(let i=0;i<stepInfoList.length;i++){
                await db.collection('wx_run').add({
                    data:Object.assign(data_info,stepInfoList[i])
                })
            }
        }
        var res = {
            errcode:200,
            msg: "操作成功!",
            result:{},
            stepInfoList:stepInfoList,
            success:true,
            timestamp:new Date().getTime()
        }
    } catch (error) {
        var error_type = globalConfig.common.error_type(error.errCode);
        var res = {
             errcode:404,
             msg: error_type.type,
             result:error,
             success:false,
             timestamp:new Date().getTime()
        }
    }
    return res;
}