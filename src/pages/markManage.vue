<template>
	<div>
		<el-col :span="4" class="col_dis">
			<el-row class="col_row">
				<h3>理念层</h3>
			</el-row>
			<el-row class="col_row">
				<el-tree id="ideaNree" :data="ideaTree" :props="customProps" node-key="id" default-expand-all
					@node-click="ideaNodeClick" @node-contextmenu="ideaClick">
				</el-tree>
			</el-row>
		</el-col>
		<el-col :span="4" class="col_dis" style="height: 100%;">
			<el-row class="col_row">
				<h3>概念层</h3>
			</el-row>
			<el-row class="col_row">
				<el-tree :data="conceptTree" :props="customProps" node-key="id" default-expand-all
					@node-click="conceptNodeClick" @node-contextmenu="conceptClick">
				</el-tree>
			</el-row>
		</el-col>
		<el-col :span="12" class="col_dis">
			<h3 class="col_row">概念：{{markName}}</h3>
			<h4 class="col_row">创建人：{{cuser}}</h4>
			<h4 class="col_row">创建时间：{{cdate}}</h4>
			<h4 class="col_row">SEQ：{{seq}}</h4>
			<h4 class="col_row">结构分类：{{cla}}</h4>
			<h4 class="col_row">简介：{{desc}}</h4>
			<h4 class="col_row">事实层词汇：</h4>
			<el-tag v-for="tag in realList" size="small" :key="tag.id" class="tag_dis">
				{{tag.name}}
			</el-tag>
		</el-col>
		<div id="menu" class="dev-type-main-left" v-show="menuVisible" @mouseleave="menuVisible=!menuVisible">
			<el-card class="box-card">
				<div class="text item">
					<el-link icon="el-icon-circle-plus-outline" :underline="false" @click="addNode(0)">新增节点</el-link>
				</div>
				<div class="text item">
					<el-link icon="el-icon-circle-plus-outline" :underline="false" @click="addNode(1)">新增子节点</el-link>
				</div>
				<div class="text item" v-if="treeType == 1">
					<el-link icon="el-icon-circle-plus-outline" :underline="false" @click="addConceptNode()">新增概念节点
					</el-link>
				</div>
				<div class="text item">
					<el-link icon="el-icon-edit-outline" :underline="false" @click="editNode()">编辑节点</el-link>
				</div>
				<div class="text item">
					<el-link icon="el-icon-remove-outline" :underline="false" @click="delNode()">删除节点</el-link>
				</div>
			</el-card>
		</div>
		<el-dialog title="标记" :visible.sync="dialogVisible" width="40%" @close="dialogClose()">
			<el-form :model="editForm" rules="rules" ref="editForm">
				<el-row>
					<el-col :span="12" style="padding: 10px;">
						<el-form-item label="现有标签" class="item_padding">
							<!-- <P>{{editForm.markID}}</P> -->
							<span>
								<el-checkbox v-model="userIDVisible"></el-checkbox>
							</span>
							<el-input v-model="editForm.alreadName" size="mini" :disabled="!userIDVisible"></el-input>
						</el-form-item>
						<el-form-item label="标签名称" class="item_padding">
							<el-input v-model="editForm.markName" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" style="padding: 10px;">
						<el-form-item label="创建时间" class="item_padding">
							<el-input v-model="editForm.cdate" size="mini"></el-input>
						</el-form-item>
						<el-form-item label="状态" class="item_padding">
							<el-select placeholder="请选择角色" v-model="editForm.status" size="mini" style="width: 100%;">
								<el-option v-if="item.value != '全部'" v-for="item in statusList" :key="item.id"
									:label="item.value" :value="item.id" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="treeType == 2">
					<el-form-item label="事实词" class="item_padding">
						<el-row>
							<el-tag size="mini" v-for="item in editForm.realWords" style="margin: 0 2px 0 2px;">
								{{item.name}}
							</el-tag>
						</el-row>
						<el-row>
							<el-tag v-for="item in tagList" size="small" :key="item.id" :class="{active : item.isLight}"
								@click="handleClick(item)" style="margin: 0 2px 0 2px;">{{item.name}}</el-tag>
						</el-row>
					</el-form-item>
				</el-row>
				<el-row v-if="treeType == 2">
					<el-form-item label="简介" class="item_padding">
						<el-input type="textarea" v-model="editForm.desc" autosize></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item class="btns" style="margin-top: 10px;">
						<el-button type="primary" @click="saveMark()">确 定</el-button>
						<el-button @click="dialogClose()">取 消</el-button>
					</el-form-item>
				</el-row>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import {
		addIdea,
		updateIdea,
		deleteIdea,
		getIdea,
		getIdeaByName,
		getIdeaList,
		getListByPID,
		getConceptByIdea,
		addConcept,
		updateConcept,
		deleteConcept,
		getConcept,
		getConceptByName,
		getConceptList,
		getChildLabels,
		getLabelByList
	} from '../api/getData.js'

	export default {
		data() {
			return {
				markName: '',
				cuser: '',
				cdate: '',
				desc: '',
				seq: '',
				cla: '',
				realList: [],

				menuVisible: false,
				ideaTree: [],
				conceptTree: {},
				customProps: {
					label: 'name',
					children: 'child',
				},
				tagList: [],
				statusList: [{
					id: 0,
					value: '未生效',
				}, {
					id: 1,
					value: '生效中',
				}],
				userIDVisible: false,
				dialogVisible: false,
				nodeType: 0,
				treeType: 0,
				editForm: {
					markID: 0,
					markPID: 0,
					alreadName: '',
					ideaID: 0,
					markName: '',
					status: 0,
					realWords: [],
					cdate: '',
					desc: '',
				},

				selectedConceptNode: null,
				selectedIdeaNode: null,
			}
		},
		created() {
			this.getIdeaTreeData(0);
		},
		methods: {
			async getIdeaTreeData(val) {
				var res = await getListByPID({
					pid: val
				});
				if (res != null && res.code == 200) {
					res.data.forEach(i => {
						const idea = {};
						idea.id = i.id;
						idea.pid = i.pID;
						idea.name = i.name;
						idea.child = i.child;
						this.ideaTree.push(idea);
					})
				}
			},
			Listen() {
				this.menuVisible = false;
				document.removeEventListener("click", this.Listen);
			},
			ideaClick(MouseEvent, data, node) {
				this.menuVisible = true;
				document.addEventListener('click', this.Listen);
				this.selectedIdeaNode = data;
				this.treeType = 1;

				var menu = document.querySelector('#menu');
				menu.style.display = "block";
				menu.style.cssText = "position: fixed; left: " + (MouseEvent.clientX - 10) + 'px' + "; top: " + (MouseEvent
					.clientY - 25) + 'px; z-index: 999; cursor:pointer;';
			},
			conceptClick(MouseEvent, data, node) {
				this.menuVisible = true;
				document.addEventListener('click', this.Listen);

				this.selectedConceptNode = data;
				this.treeType = 2;

				var menu = document.querySelector('#menu');
				menu.style.display = "block";
				menu.style.cssText = "position: fixed; left: " + (MouseEvent.clientX - 10) + 'px' + "; top: " + (MouseEvent
					.clientY - 25) + 'px; z-index: 999; cursor:pointer;';
			},
			async ideaNodeClick(data) {
				this.selectedIdeaNode = data;
				var res = await getConceptByIdea({
					ideaID: data.id
				})
				if (res != null && res.code == 200) {
					
					this.conceptTree = res.data;
				} else {
					this.$message({
						type: 'error',
						message: res.msg
					});
				}
			},
			async conceptNodeClick(data) {
				this.selectedConceptNode = data;
				var res = await getConcept({
					id: data.id
				});
				if (res != null && res.code == 200) {
					this.markName = res.data.name;
					this.cuser = res.data.cuser;
					this.cdate = res.data.cdate;
					this.desc = res.data.desc;
					this.seq = res.data.seq;

					var wordArr = JSON.parse(res.data.realWords);
					this.getLabelsByArr(wordArr);
				} else {
					this.$message({
						type: 'error',
						message: res.msg
					});
				}
			},
			async getLabelsByArr(arr) {
				var reslabel = await getLabelByList({
					ids: arr
				});
				if (reslabel != null && reslabel.code == 200) {
					this.realList = reslabel.data;
				}
			},
			async chooiceTags() {
				var res = await getChildLabels({
					name: '事实标签'
				});
				if (res != null && res.code == 200) {
					res.data.forEach(i => {
						const label = {};
						label.id = i.id;
						label.name = i.name;
						label.isLight = false;
						this.tagList.push(label);
					});
				}
			},
			handleClick(item) {
				if (item.isLight) {
					this.editForm.realWords.splice(this.editForm.realWords.indexOf(item), 1);
				} else {
					this.editForm.realWords.push(item);
				}
				item.isLight = !item.isLight;
			},
			labelDialogClose() {
				this.labelDialogVisible = false;
				this.tagList = [];
			},
			async addNode(type) {
				this.dialogVisible = true;
				this.menuVisible = false;
				this.nodeType = type;
				if (this.treeType == 1) {
					var res = await getIdea({
						id: this.selectedIdeaNode.id
					})
					if (res != null && res.code == 200) {
						if (type == 0) {
							this.editForm.markPID = res.data.pID;

						} else if (type == 1) {
							this.editForm.markPID = res.data.id;
						}
						this.editForm.markName = res.data.markName;
						this.editForm.status = res.data.status;
					}
				} else if (this.treeType == 2) {
					this.chooiceTags();
					var res = await getConcept({
						id: this.selectedConceptNode.id
					})
					if (res != null && res.code == 200) {
						if (type == 0) {
							this.editForm.markPID = res.data.pid;
						} else if (type == 1) {
							this.editForm.markPID = res.data.id;
						}
						this.editForm.ideaID = res.data.ideaID;
						this.editForm.markID = res.data.id;
						this.editForm.markName = res.data.markName;
						this.editForm.status = res.data.status;
					}
				}
			},
			addConceptNode() {
				this.dialogVisible = true;
				this.menuVisible = false;
				this.treeType = 2;
				this.chooiceTags();
				this.editForm.ideaID = this.selectedIdeaNode.id;
			},
			async editNode() {
				this.nodeType = 2;
				this.dialogVisible = true;
				this.menuVisible = false;

				if (this.treeType == 1) {
					var res = await getIdea({
						id: this.selectedIdeaNode.id
					})
					if (res != null && res.code == 200) {
						this.editForm.markID = res.data.id;
						this.editForm.markPID = res.data.pid;
						this.editForm.markName = res.data.name;
						this.editForm.status = res.data.status;
						this.editForm.cdate = res.data.cDate;
					}
				} else if (this.treeType == 2) {
					this.chooiceTags();
					var res = await getConcept({
						id: this.selectedConceptNode.id
					})
					if (res != null && res.code == 200) {
						this.editForm.markID = res.data.id;
						this.editForm.markPID = res.data.pid;
						this.editForm.markName = res.data.name;
						this.editForm.status = res.data.status;
						this.editForm.cdate = res.data.cDate;
						this.editForm.desc = res.data.desc;

						var wordArr = JSON.parse(res.data.realWords);

						for (let index in wordArr) {
							var tagIndex = this.tagList.findIndex((s) => {
								return s.id == wordArr[index];
							})
							if (tagIndex == -1) continue;
							this.tagList[tagIndex].isLight = true;
							var t = {
								id: this.tagList[tagIndex].id,
								name: this.tagList[tagIndex].name,
							};
							this.editForm.realWords.push(t);
						};
					}
				}

			},
			async delNode() {
				if (this.treeType == 1) {
					var res = await deleteIdea({
						id: this.selectedIdeaNode.id
					})
					if (res != null && res.code == 200) {
						this.$message({
							type: 'success',
							message: '删除节点成功'
						});
					} else {
						this.$message({
							type: 'error',
							message: res.msg
						});
					}
				} else if (this.treeType == 2) {
					var res = await deleteConcept({
						id: this.selectedConceptNode.id
					})
					if (res != null && res.code == 200) {
						this.$message({
							type: 'success',
							message: '删除节点成功'
						});
					} else {
						this.$message({
							type: 'error',
							message: res.msg
						});
					}
				}
			},
			async saveMark() {
				if (this.treeType == 1) {
					if (this.nodeType == 0 || this.nodeType == 1) {
						var res = await addIdea({
							pid: this.editForm.markPID,
							name: this.editForm.markName,
							status: this.editForm.status,
						});
						if (res != null && res.code == 200) {
							this.$message({
								type: 'success',
								message: '添加成功'
							});
							this.dialogClose();

						} else {
							this.$message({
								type: 'error',
								message: res.msg
							});
						}
					} else if (this.nodeType == 2) {
						var res = await updateIdea({
							id: this.editForm.markID,
							pid: this.editForm.markPID,
							name: this.editForm.markName,
							status: this.editForm.status,
						});
						if (res != null && res.code == 200) {
							this.$message({
								type: 'success',
								message: '保存成功'
							});
							this.dialogClose();
						} else {
							this.$message({
								type: 'error',
								message: res.msg
							});
						}
					}
				} else if (this.treeType == 2) {
					var wordArr = this.editForm.realWords.map(s => s.id);
					if (this.nodeType == 0 || this.nodeType == 1) {
						var res = await addConcept({
							pid: this.editForm.markPID,
							name: this.editForm.markName,
							status: this.editForm.status,
							ideaID: this.editForm.ideaID,
							realWords: JSON.stringify(wordArr),
							desc: this.editForm.desc
						});
						if (res != null && res.code == 200) {
							this.$message({
								type: 'success',
								message: '添加成功'
							});

							this.ideaNodeClick({
								id: this.editForm.ideaID
							});
							this.dialogClose();
						} else {
							this.$message({
								type: 'error',
								message: res.msg
							});
						}
					} else if (this.nodeType == 2) {
						var res = await updateConcept({
							id: this.editForm.markID,
							pid: this.editForm.markPID,
							name: this.editForm.markName,
							status: this.editForm.status,
							ideaID: this.editForm.ideaID,
							realWords: JSON.stringify(wordArr),
							desc: this.editForm.desc
						});
						if (res != null && res.code == 200) {
							this.$message({
								type: 'success',
								message: '保存成功'
							});
							this.ideaNodeClick({
								id: this.editForm.ideaID
							});
							this.dialogClose();
						} else {
							this.$message({
								type: 'error',
								message: res.msg
							});
						}
					}
				}
			},

			dialogClose() {
				this.dialogVisible = false;
				this.menuVisible = false;
				this.tagList = [];
				this.selectedIdeaNode = null;
				this.selectedConceptNode = null;
				this.editForm = {
					markID: 0,
					alreadName: '',
					realID: 0,
					markName: '',
					markPID: 0,
					status: 0,
					realWords: [],
					cdate: '',
					desc: '',
				}
			},
		}
	}
