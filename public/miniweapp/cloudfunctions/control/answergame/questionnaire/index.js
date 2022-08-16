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
        var result= await db.collection('questionnaire_list').aggregate().match({
            id:_.eq(Number(parame.id))
        })
        .lookup({
            from:"questionnaire_result",
            let:{
                id:"$id",
            },
            pipeline: $.pipeline()
                .match(_.expr($.and([
                    $.eq(['$id', '$$id'])
                ])))
                .done(),
            as:'questionnaire_result'
        })
        .replaceRoot({
            newRoot: $.mergeObjects([ $.arrayElemAt(['$questionnaire_result', 0]), '$$ROOT' ]),
        })
        .project({
            questionnaire_result:0,
            list:1,
            name:1,
            id:1
        }).end();
        
        var res = {
            errcode:200,
            msg: "操作成功!",
            result:result.list,
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