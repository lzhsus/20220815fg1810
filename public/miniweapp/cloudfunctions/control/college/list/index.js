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
// import moment from '../../utils/moment.min';

module.exports =async (event,context,root)=>{
    const {
        OPENID,UNIONID
    } = cloud.getWXContext();
    let parame = event.data||{};
    try {
        let data = {}
        if(parame.province&&parame.year){
            data = {
                province:_.eq(parame.province),
                year:_.eq(parame.year),
            }
        }else if(parame.province){
            data = {
                province:_.eq(parame.province),
            }
        }else if(parame.year){
            data = {
                year:_.eq(parame.year),
            }
        }
        let result = await db.collection('college_list').aggregate()
                .match(data)
                .limit(9999)
                .end();

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