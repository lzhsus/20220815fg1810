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
        var result= await db.collection('questionnaire_result').aggregate()
        .limit(9999)
        .lookup({
            from:"user_info",
            let:{
                openId:"$openId",
            },
            pipeline: $.pipeline()
                .match(_.expr($.and([
                    $.eq(['$openId', '$$openId'])
                ])))
                .done(),
            as:'user_info'
        })
        .group({
            _id: {
                openId:'$openId',
                user_info:"$user_info"
            },
            totalScore: $.sum('$score')
        })
        .sort({
            totalScore:-1
        })
        .replaceRoot({
            newRoot: {
                userInfo:"$_id.user_info",
                totalScore:'$totalScore',
                openId:'$_id.openId'
            }
        })
        .end();
        let list = (result.list||[]).map(item=>{
            item.userInfo = item.userInfo[0]||{}
            return item;
        })

        var res = {
            errcode:200, 
            msg: "操作成功!",
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