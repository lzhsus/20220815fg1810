import appConfig from "../../common/app_config.js";

var loginPromis;
export default async function cloudRequest(method,url, params={},isShowLoading=true) {
    if(isShowLoading) {
        console.log('isShowLoading')
        wx.showLoading({
            title:'加载中',
            mask:true
        });
    }
    let data={
        path: url, // 填入容器的访问路径（云托管-服务列表-路径）
        method: method||'GET',
        header:{},
        timeout:60000,  //60s
        dataType:'json',
        data: params
    }

    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
        if(!loginPromis){        
            loginPromis=login('login');
        }
        userInfo=await loginPromis;
    }
    // 检查是否过期
    let header={
        'authorization':'Bearer '+userInfo.token,
        'appid':appConfig.appid
    }
    data.data.header = header

    let res;
    try{
        res = await wx.cloud.callContainer(data)
        // res = await wx.cloud.callFunction(data)
    }catch(e){
        //console.log("系统忙，请重试！",e)
        wx.showModal({
            title: '',
            content: '网络错误，请重试！',
            showCancel:false,
        })
        if(isShowLoading) {
            wx.hideLoading()
        }
    }
    if(res['statusCode']!=200){
        if(isShowLoading) {
            wx.hideLoading()
        }
        return {
            res:res,
            msg: '网络错误！'
        }
    }
    console.log(res)
    res=res.data;
    if( Object.prototype.toString.call(res)!=='[object Object]' ){
        if(isShowLoading) {
            wx.hideLoading()
        }
        return {
            res:res,
            msg: '网络错误！'
        }
    }
    // 未注册会员
    if(res.errcode == '41001'){
        wx.removeStorageSync('userInfo')
        wx.hideLoading()
        wx.navigateTo({
            url: '/pages/login/login',
        })
        return Promise.reject();
    }
    
    if(isShowLoading) {
        wx.hideLoading()
    }
    
    return res;
}
async function login(url, params, method, isShowError){
    let data = {
        name:url
    }
    let res=await wx.cloud.callFunction(data)
    try {
        wx.setStorageSync('userInfo', res.result);
    } catch (e) {    

    }
    return res.result;
}