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
            uri: 'https://api.tianapi.com/txapi/lajifenlei/index',
            method:"GET",
            qs: {key:'2c52cf2cd023ccef3c6d44439a7e2cd8',word:parame.word,num:50},
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true 
        };
        let result = await rp(options)
        log.info({ name: '_查询_log',result: result||{} });
        if(result.code==200){
            let list = result.newslist.map(item=>{
                if(item.type==0) item.type_txt = '可回收垃圾';
                if(item.type==1) item.type_txt = '有害垃圾';
                if(item.type==2) item.type_txt = '湿垃圾';
                if(item.type==3) item.type_txt = '干垃圾';
                if(item.aipre==0) item.aipre_txt = '正常结果';
                if(item.aipre==1) item.aipre_txt = '预判结果';
                return item;
            })
            updata(list)
            
            var res = {
                errcode:200,
                msg: "操作成功!",
                result:{
                    list:list
                },
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
        await db.collection('garbage_list').add({
            data:Object.assign(data_info,list[i])
        })
    }
}