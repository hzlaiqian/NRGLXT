<template>
    <div class="user">
        <div class='user-top-header flex items-center'>
            <div class='flex items-center ml-15'>
                <img style='width: 22px;height: 21px' src='../../assets/img/mark.png'>
            </div>
            <h3 class='ml-5'>人员及权限管理</h3>
        </div>
        <div class="handle-box my-20 ">
            <el-input class='ml-20' style="width: 150px; margin-right: 10px" placeholder="请输入账户名" v-model="query.account"
                      size="small" clearable />
            <el-input style="width: 150px; margin-right: 10px" placeholder="请输入手机号" v-model="query.phone"
                      size="small" clearable />
            <el-select placeholder="请选择角色" v-model="query.role" size="small"
                       style="width: 150px; margin-right: 10px" clearable>
                <el-option v-for="item in roleList" :key="item.value" :label="item.label"
                           :value="item.value" />
            </el-select>
            <el-select placeholder="请选择状态" v-model="query.status" size="small"
                       style="width: 150px; margin-right: 10px" clearable>
                <el-option v-for="item in statusList" :key="item.value" :label="item.label"
                           :value="item.value" />
            </el-select>
            <el-date-picker v-model="query.dateRange" size="small" style="width: 240px" value-format="yyyy-MM-dd"
                            type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                            @change="timeChange" clearable>
            </el-date-picker>
            <el-button style="margin-left: 10px" type="primary" size="small" icon="el-icon-s-search"
                       @click="getData()">查询
            </el-button>
            <el-button style="margin-left: 10px;border: 1px solid #2A79EE;color: #2A79EE" plain  size="small" icon="el-icon-s-search"
                       @click="addUser">添加
            </el-button>
        </div>
       <div class='table-box box-sizing'>
           <el-table :data="tableData" style="width: 100%" stripe border>
               <el-table-column  label="账户名" min-width="96" align="center"></el-table-column>
               <el-table-column prop="source" label="手机号" min-width="133" align="center"></el-table-column>
               <el-table-column prop="source" label="角色"  min-width="237" align="left"></el-table-column>
               <el-table-column prop="checkStatus" label="状态" sortable min-width="115" align="center" :formatter="setStatus">
               </el-table-column>
               <el-table-column prop="inputTime" label="上次登录时间" sortable min-width="185" align="center"></el-table-column>
               <el-table-column prop="inputTime" label="创建时间" sortable min-width="185" align="center"></el-table-column>
               <el-table-column label="操作" min-width="200" align="center" fixed="right">
                   <template #default="scope">
                       <router-link :to="{ path: '/editNews', query: { checkID: scope.row.checkID }}">修改
                       </router-link>
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
        <el-dialog title="权限编辑" :visible.sync="outerVisible"  width='40%'>
            <el-form :inline="true" :model="userForm" class="demo-form-inline">
                <el-form-item label="账户名">
                    <el-input v-model="userForm.username" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="userForm.password" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="userForm.phone" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label=" 状态">
                    <el-select v-model="userForm.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=" 角色">
                    <el-select v-model="userForm.roleID" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限">
                    <el-input v-model="userForm.authority" placeholder="请选择权限" @click="innerVisible = true"></el-input>
                </el-form-item>
            </el-form>




            <el-dialog
                width="30%"
                title="内层 Dialog"
                :visible.sync="innerVisible"
                append-to-body>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="innerVisible = true">确定</el-button>
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
} from '../../api/getData.js'

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
            userForm: {
                username: '',
                password: '',
                phone: '',
                roleID: 1,
                authority: []
            },
            outerVisible: false,
            innerVisible: false
        }
    },
    created() {

    },
    methods: {
        timeChange(e) {
            console.log(e)
        },
        getData() {},
        addUser() {},
        setStatus() {}
    }
}
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
    }
    .pagination {
        height: 100px;
        margin: 0;
    }
}
</style>
