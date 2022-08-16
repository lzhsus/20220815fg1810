const cloud = require('wx-server-sdk')  
const request = require('request')
var rp = require('request-promise');

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
        var options = {
            uri: parame.url||'http://api.tbk.dingdanxia.com/waimai/meituan_privilege',
            method:"GET",
            qs: {
                apikey:"JRyKkdigD7e01Sb3P9UCCljrMPduPyZ5",
                sid:15239371927,
                generate_we_app:true,
                qrcode:true,
                activity_material_id:parame.activity_material_id||''
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true 
        };
        let result = await rp(options)
        
        var res = {
            errcode:200,
            msg: "操作成功!",
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