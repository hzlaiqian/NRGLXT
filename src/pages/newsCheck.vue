<template>
	<div class="container">
		<div style="height: 100%; width: 100%;">
			<el-row >
				<div style="float: left;align-self: center;">
                    <h3 style='color: #3C4556;font-size: 14px'>待审核新闻数量：<span style='color: #F56C6C'>{{countNumber}}&nbsp;</span>条</h3>
				</div>
				<div style="float: right;align-self: center;">
					<el-button type="danger" @click="articleCheck">
						{{btnCaption}}
					</el-button>
				</div>
                <div style='width: 100%;height: 8px;border-bottom: 1px solid #EAEDF7;clear: both;'></div>
			</el-row>
			<el-row :gutter="20" style="display: inline-flex;">
				<el-col :xs="16" :sm="16" :md="16" :lg="18" :xl="24">
					<div class="grid-content bg-purple" style="align-items: center;margin: 0px 0px;display: flex;">
						<div class="bd3 flex-col"></div>
						<h3 style='color: #3C4556;    margin-left: 6px;font-size: 16px!important;'>基本信息</h3>
					</div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                        <el-form-item label="标题：" prop="name">
                            <el-input v-model="newsTitle"></el-input>
                        </el-form-item>

<!--					<div class="grid-content bg-purple"-->
<!--						style="width: 100%; display: flex;align-items: center;margin: 5px 0px;">-->
<!--						<div style="width:auto;align-self: center;text-align: center;min-width: 50px;">-->
<!--							<h4>标题：</h4>-->
<!--						</div>-->
<!--						<el-col>-->
<!--							<el-input v-model="newsTitle" style="width: 100%;" maxlength="100" show-word-limit-->
<!--								clearable></el-input>-->
<!--						</el-col>-->
<!--					</div>-->
					<div class="grid-content bg-purple"
						style="width: 100%;display: flex;align-items: center;margin: 5px 0px;">
						<div style="width: 50%;display: inline-flex;align-items: center;">
							<div style="width:auto;align-self: center;text-align: center;min-width: 50px;">
								<h4>来源：</h4>
							</div>
							<el-col>
								<el-input v-model="newsSource" style="width: 100%;" maxlength="30" show-word-limit
									clearable></el-input>
							</el-col>
						</div>
						<div style="width: 50%;display: flex;align-items: center;">
							<div style="width:auto;align-self: center;text-align: center;min-width: 80px;">
								<h4>入库时间：</h4>
							</div>
							<el-col>
								<h4>{{inputTime}}</h4>
							</el-col>
						</div>
					</div>
					<div class="grid-content bg-purple" style="display: flex;height: 600px;margin: 5px 0px;">
						<div style="width:auto;text-align: center;min-width: 50px;">
							<h4>正文：</h4>
						</div>
						<el-col class="grid-content bg-purple">
							<quill-editor v-model="newsContext" ref="myQuillEditor" :options="editorOption"
								@ready="onEditorReady($event)">
							</quill-editor>
						</el-col>
					</div>
                    </el-form>
				</el-col>
				<el-col :xs="8" :sm="8" :md="8" :lg="9" :xl="8">
					<div class="grid-content bg-purple">
						<el-scrollbar style="width: 100%;height: auto;">
							<div class="grid-content bg-purple">
								<div class="grid-content bg-purple"
									style="align-items: center;margin: 0px 0px;display: flex;">
									<div class="bd3 flex-col"></div>
									<h4 style='    margin-left: 6px;font-size: 16px!important;'>情绪标签：</h4>
								</div>
								<div v-for="i in moodList" :key="i.id" style="display: inline-flex;">
									<template>
										<el-tag :key="i.id" v-if="i.isLight"
											v-bind:style="{'color':i.color,'background-color':i.bColor,'border-color':i.color,'margin': '0 5px 0 5px'}"
											@click="moodClick(i)">
											{{i.name}}
										</el-tag>
										<el-tag :key="i.id" v-if="!i.isLight"
											style="color: #8C939D;background-color: #FFFFFF;border-color: #8C939D; margin: 0 5px 0 5px;"
											@click="moodClick(i)">
											{{i.name}}
										</el-tag>
									</template>
								</div>
								<div style="padding: 10px 0px; ">
									<div class="tableTitle"></div>
								</div>
							</div>
							<div class="grid-content bg-purple">
								<div style="margin: 5px 0px;">
									<el-row type="flex" :span="24">
										<el-col style="display:flex;align-items: center;">
											<div class="bd3 flex-col"></div>
											<h4 style='    margin-left: 6px;font-size: 16px!important;'>推荐标签：</h4>
										</el-col>
										<el-col>
											<el-button type="text" size="medium" style="float: right;color: #20A0FF;"
												@click="onMark">一键打标</el-button>
										</el-col>
									</el-row>
								</div>
								<div v-for="p in recommendList" :key="p.id" class="grid-content bg-purple"
									style="width: 100%; display: flex;align-items: center;margin: 5px 0px;">
									<div style="width:auto;text-align: center;min-width: 60px;">
										<h5>{{p.name}}:</h5>
									</div>
									<el-col>
										<el-tag v-for="c in p.child" size="small" :key="c.id"
											v-bind:style="{'color':c.color,'border-color':c.color,'background-color':c.bColor,'marging': '5px 5px'}"
											@close="tagClose(c.id,1)" @click="handleClick(c)" closable>{{c.name}}
										</el-tag>
									</el-col>
								</div>
								<div class="grid-content bg-purple"
									style="align-items: center;margin: 5px 0px;display: flex;">
									<el-autocomplete class="searcch" v-model="txtSearch"
										:fetch-suggestions="showRecommend" placeholder="请输入内容" value-key="name"
										:trigger-on-focus="false" @select="handleSelect" size="small" clearable>
										<template slot-scope="scope">
											<el-item>
												<span>{{scope.item.name}}</span>
												<span style="float: right;">{{scope.item.ideaName}}</span>
											</el-item>
										</template>
									</el-autocomplete>
								</div>
								<div style="padding: 10px 0px; ">
									<div class="tableTitle"></div>
								</div>
							</div>
							<div class="grid-content bg-purple">
								<div class="grid-content bg-purple"
									style="align-items: center;margin: 5px 0px;display: flex;">
									<div class="bd3 flex-col"></div>
									<h4 style='    margin-left: 6px;font-size: 16px!important;'>栏目标签：</h4>
								</div>
								<div style="margin: 10px 0 10px 0;display: inline-block;">
									<el-tag v-for="c in colList" :key="c.id" size="small"
										v-bind:style="{'color':c.color,'background-color':c.bColor,'border-color':c.color,'margin': '5px 5px 0 5px'}"
										@close="tagClose(c.id,0)" @click="handleClick(c)" closable> {{c.name}} </el-tag>
								</div>
								<div style="margin: 10px 0 10px 0;display: inline-block;">
									<el-tag class="new-tag" size="small" @click="showDialog()">+添加标签</el-tag>
								</div>
								<div style="padding: 10px 0px; ">
									<div class="tableTitle"></div>
								</div>
							</div>
						</el-scrollbar>
					</div>
					<div class="grid-content bg-purple">
						<div class="grid-content bg-purple" style="align-items: center;margin: 5px 0px;display: flex;">
							<div class="bd3 flex-col"></div>
							<h4 style='    margin-left: 6px;font-size: 16px!important;'>不通过理由：</h4>
						</div>
						<div v-for="i in unPassList" :key="i.id" style="display: inline-flex;">
							<template>
								<el-tag :key="i.id" v-if="i.isLight"
									v-bind:style="{'color':i.color,'background-color':i.bColor,'border-color':i.color,'margin': '5px 5px'}"
									@click="handleClick(i)">
									{{i.name}}
								</el-tag>
								<el-tag :key="i.id" v-if="!i.isLight"
									style="color: #8C939D;background-color: #FFFFFF;border-color: #8C939D; margin: 5px 5px;"
									@click="handleClick(i)">
									{{i.name}}
								</el-tag>
							</template>
						</div>
						<div style="padding: 10px 0px; ">
							<div class="tableTitle"></div>
						</div>

					</div>
					<div class="grid-content bg-purple">
						<el-button type="primary" style="float: right;width: 100%;" @click="submitTag()">确定
						</el-button>
					</div>

				</el-col>
			</el-row>
		</div>
		<div>
			<el-dialog title="选择标签" :visible.sync="dialogVisible" @close="dialogClose()">
				<div v-for="p in waitList" :key="p.id" style="margin: 10px 0 ;display: inline;">
					<div style="width:100px;align-self: center;margin: 5px 0;">
						<h5>{{p.name}}:</h5>
					</div>
					<div v-for="c in p.child" :key="c.id" style="display: inline-flex;">
						<template>
							<el-tag :key="c.id" v-if="c.isLight"
								v-bind:style="{'color':c.color,'background-color':c.bColor,'border-color':c.color,'margin': '5px 5px'}"
								@click="handleClick(c)">
								{{c.name}}
							</el-tag>
							<el-tag :key="c.id" v-if="!c.isLight"
								style="color: #8C939D;background-color: #FFFFFF;border-color: #8C939D; margin: 5px 5px;"
								@click="handleClick(c)">
								{{c.name}}
							</el-tag>
						</template>
					</div>
				</div>
				<div style="height: 20px; border-top: 1px solid #d5d5d5;align-self: center;text-align: center;">
					<el-button style="display: flex;" type="primary" @click="submitTag()">确定
					</el-button>
				</div>
			</el-dialog>
		</div>
	</div>

