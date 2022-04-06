<template>
    <div class='role'>
        <div class='role-top-header flex items-center'>
            <div class='flex items-center ml-15'>
                <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
            </div>
            <h3 class='ml-5'>权限管理</h3>
        </div>
        <div class='flex search'>
            <el-input style='width: 200px' class='ml-20 mr-20' placeholder='请输入账户名'></el-input>
            <el-button @click='addRole' type='primary' icon='el-icon-plus'>新增角色</el-button>
        </div>
        <div class='table-box box-sizing mt-20'>
            <el-table :data='tableData' border>
                <el-table-column min-width='96px' prop='roleName' align='center' label='角色名称'></el-table-column>
                <el-table-column min-width='115px' prop='roleName' align='center' sortable label='状态'>
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
                <el-table-column min-width='185px' prop='roleName' align='center' sortable label='创建时间'></el-table-column>
                <el-table-column min-width='127px' prop='roleName' align='center' label='创建人'></el-table-column>
                <el-table-column min-width='429px' prop='roleName' label='说明'></el-table-column>
                <el-table-column prop='roleName' label='操作'>
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
        <div class='pagination flex row-center items-center'>
            <el-pagination
                @size-change='getData'
                :page-size='query.size'
                :current-page='query.page'
                layout='total,prev, pager, next, jumper'
                :total='1'>
            </el-pagination>
        </div>
        <el-dialog width='700px' title='角色编辑' :visible.sync='dialogFormVisible'>
            <el-form :rules="rules" label-position='right' label-width='70px' :model='form'>
                <div class='flex space-between'>
                    <el-form-item label='角色名' prop='name'>
                        <el-input style='width: 176px' placeholder='请输入角色名'></el-input>
                    </el-form-item>
                    <el-form-item label='说明'>
                        <el-input style='width: 187px' placeholder='请输入说明'></el-input>
                    </el-form-item>
                </div>

                <el-form-item label='权限'>
                    <el-select style='width: 100%' v-model="form.select" placeholder="请选择">
                        <el-option v-for='item in roleList' :label='item.label' :value='item.value' :key='item.value'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='人员管理'>
                    <el-transfer v-model="form.value" :data="data"></el-transfer>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button class='cancel' @click='dialogFormVisible = false'>取 消</el-button>
                <el-button type='primary' @click='isUpdate ? updata() :save()'>确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'role',
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${ i }`
                });
            }
            return data;
        };
        return {
            tableData: [],
            query: {
                size: 100,
                page: 1
            },
            isUpdate: false,
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            },
            roleList: [],
            dialogFormVisible: false,
            form: {
                select:1,
                value: [1, 4]
            },
            data: generateData(),

        };
    },
    methods: {
        del() {},
        handleUpdate() {},
        updata(){},
        switchChange() {},
        save() {},
        getData() {
        },
        addRole() {
            this.dialogFormVisible = true;
        }
    }
};
</script>

<style scoped lang='scss'>
.role {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 4px;

    .role-top-header {
        height: 50px;
        border-bottom: 1px solid #EAEDF7;
    }

    .search {
        margin-top: 12px;
    }

    .table-box {
        padding: 0 20px;
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

    .pagination {
        height: 100px;
        margin: 0;
    }
}
</style>
<style>
.role .el-dialog__body {
    padding: 20px;
}
.role .el-dialog__footer .cancel {
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid #2A79EE;
    color: #2A79EE;
}
</style>
