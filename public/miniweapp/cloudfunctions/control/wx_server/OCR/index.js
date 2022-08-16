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
    if(!parame.data_type&&!parame.img_url){
        var res = {
            errcode:0,
            msg: "图片资源不可为空!",
            result:{},
            success:false,
            timestamp:new Date().getTime()
        }
        return res
    }
    try {
        let invokeData = {
            img_data:parame.data_type||'',
            img_url:parame.img_url||'',
            data_type: 3,//1：二进制；2：base64字符串；3：图片url
            ocr_type: 1,//1：身份证；2：银行卡；3：行驶证；4：驾驶证；7：营业执照；8：通用OCR
        }
        let client_msg_id = globalConfig.common.randomeIs32()
        const result = await cloud.openapi({ convertCase: false }).serviceMarket.invokeService({
            service: 'wx79ac3de8be320b71',
            api: 'OcrAllInOne',
            data: invokeData,
            client_msg_id: client_msg_id
        })

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