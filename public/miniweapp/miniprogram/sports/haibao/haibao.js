
Page({
    data: {
        imgData:""
    },
    onLoad: function (options) {
        this.createHaibao()
    },
    onShow: function () {

    },
    async createHaibao(){
        // 创建离屏 2D canvas 实例
        const IMAGE_URL = 'https://6c7a-lzhsus-1g4h29bs69c66542-1301447037.tcb.qcloud.la/20210315182243.png?sign=965de74d5d745a34c5fa54bfbca8424a&t=1619403874';
        const canvas = wx.createOffscreenCanvas({type: '2d', width: 100, height: 100,compInst:{id:111}})
        // 创建一个图片
        const image = canvas.createImage()
        // 等待图片加载
        await new Promise(resolve => {
            image.onload = resolve
            image.src = IMAGE_URL // 要加载的图片 url
        })
        let { width,height } = image;
        canvas.width = width;
        canvas.height = height;
        // 获取 context。注意这里必须要与创建时的 type 一致
        const context = canvas.getContext('2d')
        // 把图片画到离屏 canvas 上
        context.clearRect(0, 0, width, height)
        context.drawImage(image, 0, 0, width, height)

        // 获取画完后的数据
        const imgData = context.getImageData(0, 0, 100, 100)
        console.log(canvas)
        wx.canvasToTempFilePath({
            canvas: canvas,
            success:res=>{
                console.log(res)
            },
            fail:(err)=>{
                console.log(err)
            },
        })     
    }
})