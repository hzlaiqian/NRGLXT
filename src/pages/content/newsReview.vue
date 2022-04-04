<template>
    <div class='editNews news'>
        <div class='flex items-center space-between review'>
            <div class='left ml-20'>待审核新闻量：
                <span style='color: #F56C6C;padding: 0 5px'>{{ count }}</span>条
            </div>
            <div class='mr-20'>
                <button class='review-button' @click=' isCheck ?closeCheck() : startCheck()'>
                    {{ isCheck ? '关闭审核' : '开始审核' }}
                </button>
            </div>
        </div>
        <div class='box-sizing' style='height: 100%; width: 100%;padding: 20px'>
            <el-row style='display: inline-flex;width: 100%;height: calc(100% - 51px)'>
                <el-col :span='16' style='padding-bottom: 20px;height: 100%;margin-right: 60px;'>

                    <div class='grid-content bg-purple' style='align-items: center;display: flex;'>
                        <div class='bd3 flex-col'></div>
                        <h3 style='margin-left: 5px'>基本信息</h3>
                    </div>
                    <!--                    表单-->
                    <div style='height: calc(100% - 60px)'>
                        <el-form :rules='rules' ref='formData' style='height: 100%' label-position='left'
                                 :model='article' label-width='77px'>
                            <el-form-item class='mt-20' label='标题：' prop='newsTitle'>
                                <el-input show-word-limit placeholder='请输入标题' clearable maxlength='100'
                                          v-model='article.newsTitle'></el-input>
                            </el-form-item>
                            <el-row type='flex' justify='space-between'>
                                <el-col :span='10'>
                                    <el-form-item label='来源：' prop='newsSource'>
                                        <el-input style='width: 100%;' placeholder='请输入来源' show-word-limit clearable
                                                  maxlength='20'
                                                  v-model='article.newsSource'></el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span='12'>
                                    <el-form-item label-width='90px' label='原网时间：'>
                                        <el-date-picker
                                            disabled
                                            style='width: 100%'
                                            v-model='article.inputTime'
                                            prefix-icon=' '
                                            type='datetime'
                                            placeholder='选择日期时间'>
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-collapse-transition>
                                <div v-show='isUnfold'>
                                    <el-form-item label-width='67px' label='摘要：' style='margin-left: 11px'>
                                        <el-input

                                            type='textarea'
                                            :rows='4'
                                            maxlength='200'
                                            show-word-limit
                                            v-model='article.desc'
                                            placeholder='请输入摘要'>
                                        </el-input>
                                    </el-form-item>

                                    <el-row type='flex' justify='space-between'>
                                        <el-col :span='10'>
                                            <el-form-item label='作者：' label-width='67px' style='margin-left: 11px'>
                                                <el-input style='width: 100%' placeholder='请输入作者'
                                                          v-model='article.author'
                                                          clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span='12'>
                                            <el-form-item label-width='90px' label='来源地址：'>
                                                <el-input placeholder='请输入来源地址' v-model='article.sourceAddress'
                                                          clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                </div>
                            </el-collapse-transition>

                            <el-form-item
                                :style=' isUnfold ? "height: calc(100% - 280px)" :"height: calc(100% - 120px)"'
                                class='context' label='正文：' prop='context'>
                                <div class='flex' style='flex-direction: row-reverse'>
                                    <div style='margin-left: 20px' class='pointer color-1683ff'
                                         @click='isUnfold = !isUnfold'>
                                        <span>{{ isUnfold ? '收起信息' : '展开信息' }}</span>
                                        <!--                                        <i :class='{"is-active": isUnfold}'-->
                                        <!--                                           class='el-collapse-item__arrow el-icon-arrow-up '></i>-->
                                        <i :class='isUnfold ? "el-icon-arrow-up": "el-icon-arrow-down"'
                                           class='el-collapse-item__arrow  '></i>
                                    </div>
                                    <div class='pointer color-1683ff' @click='aKeyLayout'>一键排版</div>

                                </div>
                                <div class='editor-box relative' style='height: 100%'>
                                    <div class='absolute fold'>

                                    </div>
                                    <tinymce ref='tinymce' @input='tinymceChange' :value='article.newsContext'
                                             height='100%' />
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>

                </el-col>
                <el-col :span='8' style='height: 100%' class='flex flex-column'>
                    <el-scrollbar class='grid-content bg-purple'
                                  style='width: 100%;height: auto;max-height: calc(100% - 255px);'>
                        <div class='grid-content bg-purple mt-10'>
                            <emotion-tag :activeName='emotionActiveName' @click='emotionClick'
                                         :list='moodList'></emotion-tag>
                            <div style='padding-bottom: 10px'>
                                <div class='tableTitle'></div>
                            </div>
                        </div>
                        <div class='grid-content bg-purple'>
                            <recommend-tag :list='recommendList' @recommendChange='recommendChange'
                                           @marking='onMark'></recommend-tag>
                            <div style='padding: 10px 0; '>
                                <div class='tableTitle'></div>
                            </div>
                        </div>
                        <div class='grid-content bg-purple'>
                            <div class='flex items-center'>
                                <div class='flex items-center'>
                                    <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
                                </div>
                                <h3 class='ml-5'>栏目标签：</h3>
                            </div>
                            <div style='margin: 10px 0 10px 0;display: inline-block;'>
                                <div class='flex flex-wrap'>
                                    <div v-for='item in colList' :key='item.id'>
                                        <transition mode='out-in' name='el-zoom-in-center' appear>
                                            <tag @del='tagClose(item.id,0)' style='margin:12px 12px 0 0'
                                                 type='closeTag' :title='item.name'></tag>
                                        </transition>
                                    </div>

                                    <el-tag class='new-tag pointer' style='margin:12px 12px 0 0' size='small'
                                            @click='showDialog()'>+添加标签
                                    </el-tag>
                                </div>
                            </div>
                            <!--                                <div style='padding: 20px 0px; '>-->
                            <!--                                    <div class='tableTitle'></div>-->
                            <!--                                </div>-->
                        </div>

                    </el-scrollbar>
                    <div class='flex flex-column' style='height: 234px'>
                        <div class='flex items-center' style='padding: 20px 0;'>
                            <div class='tableTitle-left'></div>
                            <div class='audit-result'>审核结果</div>
                            <div class='tableTitle-right'></div>
                        </div>
                        <div class='grid-content bg-purple'>
                            <div class='flex items-center'>
                                <div class='flex items-center'>
                                    <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
                                </div>
                                <h3 class='ml-5'>不通过理由：</h3>
                            </div>
                            <div style='margin-bottom:10px;display: inline-block;'>
                                <div class='flex flex-wrap'>
                                    <div v-for='item in noPassList' :key='item.id'>
                                        <transition mode='out-in' name='el-zoom-in-center' appear>
                                            <tag v-if='item.isLight' @click='item.isLight = !item.isLight'
                                                 :showClose='false' bg-color='rgba(245, 108, 108, 0.11)'
                                                 color='rgba(245, 108, 108, 1)' @del='tagClose(item.id,0)'
                                                 style='margin:12px 12px 0 0;border: 1px solid rgba(255,255,255,0);'
                                                 type='commonTag' :title='item.name'></tag>
                                            <tag v-else @click='item.isLight = !item.isLight'
                                                 bg-color='rgba(234, 237, 247, 0.1)'
                                                 color='rgba(60, 69, 86, 1)' @del='tagClose(item.id,0)'
                                                 style='margin:12px 12px 0 0;border: 1px solid #EAEDF7;'
                                                 type='commonTag' :title='item.name'></tag>
                                        </transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='grid-content bg-purple' style='margin-top: 30px'>
                            <el-row :gutter='20'>
                                <el-col :span='12'>
                                    <el-button type='primary'
                                               style='float: right;width: 100%;letter-spacing: 2px;height: 38px;font-size: 14px'
                                               @click='submit()'>提交
                                    </el-button>
                                </el-col>
                                <el-col :span='12'>
                                    <el-button class='previewBut' @click='openDialogPreview' style='width: 100%' plain>
                                        预览
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>


                </el-col>
            </el-row>
        </div>
        <div>
            <el-dialog class='dialog' title='栏目标签' :visible.sync='dialogVisible' @close='dialogClose()'>
                <!--                <tag type='closeTag' title='小鸡炖蘑菇'></tag>-->
                <div>
                    <div style='width:100px;align-self: center;margin-top: 12px'>
                        <h5>已选栏目:</h5>
                    </div>
                    <div class='flex flex-wrap'>
                        <div v-for='item in isLightTagArr' :key='item.id'>
                            <transition mode='out-in' name='el-zoom-in-center' appear>
                                <tag @del='delHandleClick(item)' style='margin:12px 12px 0 0' type='closeTag'
                                     :title='item.name'></tag>
                            </transition>
                        </div>


                    </div>
                </div>
                <div v-for='p in waitList' :key='p.id' style='margin: 10px 0 ;display: inline;'>
                    <div style='width:100px;align-self: center;margin-top: 12px'>
                        <h5>{{ p.name }}:</h5>
                    </div>
                    <div v-for='c in p.child' :key='c.id' style='display: inline-flex;'>
                        <template>
                            <tag @add='handleClick(c)' :title='c.name' style='margin:12px 12px 0 0'></tag>
                        </template>
                    </div>
                </div>
                <div slot='footer' class='dialog-footer'>
                    <el-button @click='dialogVisible = false'>取 消</el-button>
                    <el-button type='primary' @click='submitTag()'>确定
                    </el-button>
                </div>
            </el-dialog>
        </div>
        <el-dialog width='0' :show-close='false' :visible.sync='dialogPreviewVisible'>
            <div class=' relative'>
                <div class='preview absolute'>
                    <div class='preview-header flex space-between'>
                        <div><i class='el-icon-arrow-left'></i></div>
                        <div class='font-500'>文章详情</div>
                        <div><i class='el-icon-more'></i></div>
                    </div>
                    <div class='preview-content'>
                        <div class='preview-title mt-20'>
                            {{ article.newsTitle }}
                        </div>
                        <div class='flex preview-author' style='margin-top: 8px'>
                            <div style='width: 73px;height: 14px;overflow: hidden'>{{ article.createTime }}</div>
                            <div>{{ article.newsSource }}</div>
                            <div style='margin: 0 5px' v-if='article.newsSource'>|</div>
                            <div>{{ article.newsAuthor }}</div>
                        </div>
                        <div class='flex pointer flex-wrap' style='margin-top: 12px'>
                            <div v-for='c in tagList' :key='c.id' class=' preview-tag'>
                                <tag v-if='c.bColor === "#FFCCCC"' :showClose='false' @del='tagClose(c.id,1)' type='tag'
                                     :title='c.name ' color='#F56C6C' bg-color='rgba(245, 108, 108, 0.11)'></tag>
                                <tag v-else-if='c.bColor === "#E8F0FD"' :showClose='false' @del='tagClose(c.id,1)'
                                     type='tag' :title='c.name ' color='#2A79EE'
                                     bg-color='rgba(42, 121, 238, 0.11)'></tag>
                                <tag v-else :showClose='false' @del='tagClose(c.id,1)' type='tag' :title='c.name '
                                     color='#E6A23C' bg-color='rgba(230, 162, 60, 0.11)'></tag>

                            </div>
                        </div>
                        <div class='preview-text' style='margin-top: 10px'
                             v-html='article.newsContext  + "<style>img {max-width: 100%} table {width: 100%}</style>"'>
                        </div>
                    </div>
                </div>
                <div class='close absolute pointer' @click='dialogPreviewVisible = false'>
                    <img style='width: 30px;height: 30px' src='../../assets/img/close2x.png'>
                </div>
            </div>
        </el-dialog>
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
    getConceptByList, getUnPassList, getCountWaitCheck, getOneArticle, updateCheck, getArticleLayout

} from '../../api/getData.js';
import Tinymce from '@/components/Tinymce';
import Tag from '@/components/Tag';
import dayjs from '@/plugins/dayjs';
import EmotionTag from '@/pages/content/components/EmotionTag';
import RecommendTag from '@/pages/content/components/RecommendTag';

