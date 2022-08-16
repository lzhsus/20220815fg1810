let origin = window.location.origin;
import query from "vendor/utils/getUrlParms";
import Api from "api/index";
import moment from "moment";
import addressDatas from "api/address.json";
import AppData from "./AppData";
// 是否微信访问
export const isWeiXin = function() {
    var ua = window.navigator.userAgent.toLowerCase();
    console.log('ua', ua);
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

//字符串截取
export const getByteVal = function(val, max) {
    var returnValue = '';
    var byteValLen = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null) {
            byteValLen += 2;
        } else {
            byteValLen += 1;
        }
        if (byteValLen > max) {
            break;
        }
        returnValue += val[i];
    }
    return returnValue;
}
// 字符的长度
export const gblen = function(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
}

export const group = function(array, subGroupLength) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
}

// 深度拷贝
export const depthCopy = function(data) {
    return JSON.parse(JSON.stringify(data));
}

// 排序
export const getDataSort = function(data, name) {
    return data.sort(function(a, b) {
        return a[name] - b[name];
    });
}

// 获取视频url
export const getVideoFileURL = function(file) {
    var getUrl = null;
    if (window.createObjectURL != undefined) { // basic
        getUrl = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
    }
    return getUrl;
}

// 求百分比
export const getPercent = function(num, total) {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }
    return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
}

// 获取地理位置
export const getCurrentPosition = function() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            let coords;
            /* 地理位置服务可用 */
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                coords = position.coords;
                getCurrentPositionInfo(coords, resolve);
            });
            if (!coords) {
                getCurrentPositionInfo({
                    latitude: 39.916152,
                    longitude: 116.403406,
                }, resolve);
            }
        } else {
            getCurrentPositionInfo({
                latitude: 39.916152,
                longitude: 116.403406,
            }, resolve);
        }
    });
}

// 资源路径拼接
export const getUrlPath = function(url, type) {
    if (!url) return '';
    return url.indexOf('http') != -1 ? url : (vueApp.config.ossPath + (url.indexOf('?') != -1 ? url + '&' : url + '?') + 'v=20210414' + (type == 'video' ? '' : '&x-oss-process=style/miniapp'));
}

function getCurrentPositionInfo(coords, resolve) {
    $.ajax({
        type: "get",
        dataType: 'jsonp',
        data: {
            location: coords.latitude + ',' + coords.longitude,
            key: vvueApp.config.mapTxKey,
            output: 'jsonp',
            get_poi: 0,
        },
        jsonp: "callback",
        jsonpCallback: "QQmap",
        url: "http://apis.map.qq.com/ws/geocoder/v1/",
    }).done((res) => {
        res = res.result || {};
        let ad_info = res.address_component || {};
        ad_info.location = res.location || {};
        ad_info.formatted_addresses = res.formatted_addresses || {};
        ad_info.address = res.address || '';
        resolve(ad_info);
    })
}

let filedata;
// 上传图片
export const uploadImageFile = function(file) {
    // let formData = new FormData();
    // formData.append("file", file);
    // Api.uploadImageFile(formData, {
    //     isUpload: true,
    // })
    filedata = file;
    return new Promise(function(resolve, reject) {
        let promiseAll = []
        filedata.forEach((obj, index) => {
            promiseAll.push(wxUploadFile(index));
        })
        Promise.all(promiseAll).then((res) => {
            resolve(filedata)
        }).catch(error => {
            console.log(error)
            resolve(error)
        })
    })
}

let wxUploadFile = async (index) => {
    // let requestHeaderRes = await Api.getHeader({
    //     accessToken: store.state.userInfo.header.accessToken,
    //     accessChannel: store.state.userInfo.header.accessChannel,
    //     env: appConfig.envVersion,
    // });
    return new Promise(function(resolve, reject) {
        let formData = new FormData();
        formData.append("file", dataURLtoBlob(filedata[index].pic));
        Api.uploadImageFile(formData, {
            isUpload: true,
        }).then(res => {
            if (res.result) {
                filedata[index] = {
                    img_url: filedata[index].pic,
                    img_url2: res.data,
                    index: filedata[index].index,
                };
                resolve(res.data);
            } else {
                reject({
                    error: true,
                    errordata: res,
                    index: index,
                });
            }
        });
    });
}


