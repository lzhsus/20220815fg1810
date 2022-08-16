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
    try {
        let result = await db.collection('wx_run').aggregate().match({
            openId:OPENID
        }).limit(9999).sort({
            timestamp:-1
        }).end();
        let stepWidth = 0.5;//每步0.5米
        // 10000米消耗600卡路里
        let calorie = 0.06;//每米消耗卡路里

        let list = (result.list||[]).map(item=>{
            item.distance = stepWidth*item.step;
            item.calorie = stepWidth*item.step*calorie;
            return item;
        })
   
        var res = {
            errcode:200,
            msg: "操作成功",
            result:{
                list:list
            },
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