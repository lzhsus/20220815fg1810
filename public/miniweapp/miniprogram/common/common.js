import ls from "../services/cz-storage";
import _moment from "../utils/moment.min"
import appConfig from "../common/app_config";
var QQMapWX = require('../services/qqmap-wx-jssdk.min');
var mta = require('../services/mta_analysis')
var qqmapsdk;
var locationData;

export const LS = ls;
export const moment = _moment;
export const isIOS = function () {
    const res = wx.getSystemInfoSync();
    return res.system.toLowerCase().indexOf("ios") != -1 && res.platform.indexOf("devtools") == -1
}
export const formatMoney = function (value, isFixed = 2) {
    value = Number(value)
    if (value == 0) return value;
    value = value.toFixed(isFixed)
    if (Math.abs(value) < 1000) {
        return value
    }
    return String(value).replace(/./g, (c, i, a) => i && c !== '.' && !((a.length - i) % 3) ? ',' + c : c);
}
// 关卡
export const gradeImage = function (num) {
    let arr = [backImg('l'), backImg('v')]
    if (num < 10) {
        let _num = '0' + num;
        arr.push(backImg(_num))
    } else {
        let _nums = (num + '').split('')
        for (let i = 0; i < _nums.length; i++) {
            let _num = '0' + _nums[i];
            arr.push(backImg(_num))
        }
    }
    return arr;

    function backImg(txt) {
        return `https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/font_num/font-num_${txt}.png`;
    }
}
// 复制内容
export const copyData = function (data) {
    wx.setClipboardData({
        data: data,
        success: function (res) {
            wx.getClipboardData({
                success: function (res) {}
            })
        },
        fail: () => {

        }
    })
}
export const UID = function () {
    // 年月日时分秒 + 4位随机数
    let temp = common.moment().format("YYYYMMDDHHmmss");
    let postfix = ''
    return temp + '' + 'postfix';
}
export const checkMobileTxt = function (mibile) {
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    return mibile.replace(reg, "$1****$2")
}
// 字体初始化
export const loadFontFaceInit = function (source, family) {
    return new Promise((resolve, reject) => {
        wx.loadFontFace({
            family: family,
            source: `url(${source})`,
            success(res) {
                console.info("字体 " + family + " 初始化成功...")
            },
            fail: function (res) {
                console.info("字体 " + family + " 初始化失败...")
            },
            complete: function (res) {
                resolve()
            }
        });
    })
}
// 微信复制
export const setClipboardData = function (data) {
    if (!data) {
        wx.showToast({
            title: '复制内容不可为空',
            icon: 'none',
            duration: 1000
        })
        return
    }
    return new Promise((resolve, reject) => {
        wx.setClipboardData({
            data: data || '',
            success: () => {
                resolve(true)
            },
            fail: () => {
                resolve(false)
            }
        })
    })
}
export const subscribeMessage = function (tmplIds = []) {
    return new Promise(function (resolve) {
        wx.requestSubscribeMessage({
            tmplIds: tmplIds,
            complete: (res) => {
                res.tmplIds = tmplIds;
                resolve(res);
            }
        });
    });
}
export const scheduleLoading = function (step, target, deg = 360) {
    if (step >= target) return deg;
    return deg * step / target;
}
export const scheduleSH = function (step, target) {
    if (step >= target) return 100;
    return ((step / target) * 100).toFixed(2)
}
export const getNewTime = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }

    return hour + ':' + minute + ':' + second;
}
export const formatSeconds = function (value, language) {
    let secondTime = Number(value) //将传入的秒的值转化为Number
    let min = 0 // 初始化分
    let h = 0 // 初始化小时
    let d = 0 //初始化天
    let result = ''
    if (secondTime >= 60) { //如果秒数大于60，将秒数转换成整数
        min = Number(secondTime / 60) //获取分钟，除以60取整数，得到整数分钟
        secondTime = Number(secondTime % 60) //获取秒数，秒数取佘，得到整数秒数
        if (min >= 60) { //如果分钟大于60，将分钟转换成小时
            h = Number(min / 60) //获取小时，获取分钟除以60，得到整数小时
            min = Number(min % 60) //获取小时后取佘的分，获取分钟除以60取佘的分
            if (h >= 24) {
                d = Number(h / 24)
                h = Number(h % 24)
            }
        }
    }
    if (language == 'zh') {
        if (h) {
            result = parseInt(h) + '小时' + parseInt(min) + '分' + parseInt(secondTime) + '秒'
        } else if (min) {
            result = parseInt(min) + '分' + parseInt(secondTime) + '秒'
        } else {
            result = parseInt(secondTime) + '秒'
        }
    } else {

        if (h) {
            result = parseInt(h) < 10 ? '0' + parseInt(h) : parseInt(h) + ':' + parseInt(min) < 10 ? '0' + parseInt(min) : parseInt(min) + ':' + parseInt(secondTime) < 10 ? '0' + parseInt(secondTime) : parseInt(secondTime)
        } else if (min) {
            result = (parseInt(min) < 10 ? '0' + parseInt(min) : parseInt(min)) + ':' + (parseInt(secondTime) < 10 ? '0' + parseInt(secondTime) : parseInt(secondTime))
        } else {
            result = parseInt(secondTime) < 10 ? '0' + parseInt(secondTime) : parseInt(secondTime)
        }
    }
    return result;
}

