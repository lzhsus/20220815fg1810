var path = require('path');
var gaze = require('gaze');
var fs = require('fs');
var glob = require('glob');



function readJs(file){
	fs.readFile(file, "utf8", function(err, data){  
        if(err)  
            console.log("读取文件fail " + err);  
        else{  
            var strArr=data.match(/^(\(function)[\s\S]*(\(lib = lib)/);
            if(strArr&&strArr.length>0){
            	writeJs(file,strArr[0]);
            }
        }  
    }); 
}
function writeJs(file,str){
	str="module.exports="+str.replace("(lib = lib",";");
    fs.writeFile(file, str, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });
    
}
module.exports.watch=function(){
	gaze(__dirname+'/../static/flash/*.js', function(err, watcher) {
	  this.on('changed', function(filepath) {
	    readJs(filepath);
	  });
	});
}
module.exports.format=function(){
	glob.sync(__dirname + '/../static/flash/*.js').forEach(function(file) {
	    readJs(file);
	});
}