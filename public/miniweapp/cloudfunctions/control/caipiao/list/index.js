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
    const { OPENID } = cloud.getWXContext();
    // 验证该接口是否需要验证注册
    let parame = event.data;
    try {
        let match = {
            openId:OPENID
        }
        if(parame.day){
            match = {
                day:_.gte(parame.day),
                openId:OPENID
            }
        }
        var result= await db.collection('caipiao_log').aggregate().match(match).limit(9999).sort({
            day:-1
        })

        .lookup({
            from:"caipiao_win",
            let:{
                period:"$period",
            },
            pipeline: $.pipeline()
                .match(_.expr($.and([
                    $.eq(['$period', '$$period'])
                ])))
                .done(),
            as:'win'
        }).end();
        
        var result2= await db.collection('caipiao_win').aggregate().limit(9999).sort({
            create_time:-1
        }).end();
        let list = (result.list||[]).map(item=>{
            item.win_code = []
            if(item.win&&item.win.length&&item.win[0].win_code){
                item.win_code = item.win[0].win_code.split("-")
            }
            delete item.win;
            return item;
        })
        var res = {
             errcode:200,
             msg: '操作成功！',
             result:{
                 list:list,
                 count:list.length,
                 period:result2.list[0].period
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