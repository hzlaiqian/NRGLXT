<template>
    <div class='container editNews news'>
        <div style='height: 100%; width: 100%;'>
            <el-row style='display: inline-flex;width: 100%'>
                <el-col :span='16' style='margin-right: 60px'>
                    <div class='grid-content bg-purple' style='align-items: center;display: flex;'>
                        <div class='bd3 flex-col'></div>
                        <h3 style='margin-left: 5px'>基本信息</h3>
                    </div>
                    <!--                    表单-->
                    <div>
                        <el-form :rules='rules' ref='formData' label-position='left' :model='form' label-width='100px'>
                            <el-form-item class='mt-20' label='标题：' prop='newsTitle'>
                                <el-input show-word-limit placeholder='请输入标题' clearable maxlength='100'
                                          v-model='form.newsTitle'></el-input>
                            </el-form-item>
                            <el-row type='flex' justify='space-between'>
                                <el-col :span='10'>
                                    <el-form-item label='来源：' prop='newsSource'>
                                        <el-input style='width: 100%;' placeholder='请输入来源' show-word-limit clearable
                                                  maxlength='20'
                                                  v-model='form.newsSource'></el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span='12'>
                                    <el-form-item label='原网时间：'>
                                        <el-date-picker
                                            disabled
                                            v-model='value1'
                                            prefix-icon=' '
                                            type='datetime'
                                            placeholder='选择日期时间'>
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-collapse-transition>
                                <div v-show='isUnfold'>
                                    <el-form-item label-width='89px' label='摘要：' style='margin-left: 11px'>
                                        <el-input

                                            type='textarea'
                                            :rows='4'
                                            maxlength='200'
                                            show-word-limit
                                            v-model='form.newsDesc'
                                            placeholder='请输入摘要'>
                                        </el-input>
                                    </el-form-item>

                                    <el-row type='flex' justify='space-between'>
                                        <el-col :span='10'>
                                            <el-form-item label='作者：' label-width='89px' style='margin-left: 11px'>
                                                <el-input style='width: 100%' placeholder='请输入作者'
                                                          v-model='form.newsAuthor'
                                                          clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span='12'>
                                            <el-form-item label='来源地址：'>
                                                <el-input placeholder='请输入来源地址' v-model='form.sourceAddress'
                                                          clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                </div>
                            </el-collapse-transition>

                            <el-form-item label='正文：' prop='newsContext'>
                                <div class='editor-box relative'>
                                    <div class='absolute fold'>
                                        <div class='flex space-between'>
                                            <div class='pointer color-1683ff'>一键排版</div>
                                            <div class='pointer color-1683ff' @click='isUnfold = !isUnfold'>
                                                <span>{{ isUnfold ? '收起信息' : '展开信息' }}</span>
                                                <!--                                        <i :class='{"is-active": isUnfold}'-->
                                                <!--                                           class='el-collapse-item__arrow el-icon-arrow-up '></i>-->
                                                <i :class='isUnfold ? "el-icon-arrow-up": "el-icon-arrow-down"'
                                                   class='el-collapse-item__arrow  '></i>
                                            </div>
                                        </div>
                                    </div>
                                    <tinymce v-model='form.newsContext' :toolbar='toolbar' :height='450' />
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span='8'>
                    <div class='grid-content bg-purple'>
                        <el-scrollbar style='width: 100%;height: auto;'>
                            <div class='grid-content bg-purple'>
                                <div class='grid-content bg-purple'
                                     style='align-items: center;display: flex;'>
                                    <div class='bd3 flex-col'></div>
                                    <h4 class='ml-5'>情绪标签：</h4>
                                </div>
                                <el-radio-group class='mt-20' @change='radioGroupChange'
                                                :text-color='radioGroupStyle.textColor'
                                                :fill='radioGroupStyle.fill' v-model='form.value'>
                                    <el-radio-button v-for='item in moodList' :key='item.id'
                                                     :label='item.name'></el-radio-button>
                                </el-radio-group>
                                <div style='padding: 20px 0; '>
                                    <div class='tableTitle'></div>
                                </div>
                            </div>
                            <div class='grid-content bg-purple'>
                                <div>
                                    <el-row type='flex' :span='24'>
                                        <el-col style='display:flex;align-items: center;'>
                                            <div class='bd3 flex-col'></div>
                                            <h4 class='ml-5'>推荐标签：</h4>
                                        </el-col>
                                        <el-col>
                                            <el-button type='text' size='medium' style='float: right;color: #20A0FF;'
                                                       @click='onMark'>一键打标
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div v-for='p in recommendList' :key='p.id' class='grid-content bg-purple'
                                     style='width: 100%; display: flex;align-items: center;margin: 5px 0px;'>
                                    <div style='width:auto;text-align: center;min-width: 60px;margin-right: 5px'>
                                        <h5>{{ p.name }}:</h5>
                                    </div>

                                    <el-tooltip style='margin-right: 5px' v-for='c in p.child' :key='c.id'
                                                class=' pointer' effect='dark'
                                                placement='top'>
                                        <div slot='content'> {{ c.name }}</div>
                                        <div>

                                            <div v-if='p.name === "A股公司"'>
                                                <transition mode='out-in' name='el-zoom-in-center' appear>
                                                    <tag @del='tagClose(c.id,1)' type='tag' :title='c.name '
                                                         color='#F56C6C' bg-color='rgba(245, 108, 108, 0.11)'></tag>
                                                </transition>
                                            </div>
                                            <div v-else-if='p.name === "二级行业"'>
                                                <transition mode='out-in' name='el-zoom-in-center' appear>
                                                    <tag @del='tagClose(c.id,1)' type='tag' :title='c.name '
                                                         color='#2A79EE' bg-color='rgba(42, 121, 238, 0.11)'></tag>
                                                </transition>
                                            </div>
                                            <div v-else>
                                                <transition mode='out-in' name='el-zoom-in-center' appear>
                                                    <tag @del='tagClose(c.id,1)' type='tag' :title='c.name '
                                                         color='#E6A23C' bg-color='rgba(230, 162, 60, 0.11)'></tag>
                                                </transition>
                                            </div>
                                        </div>
                                    </el-tooltip>
                                </div>
                                <div class='grid-content bg-purple'
                                     style='align-items: center;margin: 5px 0px;display: flex;'>
                                    <el-autocomplete class='searcch' v-model='txtSearch'
                                                     :fetch-suggestions='showRecommend' placeholder='请输入内容'
                                                     @blur='inputFocus = false'
                                                     @focus='inputFocus = true'
                                                     value-key='name'
                                                     :trigger-on-focus='false' @select='handleSelect' size='small'
                                    >
                                        <i slot='suffix' :style=' inputFocus?"color: rgba(42, 121, 238, 1)" : ""'
                                           class='el-input__icon el-icon-search'></i>
                                        <template slot-scope='scope'>
                                            <span>{{ scope.item.name }}</span>
                                            <span style='float: right;color: #919AAD;'>{{ scope.item.ideaName }}</span>
                                        </template>
                                    </el-autocomplete>
                                </div>
                                <div style='padding: 20px 0; '>
                                    <div class='tableTitle'></div>
                                </div>
                            </div>
                            <div class='grid-content bg-purple'>
                                <div class='grid-content bg-purple'
                                     style='align-items: center;margin: 5px 0px;display: flex;'>
                                    <div class='bd3 flex-col'></div>
                                    <h4 class='ml-5'>栏目标签：</h4>
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
                            <div class='flex items-center'>
                                <div class='tableTitle'></div>
                                <div class='audit-result'>审核结果</div>
                                <div class='tableTitle'></div>
                            </div>
                            <div class='grid-content bg-purple'>
                                <div class='grid-content bg-purple'
                                     style='align-items: center;margin: 5px 0px;display: flex;'>
                                    <div class='bd3 flex-col'></div>
                                    <h4 class='ml-5'>不通过理由：</h4>
                                </div>
                                <div style='margin-bottom:10px;display: inline-block;'>
                                    <div class='flex flex-wrap'>
                                        <div v-for='item in noPassList' :key='item.id'>
                                            <transition mode='out-in' name='el-zoom-in-center' appear>
                                                <tag :showClose='false' bg-color='rgba(245, 108, 108, 0.11)' color='rgba(245, 108, 108, 1)' @del='tagClose(item.id,0)' style='margin:12px 12px 0 0'
                                                     type='tag' :title='item.name'></tag>
                                            </transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>

                    <div class='grid-content bg-purple' style='margin-top: 30px'>
                        <el-row :gutter='20'>
                            <el-col :span='12'>
                                <el-button type='primary' style='float: right;width: 100%;letter-spacing: 2px;height: 38px;font-size: 14px' @click='submitTag()'>提交
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
                            {{ form.newsTitle }}
                        </div>
                        <div class='flex preview-author' style='margin-top: 8px'>
                            <div style='width: 73px;height: 14px;overflow: hidden'>{{ form.createTime }}</div>
                            <div>{{ form.newsSource }}</div>
                            <div style='margin: 0 5px' v-if='form.newsSource'>|</div>
                            <div>{{ form.newsAuthor }}</div>
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
                        <div class='preview-text' style='margin-top: 10px' v-html='form.newsContext'>
                        </div>
                    </div>
                </div>
                <div class='close absolute pointer' @click='dialogPreviewVisible = false'>
                    <img style='width: 30px;height: 30px' src='../assets/img/close2x.png'>
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
    getConceptByList

} from '../api/getData.js';
import Tinymce from '@/components/Tinymce';
import Tag from '@/components/Tag';
import dayjs from '@/plugins/dayjs';

