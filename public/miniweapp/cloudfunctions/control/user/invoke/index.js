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
                mode: parame.mode||1
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
            api: 'jokebot',
            data: invokeData,
            client_msg_id: client_msg_id
        })
        // 输入类型编码，1: 冷笑话, 2: 普通笑话, 3: 浪漫情话, 4: 土味情话, 5: 心灵鸡汤
        function modeTyle(params) {
            if(invokeData['mode']==1) return '冷笑话';
            if(invokeData['mode']==2) return '普通笑话';
            if(invokeData['mode']==3) return '浪漫情话';
            if(invokeData['mode']==4) return '土味情话';
            if(invokeData['mode']==5) return '心灵鸡汤';
            return '冷笑话';
        }
        let mode_text = modeTyle()
        if(result&&result.errCode==0){
            let data = ((JSON.parse(result.data)).data_list)[0];
            
            db.collection('invoke_jokebot_msg').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    client_msg_id:client_msg_id,
                    mode_text:mode_text,
                    mode:invokeData['mode'],
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
                    mode:invokeData['mode'],
                    mode_text:mode_text,
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