export const autoTextarea = (elem, extra, maxHeight) => {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function(type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function(name) {
            var val = elem.currentStyle[name];
            if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';

            };
            return val;
        } : function(name) {
            return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));
    elem.style.resize = 'none';
    var change = function() {
        var scrollTop, height,
            padding = 0,
            style = elem.style;
        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;
        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };
    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
}

export const find = function(str, cha, num) {
    let x = str.indexOf(cha);
    for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
    }
    return x;
}


// 从 canvas 提取图片 image  
export const convertCanvasToImage = function(canvas) {
    return canvas.toDataURL("image/jpeg", 1);
}

// 生成json文件
export const saveJSON = function(data, filename) {
    if (!data) {
        alert('保存的数据为空');
        return;
    }
    if (!filename)
        filename = 'json.json'
    if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 4)
        console.log('----', data)
    }
    var blob = new Blob([data], { type: 'text/json' }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}
// base64 转 blob
export const dataURLtoBlob = function(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

// 页面跳转
export const openLink = function(link, isReplace) {
    if (window.location.origin.indexOf('localhost') != -1) {
        window.location.href = link;
        return;
    }
    let parameter = link.split('?')[1] || '';
    if (link.indexOf('index.html') != -1) {
        link = vueApp.config.serverPath + 'monopoly2021/game61/index' + (parameter ? '?' + parameter : '');
    }
    if (isReplace) {
        location.replace(link);
    } else {
        window.location.href = link;
    }
}
// 是否小程序访问
export const isWeiXinWeapp = function() {
    return new Promise((resolve, reject) => {
        if (isWeiXin()) {
            wx.miniProgram.getEnv((res) => {
                if (res.miniprogram) {
                    console.log('小程序webview访问');
                    resolve(true);
                } else {
                    console.log('非小程序访问-微信环境');
                    getLlbLogin(resolve);
                }
            })
        } else {
            console.log('非小程序访问-其他环境');
            getLlbLogin(resolve);
        }
    });
}
// 手机号码判断
export const isMobile = function(tel) {
    return /^1\d{10}$/.test(tel);
}

// 头像
export const getHeadimgurl = function(headimgurl) {
    if (headimgurl) {
        headimgurl = headimgurl.indexOf('http') != -1 ? headimgurl : vueApp.config.ossPath + headimgurl;
    } else {
        headimgurl = window.photo || 'https://ling-static.eintone.com/miniapp/static/headimg.png?type=default';
    }
    return headimgurl;
}

// 头像
export const getHeadimgurl3 = function(headimgurl) {
    if (headimgurl) {
        headimgurl = headimgurl.indexOf('http') != -1 ? headimgurl : vueApp.config.ossPath + headimgurl;
    } else {
        headimgurl = 'https://ling-static.eintone.com/miniapp/static/headimg.png?type=default';
    }
    return headimgurl;
}

// 头像
export const getHeadimgurl2 = function(headimgurl, index) {
    if (headimgurl) {
        headimgurl = headimgurl.indexOf('http') != -1 ? headimgurl : vueApp.config.ossPath + headimgurl;
    } else {
        headimgurl = 'https://ling.intonecc.com/html/minilife2021/static/images/headimg-0' + (index % 4) + '.png?type=default';
    }
    return headimgurl;
}

export const openPageLink = async function(link, type) {
    let isWeapp = await isWeiXinWeapp();
    if (origin.indexOf("localhost") == -1) {
        let locationLink;
        let linkParam = link.split("?");
        if (link.indexOf("index.html") != -1) {
            locationLink = vvueApp.config.serverPath + "ling/partner";
        } else if (link.indexOf("home.html") != -1) {
            locationLink = vvueApp.config.serverPath + "ling/partner/home";
        } else if (link.indexOf("haibao.html") != -1) {
            locationLink = vvueApp.config.serverPath + "ling/partner/hb";
        } else if (link.indexOf("grade.html") != -1) {
            locationLink = vvueApp.config.serverPath + "ling/partner/grade";
        } else if (link.indexOf("rule.html") != -1) {
            locationLink = vvueApp.config.serverPath + "ling/partner/rule";
        } else if (link.indexOf("reg.html") != -1) {
            locationLink = vvueApp.config.serverPath + "ling/partner/reg";
        }
        if (linkParam[1]) {
            locationLink = locationLink + "?" + linkParam[1];
        } else {
            locationLink = locationLink;
        }
        link = locationLink;
    }
    link = getMergeParameter_HrefOrlink(link)
    if (isWeapp && (link.indexOf('/rule') != -1 || link.indexOf('/grade') != -1)) {
        let weappUrl = '/pages/webview';
        if (vueApp.config.isNewWeapp) {
            weappUrl = '/pages/yt/ytWebview/ytWebview';
        }
        wx.miniProgram.navigateTo({
            url: weappUrl + '?link=' + encodeURIComponent(link),
        });
        return;
    }
    if (type == 'replace') {
        window.location.replace(link);
    } else {
        window.location.href = link;
    }

}
export const getMergeParameter_HrefOrlink = function(link) {
    let href = window.location.href;
    let linkParam = link.split("?");
    let obj = Object.assign(urlToJson(href), urlToJson(link))
    let paramStr = ''
    for (const key in obj) {
        paramStr += key + '=' + obj[key] + '&';
    }
    paramStr = paramStr.substring(0, paramStr.length - 1);
    return linkParam[0] + '?' + paramStr;
}

export const urlToJson = (url = window.location.href) => {
    let obj = {},
        index = url.indexOf('?'), // 看url有没有参数
        params = url.substr(index + 1); // 截取url参数部分 id = 1 & type = 2
    if (index != -1) { // 有参数时
        let parr = params.split('&'); // 将参数分割成数组 ["id = 1 ", " type = 2"]
        for (let i of parr) { // 遍历数组
            let arr = i.split('='); // 1） i id = 1   arr = [id, 1]  2）i type = 2  arr = [type, 2]
            obj[arr[0]] = arr[1]; // obj[arr[0]] = id, obj.id = 1   obj[arr[0]] = type, obj.type = 2
        }
    }
    return obj;
}

export const objectToParamString = (paramObj) => {
    if (!paramObj) {
        return ''
    }
    let paramList = []
    Object.keys(paramObj) && Object.keys(paramObj).forEach(key => {
        let val = paramObj[key]
        if (val.constructor === Array) {
            val.forEach(_val => {
                paramList.push(key + '=' + _val)
            })
        } else {
            paramList.push(key + '=' + val)
        }
    })
    return paramList.join('&')
}

export const getPathUrl = function(link) {
    if (!link) return link;
    if (link.indexOf('http') != -1) return link;
    return vueApp.config.ossPath + link;
}
// 打开一张图片
export const openImageUrl = function(link) {
    if (!link) return link;
    link = getPathUrl(link);
    console.log('link', link)
    wx.previewImage({
        current: link, // 当前显示图片的http链接
        urls: [link] // 需要预览的图片http链接列表
    });
}
// 防抖
export const debounce = function(fn, wait) {
    var timer = null;
    return function() {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
    }
}
// 设置等级
export const botanyPerGrade = function(per) {
    per = per * 100;
    if (per >= 99) return 3;
    if (per >= 66) return 2;
    if (per >= 33) return 1;
    return 0;
}
export const isIOS = function() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        return true;
    }
    return false;
}
export const pageChangeShowHide = function() {
    let hidden, state, visibilityChange;
    if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        state = 'visibilityState';
        visibilityChange = 'visibilitychange';
    } else if (typeof document.mozHidden !== 'undefined') {
        hidden = 'mozHidden';
        state = 'mozvisibilityState';
        visibilityChange = 'mozvisibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        state = 'msvisibilityState';
        visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        state = 'webkitvisibilityState';
        visibilityChange = 'webkitvisibilitychange';
    }
    return { hidden, state, visibilityChange }
}