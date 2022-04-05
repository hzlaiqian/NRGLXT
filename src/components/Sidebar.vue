<template>
    <div class='sidebar'>
        <el-menu class='sidebar-el-menu' :collapse='collapse'
                 text-color='#2F343D' active-text-color='#2A79EE' unique-opened router>
            <template v-for='item in items'>
                <template v-if='item.subs'>
                    <el-submenu :index='item.index' :key='item.index'>
                        <template slot='title'>
                            <i :class='item.icon'></i>
                            <span slot='title'>{{ item.title }}</span>
                        </template>
                        <template v-for='subItem in item.subs'>
                            <el-submenu v-if='subItem.subs' :index='subItem.index' :key='subItem.index'>
                                <template slot='title'>{{ subItem.title }}</template>
                                <el-menu-item v-for='(threeItem,i) in subItem.subs' :key='i' :index='threeItem.index'>
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index='subItem.index' :key='subItem.index'>{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index='item.index' :key='item.index'>
                        <i :class='item.icon'></i>
                        <span slot='title'>{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from './bus';

export default {
    data() {
        return {
            collapse: false,
            items: [
                // {
                // 	icon: 'el-icon-lx-home',
                // 	index: 'dashboard',
                // 	title: '系统首页'
                // },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'table',
                    title: '内容录入',
                    subs: [{
                        index: 'newsWrite',
                        title: '新闻录入'
                    }, {
                        index: 'newsReview',
                        title: '新闻审核'
                    }, {
                        index: 'awaitCheck',
                        title: '待审核库'
                    }, {
                        index: 'formalCheck',
                        title: '正式库'
                    }]
                }, {
                    icon: 'el-icon-document-copy',
                    index: 'informationConfiguration',
                    title: '资讯配置',
                    subs: [{
                        index: 'mediaConfiguration',
                        title: '媒体配置'
                    },{
                        index: '/mediaAudit',
                        title: '审核维度配置'
                    }],
                }, {
                    icon: 'el-icon-s-data',
                    index: 'statistics',
                    title: '数据报表及监控',
                    subs: [{
                        index: '/statistics',
                        title: '今日数据'
                    },{
                        index: '/systemMonitoring',
                        title: '监控'
                    }],
                },
                {
                    icon: 'el-icon-s-data',
                    index: 'systemManagement',
                    title: '系统管理',
                    subs: [{
                        index: '/role',
                        title: '角色管理'
                    },{
                        index: '/user',
                        title: '人员及权限管理'
                    }],
                },
                // {
                // 	icon: 'el-icon-lx-copy',
                // 	index: 'markManage',
                // 	title: '标签后台'
                // },
                // {
                // 	icon: 'el-icon-pie-chart',
                // 	index: 'count',
                // 	title: '数据报表'
                // },
                // {
                // 	icon: 'el-icon-lx-emoji',
                // 	index: 'userList',
                // 	title: '系统用户'
                // },
            ]
        };
    },
    computed: {
        // onRoutes() {
        // 	return this.$route.path.replace('/', '');
        // }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    width: 200px;
    bottom: 0;
    overflow-y: scroll;
    height: 100%;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}

.sidebar > ul {
    height: 100%;
}
.el-menu-item:focus, .el-menu-item:hover {
    background: rgba(42, 121, 238, 0.1) !important;
    box-shadow: inset -2px 0 0 0 #2A79EE;
}
.el-submenu__title:hover {
    background: rgba(42, 121, 238, 0.1) !important;
    box-shadow: inset -2px 0 0 0 #2A79EE;
}
.el-menu-item {
    padding-left: 48px !important;
    padding-right: 0;
    box-sizing: border-box;
    min-width: 0;
}
</style>
