// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router');
const rq = require('request');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
/**
 * 管理员
 */
const user = require('./user/index');
const wx_server = require('./wx_server/index');
const run = require('./run/index');
const format = require('./format/index');
const college = require('./college/index');
const garbage = require('./garbage/index');
const promotion = require('./promotion/index');
const tianapi = require('./tianapi/index');
const caipiao = require('./caipiao/index');
const answergame = require('./answergame/index')
const yugong = require('./yugong/index')

exports.main = async (event, context) => {
    const app = new TcbRouter({
        event
    });
    // 验证用户是否注册
    // app.use 表示该中间件会适用于所有的路由
    app.use(async (ctx, next) => {
        ctx.data = {};
        if(true){
            await next(); // 执行下一中间件
        }else{
            ctx.body = res; 
        }
    });

    app.router('user/api/invoke/msg', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.invoke(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/invoke/boast', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.boast(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/invoke/emotional', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.emotional(event, context)
            resolve(res);
        }); 
    });
    
    app.router('user/api/create', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.create(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/info', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.info(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/sign', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.sign(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/ranking', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.ranking(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/rankinglist', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.rankinglist(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/verse/create', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.verse(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/manager_log', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.manager_log(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/translate_log', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.translate_log(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/active', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.active(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/chongwuupdata', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.chongwuupdata(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/_send', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user._send(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/field/updata', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.updata(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/pet/list', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.petList(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/pet/detail', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.petDetail(event, context)
            resolve(res);
        }); 
    });
    app.router('user/api/userlist', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.userlist(event, context)
            resolve(res);
        }); 
    });

    app.router('user/api/updataadmin', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await user.updataadmin(event, context)
            resolve(res);
        }); 
    });
    
    

    
    
    // 微信服务
    app.router('wx_server/api/ocr', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await wx_server.OCR(event, context)
            resolve(res);
        }); 
    });
    app.router('wx_server/api/create', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await wx_server.create(event, context)
            resolve(res);
        }); 
    });
    app.router('wx_server/api/updata', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await wx_server.updata(event, context)
            resolve(res);
        }); 
    });
    app.router('wx_server/api/run', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await wx_server.run(event, context)
            resolve(res);
        }); 
    });
    
    
    // 运动
    app.router('wx/api/run/create', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await run.create(event, context)
            resolve(res);
        }); 
    });
    app.router('wx/api/run/info', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await run.info(event, context)
            resolve(res);
        }); 
    });
    app.router('wx/api/run/list', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await run.list(event, context)
            resolve(res);
        }); 
    });
    // 论坛
    app.router('format/api/list', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await format.list(event, context)
            resolve(res);
        }); 
    });
    app.router('format/api/up', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await format.up(event, context)
            resolve(res);
        }); 
    });
    app.router('format/api/detail', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await format.detail(event, context)
            resolve(res);
        }); 
    });
    app.router('format/api/commentt', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await format.commentt(event, context)
            resolve(res);
        }); 
    });
    app.router('format/api/follow', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await format.follow(event, context)
            resolve(res);
        }); 
    });
    
    // 大学分数线
    app.router('college/api/list', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await college.list(event, context)
            resolve(res);
        }); 
    });
    app.router('college/api/updata', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await college.updata(event, context)
            resolve(res);
        }); 
    });
    // 垃圾分类
    app.router('garbage/api/data', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await garbage.data(event, context)
            resolve(res);
        }); 
    });
    app.router('garbage/api/hotlist', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await garbage.hotlist(event, context)
            resolve(res);
        }); 
    });
    app.router('garbage/api/list', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await garbage.list(event, context)
            resolve(res);
        }); 
    });
    app.router('promotion/api/list', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await promotion.list(event, context)
            resolve(res);
        }); 
    });
    
    // 第三方api
    app.router('tianapi/api/pyqwenan', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await tianapi.pyqwenan(event, context)
            resolve(res);
        }); 
    });
    
    
    app.router('caipiao/api/create', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await caipiao.create(event, context)
            resolve(res);
        }); 
    });
    app.router('caipiao/api/list', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await caipiao.list(event, context)
            resolve(res);
        }); 
    });
    app.router('caipiao/api/wincode/updatacode', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await caipiao.updatacode(event, context)
            resolve(res);
        }); 
    });
    app.router('caipiao/api/wincode/period', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await caipiao.period(event, context)
            resolve(res);
        }); 
    });
    
    // 答题
    app.router('answergame/api/info', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await answergame.info(event, context)
            resolve(res);
        }); 
    });
    app.router('answergame/api/levels', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await answergame.levels(event, context)
            resolve(res);
        }); 
    });
    app.router('answergame/api/levelsdetail', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await answergame.levelsdetail(event, context)
            resolve(res);
        }); 
    });
    
    app.router('answergame/api/create', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await answergame.create(event, context)
            resolve(res);
        }); 
    });
    app.router('answergame/api/up', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await answergame.up(event, context)
            resolve(res);
        }); 
    });
    app.router('answergame/api/ranking', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await answergame.ranking(event, context)
            resolve(res);
        }); 
    });
    app.router('answergame/api/qa/answer/item', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await answergame.qaansweritem(event, context)
            resolve(res);
        }); 
    });
    // 愚公移山
    
    app.router('yugong/api/userinfo', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await yugong.userinfo(event, context)
            resolve(res);
        }); 
    });
    
    return app.serve();
}