import appConfig from "../../common/app_config.js";

var loginPromis;
export default async function request(name,url, params={},isShowLoading=true) {
    if(isShowLoading) {
        console.log('isShowLoading')
        wx.showLoading({
            title:'加载中',
            mask:true
        });
    }
    let data={
        name: name,
        data: {
            $url: url,
            data: params,
        }
    }
    if(params['weRunData']) data.data['weRunData'] = params['weRunData'];
    // await checkSession();

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
        res=await wx.cloud.callFunction(data)
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
    
    res=res.result;
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
function checkSession(){
    return new Promise(function(resolve, reject) {
        wx.checkSession({
            success: ()=>{
                resolve(0)    
            },
            fail: (res)=>{
                console.log(res)
                login('login').then(()=>{
                    resolve(1);
                });
            }
        })
    })
}