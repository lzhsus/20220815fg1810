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
        var result;
        if(parame.count){
            result = await db.collection('questionnaire_list').aggregate().match({
                code:_.eq(Number(parame.code))
            }).count('qa_id').end();
            let list = result.list||[];
            var res = {
                errcode:200,
                msg: "操作成功!",
                result:{
                    qa_id:list.length?list[0].qa_id:0
                },
                success:true,
                timestamp:new Date().getTime()
            }
        }else{
            result = await db.collection('questionnaire_list').aggregate().match({
                code:_.eq(Number(parame.code))
            }).sort({
                qa_id:1
            }).end();
            let list = result.list||[];
            var res = {
                errcode:200,
                msg: "操作成功!",
                result:list,
                success:true,
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