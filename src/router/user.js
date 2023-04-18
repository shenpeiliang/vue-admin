export default [
    {
        path: '/user',
        component: () => import('@/views/layout/index.vue'),
        redirect: '/user/buyer/list',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/home.vue'),
                meta: {
                    title: '首页',
                },
            },

            {
                path: 'buyer',
                children: [
                    {
                        path: 'list',
                        name: 'UserBuyerList',
                        component: () => import('@/views/user/buyer/list.vue'),
                        meta: {
                            title: '普通用户',
                        },
                    },
                    {
                        path: 'detail',
                        name: 'UserBuyerDetail',
                        component: () => import('@/views/user/buyer/detail.vue'),
                        meta: {
                            title: '普通用户详情',
                        },
                    },
                    {
                        path: 'add',
                        name: 'UserBuyerAdd',
                        component: () => import('@/views/user/buyer/add.vue'),
                        meta: {
                            title: '创建普通用户',
                        },
                    },
                ],
            },

            {
                path: 'seller',
                children: [
                    {
                        path: 'list',
                        name: 'UserSellerList',
                        component: () => import('@/views/user/seller/list.vue'),
                        meta: {
                            title: '商家用户',
                        },
                    },
                    {
                        path: 'detail',
                        name: 'UserSellerDetail',
                        component: () => import('@/views/user/seller/detail.vue'),
                        meta: {
                            title: '商家用户详情',
                        },
                    },
                    {
                        path: 'add',
                        name: 'UserSellerAdd',
                        component: () => import('@/views/user/seller/add.vue'),
                        meta: {
                            title: '创建商家用户',
                        },
                    },
                ],
            },

            {
                path: 'admin',
                children: [
                    {
                        path: 'list',
                        name: 'UserAdminList',
                        component: () => import('@/views/user/admin/list.vue'),
                        meta: {
                            title: '管理员',
                        },
                    },
                    {
                        path: 'detail',
                        name: 'UserAdminDetail',
                        component: () => import('@/views/user/admin/detail.vue'),
                        meta: {
                            title: '管理员详情',
                        },
                    },
                    {
                        path: 'add',
                        name: 'UserAdminAdd',
                        component: () => import('@/views/user/admin/add.vue'),
                        meta: {
                            title: '创建管理员',
                        },
                    },
                ],
            },
        ],
    },
]