export const getCurrentPage = function (isParam = true) {
    let _getCurrentPages = getCurrentPages() || [];
    let _Pages = _getCurrentPages[_getCurrentPages.length - 1] || {};
    let _route = _Pages.route;
    let _parameter = objToParam(_Pages.options);
    let pagesUrl = isParam ? ("/" + _route + (_parameter ? '?' + _parameter : _parameter)) : "/" + _route;
    return pagesUrl;
}

export const objToParam = function (a) {
    var s = [],
        rbracket = /\[\]$/,
        isArray = function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },
        add = function (k, v) {
            v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
            s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
        },
        buildParams = function (prefix, obj) {
            var i, len, key;

            if (prefix) {
                if (isArray(obj)) {
                    for (i = 0, len = obj.length; i < len; i++) {
                        if (rbracket.test(prefix)) {
                            add(prefix, obj[i]);
                        } else {
                            buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
                        }
                    }
                } else if (obj && String(obj) === '[object Object]') {
                    for (key in obj) {
                        buildParams(prefix + '[' + key + ']', obj[key]);
                    }
                } else {
                    add(prefix, obj);
                }
            } else if (isArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    add(obj[i].name, obj[i].value);
                }
            } else {
                for (key in obj) {
                    buildParams(key, obj[key]);
                }
            }
            return s;
        };

    return buildParams('', a).join('&').replace(/%20/g, '+');
}
// 页面跳转
export const openWeappLink = function (link, pages) {
    if (!link) return;
    if (link.indexOf("https:") != -1) {
        if (pages) {
            wx.navigateTo({
                url: pages + '?link=' + encodeURIComponent(link),
            });
            return;
        }
        wx.navigateTo({
            url: '/pages/webview/webview?link=' + encodeURIComponent(link),
        });
    } else {
        if (link.indexOf("appid:") != -1) {
            let path = link.split("##");
            let _appid = path[0].replace(/appid:/i, "");
            let _path = path[1] || '';
            if (_appid) {
                wx.navigateToMiniProgram({
                    appId: _appid,
                    path: _path,
                });
            }
        } else {
            let tabPathLink = link.split('?')[0];
            if (appConfig.tabPath.indexOf(tabPathLink) != -1) {
                wx.switchTab({
                    url: link,
                });
            } else {
                wx.navigateTo({
                    url: link
                });
            }
        }
    }
}
export const getFileID = function (fileID) {
    return fileID.replace('cloud://lzhsus-1g4h29bs69c66542.6c7a-lzhsus-1g4h29bs69c66542-1301447037/', 'https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/');
}

