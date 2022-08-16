/**
 * 使用 wx小程序 提供的 localStorage来缓存数据
 **/
/**
 * LS.get("key")                获取指定缓存
 * LS.put("key",value,expired)  存储数据 key 任意数据 设置天数（默认无限）
 * LS.remove("key")             删除指定缓存
 * LS.clear()                   删除全部缓存
 * 
 */
const SPLIT_STR = '@'
/**
 *   wx.setStorageSync('key', 'value')
 *   wx.removeStorageSync('key')
 *   wx.getStorageSync('key')
 */
const DATA_PROCESS_MAPPING = {
    'number': {
        save: data => data,
        parse: data => Number.parseFloat(data)
    },
    'object': {
        save: data => JSON.stringify(data),
        parse: data => JSON.parse(data)
    },
    'undefined': {
        save: data => data,
        parse: () => undefined
    },
    'default': {
        save: data => data,
        parse: data => data
    }
}

function getProcess(type) {
    return DATA_PROCESS_MAPPING[type] || DATA_PROCESS_MAPPING['default']
}

export default {
    get(key) {
        let stringData = wx.getStorageSync(key);
        if (stringData) {
            let dataArray = stringData.split('@')
            let data
            let now = Date.now()
            if (dataArray.length > 2 && dataArray[2] < now) { // 缓存过期
                wx.removeStorageSync(key)
                return null
            } else {
                let value = decodeURIComponent(dataArray[1])
                data = getProcess(dataArray[0]).parse(value)
                return data
            }
        }
        return null
    },
    put(key, value, expired) { 
        const type = typeof value;//获取类型
        const process = getProcess(type)
        if (!expired) { // 默认不传 不过期
            value = type + SPLIT_STR + encodeURIComponent(process.save(value))
        } else {
            // expired 过期时间 单位天 默认是100 上线测试没问题替换旧的设值
            let time = expired * 24 * 60 * 60 * 1000 + new Date().getTime()
            // 单位分钟
            // let time = expired * 60 * 1000
            value = type + SPLIT_STR + process.save(value) + SPLIT_STR + time
        }
        wx.setStorageSync(key, value)
    },
    clear() {
        wx.clearStorageSync()
    },
    remove(key) {
        wx.removeStorageSync(key)
    }
}