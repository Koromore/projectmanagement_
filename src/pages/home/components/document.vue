<template>
    <div class="document">
        <div>
            <el-row>
              <el-col :span="24" class="top">
                <el-col :span="5" class>
                  <el-col :span="4" class="title">客户</el-col>
                  <el-col :span="20">
                    <el-select v-model="client" placeholder="请选择" size="small">
                      <el-option
                        v-for="item in client_list"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-col>
                <el-col :span="6" class="tab tab1">
                  <el-button-group>
                    <el-button
                      type="primary"
                      plain
                      size="small"
                      @click="tab1_change(1)"
                      :class="[tab1_act=='1' ? 'act' : '']"
                    >&nbsp;&nbsp;&nbsp;&nbsp;官网&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    <el-button
                      type="primary"
                      plain
                      size="small"
                      @click="tab1_change(2)"
                      :class="[tab1_act=='2' ? 'act' : '']"
                    >&nbsp;&nbsp;&nbsp;&nbsp;口碑&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    <el-button
                      type="primary"
                      plain
                      size="small"
                      @click="tab1_change(3)"
                      :class="[tab1_act=='3' ? 'act' : '']"
                      style="border-left: 0;"
                    >数字营销</el-button>
                  </el-button-group>
                </el-col>
                <el-col :span="4" class="tab tab2">
                  <el-button-group>
                    <el-button
                      type="primary"
                      plain
                      size="small"
                      @click="tab2_change(1)"
                      :class="[tab2_act=='1' ? 'act' : '']"
                    >&nbsp;&nbsp;&nbsp;&nbsp;专项&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    <el-button
                      type="primary"
                      plain
                      size="small"
                      @click="tab2_change(2)"
                      :class="[tab2_act=='2' ? 'act' : '']"
                    >&nbsp;&nbsp;&nbsp;&nbsp;日常&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                  </el-button-group>
                </el-col>
                <el-col :span="8" class="tab tab3">
                    <el-input placeholder="搜索" size="small" v-model="name" class="sousuo">
                        <el-button @click="searchHandle" slot="append" size="small" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
              </el-col>
            </el-row>
        </div>
        <div class="table-main">
            <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :row-class-name="tableRowClassName"
                @row-click="rowClick"
                :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
                :row-style="{height: '57px'}"
                >
                <el-table-column
                  label="文档">
                    <template slot-scope="scope">
                        <div @click.stop="changeNum(scope.$index,scope.row)" >
                            <div v-if="editable[scope.$index]">
                                <el-input v-model="editFileName" size="mini" class="editRemarkInput">
                                    <el-button @click.stop="cellSave(scope.$index,scope.row)" slot="append" type="primary" size="mini">确认</el-button>
                                </el-input>
                            </div>
                            <div v-else>
                            <!-- el-icon-picture -->
                                <i class="el-icon-folder"></i>
                                <span>{{ scope.row.fileName }}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="clientName" label="客户"></el-table-column>
                <el-table-column prop="proName" label="项目"></el-table-column>
                <el-table-column prop="taskName" label="任务"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" sortable width="180"></el-table-column>
                <el-table-column prop="realName" label="更新人" width="180"></el-table-column>
                <el-table-column label="操作" width="240">
                    <template slot-scope="scope">
                        <el-button @click="upload2(scope.$index, scope.row)" size="mini"  icon="el-icon-upload2"></el-button>
                        <el-button @click="download(scope.row)" size="mini" icon="el-icon-download"></el-button>
                        <el-button @click="enterDetail(scope.$index, scope.row)" size="mini" icon="el-icon-share"></el-button>
                        <el-button @click="lookHistory(scope.$index,scope.row)" size="mini" icon="el-icon-time"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paging">
              <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    layout="total, prev, pager, next, jumper"
                    :total="totalnum"  background>
                  </el-pagination>
              </div>
          </div>
        </div>
        <el-drawer title="历史文档" :visible.sync="openHistory" :with-header="false">
            <el-scrollbar>
                <div class="history-main">
                    <div class="title">历史</div>
                    <el-timeline v-loading="fileHistoryLoading">
                        <el-timeline-item v-for="item in fileHistoryList"
                            :key="item.fileId"
                            :timestamp="item.updateTime" placement="top">
                          <el-card>
                            <h4>更新人：{{item.realName}}</h4>
                            <p class="fileName">
                                <i class="el-icon-folder"></i>
                                <span>{{item.fileName}}</span>
                            </p>
                            <p>
                                <el-button @click="download(item)" size="small" type="primary">下载<i class="el-icon-download el-icon--right"></i></el-button>
                            </p>
                          </el-card>
                        </el-timeline-item>
                        
                    </el-timeline>
                    <p v-show="fileHistoryList.length==0">暂无历史数据</p>
                </div>
            </el-scrollbar>
        </el-drawer>
        
        <!-- 任务详情 -->
        <el-drawer title="任务详情" :visible.sync="openTaskVisible" :with-header="false">
            <el-scrollbar>
                <div class="history-main">
                    
                </div>
            </el-scrollbar>
        </el-drawer>
        <!-- 重新上传弹框 -->
        <el-dialog title="修改附件" :visible.sync="dialogFileVisible">
            <div>
                <el-upload
                  :action="uploadUrl"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                  :limit="1"
                  :on-exceed="handleExceed"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="fileRemove">取 消</el-button>
                <el-button type="primary" @click="fileUpload">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'document',
    data() {
        return {

            openHistory:false, //控制文档历史记录侧栏状态
            editFileName:'',//修改的文件名
            clientId:'',//客户ID
            serviceId:'',//
            isUsual:'', //是否是专项
            name:'',//搜索的关键字
            loading:false, //是否正在加载中
             // 项目类型1选择
            tab1_act: 1,
              // 项目类型2选择
            tab2_act: 1,
            client: '广汽本田',
            fileHistoryList:[],//文件历史数据
            fileHistoryLoading:false, //侧栏文件是否正在加载中
            client_list: [
                {
                  value: '广汽本田',
                  label: '广汽本田'
                },
                {
                  value: '吉利',
                  label: '吉利'
                },
                {
                  value: '沃尔沃',
                  label: '沃尔沃'
                }
            ],
            tableData: [],//文件列表数据
            editable:[], //控制文件名修改
            pageNum:1,//当前的页码
            totalnum:0, //总页码
            fileList: [],//上传的文件
            listProFile: [], // 上传文件信息列表
            uploadUrl:'',//上传文件的接口地址
            dialogFileVisible:false,//控制显示重新上传附件的弹框
            editData:'',//用于修改附件赋值的临时存储
            openTaskVisible:false,//显示任务详情侧栏
        }
    },
    methods: {
        handleSizeChange(){

        },
        //下一页
        handleCurrentChange(page){
            this.pageNum = page
            let data = {
                userid: 1,
                pageNum: this.pageNum,
                pageSize: 10,
                // clientId:'',//客户ID
                // serviceId:'',//
                // isUsual:'', //是否是专项
                name:'',//搜索的关键字
            }
            this.getTaskfilePageList(data);
        },
        /**
         * [enterDetail 进入详情]
         */
        enterDetail(index, row) {
            this.openTaskVisible = true;
            let id = row.taskId;
            let data = `?id=${id}`
            this.$axios.post('/pmbs/api/task/show' + data).then((res)=>{
                console.log(res);
            })
        },
        //取消附件上传
        fileRemove:function () {
            this.dialogFileVisible = false;
        },
        //上传文件修改附件
        fileUpload:function () {

            // console.log(this.editData)
            // console.log('后台数据不全需要')
            // proId=1  taskId=30  updateuserId=128
            
            var taskfile = {
                proId:1,
                taskId:30,
                updateUserId:128,
                oldFileId:this.editData.fileId.toString()
            }
            var data = {
                taskfile:Object.assign(taskfile,this.listProFile[0])
            }

            //更新附件 参数修改的文件ID 以及
            this.$axios.post('/pmbs/api/taskfile/importupdate',data).then((res)=>{
                console.log(res)
               
            })
        },
        handleExceed:function (file, fileList) {
            this.$message({
              message: '只能重新上传一个文件！',
              type: 'warning'
            });
        },
        // 删除
        handleRemove(file) {
          let data = file.response.data
          let listProFile = this.listProFile
          for (let i = 0; i < listProFile.length; i++) {
            let element = listProFile[i]
            if (element.localPath == data.path) {
              listProFile.splice(i, 1)
            }
          }
          this.listProFile = listProFile
        },
        // 预览
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url
          this.dialogVisible = true
        },
        // 上传回调
        handleSuccess(res, file, fileList) {
          // console.log('上传附件成功')
          if (res.errcode == 0) {
            let resData = res.data
            let listProFile = this.listProFile
            let listProFileData = {
              fileName: resData.fileName, //'附件名称',
              localPath: resData.path, //'本地路径',
              suffix: resData.fileType //'文档后缀'
            }
            listProFile.push(listProFileData)
            this.listProFile = listProFile
          }
        },
        tab1_change(e) {
            this.tab1_act = e;
        },
        //
        tab2_change(e) {
            this.tab2_act = e;
        },
        // 搜索处理
        searchHandle:function () {
            // 获取文档列表
            let data = {
                userid: 1,
                pageNum: this.pageNum,
                pageSize: 10,
                // clientId:'',//客户ID
                // serviceId:'',//
                // isUsual:'', //是否是专项
                name:this.name,//搜索的关键字
            }
            this.getTaskfilePageList(data)
        },
        tableRowClassName ({row, rowIndex}) {
            //把每一行的索引放进row
            row.index = rowIndex;
        },
        rowClick:function (row, event, column) {
            //点击行的时候隐藏所有
            this.editable = new Array(this.tableData.length);
        },
        /**
         * [cellSave 保存文档名修改]
         */
        cellSave:function (rowIndex,row) {
            this.$axios.post('/pmbs/api/taskfile/updataTaskFileByFileId',{
                fileId:row.fileId,
                fileName:this.editFileName
            }).then((res)=>{
                // console.log(res)
                //更新数据 复原状态
                row.fileName = this.editFileName;
                this.editable = new Array(this.tableData.length);
            })
            //成功后关闭 
        },
        changeNum(index, row){
            //设置是否可以编辑
            this.editable = new Array(this.tableData.length);
            this.editable[index] = true;
    
            this.saveItem = this.tableData[index];
     
            this.$set(this.editable, index, true);
            //让input自动获取焦点
            this.$nextTick(function() {
                var editInputList = document.getElementsByClassName('editRemarkInput');
                editInputList[0].children[0].focus();
            });
            // 绑定当前点击的文件名
            this.editFileName = row.fileName;
        },
        /**
         * [upload2 重新上传]
         */
        upload2(index, row) {
            this.fileList = []; //先清空之前的文件列表
            this.listProFile = [];
            this.editData = row; //用于后面提交数据
            this.dialogFileVisible = true; //显示上传弹框
        },
        /**
         * [download 下载附件]
         */
        download(row) {
            let localPath = row.localPath;
            let a = document.createElement('a');
                a.download = '';
                a.setAttribute('href','http://218.106.254.122:8083/pmbs/'+localPath);
                a.click();
        },
        /**
         * [lookHistory 文档历史记录]
         */
        lookHistory(index, row) {
            // console.log(row);
            this.openHistory = true;
            let proId = row.proId;//项目ID查询

            if (!this.fileHistoryLoading) {
                this.fileHistoryLoading = true;
                this.$axios
                .post('/pmbs/api/taskfile/getTaskfileById', { proId: proId})
                .then((res)=> {
                    this.fileHistoryLoading = false;
                    if (res.data && res.data.length!=0) {
                        this.fileHistoryList = res.data;
                    }else{
                        console.log('暂无数据')
                    }
                }).catch(()=>{
                    this.fileHistoryLoading = false;
                })
            }
        },
         // 获取文档列表
        getTaskfilePageList(data) {
          if(!this.loading){
              this.loading = true;
               this.$axios.post('/pmbs/api/taskfile/getTaskfilePageList', data).then(this.getTaskfilePageListSuss)
          }
        },
        // 获取文档列表回调
        getTaskfilePageListSuss(res) {
            if (res.status == 200) {
                this.loading = false;
                this.totalnum = res.data.length;
                this.tableData = res.data;
            }
        },
  },
  // 钩子函数
  mounted() {
    // 获取文档列表
    let data = {
        userid: 1,
        pageNum: this.pageNum,
        pageSize: 10,
        // clientId:'',//客户ID
        // serviceId:'',//
        // isUsual:'', //是否是专项
        name:'',//搜索的关键字
    }
    this.getTaskfilePageList(data);

        let upType = 0;
        let demandType = 0;
        let uploadUrl = `/pmbs/file/upload?upType=${upType}&demandType=${demandType}`;
        this.uploadUrl = uploadUrl;
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.history-main{
    padding: 20px;
    box-sizing: border-box;
}
.history-main .title{
     font-weight: bold;
  height: 100px;
  line-height: 100px;
}
.table-main{
    margin-top: 24px;
}
.fileName{
    margin-bottom: 20px;
    font-size: 22px;
}
.fileName span{
    font-size: 14px;
}
    .paging{
        margin-top: 24px;
        text-align: center;
    }

.document .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.document .top .title {
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.document .top .tab3 {
  /*height: 36px;*/
  border: none;
  color: white;
}
.document .top .tab3 .sousuo {
  width: 320px;
  /*height: 36px;*/
  border: none;
  color: white;
}

.document .top .tab1 .el-button--primary.is-plain {
  border-color: #ddd;
}
.document .top .tab2 .el-button--primary.is-plain {
  border-color: #ddd;
}
.document .top .tab1 >>> .el-button,
.document .top .tab2 >>> .el-button {
  background: #fff;
  color: black;
}
.document .top .tab1 >>> .el-button:hover,
.document .top .tab2 >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.document .top .tab1 >>> .el-button.act,
.document .top .tab2 >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.el-button + .el-button {
  margin: 0;
}
.document .table {
  margin-top: 24px;
}
.document .table .operation i {
  font-size: 18px;
}
.document .table .el-table__row .operation {
  display: none;
}
.document .table .el-table__row:hover .operation {
  display: inline;
}
.document >>> .el-drawer__body {
  height: 100%;
}
.document >>> .el-scrollbar {
  height: 100%;
}
.document >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.document .records_document_box {
  height: 100%;
}
.document .records_document {
  height: 100%;
}
.document .records_document .title {
  font-weight: bold;
  height: 100px;
  line-height: 100px;
}
.document .records_document .el-card {
  font-size: 16px;
}
.document .records_document .el-card:hover {
  background: #eee;
}
.document .records_document .el-card .down {
  display: none;
  font-size: 18px;
}
.document .records_document .el-card:hover .down {
  display: inline-block;
}
</style>
