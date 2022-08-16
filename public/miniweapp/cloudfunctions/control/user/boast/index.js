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

module.exports =async (event,context,root)=>{
    const {
        OPENID,UNIONID
    } = cloud.getWXContext();
    let parame = event.data||{};
    try {
        let invokeData = {
                "q": parame.p||'', // 需要夸的内容  
            }
        // 随机数
        function  randome32() {
            /*生成32位随机流水号*/
            /*默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*/
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = $chars.length;
            var pwd = '';
            for (i = 0; i < 32; i++) {
                 pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        }
        let client_msg_id = randome32()
        const result = await cloud.openapi({ convertCase: false }).serviceMarket.invokeService({
            service: 'wxcae50ba710ca29d3',
            api: 'thumbupbot',
            data: invokeData,
            client_msg_id: client_msg_id
        })
    
        if(result&&result.errCode==0){
            let data = ((JSON.parse(result.data)).data_list)[0];
            
            db.collection('invoke_boast_msg').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    client_msg_id:client_msg_id,
                    create_time:db.serverDate(),
                    updata_time:db.serverDate(),
                    openId:OPENID||"",
                    unionId:UNIONID||'',
                    msg:data.result||"",
                    request_id:result.request_id||""
                }
            })
            var res = {
                errcode:200,
                msg: "操作成功!",
                result:{
                    client_msg_id:client_msg_id,
                    msg:data.result,
                    request_id:result.request_id
                },
                success:true,
                timestamp:new Date().getTime()
            }
        }else{
            var res = {
                errcode:404,
                msg: "数据获取失败",
                result:{},
                success:false,
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