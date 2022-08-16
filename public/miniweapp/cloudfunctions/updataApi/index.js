const cloud = require('wx-server-sdk')
var rp = require('request-promise');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
    throwOnNotFound: false
})
const _ = db.command;
const $ = db.command.aggregate

exports.main = async (event, context) => {
    // 创建第几期
    // period
    var options = {
        uri: 'https://kaijiang.500.com/dlt.shtml',
        method: "GET",
        qs: {},
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    let result = await rp(options)
    let index = result.indexOf('ball_box01')
    let q = result.indexOf('iSelectBox')
    let code = result.substr(index + 12, 340)
    let _q = result.substr(q + 111, 5)
    code = code.replace(/[^\d.]/g, "")
    let str = ''
    for (let i = 0; i < 7; i++) {
        str += code.slice(i * 2, (i + 1) * 2) + '-'
    }
    str = str.substr(0, str.length - 1)
    
    let isTrue = (_q+'').indexOf('21')!=-1;

    

    var counts = await db.collection('caipiao_win').where({
        period:_.eq(Number(_q)+1),
    }).count()

    if(!counts||counts.total==0){
        var data_info = {};
        data_info.create_time = db.serverDate();
        data_info.updata_time = db.serverDate();
        data_info.period = Number(_q)+1;

        await db.collection('caipiao_win').add({
            data: Object.assign({},data_info)
        })
    }
    
    if(isTrue){
        await db.collection('caipiao_win').where({
            period:Number(_q)
        }).update({
            data:{
                win_code:str
            }
        })
    }
    return {str:str,period:Number(_q),counts:counts};
}