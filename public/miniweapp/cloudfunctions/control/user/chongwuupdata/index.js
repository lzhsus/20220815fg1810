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
const request = require('request')

module.exports =async (event,context,root)=>{
    const {
        OPENID,UNIONID
    } = cloud.getWXContext();
    let parame = event.data||{};
    try {
        // 宠物狗1  宠物龟2 宠物猫3
        let url;
        if(parame.type==1) url = 'https://api.apishop.net/common/dogFamily/queryDogInfo';
        if(parame.type==2) url = 'https://api.apishop.net/common/reptileFamily/queryReptileInfo';
        if(parame.type==3) url = 'https://api.apishop.net/common/catFamily/queryCatInfo';
        if(parame.type==4) url = 'https://api.apishop.net/common/aquariumFamily/queryAquariumInfo';

        let result = await requestApi(parame.petID,url);
        let data_info = {};
        data_info.openId = OPENID;
        data_info.create_time = db.serverDate();
        data_info.updata_time = db.serverDate();

        await db.collection('pet_detail').add({
            data:Object.assign(data_info,JSON.parse(result).result,{
                type:parame.type
            })
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

function requestApi(petID,url){
    return new Promise((resolve,reject)=>{
        request({
            url:url,
            method: "POST",
            form:{
                apiKey:'FvyUpCY291e0f253c7e7bf0fcc19b130a1d7dca49a99224',
                petID:petID
            }
        }, function (error, response, body) {  
            if (!error && response.statusCode == 200) {    
                console.log(body) // 请求成功的处理逻辑  
            } 
            resolve(body)
        });
    })
}