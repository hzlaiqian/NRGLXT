import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css';
import './components/directives';
import 'babel-polyfill';
import store from './store'

import * as echarts from 'echarts/core'

import { BarChart,RadarChart,LineChart,PieChart } from 'echarts/charts';

import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	ToolboxComponent,
	DatasetComponent,
	TransformComponent,
	LegendComponent,
	MarkLineComponent,
	MarkPointComponent,
	GraphicComponent,
	DataZoomComponent
} from 'echarts/components'

import { LabelLayout, UniversalTransition} from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	DataZoomComponent,
	LineChart,
	PieChart,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	BarChart,
	GraphicComponent,
	RadarChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
	ToolboxComponent,
	MarkLineComponent,
	MarkPointComponent
])
Vue.config.productionTip = false;
Vue.use(ElementUI, {
	size: 'small'
});
Vue.prototype.$echarts = echarts
//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
// 	document.title = `${to.meta.title}`;
// 	const username = localStorage.getItem('user_name');
// 	if (!username && to.path !== '/login') {
// 		next('/login');
// 	} else {
// 		next();
// 	}
// });

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
