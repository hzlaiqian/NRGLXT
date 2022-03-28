<template>
    <div class='media-audit box-sizing'>
        <div class='header flex items-center box-sizing'>
            <img src='../../assets/img/mark.png'>
            <span class='title'>审核维度配置</span>
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
            <div style='height: calc(100% - 82px);margin-top: 30px'>
                <el-scrollbar style='height: 100%'>
                    <div class='flex flex-wrap'>
                        <div class='list pointer' @click='openNext(item)' v-for='(item,i) in list' :key='i'>
                            <div class='shape'></div>
                            <div class='box box-sizing'>
                                <div class='tag-content box-sizing'>
                                    <div class='flex space-between items-center' style='margin-top: 12px'>
                                        <div  v-if='item.count !== 0' class='emotion-tag'>{{ item.name }}</div>
                                        <div  v-else class='emotion-tag' style='color: #919AAD'>{{ item.name }}</div>
                                        <div class='emotion-right-tag flex space-between'>
                                            <span class='pointer' @click.stop='addMedia(item.id)'>批量添加</span>
                                            <span class='pointer' @click.stop='openNext(item)'
                                                  v-if='item.count !== 0'>查看数据</span>
                                            <span v-else class='pointer' style='color: #919AAD'>查看数据</span>
                                        </div>
                                    </div>
                                    <div style='margin-top: 16px' class='data-size'>下级数据量：<span
                                        style='color: #2F343D'>{{ item.count }}</span></div>
                                    <div class='flex space-between' style='margin-top: 26px'>
                                        <div class='create-time'>创建时间：<span
                                            style='color: #2F343D'>{{ item.cdate.substring(0, 16) }}</span></div>
                                        <div class='del-tag' @click.stop='del(item.id)'>
                                            <i class='el-icon-delete' style='margin-right: 6px'></i>
                                            <span>删除</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
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
    name: 'mediaAudit',
    data() {
        return {
            query: {
                names: '',
                pid: 0,
                id: 0,
                page: 1,
                size: 100
            },
            list: [],
            mediaForm: {
                names: '',
                pid: 0
            },
            dialogVisible: false
        };
    },
    created() {
        this.getData();
    },
    activated() {
        this.getData();
    },
    methods: {
        del(id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let data = await delAuditLabel({ ids: [id] });
                if (data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getData();
                } else {
                    this.$message.error(data.msg);
                }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addMedia(id) {
            this.mediaForm.names = '';
            id ? this.mediaForm.pid = id : this.mediaForm.pid = 0;
            this.dialogVisible = true;
        },
        openNext(item) {
            if (item.count !== 0) {
                const router = [{
                    path: {
                        path: '/auditSecondLevel',
                        query: {
                            id: item.id,
                            name: item.name
                        }
                    },
                    type: 1,
                    name: item.name
                }];
                this.$store.commit('setMediaBreadcrumbList', router);
                this.$router.push({ path: '/auditSecondLevel', query: { id: item.id, name: item.name } });
            }

        },
        openAuditThree(item) {
            const router = [{
                path: {
                    path: '/auditThreeLevel',
                    query: {
                        id: item.id,
                        name: item.name
                    }
                },
                type: 2,
                name: item.name
            }];
            this.$store.commit('setMediaBreadcrumbList', router);
            this.$router.push({ path: '/auditThreeLevel', query: { id: item.id, name: item.name } });
        },
        async getData() {
            const data = await getAuditLabelList(this.query);
            if (data.code === 200) {
                console.log(data);
                this.list = data.data;
            } else {
                this.$message.error(data.msg);
            }
        },
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

        }
    }
};
</script>

