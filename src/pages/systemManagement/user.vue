<template>
    <div class='user'>
        <div class='user-top-header flex items-center'>
            <div class='flex items-center ml-15'>
                <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
            </div>
            <h3 class='ml-5'>人员及权限管理</h3>
        </div>
        <div class='handle-box my-20 '>
            <el-input class='ml-20' style='width: 150px; margin-right: 10px' placeholder='请输入账户名'
                      v-model='query.account'
                      size='small' clearable />
            <el-input style='width: 150px; margin-right: 10px' placeholder='请输入手机号' v-model='query.phone'
                      size='small' clearable />
            <el-select placeholder='请选择角色' v-model='query.role' size='small'
                       style='width: 150px; margin-right: 10px' clearable>
                <el-option v-for='item in roleList' :key='item.value' :label='item.label'
                           :value='item.value' />
            </el-select>
            <el-select placeholder='请选择状态' v-model='query.status' size='small'
                       style='width: 150px; margin-right: 10px' clearable>
                <el-option v-for='item in statusList' :key='item.value' :label='item.label'
                           :value='item.value' />
            </el-select>
            <el-date-picker v-model='query.dateRange' size='small' style='width: 240px' value-format='yyyy-MM-dd'
                            type='daterange' range-separator='-' start-placeholder='开始日期' end-placeholder='结束日期'
                            @change='timeChange' clearable>
            </el-date-picker>
            <el-button style='margin-left: 10px' type='primary' size='small' icon='el-icon-s-search'
                       @click='getData()'>查询
            </el-button>
            <el-button style='margin-left: 10px;border: 1px solid #2A79EE;color: #2A79EE' plain size='small'
                       icon='el-icon-s-search'
                       @click='addUser'>添加
            </el-button>
        </div>
        <div class='table-box box-sizing'>
            <el-table :data='tableData' style='width: 100%' stripe border>
                <el-table-column label='账户名' min-width='96' align='center'></el-table-column>
                <el-table-column prop='source' label='手机号' min-width='133' align='center'></el-table-column>
                <el-table-column prop='source' label='角色' min-width='237' align='left'></el-table-column>
                <el-table-column prop='checkStatus' label='状态' sortable min-width='115' align='center'
                                 :formatter='setStatus'>
                </el-table-column>
                <el-table-column prop='inputTime' label='上次登录时间' sortable min-width='185'
                                 align='center'></el-table-column>
                <el-table-column prop='inputTime' label='创建时间' sortable min-width='185'
                                 align='center'></el-table-column>
                <el-table-column label='操作' min-width='200' align='center' fixed='right'>
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


        <!--        添加Dialog-->
        <el-dialog title='权限编辑' :visible.sync='outerVisible' width='550px'>
            <el-form :rules="rules" :model='userForm' label-width='70px' class='demo-form-inline'>
                <div class='flex space-between'>
                    <el-form-item label='账户名' prop='username'>
                        <el-input style='width: 176px' v-model='userForm.username' placeholder='审批人'></el-input>
                    </el-form-item>
                    <el-form-item label='密码' prop='password'>
                        <el-input style='width: 176px' v-model='userForm.password' placeholder='审批人'></el-input>
                    </el-form-item>
                </div>
                <div class='flex space-between'>
                    <el-form-item label='手机号' prop='phone'>
                        <el-input style='width: 176px' v-model='userForm.phone' placeholder='审批人'></el-input>
                    </el-form-item>
                    <el-form-item label='状态' prop='region'>
                        <el-select style='width: 176px' v-model='userForm.region' placeholder='活动区域'>
                            <el-option label='区域一' value='shanghai'></el-option>
                            <el-option label='区域二' value='beijing'></el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <el-form-item label='角色'>
                    <el-select style='width: 176px' v-model='userForm.roleID' placeholder='活动区域'>
                        <el-option label='区域一' value='shanghai'></el-option>
                        <el-option label='区域二' value='beijing'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='权限'>
                    <el-cascader
                        style='width: 100%'
                        v-model='userForm.authority'
                        :options="options"
                        :props="props"
                        clearable></el-cascader>
                </el-form-item>
            </el-form>
            <div slot='footer' class='dialog-footer'>
                <el-button class='cancel' @click='outerVisible = false'>取 消</el-button>
                <el-button type='primary' @click='save'>确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    countArticle,
    getWaitList,
    getChildList,
    getConceptList
} from '../../api/getData.js';

export default {
    data() {
        return {
            query: {
                account: '',
                phone: '',
                role: '',
                status: '',
                dateRange: '',
                size: 10,
                page: 1
            },
            roleList: [],
            statusList: '',
            tableData: [],
            rules: {
                username: [
                    { required: true, message: '请输入账户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择状态', trigger: 'blur' }
                ]
            },
            userForm: {
                username: '',
                password: '',
                phone: '',
                roleID: 1,
                authority: [],
                region: ''
            },
            outerVisible: false,
            innerVisible: false,

            props: { multiple: true },
            options: [{
                value: 1,
                label: '东南',
                children: [{
                    value: 2,
                    label: '上海',
                    children: [
                        { value: 3, label: '普陀' },
                        { value: 4, label: '黄埔' },
                        { value: 5, label: '徐汇' }
                    ]
                }, {
                    value: 7,
                    label: '江苏',
                    children: [
                        { value: 8, label: '南京' },
                        { value: 9, label: '苏州' },
                        { value: 10, label: '无锡' }
                    ]
                }, {
                    value: 12,
                    label: '浙江',
                    children: [
                        { value: 13, label: '杭州' },
                        { value: 14, label: '宁波' },
                        { value: 15, label: '嘉兴' }
                    ]
                }]
            }, {
                value: 17,
                label: '西北',
                children: [{
                    value: 18,
                    label: '陕西',
                    children: [
                        { value: 19, label: '西安' },
                        { value: 20, label: '延安' }
                    ]
                }, {
                    value: 21,
                    label: '新疆维吾尔族自治区',
                    children: [
                        { value: 22, label: '乌鲁木齐' },
                        { value: 23, label: '克拉玛依' }
                    ]
                }]
            }]
        };
    },
    created() {

    },
    methods: {
        timeChange(e) {
            console.log(e);
        },
        getData() {
        },
        addUser() {
            this.outerVisible = true;
        },
        setStatus() {
        },
        switchChange() {},
        handleUpdate() {},
        del() {},
        save() {

        }
    }
};
</script>

<style scoped lang='scss'>
.user {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 4px;

    .user-top-header {
        height: 50px;
        border-bottom: 1px solid #EAEDF7;
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