</script>

<style>
	.fillcontain{
		height: 100%;
		width: 100%;
	}
	.col_dis {
		margin-left: 20px;
		margin-right: 10px;
		margin-top: 20px;
		height: 100%;
	}

	.col_row {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.tag_dis {
		margin-left: 5px;
		margin-right: 5px;
	}

	.el-tree {
		min-width: 100%;
		display: inline-block;
		height: 600px;
		/* border: 1px solid blue; */

		.el-tree-node {
			min-width: 100%;
			display: inline-block;
		}
	}

	.active {
		background: #fd7522;
		border: 1px solid #fd7522;
		color: #fff;
	}

	.menu_item {
		line-height: 20px;
		text-align: center;
		margin-top: 10px;
	}

	.dev-type-main-left {
		overflow: auto;
		padding: 10px;

		.right-menu {
			z-index: 1;
			position: absolute;
			height: 100px;
			width: 100px;
			position: absolute;
			border-radius: 5px;
			border: 1px solid #cc3204;
			background-color: white;

			.menu-item {
				//display: block;
				line-height: 20px;
				text-align: left;
				margin-top: 10px;
				font-size: 12px;
				color: #606266;
			}

			li:hover {
				background-color: #edf6ff;
				color: #606266;
			}
		}
	}
</style>
