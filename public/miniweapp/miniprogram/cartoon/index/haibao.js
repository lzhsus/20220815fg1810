import appConfig from '../../common/app_config';
import * as common from '../../common/common';

let errorNum = 0
let ctx
let getImageInfo = (canvas, imgPath, resolve, reject)=>{
    var img=canvas.createImage();
    img.onload=function(){
        resolve(img);
    }
    img.src = imgPath;
}
/**
 * 渲染圆形图片
 *
 * @param {Object} obj
 */
let drawImg = function (obj) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(obj.width / 2 + obj.x, obj.height / 2 + obj.y, obj.width / 2, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height); 
    ctx.restore();
}

/**
 * 渲染文字
 *
 * @param {Object} obj
 */
let drawText = function (obj) {
    ctx.save();
    ctx.fillStyle = obj.color;
    ctx.textAlign = obj.align;
    ctx.textBaseline = obj.baseline;

    ctx.fillText(obj.text, obj.x, obj.y);
    ctx.restore();
}
/**
 * 文本换行
 *
 * @param {Object} obj
 */
let textWrap = function (obj) {
    let tr = getTextLine(obj);
    for (let i = 0; i < tr.length; i++) {
        if (i < obj.line){
            let txt = {
                x: obj.x,
                y: obj.y + (i * Number(obj.height)),
                color: obj.color,
                size: obj.size,
                align: obj.align,
                baseline: obj.baseline,
                text: tr[i],
                bold: obj.bold
            };
            if (i == obj.line - 1) {
                txt.text = txt.text.substring(0, txt.text.length - 3) + '…';
            }
            drawText(txt);
        }
    }
}
/**
 * 获取文本折行
 * @param {Object} obj
 * @return {Array} arrTr
 */
let getTextLine = function(obj){
    // ctx.setFontSize(obj.size);
    let arrText = obj.text.split('');
    let line = '';
    let arrTr = [];
    for (let i = 0; i < arrText.length; i++) {
        var testLine = line + arrText[i];
        var metrics = ctx.measureText(testLine);
        var width = metrics.width;
        if (width > obj.width && i > 0) {
            arrTr.push(line);
            line = arrText[i];
        } else {
            line = testLine;
        }
        if (i == arrText.length - 1) {
            arrTr.push(line);
        }
    }
    return arrTr;
}
let images = [{
    url:appConfig.ossPath + "card_images/QP4a5rvW_0.png"
},{
    url:appConfig.ossPath + "card_images/QP4a5rvW_0.png"
},{
    url:appConfig.ossPath + "card_images/QP4a5rvW_0.png"
},{
    url:appConfig.ossPath + "card_images/QP4a5rvW_0.png"
},{
    url:appConfig.ossPath + "card_images/QP4a5rvW_0.png"
},{
    url:appConfig.ossPath + "card_images/QP4a5rvW_0.png"
}]
let _defaultImages = []
// 图片初始化
export async function cardImages(id){
    return new Promise((cbResolve,cbRejects)=>{
        if(_defaultImages.length==images.length) cbResolve();
        let query = wx.createSelectorQuery();
        query.select("#"+id).fields({ node: true, size: true }).exec((res) => { 
            const canvas = res[0].node;
            let loadings = []
            for(let i=0;i<images.length;i++){
                loadings.push(new Promise((resolve, reject)=> {
                    getImageInfo(canvas, images[i].url, resolve, reject);
                }))
            }
            Promise.all(loadings).then((res)=>{
                _defaultImages = res
                cbResolve()
            })
        })
    })
}

// 组件
export async function haibaoGet(data){
    errorNum = 0
    return new Promise((cbResolve, cbReject)=> {
        let query = wx.createSelectorQuery();
        query.select("#"+data.id).fields({ node: true, size: true }).exec((res) => {    
            const canvas = res[0].node;
            ctx = canvas.getContext('2d');
            canvas.width = data.width;
            canvas.height = data.height;
            // 随机出来图片
            let imagesLength = []
            for(let i=0;i<_defaultImages.length;i++){
                imagesLength.push(i)
            }
            function getRandom(s,len) {
                s.sort(function () { return 0.5 - Math.random() });
                return s.slice(0,len);
            }
            let randomIndex = getRandom(imagesLength,data.text.length);
            console.log(_defaultImages)
            
            ctx.fillStyle = data.color||'#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);   
            
            let _origin = {
                len_1:[{x:canvas.width/2,y:canvas.height/2}],
                len_2:[{x:canvas.width/4,y:canvas.height/2},{x:canvas.width*3/4,y:canvas.height/2}],
                len_2:[{x:canvas.width/4,y:canvas.height/2},{x:canvas.width*2/4,y:canvas.height/2},{x:canvas.width*3/4,y:canvas.height/2}]
            }
            


            for(let i=0;i<randomIndex.length;i++){
                let img = _defaultImages[randomIndex[i]];
                let _w = img.width*2;
                let _h = img.height*2;
                let x = _origin['len_'+randomIndex.length][i].x;
                let y = _origin['len_'+randomIndex.length][i].y;
                ctx.drawImage(img, x-_w/2, y-_h/2, _w,_h); 
            }
            
            ctx.save();
            wx.canvasToTempFilePath({
                canvas: canvas,
                width: data.width,
                height: data.height,
                destWidth: data.width,
                destHeight: data.height,
                quality: 1,
                fileType: 'jpg',
                success:(res)=> {
                    cbResolve(res.tempFilePath);
                },
                fail:(res)=> {

                    cbReject()
                },
            }) 
        })
    });
}