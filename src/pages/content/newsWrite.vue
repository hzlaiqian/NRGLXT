<template>
    <div class=' newWrite news'>
        <div style='height: 100%; width: 100%;'>
            <el-row style='display: inline-flex;width: 100%;height: 100%'>
                <el-col class='box-sizing' :span='16'
                        style='height: 100%;padding: 20px 0 20px 20px;margin-right: 64px;overflow-y: auto'>

                    <div class='grid-content bg-purple' style='align-items: center;display: flex;'>
                        <div class='bd3 flex-col'></div>
                        <h3 style='margin-left: 5px'>基本信息</h3>
                    </div>
                    <!--                    表单-->
                    <div style='height: calc(100% - 60px)'>
                        <el-form :rules='rules' ref='formData' label-position='left' style='height: 100%' :model='form'
                                 label-width='77px'>
                            <el-form-item class='mt-20' label='标题：' prop='newsTitle'>
                                <el-input show-word-limit placeholder='请输入标题' clearable maxlength='100'
                                          v-model='form.newsTitle'></el-input>
                            </el-form-item>
                            <!--                            <el-form-item label='来源：' prop='newsSource'>-->
                            <!--                                <el-input placeholder='请输入来源' show-word-limit clearable maxlength='20'-->
                            <!--                                          v-model='form.newsSource'></el-input>-->
                            <!--                            </el-form-item>-->
                            <!--                            <el-row style='margin-bottom: 0' type='flex' justify='space-between'>-->
                            <!--                                <el-col :span='14'>-->
                            <!--                                    <el-form-item label='来源：' prop='newsSource'>-->
                            <!--                                        <el-input placeholder='请输入来源' show-word-limit clearable maxlength='20'-->
                            <!--                                                  v-model='form.newsSource'></el-input>-->
                            <!--                                    </el-form-item>-->
                            <!--                                </el-col>-->
                            <!--                                <el-col class='flex flex-row-reverse' :span='8'>-->
                            <!--                                    <el-form-item style='width: 100%;' label='发布时间：'>-->
                            <!--                                        <el-date-picker-->
                            <!--                                            disabled-->
                            <!--                                            style='width: 100%'-->
                            <!--                                            v-model='form.createTime'-->
                            <!--                                            type='datetime'-->
                            <!--                                            placeholder='选择日期时间'>-->
                            <!--                                        </el-date-picker>-->
                            <!--                                    </el-form-item>-->
                            <!--                                </el-col>-->
                            <!--                            </el-row>-->

                            <el-row style='margin-bottom: 0' type='flex' justify='space-between'>
                                <el-col :span='10'>
                                    <el-form-item label='来源：' prop='newsSource'>
                                        <el-input style='width: 100%;' placeholder='请输入来源' show-word-limit clearable
                                                  maxlength='20'
                                                  v-model='form.newsSource'></el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col class='flex flex-row-reverse' :span='12'>
                                    <!--                                                                        <div class='pointer color-1683ff' @click='isUnfold = !isUnfold'>-->
                                    <!--                                                                            <span>{{isUnfold ? '收起信息' :'展开信息'}}</span>-->
                                    <!--                                                                            <i :class='{"is-active": isUnfold}'-->
                                    <!--                                                                               class='el-collapse-item__arrow el-icon-arrow-right '></i>-->
                                    <!--                                                                        </div>-->
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
                                            v-model='form.desc'
                                            placeholder='请输入摘要'>
                                        </el-input>
                                    </el-form-item>

                                    <el-row type='flex' justify='space-between'>
                                        <el-col :span='10'>
                                            <el-form-item label='作者：' label-width='67px'
                                                          style='margin-left: 11px;margin-bottom: 0'>
                                                <el-input style='width: 100%' placeholder='请输入作者'
                                                          v-model='form.author'
                                                          clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span='12'>
                                            <el-form-item label-width='90px' style='margin-bottom: 0' label='来源地址：'>
                                                <el-input placeholder='请输入来源地址' v-model='form.sourceAddress'
                                                          clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                </div>
                            </el-collapse-transition>

                            <el-form-item class='context' label='正文：'
                                          :style=' isUnfold ? "height: calc(100% - 280px)" :"height: calc(100% - 120px)"'
                                          prop='context'>
                                <div class='flex' style='flex-direction: row-reverse'>
                                    <div style='margin-left: 20px;color: #20A0FF' class='pointer'
                                         @click='isUnfold = !isUnfold'>
                                        <span>{{ isUnfold ? '收起信息' : '展开信息' }}</span>
                                        <!--                                        <i :class='{"is-active": isUnfold}'-->
                                        <!--                                           class='el-collapse-item__arrow el-icon-arrow-up '></i>-->
                                        <i :class='isUnfold ? "el-icon-arrow-up": "el-icon-arrow-down"'
                                           class='el-collapse-item__arrow  '></i>
                                    </div>
                                    <div class='pointer' style='color: #20A0FF' @click='aKeyLayout'>一键排版</div>

                                </div>
                                <div class='editor-box relative' style='height: 100%'>
                                    <div class='absolute fold'>

                                    </div>
                                    <!--                                    <quill-editor id='quill-editor' v-model='form.newsContext' ref='myQuillEditor'-->
                                    <!--                                                  :options='editorOption'-->
                                    <!--                                                  @change='onEditorChange' @ready='onEditorReady($event)'>-->
                                    <!--                                    </quill-editor>-->
                                    <tinymce ref='tinymce' @input='tinymceChange' :value='form.newsContext' height='100%' />
                                    <!--                                    <span class='absolute'-->
                                    <!--                                          style='right: 10px;bottom: 10px;color: rgba(145, 154, 173, 1)'>当前输入{{ editorTextLength-->
                                    <!--                                        }}字</span>-->
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>

                    <!--                    <div class='grid-content bg-purple'-->
                    <!--                         style='width: 100%; display: flex;align-items: center;margin: 5px 0px;'>-->
                    <!--                        <div style='width:auto;align-self: center;text-align: center;min-width: 50px;'>-->
                    <!--                            <h4>标题：</h4>-->
                    <!--                        </div>-->
                    <!--                        <el-col>-->
                    <!--                            <el-input v-model='newsTitle' style='width: 100%;' maxlength='100' show-word-limit-->
                    <!--                                      clearable></el-input>-->
                    <!--                        </el-col>-->
                    <!--                    </div>-->

                    <!--                    <div class='grid-content bg-purple'-->
                    <!--                         style='width: 100%;display: flex;align-items: center;margin: 5px 0px;'>-->
                    <!--                        <div style='width: 50%;display: inline-flex;align-items: center;'>-->
                    <!--                            <div style='width:auto;align-self: center;text-align: center;min-width: 50px;'>-->
                    <!--                                <h4>来源：</h4>-->
                    <!--                            </div>-->
                    <!--                            <el-col>-->
                    <!--                                <el-input v-model='newsSource' style='width: 100%;' maxlength='30' show-word-limit-->
                    <!--                                          clearable></el-input>-->
                    <!--                            </el-col>-->
                    <!--                        </div>-->
                    <!--                        <div style='width: 50%;display: flex;align-items: center;'>-->
                    <!--                            <div style='width:auto;align-self: center;text-align: center;min-width: 80px;'>-->
                    <!--                                <h4>入库时间：</h4>-->
                    <!--                            </div>-->
                    <!--                            <el-col>-->
                    <!--                                <h4>{{ inputTime }}</h4>-->
                    <!--                            </el-col>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <!--                    <div class='grid-content bg-purple' style='display: flex;height: 600px;margin: 5px 0px;'>-->
                    <!--                        <div style='width:auto;text-align: center;min-width: 50px;'>-->
                    <!--                            <h4>正文：</h4>-->
                    <!--                        </div>-->
                    <!--                        <el-col class='grid-content bg-purple'>-->
                    <!--                            <quill-editor v-model='newsContext' ref='myQuillEditor' :options='editorOption'-->
                    <!--                                          @ready='onEditorReady($event)'>-->
                    <!--                            </quill-editor>-->
                    <!--                        </el-col>-->
                    <!--                    </div>-->
                </el-col>
                <el-col :span='8' style='height: 100%;padding: 20px 20px 20px 0' class='flex flex-column'>
                    <el-scrollbar class='grid-content bg-purple' style='width: 100%;height: auto;'>
                        <div class='grid-content bg-purple mt-10'>
                            <emotion-tag @click='emotionClick' :list='moodList'></emotion-tag>
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
                                                 type='closeTag' color='#2A79EE' :title='item.name'></tag>
                                        </transition>
                                    </div>

                                    <el-tag class='new-tag pointer' style='margin:12px 12px 0 0' size='small'
                                            @click='showDialog()'>+添加标签
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>

                    <div class='grid-content bg-purple' style='margin-top: 30px'>
                        <el-row :gutter='20'>
                            <el-col :span='12'>
                                <el-button type='primary'
                                           style='float: right;letter-spacing: 2px;width: 100%;height: 38px;font-size: 14px'
                                           @click='submit()'>提交
                                </el-button>
                            </el-col>
                            <el-col :span='12'>
                                <el-button class='previewBut' @click='openDialogPreview' style='width: 100%' plain>预览
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>

                </el-col>
            </el-row>
        </div>
        <div>
            <el-dialog class='dialog' title='栏目标签' :visible.sync='dialogVisible' @close='dialogClose()'>
                <div>
                    <div style='width:100px;align-self: center;margin-top: 12px'>
                        <h5>已选栏目:</h5>
                    </div>
                    <div class='flex flex-wrap'>
                        <div v-for='item in isLightTagArr' :key='item.id'>
                            <transition mode='out-in' name='el-zoom-in-center' appear>
                                <tag @del='delHandleClick(item)' style='margin:12px 12px 0 0' type='closeTag'
                                     color='#2A79EE'
                                     :title='item.name'></tag>
                            </transition>
                        </div>


                    </div>
                </div>
                <div v-for='p in waitList' :key='p.id' style='margin: 10px 0 ;display: inline;'>
                    <div style='width:100px;align-self: center;margin-top: 12px' class='dialog-title'>
                        <h5>{{ p.name }}:</h5>
                    </div>
                    <div v-for='c in p.child' :key='c.id' style='display: inline-flex;'>
                        <template>
                            <tag @add='handleClick(c)'
                                 :title='c.name' style='margin:12px 12px 0 0'></tag>
                            <!--                            <el-tag class='pointer' :key='c.id' v-if='c.isLight'-->
                            <!--                                    v-bind:style="{'color':c.color,'background-color':c.bColor,'border-color':c.color,'margin': '5px 5px'}"-->
                            <!--                                    @click='handleClick(c)'>-->
                            <!--                                {{ c.name }}-->
                            <!--                            </el-tag>-->
                            <!--                            <el-tag class='pointer' :key='c.id' v-if='!c.isLight'-->
                            <!--                                    style='color: #8C939D;background-color: #FFFFFF;border-color: #8C939D; margin: 5px 5px;'-->
                            <!--                                    @click='handleClick(c)'>-->
                            <!--                                {{ c.name }}-->
                            <!--                            </el-tag>-->
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
            <!--            <div slot="footer" class="dialog-footer">-->
            <!--                <el-button @click="dialogPreviewVisible = false">取 消</el-button>-->
            <!--                <el-button type="primary" @click="dialogPreviewVisible = false">确 定</el-button>-->
            <!--            </div>-->
            <div class=' relative'>
                <div class='preview absolute'>
                    <div class='preview-header flex space-between'>
                        <div><i class='el-icon-arrow-left'></i></div>
                        <div class='font-500'>文章详情</div>
                        <div><i class='el-icon-more'></i></div>
                    </div>
                    <div class='preview-content'>
                        <div class='preview-title mt-20'>
                            {{ form.newsTitle }}
                        </div>
                        <div class='flex preview-author' style='margin-top: 8px'>
                            <div style='width: 73px;height: 14px;overflow: hidden'>{{ form.createTime }}</div>
                            <div>{{ form.newsSource }}</div>
                            <div style='margin: 0 5px' v-if='form.newsAuthor'>|</div>
                            <div>{{ form.newsAuthor }}</div>
                        </div>
                        <div class='flex pointer flex-wrap' style='margin-top: 12px'>
                            <div v-for='c in tagList' :key='c.id' class=' preview-tag'>
                                <tag :showClose='false' @del='tagClose(c.id,1)' type='tag'
                                     :title='c.name ' :color='c.color' :bg-color='c.bColor'></tag>
                                <!--                                <tag v-else-if='c.bColor === "#E8F0FD"' :showClose='false' @del='tagClose(c.id,1)'-->
                                <!--                                     type='tag' :title='c.name ' color='#2A79EE'-->
                                <!--                                     bg-color='rgba(42, 121, 238, 0.11)'></tag>-->
                                <!--                                <tag v-else :showClose='false' @del='tagClose(c.id,1)' type='tag' :title='c.name '-->
                                <!--                                     color='#E6A23C' bg-color='rgba(230, 162, 60, 0.11)'></tag>-->

                            </div>
                        </div>
                        <!--                        <div class='flex flex-wrap' style='padding: 0 10px;margin-top: 10px'>-->
                        <!--                            <el-tag class='preview-tag' v-for='c in tagList' :key='c.id' size='small'-->
                        <!--                                    v-bind:style="{'color':c.color,'background-color':c.bColor,'border-color':c.color}"-->
                        <!--                            >-->
                        <!--                                {{ c.name }}-->
                        <!--                            </el-tag>-->
                        <!--                        </div>-->
                        <div class='preview-text' style='margin-top: 10px'
                             v-html='form.newsContext  + "<style>img {width: 100%}</style>"'>
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
    getArticleLayout,
    getChildList,
    getLabelByTree,
    getLabelByList,

    getConceptByName,
    getConceptByList

} from '../../api/getData.js';
import Tinymce from '@/components/Tinymce';
import Tag from '@/components/Tag';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import EmotionTag from '@/pages/content/components/EmotionTag';
import RecommendTag from '@/pages/content/components/RecommendTag';
import {
    quillEditor
} from 'vue-quill-editor';
import dayjs from '@/plugins/dayjs';

