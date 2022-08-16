function getHaibao(data, cb){
    console.log(data);

    var haibaoStage = new createjs.Stage("haibaoCanvas");
    var container = new createjs.Container();//绘制外部容器
        haibaoStage.addChild(container);
    var imgArr = [
        data.qrcodeImg, 
        data.bgImg,
        data.headImg,
    ]
    Promise.all(loadImg(imgArr)).then(function (res) {
        console.log('海报',res);
        var img1 = res[0]; // 二维码
        var img2 = res[1]; //作品
        var img3 = res[2]; //作品
        var shape=new createjs.Shape();
        // shape.graphics.beginFill("#fff").drawRect(0, 0, 730, 1000);
        var bitmap1 = new createjs.Bitmap(img1);
        var bitmap2 = new createjs.Bitmap(img2);
        // /*--头像开始--*/
        var bitmap3 = new createjs.Bitmap(img3);
        // //创建圆形
        var circle2 = new createjs.Shape();
        circle2.graphics.beginFill().drawCircle(90, 90, 45); 
        container.addChild(circle2);
        circle2.x = 20;
        circle2.y = 400;
        //进行遮罩处理
        bitmap3.setTransform(0, 0, 90/img3.width, 90/img3.height);
        bitmap3.mask = circle2;            
        bitmap3.x = 65;
        bitmap3.y = 445;
        // 昵称
        var nickname = new createjs.Text(data.nickname, " 25px Arial", "#fff");
        nickname.x = 170;
        nickname.y = 480;

        //创建圆形
        var circle = new createjs.Shape();
        circle.graphics.beginFill().drawCircle(150, 150, 75); 
        container.addChild(circle);
        circle.x = 370;
        circle.y = 520;  

        //进行遮罩处理
        bitmap1.setTransform(0, 0, 150/img1.width, 150/img1.height);
        bitmap1.mask = circle;            
        bitmap1.x = 445;
        bitmap1.y = 595;

        container.addChild(shape,bitmap2,bitmap1,nickname,bitmap3);
        haibaoStage.update();
        var base64 = document.getElementById("haibaoCanvas").toDataURL('image/png', 1);
        cb&&cb(base64);
    });
}
function loadImg(srcArr){
    var arr = []
    srcArr.forEach(src=>{
        arr.push(new Promise(function (resolve, reject) {
            var image = new Image();
            image.crossOrigin = "Anonymous";
            image.onload = (e)=>{
                console.log(e)
                resolve(image)
            };
            image.onerror = reject;
            image.src = src;
        }));
    })
    return arr
}

function getHaibao2(data, cb){
    console.log(2222,data);

    var haibaoStage = new createjs.Stage("haibaoCanvas2");
    var container = new createjs.Container();//绘制外部容器
        haibaoStage.addChild(container);
    var imgArr = [
        data.qrcodeImg, 
        data.bgImg,
        data.headImg,
        data.img1,
        data.logo,
        data.img2,
        data.car,
        data.icon1,
        data.icon2,
        data.headimgBg,
        data.special,
    ]
    console.log('imgArr',imgArr)
    Promise.all(loadImg(imgArr)).then(function (res) {
        console.log('海报',res);
        var img1 = res[0]; // 二维码
        var img2 = res[1];
        var img3 = res[2];
        var img4 = res[3];
        var img5 = res[4];
        var img6 = res[5];
        var car = res[6];
        var icon1 = res[7];
        var icon2 = res[8];
        var headimgBg = res[9];
        var special = res[10];
        var shape=new createjs.Shape();
        // shape.graphics.beginFill("#fff").drawRect(0, 0, 730, 1000);
        var bitmap1 = new createjs.Bitmap(img1);
        var bitmap2 = new createjs.Bitmap(img2);
        // /*--头像开始--*/
        var bitmap3 = new createjs.Bitmap(img3);
        // //创建圆形
        var circle2 = new createjs.Shape();
        circle2.graphics.beginFill().drawCircle(172, 172, 86); 
        container.addChild(circle2);
        circle2.x = -5;
        circle2.y = 90;
        //进行遮罩处理
        bitmap3.setTransform(0, 0, 172/img3.width, 172/img3.height);
        bitmap3.mask = circle2;            
        bitmap3.x = -5+86;
        bitmap3.y = 90+86;
        // 头像背景
        var headimgBg = new createjs.Bitmap(headimgBg);
        headimgBg.x = 63;
        headimgBg.y = 160;

        //创建圆形
        var circle = new createjs.Shape();
        circle.graphics.beginFill().drawCircle(150, 150, 75); 
        container.addChild(circle);
        circle.x = 495;
        circle.y = 1384;  

        //进行遮罩处理
        bitmap1.setTransform(0, 0, 150/img1.width, 150/img1.height);
        bitmap1.mask = circle;            
        bitmap1.x = 495+75;
        bitmap1.y = 1384+75;

        var bitmap4 = new createjs.Bitmap(img4);
        bitmap4.x = 0;
        bitmap4.y = 100;

        var bitmap5 = new createjs.Bitmap(img5);
        bitmap5.x = 30;
        bitmap5.y = 15;

        // NO
        var text1 = new createjs.Text("ID："+data.NO, "bold 32px Arial", "#000");
        text1.x = 320;
        text1.y = 265;

        // 车名称1
        var text2 = new createjs.Text(data.carName1, "bold 28px Arial", "#000");
        text2.x = 85;
        text2.y = 1220;

        // 车名称2
        var text3 = new createjs.Text(data.carName2, "bold 28px Arial", "#000");
        text3.x = 85;
        text3.y = 1260;

        var bitmap6 = new createjs.Bitmap(img6);
        bitmap6.x = 0;
        bitmap6.y = 1434;

        var car = new createjs.Bitmap(car);
        car.x = 300;
        car.y = 1190;

        // 糖果
        var icon1 = new createjs.Bitmap(icon1);
        icon1.x = 82;
        icon1.y = 1350;        
        var number1 = new createjs.Text("x"+data.number1, "bold 32px Arial", "#000");
        number1.x = 140;
        number1.y = 1370;

        // 礼包
        let _w1 = 82+number1.getBounds().width+icon1.image.width+25;
        var icon2 = new createjs.Bitmap(icon2);
        icon2.x = _w1;
        icon2.y = 1350;        
        var number2 = new createjs.Text("x"+data.number2, "bold 32px Arial", "#000");
        number2.x = _w1+icon2.image.width;
        number2.y = 1370;

        // 隐藏款车
        var special = new createjs.Bitmap(special);
        special.x = 440;
        special.y = 1366;

        container.addChild(shape,bitmap2,bitmap4,bitmap5,bitmap1,headimgBg, bitmap3,text1,bitmap6, car, text2, text3, icon1, icon2, number1, number2,special);
        haibaoStage.update();
        var base64 = document.getElementById("haibaoCanvas2").toDataURL('image/jpeg', 0.9);
        cb&&cb(base64);
    });
}


export {
    getHaibao,
    getHaibao2,
    loadImg,
}