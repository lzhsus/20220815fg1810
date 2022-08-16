const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database({
    throwOnNotFound: false
})
const _ = db.command;
const $ = db.command.aggregate
const globalConfig = require('../../config/index')

module.exports =async (event,context,root)=>{
    const {
        OPENID
    } = cloud.getWXContext();
    // 验证该接口是否需要验证注册
    let parame = event.data;
    if(parame.updata){
        await db.collection('user_info').where({
            openId:OPENID
        }).update({
            data:parame.userInfo
        })
        var res = {
            errcode:200,
            msg: '操作成功！',
            result:parame.userInfo,
            success:true,
            timestamp:new Date().getTime()
       }
        return res;
    }
    try {
        let result= await cloud.getOpenData({
            list: [parame.cloudID]
        })
        if(result.errMsg =='getOpenData:ok'){
            await db.collection('user_info').where({
                openId:OPENID
            }).update({
                data:result.list[0].data
            })
            var res = {
                errcode:200,
                msg: '操作成功！',
                result:result.list[0].data,
                result2:result,
                success:true,
                timestamp:new Date().getTime()
           }
        }else{
            var res = {
                errcode:result.errCode,
                msg: result.errMsg,
                result:{},
                success:false,
                timestamp:new Date().getTime()
           }
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