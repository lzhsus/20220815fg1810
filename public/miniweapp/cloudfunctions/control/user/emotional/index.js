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
        let client_msg_id = randome32()
        const result = await cloud.openapi({ convertCase: false }).serviceMarket.invokeService({
            service: 'wxcae50ba710ca29d3',
            api: 'sentcls3',
            data: invokeData,
            client_msg_id: client_msg_id
        })
    
        if(result&&result.errCode==0){
            let data = ((JSON.parse(result.data)).result);
            data = data.map(item=>{
                let obj = {}
                if(item[0]=='正面'){
                    obj['type'] = 1
                }
                if(item[0]=='无情感'){
                    obj['type'] = 2
                }
                if(item[0]=='负面'){
                    obj['type'] = 3
                }
                obj['name'] = item[0]
                obj['value'] = Number(item[1]).toFixed(10)
                return obj;
            })
            db.collection('invoke_emotional_msg').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    client_msg_id:client_msg_id,
                    create_time:db.serverDate(),
                    updata_time:db.serverDate(),
                    openId:OPENID||"",
                    unionId:UNIONID||'',
                    msg:data||[],
                    request_id:result.request_id||""
                }
            })
            var res = {
                errcode:200,
                msg: "操作成功!",
                result:{
                    client_msg_id:client_msg_id,
                    msg:data,
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