import cloudRequest from "./cloudRequest";

let api = Object.assign({},{});

api.cloud_userInfo = function(data, isShowLoading=true){
    return cloudRequest('GET','/container-lzh-demo/api/user/info',data,isShowLoading);
}


module.exports = api;