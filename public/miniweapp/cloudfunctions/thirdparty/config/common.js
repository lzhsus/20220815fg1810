function random_No(j) {
    var random_no = "";
    for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
    {
        random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;
    return random_no;
};
// 获取当前时间 YYYY-MMMM-DDDD hh:mm:ss
function getNewTime(type='',data){
    var date=data||new Date();
    if(type == 2){
        date.setTime(date.getTime()+24*60*60*1000);
    }

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    if (month<10){
        month = '0' + month
    }
    if (day<10){
        day = '0' + day
    }
    var hour=date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();

    //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
    if (hour<10) {
        hour='0'+hour;
    }
    if (minute<10) {
        minute='0'+minute;
    }
    if (second<10) {
        second='0'+second;
    }

    var x=date.getDay();//获取星期
    if (type == 1||type==2) {
        return year + '-' + month + '-' + day;
    }
    return year + '' + month + '' + day + '' + hour + '' + minute + '' + second;
}
function error_type(error_num){
    var error={}
    error.errCode = error_num;
    switch(error_num) {
        case -401001:
            error.type = '无权限使用 API'
           break;
        case -401002:
            error.type = 'API 传入参数错误'
           break;
        case -401003:
            error.type = 'API 传入参数类型错误'
            break;
        case -402001:
            error.type = '检测到循环引用'
           break;
        case -403001:
            error.type = '上传的文件超出大小上限'
           break;
        case -404001||-404002||-404003||-404004||-404005||-404006||-404007||-404008||-404009:
            error.type = '云函数调用失败'
            break;
        case -404010:
            error.type = '云函数执行失败'
            break;
        case -601004:
            error.type = '无权限使用 API'
            break;
        case -501001:
            error.type = '云端系统错误'
            break;
        case -501002:
            error.type = '云端响应超时'
            break;
        case -501003:
            error.type = '请求次数超出环境配额'
            break;
        case -501004:
            error.type = '请求并发数超出环境配额'
            break;
        case -501005:
            error.type = '环境信息异常'
            break;
        case -501009:
            error.type = '操作的资源对象非法或不存在'
            break;
        case -502001:
            error.type = '数据库请求失败'
            break;
        case -502002:
            error.type = '非法的数据库指令'
            break;
        case -502003:
            error.type = '无权限操作数据库'
            break;
        case -502005:
            error.type = '集合不存在'
            break;
        case -501009:
            error.type = '操作的资源对象非法或不存在'
            break;
        case -503001:
            error.type = '云文件请求失败'
            break;
        case -503002:
            error.type = '无权限访问云文件'
            break;
        case -503003:
            error.type = '文件不存在'
            break;
        case -504001:
            error.type = '云函数调用失败'
            break;
        case -504002:
            error.type = '云函数执行失败'
            break;
        default:
            error.type = '通用错误'
            break;
   } 
   return error;
}
function randomString(len) {
 　　len = len || 32;
 　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
 　　var maxPos = $chars.length;
 　　var pwd = '';
 　　for (i = 0; i < len; i++) {
 　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
 　　}
 　　return pwd;
 }
module.exports = {
    random_No:random_No,
    getNewTime:getNewTime,
    randomString:randomString,
    error_type:error_type
}