export default {
    name: 'editNews',
    data() {
        return {
            inputFocus: false,
            dialogVisible: false,
            dialogPreviewVisible: false,
            txtSearch: '',
            inputTime: '',
            show: [],
            isLightTagArr: [],
            form: {
                newsTitle: '',
                newsContext: '',
                newsSource: '',
                createTime: dayjs(new Date).format('YYYY-MM-DD HH:mm:ss'),
                value: ''
            },
            isUnfold: false,
            moodList: [],
            recommendList: [],
            tagList: [],
            colList: [],
            noPassList: [{
                name: '合规敏感',
                id:1
            }],
            rules: {
                newsTitle: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                newsSource: [{ required: true, message: '请输入来源', trigger: 'blur' }],
                newsContext: [{ required: true, message: '请输入正文' }]
            },
            waitList: [],
            radioGroupStyle: {
                textColor: '',
                fill: ''
            }
        };
    },
    created() {
        this.initData();
    },
    components: {
        Tinymce, Tag
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

            this.newsTitle = '';
            this.newsContext = '';
            this.newsSource = '';

            this.queryList = [];
            this.waitList = [];

            this.moodList = [];
            this.recommendList = [];
            this.colList = [];
            await this.getMood();
            await this.getColumn();
        },
        onEditorChange(event) {
            this.editorTextLength = event.quill.getLength() - 1;
        },
        onEditorReady(event) {

        },
        async loadData(data) {
            if (data.articleID !== null) {
                this.articleID = data.articleID;
            }
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

            this.colList = [];
            this.isLightTagArr = [];
            let res = await getLabelByList({
                ids: JSON.parse(val)
            });
            if (res !== null && res.code === 200) {
                this.colList = [];
                console.log(this.waitList);
                this.waitList.forEach(i => {
                    if (i.child != null) {
                        i.child.forEach(j => {
                            if (j.isLight) {

                            }
                            const c = {};
                            c.id = j.id;
                            c.color = j.color;
                            c.name = j.name;
                            this.colList.push(c);
                            this.isLightTagArr.push(c);
                            console.log(j);

                        });
                    }
                });
                console.log(this.colList);
                this.lightTree(JSON.parse(val), this.waitList);
            }
        },
        async onMark() {
            // this.$refs['formData'].validate(async (valid) => {
            //     if (!valid) return false;
            //
            // })
            let res = await getOnMark({
                title: this.form.newsTitle,
                context: this.form.newsContext,
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
        async submit() {
            var moodArr = this.getList(this.moodList);
            var recommendArr = this.getTreeList(this.recommendList);
            var colArr = this.getList(this.colList);

            var article = {
                title: this.newsTitle,
                context: this.newsContext.toString(),
                source: this.newsSource,
                mood: moodArr,
                recommend: recommendArr,
                column: colArr
            };

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
    }
};
</script>

<style scoped lang='scss'>
.editNews {
    .el-row {
        margin-bottom: 20px;

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
        background-image: url("../assets/img/phone2x.png");
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
        font-family: PingFangSC-Regular, PingFang SC;
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
        font-family: PingFangSC-Regular, PingFang SC;
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
        font-family: PingFangSC-Regular, PingFang SC;
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
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2A79EE;
        letter-spacing: 2px;
    }

    .audit-result {
        width: 190px;
        height: 16px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3C4556;
        line-height: 16px;
        text-align: center;
    }
}

</style>
<style lang='scss'>
.editNews {
    .el-input--prefix .el-input__inner {
        padding-left: 15px;
    }
}
</style>
