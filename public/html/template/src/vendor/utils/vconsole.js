var isShow=false;
var count = 0
document.addEventListener('touchstart', touchStartHandler);
function touchStartHandler(event){
    if( localStorage.vconsole==1 ){
        localStorage.vconsole = 0;
    }else{
        if(isShow)return;
        if (event.targetTouches.length >= 3) {
            if (count == 0) {
                setTimeout(() => count = 0, 2000)
            }
            if (++count >= 3) {
                count = 0            
                init();
            }
        }
    }
}
if( localStorage.vconsole==1 ){
    init();
}
function init(){
    localStorage.vconsole = 1;
	document.removeEventListener('touchstart', touchStartHandler);
	isShow=true;
	require.ensure([], function(require) {
        let VConsole=require('vconsole');
        let _vConsole = new VConsole();
   });
}