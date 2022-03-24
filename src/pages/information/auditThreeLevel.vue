<template>
    <div class='audit-three-level'>
        <div class='header flex items-center box-sizing'>
            <div class='flex items-center'>
                <img class='pointer' @click='back' src='../../assets/img/back@2x.png'>
                <router-link class='router-link' :to="{ path: '/mediaAudit'}">首页</router-link>
            </div>
            <div style='padding: 0 10px'>/</div>
            <div>
                <router-link class='router-link' :to="{ path: '/auditSecondLevel'}">栏目标签</router-link>
            </div>
            <div style='padding: 0 10px'>/</div>
            <div>
                <router-link class='router-link router-link-active' :to="{ path: '/auditThreeLevel'}">过滤标签</router-link>
            </div>
        </div>
        <div class='table-box box-sizing'>
            <el-row :gutter='20'>
                <el-col style='width: 340px'>
                    <el-input style='width: 100%' v-model='query.name' placeholder='请输入名称'></el-input>
                </el-col>
                <el-col style='width: 200px'>
                    <el-button class='select'>查询</el-button>
                    <el-button class='add-but' @click='addMedia'>新建</el-button>
                </el-col>
            </el-row>
            <div class='flex selected-box' style='margin-top: 12px'>
                <div style='margin-right: 12px'>已选<span style='margin: 0 4px' class='color'>3</span>项</div>
                <div class='color'>
                    <i class='el-icon-delete' style='margin-right: 6px'></i>
                    <span>删除</span>
                </div>
            </div>
            <div>
                <el-table
                    :data='mediaList'
                    border
                    style='width: 100%'>
                    <el-table-column
                        type="selection"
                        align='center'
                        min-width='96'>
                    </el-table-column>
                    <el-table-column
                        prop='mediaName'
                        label='名称'
                        align='left'
                        min-width='279'>
                    </el-table-column>
                    <el-table-column
                        prop='dataSize'
                        label='下级数据量'
                        align='center'
                        min-width='219'>
                    </el-table-column>
                    <el-table-column
                        prop='create_time'
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
                                <span class='pointer but' >批量添加</span>
                                <span class='pointer but' >查看数据</span>
                                <span class='pointer but' >删除</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
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
        </div>

    </div>
</template>

<script>
export default {
    name: 'auditThreeLevel',
    data() {
        return {
            query: {
                name: ''

            },
            mediaList: [{
                create_time: '2021-02-03 12:12:12',
                mediaName: '浦发银行保本收益',
                dataSize: '3232'
            },{
                create_time: '2021-02-03 12:12:12',
                mediaName: '浦发银行保本收益',
                dataSize: '3232'
            },{
                create_time: '2021-02-03 12:12:12',
                mediaName: '浦发银行保本收益',
                dataSize: '3232'
            },{
                create_time: '2021-02-03 12:12:12',
                mediaName: '浦发银行保本收益',
                dataSize: '3232'
            },{
                create_time: '2021-02-03 12:12:12',
                mediaName: '浦发银行保本收益',
                dataSize: '3232'
            },{
                create_time: '2021-02-03 12:12:12',
                mediaName: '浦发银行保本收益',
                dataSize: '3232'
            },{
                create_time: '2021-02-03 12:12:12',
                mediaName: '浦发银行保本收益',
                dataSize: '3232'
            },{
                create_time: '2021-02-03 12:12:12',
                mediaName: '浦发银行保本收益',
                dataSize: '3232'
            },{
                create_time: '2021-02-03 12:12:12',
                mediaName: '浦发银行保本收益',
                dataSize: '3232'
            },{
                create_time: '2021-02-03 12:12:12',
                mediaName: '浦发银行保本收益',
                dataSize: '3232'
            }],
            currentPage3:1
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        addMedia() {
        },
        handleSizeChange() {},
        handleCurrentChange() {}
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