<style scoped lang='scss'>
.media-audit {
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
        height: calc(100% - 42px);

        .list {
            width: 273px;
            color: #2F343D;
            margin-bottom: 30px;
            margin-right: 30px;
            border-radius: 0 8px 8px 8px;

            .shape {
                width: 126px;
                height: 21px;
                background-image: linear-gradient(-135deg, transparent 21px, #C0DCFF 21px);
                border-radius: 8px 8px 0 0;
                background-repeat: no-repeat;
                background-size: 100% 21px;
            }

            .box {
                width: 273px;
                height: 146px;
                background-color: #DCEBFF;
                border-radius: 0 8px 8px 8px;
                padding: 10px;
                overflow: hidden;

                .tag-content {
                    width: 100%;
                    height: 100%;
                    background: #FFFFFF;
                    box-shadow: 0 10px 20px 0 rgba(42, 121, 238, 0.1);
                    border-radius: 0 8px 8px 8px;
                    border: 1px solid rgba(42, 121, 238, 0.2);
                    padding: 0 12px;

                    .emotion-tag {
                        font-size: 16px;
                        font-weight: 500;

                        line-height: 22px;
                        text-shadow: 0 10px 20px rgba(42, 121, 238, 0.1);
                    }

                    .emotion-right-tag {
                        width: 108px;
                        font-size: 12px;
                        font-weight: 400;
                        color: #2A79EE;
                        line-height: 18px;
                        text-shadow: 0 10px 20px rgba(42, 121, 238, 0.1);
                    }

                    .data-size {
                        font-size: 14px;
                        font-weight: 400;
                        color: #919AAD;
                        line-height: 20px;
                        text-shadow: 0 10px 20px rgba(42, 121, 238, 0.1);
                    }

                    .create-time {
                        font-size: 12px;
                        font-weight: 400;
                        color: #919AAD;
                        line-height: 18px;
                        text-shadow: 0 10px 20px rgba(42, 121, 238, 0.1);
                    }

                    .del-tag {
                        font-size: 12px;
                        font-weight: 400;
                        color: #2A79EE;
                        line-height: 18px;
                        text-shadow: 0 10px 20px rgba(42, 121, 238, 0.1);
                    }
                }
            }
        }

        .box:hover {
            box-shadow: 0 10px 20px 0 rgba(42, 121, 238, 0.1);
            color: #2A79EE;
        }

        .list:nth-child(5n - 4) .box {
            background-color: #DCEBFF;
        }

        .list:nth-child(5n - 3) .box {
            background: rgba(255, 176, 58, 0.15);
        }

        .list:nth-child(5n - 2) .box {
            background: rgba(247, 78, 78, 0.15);
        }

        .list:nth-child(5n - 1) .box {
            background: rgba(103, 194, 58, 0.15);
        }

        .list:nth-child(5n) .box {
            background: rgba(138, 97, 236, 0.15);
        }

        .list:nth-child(5n - 4 ) .box .tag-content {
            border: 1px solid rgba(42, 121, 238, 0.2);
        }

        .list:nth-child(5n - 3) .box .tag-content {
            border: 1px solid rgba(255, 176, 58, 0.15);
        }

        .list:nth-child(5n - 2) .box .tag-content {
            border: 1px solid rgba(247, 78, 78, 0.15);
        }

        .list:nth-child(5n - 1) .box .tag-content {
            border: 1px solid rgba(103, 194, 58, 0.15);
        }

        .list:nth-child(5n) .box .tag-content {
            border: 1px solid rgba(138, 97, 236, 0.15);
        }
        .list:nth-child(5n - 4) .shape{
        background-image: linear-gradient(-135deg, transparent 21px, #C0DCFF 21px);
    }
        .list:nth-child(5n - 3) .shape {
            background-image: linear-gradient(-135deg, transparent 21px, rgba(255, 176, 58, 0.3) 21px);
        }

        .list:nth-child(5n - 2) .shape {
            background-image: linear-gradient(-135deg, transparent 21px, rgba(247, 78, 78, 0.3) 21px);
        }

        .list:nth-child(5n - 1) .shape {
            background-image: linear-gradient(-135deg, transparent 21px, rgba(103, 194, 58, 0.3) 21px);
        }

        .list:nth-child(5n) .shape {
            background-image: linear-gradient(-135deg, transparent 21px, rgba(138, 97, 236, 0.3) 21px);
        }

    }
}
</style>
<style lang='scss'>
.media-audit {
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
        border-bottom: 1px solid #EAEDF7;
    }

    .el-dialog__body {
        padding: 20px;
    }

    .el-checkbox__label {
        color: #2F343D;
    }

    .el-dialog__footer {
        border-top: 1px solid #EAEDF7;
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
