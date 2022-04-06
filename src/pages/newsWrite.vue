<template>
	<div class="container">
		<div style="height: 100%; width: 100%;">
			<el-row :gutter="20" style="display: flex;">
				<el-col :span="16" style="width: 100%;">
					<div class="grid-content bg-purple" style="align-items: center;margin: 5px 0px;display: flex;">
						<div class="bd3 flex-col"></div>
						<h3>基本信息</h3>
					</div>
					<el-form :rules="rules" ref="article_form" :model="article_form">
						<div style="width: 100%;display: flex;">
							<div style="width:auto;min-width: 50px;margin-top: 10px;">
								<h4>标题：</h4>
							</div>
							<el-col>
								<el-form-item prop="newsTitle">
									<el-input v-model="article_form.newsTitle" placeholder="请输入标题" style="width: 100%;"
										maxlength="100" show-word-limit clearable></el-input>
								</el-form-item>
							</el-col>
						</div>
						<div>
							<div style="width: 100%;display: inline-flex;">
								<el-collapse style="width: 100%;border: 0px;">
									<el-collapse-item style="width: 100%;border-bottom: none;">
										<template slot="title">
											<div
												style="width:auto;text-align: center;align-self: center;min-width: 50px;">
												<h4>来源：</h4>
											</div>
											<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
												<el-form-item prop="newsSource">
													<el-input v-model="article_form.newsSource" placeholder="请输入来源"
														style="width: 100%;" maxlength="30" show-word-limit clearable>
													</el-input>
												</el-form-item>
											</el-col>
											<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
												<div style="width: 100%;display: inline-flex;align-items: center;">
													<div
														style="width:auto;align-self: center;text-align: center;min-width: 80px;">
														<h4>入库时间：</h4>
													</div>
													<el-col>
														<h4>{{article_form.inputTime}}</h4>
													</el-col>
												</div>
											</el-col>
											<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
												<p style="float: right;color: #20A0FF;">详细信息</p>
											</el-col>
										</template>
										<div style="width: 100%;display: inline-flex;">
											<div style="width:auto;text-align: center;min-width: 50px;">
												<h4>摘要：</h4>
											</div>
											<el-col>
												<div class="tk_text">
													<textarea v-model="article_form.newsDesc" style="width: 100%;"
														rows="4" maxlength="200" placeholder="请输入摘要"></textarea>
													<span>{{descNum}}/200</span>
												</div>
											</el-col>
										</div>
										<div style="width: 100%;display: inline-flex;">
											<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
												<div style="width: 100%;display: inline-flex;align-items: center;">
													<div style="width:auto;min-width: 50px;">
														<h4>作者：</h4>
													</div>
													<el-input v-model="article_form.newsAuthor" clearable></el-input>
												</div>
											</el-col>
											<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
												<div style="width: 100%;display: flex;">
													<div style="width:auto;min-width: 80px;align-self: center;">
														<h4>来源地址：</h4>
													</div>
													<el-input v-model="article_form.sourceAddress" style="width: 100%;"
														clearable>
													</el-input>
												</div>
											</el-col>
										</div>
									</el-collapse-item>
								</el-collapse>
							</div>
						</div>
						<div class="grid-content bg-purple" style="display: inline-flex;width: 100%;bottom: 0px;">
							<div style="width:auto;text-align: center;min-width: 50px;">
								<h4>正文：</h4>
							</div>
							<el-col class="grid-content bg-purple">
								<div style="height: 100%;">
									<el-form-item prop="newsContext">
										<quill-editor v-model="article_form.newsContext" ref="myQuillEditor"
											:options="editorOption" @blur='contextRule'>
										</quill-editor>
									</el-form-item>
								</div>
							</el-col>
						</div>
					</el-form>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-scrollbar style="width: 100%;height:420px;overflow-x: hidden;"
							wrap-style="overflow-x:hidden;">
							<div class="grid-content bg-purple">
								<div class="grid-content bg-purple"
									style="align-items: center;margin: 5px 0px;display: flex;">
									<div class="bd3 flex-col"></div>
									<h4>情绪标签：</h4>
								</div>
								<div v-for="i in moodList" :key="i.id" style="display: inline-flex;">
									<template>
										<el-tag :key="i.id" v-if="i.isLight"
											v-bind:style="{'color':i.color,'background-color':i.bColor,'margin': '0 5px 0 5px'}"
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
									<div class="spliceLine"></div>
								</div>
							</div>
							<div class="grid-content bg-purple">
								<div style="margin: 5px 0px;">
									<el-row type="flex" :span="24">
										<el-col style="display:flex;align-items: center;">
											<div class="bd3 flex-col"></div>
											<h4>推荐标签：</h4>
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
											v-bind:style="{'color':c.color,'background-color':c.bColor,'margin': '5px 5px'}"
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
									<div class="spliceLine"></div>
								</div>
							</div>
							<div class="grid-content bg-purple">
								<div class="grid-content bg-purple"
									style="align-items: center;margin: 5px 0px;display: flex;">
									<div class="bd3 flex-col"></div>
									<h4>栏目标签：</h4>
								</div>
								<div style="margin: 10px 0 10px 0;display: inline-block;">
									<el-tag v-for="c in colList" :key="c.id" size="small"
										v-bind:style="{'color':c.color,'background-color':c.bColor,'margin': '5px 5px 0 5px'}"
										@close="tagClose(c.id,0)" @click="handleClick(c)" closable> {{c.name}} </el-tag>
								</div>
								<div style="margin: 10px 0 10px 0;display: inline-block;">
									<el-tag class="new-tag" size="small" @click="showDialog()">+添加标签</el-tag>
								</div>
								<div style="padding: 10px 0px; ">
									<div class="spliceLine"></div>
								</div>
							</div>
						</el-scrollbar>
						<div class="grid-content bg-purple" >
							<el-button type="primary" style="width: 100%;" @click="submit()">提交
							</el-button>
						</div>
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
								v-bind:style="{'color':c.color,'background-color':c.bColor,'margin': '5px 5px'}"
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
		addCheck,
		getOnMark,

		getChildList,
		getLabelByTree,
		getLabelByList,

		getConceptByName,
		getConceptByList,

	} from '../api/getData.js'

	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'

	import {
		quillEditor
	} from 'vue-quill-editor'

	export default {
		data() {
			return {
				dialogVisible: false,
				txtSearch: '',
				descNum: 0,

				article_form: {
					newsTitle: '',
					newsContext: '',
					newsSource: '',
					sourceAddress: '',
					sourceTime: '',
					inputTime: '',
					newsDesc: '',
					newsAuthor: '',
				},

				rules: {
					newsTitle: [{
						required: true,
						message: "必须填写标题",
						trigger: 'blur'
					}],
					newsSource: [{
						required: true,
						message: "必须填写来源",
						trigger: 'blur'
					}],
					newsContext: [{
						required: true,
						message: "必须填写正文",
						trigger: 'blur'
					}],
				},

				moodList: [],
				recommendList: [],
				colList: [],

				waitList: [],

				editorOption: {
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike'],
							['blockquote', 'code-block'],
							[{
								'header': 1
							}, {
								'header': 2
							}],
							[{
								'list': 'ordered'
							}, {
								'list': 'bullet'
							}],
							[{
								'script': 'sub'
							}, {
								'script': 'super'
							}],
							[{
								'indent': '-1'
							}, {
								'indent': '+1'
							}],
							[{
								'direction': 'rtl'
							}],
							[{
								'size': ['small', false, 'large', 'huge']
							}],
							[{
								'header': [1, 2, 3, 4, 5, 6, false]
							}],
							[{
								'color': []
							}, {
								'background': []
							}],
							[{
								'font': []
							}],
							[{
								'align': []
							}],
							['clean'],
							['link', 'image']
						]

					},
					theme: 'snow',
					placeholder: "请输入正文"
				}
			}
		},
		created() {
			this.initData();
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
					title: this.article_form.newsTitle,
					context: this.article_form.newsContext,
					source: this.article_form.newsSource,
					author: this.article_form.newsAuthor,
					desc: this.article_form.newsDesc,
					sourceAddress: this.article_form.sourceAddress
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
				this.descNum = 0;
				this.article_form = {
					newsTitle: '',
					newsContext: '',
					newsSource: '',
					sourceAddress: '',
					sourceTime: '',
					inputTime: '',
					newsDesc: '',
					newsAuthor: '',
				};
				this.waitList = [];
				this.moodList = [];
				this.recommendList = [];
				this.colList = [];

				this.getMood();
				this.getColumn();
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
				else{
					list = [];
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
				else{
					list = [];
				}
			},
			lightTree(data, list) {
				if (data != null) {
					data.forEach(i => {
						if (list != null && list.length > 0) {
							list.forEach(p => {
								if (p.child != null && p.child.length > 0) {
									var index = p.child.findIndex((c) => c.id == i.id);
									if (index != -1) {
										p.child[index].isLight = true;
									}
								}
							})
						}
					});
				}
				else{
					list.forEach(p => {
						if (p.child != null && p.child.length > 0) {
							var index = p.child.findIndex((c) => c.id == i.id);
							if (index != -1) {
								p.child[index].isLight = false;
							}
						}
					})
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
			loadData(data) {
				this.article_form.newsTitle = data.title;
				this.article_form.newsContext = data.context;
				this.article_form.newsSource = data.source;
				this.article_form.sourceAddress = data.sourceAddress;
				this.article_form.sourceTime = data.sourceTime;
				this.article_form.inputTime = data.inputTime;
				this.article_form.newsAuthor = data.author;
				this.article_form.newsDesc = data.desc;

				this.initMood(data.mood);
				this.initRecommend(data.recommend);
				this.initColumn(data.column);
			},
			async initMood(val) {
				if (val != null) {
					var ids = JSON.parse(val);
					ids.forEach(s => {
						var index = this.moodList.findIndex((m) => m.id == s);
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
					val.forEach(i => {
						const c = {};
						c.id = i.id;
						c.color = i.color;
						c.bColor = i.bColor;
						c.name = i.name;
						this.colList.push(c);
					});

					this.lightTree(val, this.waitList);
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
			getList(data) {
				var arr = [];
				data.forEach(s => {
					arr.push(s.id);
				});
				return arr;
			},
			getLightList(data) {
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
			contextRule() {
				if (this.article_form.newsContext.trim() === '') {
					this.$refs.article_form.validateField('newsContext');
				} else {
					this.$refs.article_form.clearValidate('newsContext');
				}
			},
			async submit() {
				this.$refs.article_form.validate(async (valid) => {
					if (valid) {
						var moodArr = this.getLightList(this.moodList);
						var recommendArr = this.getTreeList(this.recommendList);
						var colArr = this.getList(this.colList);

						var article = {
							title: this.article_form.newsTitle,
							context: this.article_form.newsContext.toString(),
							source: this.article_form.newsSource,
							inputTime: this.article_form.inputTime,
							sourceTime: this.article_form.sourceTime,
							sourceAddress: this.article_form.sourceAddress,
							desc: this.article_form.newsDesc,
							author: this.article_form.newAuthor,
							mood: moodArr,
							recommend: recommendArr,
							column: colArr,
						}

						const res = await addCheck(article);
						if (res != null && res.code == 200) {
							this.$message({
								type: 'success',
								message: '录入成功'
							});
							this.initData();
						} else {
							this.$message({
								type: 'error',
								message: '录入失败'
							});
						}
					}
				});
			}
		},
		watch: {
			newsDesc() {
				this.descNum = this.newsDesc.length;
			}
		}
	}
</script>

<style>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
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

	.spliceLine {
		position: relative;
		margin: 0 auto;
		width: 100%;
		height: 1px;
		background-color: #d5d5d5;
		text-align: center;
		font-size: 16px;
		color: rgba(101, 101, 101, 1);
	}

	.tk_text {
		/* margin: 0 .1rem; */
		position: relative;

	}

	.tk_text span {
		font-size: 12px;
		color: #999999;
		position: absolute;
		bottom: 8px;
		right: 4px;
	}
</style>
