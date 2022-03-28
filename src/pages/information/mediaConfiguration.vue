<template>
    <div class='mediaConfiguration box-sizing'>
        <div class='header flex items-center box-sizing'>
            <img src='../../assets/img/mark.png'>
            <span class='title'>媒体配置</span>
        </div>
        <div class='table-box box-sizing'>
            <el-row :gutter='20'>
                <el-col style='width: 240px'>
                    <el-input style='width: 100%' clearable v-model='query.name' placeholder='请输入媒体名称'></el-input>
                </el-col>
                <el-col style='width: 240px'>
                    <el-select style='width: 100%' clearable v-model='query.type' placeholder='请选择媒体类型'>
                        <el-option
                            v-for='item in mediaType'
                            :key='item.value'
                            :label='item.name'
                            :value='item.value'>
                        </el-option>
                    </el-select>
                </el-col>
                <el-col style='width: 160px'>
                    <el-select style='width: 100%' clearable v-model='query.weight' placeholder='请选择媒体权重'>
                        <el-option label='1' :value='1'></el-option>
                        <el-option label='2' :value='2'></el-option>
                        <el-option label='3' :value='3'></el-option>
                        <el-option label='4' :value='4'></el-option>
                    </el-select>
                </el-col>
                <el-col style='width: 160px'>
                    <el-select style='width: 100%' clearable v-model='query.user' placeholder='请选择所属客户'>
                        <el-option
                            v-for='(item,i) in userList'
                            :key='i'
                            :label='item'
                            :value='item'>
                        </el-option>
                    </el-select>
                </el-col>
                <el-col style='width: 160px;margin-right: 96px'>
                    <el-select clearable style='width: 100%' v-model='query.open' placeholder='请选择生效状态'>
                        <el-option label='已开启' :value='true'></el-option>
                        <el-option label='已关闭' :value='false'></el-option>
                    </el-select>
                </el-col>
                <el-col style='width: 200px'>
                    <el-button class='add-but' @click='addMedia'>新建</el-button>
                    <el-button class='select' @click='getData'>查询</el-button>

                </el-col>
            </el-row>
            <div>
                <el-table
                    :data='mediaList'
                    border
                    style='width: 100%'>
                    <el-table-column
                        prop='name'
                        label='媒体名称'
                        align='center'
                        min-width='96'>
                    </el-table-column>
                    <el-table-column
                        label='媒体类型'
                        align='center'
                        min-width='79'>
                        <template slot-scope='{row}'>
                            <span v-if='row.type === 1'>媒体</span>
                            <span v-if='row.type === 2'>电子报</span>
                            <span v-if='row.type === 3'>公众号</span>
                            <span v-if='row.type === 4'>专业栏</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop='weight'
                        min-width='87'
                        align='center'
                        label='媒体权重'>
                    </el-table-column>
                    <el-table-column
                        prop='user'
                        min-width='77'
                        align='center'
                        label='所属客户'>
                    </el-table-column>
                    <el-table-column
                        min-width='255'
                        prop='domain'
                        label='媒体域名'>
                    </el-table-column>
                    <el-table-column
                        prop='auto'
                        min-width='249'
                        label='自动化审核'>
                        <template slot-scope='{row}'>
                            {{ autoCheck(row) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        min-width='107'
                        align='center'
                        label='状态'>

                        <template slot-scope='{row}'>
                            <div class='flex row-center'>
                                <div v-if='row.open === true' class='switch flex items-center'>
                                    <div class='open'></div>
                                    <div>已开启</div>

                                </div>
                                <div v-else class='switch flex items-center'>
                                    <div class='close'></div>
                                    <div>已关闭</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        min-width='221'
                        align='center'
                        label='操作'>
                        <template slot-scope='{row}'>
                            <div class='flex space-between'>
                                <el-switch @change='switchChange($event,row)' active-color='#2A79EE'
                                           inactive-color='#C0C4CC' v-model='row.open'></el-switch>
                                <span class='pointer but' @click='handleUpdate(row)'>修改</span>
                                <span class='pointer but' @click='del(row.id)'>删除</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class='pagination flex row-center items-center'>
            <el-pagination
                :page-size='query.size'
                :current-page='query.page'
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
                    <el-form-item label='媒体名称' prop='name'>
                        <el-input placeholder='请输入媒体名称' v-model='mediaForm.name'></el-input>
                    </el-form-item>
                    <el-row style='margin-bottom: 0'>
                        <el-col :span='12'>
                            <el-form-item style='margin-bottom: 0' label='媒体权重'>
                                <el-select style='width: 100%' v-model='mediaForm.weight' placeholder='请选择媒体权重'>
                                    <el-option label='1' :value='1'></el-option>
                                    <el-option label='2' :value='2'></el-option>
                                    <el-option label='3' :value='3'></el-option>
                                    <el-option label='4' :value='4'></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item style='margin-bottom: 0' label='所属客户' prop='client'>
                                <el-select style='width: 100%' v-model='mediaForm.user' placeholder='请选择所属客户'>
                                    <el-option
                                        v-for='(item,i) in userList'
                                        :key='i'
                                        :label='item'
                                        :value='item'>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label='媒体类型'>
                        <el-select style='width: 100%' v-model='mediaForm.type' placeholder='请选择媒体类型'>
                            <el-option
                                v-for='item in mediaType'
                                :key='item.value'
                                :label='item.name'
                                :value='item.value'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='媒体域名' prop='domain'>
                        <el-input
                            type='textarea'
                            :rows='2'
                            placeholder='多个域名用英文，隔开'
                            v-model='mediaForm.domain'>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div class='auto-audit mt-20'>
                    <div class='flex space-between'>
                        <div class='title-left'>自动化审核配置</div>
                        <div class='title-right pointer' @click='oneKeyCheckAll'> 一键全选</div>
                    </div>
                    <div class='mt-20'>
                        <el-checkbox v-model='mediaForm.original'>原创识别</el-checkbox>
                    </div>
                    <div class='mt-10'>
                        <el-input v-model='mediaForm.alias' style='width: 100%' placeholder='原创别名添加，英文，隔开'></el-input>
                    </div>
                    <div class='mt-20 flex space-between'>
                        <el-checkbox v-model='mediaForm.filter'>合规过滤</el-checkbox>
                        <el-checkbox v-model='mediaForm.repeat'>源内去重</el-checkbox>
                        <el-checkbox v-model='mediaForm.layout'>机器排版</el-checkbox>
                        <el-checkbox v-model='mediaForm.mark'>机器打标</el-checkbox>
                    </div>
                </div>
            </div>
            <span slot='footer' class='dialog-footer'>
                <el-button class='cancel' @click='dialogVisible = false'>取 消</el-button>
                <el-button type='primary' @click='isUpdate ? updata() :save()'>确 定</el-button>
              </span>
        </el-dialog>

    </div>
</template>

<script>
import {
    addMediaConfigList,
    deleteMediaConfigList, getMediaConfigByID,
    getMediaConfigList,
    getUsers,
    updateMediaConfigList
} from '@/api/getData';

export default {
    name: 'mediaConfiguration',
    data() {
        return {
            query: {
                name: null,
                type: null,
                weight: null,
                user: null,
                open: null,
                page: 1,
                size: 10
            },
            mediaType: [{
                name: '媒体',
                value: 1
            }, {
                name: '电子报',
                value: 2
            }, {
                name: '公众号',
                value: 3
            }, {
                name: '专业栏',
                value: 4
            }],
            recognition: '',
            dialogVisible: false,
            checkList: ['源内去重', '机器打标'],
            options: [],
            isUpdate: false,
            rules: {
                name: [{ required: true, message: '请输入媒体名称', trigger: 'blur' }],
                user: [{ required: true, message: '请选择所属客户', trigger: 'change' }],
                domain: [{ required: true, message: '请输入媒体域名', trigger: 'blur' }]
            },
            mediaForm: {
                name: '',
                weight: '',
                user: '',
                type: '',
                domain: '',
                original: false,
                filter: false,
                repeat: false,
                layout: false,
                mark: false,
                alias: '',
                open: false
            },
            mediaList: [],
            userList: []
        };
    },
    created() {
        this.getData();
    },
    computed: {

    },
    methods: {
        autoCheck(row) {
            let arr = [];
            if (row.original) arr.push('原创识别');
            if (row.filter) arr.push('合规过滤');
            if (row.repeat) arr.push('源内去重');
            if (row.mark) arr.push('机器打标');
            if (row.layout) arr.push('机器排版');
            return arr.join();
        },
        oneKeyCheckAll() {
            this.mediaForm.original = true;
            this.mediaForm.filter = true;
            this.mediaForm.repeat = true;
            this.mediaForm.layout = true;
            this.mediaForm.mark = true;
        },
        async switchChange(state, item) {
            item.open = state;
            let data = await updateMediaConfigList(item);
            if (data.code === 200) {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.getData();
            } else {
                this.$message.error('修改失败');
            }
        },
        updata() {
            this.$refs['mediaForm'].validate(async (valid) => {
                if (!valid) return;
                this.dialogVisible = false;
                const data = await updateMediaConfigList(this.mediaForm);
                if (data.code === 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getData();

                } else {
                    this.$message.error('修改失败');
                }

            });
        },
        save() {
            this.$refs['mediaForm'].validate(async (valid) => {
                if (!valid) return;
                this.dialogVisible = false;
                const data = await addMediaConfigList(this.mediaForm);
                if (data.code === 200) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.getData();

                } else {
                    this.$message.error('添加失败');
                }

            });
        },
        initializeData() {
            this.mediaForm.name = '';
            this.mediaForm.weight = '';
            this.mediaForm.user = '';
            this.mediaForm.type = '';
            this.mediaForm.domain = '';
            this.mediaForm.alias = '';
            this.mediaForm.original = false;
            this.mediaForm.filter = false;
            this.mediaForm.repeat = false;
            this.mediaForm.layout = false;
            this.mediaForm.mark = false;
            this.mediaForm.open = false;
        },
        async getData() {
            this.userList = [];
            this.mediaList = [];
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            try {

                let userData = await getUsers();
                if (userData.code === 200) {
                    this.userList = userData.data;
                } else {
                    this.$message.error(userData.msg);
                }
                let listData = await getMediaConfigList(this.query);
                if (listData.code === 200) {
                    this.mediaList = listData.data;
                } else {
                    this.$message.error(listData.msg);
                }
                loading.close();
            } catch (err) {
                loading.close();
                console.error(err);
            }
        },
        async handleUpdate(row) {
            const data = await getMediaConfigByID({ id: row.id });
            if (data.code === 200) {
                this.mediaForm = data.data;
                this.isUpdate = true;
                this.dialogVisible = true;
            } else {
                this.$message.error(listData.msg);
            }

        },
        addMedia() {
            this.initializeData();
            this.isUpdate = false;
            this.dialogVisible = true;
        },
        del(id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let data = await deleteMediaConfigList({ id: id });
                if (data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                } else {
                    this.$message.error(data.msg);
                }

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
            font-family: SimSun, Microsoft Yahei, PingFangSC-Medium, PingFang SC, sans-serif;
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
