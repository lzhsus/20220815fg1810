'use strict'
var path = require('path');
var gaze = require('gaze');
var fs = require('fs');
var glob = require('glob');
var webpack = require('webpack');
var config = require('./webpack.config');
var flash=require('./flash');
flash.format();
flash.watch();

for(var i in config.entry){
  config.entry[i].unshift(path.resolve(__dirname, './client'),"webpack/hot/dev-server");
  // config.entry[i].unshift('webpack-hot-middleware/client?noInfo=true&reload=true&name='+i,"webpack/hot/dev-server");
	// config.entry[i].unshift('webpack-dev-server/client?http://localhost:8080', "webpack/hot/dev-server");
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());

var  chokidar = require('chokidar');
var  express = require('express');
var  webpackDevMiddleware = require('webpack-dev-middleware');
var  WebpackHotMiddleware = require('webpack-hot-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');


var  app = express();
var  compiler = webpack(config);
var  webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
                                        publicPath: config.output.publicPath,
                                        hot: true,
                                        stats: { colors: true }
                                    });

var WebpackHotMiddlewareInstance = WebpackHotMiddleware(compiler,{
                                        log: false,
                                        heartbeat: 5000,
                                        timeout:5000,
                                        reload:true,
                                    })

var  watcher = chokidar.watch([
                                path.resolve(__dirname, '../*.html'),
                                path.resolve(__dirname, '../static/css/*.css'),
                            ]);

watcher.on('ready', function() {
    console.log('Initial scan complete. Ready for changes');
});
watcher.on('change', function(path) {
    console.log('File [' + path + '] changed !');
    WebpackHotMiddlewareInstance.publish({action: 'reload'});
});


app.use(webpackDevMiddlewareInstance);
app.use(WebpackHotMiddlewareInstance);
app.use(express.static(path.join(__dirname, '../')));
// app.use('/miniapp/static/partner/', createProxyMiddleware({ target: 'https://ling.intonecc.com/', changeOrigin: true }));
// app.use('/pages/api/banner/', createProxyMiddleware({ target: 'https://ling.intonecc.com/', changeOrigin: true }));
// app.use('/ling/api/partner/', createProxyMiddleware({ target: 'https://ling.intonecc.com/', changeOrigin: true }));
// app.use('/', createProxyMiddleware({ target: 'https://ling-test1.intonecc.com/', changeOrigin: true }));
if(process.env.NODE_TEST=='production'){
app.use('/', createProxyMiddleware({ target: 'https://ling.eintone.com/', changeOrigin: true }));
}else if(process.env.NODE_TEST=='test1'){
app.use('/', createProxyMiddleware({ target: 'https://ling-test1.intonecc.com/', changeOrigin: true }));
}else if(process.env.NODE_TEST=='test2'){
app.use('/', createProxyMiddleware({ target: 'https://ling.intonecc.com/', changeOrigin: true }));
}else if(process.env.NODE_TEST=='local'){
app.use('/', createProxyMiddleware({ target: 'https://ling-local.intonecc.com/', changeOrigin: true }));
}else if(process.env.NODE_TEST=='dev'){
app.use('/', createProxyMiddleware({ target: 'https://ling-dev.intonecc.com/', changeOrigin: true }));
}else if(process.env.NODE_TEST=='dev2'){
app.use('/', createProxyMiddleware({ target: 'https://ling-dev2.intonecc.com/', changeOrigin: true }));
}else{
app.use('/', createProxyMiddleware({ target: 'https://ling.intonecc.com/', changeOrigin: true }));
}
app.use('/', createProxyMiddleware({ target: 'https://openapi-test.00bang.cn/', changeOrigin: true }));
app.use('/', createProxyMiddleware({ target: 'https://apis.map.qq.com/', changeOrigin: true }));


webpackDevMiddlewareInstance.waitUntilValid(() => {
  console.log('Package is in a valid state');
});

app.listen(8733, function (res) {
  console.log('Serve the files on port 8733.\n');
});

