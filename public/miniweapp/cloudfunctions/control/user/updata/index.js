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
        let data_info = {};
        data_info.updata_time = db.serverDate();

        if(parame.updataImage){
            await db.collection(parame.name).where({
                _id:parame._id
            }).update({
                data:{
                    img_url:parame.img_url
                }
            })

        }else{
            await db.collection(parame.name).where({
                openId:OPENID
            }).update({
                data:Object.assign(data_info,parame.data)
            })
        }

        var res = {
            errcode:200,
            msg: "操作成功!",
            result:{},
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