<template>
  <div class="moreSceneOperationHome">
    <div class="sceneInfo" ref="sceneInfo">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="要闻位" name="first">

          <div class="listWrap" :style="{height:heights}">
            <div class="list" v-for="(item,index) in importantNews" :key="index" @click="editImportantNews(item)">
              <div class="topContent">
                <div class="TL">
                  <div class="title">{{ item.title }}</div>
                  <div class="info">{{ item.summary }}</div>
                </div>
                <div class="TR">
                  <div class="img">
                    <img :src="item.picUrl" alt="">
                  </div>
                </div>
              </div>
              <div class="bottomTags">
                <div class="BL">
                  <div class="tag" v-for="(tag,tindex) in item.tags" :key="tindex">{{ tag }}</div>
                </div>
                <div class="BR">
                  <div class="time">{{ item.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="焦点位" name="second">
          <div class="imgWrap">
            <div class="imgList" v-for="(item,index) in focusPhotos.slice(0,3)"
                 :style="{backgroundImage:'url('+ item.url +')'}" :key="index" @click="editFocusImage(item)">
              <div class="imgLineGradient">
                <div class="imgTextWrap">
                  <div class="imgTitle">{{ item.title }}</div>
                  <div class="imgTagWrap">
                    <div class="imgTag" v-if="position"><span>{{ item.tagName }}</span></div>
                    <div class="imgTime">{{ $moment(item.createTime).format('YYYY-MM-DD hh:mm') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="addOperation" @click="addOperation"><i class="el-icon-plus"></i>新增运营</div>
    </div>
    <div class="sceneTable">
      <cardTemplate :style="{height: tableHeight}" :titleName="table1">
        <el-table
            :data="tableDataShow"
            border
            style="width: 100%">
          <el-table-column
              prop="f_title"
              label="标题"
              width="280">
          </el-table-column>
          <el-table-column
              prop="f_source"
              label="来源/运营位">
          </el-table-column>
          <el-table-column
              prop="time"
              label="时间">
          </el-table-column>
          <el-table-column
              prop="operation"
              label="操作">
            <template slot-scope="scope">
              <el-button @click="tableShowSelect(scope.row)" type="text" size="small">采用</el-button>
              <el-button type="text" size="small" slot="reference" @click="delThis(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
              @size-change="handleSizeChangeShow"
              @current-change="handleCurrentChangeShow"
              :current-page="currentPageShow"
              :page-size="5"
              layout="total, prev, pager, next, jumper"
              :total="tableDataShowLen">
          </el-pagination>
        </div>
      </cardTemplate>
      <div style="height: 10px;background: #f0f0f0;"></div>
      <div class="tableCard" :style="{height: tableHeight}">
        <el-row class="filterWrap" :gutter="10">
          <el-col :span="4">
            <el-input v-model="title" placeholder="请输入标题"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="source" placeholder="请输入来源"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="tag" placeholder="请输入推荐标签"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="itemTag" placeholder="请输入栏目标签"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="bottomTableSearch">查询</el-button>
          </el-col>
        </el-row>
        <el-table
            :data="tableDataSelect"
            border
            style="width: 100%">
          <el-table-column
              prop="title"
              label="标题"
              width="280">
          </el-table-column>
          <el-table-column
              prop="source"
              label="来源/运营位">
          </el-table-column>
          <el-table-column
              prop="time"
              label="时间">
          </el-table-column>
          <el-table-column
              prop="operation"
              label="操作">
            <template slot-scope="scope">
              <el-button @click="tableShowSelect(scope.row)" type="text" size="small">采用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
              @size-change="handleSizeChangeSelect"
              @current-change="handleCurrentChangeSelect"
              :current-page="currentPageSelect"
              :page-size="5"
              layout="total, prev, pager, next, jumper"
              :total="this.tableDataSelect.length">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--  创建弹窗start  -->
    <div class="dialogWrap">
      <el-dialog
          title="新增运营"
          :visible.sync="createOperationShow"
          width="30%">
        <div class="newsUrl">
          <el-form :model="operateInfo" label-position="left" label-width="auto" :rules="operationRules" ref="ruleForm"
                   class="demo-ruleForm">
            <el-form-item label="新闻url" prop="newUrl">
              <div class="extractWrap">
                <!--                maxlength="20" show-word-limit  _________________________________________-->
                <el-input placeholder="请输入新闻url" v-model="operateInfo.url"></el-input>
                <div class="extractUrl" @click="queryArticle(1)">提取生成</div>
              </div>
            </el-form-item>
            <div class="importantNewsWrap">
              <div class="importantNewsTop">
                <el-checkbox v-model="operateInfo.type">要闻位</el-checkbox>
              </div>
              <div class="importantNewsBottom">
                <el-form-item label="标题">
                  <div class="extractWrap">
                    <el-input placeholder="请输入标题" v-model="operateInfo.title" maxlength="20" show-word-limit></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="摘要">
                  <div class="extractWrap">
                    <el-input type="textarea" placeholder="请输入摘要" :rows="4" v-model="operateInfo.summary" maxlength="50"
                              show-word-limit></el-input>
                  </div>
                </el-form-item>
                <div class="recommendWrap">
                  <el-checkbox style="margin-right: 10px" v-model="operateInfo.isTop">推荐置顶</el-checkbox>
                  <el-input placeholder="请输入自定义文案" :disabled="!operateInfo.isTop" v-model="operateInfo.clerk"
                            maxlength="20" show-word-limit></el-input>
                  <el-checkbox style="margin-left: 10px" v-model="operateInfo.isHeadline">推荐头条</el-checkbox>
                </div>
              </div>
              <!--      上传组件        -->
              <el-form-item>
                <el-upload
                    class="uploadReset"
                    list-type="picture-card"
                    :before-upload="uploadfiles"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)"><i
                          class="el-icon-zoom-in"></i></span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)"><i
                          class="el-icon-download"></i></span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)"><i
                          class="el-icon-delete"></i></span>
                    </span>
                  </div>
                </el-upload>
              </el-form-item>
              <!--      上传组件        -->
            </div>
            <div class="importantNewsWrap">
              <div class="importantNewsTop">
                <el-checkbox v-model="operateInfo2.type">焦点位</el-checkbox>
              </div>
              <div class="importantNewsBottom">
                <el-form-item label="标题">
                  <div class="extractWrap">
                    <el-input placeholder="请输入标题" v-model="operateInfo2.title" maxlength="20"
                              show-word-limit></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="位置">
                  <div class="extractWrap">
                    <el-select v-model="operateInfo2.position" placeholder="请选择" style="width: 100%;">
                      <el-option v-for="(item,index) in operationFrom.focusImg.position" :key="index"
                                 :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <!--      上传组件        -->
                <el-form-item>
                  <el-upload
                      action="http://47.96.18.55:8080/nrglxt/media/uploadfile"
                      ref="upload"
                      list-type="picture-card"
                      :data="data"
                      :headers="headers"
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)"><i
                            class="el-icon-zoom-in"></i></span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)"><i
                            class="el-icon-download"></i></span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)"><i
                            class="el-icon-delete"></i></span>
                      </span>
                    </div>
                  </el-upload>
                </el-form-item>
                <!--      上传组件        -->
              </div>
            </div>
          </el-form>
        </div>
        <el-button @click="createOperationShow = false">取 消</el-button>
        <el-button type="primary" @click="addOperateInfo">确 定</el-button>
      </el-dialog>
    </div>
    <!--  创建弹窗end  -->
    <!--  要闻位编辑弹窗start  -->
    <div class="dialogWrap">
      <el-dialog
          title="编辑要闻图"
          :visible.sync="editImportantNewShow"
          width="30%">
        <div class="newsUrl">
          <el-form :model="operateInfo" label-position="left" label-width="auto" :rules="operationRules"
                   ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="新闻url" prop="newUrl">
              <div class="extractWrap">
                <el-input placeholder="请输入新闻url" v-model="operateInfo.url" maxlength="20"
                          show-word-limit></el-input>
                <div class="extractUrl" @click="queryArticle(2)">提取生成</div>
              </div>
            </el-form-item>
            <div class="importantNewsWrap">
              <div class="importantNewsTop">
                <el-checkbox v-model="operateInfo.type">要闻位</el-checkbox>
              </div>
              <div class="importantNewsBottom">
                <el-form-item label="标题">
                  <div class="extractWrap">
                    <el-input placeholder="请输入标题" v-model="operateInfo.title" maxlength="20"
                              show-word-limit></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="摘要">
                  <div class="extractWrap">
                    <el-input type="textarea" placeholder="请输入摘要" :rows="4"
                              v-model="operateInfo.summary" maxlength="50"
                              show-word-limit></el-input>
                  </div>
                </el-form-item>
                <div class="recommendWrap">
                  <el-checkbox style="margin-right: 10px" v-model="operateInfo.isTop">推荐置顶
                  </el-checkbox>
                  <el-input placeholder="请输入自定义文案" :disabled="!operateInfo.isTop"
                            v-model="operateInfo.clerk" maxlength="20"
                            show-word-limit></el-input>
                  <el-checkbox style="margin-left: 10px" v-model="operateInfo.isHeadline">
                    推荐头条
                  </el-checkbox>
                </div>
              </div>
              <!--      上传组件        -->
              <el-form-item>
                <el-upload
                    action="#"
                    ref="upload"
                    class="uploadReset"
                    list-type="picture-card"
                    :auto-upload="false">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)"><i
                          class="el-icon-zoom-in"></i></span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)"><i
                          class="el-icon-download"></i></span>
                      <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)"><i
                          class="el-icon-delete"></i></span>
                    </span>
                  </div>
                </el-upload>
              </el-form-item>
              <!--      上传组件        -->
            </div>
          </el-form>
        </div>
        <el-button @click="editImportantNewShow = false">取 消</el-button>
        <el-button type="primary" @click="changeFocusNews(1)">确 定</el-button>
      </el-dialog>
    </div>
    <!--  要闻位编辑弹窗end  -->
    <!--  焦点图编辑弹窗start  -->
    <div class="dialogWrap">
      <el-dialog
          title="编辑焦点图"
          :visible.sync="editFocusImageShow"
          width="30%">
        <div class="newsUrl">
          <el-form :model="operateInfo2" label-position="left" label-width="auto" :rules="operationRules"
                   ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="新闻url" prop="newUrl">
              <div class="extractWrap">
                <el-input placeholder="请输入新闻url" v-model="operateInfo2.url" maxlength="20"
                          show-word-limit></el-input>
                <div class="extractUrl" @click="queryArticle(3)">提取生成</div>
              </div>
            </el-form-item>
            <div class="importantNewsWrap">
              <div class="importantNewsTop">
                <el-checkbox v-model="operateInfo2.type">焦点位</el-checkbox>
              </div>
              <div class="importantNewsBottom">
                <el-form-item label="标题">
                  <div class="extractWrap">
                    <el-input placeholder="请输入标题" v-model="operateInfo2.title" maxlength="20"
                              show-word-limit></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="位置">
                  <div class="extractWrap">
                    <el-select v-model="operateInfo2.position" placeholder="请选择" style="width: 100%;">
                      <el-option v-for="(item,index) in operationFrom.focusImg.position" :key="index"
                                 :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <!--      上传组件        -->
                <el-form-item>
                  <el-upload
                      action="#"
                      ref="upload"
                      list-type="picture-card"
                      :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)"><i
                            class="el-icon-zoom-in"></i></span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)"><i
                            class="el-icon-download"></i></span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)"><i
                            class="el-icon-delete"></i></span>
                      </span>
                    </div>
                  </el-upload>
                </el-form-item>
                <!--      上传组件        -->
              </div>
            </div>
          </el-form>
        </div>
        <el-button @click="editFocusImageShow = false">取 消</el-button>
        <el-button type="primary" @click="changeFocusNews(2)">确 定</el-button>
      </el-dialog>
    </div>
    <!--  焦点图编辑弹窗end  -->
    <el-dialog :visible.sync="previewShow">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>


