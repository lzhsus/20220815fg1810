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
    try {
        let data = {
            maxLevel:0, //当前闯关等级
            maxScore:0, //当前活动的中分
            levels:[],//闯关等级的分数
        }
        var result= await db.collection('questionnaire_result').aggregate().match({
            openId:_.eq(OPENID) 
        }).end();
        let list = result.list||[];
        let arr = []
        for(let i=0;i<list.length;i++){
            if(!arr.some(item=>{ return item.code==list[i].code })){
                arr.push(list[i])
            }
        }
        for(let i=0;i<list.length;i++){
            for(let j=0;j<arr.length;j++){
                if(list[i].code==arr[j].code){
                    if(list[i].score>arr[j].score){
                        arr[j] = list[i];
                    }
                }
            }
            let item = list[i]
            data.maxScore += item.score
            if(data.maxScore>0&&item.level>data.maxLevel){
                data.maxLevel = item.level;
            }
        }
        data.levels = arr
        var res = {
            errcode:200,
            msg: "操作成功!",
            result:data,
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