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

module.exports =async (event,context,root)=>{
    const {
        OPENID,UNIONID
    } = cloud.getWXContext();
    let parame = event.data||{};
    try {
        var data_info = {};
        data_info.openId = OPENID;
        data_info.create_time = db.serverDate();
        data_info.updata_time = db.serverDate();
        
        let result = await db.collection('ranking_list')
        .aggregate()
        .sort({
            time: -1
        })
        .end()

        var res = {
            errcode:200,
            msg: "操作成功!",
            result:{
                list:result.list||[]
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