<template>
	<div class="container">
		<div class="handle-box">
			<el-input style="width: 150px; margin-right: 10px" placeholder="请输入标题" v-model="newsTitle"
				size="small" clearable />
			<el-input style="width: 150px; margin-right: 10px" placeholder="请输入来源" v-model="newsSource"
				size="small" clearable />
			<el-select placeholder="审核状态" v-model="checkStatus" size="small"
				style="width: 150px; margin-right: 10px" clearable>
				<el-option v-for="item in stsusOptions" :key="item.value" :label="item.label"
					:value="item.value" />
			</el-select>
<!--			<el-select placeholder="请筛选不通过理由" v-model="wordsStatus" size="small"-->
<!--				style="width: 150px; margin-right: 10px" clearable>-->
<!--				<el-option v-for="item in unPassList" :key="item.value" :label="item.label"-->
<!--					:value="item.value" />-->
<!--			</el-select>-->
			<el-date-picker v-model="dateRange" size="small" style="width: 240px" value-format="yyyy-MM-dd"
				type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
				@change="timeChange" clearable>
			</el-date-picker>
			<el-button style="margin-left: 10px" type="primary" size="small" icon="el-icon-s-search"
				@click="getArticleList()">查询
			</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column  label="标题" min-width="500px" align="left">
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
			<el-table-column prop="source" label="来源" min-width="180" align="center"></el-table-column>
			<el-table-column prop="inputTime" label="入库时间" min-width="220" align="center"></el-table-column>
			<el-table-column prop="checkStatus" label="状态" min-width="200" align="center" :formatter="setStatus">
			</el-table-column>
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
	</div>
</template>

<script>
	import {
		countArticle,
		getWaitList,
		getChildList,
		getConceptList
	} from '../api/getData.js'

	export default {
		data() {
			return {
				newsTitle: '',
				newsSource: '',
				newsLabel: '',
				dateRange: [],
                checkStatus: 0,
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
                        checkStatus: this.checkStatus == '' ? 0 : this.checkStatus,
						stop: this.wordsStatus == '' ? -1 : this.wordsStatus
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
