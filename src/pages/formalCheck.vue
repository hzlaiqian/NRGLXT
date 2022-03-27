<template>
    <div class='container formal-check'>
        <div class='handle-box' style='display: inline-block;'>
            <el-input style='width: 200px; margin: 5px 10px 0 0' placeholder='请输入标题' v-model='newsTitle' size='small'
                      clearable />
            <el-input style='width: 140px;margin: 5px 10px 0 0' placeholder='请输入来源' v-model='newsSource' size='small'
                      clearable />
            <el-select placeholder='请选择情绪标签' v-model='checkMood' size='small' style='width: 140px; margin: 5px 10px 0 0'
                       clearable>
                <el-option v-for='item in moodList' :key='item.value' :label='item.label' :value='item.value'
                           clearable />
            </el-select>
            <el-autocomplete v-model='newsRecommend' :fetch-suggestions='showRecommend' placeholder='请输入推荐标签'
                             style='width: 200px; margin: 5px 10px 0 0' value-key='name' :trigger-on-focus='false'
                             @select='handleSelect' size='small' clearable @clear='clearSelect()'>
                <template slot-scope='scope'>
                    <el-item>
                        <span>{{ scope.item.name }}</span>
                        <span style='float: right;'>{{ scope.item.ideaName }}</span>
                    </el-item>
                </template>
            </el-autocomplete>
            <el-input style='width: 140px; margin: 5px 10px 0 0' placeholder='请输入栏目标签' v-model='newsColumn' size='small'
                      clearable />
            <el-date-picker v-model='dateRange' size='small' style='width: 240px;margin: 5px 10px 0 0'
                            value-format='yyyy-MM-dd'
                            type='daterange' range-separator='-' start-placeholder='开始日期' end-placeholder='结束日期'
                            @change='timeChange' clearable>
            </el-date-picker>
            <el-button type='primary' style='margin-left: 10px;' @click='getArctileList()'>查询
            </el-button>
        </div>
        <el-table :data='tableData' highlight-current-row>
            <el-table-column align='left' label='标题' min-width='500'>
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
            <el-table-column property='source' align='center' label='来源' min-width='100px'>

            </el-table-column>
            <el-table-column property='checkTime' align='center' label='发布时间' min-width='200px'></el-table-column>
            <el-table-column property='mood' align='center' label='情绪标签' min-width='200px'>
                <template slot-scope='scope'>
                    <el-tag v-for='i in scope.row.moodList' :key='i.id'
                            :style="{'color':i.color,'background-color':i.bColor,'border-color':i.color,'margin': '0 5px 5px 0'}">
                        {{ i.name }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column property='recommend' align='center' label='推荐标签' min-width='200px'>
                <template slot-scope='scope'>
                    <el-tag v-for='i in scope.row.recommendList' :key='i.id'
                            v-bind:style="{'color':i.color,'background-color':i.bColor,'border-color':i.color,'margin': '0 5px 5px 0'}">
                        {{ i.name }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column property='column' align='center' label='栏目标签' min-width='200px'>
                <template slot-scope='scope'>
                    <el-tag v-for='i in scope.row.columnList' :key='i.id'
                            :style="{'color':i.color,'background-color':i.bColor,'border-color':i.color,'margin': '0 5px 5px 0'}">
                        {{ i.name }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column align='center' label='操作' min-width='100' fixed='right'>
                <template #default='scope'>
                    <span class='mr-20 pointer' @click='openPreview(scope.row)'>预览</span>
                    <router-link :to="{ path: '/editNews', query: { checkID: scope.row.checkID }}">修改
                    </router-link>
                    <el-popconfirm title='确定下线吗？' @confirm='handleClose(scope.row.checkID)'>
                        <template #reference>
                            <a style='cursor: pointer; margin-left: 10px'>下线</a>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-row class='Pagination mt-20'>
            <el-pagination background layout='prev, pager, next' :total='total' :page-size='pageSize'
                           :current-page='currentPage' @current-change='changePage'>
            </el-pagination>
        </el-row>
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
                            {{ previewData.newsTitle }}
                        </div>
                        <div class='flex preview-author' style='margin-top: 8px'>
                            <div style='width: 73px;height: 14px;overflow: hidden'>{{ previewData.createTime }}</div>
                            <div>{{ previewData.newsSource }}</div>
                            <div style='margin: 0 5px' v-if='previewData.newsAuthor'>|</div>
                            <div>{{ previewData.newsAuthor }}</div>
                        </div>
                        <div class='flex pointer flex-wrap' style='margin-top: 12px'>
                            <div v-for='c in previewData.tagList' :key='c.id' class=' preview-tag'>
                                <tag :showClose='false' type='tag'
                                     :title='c.name ' :color='c.color' :bg-color='c.bColor'></tag>

                            </div>
                        </div>
                        <div class='preview-text' style='margin-top: 10px'
                             v-html='previewData.newsContext  + "<style>img {width: 100%}</style>"'>
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
    getCheckList,
    deleteCheckByID,
    getConceptByName,
    getChildList, getWaitByID, getConceptByList
} from '@/api/getData';
import Tag from '@/components/Tag';
export default {
    components: {
        Tag
    },
    data() {
        return {
            newsTitle: '',
            newsSource: '',
            newsMood: '',
            newsRecommend: '',
            newsRecommendID: -1,
            newsColumn: '',
            dialogPreviewVisible: false,
            checkMood: '',
            moodList: [],
            previewData: {
                newsContext: '',
                tagList: [],
                newsAuthor: '',
                newsSource: '',
                createTime: '',
                newsTitle: ''
            },
            dateRange: [],
            tableData: [],
            recommendList: [],
            total: 0, // 总条数
            currentPage: 1, // 当前页
            pageSize: 10 // 分页大小
        };
    },
    created() {
        this.initData();
        this.initMood();
        // this.setTime();
    },
    methods: {
        async openPreview(row) {
            const data = await getWaitByID({
                checkID: row.checkID
            });
            if (data.code === 200) {
                this.previewData.newsContext = data.data.context
                this.previewData.newsAuthor = data.data.author
                this.previewData.newsSource = data.data.source
                this.previewData.createTime = data.data.inputTime
                this.previewData.newsTitle = data.data.title
                this.initRecommend(data.data.recommend)
            }
            this.dialogPreviewVisible = true
        },
        async initRecommend(val) {
            if (val != null) {
                this.previewData.tagList = [];
                let res = await getConceptByList({
                    ids: JSON.parse(val)
                });
                if (res != null && res.code === 200) {
                    this.initTree(res.data, this.previewData.tagList);
                }
            }
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
                });
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
                let params = {
                    page: this.currentPage,
                    size: this.pageSize,
                    title: this.newsTitle,
                    source: this.newsSource,
                    mood: this.checkMood,
                    recommend: this.newsRecommendID,
                    column: this.newsColumn
                };
                console.log(this.dateRange)
                if (this.dateRange != null && this.dateRange.length > 0) {
                    params.startTime = this.dateRange[0];
                    params.endTime = this.dateRange[1];
                }
                const res = await getCheckList(params);
                if (res != null && res.code == 200) {
                    this.tableData = res.data;
                    this.total = res.total;
                } else {
                    throw new Error(res.message);
                }
            } catch (err) {
                console.log('获取数据失败', err);
            }
        }
    }
};
</script>

<style>
.handle-box {
    margin-bottom: 20px;
}

.formal-check .el-tag {
    border: none;
}

.table {
    width: auto;
    font-size: 14px;
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
</style>
