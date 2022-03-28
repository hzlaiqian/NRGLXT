<template>
<div class='audit-second-level box-sizing'>
    <div class='header flex items-center box-sizing'>
        <img class='pointer' @click='back' src='../../assets/img/back@2x.png'>
        <el-breadcrumb separator='/'>
            <el-breadcrumb-item style='color: #919AAD' class='flex items-center' :to="{ path: '/mediaAudit' }">首页
            </el-breadcrumb-item>

            <el-breadcrumb-item  @click='click' :to='item.path' v-for='(item,i) in mediaBreadcrumbList' :key='i'>
                <span :class='item.name === activeName ? "activeColor" : ""'>{{ item.name }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
<!--       <div class='flex items-center'>-->
<!--           <img class='pointer' @click='back' src='../../assets/img/back@2x.png'>-->
<!--           <router-link class='router-link' :to="{ path: '/mediaAudit'}">首页</router-link>-->
<!--       </div>-->
<!--        <div style='padding: 0 10px'>/</div>-->
<!--        <div>-->
<!--            <router-link class='router-link router-link-active' :to="{ path: '/auditSecondLevel'}">栏目标签</router-link>-->
<!--        </div>-->
    </div>
    <div class='table-box box-sizing'>
        <el-row :gutter='20'>
            <el-col style='width: 340px'>
                <el-input style='width: 100%' v-model='query.names' placeholder='请输入名称'></el-input>
            </el-col>
            <el-col style='width: 200px'>
                <el-button class='select'>查询</el-button>
                <el-button class='add-but' @click='addMedia(null)'>新建</el-button>
            </el-col>
        </el-row>
        <div style='height: calc(100% - 82px);margin-top: 30px'>
            <el-scrollbar style='height: 100%'>
                <div class='flex flex-wrap'>
                    <div class='list pointer' @click='openNext(item)' v-for='(item,i) in list' :key='i'>
                        <div class='box box-sizing'>
                            <div class='tag-content box-sizing'>
                                <div class='flex space-between items-center' style='margin-top: 12px'>
                                    <div  v-if='item.count !== 0' class='emotion-tag'>{{ item.name }}</div>
                                    <div  v-else class='emotion-tag' style='color: #919AAD'>{{ item.name }}</div>
                                    <div class='emotion-right-tag flex space-between'>
                                        <span @click.stop='addMedia(item.id)'>批量添加</span>
                                        <span class='pointer' @click.stop='openAuditThree(item)'
                                              v-if='item.count !== 0'>查看数据</span>
                                        <span v-else class='pointer' style='color: #919AAD'>查看数据</span>
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
            mediaForm: {
                names: '',
                pid: 0
            },
            dialogVisible: false,
            mediaBreadcrumbList: this.$store.state.mediaBreadcrumbList,
            activeName: ''
        }
    },
    watch: {
        activeName(newVal,oldVale) {


        }
    },
    created() {
        this.getRouterQuery()
        this.getData();
    },
    activated() {
        this.getRouterQuery()
        this.getData();
    },
    beforeRouteUpdate(to, from, next) {
        console.log(to)
        this.query.pid = Number(to.query.id);
        this.mediaForm.pid = Number(to.query.id);
        this.activeName = to.query.name
        let index = this.mediaBreadcrumbList.findIndex(q => q.name === to.query.name)
        if (index !== -1) {
            console.log(index)
            this.mediaBreadcrumbList =  this.mediaBreadcrumbList.slice(0,index + 1 )
            this.$store.commit('setMediaBreadcrumbList', this.mediaBreadcrumbList);
        }
        this.mediaBreadcrumbList = this.$store.state.mediaBreadcrumbList
        this.getData()
        next();
    },

    methods: {
        click(item) {

        },
        getRouterQuery() {
            this.query.pid = Number(this.$route.query.id);
            this.activeName = this.$route.query.name
            this.mediaForm.pid = Number(this.$route.query.id);
            let index = this.mediaBreadcrumbList.findIndex(q => q.name === this.$route.query.name)
            if (index !== -1) {
                this.mediaBreadcrumbList =  this.mediaBreadcrumbList.slice(0,index + 1 )
                this.$store.commit('setMediaBreadcrumbList', this.mediaBreadcrumbList);
            }
            this.mediaBreadcrumbList = this.$store.state.mediaBreadcrumbList
        },
        async save() {
            this.dialogVisible = false
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
        openAuditThree(item) {
            const router = {
                path: {
                    path: '/auditThreeLevel',
                    query: {
                        id: item.id,
                        name: item.name
                    }
                },
                type: 2,
                name: item.name
            };
            this.deWeight(this.mediaBreadcrumbList)
            this.mediaBreadcrumbList.push(router)
            this.$store.commit('setMediaBreadcrumbList', this.mediaBreadcrumbList);
            this.$router.push({ path: '/auditThreeLevel', query: { id: item.id,name: item.name } });
        },
        deWeight (a) {
            let re=[],b ={}
            for (let i in a) {
                if (!b[a[i]]) {
                    re.push(a[i])
                    b[a[i]] = 1
                }
            }
            return re
        },
       async getData() {
            const data = await getAuditLabelList(this.query)
            if (data.code === 200) {
                this.list = data.data
            } else {
                this.$message.error(data.msg);
            }
        },
        back() {
            this.$router.go(-1);
            this.mediaBreadcrumbList.pop()
            this.$store.commit('setMediaBreadcrumbList', this.mediaBreadcrumbList);
        },
        addMedia(id) {
            this.mediaForm.names = '';
            if (id) this.mediaForm.pid = id
            this.dialogVisible = true;
        },
        openNext(item) {
            if (item.count !== 0) {
                const router = {
                    path: {
                        path: '/auditSecondLevel',
                        query: {
                            id: item.id,
                            name: item.name
                        }
                    },
                    type: 1,
                    name: item.name
                };
                this.deWeight(this.mediaBreadcrumbList)
                this.mediaBreadcrumbList.push(router)
                this.$store.commit('setMediaBreadcrumbList', this.mediaBreadcrumbList);
                this.$router.push({ path: '/auditSecondLevel', query: { id: item.id,name: item.name } });
            }
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


        .list:nth-child(5n - 4) .box {
            background: rgba(42, 121, 238, 0.03);
            border: 1px solid rgba(42, 121, 238, 0.2);
        }
        .list:nth-child(5n - 3) .box {
            background: rgba(255, 176, 58, 0.03);
            border: 1px solid rgba(255, 176, 58, 0.2);
        }
        .list:nth-child(5n - 2) .box {
            background: rgba(247, 78, 78, 0.03);
            border: 1px solid rgba(247, 78, 78, 0.2);
        }
        .list:nth-child(5n - 1) .box {
            background: rgba(103, 194, 58, 0.03);
            border: 1px solid rgba(103, 194, 58, 0.2);
        }
        .list:nth-child(5n) .box {
            background: rgba(138, 97, 236, 0.03);
            border: 1px solid rgba(123, 105, 255, 0.2);
        }
        .list .box:hover{
            //box-shadow: 0 10px 20px 0 rgba(42, 121, 238, 0.1);
            //color: #2A79EE;
            border-radius: 4px;
            transition-duration: 0.5s;
            border: 1px solid #2A79EE;
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
.activeColor {
    color: #2F343D !important;
    font-weight: 700;
}
</style>
<style>
.audit-second-level .el-breadcrumb__inner {
    color: #919AAD;
}
.audit-second-level .el-breadcrumb__item:last-child  .el-breadcrumb__inner{
    color: #919AAD !important;
    font-weight: 700;
}
</style>
