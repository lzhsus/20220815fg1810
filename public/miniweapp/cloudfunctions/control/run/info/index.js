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
    let config = {
        stepWidth:0.5,//每步0.5米
        calorie:0.06,//每米消耗卡路里(10000米消耗600卡路里)
    }
    try {
        let userinfo = await db.collection('user_info').where({
            openId:OPENID
        }).field({
            target_step: true,
        }).get();

        let target_step = ''
        if(userinfo&&userinfo.data&&userinfo.data.length){
            target_step = userinfo.data[0].target_step||'';
        }

        
        let { firstDay,lastDay,todayDay } = timestamp(parame.time);
        let result = await db.collection('wx_run').aggregate().match({
            openId:OPENID,
            timestamp:_.and(_.gte(firstDay),_.lte(lastDay))
        }).limit(31).sort({
            timestamp:-1
        }).end();

        let total = 0;
        let list = (result.list||[]).map(item=>{
            item.distance = config['stepWidth']*item.step;
            item.calorie = config['stepWidth']*item.step*config['calorie'];
            return item;
        });
        for(let i=0;i<list.length;i++){
            total+=Number(list[i].step)
        }

        let todayList = await db.collection('wx_run').aggregate().match({
            openId:OPENID,
            timestamp:todayDay
        }).end();
        todayList = todayList.list||[]
        let todayObj = {}
        if(todayList&&todayList.length){
            todayObj = {
                step:todayList[0].step,
                distance:config['stepWidth']*todayList[0].step,
                calorie:config['stepWidth']*todayList[0].step*config['calorie'],
            }
        }

        var res = {
            errcode:200,
            msg: "操作成功",
            result:{
                total:{
                    step:total,
                    distance:config['stepWidth']*total,
                    calorie:config['stepWidth']*total*config['calorie'],
                },
                isToday:todayList.length?1:0,
                target_step:Number(target_step)||6000,
                today:todayObj,
                timestamp:todayDay,
                list:list,
                shequShow:true
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
function timestamp(time){
    let date = new Date();
    if(time) date = new Date(time);

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1,-8,0,0);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var todayDay = (new Date(new Date(new Date().getTime()).setHours(-8,0,0,0)));

    return {
        firstDay:firstDay.getTime()/1000,
        lastDay:lastDay.getTime()/1000,
        todayDay:todayDay.getTime()/1000
    };
}