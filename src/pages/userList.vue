<template>
	<div class="container">
		<div class="handle-box">
			<el-input style="width: 120px; margin-right: 10px" placeholder="请输入账户" v-model="txtID" size="small" clearable/>
			<el-select placeholder="角色" v-model="roleStatus" size="small" style="width: 120px; margin-right: 10px" clearable>
				<el-option v-for="item in roleList" :key="item.id" :label="item.value" :value="item.id" />
			</el-select>
			<el-button type="primary" size="small" icon="el-icon-s-search" @click="getUsers()">查询</el-button>
			<el-button type="primary" size="small" icon="el-icon-s-search" @click="addUser()">添加</el-button>
		</div>
		<el-table :data="userList" style="width: auto">
			<el-table-column property="userID" align="center" label="账户ID" width="100"> </el-table-column>
			<el-table-column property="username" align="center" label="用户名" width="220"> </el-table-column>
			<el-table-column property="password" align="center" label="密码" width="100"> </el-table-column>
			<el-table-column property="roleID" align="center" label="角色" width="100" :formatter="setRole">
			</el-table-column>
			<el-table-column property="authority" align="center" label="后台清单" :formatter="setAutyority">
			</el-table-column>
			<el-table-column prop="operate" align="center" label="操作" width="150px"
				class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-row>
						<el-button size="mini" type="text" icon="el-icon-edit" @click="editUser(scope.row.userID)">修改
						</el-button>
						<el-popconfirm title="确定删除吗？" @confirm="deleteUser(scope.row.userID)">
							<template #reference>
								<el-button size="mini" type="text" icon="el-icon-delete">删除</el-button>
							</template>
						</el-popconfirm>
					</el-row>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="用户修改" :visible.sync="dialogVisible" width="40%" @close="dialogClose()">
			<el-form :model="editForm" rules="rules" ref="editForm">
				<el-row>
					<el-col :span="12" style="padding: 10px;">
						<el-form-item label="用户名" class="item_padding">
							<el-input v-model="editForm.editName" auto-complete="one" size="mini"></el-input>
						</el-form-item>
						<el-form-item label="密码" class="item_padding">
							<el-input v-model="editForm.editPassword" auto-complete="one" size="mini"></el-input>
						</el-form-item>
						<el-form-item label="角色" class="item_padding">
							<el-select placeholder="请选择角色" v-model="editForm.editRole" size="mini" style="width: 100%;">
								<el-option v-if="item.value != '全部'" v-for="item in roleList" :key="item.id"
									:label="item.value" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" style="padding: 10px;">
						<el-form-item label="权限" class="item_padding">
							<el-row>
								<el-tag size="mini" v-for="item in editForm.selectedTags" style="margin: 0 2px 0 2px;">
									{{item.name}}
								</el-tag>
								<el-select placeholder="请选择权限" size="mini" style="width: 100%;">
									<el-option v-for="item in authorityList" :key="item.id" :label="item.name"
										:value="item.id">
										<el-checkbox size="mini" :label="item.name" :checked="item.checked"
											@change="authoritySelected(item.id)"> </el-checkbox>
									</el-option>
								</el-select>
							</el-row>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item class="btns" style="margin-top: 10px;">
						<el-button type="primary" @click="saveUser()">确 定</el-button>
						<el-button @click="dialogClose()">取 消</el-button>
					</el-form-item>
				</el-row>
			</el-form>
		</el-dialog>
		<el-row class="Pagination" style="text-align: left;margin-top: 10px;">
			<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
				:current-page="currentPage" @current-change="changePage">
			</el-pagination>
		</el-row>
	</div>
</template>

