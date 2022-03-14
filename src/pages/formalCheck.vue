<template>
	<div class="container">
		<div class="handle-box" style="display: inline-block;">
			<el-input style="width: 200px; margin: 5px 10px 0 0" placeholder="请输入标题" v-model="newsTitle" size="small"
				clearable />
			<el-input style="width: 140px;margin: 5px 10px 0 0" placeholder="请输入来源" v-model="newsSource" size="small"
				clearable />
			<el-select placeholder="请选择情绪标签" v-model="checkMood" size="small" style="width: 140px; margin: 5px 10px 0 0"
				clearable>
				<el-option v-for="item in moodList" :key="item.value" :label="item.label" :value="item.value"
					clearable />
			</el-select>
			<el-autocomplete  v-model="newsRecommend" :fetch-suggestions="showRecommend" placeholder="请输入推荐标签"
				style="width: 200px; margin: 5px 10px 0 0" value-key="name" :trigger-on-focus="false"
				@select="handleSelect" size="small" clearable @clear="clearSelect()">
				<template slot-scope="scope">
					<el-item>
						<span>{{scope.item.name}}</span>
						<span style="float: right;">{{scope.item.ideaName}}</span>
					</el-item>
				</template>
			</el-autocomplete>
			<el-input style="width: 140px; margin: 5px 10px 0 0" placeholder="请输入栏目标签" v-model="newsColumn" size="small"
				clearable />
			<el-date-picker v-model="dateRange" size="small" style="width: 240px;margin: 5px 10px 0 0" value-format="yyyy-MM-dd"
				type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
				@change="timeChange" clearable>
			</el-date-picker>
			<el-button type="primary" style="margin-left: 10px;" @click="getArctileList()">查询
			</el-button>
		</div>
		<el-table :data="tableData" highlight-current-row>
			<el-table-column align="center" label="标题" width="500">
				<template slot-scope="scope">
					<span class="span-text" v-if="scope.row.sourceAddress!= undefined && scope.row.sourceAddress!=null">
						<a link :href="scope.row.sourceAddress" target="_blank">
							<h4 v-text="scope.row.title" />
						</a>
					</span>
					<span class="span-text"
						v-if="scope.row.sourceAddress== undefined || scope.row.sourceAddress ==null">
						<h4 v-text="scope.row.title" />
					</span>
				</template>
			</el-table-column>
			<el-table-column property="source" align="center" label="来源" width="100px">

			</el-table-column>
			<el-table-column property="checkTime" align="center" label="发布时间" width="200px"></el-table-column>
			<el-table-column property="mood" align="center" label="情绪标签" width="200px">
				<template slot-scope="scope">
					<el-tag v-for="i in scope.row.moodList" :key="i.id"
						:style="{'color':i.color,'background-color':i.bColor,'border-color':i.color}">{{i.name}}
					</el-tag>
				</template>
			</el-table-column>

			<el-table-column property="recommend" align="center" label="推荐标签" width="200px">
				<template slot-scope="scope">
					<el-tag v-for="i in scope.row.recommendList" :key="i.id"
						v-bind:style="{'color':i.color,'background-color':i.bColor,'border-color':i.color}">{{i.name}}
					</el-tag>
				</template>
			</el-table-column>

			<el-table-column property="column" align="center" label="栏目标签" width="200px">
				<template slot-scope="scope">
					<el-tag v-for="i in scope.row.columnList" :key="i.id"
						:style="{'color':i.color,'background-color':i.bColor,'border-color':i.color}">{{i.name}}
					</el-tag>
				</template>
			</el-table-column>

			<el-table-column align="center" label="操作" width="100" fixed="right">
				<template #default="scope">
					<router-link :to="{ path: '/newsEdit', query: { articleID: scope.row.articleID }}">修改
					</router-link>
					<el-popconfirm title="确定下线吗？" @confirm="handleClose(scope.row.checkID)">
						<template #reference>
							<a style="cursor: pointer; margin-left: 10px">下线</a>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<el-row class="Pagination">
			<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
				:current-page="currentPage" @current-change="changePage">
			</el-pagination>
		</el-row>

	</div>
</template>

<script>
	import {
		getCheckList,
		deleteCheckByID,
		getConceptByName,
		getChildList
	} from '@/api/getData'
	export default {
		data() {
			return {
				newsTitle: '',
				newsSource: '',
				newsMood: '',
				newsRecommend: '',
				newsRecommendID: -1,
				newsColumn: '',

				checkMood: '',
				moodList: [],

				dateRange: [],
				tableData: [],
				total: 0, // 总条数
				currentPage: 1, // 当前页
				pageSize: 10, // 分页大小
			}
		},
		created() {
			this.initData();
			this.initMood();
			this.setTime();
		},
		methods: {
			setTime() {
				const end = new Date();
				const start = new Date();
				end.setHours(23, 59, 59);
				start.setTime(end.getTime() - 3600 * 1000 * 24 * 7 + 1000);
				this.dateRange = [start, end];
			},
			timeChange(value) {
				if (value == null) {
					this.dateRange = [];
				}
			},
			async initMood() {
				this.moodList = [];
				var res = await getChildList({
					pid: 1
				});
				if (res != null && res.code == 200) {
					res.data.forEach(i => {
						const l = {};
						l.value = i.id;
						l.label = i.name;
						this.moodList.push(l);
					})
				}
			},
			async showRecommend(str, cb) {
				if (str == null || str == '') return;
				var res = await getConceptByName({
					name: str
				});
				if (res != null && res.code == 200) {
					cb(res.data);
				}
			},
			handleSelect(item) {
				this.newsRecommend = item.name;
				this.newsRecommendID = item.id;
			},
			clearSelect() {
				this.newsRecommend = '';
				this.newsRecommendID = -1;
			},
			async initData() {
				try {
					this.getArctileList();
				} catch (err) {
					console.log('获取数据失败', err);
				}
			},
			changePage(val) {
				this.currentPage = val;
				this.getArctileList();
			},
			async handleClose(id) {
				try {
					var res = await deleteCheckByID({
						id: id
					});
					if (res != null && res.code == 200) {
						this.$message({
							type: 'success',
							message: '下线成功'
						});
						this.initData();
					} else {
						this.$message({
							type: 'error',
							message: '下线失败'
						});
					}
				} catch (e) {
					console.log(e);
				}
			},
			async getArctileList() {
				try {
					var params = {
						page: this.currentPage,
						size: this.pageSize,
						title: this.newsTitle,
						source: this.newsSource,
						mood: this.checkMood,
						recommend: this.newsRecommendID,
						column: this.newsColumn
					};
					if (this.dateRange != null && this.dateRange.length > 0) {
						params.startTime = this.dateRange[0];
						params.endTime = this.dateRange[1];
					}
					const res = await getCheckList(params);
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