export const compressImage = async function (data, isCompressPng) {
    let arr = [];
    data.forEach(item => {
        arr.push(new Promise(async function (resolve, reject) {
            if (item.success) {
                resolve(item);
            } else if (getType(item.url) == '.JPG') {
                let url = await getCompressImage(item.url);
                item.url = url;
                resolve(item);
            } else if (isCompressPng) {
                let url = await createHaiabo('haibaoCanvas', item.url)
                item.url = url;
                url = await getCompressImage(item.url);
                item.url = url;
                resolve(item);
            } else {
                resolve(item);
            }
        }));
    });
    return Promise.all(arr);
}

function getCompressImage(url) {
    return new Promise((resolveC, rejectC) => {
        wx.compressImage({
            src: url,
            quality: 20,
            success: (res) => {
                resolveC(res.tempFilePath)
            },
            fail: res => {
                resolveC(url)
            }
        });
    })
}

function createHaiabo(canvasID, img) {
    return new Promise((cbResolve, cbReject) => {
        const query = wx.createSelectorQuery();
        query.select("#" + canvasID).fields({
            node: true,
            size: true
        }).exec((res) => {
            const canvas = res[0].node;
            let ctx = canvas.getContext('2d');
            let img1 = new Promise((resolve, reject) => {
                getImageInfo(canvas, img, resolve);
            })
            Promise.all([img1]).then(function (res) {

                canvas.width = res[0].width;
                canvas.height = res[0].height;

                ctx.drawImage(res[0], 0, 0, canvas.width, canvas.height);
                ctx.save();
                wx.canvasToTempFilePath({
                    canvas: canvas,
                    width: canvas.width,
                    height: canvas.height,
                    fileType: "jpg",
                    quality: 0.2,
                    success: (res) => {
                        cbResolve(res.tempFilePath);
                    },
                    fail: (res) => {
                        cbResolve(img);
                    },
                })
            }).catch((res) => {
                cbResolve(img);
            });

        })
    });
}

function getImageInfo(canvas, imgPath, resolve) {
    var img = canvas.createImage();
    img.onload = function () {
        resolve(img);
    }
    img.src = imgPath;
}

function getType(file) {
    let path = JSON.parse(JSON.stringify(file));
    var index1 = path.lastIndexOf(".");
    var index2 = path.length;
    var type = path.substring(index1, index2).toUpperCase();
    return type;
}

// 根据地址获取经纬度
export const getReverseGeocoder = function (address) {
    if (!qqmapsdk) {
        qqmapsdk = new QQMapWX({
            key: appConfig.txMapKey,
        });
    }
    return new Promise((resolve, reject) => {
        qqmapsdk.reverseGeocoder({
            address: address,
            success: (res) => {
                res = res.result || {};
                resolve(res.location);
            },
            fail: (err) => {},
            complete: (res) => {}
        });
    });
}

// 开启返回提示
export const enableAlertBeforeUnload = function (message) {
    if (wx.enableAlertBeforeUnload) {
        wx.enableAlertBeforeUnload({
            message: message || '是否退出当前页面？',
        });
    }
}

export const downloadFile = function (path) {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url: path, //仅为示例，并非真实的资源
            success(res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    resolve({
                        success: true,
                        path: res.tempFilePath
                    })
                } else {
                    resolve({
                        success: false,
                        path: ''
                    })
                }
            },
            fail() {
                resolve({
                    success: false,
                    path: ''
                })
            }
        })
    })
}
// 图片压缩
export const compressImage2 = async function (url) {
    return new Promise((resolve, reject) => {
        if (getType2(url) == '.JPG') {
            wx.compressImage({
                src: url,
                quality: 0.5,
                success: (res) => {
                    resolve(url);
                },
                fail: res => {
                    resolve(url);
                }
            });
        } else {
            resolve(url);
        }
    })
}

function getType2(file) {
    let path = JSON.parse(JSON.stringify(file));
    var index1 = path.lastIndexOf(".");
    var index2 = path.length;
    var type = path.substring(index1, index2).toUpperCase();
    return type;
}

export const createImgName = function (dir, suffix) {
    var name = '';
    let arr = dir.split('/') || [''];
    name = arr[arr.length - 1] + '_' + new Date().getTime() + '.' + (suffix || 'png')

    return name;
}