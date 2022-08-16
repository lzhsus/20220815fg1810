import request from "./request";
import requestHttp from "./requestHttp";
import cloud_index from "./cloud_index";

let api = Object.assign({},cloud_index);


// 用户列表
api.apiUserlist = function(data, isShowLoading=true){
    return request('control','user/api/userlist',data,isShowLoading);
}
// 管理身份更新
api.apiUserUpdataadmin = function(data, isShowLoading=true){
    return request('control','user/api/updataadmin',data,isShowLoading);
}

api.invokeMsg = function(data, isShowLoading=true){
    return request('control','user/api/invoke/msg',data,isShowLoading);
}
api.invokeBoast = function(data, isShowLoading=true){
    return request('control','user/api/invoke/boast',data,isShowLoading);
}
api.invokeEmotional = function(data, isShowLoading=true){
    return request('control','user/api/invoke/emotional',data,isShowLoading);
}
api.userInfo = function(data, isShowLoading=true){
    return request('control','user/api/info',data,isShowLoading);
}
api.userSign = function(data, isShowLoading=true){
    return request('control','user/api/sign',data,isShowLoading);
}
api.userCreate = function(data, isShowLoading=true){
    return request('control','user/api/create',data,isShowLoading);
}
api.userRanking = function(data, isShowLoading=true){
    return request('control','user/api/ranking',data,isShowLoading);
}
api.userRankinglist = function(data, isShowLoading=true){
    return request('control','user/api/rankinglist',data,isShowLoading);
}
api.verseCreate = function(data, isShowLoading=false){
    return request('control','user/api/verse/create',data,isShowLoading);
}
api.chongwuupdata = function(data, isShowLoading=true){
    return request('control','user/api/chongwuupdata',data,isShowLoading);
}
api.apiSend = function(data, isShowLoading=false){
    return request('control','user/api/_send',data,isShowLoading);
}

api.fieldUpdata = function(data, isShowLoading=true){
    return request('control','user/api/field/updata',data,isShowLoading);
}

// 音频使用记录
api.managerLog = function(data, isShowLoading=false){
    return request('control','user/api/manager_log',data,isShowLoading);
}
api.translateLog = function(data, isShowLoading=false){
    return request('control','user/api/translate_log',data,isShowLoading);
}
api.activeList = function(data, isShowLoading=false){
    return request('control','user/api/active',data,isShowLoading);
}
api.thirdpartyInfo = function(data, isShowLoading=false){
    return request('thirdparty','thirdparty/api/info',data,isShowLoading);
}
api.wx_serverApiOcr = function(data, isShowLoading=false){
    return request('control','wx_server/api/ocr',data,isShowLoading);
}
api.wxServerApiCreate = function(data, isShowLoading=false){
    return request('control','wx_server/api/create',data,isShowLoading);
}
api.wxServerApiUpdata = function(data, isShowLoading=false){
    return request('control','wx_server/api/updata',data,isShowLoading);
}
api.proPetList = function(data, isShowLoading=true){
    return request('control','user/api/pet/list',data,isShowLoading);
}
api.proPetDetail = function(data, isShowLoading=true){
    return request('control','user/api/pet/detail',data,isShowLoading);
}
api.tabList = function(data, isShowLoading=true){
    return requestHttp('https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/tablist.js?v=3333',data,isShowLoading);
}
api._sendData = function(data, isShowLoading=true){
    return requestHttp('https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/my_data/_send.js?v=3333',data,isShowLoading);
}
// 运动
// 活动数据
api.wxServerApiRun = function(data, isShowLoading=true){
    return request('control','wx_server/api/run',data,isShowLoading);
}
api.wxRunCreate = function(data, isShowLoading=true){
    return request('control','wx/api/run/create',data,isShowLoading);
}
api.wxRunInfo = function(data, isShowLoading=true){
    return request('control','wx/api/run/info',data,isShowLoading);
}
api.wxRunList = function(data, isShowLoading=true){
    return request('control','wx/api/run/list',data,isShowLoading);
}
// 论坛

api.formatList = function(data, isShowLoading=true){
    return request('control','format/api/list',data,isShowLoading);
}
// 创建
api.formatUp = function(data, isShowLoading=false){
    return request('control','format/api/up',data,isShowLoading);
}
api.formatDetail = function(data, isShowLoading=true){
    return request('control','format/api/detail',data,isShowLoading);
}
api.formatCommentt = function(data, isShowLoading=true){
    return request('control','format/api/commentt',data,isShowLoading);
}
api.formatFollow = function(data, isShowLoading=true){
    return request('control','format/api/follow',data,isShowLoading);
}

// 高考分数
api.collegeList = function(data, isShowLoading=true){
    return request('control','college/api/list',data,isShowLoading);
}
api.collegeUpdata = function(data, isShowLoading=true){
    return request('control','college/api/updata',data,isShowLoading);
}
// 垃圾分类
api.garbageData = function(data, isShowLoading=true){
    return request('control','garbage/api/data',data,isShowLoading);
}
api.garbageList = function(data, isShowLoading=true){
    return request('control','garbage/api/list',data,isShowLoading);
}
api.garbageHotlist = function(data, isShowLoading=true){
    return request('control','garbage/api/hotlist',data,isShowLoading);
}
// api
api.tianapiPyqwenan = function(data, isShowLoading=true){
    return request('control','tianapi/api/pyqwenan',data,isShowLoading);
}
api.caipiaoCreate = function(data, isShowLoading=true){
    return request('control','caipiao/api/create',data,isShowLoading);
}
api.caipiaoList = function(data, isShowLoading=true){
    return request('control','caipiao/api/list',data,isShowLoading);
}
api.updataPeriod = function(data, isShowLoading=false){
    return request('control','caipiao/api/wincode/period',data,isShowLoading);
}
api.promotionList = function(data, isShowLoading=true){
    return request('control','promotion/api/list',data,isShowLoading);
}

// 答题
api.answergameApiInfo = function(data, isShowLoading=true){
    return request('control','answergame/api/info',data,isShowLoading);
}
// 获取所有关卡
api.answergameApiLevels = function(data, isShowLoading=true){
    return request('control','answergame/api/levels',data,isShowLoading);
}
// 获取指定关卡的全部题目 code
api.answergameApiLevelsdetail = function(data, isShowLoading=true){
    return request('control','answergame/api/levelsdetail',data,isShowLoading);
}
// 创建题目
api.answergameApiUp = function(data, isShowLoading=true){
    return request('control','answergame/api/up',data,isShowLoading);
}
// 提交答案
api.answergameApiCreate = function(data, isShowLoading=true){
    return request('control','answergame/api/create',data,isShowLoading);
}
// 记录答题 题目日志
api.answergameApiQaAnswerItem = function(data, isShowLoading=false){
    return request('control','answergame/api/qa/answer/item',data,isShowLoading);
}
// 排行榜
api.answergameApiRanking = function(data, isShowLoading=false){
    return request('control','answergame/api/ranking',data,isShowLoading);
}


// 愚公移山
api.getYugongUserInfo = function(data, isShowLoading=true){
    return request('control','yugong/api/userinfo',data,isShowLoading);
}
api.updataYugongData = function(data, isShowLoading=false){
    return request('control','yugong/api/userinfo',data,isShowLoading);
}



module.exports = api;