</template>

<script>
	import {
		quillEditor
	} from 'vue-quill-editor'
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'

	import {
		countArticle,
		getOneArticle,
		getOnMark,
		addCheck,
		updateCheck,

		getChildList,
		getLabelByTree,
		getLabelByList,

		getConceptByName,
		getConceptByList,
	} from '@/api/getData'

	export default {
		data() {
			return {
				btnCaption: '开始审核',
				active: '',
				dialogVisible: false,
				txtSearch: '',
				countNumber: 0,
				articleID: -1,
				warnMess: '',
				newsTitle: '',
				newsContext: '',
				newsSource: '',
				sourceAddress: '',
				sourceTime: '',
				inputTime: '',

				moodList: [],
				recommendList: [],
				colList: [],
				unPassList: [],

				waitList: [],
				editorOption: [
					["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
					["blockquote", "code-block"], // 引用  代码块
					[{
						header: 1
					}, {
						header: 2
					}], // 1、2 级标题
					[{
						list: "ordered"
					}, {
						list: "bullet"
					}], // 有序、无序列表
					[{
						script: "sub"
					}, {
						script: "super"
					}], // 上标/下标
					[{
						indent: "-1"
					}, {
						indent: "+1"
					}], // 缩进
					// [{'direction': 'rtl'}],                         // 文本方向
					[{
						size: ["small", false, "large", "huge"]
					}], // 字体大小
					[{
						header: [1, 2, 3, 4, 5, 6, false]
					}], // 标题
					[{
						color: []
					}, {
						background: []
					}], // 字体颜色、字体背景颜色
					[{
						font: []
					}], // 字体种类
					[{
						align: []
					}], // 对齐方式
					["clean"], // 清除文本格式
					//["link", "image","video"] // 链接、图片、视频
					['link', 'image', 'video'] // 链接、图片
				]
			}
		},
		created() {
			this.initData();
			window.setInterval(this.getArticleCount(), 600000);
		},
		components: {
			quillEditor,
		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill
			}
		},
		methods: {
			onEditorReady(editor) {

			},
			checkInput() {
				if (this.newsTitle == null || this.newsTitle == '') {
					this.$message.error('标题为空，请输入标题')
					return false;
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
				var child = [];
				const c = {};
				c.id = item.id;
				c.name = item.name;
				c.color = item.color;
				c.bColor = item.bColor;
				child.push(c);

				var index = this.recommendList.findIndex((s) => s.id == item.ideaID);
				if (index != -1) {
					if (this.recommendList[index].child == null ||
						this.recommendList[index].child.length == 0) {
						this.recommendList[index].child = child;
					} else {
						var kindex = this.recommendList[index].child.findIndex((g) => g
							.id == c.id);
						if (kindex == -1) {
							this.recommendList[index].child.push(c);
						}
					}
				} else {
					const p = {};
					p.id = item.ideaID;
					p.name = item.ideaName;
					p.color = item.color;
					p.bColor = item.bColor;
					p.child = child;
					this.recommendList.push(p);
				}
			},
			async onMark() {
				var res = await getOnMark({
					title: this.newsTitle,
					context: this.newsContext,
					source: this.newsSource
				});
				if (res != null && res.code == 200) {
					this.loadData(res.data);

				} else {
					this.initData();
				}
			},
			initData() {
				this.dialogVisible = false;
				this.txtSearch = '';
				this.articleID = -1;
				this.newsTitle = '';
				this.newsContext = '';
				this.newsSource = '';
				this.sourceAddress = '';
				this.inputTime = '';
				this.sourceTime = '';
				this.sourceAddress = '';

				this.waitList = [];

				this.moodList = [];
				this.recommendList = [];
				this.colList = [];
				this.unPassList = [];
				this.btnCaption = '开始审核';
				this.getArticleCount();
				this.getMood();
				this.getColumn();
				this.getUnpass();
			},
			initList(data, list) {
				if (data != null) {
					data.forEach(i => {
						const l = {};
						l.id = i.id;
						l.name = i.name;
						l.color = i.color;
						l.bColor = i.bColor;
						l.isLight = false;
						list.push(l);
					});
				}
			},
			initTree(data, list) {
				if (data != null) {
					data.forEach(i => {
						const p = {};
						p.id = i.id;
						p.name = i.name;
						p.color = i.color;
						p.bColor = i.bColor;
						p.isLight = false;
						var child = [];
						i.child.forEach(j => {
							const c = {};
							c.id = j.id;
							c.name = j.name;
							c.color = j.color;
							c.bColor = j.bColor;
							c.isLight = false;
							child.push(c);
						});
						p.child = child;
						list.push(p);
					});
				}
			},
			lightTree(data, list) {
				if (data != null) {
					data.forEach(i => {
						if (list != null && list.length > 0) {
							list.forEach(p => {
								if (p.child != null && p.child.length > 0) {
									var index = p.child.findIndex((c) => c.id == i);
									if (index != -1) {
										p.child[index].isLight = true;
									}
								}
							})
						}
					});
				}
			},
			async getArticleCount() {
				var res = await countArticle();
				if (res != null) {
					this.countNumber = res.data;
				} else {
					this.countNumber = 0;
				}
			},
			async getMood() {
				var res = await getChildList({
					pid: 1
				});
				if (res != null && res.code == 200) {
					this.initList(res.data, this.moodList);
				} else {
					this.moodList = [];
				}
			},
			async getColumn() {
				var res = await getLabelByTree({
					pid: 3
				});
				if (res != null && res.code == 200) {
					this.initTree(res.data, this.waitList);
				} else {
					this.waitList = [];
				}
			},
			async getUnpass() {
				var res = await getChildList({
					pid: 4
				});
				if (res != null && res.code == 200) {
					this.initList(res.data, this.unPassList);
				} else {
					this.unPassList = [];
				}
			},
			loadData(data) {
				if (data.articleID != null) {
					this.articleID = data.articleID;
				}
				this.newsTitle = data.title;
				this.newsContext = data.context;
				this.newsSource = data.source;
				this.sourceAddress = data.sourceAddress;
				this.sourceTime = data.sourceTime;
				this.inputTime = data.inputTime;

				this.initMood(data.mood);
				this.initRecommend(data.recommend);
				this.initColumn(data.column);
				this.initUnPass(data.stop);
			},
			async initMood(val) {
				if (val != null) {
					var ids = JSON.parse(val);
					ids.forEach(s => {
						var index = this.moodList.findIndex((m) => m.id == s.id);
						if (index != -1) {
							this.moodList[index].isLight = true;
						}
					});
				}
			},
			async initRecommend(val) {
				if (val != null) {
					this.recommendList = [];
					var res = await getConceptByList({
						ids: JSON.parse(val)
					});
					if (res != null && res.code == 200) {
						this.initTree(res.data, this.recommendList);
					}
				}
			},
			async initColumn(val) {
				if (val != null) {
					this.colList = [];
					var res = await getLabelByList({
						ids: JSON.parse(val)
					});
					if (res != null && res.code == 200) {
						this.colList = [];
						this.waitList.forEach(i => {
							if (i.child != null) {
								i.child.forEach(j => {
									if (j.isLight) {
										const c = {};
										c.id = j.id;
										c.color = j.color;
										c.name = j.name;
										this.colList.push(c);
									}
								})
							}
						});
						this.lightTree(JSON.parse(val), this.waitList);
					}
				}
			},
			async initUnPass(val) {
				if (val != null) {
					var ids = JSON.parse(val);
					ids.forEach(s => {
						var index = this.unPassList.findIndex((m) => m.id == s.id);
						if (index != -1) {
							this.unPassList[index].isLight = true;
						}
					});
				}
			},
			moodClick(item) {
				this.moodList.forEach(i => {
					if (i.id == item.id) {
						i.isLight = !item.isLight;
					} else {
						i.isLight = false;
					}
				});
			},
			handleClick(item) {
				item.isLight = !item.isLight;
			},
			tagClose(cid, tagType) {
				if (tagType == 0) {
					var cIndex = this.colList.findIndex((c) => c.id == cid);
					if (cIndex != -1) {
						this.colList.splice(cIndex, 1);
					}

					this.waitList.forEach((p) => {
						var cIndex = p.child.findIndex((c) => c.id == cid);
						if (cIndex != -1) {
							p.child[cIndex].isLight = false;
						}
					})
				} else if (tagType == 1) {
					var list = [];
					this.recommendList.forEach((p) => {
						var cIndex = p.child.findIndex((c) => c.id == cid);
						if (cIndex != -1) {
							var pIndex = this.recommendList.findIndex((k) => k.id == p.id);
							if (pIndex != -1) {
								p.child.splice(cIndex, 1);
								if (this.recommendList[pIndex].child.length == 0) {
									list.push(pIndex);
								}
							}
						}
					})
					list.forEach((r) => {
						this.recommendList.splice(r, 1);
					})
				}
			},
			submitTag() {
				this.colList = [];
				this.waitList.forEach(i => {
					if (i.child != null) {
						i.child.forEach(j => {
							if (j.isLight) {
								const c = {};
								c.id = j.id;
								c.color = j.color;
								c.bColor = j.bColor;
								c.name = j.name;
								this.colList.push(c);
							}
						})
					}
				});

				this.dialogVisible = false;
			},
			async showDialog() {
				this.dialogVisible = true;
			},
			dialogClose() {
				this.dialogVisible = false;
			},
			async articleCheck() {
				var res = await getOneArticle();
				if (res != null && res.code == 200) {
					this.loadData(res.data);
					this.btnCaption = '正在审核';
				} else {
					this.initData();
				}
			},
			getList(data) {
				var arr = [];
				data.forEach(s => {
					if (s.isLight) {
						arr.push(s.id);
					}
				});
				return arr;
			},
			getTreeList(data) {
				var arr = [];
				data.forEach(s => {
					if (s.child != null && s.child.length > 0) {
						var cArr = s.child.map(s => s.id);
						cArr.forEach(c => {
							arr.push(c)
						});
					}
				})
				return arr;
			},
			async submit() {
				var moodArr = this.getList(this.moodList);
				var recommendArr = this.getTreeList(this.recommendList);
				var colArr = this.getList(this.colList);
				var unPassArr = this.getList(this.unPassList);
				var article = {
					articleID: this.articleID,
					title: this.newsTitle,
					context: this.newsContext.toString(),
					source: this.newsSource,
					inputTime: this.inputTime,
					sourceTime: this.sourceTime,
					sourceAddress: this.sourceAddress,
					mood: moodArr,
					recommend: recommendArr,
					column: colArr,
					unPass: unPassArr,
				};
				const res = await addCheck(article);
				if (res != null && res.code == 200) {
					this.$message({
						type: 'success',
						message: '审核成功'
					});
					this.initData();
				} else {
					this.$message({
						type: 'error',
						message: '审核失败'
					});
				}
			},
		},
	}
</script>

<style>
body{
    color:#3C4556 ;
}
h4{
    font-size: 12px!important;
}
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #ffffff;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.grid-content-1 {
		object-fit: inherit;
		width: 100%;
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.bd3 {
		width: 14px;
		height: 12px;
		background: url(../assets/img/mark.png) -2px -5px no-repeat;
		margin-top: 2px;
	}

	.searcch {
		background: url(../assets/img/mark.png) -2px -5px no-repeat;
	}

	.tableTitle {
		position: relative;
		margin: 0 auto;
		width: 100%;
		height: 1px;
		background-color: #d5d5d5;
		text-align: center;
		font-size: 16px;
		color: rgba(101, 101, 101, 1);
	}
</style>
