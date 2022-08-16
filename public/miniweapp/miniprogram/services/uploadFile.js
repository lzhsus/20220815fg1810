const app = getApp()
const common = require('../common/common');

let uploadFile = async (imgList, dir) => {
    let promiseAll = [];
    return new Promise(async function (resolve, reject) {
        for (let index = 0; index < imgList.length; index++) {
            let item = imgList[index];
            var url = await wxUploadFile(item, dir).catch(error => {
                wx.showModal({
                    content: '资源上传失败，请重新上传！',
                    showCancel: false
                })
                reject(error)
                wx.hideLoading()
            })
            promiseAll.push(url)
        }
        resolve(promiseAll)
    })
}
let wxUploadFile = (file, dir) => {
    return new Promise(function (resolve, reject) {
        wx.getFileSystemManager().readFile({
            filePath: file, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
                wx.cloud.callFunction({
                    name: 'uploadFile',
                    data: {
                        path: (dir || 'share_img') + '/' + common.createImgName(dir, 'png'),
                        file: res.data
                    },
                    success(_res) {
                        resolve(_res)
                    },
                    fail(_res) {
                        reject(_res)
                    }
                })
            }
        })
    })
}
let setImgLink = async (list) => {
    return new Promise(function (resolve, reject) {
        let promiseAll = [];
        list.forEach((obj, index) => {
            promiseAll.push(wx.cloud.callFunction({
                name: 'add',
                data: {
                    fileID: list[index].fileID,
                    statusCode: list[index].statusCode,
                    create_time: app.common.getNewTime()
                }
            }))
        })
        Promise.all(promiseAll).then((fileURL) => {
            var success = true;
            var item = fileURL[0]
            fileURL.forEach(res => {
                if (res.errMsg != "cloud.callFunction:ok") {
                    success = false;
                    item = res
                }
            })
            resolve(item)
        }).catch(error => {
            wx.showModal({
                content: '资源上传失败，请重新上传！',
                showCancel: false
            })
            reject(error)
            wx.hideLoading()
        })

    })
}
// 记录图片随手拍分享
let setShareImgLink = async (list) => {
    return new Promise(function (resolve, reject) {
        let promiseAll = [];
        list.forEach((obj, index) => {
            promiseAll.push(wx.cloud.callFunction({
                name: 'add',
                data: {
                    fileID: list[index].fileID,
                    statusCode: list[index].statusCode,
                    create_time: app.common.getNewTime()
                }
            }))
        })
        Promise.all(promiseAll).then((fileURL) => {
            var success = true;
            var item = fileURL[0]
            fileURL.forEach(res => {
                if (res.errMsg != "cloud.callFunction:ok") {
                    success = false;
                    item = res
                }
            })
            resolve(item)
        }).catch(error => {
            wx.showModal({
                content: '资源上传失败，请重新上传！',
                showCancel: false
            })
            reject(error)
            wx.hideLoading()
        })

    })
}
// 第一步
let uploadFiles = async function (filePath, dir,suffix) {
    const cloudPath = [];
    filePath.forEach((item, i) => {
        cloudPath.push((dir || 'share_img') + '/' +common.createImgName(dir, suffix))
    })

    let promiseAll = [];
    return new Promise(async function (resolve, reject) {
        for (let i = 0; i < filePath.length; i++) {
            var cloudPath = (dir || 'share_img') + '/' + common.createImgName(dir, suffix)

            let url = await common.compressImage2(filePath[i]);

            var file = await wxUploadFile2(cloudPath, url,suffix).catch(error => {
                wx.showModal({
                    content: '资源上传失败，请重新上传！',
                    showCancel: false
                })
                reject(error)
                wx.hideLoading()
            })

            promiseAll.push(file)
        }

        Promise.all(promiseAll).then((result) => {
            resolve(result)
        }).catch((error) => {
            reject(error) // 失败了，打出 '失败'
        })
    })
}
let getFileSystemManager = (file) => {
    return new Promise(function (resolve, reject) {
        wx.getFileSystemManager().readFile({
            filePath: file, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success:async res => { //成功的回调
                const buffer = res.data
                let result = await wx.cloud.callFunction({
                    name: 'imgSecCheck',
                    data: {
                        'buffer': buffer
                    }
                })
                resolve(result)
            }
        })
    })
}
// 获取地址
let wxUploadFile2 = (cloudPath, filePath,suffix) => {
    return new Promise(function (resolve, reject) {
        wx.cloud.uploadFile({
            cloudPath: cloudPath,
            filePath: filePath,
            success:async res => {
                if(suffix=='mp3'){
                    resolve(res)
                    return
                }
                // let checkRes = await getFileSystemManager(filePath);
                // if( checkRes.result&&checkRes.result.code!=200 ){
                //     reject(checkRes)
                // }else{
                //     resolve(res)
                // }
                resolve(res)
            },
            fail: e => {
                reject(e)
            }
        })
    })
}
export {
    uploadFile,
    setImgLink,
    uploadFiles,
    setShareImgLink

}