export default {
    name: 'newsReview',
    data() {
        return {
            inputFocus: false,
            dialogVisible: false,
            dialogPreviewVisible: false,
            txtSearch: '',
            inputTime: '',
            show: [],
            isLightTagArr: [],
            article: {
                newsTitle: '',
                newsContext: '',
                newsSource: '',
                inputTime: '',
                author: '',
                desc: '',
                context: '',
                sourceAddress: ''

            },
            isUnfold: false,
            moodList: [],
            recommendList: [],
            tagList: [],
            colList: [],
            noPassList: [],
            rules: {
                newsTitle: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                newsSource: [{ required: true, message: '请输入来源', trigger: 'blur' }],
                context: [{ required: true, message: '请输入正文' }]
            },
            waitList: [],
            radioGroupStyle: {
                textColor: '',
                fill: ''
            },
            emotionId: [],
            emotionActiveName: '',
            count: 0,
            articleData: null,
            isCheck: false
        };
    },
    created() {
        this.initData();
    },
    components: {
        Tinymce, Tag, EmotionTag, RecommendTag
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    watch: {
        content() {
            // 富文本内容长度
            let a = this.quill.getLength() - 1;
            console.log(a);
        }
    },
    methods: {
        async aKeyLayout() {
            if (this.article.context.length !== 0) {
                const data = await getArticleLayout({ context: this.article.context });
                if (data.code === 200) {
                    this.$nextTick(() => {
                        this.article.context = data.data.context;
                        this.$refs.tinymce.setContent(data.data.context);
                    });
                } else {
                    this.$message.error(data.msg);
                }

            } else {
                this.$message.error('正文不能为空');
            }

        },
        closeCheck() {
            this.initData();
            this.articleData = null;
            this.isCheck = false;
        },
        async startCheck() {
            // 开始审核
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            try {
                let data = await getOneArticle();
                if (data.code === 200) {
                    this.isCheck = true;
                    this.articleData = data.data;
                    this.loadData(data.data);
                    if (data.data.moodList !== null) this.emotionId = data.data.moodList.map(q => q.id);
                    this.$nextTick(() => {
                        this.article.newsTitle = data.data.title;
                        this.article.newsSource = data.data.source;
                        this.article.author = data.data.author;
                        this.article.desc = data.data.desc;
                        this.article.sourceAddress = data.data.sourceAddress;
                        this.article.inputTime = data.data.inputTime;
                        this.article.newsContext = data.data.context;
                    });

                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.msg
                    });
                }
                loading.close();
            } catch (err) {
                console.log(11);
                loading.close();
                console.error(err);
            }

        },
        recommendChange(value) {
            this.recommendList = value;
        },
        emotionClick(value) {
            this.emotionId = value.map(q => q.id);
        },
        tinymceChange(value) {
            this.article.context = value;
        },
        openDialogPreview() {
            this.$refs['formData'].validate((valid) => {
                if (!valid) return false;
                let arr = [];
                for (let i = 0; i < this.recommendList.length; i++) {
                    for (let q = 0; q < this.recommendList[i].child.length; q++) {
                        arr.push(this.recommendList[i].child[q]);
                    }
                }
                this.tagList = arr;
                console.log(arr);
                this.dialogPreviewVisible = true;
            });

        },
        radioGroupChange(value) {
            if (value === '利好' || value === '正面') {
                this.radioGroupStyle.fill = 'rgba(245, 108, 108, 0.2)';
                this.radioGroupStyle.textColor = 'rgba(245, 108, 108, 1)';
            } else if (value === '利空' || value === '负面') {
                this.radioGroupStyle.fill = 'rgb(102, 204, 153,0.2)';
                this.radioGroupStyle.textColor = 'rgb(51, 102, 0)';
            } else if (value === '中性') {
                this.radioGroupStyle.fill = 'rgba(246, 155, 64, 0.2)';
                this.radioGroupStyle.textColor = 'rgba(230, 162, 60, 1)';
            }
        },
        async initData() {
            this.dialogVisible = false;

            this.article.newsTitle = '';
            this.article.newsContext = '';
            this.article.newsSource = '';
            this.article.inputTime = '';
            this.article.author = '';
            this.article.desc = '';
            this.article.sourceAddress = '';
            this.queryList = [];
            this.waitList = [];

            this.moodList = [];
            this.recommendList = [];
            this.colList = [];
            this.noPassList = [];
            await this.getCount();
            await this.getMood();
            await this.getColumn();
            await this.gatPassList();
        },
        async getCount() {
            let data = await getCountWaitCheck();
            if (data.code === 200) {
                this.count = data.data;
            }
            console.log(data);
        },
        async gatPassList() {
            let res = await getUnPassList();
            if (res != null && res.code === 200) {
                this.initList(res.data, this.noPassList);
            } else {
                this.moodList = [];
            }
        },
        onEditorChange(event) {
            this.editorTextLength = event.quill.getLength() - 1;
        },
        onEditorReady(event) {

        },
        async loadData(data) {
            this.article.newsContext = data.context;
            this.$refs.tinymce.setContent(data.context)
            await this.initMood(data.mood);
            await this.initRecommend(data.recommend);
            await this.initColumn(data.column);
            await this.initPass(data.unPass);
        },
        initPass(val) {
            if (val) {
                let ids = JSON.parse(val);
                ids.forEach(s => {
                    this.noPassList.map(item => {
                        if (item.id === s) {
                            item.isLight = true;
                        }
                    });
                });
            }
        },
        async initMood(val) {
            console.log(val);
            if (val) {
                let ids = JSON.parse(val);
                ids.forEach(s => {
                    this.moodList.map(item => {
                        if (item.id === s) {
                            item.isLight = true;
                            this.emotionActiveName = item.name;
                        }
                    });
                });
            }
        },
        async initRecommend(val) {
            console.log(val);
            if (val) {
                this.recommendList = [];
                var res = await getConceptByList({
                    ids: JSON.parse(val)
                });
                if (res != null && res.code === 200) {
                    this.initTree(res.data, this.recommendList);
                }
            }
        },
        async initColumn(val) {
            if (val) {
                this.lightTree(JSON.parse(val), this.waitList);
                this.colList = [];
                this.isLightTagArr = [];
                let res = await getLabelByList({
                    ids: JSON.parse(val)
                });
                if (res !== null && res.code === 200) {
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
                                    this.isLightTagArr.push(c);
                                }
                            });
                        }
                    });

                }
            }

        },
        async onMark() {
            // this.$refs['formData'].validate(async (valid) => {
            //     if (!valid) return false;
            //
            // })
            let res = await getOnMark({
                title: this.article.newsTitle,
                context: this.article.context,
                source: this.article.newsSource,
                sourceAddress: this.article.sourceAddress,
                author: this.article.author,
                desc: this.article.desc
            });
            console.log(res);
            if (res !== null && res.code === 200) {
                this.loadData(res.data);
            } else {
                this.initData();
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
                    var kindex = this.recommendList[index].child.findIndex((g) => g.id == c.id);
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
        initList(data, list) {
            data.forEach(i => {
                const l = {};
                l.id = i.id;
                l.name = i.name;
                l.color = i.color;
                l.bColor = i.bColor;
                l.isLight = false;
                list.push(l);
            });
        },
        initTree(data, list) {
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
        },
        lightTree(data, list) {
            if (data !== null) {
                data.forEach(i => {
                    if (list != null && list.length > 0) {
                        list.forEach(p => {
                            if (p.child != null && p.child.length > 0) {
                                p.child.map(item => {
                                    if (item.id === i) item.isLight = true;
                                });
                            }
                        });
                    }
                });
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
            let res = await getLabelByTree({
                pid: 3
            });
            console.log(res, this.waitList);
            if (res != null && res.code === 200) {
                this.initTree(res.data, this.waitList);
            } else {
                this.waitList = [];
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
        initWaitList() {
            let waitList = this.waitList;
            let arr = [];
            for (let i = 0; i < waitList.length; i++) {
                if (waitList[i].child != null && waitList[i].child.length > 0) {
                    for (let q = 0; q < waitList[i].child.length; q++) {
                        if (waitList[i].child[q].isLight) {
                            arr.push(waitList[i].child[q]);
                        }
                    }
                }
            }
            this.isLightTagArr = arr;

        },
        delHandleClick(item) {
            console.log(item);
            var cIndex = this.isLightTagArr.findIndex((c) => c.id == item.id);
            if (cIndex != -1) {
                this.isLightTagArr.splice(cIndex, 1);
            }

            this.waitList.forEach((p) => {
                var cIndex = p.child.findIndex((c) => c.id == item.id);
                if (cIndex != -1) {
                    p.child[cIndex].isLight = false;
                }
            });
            // item.isLight = false;
            // this.initWaitList()
        },
        handleClick(item) {
            // item.isLight = !item.isLight;
            item.isLight = true;
            let flag = true;
            this.isLightTagArr.forEach(q => {
                if (q.id === item.id) return flag = false;
            });
            if (flag) this.isLightTagArr.push(item);

            // this.initWaitList()
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
                });
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
                });

                list.forEach((r) => {
                    this.recommendList.splice(r, 1);
                });

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
                            c.name = j.name;
                            this.colList.push(c);
                        }
                    });
                }
            });

            this.dialogVisible = false;
        },
        async showDialog() {
            let [...arr] = this.colList;
            this.isLightTagArr = arr;
            this.dialogVisible = true;
        },
        dialogClose() {
            this.dialogVisible = false;
        },
        getList(data) {
            var arr = [];
            data.forEach(s => {
                if (s.isLight) {
                    arr.push(s.id);
                }
            });
            console.log(arr);
            return arr;
        },
        getTreeList(data) {
            var arr = [];
            data.forEach(s => {
                if (s.child != null && s.child.length > 0) {
                    var cArr = s.child.map(s => s.id);
                    cArr.forEach(c => {
                        arr.push(c);
                    });
                }
            });
            return arr;
        },
        async submit() {
            this.$refs['formData'].validate(async (valid) => {
                if (!valid) return false;
                let recommendArr = this.getTreeList(this.recommendList);
                let colArr = this.colList.map(item => item.id);
                let article = {
                    articleID: this.articleData.articleID,
                    title: this.article.newsTitle,
                    context: this.article.context,
                    author: this.article.author,
                    desc: this.article.desc,
                    source: this.article.newsSource,
                    sourceTime: this.articleData.sourceTime,
                    sourceAddress: this.article.sourceAddress,
                    inputTime: this.article.inputTime,
                    checkID: this.articleData.checkID,
                    mood: this.emotionId,
                    recommend: recommendArr,
                    column: colArr,
                    unPass: this.noPassList.filter(q => q.isLight).map(q => q.id)
                };
                const res = await updateCheck(article);
                if (res != null && res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '审核成功！'
                    });
                    this.initData();
                    this.startCheck();
                } else {
                    this.$message({
                        type: 'error',
                        message: '审核失败！'
                    });
                }
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.editNews {
    background-color: #fff;
    width: 100%;
    height: 100%;

    .review {
        height: 50px;
        background: #FFFFFF;
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid #EAEDF7;

        .left {
            font-size: 14px;
            font-weight: 400;
            color: #3C4556;
        }

        .review-button {
            width: 78px;
            height: 34px;
            border-radius: 4px;
            border: 1px solid #F56C6C;
            font-size: 14px;
            font-weight: 500;
            color: #F56C6C;
            text-align: center;
            background-color: #fff;
        }
    }

    .el-row {
        //margin-bottom: 20px;

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
        background: url(../../assets/img/mark.png) -2px -5px no-repeat;
        margin-top: 2px;
    }

    .searcch {
        background: url(../../assets/img/mark.png) -2px -5px no-repeat;
    }

    .tableTitle {
        position: relative;
        margin: 0 auto;
        width: 100%;
        height: 1px;
        background-color: rgba(234, 237, 247, 1);
        text-align: center;
        font-size: 16px;
        color: rgba(101, 101, 101, 1);
    }

    .el-textarea .el-input__count {
        bottom: 8px !important;

    }


    .preview {
        width: 258px;
        height: 526px;

        transform: translate(-50%, 0);
        background-image: url("../../assets/img/phone2x.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-color: #fff;
        border-radius: 30px;
        padding: 20px;
        box-sizing: border-box;
    }

    .preview-header {
        height: 26px;
        line-height: 26px;
    }

    .preview-title {
        color: rgba(60, 69, 86, 1);
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
    }

    .preview-content {
        height: 450px;
        overflow-y: auto;
    }

    .preview-author {
        font-size: 10px;
        font-weight: 400;
        color: #919AAD;
        line-height: 14px;
    }

    .close {
        right: -160px;
        top: -30px;
    }

    .preview-tag {
        zoom: 0.7;
        margin-bottom: 6px;
        margin-right: 6px;
    }

    .preview-text {
        font-size: 12px;
        font-weight: 400;
        color: #3C4556;
        line-height: 20px;
    }

    .fold {
        width: 160px;
        top: 0;
        right: 0;
        z-index: 999;
    }

    .new-tag {
        background-color: #fff;
        border-radius: 3px;
        border: 1px solid #2A79EE;
    }

    .el-dialog__body {
        padding-top: 12px;
    }

    .el-dialog__body h5 {
        font-size: 14px;
        font-weight: 400;
        color: #3C4556;
        line-height: 16px;
    }

    .dialog .el-dialog__header {
        border-bottom: 1px solid #EAEDF7;
    }

    .dialog .el-dialog__footer {
        border-top: 1px solid #EAEDF7;
        padding: 20px;
    }

    .previewBut {
        width: 202px;
        height: 38px;
        border-radius: 4px;
        border: 1px solid #2A79EE;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #2A79EE;
        letter-spacing: 2px;
    }

    .audit-result {
        width: 190px;
        height: 16px;
        font-size: 16px;
        font-weight: 500;
        color: #3C4556;
        line-height: 16px;
        text-align: center;
    }
}

.tableTitle-left {
    width: 100%;
    border: 2px solid;
    border-image: linear-gradient(270deg, rgba(42, 121, 238, 1), rgba(42, 121, 238, 0)) 1 1;
}

.tableTitle-right {
    width: 100%;
    border: 2px solid;
    border-image: linear-gradient(270deg, rgba(42, 121, 238, 0), rgba(42, 121, 238, 1)) 1 1;
}
</style>
<style lang='scss'>
.editNews {
    .el-input--prefix .el-input__inner {
        padding-left: 15px;
    }

    .el-scrollbar .el-scrollbar__wrap {
        overflow: auto;
        padding-right: 17px;
        padding-bottom: 17px;
    }
}

.context .el-form-item__content {
    margin-top: -20px;
    height: 100%;
}

</style>
