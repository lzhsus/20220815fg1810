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
        let Year = new Date().getFullYear()
        let Month = new Date().getMonth()+1;
        let date = new Date().getDate();
        let week = new Date().getDay();//1 2 3 4 5 6 0
        let hours = new Date().getHours();
        // 检查当天是否是 周一 周三 周六 大于晚上8
        if([1,3,6].indexOf(week)!=-1&&hours>=20){
            return {
                errcode:0,
                msg: "今天为开奖日且已超过购买时间，今天暂不可记录！",
                result:{},
                success:false,
                timestamp:new Date().getTime()
            }
        }

        let day2 = Year+'-'+(Month<10?'0'+Month:Month)+'-'+(date<10?'0'+date:date)
        var counts = await db.collection('caipiao_log').where({
            day2:day2,
            openId:OPENID
        }).count()

        if(counts&&counts.total>=2){
            var res = {
                errcode:404,
                msg: "每位用户，每日最多生成2条数据",
                result:{},
                success:false,
                timestamp:new Date().getTime()
            }
        }else{
            var result= await db.collection('caipiao_win').aggregate().limit(9999).sort({
                create_time:-1
            }).end();
            let data = result.list||[];
            
            var data_info = {};
            data_info.openId = OPENID;
            data_info.create_time = db.serverDate();
            data_info.updata_time = db.serverDate();
            data_info.period = data[0].period||""
            
            await db.collection('caipiao_log').add({
                data: Object.assign(parame,data_info)
            })
            
            var res = {
                errcode:200,
                msg: "操作成功!",
                result:{},
                day2:day2,
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