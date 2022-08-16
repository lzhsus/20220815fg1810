import Vue from "vue";
import VueRouter from 'vue-router';
import App from './index.vue';
import Index from 'components/pages/index.vue';
import Prizelist from 'components/pages/prizelist.vue';
import Lihe from 'components/pages/lihe.vue';
import Gameshare from 'components/gameshare.vue';
import Haibao from 'components/pages/haibao.vue';
var routes = [
    { path: '/', component: Index, name: 'index',meta: { keepAlive: true }},
    { path: '/prizelist', component: Prizelist, name: 'prizelist', },
    { path: '/lihe', component: Lihe, name: 'lihe',},
    { path: '/activehb', component: Gameshare, name: 'activehb', },
    { path: '/invhb', component: Haibao, name: 'invhb', },
]
const router = new VueRouter({
    routes: routes,
})

Vue.use(VueRouter); //挂载属性
new Vue({
    el: '#app',
    //让vue知道我们的路由规则
    router: router, //可以简写router
    render: c => c(App),
})