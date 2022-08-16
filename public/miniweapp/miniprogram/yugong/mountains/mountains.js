Page({
    data: {
        pageUnload:false
    },

    onLoad: function (options) {

    },
    onShow: function () {

    },
    onUnload(){
        this.setData({
            pageUnload:true
        })
    }
})