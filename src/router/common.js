export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
        },
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue'),
        hidden: true,
    },
    // 404 page must be placed at the end !!!
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/user/buyer/list',
        hidden: true,
    },
]