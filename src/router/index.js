import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/home',
			name: 'home',
			component: () => import('../components/Home.vue'),
			meta: {
				title: '系统首页'
			},
			children: [{
					path: '/dashboard',
					component: () => import('../pages/Dashboard.vue'),
					meta: {
						title: '系统首页'
					}
				},
				{
					path: '/newsWrite',
					name: 'newsWrite',
					component: () => import('../pages/newsWrite.vue'),
					meta: {
						title: '新闻录入'
					}
				},
				{
					path: '/newsCheck',
					component: () => import('../pages/newsCheck.vue'),
					meta: {
						title: '新闻审核'
					}
				},
				{
					path: '/newsEdit',
					component: () => import('../pages/newsEdit.vue'),
					meta: {
						title: '新闻编辑'
					}
				},
				{
					path: '/newsReview',
					name: 'newsReview',
					component: () => import('../pages/newsReview.vue'),
					meta: {
						title: '新闻审核'
					}
				},
				{
					path: '/editNews',
					name: 'editNews',
					component: () => import('../pages/editNews.vue'),
					meta: {
						title: '新闻编辑'
					}
				},
				{
					path: '/awaitCheck',
					component: () => import('../pages/awaitCheck.vue'),
					meta: {
						title: '待审核库'
					}
				},
				{
					path: '/formalCheck',
					component: () => import('../pages/formalCheck.vue'),
					meta: {
						title: '正式库'
					}
				},
				{
					path: '/labelList',
					component: () => import('../pages/labelList.vue'),
					meta: {
						title: '标签词库'
					}
				},
				{
					path: '/markManage',
					component: () => import('../pages/markManage.vue'),
					meta: {
						title: '标签管理'
					}
				},
				{
					path: '/userList',
					component: () => import('../pages/userList.vue'),
					meta: {
						title: '系统用户'
					}
				},
				{
					path: '/404',
					component: () => import('../pages/404.vue'),
					meta: {
						title: '404'
					}
				},
				{
					path: '/403',
					component: () => import('../pages/403.vue'),
					meta: {
						title: '403'
					}
				},
				{
					path: '/demo',
					component: () => import('../pages/demo.vue'),
					meta: {
						title: 'demo'
					}
				}
			]
		},
		{
			path: '/login',
			component: () => import('../pages/Login.vue'),
			meta: {
				title: '登录'
			}
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
});
