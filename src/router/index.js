import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import BlogDetail from "@/views/BlogDetail";
import Blogs from "@/views/Blogs";
import BlogEdit from "@/views/BlogEdit";
import Register from "@/views/Register";
import UserCenter from "@/views/UserCenter";

Vue.use(VueRouter)

// 定义路由
const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: {name: "Blogs"}  // 重定向到Blogs页面
    },
    {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/blog/add',
        name: 'BlogAdd',
        component: BlogEdit,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/blog/:blogId',
        name: 'BlogDetail',
        component: BlogDetail
    },
    {
        path: '/blog/:blogId/edit',  // blogId作为参数
        name: 'BlogEdit',
        component: BlogEdit,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/userCenter',
        name: 'UserCenter',
        component: UserCenter,
        meta: {
            requireAuth: true
        }
    }
    ]

// 定义router对象
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes // 该路由对象的路由配置为routes
})

// 导出router
export default router