<script>
import cardTemplate from "../../components/cardTemplate";
import axios from 'axios';
import {
  queryArticle,
  uploadfile,
  addOperateInfo,
  queryRecom,
  deleteByIDPush,
  delOperate,
  queryFocusNews, changeFocusNews
} from "../../api/getData"

export default {
  name: "moreSceneOperationHome",
  components: {
    cardTemplate
  },
  mounted() {
    this.heights = this.$refs.sceneInfo.clientHeight - 80 + 'px'
    this.tableHeight = '50%'
  },
  data() {
    return {
      dialogImageUrl: '',
      previewShow: false,
      disabled: false,
      createOperationShow: false,
      editImportantNewShow: false,
      editFocusImageShow: false,
      heights: '',
      tableHeight: '',
      activeName: 'first',
      importantNews: [

      ],
      focusPhotos: [

      ],
      table1: '热点/财经门户推荐',
      title: '',
      source: '',
      tag: '',
      itemTag: '',
      tableDataShow: [],
      tableDataShowLen: 0,
      tableDataSelect: [

      ],
      currentPageShow: 1,
      currentPageSelect: 1,
      operateInfo: {
        "clerk": "",
        "isHeadline": 0,
        "isDelete": 0,
        "isTop": 0,
        "picUrl": "",
        "summary": "",
        "title": "",
        "type": false,
        "url": ""
      },
      operateInfo2: {
        "picUrl": "",
        "position": '0',
        "isDelete": 0,
        "title": "",
        "type": false,
        "url": ""
      },
      operationFrom: {
        newUrl: '',
        //要闻位
        importantNewsInfo: {
          isCheck: false,
          title: '',
          subject: '',
          recommendTop: false,
          recommendText: '',
          recommendTopEst: false
        },
        //焦点位
        focusImg: {
          isCheck: false,
          title: '',
          position: [
            {
              value: 1,
              label: '焦点图1'
            },
            {
              value: 2,
              label: '焦点图2'
            },
            {
              value: 3,
              label: '焦点图3'
            },
          ],
          imgUrl: '',
          positionSelect: ''
        }
      },
      operationRules: {
        url: [
          {required: true, message: '请输入新闻url', trigger: 'blur'},
        ],
        maxlen: [{min: 1, max: 20, message: '长度在 0 到 20 个字', trigger: 'blur'}]
        //


      },
      data: {
        filename: 1,
        uploadType: 1
      },
      headers: {
        'Content-type': 'multipart/form-data'
      }

    }
  },
  methods: {
    //新增运营
    addOperateInfo() {
      let param = {
        checkId: null,
        tbFocusNews: [],
        url: this.operateInfo.url
      }

      if (this.operateInfo.type) {
        let info = JSON.parse(JSON.stringify(this.operateInfo))
        info.isHeadline = info.isHeadline ? 1 : 0
        info.isTop = info.isTop ? 1 : 0
        info.type = 0
        param.tbFocusNews.push(info)
      }
      if (this.operateInfo2.type) {
        let info = JSON.parse(JSON.stringify(this.operateInfo2))
        info.url = this.operateInfo.url
        info.type = 1
        param.tbFocusNews.push(info)
      }
      addOperateInfo(param).then(res => {
        if (res.code == 200) {
          this.queryFocusNews()
          this.createOperationShow = false
        } else {
          this.$message.error(res.msg)
        }
      })

    },
    //根据url获取
    queryArticle(type) {
      let param
      if (type === 1) {
        param = this.operateInfo.url
      }
      if (type === 2) {
        param = this.operateInfo.url
      }
      if (type === 3) {
        param = this.operateInfo2.url
      }
      if (param == '') {
        this.$message.error('文章链接不可为空')
        return
      }

      queryArticle({articleUrl: param}).then(res => {
        if (res.code == 200) {

            this.operateInfo.title = res.data.title
            this.operateInfo2.title = res.data.title
            this.operateInfo.summary = res.data.desc




        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //修改运营
    changeFocusNews(type){
      let param ;
      if(type===2){
         param = JSON.parse(JSON.stringify(this.operateInfo2))
        param.url = param.url
        param.type = 1
      }else{
        param = JSON.parse(JSON.stringify(this.operateInfo))
        param.isHeadline = param.isHeadline ? 1 : 0
        param.isTop = param.isTop ? 1 : 0
        param.type = 0
      }

      changeFocusNews(param).then(res => {
        if (res.code == 200) {
          this.editImportantNewShow = false
          this.editFocusImageShow = false
          this.queryFocusNews()
        } else {
          this.$message.error(res.msg)
        }
      })

    },
    uploadfiles(e, t) {
      debugger
      const obj = new FormData();
      obj.append('filename', 1)
      obj.append('uploadType', 1)
      obj.append('file', e)
      axios.post(
          'http://47.96.18.55:8080/nrglxt/media/uploadfile',
          obj,
          {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          }
      ).then(res => {
        debugger
      })
      return
      uploadfile(obj).then(res => {
        debugger
      })

    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addOperation() {
      this.operateInfo = {
        "clerk": "",
        "isHeadline": 0,
        "isDelete": 0,
        "isTop": 0,
        "picUrl": "",
        "summary": "",
        "title": "",
        "type": false,
        "url": ""
      }
      this.operateInfo = {
        "picUrl": "",
        "position": '0',
        "isDelete": 0,
        "title": "",
        "type": false,
        "url": ""
      }
      this.createOperationShow = true;
    },
    //编辑要闻位
    editImportantNews(item) {
      this.operateInfo= JSON.parse(JSON.stringify(item))
      this.editImportantNewShow = true
    },
    //编辑焦点位
    editFocusImage(item) {
      this.operateInfo2 = JSON.parse(JSON.stringify(item))
      this.editFocusImageShow = true
    },
    //下方表格查询
    bottomTableSearch() {

    },
    //上方表格页码变更
    handleSizeChangeShow() {

    },
    //上方表格页码跳转
    handleCurrentChangeShow(e, t) {
      this.queryRecom(e)

    },
    //下方表格页码变更
    handleSizeChangeSelect() {

    },
    //下方表格页码跳转
    handleCurrentChangeSelect() {

    },
    //表格采用事件
    tableShowSelect(data) {
      this.createOperationShow = true
      console.log(data)
    },
    //表格删除
    tableShowDelete(data) {
      console.log(data)
    },
    //删除图片
    handleRemove(file) {
      console.log(file);
      this.$refs.upload.clearFiles(file);
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.previewShow = true;
    },
    //图片下载
    handleDownload(file) {
      console.log(file);
    },
    delThis(row) {
      this.$confirm('是否删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOperate({checkId: row.checkId}).then(res => {
          if (res.code == 200) {
            this.$message.success('删除成功')
            this.queryRecom()
          } else {
            this.$message.error(res.msg)
          }
        })
        //点击确定的操作(调用接口)
      }).catch(() => {
        //几点取消的提示
      });
    },
    //热点推荐
    queryRecom(page = 1) {
      let param = {
        page: page,
        size: 5
      }
      queryRecom(param).then(res => {
        if (res.code == 200) {
          this.tableDataShow = res.data
          this.tableDataShowLen = res.total

        } else {
          this.$message.error(res.msg)
        }

      })

    },
    queryFocusNews() {
      queryFocusNews({type: 1}).then(res => {
        if (res.code == 200) {
          this.focusPhotos = res.data
        } else {
          this.$message.error(res.msg)
        }

      })
      queryFocusNews({type: 0}).then(res => {
        if (res.code == 200) {
          this.importantNews = res.data
        } else {
          this.$message.error(res.msg)
        }

      })
    }
  },
  created() {
    this.queryRecom()
    this.queryFocusNews()
  }
}
</script>

<style scoped lang="scss">
.moreSceneOperationHome {
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .sceneInfo {
    width: 375px;
    height: calc(100% - 40px);
    background: #fff;
    padding: 15px;
    border: 1px solid #EAEDF7;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    .addOperation {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 12px;
      border: 1px solid #409EFF;
      border-radius: 4px;
      padding: 4px;
      color: #409EFF;
      cursor: pointer;

      i {
        font-size: 12px;
        color: #409EFF;
      }
    }

    .el-tabs__item {
      height: 30px;
      line-height: 30px;
    }

    .listWrap {
      overflow: auto;

      .list {
        margin-top: 12px;
        border-bottom: 2px solid #EAEDF7;
        padding-bottom: 12px;

        .topContent {
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;

          .TL {
            width: 210px;

            .title {
              color: #2F343D;
              font-size: 16px;
              line-height: 20px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .info {
              margin-top: 8px;
              height: 40px;
              color: #677287;
              font-size: 14px;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }

          .TR {
            .img {
              width: 100px;
              height: 68px;

              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }

        .bottomTags {
          display: flex;
          justify-content: space-between;

          .BL {
            display: flex;
            justify-content: left;

            .tag {
              color: #F56C6C;
              font-size: 12px;
              padding: 4px;
              margin-right: 6px;
              background: #f74e4e2e;
              border-radius: 2px;
            }
          }

          .BR {
            .time {
              color: #919AAD;
              font-size: 12px;
              line-height: 24px;
            }
          }
        }
      }
    }

    .listWrap::-webkit-scrollbar {
      display: none;
    }

    .imgWrap {

      .imgList {
        width: 100%;
        margin-bottom: 10px;
        height: 160px;
        border-radius: 4px;
        position: relative;

        .imgLineGradient {
          width: 100%;
          color: #fff;
          height: 50%;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
          position: absolute;
          bottom: 0;
          padding: 10px;
          display: flex;
          align-items: flex-end;

          .imgTextWrap {
            .imgTitle {
              font-size: 16px;
              margin-bottom: 10px;
            }

            .imgTagWrap {
              display: flex;
              justify-content: left;

              .imgTag {
                span {
                  font-size: 12px;
                  padding: 2px 4px;
                  border-radius: 2px;
                  border: 1px solid #fff;
                  margin-right: 10px;
                }

              }

              .imgTime {
                font-size: 12px;
                line-height: 22px;
              }
            }
          }

        }
      }
    }
  }

  .sceneTable {
    width: 100%;
    margin-left: 10px;

    .tableCard {
      background: #fff;
      padding: 30px;

      .filterWrap {
        margin-bottom: 20px;
      }
    }
  }

  .dialogWrap {
    //样式RESET
    ::v-deep .el-dialog__header {
      padding: 10px;
      border-bottom: 1px solid #EAEDF7;
    }

    ::v-deep .el-dialog__title {
      font-size: 14px;
    }

    ::v-deep .el-upload--picture-card {
      height: 80px;
      line-height: 80px;
    }

    ::v-deep .el-dialog__headerbtn {
      top: 15px;
      right: 15px;
    }

    ::v-deep .el-upload-list--picture-card .el-upload-list__item {
      height: 80px;
    }

    //样式REST
    .extractWrap {
      display: flex;
      justify-content: space-between;

      .extractUrl {
        margin-left: 10px;
        width: 70px;
        color: #2A79EE;
        cursor: pointer;
      }
    }

    .importantNewsWrap {
      border: 1px solid #EAEDF7;
      margin-bottom: 20px;
    }

    .importantNewsTop {
      background: #F7F8F9;
      padding: 8px 12px;
      border-bottom: 1px solid #EAEDF7;
    }

    .importantNewsBottom {
      padding: 8px 12px;

      .recommendWrap {
        display: flex;
        justify-content: space-between;
        line-height: 32px;
        margin-left: 65px;
      }
    }
  }

}
</style>
