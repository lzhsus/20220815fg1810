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
        let result = {}
        if(parame.updata){
            await db.collection('yugong_user').where({
                openId:OPENID
            }).update({
                data:parame.data
            })
        }else{
            result = await db.collection('yugong_user').aggregate().match({
                openId: OPENID
              })
              .count('expensiveCount')
              .end()
            if(result&&result.list&&result.list.length==0){
                var data_info = {};
                data_info.openId = OPENID;
                data_info.create_time = db.serverDate();
                data_info.updata_time = db.serverDate();
                data_info.childNumber = 0;
                data_info.maxChildNumber = 0;
                data_info.createChildSpeed = 1;
                data_info.openGrade = 1;//开启等级
                data_info.houseClass = 1;
                
                await db.collection('yugong_user').add({
                    data: Object.assign(parame,data_info)
                })
            }
            result = await db.collection('yugong_user').aggregate()
            .match({
                openId: _.eq(OPENID)
            })
            .end()
            result = result.list[0]
        }
        var res = {
             errcode:200,
             msg: '操作成功！',
             result:result,
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