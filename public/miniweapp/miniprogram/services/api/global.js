import request from "./request";
let globalApi = {}

// 获取用户西信息
globalApi.userInfo = function(data, isShowLoading=true){
    return request('control','user/info',data,isShowLoading);
}
// 获取手机号吗
globalApi.openapiMobile = function(data, isShowLoading=true){
    return request('control','openapi/mobile',data,isShowLoading);
}
// 注册
globalApi.openapiZC = function(data, isShowLoading=true){
    return request('control','openapi/zc',data,isShowLoading);
}
// 我的收藏
globalApi.userFavorites = function(data, isShowLoading=true){
    return request('control','user/favorites',data,isShowLoading);
}
// 我的购物车
globalApi.userCart = function(data, isShowLoading=true){
    return request('control','user/cart',data,isShowLoading);
}
// 收货地址
globalApi.userAddress = function(data, isShowLoading=true){
    return request('control','user/address',data,isShowLoading);
}

// 微信qr
globalApi.weixinQR = function(data, isShowLoading=true){
    return request('control','weixin/api/qr',data,isShowLoading);
}
globalApi.weixinQRList = function(data, isShowLoading=true){
    return request('control','weixin/api/qr/list',data,isShowLoading);
}
// 扫码scene
globalApi.weixinScene = function(data, isShowLoading=true){
    return request('control','weixin/api/scene',data,isShowLoading);
}
// 获取字体
globalApi.weixinFontsList = function(data, isShowLoading=true){
    return request('control','weixin/api/fontlist',data,isShowLoading);
}
// 动态消息
globalApi.weixinDynamic = function(data, isShowLoading=true){
    return request('control','weixin/api/dynamic',data,isShowLoading);
}
// 获取图片地址
globalApi.getTempFileURL = function(data, isShowLoading=true){
    return request('control','weixin/api/getTempFileURL',data,isShowLoading);
}
// 获取证件信息
globalApi.invokeService = function(data, isShowLoading=true){
    return request('control','weixin/api/invokeService',data,isShowLoading);
}

globalApi.sendMessage = function(data, isShowLoading=true){
    return request('sendMessage','',data,isShowLoading);
}
// 用户列表
globalApi.apiUserlist = function(data, isShowLoading=true){
    return request('control','user/api/userlist',data,isShowLoading);
}



export { globalApi }