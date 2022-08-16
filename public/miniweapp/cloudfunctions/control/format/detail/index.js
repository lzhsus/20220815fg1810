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
        let result = await db.collection('format_list').aggregate().match({
            _id:parame._id
        })
        .lookup({
            from:"format_comment",
            let:{
                id:"$_id",
            },
            pipeline: $.pipeline()
                .match(_.expr($.and([
                    $.eq(['$pro_id', '$$id'])
                ])))
                .done(),
            as:'comment'
        })
        .end();

        var res = {
            errcode:200,
            msg: "操作成功!",
            result:result.list[0]||{},
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