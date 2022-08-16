const cloud = require('wx-server-sdk')
const request = require('request');
const rp = require('request-promise');
const log = cloud.logger()

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
        var options = {
            uri: parame.uri||'http://api.tianapi.com/txapi/pyqwenan/index',
            method:"GET",
            qs: {key:'2c52cf2cd023ccef3c6d44439a7e2cd8'},
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true 
        };
        let result = await rp(options)
        log.info({ name: '_查询_log',result: result||{} });
        if(result.code==200){
            let list = result.newslist.map(item=>{
                item.api = parame.api;
                if(parame.api=='dialogue'){
                    item.type = item.type==1?'华语':'外语';
                }
                return item;
            })
            updata(list)
            let _result = null;
            if(parame.callback=='obj'){
                _result = list[0]
            }else{
                _result = {
                    list:list
                }
            }
            var res = {
                errcode:200,
                msg: "操作成功!",
                result:_result,
                success:true,
                timestamp:new Date().getTime()
            }
        }else{
            var res = {
                errcode:200,
                msg: "操作成功!",
                result:{
                    list:[]
                },
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

async function updata(list){
    for(let i=0;i<list.length;i++){
        let data_info = {};
        data_info.create_time = db.serverDate();
        data_info.updata_time = db.serverDate();
        await db.collection('tianapi_data').add({
            data:Object.assign(data_info,list[i])
        })
    }
}