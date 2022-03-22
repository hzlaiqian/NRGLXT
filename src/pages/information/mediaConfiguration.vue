<template>
    <div class='mediaConfiguration box-sizing'>
        <div class='header flex items-center box-sizing'>
            <img src='../../assets/img/mark.png'>
            <span class='title'>媒体配置</span>
        </div>
        <div class='table-box box-sizing'>
            <el-row :gutter='20'>
                <el-col style='width: 240px'>
                    <el-input style='width: 100%' v-model='query.name' placeholder='请输入媒体名称'></el-input>
                </el-col>
                <el-col style='width: 240px'>
                    <el-select style='width: 100%' v-model='query.class' placeholder='请选择媒体类型'>
                        <el-option
                            v-for='item in options'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                        </el-option>
                    </el-select>
                </el-col>
                <el-col style='width: 160px'>
                    <el-select style='width: 100%' v-model='query.class' placeholder='请选择媒体权重'>
                        <el-option
                            v-for='item in options'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                        </el-option>
                    </el-select>
                </el-col>
                <el-col style='width: 160px'>
                    <el-select style='width: 100%' v-model='query.class' placeholder='请选择所属客户'>
                        <el-option
                            v-for='item in options'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                        </el-option>
                    </el-select>
                </el-col>
                <el-col style='width: 160px;margin-right: 96px'>
                    <el-select style='width: 100%' v-model='query.class' placeholder='请选择生效状态'>
                        <el-option
                            v-for='item in options'
                            :key='item.value'
                            :label='item.label'
                            :value='item.value'>
                        </el-option>
                    </el-select>
                </el-col>
                <el-col style='width: 200px'>
                    <el-button class='add-but' @click='addMedia'>新建</el-button>
                    <el-button class='select'>查询</el-button>

                </el-col>
            </el-row>
            <div>
                <el-table
                    :data='mediaList'
                    border
                    style='width: 100%'>
                    <el-table-column
                        prop='mediaName'
                        label='媒体名称'
                        align='center'
                        width='96'>
                    </el-table-column>
                    <el-table-column
                        prop='mediaClass'
                        label='媒体类型'
                        align='center'
                        width='79'>
                    </el-table-column>
                    <el-table-column
                        prop='mediaWeight'
                        width='87'
                        align='center'
                        label='媒体权重'>
                    </el-table-column>
                    <el-table-column
                        prop='client'
                        width='77'
                        align='center'
                        label='所属客户'>
                    </el-table-column>
                    <el-table-column
                        prop='mediaDomain'
                        label='媒体域名'>
                    </el-table-column>
                    <el-table-column
                        prop='auto'
                        width='249'
                        label='自动化审核'>
                    </el-table-column>
                    <el-table-column
                        prop='state'
                        width='107'
                        align='center'
                        label='状态'>
                        <template slot-scope='{row}'>
                            <div v-if='row.state' class='switch flex items-center'>
                                <div class='open'></div>
                                <div>已开启</div>
                            </div>
                            <div v-else class='switch flex items-center'>
                                <div class='close'></div>
                                <div>已关闭</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width='221'
                        label='操作'>
                        <template slot-scope='{row}'>
                            <div class='flex space-between'>
                                <el-switch active-color='#2A79EE'
                                           inactive-color='#C0C4CC' v-model='row.switch === 0'></el-switch>
                                <span class='pointer but' @click='handleUpdate'>修改</span>
                                <span class='pointer but' @click='del'>删除</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='pagination flex row-center items-center'>
            <el-pagination
                @size-change='handleSizeChange'
                @current-change='handleCurrentChange'
                :current-page.sync='currentPage3'
                :page-size='1'
                layout='prev, pager, next, jumper'
                :total='1'>
            </el-pagination>
        </div>
        <el-dialog
            :title='isUpdate ? "编辑媒体配置" : "新建媒体配置"'
            :visible.sync='dialogVisible'
            width='519px'>
            <div>
                <el-form :model='mediaForm' label-position='right' :rules='rules' ref='mediaForm' label-width='80px'>
                    <el-form-item label='媒体名称' prop='mediaName'>
                        <el-input placeholder='请输入命题名称' v-model='mediaForm.mediaName'></el-input>
                    </el-form-item>
                    <el-row style='margin-bottom: 0'>
                        <el-col :span='12'>
                            <el-form-item style='margin-bottom: 0' label='媒体权重'>
                                <el-select style='width: 100%' v-model='mediaForm.weight' placeholder='请选择媒体权重'>
                                    <el-option
                                        v-for='item in options'
                                        :key='item.value'
                                        :label='item.label'
                                        :value='item.value'>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item style='margin-bottom: 0' label='所属客户' prop='client'>
                                <el-select  style='width: 100%' v-model='mediaForm.client' placeholder='请选择所属客户'>
                                    <el-option
                                        v-for='item in options'
                                        :key='item.value'
                                        :label='item.label'
                                        :value='item.value'>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label='媒体类型'>
                        <el-select style='width: 100%' v-model='mediaForm.class' placeholder='请选择媒体类型'>
                            <el-option
                                v-for='item in options'
                                :key='item.value'
                                :label='item.label'
                                :value='item.value'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='媒体域名' prop='mediaDomain'>
                        <el-input
                            type='textarea'
                            :rows='2'
                            placeholder='多个域名用英文，隔开'
                            v-model='mediaForm.mediaDomain'>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div class='auto-audit mt-20'>
                    <div class='flex space-between'>
                        <div class='title-left'>自动化审核配置</div>
                        <div class='title-right pointer'> 一键全选</div>
                    </div>
                    <div class='mt-20'>
                        <el-checkbox v-model='recognition'>原创识别</el-checkbox>
                    </div>
                    <div class='mt-10'>
                        <el-input style='width: 100%' placeholder='原创别名添加，英文，隔开'></el-input>
                    </div>
                    <div class='mt-20'>
                        <el-checkbox-group v-model='checkList'>
                            <el-checkbox label='合规过滤'></el-checkbox>
                            <el-checkbox label='源内去重'></el-checkbox>
                            <el-checkbox label='机器排版'></el-checkbox>
                            <el-checkbox label='机器打标'></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <span slot='footer' class='dialog-footer'>
                <el-button class='cancel' @click='dialogVisible = false'>取 消</el-button>
                <el-button type='primary' @click='dialogVisible = false'>确 定</el-button>
              </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'mediaConfiguration',
    data() {
        return {
            query: {
                name: ''
            },
            recognition: '',
            dialogVisible: false,
            checkList: ['源内去重', '机器打标'],
            options: [],
            isUpdate: false,
            rules: {
                mediaName: [{ required: true, message: '请输入媒体名称', trigger: 'blur' }],
                client: [{ required: true, message: '请选择所属客户', trigger: 'change' }],
                mediaDomain: [{ required: true, message: '请输入媒体域名', trigger: 'blur' }]
            },
            mediaForm: {
                mediaName: '',
                weight: '',
                client: '',
                class: '',
                mediaDomain: ''
            },
            mediaList: [{
                mediaName: '中国证券报',
                mediaClass: '媒体',
                mediaWeight: 4,
                client: '客户1',
                mediaDomain: 'cs.com.cn、cs.com.cn、cs.com.cn',
                auto: '原创识别、合规过滤、源内去重',
                state: 0,
                switch: 1
            }, {
                mediaName: '中国证券报',
                mediaClass: '媒体',
                mediaWeight: 4,
                client: '客户1',
                mediaDomain: 'cs.com.cn、cs.com.cn、cs.com.cn',
                auto: '原创识别、合规过滤、源内去重',
                state: 1,
                switch: 0
            }, {
                mediaName: '中国证券报',
                mediaClass: '媒体',
                mediaWeight: 4,
                client: '客户1',
                mediaDomain: 'cs.com.cn、cs.com.cn、cs.com.cn',
                auto: '原创识别、合规过滤、源内去重',
                state: 0,
                switch: 1
            }, {
                mediaName: '中国证券报',
                mediaClass: '媒体',
                mediaWeight: 4,
                client: '客户1',
                mediaDomain: 'cs.com.cn、cs.com.cn、cs.com.cn',
                auto: '原创识别、合规过滤、源内去重',
                state: 0,
                switch: 1
            }, {
                mediaName: '中国证券报',
                mediaClass: '媒体',
                mediaWeight: 4,
                client: '客户1',
                mediaDomain: 'cs.com.cn、cs.com.cn、cs.com.cn',
                auto: '原创识别、合规过滤、源内去重',
                state: 0,
                switch: 1
            }, {
                mediaName: '中国证券报',
                mediaClass: '媒体',
                mediaWeight: 4,
                client: '客户1',
                mediaDomain: 'cs.com.cn、cs.com.cn、cs.com.cn',
                auto: '原创识别、合规过滤、源内去重',
                state: 0,
                switch: 1
            }, {
                mediaName: '中国证券报',
                mediaClass: '媒体',
                mediaWeight: 4,
                client: '客户1',
                mediaDomain: 'cs.com.cn、cs.com.cn、cs.com.cn',
                auto: '原创识别、合规过滤、源内去重',
                state: 0,
                switch: 1
            }, {
                mediaName: '中国证券报',
                mediaClass: '媒体',
                mediaWeight: 4,
                client: '客户1',
                mediaDomain: 'cs.com.cn、cs.com.cn、cs.com.cn',
                auto: '原创识别、合规过滤、源内去重',
                state: 0,
                switch: 1
            }]
        };
    },
    methods: {
        handleSizeChange() {
        },
        handleCurrentChange() {
        },
        currentPage3() {
        },
        handleUpdate() {
            this.isUpdate = true;
            this.dialogVisible = true;
        },
        addMedia() {
            this.isUpdate = false;
            this.dialogVisible = true;
        },
        del() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.mediaConfiguration {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 4px;

    .header {
        width: 100%;
        height: 50px;
        background: #FFFFFF;
        border-radius: 4px 4px 0 0;
        border: 1px solid #EAEDF7;
        padding-left: 14px;

        img {
            width: 21px;
            height: 22px;
            margin-right: 7px;
        }

        .title {
            font-size: 16px;
            font-family: SimSun, Microsoft Yahei, PingFangSC-Medium, PingFang SC, sans-serif;
            font-weight: 700;
            color: #2F343D;
        }
    }

    .table-box {
        padding: 12px 20px 20px 20px;

        .switch {
            .open {
                width: 6px;
                height: 6px;
                background: #67C23A;
                border-radius: 50%;
                margin-right: 6px;
            }

            .close {
                width: 6px;
                height: 6px;
                background: #C0C4CC;
                border-radius: 50%;
                margin-right: 6px;
            }
        }

        .but {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC, sans-serif;
            font-weight: 400;
            color: #2A79EE;
            line-height: 18px;
        }
    }

    .el-col {
        margin-bottom: 20px;
    }

    .pagination {
        height: 100px;
        margin: 0;
    }

    .auto-audit {
        .title-left {
            font-size: 14px;
            font-family:SimSun, Microsoft Yahei, PingFangSC-Medium, PingFang SC, sans-serif;
            font-weight: 500;
            color: #2F343D;
            line-height: 20px;
        }

        .title-right {
            width: 60px;
            height: 22px;
            text-align: center;
            line-height: 22px;
            border-radius: 2px;
            border: 1px solid #2A79EE;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC, sans-serif;
            font-weight: 400;
            color: #2A79EE;
        }
    }
}
</style>
<style lang='scss'>
.mediaConfiguration {
    .select {
        width: 64px;
        height: 32px;
        background: #2A79EE;
        border-radius: 4px;
        font-size: 12px;
        font-family: SimSun, Microsoft Yahei, PingFangSC-Regular, PingFang SC, sans-serif;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 12px;
        margin-right: 8px;
    }

    .add-but {
        width: 64px;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #2A79EE;
        font-size: 12px;
        font-family: SimSun, Microsoft Yahei, PingFangSC-Regular, PingFang SC, sans-serif;
        font-weight: 400;
        color: #2A79EE;
        line-height: 12px;

    }

    .el-table th {
        background-color: #F7F8F9 !important;
        //border: 1px solid #EAEDF7;
    }

    .el-dialog__header {
        border-bottom: 1px solid #EAEDF7;;
    }

    .el-dialog__body {
        padding: 20px;
    }

    .el-checkbox__label {
        color: #2F343D;
    }

    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #2F343D;
    }
    .el-dialog__footer .cancel {
        background: #FFFFFF;
        border-radius: 2px;
        border: 1px solid #2A79EE;
        color: #2A79EE;
    }
}
</style>
