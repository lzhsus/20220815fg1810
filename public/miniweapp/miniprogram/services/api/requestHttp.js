import appConfig from "../../common/app_config.js";

export default async function requestHttp(url, params={},isShowLoading=true) {
    if(isShowLoading) {
        wx.showLoading({
            title:'加载中',
            mask:true
        });
    }
    let data = {
        url: url,
        data: {},
        method: "GET",
        dataType: 'json',
        header: Object.assign({
            'content-type': 'application/json',
        },{}),
    }
    let res = await wxRequest(data);
    
    if(isShowLoading) {
        wx.hideLoading()
    }
    
    return res;
}

function wxRequest(data){    
    return new Promise((resolve, reject)=> {
        let requestTask = wx.request({
            ...data,
            ...{
                complete: (res)=>{
                    if( res.statusCode==200 ){
                        let data = res.data;
                        resolve(data);
                    }else{
                        reject();
                    }                    
                },
            }
        });
    });
}
