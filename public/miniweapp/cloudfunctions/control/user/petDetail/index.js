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

module.exports = async (event, context, root) => {
    const {
        OPENID
    } = cloud.getWXContext();
    // 验证该接口是否需要验证注册
    let parame = event.data;
    try {
        // 宠物狗1  宠物龟2  宠物猫3
        var result = await db.collection('pet_detail').aggregate().match({
                petID: _.eq(Number(parame.petID)),
                type:_.or(_.eq(parame.type),_.eq(Number(parame.type)))
            }).end()
        if (result && result.list && result.list.length) {
            db.collection('pet_list').where({
                petID: _.or(_.eq(parame.petID),_.eq(Number(parame.petID))),
                type:_.or(_.eq(parame.type),_.eq(Number(parame.type)))
            }).update({
                data: {
                    "count": _.inc(1),
                },
            })
            var res = {
                errcode: 200,
                msg: '操作成功！',
                result:result,
                parame:parame,
                result: result.list[0],
                success: true,
                timestamp: new Date().getTime()
            }
        } else {
            var res = {
                errcode: -1,
                msg: "数据不存在！",
                result: {},
                success: false,
                timestamp: new Date().getTime()
            }
        }
    } catch (error) {
        var error_type = globalConfig.common.error_type(error.errCode);
        var res = {
            errcode: 404,
            msg: error_type.type,
            result: error,
            success: false,
            timestamp: new Date().getTime()
        }
    }
    return res;
}