export default {
    name: 'newsWrite',
    data() {
        return {
            inputFocus: false,
            dialogVisible: false,
            dialogPreviewVisible: false,
            txtSearch: '',
            // active: '',
            inputTime: '',
            newsTitle: '',
            newsSource: '',
            newsContext: '',
            show: [],
            isLightTagArr: [],
            form: {
                newsTitle: '',
                newsContext: '',
                context: '',
                newsSource: '',
                value: '',
                sourceAddress: '',
                author: '',
                desc: ''
            },
            isUnfold: true,
            moodList: [],
            recommendList: [],
            tagList: [],
            colList: [],
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
            emotionId: []
        };
    },
    mounted() {
        this.getMood();
        this.getColumn();
    },
    components: {
        Tinymce, Tag, EmotionTag, RecommendTag
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    watch: {},
    methods: {
        recommendChange(value) {
            this.recommendList = value;
        },
        emotionClick(value) {
            this.emotionId = value.map(q => q.id);
        },
        tinymceChange(value) {
            this.form.context = value;
        },
        async aKeyLayout() {
            if (this.form.context.length !== 0) {
                const data = await getArticleLayout({ context: this.form.context });
                console.log(data);
                if (data.code === 200) {
                    // this.form.newsContext = data.data;
                    this.form.context = data.data;
                    this.$nextTick(() => {
                        this.form.context = data.data;
                        this.$refs.tinymce.setContent(data.data)
                    });
                } else {
                    this.$message.error(data.msg);
                }

            } else {
                this.$message.error('正文不能为空');
            }

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
        initData() {
            this.dialogVisible = false;
            this.$nextTick(() => {
                console.log(this.$refs.tinymce)

                this.form.newsTitle = '';
                this.form.newsContext = null;
                this.form.newsSource = '';
                this.form.sourceAddress = '';
                this.form.author = '';
                this.form.desc = '';
                this.queryList = [];
                this.waitList = [];
                this.form.context = null;
                console.log(this.form.newsContext)
                this.$refs.tinymce.setContent('')
            });


            this.moodList = [];
            this.recommendList = [];
            this.colList = [];
            this.getMood();
            this.getColumn();
        },
        onEditorChange(event) {
            this.editorTextLength = event.quill.getLength() - 1;
        },
        onEditorReady(event) {

        },
        async loadData(data) {
            this.form.newsTitle = data.title;
            this.form.newsContext = data.context;
            this.form.newsSource = data.source;
            this.sourceAddress = data.sourceAddress;
            this.sourceTime = data.sourceTime;
            this.inputTime = data.inputTime;

            await this.initMood(data.mood);
            await this.initRecommend(data.recommend);
            await this.initColumn(data.column);
        },
        async initMood(val) {

            if (val != null) {
                var ids = JSON.parse(val);
                console.log(ids, this.moodList);
                ids.forEach(s => {
                    var index = this.moodList.findIndex((m) => m.id == s);
                    if (index != -1) {
                        this.moodList[index].isLight = true;
                    }
                });
            }
            console.log(val, this.moodList);
        },
        async initRecommend(val) {
            console.log(val);
            if (val != null) {
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
            console.log(val);
            if (!val) {
                this.colList = [];
                return;
            }
            this.colList = [];
            this.isLightTagArr = [];
            this.lightTree(JSON.parse(val), this.waitList);7
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

        },
        async onMark() {
            // this.$refs['formData'].validate(async (valid) => {
            //     if (!valid) return false;
            //
            // })
            let res = await getOnMark({
                title: this.form.newsTitle,
                context: this.form.context,
                source: this.form.newsSource
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
            console.log(data, list);

            data.forEach(i => {
                if (list != null && list.length > 0) {
                    list.forEach(p => {
                        if (p.child != null && p.child.length > 0) {
                            var index = p.child.findIndex((c) => c.id == i);
                            if (index != -1) {
                                p.child[index].isLight = true;
                            }
                        }
                    });
                }
            });
            console.log(this.colList);
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
        submit() {
            this.$refs['formData'].validate(async (valid) => {
                if (!valid) return false;
                let recommendArr = this.getTreeList(this.recommendList);
                let colArr = this.colList.map(item => item.id);
                let article = {
                    title: this.form.newsTitle,
                    context: this.form.context,
                    source: this.form.newsSource,
                    mood: this.emotionId,
                    sourceAddress: this.form.sourceAddress,
                    author: this.form.author,
                    desc: this.form.desc,
                    sourceTime: dayjs(new Date).format('YYYY-MM-DD HH:mm:ss'),
                    recommend: recommendArr,
                    column: colArr
                };
                console.log(article);
                const res = await addCheck(article);
                if (res != null && res.code === 200) {
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
            });
        }
    }
};
</script>

<style scoped>

.el-row {
    margin-bottom: 20px;

&
:last-child {
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

.preview .preview-content img {
    width: 100%;
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

.dialog-title h5 {
    font-size: 14px;
    font-weight: 400;
    color: #3C4556;
    line-height: 16px;
}

.newWrite {
    height: 100%;
    background-color: #fff;
}

</style>
<style>
.newWrite .context .el-form-item__content {
    margin-top: -20px;
    height: 100%;
}

.newWrite .el-scrollbar .el-scrollbar__wrap {
    overflow: auto;
    padding-right: 17px;
    padding-bottom: 17px;
}

.ql-align-center img {
    width: 100%;
}
.el-form-item__label {
    font-weight: 600;
}
</style>
