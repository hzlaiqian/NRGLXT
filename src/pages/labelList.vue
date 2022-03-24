<template>
	<div class="fillcontain">
		<div class="table_container">
			<el-row style="padding: 10px;">
				<el-input style="width: 200px; margin-right: 10px" placeholder="请输入名称" v-model="txtName" size="small"
					clearable />
				<el-input style="width: 200px; margin-right: 10px" placeholder="请输入编号" v-model="txtID" size="small"
					clearable />
				<el-button type="primary" size="small" icon="el-icon-s-search" @click="getLabels()">查询
				</el-button>
			</el-row>
			<el-row style="padding: 10px;">
				<el-table :data="labelList" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column prop="isCheck" type="selection" width="60"> </el-table-column>
					<el-table-column prop="id" label="编号" width="100" align="center"></el-table-column>
					<el-table-column prop="name" label="名称" width="200" align="center"></el-table-column>
					<el-table-column prop="pid" label="父类编号" width="200" align="center"></el-table-column>
					<el-table-column prop="cdate" label="创建时间" width="200" align="center"></el-table-column>
					<el-table-column prop="operate" align="center" label="操作" width="300px">
						<template slot-scope="scope">
							<el-row>
								<el-button size="mini" type="text" icon="el-icon-edit" @click="addLabel(scope.row.id)">
									导入数据</el-button>
								<el-button size="mini" type="text" icon="el-icon-delete"
									@click="getChildLables(scope.row.id)">管理数据</el-button>
							</el-row>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-dialog title="新增标签" :visible.sync="dialogVisible" width="40%" @close="dialogClose()">
				<el-form :model="labelForm" rules="rules" ref="labelForm">
					<el-row>
						<el-form-item label="名称" class="item_padding">
							<el-input v-model="labelForm.labelNames" auto-complete="one" size="mini"></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item class="btns" style="margin-top: 10px;">
							<el-button type="primary" @click="saveLabel()">确 定</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</el-dialog>
			<el-row style="padding: 10px;">
				<el-button type="primary" size="small" icon="el-icon-s-search" @click="addLabel(0)">新增</el-button>
				<el-button type="primary" size="small" icon="el-icon-s-search" @click="delLabel()">删除</el-button>
			</el-row>
			<el-row class="Pagination" style="text-align: left;margin-top: 10px;">
				<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
					:current-page="currentPage" @current-change="changePage">
				</el-pagination>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {
		addLabel,
		deleteLabels,
		getLabelList,
		getLabelListByPID
	} from '../api/getData.js'

	export default {
		data() {
			return {
				txtName: '',
				txtID: '',
				labelPID: 0,
				dialogVisible: false,
				labelForm: {
					labelPID: 0,
					labelNames: '',
				},
				labelList: [],
				selectedLabel: [],

				total: 0, // 总条数
				currentPage: 1, // 当前页
				pageSize: 20 // 分页大小
			}
		},
		components: {},
		created() {
			this.initData();
		},
		changePage(val) {
			this.currentPage = val;
			getLabels();
		},
		methods: {
			async initData() {
				try {
					var data = {
						page: this.currentPage,
						size: this.pageSize,
						name: this.txtName,
						pid: this.labelPID,
					};

					if (this.txtID != null && this.txtID != '') {
						data.id = this.txtID;
					}

					const res = await getLabelList(data)
					if (res.code == 200) {
						this.total = res.total;
						this.labelList = res.data;
					}
				} catch (err) {
					console.log('获取数据失败', err);
				}
			},
			async getLabels() {
				this.labelPID = 0;
				this.initData();
			},
			async getChildLables(id) {
				this.labelPID = id;
				this.initData();
			},
			addLabel(id) {
				this.labelForm.labelPID = id;
				this.dialogVisible = true;
			},
			dialogClose() {
				this.dialogVisible = false;
				this.labelForm = {
					labelPID: 0,
					labelNames: ''
				};
			},
			async saveLabel() {
				const res = await addLabel({
					pid: this.labelForm.labelPID,
					labels: this.labelForm.labelNames
				})
				if (res.code == 200) {
					this.$message({
						type: 'success',
						message: '添加成功'
					});
					this.dialogClose();
					this.initData();
				} else {
					this.$message({
						type: 'error',
						message: '添加失败'
					});
				}
			},
			handleSelectionChange(val) {
				this.selectedLabel = val.map((s) => {
					return s.id;
				});
			},
			async delLabel() {
				var res = await deleteLabels({
					ids: this.selectedLabel
				})
				if (res != null && res.code == 200) {
					this.$message({
						type: 'success',
						message: '删除成功'
					});
					this.initData();
				} else {
					this.$message({
						type: 'error',
						message: res.msg
					});
				}
			},
			changePage(val) {
				this.currentPage = val;
				this.initData();
			},
		}
	}
</script>

<style scoped>
.fillcontain {
    background-color: #fff;
    height: 100%;
}
</style>
