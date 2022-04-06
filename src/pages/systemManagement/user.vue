<template>
    <div class="container">
        <div class="handle-box">
            <el-input style="width: 150px; margin-right: 10px" placeholder="请输入账户名" v-model="newsTitle"
                      size="small" clearable />
            <el-input style="width: 150px; margin-right: 10px" placeholder="请输入手机号" v-model="newsSource"
                      size="small" clearable />
            <el-select placeholder="请选择角色" v-model="checkStatus" size="small"
                       style="width: 150px; margin-right: 10px" clearable>
                <el-option v-for="item in stsusOptions" :key="item.value" :label="item.label"
                           :value="item.value" />
            </el-select>
            <el-select placeholder="请选择状态" v-model="checkStatus" size="small"
                       style="width: 150px; margin-right: 10px" clearable>
                <el-option v-for="item in stsusOptions" :key="item.value" :label="item.label"
                           :value="item.value" />
            </el-select>
            <el-date-picker v-model="dateRange" size="small" style="width: 240px" value-format="yyyy-MM-dd"
                            type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                            @change="timeChange" clearable>
            </el-date-picker>
            <el-button style="margin-left: 10px" type="primary" size="small" icon="el-icon-s-search"
                       @click="getArticleList()">查询
            </el-button>
            <el-button style="margin-left: 10px;border: 1px solid #2A79EE;color: #2A79EE" plain  size="small" icon="el-icon-s-search"
                       @click="addUser">添加
            </el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" stripe border>
            <el-table-column  label="账户名" min-width="500px" align="center">
                <template slot-scope='scope'>
					<span class='span-text' v-if='scope.row.sourceAddress!= undefined && scope.row.sourceAddress!=null'>
						<a link style='color: #2A79EE' :href='scope.row.sourceAddress' target='_blank'>
							<h4 v-text='scope.row.title' />
						</a>
					</span>
                    <span class='span-text'
                          v-if='scope.row.sourceAddress== undefined || scope.row.sourceAddress ==null'>
						<h4 v-text='scope.row.title' />
					</span>
                </template>
            </el-table-column>
            <el-table-column prop="source" label="手机号" min-width="180" align="center"></el-table-column>
            <el-table-column prop="source" label="角色"  min-width="180" align="left"></el-table-column>
            <el-table-column prop="checkStatus" label="状态" sortable min-width="200" align="center" :formatter="setStatus">
            </el-table-column>
            <el-table-column prop="inputTime" label="上次登录时间" sortable min-width="220" align="center"></el-table-column>
            <el-table-column prop="inputTime" label="创建时间" sortable min-width="220" align="center"></el-table-column>
            <el-table-column label="操作" min-width="200" align="center" fixed="right">
                <template #default="scope">
                    <router-link :to="{ path: '/editNews', query: { checkID: scope.row.checkID }}">修改
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                           :current-page="currentPage" @current-change="changePage">
            </el-pagination>
        </el-row>


<!--        添加Dialog-->
        <el-dialog title="权限编辑" :visible.sync="outerVisible"  width='40%'>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账户名">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label=" 状态">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=" 角色">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限">
                    <el-input v-model="formInline.user" placeholder="请选择权限" @click="innerVisible = true"></el-input>
                </el-form-item>
            </el-form>




            <el-dialog
                width="30%"
                title="内层 Dialog"
                :visible.sync="innerVisible"
                append-to-body>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="innerVisible = true">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    countArticle,
    getWaitList,
    getChildList,
    getConceptList
} from '../../api/getData.js'

export default {
    data() {
        return {
            outerVisible: true,//外面的弹窗
            innerVisible: false,//里面的弹窗
            formInline: {
                user: '',
                region: ''
            },
            newsTitle: '',
            newsSource: '',
            newsLabel: '',
            dateRange: [],
            checkStatus: '',
            wordsStatus: '',
            total: 0, // 总条数
            currentPage: 1, // 当前页
            pageSize: 10, // 分页大小
            tableData: [],
            stsusOptions: [{
                value: 0,
                label: '未审核'
            }, {
                value: 1,
                label: '已通过'
            }, {
                value: 2,
                label: '不通过'
            }],
            unPassList: []
        }
    },
    created() {
        this.initData();
    },
    methods: {
        //添加
        addUser(){

        },
        timeChange(value) {
            if (value == null) {
                this.dateRange = [];
            }
        },
        async initData() {
            try {
                var res = await getChildList({
                    pid: 4
                })
                if (res != null && res.code == 200) {
                    res.data.forEach(i => {
                        const a = {};
                        a.value = i.id;
                        a.label = i.name;
                        this.unPassList.push(a);
                    })
                }

                this.getArticleList();
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        changePage(val) {
            this.currentPage = val;
            this.getArticleList();
        },
        async getArticleList() {
            try {
                var params = {
                    page: this.currentPage,
                    size: this.pageSize,
                    title: this.newsTitle,
                    source: this.newsSource,
                    checkStatus: this.checkStatus,
                    unPass: this.wordsStatus == '' ? -1 : this.wordsStatus
                }

                if (this.dateRange != null && this.dateRange.length > 0) {
                    params.startTime = this.dateRange[0];
                    params.endTime = this.dateRange[1];
                }

                const res = await getWaitList(params);
                if (res != null && res.code == 200) {
                    this.tableData = res.data;
                    this.total = res.total;
                } else {
                    throw new Error(res.message)
                }
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        setStatus(row, column) {
            try {
                console.log(column)
                const status = row[column.property];
                if (status == null || status == '' || status == 0) {
                    return "未审核";
                } else if (status == 1) {
                    return "已通过";
                } else if (status == 2) {
                    return "不通过";
                }
            } catch (e) {
                console.log(e);
            }
        },
    },
}
</script>

<style>
.handle-box {
    margin-bottom: 20px;
}

.table {
    width: auto;
    font-size: 14px;
}
</style>
