import Vue from "vue";
import VueRouter from 'vue-router';
import App from './index.vue';
import Index from 'components/pages/index.vue';
var routes = [
    { path: '/', component: Index, name: 'index',meta: { keepAlive: true }},
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