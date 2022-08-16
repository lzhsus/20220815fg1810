<!DOCTYPE html>
<html lang=zh-CN>
<head>
<meta charset=utf-8>
    <title>Template</title>
    <meta name=format-detection content="telephone=no, address=no, email=no">
    <meta name=viewport content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0">
    <meta name=apple-mobile-web-app-status-bar-style content=black>
    <meta name=apple-mobile-web-app-capable content=yes>
    <script src=static/js/flexible.js></script>
    <script>
        var serverPath = "";
        (function() {
            if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                handleFontSize();
            } else {
                document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
            }
            function handleFontSize() {
                // 设置网页字体为默认大小
                WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
                // 重写设置网页字体大小的事件
                WeixinJSBridge.on('menu:setfont', function() {
                    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
                });
            }
        })();
    </script>
<link href=dist/css/common.css?85bc4706074ff0568e5a rel=stylesheet><link href=dist/css/home.css?85bc4706074ff0568e5a rel=stylesheet></head>
<body>
    <div id=app></div>
    <script type=text/javascript src=//res.wx.qq.com/open/js/jweixin-1.6.0.js></script>
<script type=text/javascript src=dist/js/common.js?85bc4706074ff0568e5a></script><script type=text/javascript src=dist/js/home.js?85bc4706074ff0568e5a></script></body>
</html>
