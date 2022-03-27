<template>
<div class='audit-second-level box-sizing'>
    <div class='header flex items-center box-sizing'>
       <div class='flex items-center'>
           <img class='pointer' @click='back' src='../../assets/img/back@2x.png'>
           <router-link class='router-link' :to="{ path: '/mediaAudit'}">首页</router-link>
       </div>
        <div style='padding: 0 10px'>/</div>
        <div>
            <router-link class='router-link router-link-active' :to="{ path: '/auditSecondLevel'}">栏目标签</router-link>
        </div>
    </div>
    <div class='table-box box-sizing'>
        <el-row :gutter='20'>
            <el-col style='width: 340px'>
                <el-input style='width: 100%' v-model='query.names' placeholder='请输入名称'></el-input>
            </el-col>
            <el-col style='width: 200px'>
                <el-button class='select'>查询</el-button>
                <el-button class='add-but' @click='addMedia'>新建</el-button>
            </el-col>
        </el-row>
        <div style='height: calc(100% - 82px);margin-top: 30px'>
            <el-scrollbar style='height: 100%'>
                <div class='flex flex-wrap'>
                    <div class='list pointer' @click='openNext(item)' v-for='(item,i) in list' :key='i'>
                        <div class='box box-sizing'>
                            <div class='tag-content box-sizing'>
                                <div class='flex space-between items-center' style='margin-top: 12px'>
                                    <div class='emotion-tag'>{{item.name}}</div>
                                    <div class='emotion-right-tag flex space-between'>
                                        <span>批量添加</span>
                                        <span>查看数据</span>
                                    </div>
                                </div>
                                <div style='margin-top: 16px' class='data-size'>下级数据量：<span
                                    style='color: #2F343D'>{{ item.count }}</span></div>
                                <div class='flex space-between' style='margin-top: 26px'>
                                    <div class='create-time'>创建时间：<span
                                        style='color: #2F343D'>{{ item.cdate.substring(0,16) }}</span></div>
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
</div>
</template>

<script>
import { delAuditLabel, getAuditLabelList } from '@/api/getData';

export default {
    name: 'auditSecondLevel',
    data() {
        return {
            query: {
                names: '',
                pid: 0,
                id: 0,
                page:1,
                size:100
            },
            list: [],
            pid: ''
        }
    },
    created() {
        this.$route.meta.title = '栏目标签'
        this.query.pid = Number(this.$route.query.id);
        this.getData()
    },
    activated() {
        this.query.pid = Number(this.$route.query.id);
    },
    beforeRouteUpdate(to, from, next) {
        this.query.pid = Number(to.query.id);
        next();
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
        back() {
            this.$router.go(-1)
        },
        addMedia() {},
        openNext() {
            this.$router.push({ path: '/auditThreeLevel' });
        }
    }
};
</script>

<style scoped lang='scss'>
.audit-second-level {
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

        .list {
            width: 273px;
            color: #2F343D;
            margin-bottom: 30px;
            margin-right: 30px;

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
                padding: 16px;
                background: #FFFFFF;
                border-radius: 4px;
                border: 1px solid #EAEDF7;
                .tag-content {
                    width: 100%;
                    height: 100%;

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

        .list:hover {
            box-shadow: 0 10px 20px 0 rgba(42, 121, 238, 0.1);
            color: #2A79EE;
        }
    }
}
</style>
<style lang='scss'>
.audit-second-level {
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
