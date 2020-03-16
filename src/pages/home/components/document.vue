<template>
  <div class="document task">
    <div>
      <el-row>
        <el-col :span="24" class="top">
          <el-col :span="5" class>
            <el-col :span="4" class="title">客户</el-col>
            <el-col :span="20">
              <el-select v-model="clientId" placeholder="请选择" size="small">
                <el-option
                  v-for="item in clientIdList"
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
                @click="tab1_change(1,22)"
                :class="[tab1_act=='1' ? 'act' : '']"
              >&nbsp;&nbsp;&nbsp;&nbsp;官网&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
              <el-button
                type="primary"
                plain
                size="small"
                @click="tab1_change(2,18)"
                :class="[tab1_act=='2' ? 'act' : '']"
              >&nbsp;&nbsp;&nbsp;&nbsp;口碑&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
              <el-button
                type="primary"
                plain
                size="small"
                @click="tab1_change(3,17)"
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
                @click="tab2_change(1,1)"
                :class="[tab2_act=='1' ? 'act' : '']"
              >&nbsp;&nbsp;&nbsp;&nbsp;专项&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
              <el-button
                type="primary"
                plain
                size="small"
                @click="tab2_change(2,0)"
                :class="[tab2_act=='2' ? 'act' : '']"
              >&nbsp;&nbsp;&nbsp;&nbsp;日常&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="8" class="tab tab3">
            <el-input
              @keyup.enter.native="searchHandle"
              placeholder="搜索"
              size="small"
              v-model="name"
              class="sousuo"
            >
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
        :default-sort="{prop: 'date', order: 'descending'}"
        :row-class-name="tableRowClassName"
        @row-click="rowClick"
        :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
        :row-style="{height: '57px'}"
      >
        <el-table-column label="文档">
          <template slot-scope="scope">
            <div @click.stop="changeNum(scope.$index,scope.row)">
              <div v-if="editable[scope.$index]">
                <el-input v-model="editFileName" size="mini" class="editRemarkInput">
                  <el-button
                    @click.stop="cellSave(scope.$index,scope.row)"
                    slot="append"
                    type="primary"
                    size="mini"
                  >确认</el-button>
                </el-input>
              </div>
              <div v-else>
                <!-- el-icon-picture -->
                <img
                  v-if="scope.row.suffix == 'doc' || scope.row.suffix == 'docx'"
                  src="static/images/document/word.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else-if="scope.row.suffix == 'xls' || scope.row.suffix == 'xlsx'"
                  src="static/images/document/excle.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else-if="scope.row.suffix == 'ppt' || scope.row.suffix == 'pptx'"
                  src="static/images/document/ppt.png"
                  width="16"
                  alt
                  srcset
                />
                <img v-else src="static/images/document/other.png" width="16" alt srcset />
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
            <el-button
              v-if="scope.row.doUserId == userId && scope.row.status!=3 && scope.row.status!=5"
              @click="upload2(scope.$index, scope.row)"
              size="mini"
              icon="el-icon-upload2"
            ></el-button>
            <el-button @click="download(scope.row)" size="mini" icon="el-icon-download"></el-button>
            <!-- @click="enterDetail(scope.$index, scope.row)" -->
            <el-button @click="enterDetail(scope.row)" size="mini" icon="el-icon-share"></el-button>
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
            layout="total, prev, pager, next"
            :total="totalnum"
            background
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-drawer title="历史文档" :visible.sync="openHistory" :with-header="false">
      <el-scrollbar>
        <div class="history-main">
          <div class="title">历史</div>
          <el-timeline v-loading="fileHistoryLoading">
            <el-timeline-item
              v-for="item in fileHistoryList"
              :key="item.fileId"
              :timestamp="item.updateTime"
              placement="top"
            >
              <el-card>
                <h4>更新人：{{item.realName}}</h4>
                <p class="fileName">
                  <!-- <i class="el-icon-folder"></i> -->
                  <img
                    v-if="item.suffix == 'doc' || item.suffix == 'docx'"
                    src="static/images/document/word.png"
                    width="16"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'xls' || item.suffix == 'xlsx'"
                    src="static/images/document/excle.png"
                    width="16"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'ppt' || item.suffix == 'pptx'"
                    src="static/images/document/ppt.png"
                    width="16"
                    alt
                    srcset
                  />
                  <img v-else src="static/images/document/other.png" width="16" alt srcset />
                  <span>{{item.fileName}}</span>
                </p>
                <p>
                  <el-button @click="download(item)" size="small" type="primary">
                    下载
                    <i class="el-icon-download el-icon--right"></i>
                  </el-button>
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <p v-show="fileHistoryList.length==0">暂无历史数据</p>
        </div>
      </el-scrollbar>
    </el-drawer>

    <!-- 任务详情 -->
    <!-- 抽屉 -->
    <el-drawer title="任务" :visible.sync="drawer1" :with-header="false">
      <el-scrollbar style="height: 100%"  v-loading="drawerLoading">
        <el-row class="task_details">
            <el-col :span="24" class="title">{{taskData.proName}}-{{taskData.taskName}}</el-col>
            <el-col :span="6" class="title">执行部门：</el-col>
            <el-col :span="18">{{taskData.deptName}}</el-col>
            <el-col :span="6" class="title">任务类型：</el-col>
            <el-col :span="18">
              <template
                v-if="taskData.doUserId == userId && taskData.status == 1 || taskData.status == 4"
              >
                <el-select v-model="taskData.typeId" placeholder="请选择任务类型" size="mini">
                  <el-option
                    v-for="item in task_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else>{{taskData.typeName}}</template>
            </el-col>
            <el-col :span="6" class="title">执行人：</el-col>
            <el-col :span="18">
              <span v-if="!changeNameShow">{{taskData.doUserName}}</span>
              <el-select
                v-if="changeNameShow"
                v-model="taskData.doUserId"
                filterable
                placeholder="请选择"
                size="mini"
                clearable
                style="width:99px;"
              >
                <el-option
                  v-for="item in taskData.listOaUser"
                  :key="item.userId"
                  :label="item.realName"
                  :value="item.userId"
                ></el-option>
              </el-select>
              <el-link
                type="primary"
                @click="changeName()"
                v-if="taskData.deptId == deptId && taskData.isIgnore != true && taskData.listOaUser.length > 1 && taskData.status != 2 && taskData.status != 3 && taskData.status != 5"
              >更换</el-link>
              <el-link
                type="primary"
                @click="changeName()"
                v-else-if="deptId == 150 && taskData.deptId == 93 && taskData.isIgnore != true && taskData.listOaUser.length > 1 && taskData.status != 2 && taskData.status != 3 && taskData.status != 5"
              >更换</el-link>
              <el-link
                type="primary"
                @click="changeName()"
                v-else-if="deptId == 150 && taskData.deptId == 64 && taskData.isIgnore != true && taskData.listOaUser.length > 1 && taskData.status != 2 && taskData.status != 3 && taskData.status != 5"
              >更换</el-link>
            </el-col>
            <el-col :span="6" class="title">状态：</el-col>
            <el-col :span="18">
              <el-select
                v-model="statusListValue"
                size="mini"
                :class="{'state_color1': taskData.status == 1,
                  'state_color2': taskData.status == 2}"
                placeholder="请选择"
                v-if="taskData.status==1 && taskData.doUserId == userId"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span
                v-else-if="taskData.status==1 && taskData.doUserId != userId"
                class="state_color1"
              >执行中</span>
              <span v-else-if="taskData.status==2" class="state_color2">审核中</span>
              <span v-else-if="taskData.status==3" class="state_color3">已完成</span>
              <el-select
                v-model="statusListValue"
                size="mini"
                :class="{'state_color1': taskData.status == 1,
                  'state_color2': taskData.status == 2,
                  'state_color4': taskData.status == 4}"
                placeholder="请选择"
                v-if="taskData.status==4"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span v-else-if="taskData.status==5" class="state_color3">延期完成</span>
            </el-col>
            <el-col :span="6" class="title">预计时间：</el-col>
            <el-col :span="18">
              <template
                v-if="taskData.doUserId == userId && taskData.status == 1 || taskData.status == 4"
              >
                <el-date-picker
                  v-model="taskData.expertTime"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  size="mini"
                ></el-date-picker>
              </template>
              <template v-else>{{taskData.expertTime_}}</template>
            </el-col>
            <el-col :span="6" class="title">完成时间：</el-col>
            <el-col :span="18">{{taskData.overTime_}}</el-col>
            <el-col :span="6" class="title">需求：</el-col>
            <el-col :span="18">
              <template
                v-if="taskData.doUserId == userId && taskData.status == 1 || taskData.status == 4"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 9}"
                  placeholder="请输入内容"
                  v-model="taskData.remark"
                ></el-input>
              </template>
              <template v-else>{{taskData.remark}}</template>
            </el-col>
            <el-col :span="6" class="title">附件：</el-col>
            <el-col :span="18" class="proFileList">
              <template
                v-if="taskData.doUserId == userId && taskData.status == 1 || taskData.status == 4"
              >
                <el-upload
                  :action="uploadUrl"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :file-list="fileList0"
                  class="elementUpload"
                >
                  <el-button size="mini" type="primary">点击上传附件</el-button>
                </el-upload>
              </template>
              <template v-else>
                <div
                  class="smname"
                  v-for="item in taskData.proFileList"
                  :key="item.index"
                  @click="download(item)"
                >
                  <img
                    v-if="item.suffix == 'doc' || item.suffix == 'docx'"
                    src="static/images/document/word.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'xls' || item.suffix == 'xlsx'"
                    src="static/images/document/excle.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'ppt' || item.suffix == 'pptx'"
                    src="static/images/document/ppt.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img v-else src="static/images/document/other.png" width="24" alt srcset />
                  <div>{{item.fileName}}</div>
                </div>
              </template>
            </el-col>
            <el-divider content-position="right"></el-divider>
            <el-col :span="6" class="title">完成结果：</el-col>
            <el-col :span="18">
              <template
                v-if="taskData.doUserId == userId && taskData.status != 3 && taskData.status != 5"
              >
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="taskData.overDesc"
                ></el-input>
              </template>
              <template v-else>{{taskData.overDesc}}</template>
            </el-col>
            <el-col :span="6" class="title">附件：</el-col>
            <el-col :span="18" class="proFileList">
              <template
                v-if="taskData.doUserId == userId && taskData.status != 3 && taskData.status != 5"
              >
                <el-upload
                  action="/pmbs/file/upload?upType=1&demandType=1"
                  :on-remove="handleRemoveResult"
                  :on-success="handleSuccessResult"
                  :disabled="updateBan"
                  :fileList="fileList1"
                  :limit="1"
                  class="elementUpload"
                >
                  <el-button size="mini" type="primary">点击上传文档</el-button>
                </el-upload>
              </template>
              <template v-else>
                <div
                  class="smname"
                  v-for="item in taskData.taskfileList"
                  :key="item.index"
                  @click="download(item)"
                >
                  <img
                    v-if="item.suffix == 'doc' || item.suffix == 'docx'"
                    src="static/images/document/word.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'xls' || item.suffix == 'xlsx'"
                    src="static/images/document/excle.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'ppt' || item.suffix == 'pptx'"
                    src="static/images/document/ppt.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img v-else src="static/images/document/other.png" width="24" alt srcset />
                  <div>{{item.fileName}}</div>
                </div>
              </template>
            </el-col>
            <el-divider content-position="right"></el-divider>
            <el-col :span="6" class="title">反馈意见：</el-col>
            <el-col :span="18" class="suggest">
              <el-scrollbar style="height: 100%;">
                <el-col
                  :span="23"
                  class="suggest_list"
                  v-for="item in taskData.feedbackList"
                  :key="item.index"
                >
                  <el-col :span="12" class="time">{{item.updateTime}}</el-col>
                  <el-col :span="12" class="pop">{{item.deptName}}-{{item.feedbackUserName}}</el-col>
                  <el-col :span="24" class="content">{{item.feedback}}</el-col>
                  <el-col :span="24" class="fileListBox">
                    <div
                      class="fileList"
                      v-for="items in item.feedbackFileList"
                      :key="items.index"
                      @click="download(item)"
                    >
                      <img
                        v-if="item.suffix == 'doc' || item.suffix == 'docx'"
                        src="static/images/document/word.png"
                        width="24"
                        alt
                        srcset
                      />
                      <img
                        v-else-if="item.suffix == 'xls' || item.suffix == 'xlsx'"
                        src="static/images/document/excle.png"
                        width="24"
                        alt
                        srcset
                      />
                      <img
                        v-else-if="item.suffix == 'ppt' || item.suffix == 'pptx'"
                        src="static/images/document/ppt.png"
                        width="24"
                        alt
                        srcset
                      />
                      <img v-else src="static/images/document/other.png" width="24" alt srcset />
                      <div>{{items.fileName}}</div>
                    </div>
                  </el-col>
                </el-col>
              </el-scrollbar>
            </el-col>
          </el-row>
      </el-scrollbar>
      <el-row class="batton_pa">
        <el-col :span="12" :offset="7" class="batton">
          <el-button size="small" type="info" @click="empty">取消</el-button>
          <el-button size="small" type="primary" @click="changeTaskDeil">完成</el-button>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 重新上传弹框 -->
    <el-dialog :close="fileClose" title="修改附件" :visible.sync="dialogFileVisible">
      <div>
        <el-upload
          :action="uploadUrl"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :limit="1"
          :on-exceed="handleExceed"
        >
          <el-button size="mini" type="primary">点击上传附件</el-button>
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
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      openHistory: false, //控制文档历史记录侧栏状态
      editFileName: '', //修改的文件名
      clientId: '', //客户ID
      serviceId: '', //
      isUsual: '', //是否是专项
      name: '', //搜索的关键字
      loading: false, //是否正在加载中
      // 项目类型1选择
      tab1_act: '',
      // 项目类型2选择
      tab2_act: '',
      clientIdList: [], //客户列表
      client: '广汽本田',
      fileHistoryList: [], //文件历史数据
      fileHistoryLoading: false, //侧栏文件是否正在加载中
      tableData: [], //文件列表数据
      editable: [], //控制文件名修改
      pageNum: 1, //当前的页码
      totalnum: 0, //总页码
      fileList: [], //上传的文件
      listProFile: [], // 上传文件信息列表
      uploadUrl: '', //上传文件的接口地址
      dialogFileVisible: false, //控制显示重新上传附件的弹框
      editData: '', //用于修改附件赋值的临时存储
      openTaskVisible: false, //显示任务详情侧栏
      // 任务详情
      taskData: {},
      suggest_list: [],
      // 状态列表
      statusList: [
        { value: 1, label: '执行中' },
        { value: 2, label: '完成' },
        { value: 4, label: '延期' }
      ],
      statusListValue: '',
      drawer1: false,
      listProFileResult: [],
      result: '',
      // taskData: [],
      drawerLoading: false,
      // 禁止选择当前时间之前的时间
      proExpertTime: '',
      pickerOptions: {},
      // 项目类型选择
      task_type: [],
      task_type_value: '',
      // 上传附件
      uploadUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      listProFile_: [], // 上传文件信息列表
      suggest_list: [], // 任务反馈意见列表
      fileList0: [],
      // 上传文档
      updateBan: false, // 上传文档禁止
      dialogImageUrlResult: '',
      dialogVisibleResult: false,
      disabledResult: false,
      listProFileResult: [], // 上传文件信息列表
      fileList1: [],
      oldFileId: '',
      // 更换执行人
      changeDoUserNameShow: 'true',
      nextuserList: [], // 下属信息
      nextuserValue: '', // 修改后执行人
      // 详情内更换执行人
      changeNameShow: false,
      userValue: '' // 修改后执行人
    }
  },
  methods: {
    pickerOptionsTime() {
      let expertTime = this.proExpertTime
      this.pickerOptions = {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() - 8.64e7
            // || time.getTime() > new Date(expertTime).getTime()
          )
        }
      }
    },
    fileClose() {
      //监听重新上传弹框关闭 清空数据
      this.listProFile = []
    },
    getAllClientAndBusiness() {
      this.$axios
        .post('/pmbs/client/getAllClientAndBusiness')
        .then(this.getAllClientAndBusinessSuss)
    },
    // 获取新建项目分类回调
    getAllClientAndBusinessSuss(res) {
      if (res.status == 200) {
        let data = res.data.data
        let clientIdList = []
        // 循环提取名称和ID
        for (let i = 0; i < data.length; i++) {
          let element = data[i]
          let clientIdListData = {
            value: element.clientId,
            label: element.clientName
          }
          clientIdList.push(clientIdListData)
        }
        this.clientIdList = clientIdList
      }
      // console.log(res)
    },
    handleRemoveResult(file) {
      // console.log(file)
      let data = file.response.data
      let listProFileResult = this.listProFileResult
      for (let i = 0; i < listProFileResult.length; i++) {
        let element = listProFileResult[i]
        if (element.localPath == data.path) {
          listProFileResult.splice(i, 1)
          console.log('删除')
        }
      }
      this.listProFileResult = listProFileResult
    },
    // 上传回调
    handleSuccessResult(res, file, fileList) {
      // console.log('上传附件成功')
      if (res.errcode == 0) {
        let resData = res.data
        let listProFileResult = this.listProFileResult
        // console.log(listProFile)
        let listProFileResultData = {
          proId: this.taskData.proId, // 项目ID
          taskId: this.taskData.taskId, // 任务ID
          fileId: '', // 文档ID
          updateUserId: this.userId, // 上传人ID
          fileName: resData.fileName, //'文档名称',
          isPro: 1, // '项目任务需求（0-项目需求，1-任务需求）',
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType //'文档后缀'
        }
        listProFileResult.push(listProFileResultData)
        this.listProFileResult = listProFileResult
      }
    },
    ///////// 修改任务详情 start /////////
    changeTaskDeil() {
      // console.log('修改任务详情')
      this.drawer1 = false
      this.drawer5 = false
      let taskData = this.taskData // 任务详情
      let listProFile = this.listProFile // 需求文档
      let listProFileResult = this.listProFileResult // 结果文档
      let status = this.statusListValue
      delete taskData.expertTime_
      delete taskData.overTime_
      delete taskData.feedbackList
      taskData.proFileList = listProFile
      taskData.taskfileList = listProFileResult
      taskData.status = status
      this.taskSave(taskData)
    },
    ///////// 修改任务详情 end /////////
    ///////// 任务新增/修改/完成 start /////////
    taskSave(data) {
      // console.log(this.new_task.presetTime)
      // console.log(expertTime)
      this.$axios.post('/pmbs/api/task/save', data).then(this.taskSaveSuss)
    },
    // 任务新增/修改/完成回调
    taskSaveSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        // this.projectListJoin = res.data.data
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.drawer1 = false
        this.drawer5 = false
        this.result = ''
        this.listProFile = []
        this.listProFileResult = []
        this.getTaskfilePageList()
      }
    },
    ///////// 任务新增/修改/完成 end /////////
    // 取消按钮empty
    empty() {
      this.drawer1 = false
    },
    handleSizeChange() {},
    //下一页
    handleCurrentChange(page) {
      this.pageNum = page
      this.getTaskfilePageList()
    },
    /**
     * [enterDetail 进入详情]
     */
    // 详情内修改执行人
    changeName() {
      this.changeNameShow = true
    },
    enterDetail(taskData) {
      this.drawer1 = true
      // this.statusListValue = row.status.toString()
      // this.getTaskShow(row.taskId)
      // this.openTaskVisible = true;
      let userId = this.userId
      this.drawer1 = true
      this.taskId = taskData.taskId
      let data = `?userId=${userId}&id=${taskData.taskId}`
      this.getTaskDetail(data)
      this.getDepTypeList()
    },
    // 获取任务详情
    getTaskDetail(data) {
      this.drawerLoading = true
      this.$axios
        .post('/pmbs/api/task/show' + data)
        .then(this.getTaskDetailSuss)
    },
    // 获取任务详情回调
    getTaskDetailSuss(res) {
      this.drawerLoading = false
      console.log(res)
      if (res.status == 200) {
        let data = res.data.data
        data.expertTime_ = this.$date(data.expertTime)
        data.overTime_ = this.$time(data.overTime)
        for (let i = 0; i < data.feedbackList.length; i++) {
          let element = data.feedbackList[i]
          data.feedbackList[i].updateTime = this.$time(element.updateTime)
        }
        this.taskData = data
        this.listProFile_ = data.proFileList
        this.listProFileResult = data.taskfileList
        this.statusListValue = data.status
        let fileList0 = []
        for (let i = 0; i < data.proFileList.length; i++) {
          let element = data.proFileList[i]
          let fileList0Data = {
            fileId: element.fileId,
            name: element.fileName
          }
          fileList0.push(fileList0Data)
        }
        this.fileList0 = fileList0
        let fileList1 = []
        for (let i = 0; i < data.taskfileList.length; i++) {
          let element = data.taskfileList[i]
          let fileList1Data = {
            fileId: element.fileId,
            name: element.fileName
          }
          fileList1.push(fileList1Data)
        }
        this.fileList1 = fileList1
      }
    },
    // 任务类型获取
    getDepTypeList() {
      let data = {}
      this.$axios
        .post('/pmbs/api/depType/listAjax', data)
        .then(this.getDepTypeListSuss)
    },
    // 任务类型获取回调
    getDepTypeListSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        // this.projectListJoin = res.data.data
        let data = res.data.items
        let task_type = []
        let task_type_data = {}
        for (let i = 0; i < data.length; i++) {
          let element = data[i]
          task_type_data = {
            value: element.typeId,
            label: element.typeName
          }
          task_type.push(task_type_data)
        }
        this.task_type = task_type
        // console.log(this.task_type)
        // console.log(data)
      }
    },
    ///////// 任务需求附件上传 start /////////
    upload() {
      let upType = 1
      let demandType = 0
      let uploadUrl = `
      /pmbs/file/upload?upType=${upType}&demandType=${demandType}
      `
      this.uploadUrl = uploadUrl
    },
    // 上传回调
    handleSuccess(res, file, fileList) {
      // console.log('上传附件成功')
      if (res.errcode == 0) {
        let resData = res.data
        let listProFile = this.listProFile_
        // console.log(listProFile)
        let listProFileData = {
          proId: this.taskData.proId || '', // 项目ID
          taskId: this.taskData.taskId || '', // 任务ID
          fileId: '', // 文档ID
          fileName: resData.fileName, //'附件名称',
          isPro: 1, // '项目任务需求（0-项目需求，1-任务需求）',
          deleteFlag: false, // 是否删除
          ptId: this.taskData.taskId || '', //所属任务ID
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType //'文档后缀'
        }
        listProFile.push(listProFileData)
        this.listProFile_ = listProFile
        console.log(this.listProFile_)
      }
    },
    // 删除
    handleRemove(file) {
      // console.log(file)
      let data = file
      let listProFile = this.listProFile_
      for (let i = 0; i < listProFile.length; i++) {
        let element = listProFile[i]
        if (element.fileId == data.fileId) {
          listProFile[i].deleteFlag = true
          // console.log('删除')
        }
      }
      this.listProFile_ = listProFile
      // console.log(this.listProFile)
    },
    ///////// 任务需求附件上传 end /////////

    ///////// 任务成果附件上传 start /////////
    // 上传回调
    handleSuccessResult(res, file, fileList) {
      // console.log('上传附件成功')
      if (res.errcode == 0) {
        let resData = res.data
        let listProFileResult = this.listProFileResult
        // console.log(listProFile)
        let listProFileResultData = {
          proId: this.proId, // 项目ID
          taskId: this.taskId, // 任务ID
          fileId: '', // 文档ID
          updateUserId: this.userId, // 上传人ID
          fileName: resData.fileName, //'文档名称',
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType, //'文档后缀'
          oldFileId: this.oldFileId // 原文档ID
        }
        listProFileResult.push(listProFileResultData)
        this.listProFileResult = listProFileResult
        // this.updateBan = true
        // console.log(this.listProFileResult)
      }
    },
    // 删除
    handleRemoveResult(file) {
      // console.log(file)
      let data = file
      let listProFileResult = this.listProFileResult
      if (listProFileResult.fileId) {
        this.oldFileId = listProFileResult.fileId
      } else {
        this.listProFileResult = []
      }
      // for (let i = 0; i < listProFileResult.length; i++) {
      //   let element = listProFileResult[i]
      //   if (element.fileId == data.fileId) {
      //     listProFileResult[i].deleteFlag = true
      //   }
      // }
      // this.listProFileResult = listProFileResult
      // console.log(this.listProFileResult)
    },
    ///////// 任务成果附件上传 end /////////
    //取消附件上传
    fileRemove: function() {
      this.dialogFileVisible = false
    },
    //上传文件修改附件
    fileUpload: function() {
      var taskfile = {
        proId: this.editData.proId,
        taskId: this.editData.taskId,
        updateUserId: this.editData.updateUserId,
        clientName: this.editData.clientName,
        proName: this.editData.proName,
        realName: this.editData.realName,
        taskName: this.editData.taskName,
        oldFileId: this.editData.fileId.toString()
      }

      this.$axios
        .post(
          '/pmbs/api/taskfile/importupdate',
          Object.assign(taskfile, this.listProFile[0])
        )
        .then(res => {
          this.getTaskfilePageList()
          console.log(res)
          this.dialogFileVisible = false
        })
    },
    handleExceed: function(file, fileList) {
      this.$message({
        message: '只能重新上传一个文件！',
        type: 'warning'
      })
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
    tab1_change(e, id) {
      if (this.tab1_act == e) {
        this.tab1_act = ''
        this.serviceId = '' //官网 口碑 数字营销
      } else {
        this.tab1_act = e
        this.serviceId = id //官网 口碑 数字营销
      }
    },
    //
    tab2_change(e, id) {
      if (this.tab2_act == e) {
        this.tab2_act = ''
        this.isUsual = '' //0 是日常 1是专项
      } else {
        this.tab2_act = e
        this.isUsual = id //0 是日常 1是专项
      }
    },
    // 搜索处理
    searchHandle: function() {
      this.getTaskfilePageList()
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex
    },
    rowClick: function(row, event, column) {
      //点击行的时候隐藏所有
      this.editable = new Array(this.tableData.length)
    },
    /**
     * [cellSave 保存文档名修改]
     */
    cellSave: function(rowIndex, row) {
      this.$axios
        .post('/pmbs/api/taskfile/updataTaskFileByFileId', {
          fileId: row.fileId,
          fileName: this.editFileName
        })
        .then(res => {
          // console.log(res)
          //更新数据 复原状态
          row.fileName = this.editFileName
          this.editable = new Array(this.tableData.length)
        })
      //成功后关闭
    },
    changeNum(index, row) {
      //设置是否可以编辑
      this.editable = new Array(this.tableData.length)
      this.editable[index] = true

      this.saveItem = this.tableData[index]

      this.$set(this.editable, index, true)
      //让input自动获取焦点
      this.$nextTick(function() {
        var editInputList = document.getElementsByClassName('editRemarkInput')
        editInputList[0].children[0].focus()
      })
      // 绑定当前点击的文件名
      this.editFileName = row.fileName
    },
    /**
     * [upload2 重新上传]
     */
    upload2(index, row) {
      this.fileList = [] //先清空之前的文件列表
      this.listProFile = []
      this.editData = row //用于后面提交数据
      this.dialogFileVisible = true //显示上传弹框
    },
    /**
     * [download 下载附件]
     */
    download(row) {
      let localPath = row.localPath
      let a = document.createElement('a')
      a.download = ''
      a.setAttribute('href', 'http://218.106.254.122:8084/pmbs/' + localPath)
      a.click()
    },
    /**
     * [lookHistory 文档历史记录]
     */
    lookHistory(index, row) {
      // console.log(row);
      this.openHistory = true
      let fileId = row.fileId //项目ID查询

      if (!this.fileHistoryLoading) {
        this.fileHistoryLoading = true
        this.$axios
          .post('/pmbs/api/taskfile/getTaskfileByEdition?fileId=' + fileId, {})
          .then(res => {
            this.fileHistoryLoading = false

            if (res.data && res.data.length != 0) {
              let data = res.data
              for (let i = 0; i < data.length; i++) {
                const element = data[i]
                data[i].updateTime = this.$time(element.updateTime)
              }
              this.fileHistoryList = data
            } else {
              console.log('暂无数据')
            }
          })
          .catch(() => {
            this.fileHistoryLoading = false
          })
      }
    },
    // 获取文档列表
    getTaskfilePageList(data) {
      if (!this.loading) {
        this.loading = true

        let data = {
          userid: this.userId,
          pageNum: this.pageNum,
          pageSize: 10,
          clientId: this.clientId, //客户ID
          serviceId: this.serviceId, //
          isUsual: this.isUsual, //是否是专项
          name: this.name //搜索的关键字
        }
        this.$axios
          .post('/pmbs/api/taskfile/getTaskfilePageList', data)
          .then(this.getTaskfilePageListSuss)
      }
    },
    // 获取文档列表回调
    getTaskfilePageListSuss(res) {
      this.loading = false
      if (res.status == 200) {
        let data = res.data.items
        for (let i = 0; i < data.length; i++) {
          let element = data[i]
          data[i].updateTime = this.$time(element.updateTime)
        }
        this.totalnum = res.data.totalRows
        this.tableData = data
      }
    }
  },
  watch: {
    clientId: function(newQuestion, oldQuestion) {
      this.getTaskfilePageList()
    },
    // 业务类型侦听
    serviceId: function(newQuestion, oldQuestion) {
      this.getTaskfilePageList()
    },
    // 专项/日常侦听
    isUsual: function(newQuestion, oldQuestion) {
      this.getTaskfilePageList()
    }
  },
  // 钩子函数
  mounted() {
    //获取客户下拉数据
    this.getAllClientAndBusiness()
    this.getTaskfilePageList()

    let upType = 0
    let demandType = 0
    let uploadUrl = `/pmbs/file/upload?upType=${upType}&demandType=${demandType}`
    this.uploadUrl = uploadUrl
    this.pickerOptionsTime() // 禁用时间函数
    // console.log(this.$store.state)
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.history-main {
  padding: 20px;
  box-sizing: border-box;
}
.history-main .title {
  font-weight: bold;
  height: 100px;
  line-height: 100px;
}
.table-main {
  margin-top: 24px;
}
.fileName {
  margin-bottom: 20px;
  font-size: 22px;
}
.fileName span {
  font-size: 14px;
}
.paging {
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

.task .task_details {
  height: 100%;
  padding: 36px 36px 108px 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
  align-items: flex-start;
}
.task .task_details > .el-col {
  margin-bottom: 18px;
}
.task .task_details .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.task .task_details .title:nth-of-type(1) {
  text-align: left;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 18px;
}
.task .task_details .smname {
  width: 72px;
  text-align: center;
  font-size: 13px;
  color: rgb(162, 162, 162);
}
.task .task_details .suggest {
  height: 172px;
}
/* .task .task_details .suggest .el-scrollbar{
  height: 100%;
  overflow-x: scroll;
} */
.task .task_details .suggest .suggest_list {
  /* height: 48px; */
  margin-bottom: 12px;
}
.task .task_details .suggest .suggest_list .pop,
.task .task_details .suggest .suggest_list .time {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: rgb(162, 162, 162);
}
.task .task_details .suggest .suggest_list .pop {
  text-align: right;
}
.task .task_details .suggest .suggest_list .content {
  color: #000;
  font-size: 16px;
}
.task .task_details .suggest .fileListBox{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.task .task_details .suggest .fileList {
  width: 72px;
  text-align: center;
  font-size: 13px;
  color: rgb(162, 162, 162);
  margin-top: 13px;
}
.task .task_details .suggest .fileList div{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.task .batton_pa {
  width: 100%;
  padding: 36px;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
}
.task .task_details >>> .el-select input {
  width: 108px;
  border: none;
  font-size: 16px;
  padding-left: 0;
}
.task .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.task .batton button {
  width: 36%;
}
.feedback {
  height: 100%;
  padding: 36px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: space-between;
}
.feedback .title:nth-of-type(1) {
  font-weight: 600;
  margin-bottom: 36px;
}
.feedback .title {
  font-size: 18px;
  margin-bottom: 13px;
}
/* .task >>> .el-drawer__body {
  height: 100%;
} */
.task >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.avatar {
  width: 146px;
  height: 146px;
  display: block;
  overflow: hidden;
}
.avatar img {
  width: 100%;
}
</style>
