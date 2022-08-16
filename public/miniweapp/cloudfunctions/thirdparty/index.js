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
const thirdparty = require('./thirdparty/index');

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

    
    app.router('thirdparty/api/info', (ctx) => {
        let { OPENID} = cloud.getWXContext()
        ctx.body = new Promise(async resolve => {
            var res = await thirdparty.info(event, context)
            resolve(res);
        }); 
    });
    
    
    
    return app.serve();
}