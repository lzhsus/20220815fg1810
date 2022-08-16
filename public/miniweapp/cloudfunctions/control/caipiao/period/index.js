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
        var result= await db.collection('caipiao_win').aggregate().limit(9999).sort({
            create_time:-1
        }).end();
        let data = result.list||[]
        let period = ''
        if(data[0]&&data[0].win_code){
            // 创建下一期
            var data_info = {};
            data_info.openId = OPENID;
            data_info.create_time = db.serverDate();
            data_info.updata_time = db.serverDate();
            period = (Number(data[0].period)||21088)+1
            await db.collection('caipiao_win').add({
                data: Object.assign(data_info,{
                    period:period,
                    win_code:""
                })
            })
        }
        var res = {
             errcode:200,
             msg: '操作成功！',
             result:{
                period:period||data[0].period
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