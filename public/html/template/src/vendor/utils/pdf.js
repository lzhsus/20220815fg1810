import PDFJS from 'pdfjs-dist';
import pdfWorker from "pdfjs-dist/build/pdf.worker";

/*
    el:'装载PDF的容器',
    fileURL:'文件地址',
    scale:'缩放倍数',
*/
export async function loadPdf({fileURL, scale=2, success}){    
    let pdf = await PDFJS.getDocument({
        url: fileURL,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.8.335/cmaps/',
        cMapPacked: true
    });
    let pages = pdf.numPages;
    let base64Arr = [];
    for( let i=1; i<=pages; i++ ){
        let canvas = document.createElement('canvas');
        let page = await pdf.getPage(i);
        let viewport = page.getViewport(scale);
        let context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        let renderContext = {
            canvasContext: context,
            viewport: viewport,
        }
        await page.render(renderContext);
        canvas.className = 'canvas';
        base64Arr.push(convertCanvasToImage(canvas));
    }
    success&&success(base64Arr);
}

// canvas中获取图片
function convertCanvasToImage(canvas) {
	return canvas.toDataURL("image/jpeg",1);
}