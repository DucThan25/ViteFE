// import Vue from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
// layouts
import MainLayout from '@/layouts/MainLayout'
import BlankLayout from '@/layouts/BlankLayout'
import Login from '@/modules/AUTH/Login'
import token from '@/plugins/token'

// module admin
import admin from '@/modules/admin/router.js'

// Vue.use(Router)
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '',
            name: 'Home',
            meta: {
                name: "Trang chủ"
            },
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: () => import('@/modules/index'),
                    meta: {
                        name: "Trang chủ"
                    }
                },
            ],
        },
        {
            path: '/auth',
            name: 'auth',
            component: BlankLayout,
            meta: {
                requiresAuth: false,
                name: "Phân quyền"
            },
            children: [
                {
                    path: 'login',
                    name: 'Login',
                    //component: ()=>import('./components/Login.vue'),
                    component: Login,
                    meta: {
                        requiresAuth: false,
                        name: "Đăng nhập"
                    },
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: ()=>import('./components/Register.vue'),
                    meta: {
                        requiresAuth: false,
                        name: "Tạo tài khoản"
                    },
                },
            ]
        },
        ...admin
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth == undefined || to.meta.requiresAuth == null || to.meta.requiresAuth == true) {
      if (token.getTokenFromStorage())
        next();
      else
        next({ name: 'Login' });
    } else {
        next();
    }
})
export default router
