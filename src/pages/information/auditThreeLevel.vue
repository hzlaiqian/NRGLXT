<template>
    <div class='audit-three-level'>
        <div class='header flex items-center box-sizing'>
            <img class='pointer' @click='back' src='../../assets/img/back@2x.png'>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class='flex items-center' :to="{ path: '/mediaAudit' }">首页
                </el-breadcrumb-item>

                <el-breadcrumb-item :to='item.path' v-for='(item,i) in mediaBreadcrumbList' :key='i'>{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='table-box box-sizing'>
            <el-row :gutter='20'>
                <el-col style='width: 340px'>
                    <el-input style='width: 100%' v-model='query.name' placeholder='请输入名称'></el-input>
                </el-col>
                <el-col style='width: 200px'>
                    <el-button class='select' @click='getData'>查询</el-button>
                    <el-button class='add-but' @click='addMedia(null)'>新建</el-button>
                </el-col>
            </el-row>
            <div class='flex selected-box' style='margin-top: 12px'>
                <div style='margin-right: 12px'>已选<span style='margin: 0 4px' class='color'>{{selection.length}}</span>项</div>
                <div class='color pointer' @click='del(0)'>
                    <i class='el-icon-delete' style='margin-right: 6px'></i>
                    <span>删除</span>
                </div>
            </div>
            <div>
                <el-table
                    :data='list'
                    border
                    @select='select'
                    @select-all='selectAll'
                    style='width: 100%'>
                    <el-table-column
                        type='selection'
                        align='center'
                        min-width='96'>
                    </el-table-column>
                    <el-table-column
                        prop='name'
                        label='名称'
                        align='left'
                        min-width='279'>
                    </el-table-column>
                    <el-table-column
                        prop='count'
                        label='下级数据量'
                        align='center'
                        min-width='219'>
                    </el-table-column>
                    <el-table-column
                        prop='cdate'
                        min-width='263'
                        align='center'
                        label='创建时间'>
                    </el-table-column>
                    <el-table-column
                        min-width='319px'
                        align='center'
                        label='操作'>
                        <template slot-scope='{row}'>
                            <div class='flex space-between'>
                                <span class='pointer but' @click='addMedia(row.id)'>批量添加</span>
                                <span class='pointer but' @click='openAuditThree(row)'  v-if='row.count !== 0'>查看数据</span>
                                <span class='pointer but' @click='del(1,row.id)'>删除</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class='pagination flex row-center items-center'>
                <el-pagination
                    @size-change='getData'
                    :page-size='query.size'
                    :current-page='query.page'
                    layout='prev, pager, next, jumper'
                    :total='1'>
                </el-pagination>
            </div>
        </div>
        <el-dialog
            title='批量添加'
            :visible.sync='dialogVisible'
            width='519px'>
            <div>
                <el-form :model='mediaForm' label-position='right' ref='mediaForm' label-width='80px'>
                    <el-form-item label='数据名称'>
                        <el-input
                            type='textarea'
                            :rows='2'
                            placeholder='批量添加请用英文,隔开'
                            v-model='mediaForm.names'>
                        </el-input>
                    </el-form-item>
                </el-form>

            </div>
            <span slot='footer' class='dialog-footer'>
                <el-button class='cancel' @click='dialogVisible = false'>取 消</el-button>
                <el-button type='primary' @click='save'>确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import { addAuditLabel, delAuditLabel, getAuditLabelList } from '@/api/getData';

export default {
    name: 'auditThreeLevel',
    data() {
        return {
            query: {
                names: '',
                pid: 0,
                id: 0,
                page:1,
                size:10
            },
            list: [],
            currentPage3: 1,
            mediaForm: {
                pid: 0,
                names: ''
            },
            selection: [],
            dialogVisible: false,
            mediaBreadcrumbList: this.$store.state.mediaBreadcrumbList
        };
    },
    created() {
        this.$route.meta.title = '栏目标签';
        this.query.pid = Number(this.$route.query.id);
        this.mediaForm.pid = Number(this.$route.query.id);
        this.getData();
    },
    activated() {
        this.query.pid = Number(this.$route.query.id);
        this.mediaForm.pid = Number(this.$route.query.id);
        this.getData();
    },
    beforeRouteUpdate(to, from, next) {
        this.query.pid = Number(to.query.id);
        this.mediaForm.pid = Number(to.query.id);
        this.getData()
        next();
    },
    methods: {
        async save() {
            this.dialogVisible = false;
            if (this.mediaForm.names.length !== 0) {
                const data = await addAuditLabel(this.mediaForm);
                if (data.code === 200) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.getData();
                } else {
                    this.$message.error(data.msg);
                }
            } else {
                this.$message.error('请填写标签');
            }

        },
        selectAll(selection) {
            console.log(selection)
            this.selection = selection
        },
        select(selection, row) {
            this.selection = selection
            console.log(selection, row)
        },
        back() {
            this.$router.go(-1);
        },
        async getData() {
            const data = await getAuditLabelList(this.query)
            if (data.code === 200) {
                console.log(data)
                this.list = data.data
            } else {
                this.$message.error(data.msg);
            }
        },
        addMedia(id) {
            this.mediaForm.names = '';
            if (id) this.mediaForm.pid = id
            this.dialogVisible = true;
        },
        handleSizeChange() {
        },
        handleCurrentChange() {
        },
        openAuditThree(item) {
            const router = {
                path: {
                    path: '/auditThreeLevel',
                    query: {
                        id: item.id
                    }
                },
                type: 2,
                name: item.name
            };
            this.$store.commit('setMediaBreadcrumbList', router);
            this.$router.push({ path: '/auditThreeLevel', query: { id: item.id } });
        },
        del(type,id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let ids = []
                if (type === 1) {
                    ids.push(id)
                } else {
                    console.log(this.selection)
                    if (this.selection.length !== 0) {

                        ids = this.selection.map(q => q.id)
                    } else {
                        this.$message.error('请勾选数据！');
                    }
                }
                let data = await delAuditLabel({ ids: ids });
                if (data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getData()
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
.audit-three-level {
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

        .router-link {
            font-size: 16px;
            font-weight: 400;
            color: #999;
            line-height: 18px;
        }

        .router-link-active {
            color: #2F343D;
        }

        img {
            width: 16px;
            height: 16px;
            margin-right: 7px;
        }
    }

    .table-box {
        padding: 12px 20px 20px 20px;
        height: calc(100% - 42px);

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

        .selected-box {
            width: 130px;
            font-size: 12px;
            font-weight: 400;
            color: #2F343D;
            line-height: 16px;
            margin: 10px 0;

            .color {
                font-weight: 400;
                color: #2A79EE;
                line-height: 12px;
            }
        }
    }

    .pagination {
        height: 100px;
        margin: 0;
    }
}
</style>
<style lang='scss'>
.audit-three-level {
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
