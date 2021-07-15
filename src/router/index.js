import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home';
import Blog from '@/views/Blog';
import About from '@/views/About';
import Message from '@/views/Message';
import Project from '@/views/Project';
import Detail from "@/views/Blog/Detail.vue"
Vue.use(VueRouter); // Vue.use(插件)  在Vue中安装插件

const router = new VueRouter({
    routes: [
        {
            name: "Home", path: '/', component: Home, meta: {
                title: "首页"
            }
        },
        {
            name: "Blog", path: '/article', component: Blog, meta: {
                title: "文章"
            }
        },
        { name: "CategoryBlog", path: '/article/cate/:categoryId', component: Blog },
        { name: "About", path: '/about', component: About },
        { name: "BlogDetail", path: '/article/:id', component: Detail },
        { name: "Message", path: '/message', component: Message },
        { name: "Project", path: '/project', component: Project }
    ],
    mode: "history",
})
export default router;