<script>
	import {
		getUserList,
		getUserCount,
		addUser,
		updateUser,
		deleteUser
	} from '../api/getData.js'

	export default {
		data() {
			return {
				dialogVisible: false,
				txtID: '',
				roleStatus: 0,
				editForm: {
					editID: 0,
					editName: '',
					editPassword: '',
					editRole: 1,
					editAuthority: '',
					selectedTags: [],
				},
				rules: {
					username: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, ],
				},
				userList: [],
				roleList: [{
					id: 0,
					value: '全部',
				}, {
					id: 1,
					value: '常规',
				}, {
					id: 2,
					value: '管理员',
				}],
				authorityList: [{
						id: 0,
						name: '用户登录',
						checked: false,
					}, {
						id: 1,
						name: '新闻录入',
						checked: false,
					},
					{
						id: 2,
						name: '新闻审核',
						checked: false
					},
					{
						id: 3,
						name: '待审核库',
						checked: false
					},
					{
						id: 4,
						name: '已审核库',
						checked: false
					},
					{
						id: 5,
						name: '标签词库',
						checked: false
					},
					{
						id: 6,
						name: '数据报表',
						checked: false
					},
					{
						id: 7,
						name: '用户管理',
						checked: false
					},
				],
				total: 0, // 总条数
				currentPage: 1, // 当前页
				pageSize: 20 // 分页大小
			}
		},
		created() {
			this.initData();
		},
		methods: {
			async initData() {
				try {
					const countData = await getUserCount();
					if (countData.code == 200) {
						this.total = countData.data;
					} else {
						throw new Error('获取数据失败');
					}
					this.getUsers()
				} catch (err) {
					console.log('获取数据失败', err);
				}
			},
			async getUsers() {
				const res = await getUserList({
					page: this.currentPage,
					size: this.pageSize,
					userID: this.txtID.toString() == '' ? 0 : this.txtID,
					roleID: this.roleStatus
				});
				this.userList = res.data;
			},
			addUser() {
				this.dialogVisible = true;
			},
			editUser(u_ID) {
				this.dialogVisible = true;
				var user = this.userList.find((s) => {
					return s.userID == u_ID;
				})
				if (user == null) return;
				this.editForm.editID = u_ID;
				this.editForm.editName = user.username;
				this.editForm.editPassword = user.password;
				this.editForm.editRole = user.roleID;
				var arr = JSON.parse(user.authority);
				this.setEditAutyority(arr);
			},
			setEditAutyority(arr) {
				this.editForm.selectedTags = [];
				for (let index in arr) {
					var autyorIndex = this.authorityList.findIndex((s) => {
						return s.id == index;
					})
					if (autyorIndex == -1) continue;
					this.authorityList[autyorIndex].checked = true;
					var t = {
						id: this.authorityList[autyorIndex].id,
						name: this.authorityList[autyorIndex].name,
					};
					this.editForm.selectedTags.push(t);
				};
			},
			setRole(row, column) {
				const roleProp = row[column.property];
				if (roleProp == null) {
					return '未定义';
				} else {
					var roleIndex = this.roleList.findIndex((s) => {
						return s.id == roleProp;
					});
					return roleIndex == -1 ? '未定义' : this.roleList[roleIndex].value;
				}
			},
			setAutyority(row, column) {
				var arr = JSON.parse(row[column.property]);
				var str = '';
				for (let a in arr) {
					var authority = this.authorityList.find(function(s) {
						return s.id == a;
					});

					if (authority == null) continue;
					str += authority.name + ',';
				}

				return str == '' ? '' : str.substring(0, str.lastIndexOf(','));
			},
			async saveUser() {
				var authorityArr = this.editForm.selectedTags.map(s => s.id);
				if (this.editForm.editID == 0) {
					var res = await addUser({
						username: this.editForm.editName,
						password: this.editForm.editPassword,
						roleID: this.editForm.editRole,
						authority: JSON.stringify(authorityArr)
					});
					if (res != null && res.code == 200) {
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
				} else {
					var res = await updateUser({
						userID: this.editForm.editID,
						username: this.editForm.editName,
						password: this.editForm.editPassword,
						roleID: this.editForm.editRole,
						authority: JSON.stringify(authorityArr)
					});
					if (res != null && res.code == 200) {
						this.$message({
							type: 'success',
							message: '修改成功'
						});
						this.dialogClose();
						this.initData();
					} else {
						this.$message({
							type: 'error',
							message: '修改失败'
						});
					}
				}
			},
			async deleteUser(u_ID) {
				var res = await deleteUser({
					userID: u_ID
				});
				if (res != null && res.code == 200) {
					this.$message({
						type: 'success',
						message: '删除成功'
					});
					this.initData();
				} else {
					this.$message({
						type: 'error',
						message: '删除失败'
					});
				}
			},
			authoritySelected(tag_id) {
				var authority_index = this.authorityList.findIndex((s) => {
					return s.id == tag_id;
				});
				if (authority_index == -1) return;

				var autority = this.authorityList[authority_index];
				if (!autority.checked) {
					//已添加的数据避免重复添加
					var selected_index = this.editForm.selectedTags.findIndex((s) => {
						return s.name == autority.name;
					});
					if (selected_index != -1) return;
					//添加新的tag
					this.editForm.selectedTags.push({
						id: autority.id,
						name: autority.name,
					});
					//修改原列表标记被选中
					this.authorityList[authority_index].checked = true;
				} else {
					var selected_index = this.editForm.selectedTags.findIndex((s) => {
						return s.name == autority.name;
					});
					if (selected_index == -1) return;

					this.editForm.selectedTags.splice(selected_index, 1);
					this.authorityList[authority_index].checked = false;
				}
			},
			dialogClose() {
				this.dialogVisible = false;
				this.editForm.userID = 0;
				this.editForm.editName = '';
				this.editForm.editPassword = '';
				this.editForm.editRole = 1;
				this.editForm.selectedTags = [];

				this.authorityList.forEach(function(i) {
					i.checked = false
				})
			},

			changePage(val) {
				this.currentPage = val;
				this.getUsers();
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
