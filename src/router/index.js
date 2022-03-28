import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}


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
					component: () => import('../pages/content/newsWrite.vue'),
					meta: {
						title: '新闻录入'
					}
				},
				// {
				// 	path: '/newsCheck',
				// 	component: () => import('../pages/newsCheck.vue'),
				// 	meta: {
				// 		title: '新闻审核'
				// 	}
				// },
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
					component: () => import('../pages/content/newsReview.vue'),
					meta: {
						title: '新闻审核'
					}
				},
				{
					path: '/editNews',
					name: 'editNews',
					component: () => import('../pages/content/editNews.vue'),
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
				},{
					path: '/mediaConfiguration',
					name: 'mediaConfiguration',
					component: () => import('../pages/information/mediaConfiguration.vue'),
					meta: {
						title: '媒体配置'
					}
				},
				{
					path: '/mediaAudit',
					name: 'mediaAudit',
					component: () => import('../pages/information/mediaAudit.vue'),
					meta: {
						title: '审核维度配置'
					}
				},
				{
					path: '/auditSecondLevel',
					name: 'auditSecondLevel',
					component: () => import('../pages/information/auditSecondLevel.vue'),
					meta: {
						title: '栏目标签'
					}
				},
				{
					path: '/auditThreeLevel',
					name: 'auditThreeLevel',
					component: () => import('../pages/information/auditThreeLevel.vue'),
					meta: {
						title: '过滤标签'
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
