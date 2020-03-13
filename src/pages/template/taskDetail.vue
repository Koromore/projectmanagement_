<template>
  <div class="taskDetail">
    <el-drawer title="任务" :visible.sync="drawer" :with-header="false">
      <el-scrollbar style="height: 100%">
        <el-row class="add_box">
          <el-col :span="24">
            <el-col :span="6" class="title title1">创建任务</el-col>
          </el-col>
          <el-col :span="6" class="title">父任务</el-col>
          <el-col :span="13">
            <!-- <el-input placeholder="请输入内容" v-model="new_task.parent_task" clearable></el-input> -->
            <el-select
              v-model="new_task.faTask"
              filterable
              placeholder="请选择"
              class="parent_task"
              clearable
              :disabled="faTaskDisabled"
            >
              <el-option
                v-for="item in faTaskList"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- {{new_task.faTask}} -->
          </el-col>
          <el-col :span="24">
            <el-col :span="6" class="title title2">执行部门</el-col>
            <el-col :span="15" :offset="6" class="department">
              <el-radio
                v-model="new_task.department"
                :label="items.id"
                v-for="items in deptList"
                :key="items.index"
              >{{items.name}}</el-radio>
            </el-col>
          </el-col>

          <el-col :span="6" class="title">名称</el-col>
          <el-col :span="13">
            <el-input placeholder="请输入内容" v-model="new_task.new_name" clearable></el-input>
          </el-col>
          <el-col :span="6" class="title">预计时间</el-col>
          <el-col :span="13" class="presetTime">
            <el-date-picker
              v-model="new_task.presetTime"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-col>
          <el-col :span="6" class="title">任务类型</el-col>
          <el-col :span="13" class="task_type">
            <el-select v-model="task_type_value" placeholder="请选择任务类型">
              <el-option
                v-for="item in task_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="title">需求</el-col>
          <el-col :span="13">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 8}"
              placeholder="请输入内容"
              v-model="new_task.remark"
            ></el-input>
          </el-col>
          <!-- 上传 -->
          <el-col :span="13" :offset="6" class="upload">
            <el-upload :action="uploadUrl" :on-remove="handleRemove" :on-success="handleSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
              <span class="text">上传附件</span>
            </el-upload>
          </el-col>
          <!-- 上传 -->

          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info" @click="empty">取消</el-button>
            <el-button size="small" type="primary" @click="putIn">提交</el-button>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-drawer>
    <!-- 抽屉 -->
    <el-drawer title="历史记录" :visible.sync="drawer2" :with-header="false">
      <el-row class="records">
        <el-col :span="23" :offset="1" class="title">历史记录</el-col>
        <el-col :span="23" :offset="1" class="records_list" :style="style1">
          <el-scrollbar>
            <el-timeline>
              <el-timeline-item
                v-for="item in records_list"
                :key="item.index"
                :timestamp="item.time"
                placement="top"
              >
                <el-card class="content">
                  <p>变动内容：{{item.result}}</p>
                  <p>更新人：{{item.people}}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 抽屉 -->
    <el-drawer title="任务" :visible.sync="drawer3" :with-header="false">
      <el-row class="feedback">
        <el-col :span="24">
          <el-col :span="24" class="title">{{drawer3_task}}</el-col>
          <el-col :span="6" class="title">反馈</el-col>
          <el-col :span="24">
            <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="feedbackContent"></el-input>
          </el-col>
        </el-col>
        <el-col :span="14" :offset="5" class="batton">
          <el-button size="small" type="info" @click="empty">取消</el-button>
          <el-button size="small" type="primary" @click="taskFeedback()">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉 -->
    <el-drawer title="任务" :visible.sync="drawer4" :with-header="false">
      <el-row class="feedback">
        <el-col :span="24">
          <el-col :span="24" class="title">{{drawer4_task}}</el-col>
          <el-col :span="6" class="title">延期原因</el-col>
          <el-col :span="24">
            <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="result"></el-input>
          </el-col>
        </el-col>
        <el-col :span="12" :offset="7" class="batton">
          <el-button size="small" type="info" @click="empty">取消</el-button>
          <el-button size="small" type="primary">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 任务详情抽屉 start -->
    <el-drawer title="任务" :visible.sync="drawer5" :with-header="false">
      <el-scrollbar style="height: 100%" v-loading="drawerLoading">
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
            <span v-else-if="taskData.status==4" class="state_color4">延期</span>
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
            <template v-else>{{taskData.expertTime}}</template>
          </el-col>
          <el-col :span="6" class="title">完成时间：</el-col>
          <el-col :span="18">{{taskData.overTime}}</el-col>
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
                :disabled="resultBan"
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
              </el-col>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-scrollbar>
      <el-row class="batton_pa" v-show="batton_pa" v-if="!resultBan">
        <el-col :span="12" :offset="7" class="batton">
          <el-button size="small" type="info" @click="empty">取消</el-button>
          <el-button size="small" type="primary" @click="changeTaskDeil">完成</el-button>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉-反馈 -->
    <!-- 抽屉 -->
  </div>
</template>
<script>
export default {
  name: 'task',
  data() {
    return {
      loading: false,
      // 查询条件
      clientIdList: [], // 用户列表
      clientId: '', // 用户ID
      serviceId: '', // 业务ID
      isUsual: '', // 专项-1/日常-0
      status: '', // 任务状态
      // 抽屉控制
      drawer: true,
      drawer2: false,
      drawer3: false,
      drawer2_task: '',
      drawer3_task: '',
      // 更换执行人
      changeDoUserNameShow: 'true',
      nextuserList: [], // 下属信息
      nextuserValue: '', // 修改后执行人
      loginState: true, // 避免多次点击
      // 筛选目录
      filtratePro: [], // 通过项目筛选
      filtrateDep: [], // 通过部门筛选
      tasklist: [], // 我发起任务列表
      initiateTaskListTota: 0, // 我发起任务列表总页数
      tasklist_: [], // 我参与任务列表
      participateTaskListTota: 0, // 我参与任务列表总页数
      // 1审核中 2执行中 3已完成 4延期
      tableData2: [],
      result: '',
      tabs_activity: 1,
      table_show: true,
      // 项目类型1选择
      tab1_act: '',
      // 项目类型2选择
      tab2_act: '',
      suggest_list: [],
      // 状态列表
      statusList: [
        { value: '1', label: '进行中' },
        { value: '2', label: '审核中' },
        { value: '3', label: '完成' },
        { value: '4', label: '延期' },
        { value: '5', label: '延期完成' }
      ],
      statusListValue: '',
      // 任务详情
      taskData: {},
      // 反馈任务ID
      taskFeedbackId: '',
      // 反馈内容
      feedbackContent: '',
      // 上传附件
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadUrl: '',
      listProFile: [], // 上传文件信息列表
      suggest_list: [], // 任务反馈意见列表
      file_list: '',
      // 上传文档
      dialogImageUrlResult: '',
      dialogVisibleResult: false,
      disabledResult: false,
      uploadUrl: '',
      listProFileResult: [] // 上传文件信息列表
    }
  },
  // 侦听器
  watch: {},
  // 方法
  methods: {
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
    },
    // 获取新建项目分类
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
        // console.log(data)
        // let business_type_list = []
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
    join_achieve(e, task, state) {
      console.log('我参与完成' + e)
      if (state == 4) {
        this.drawer3 = true
        this.drawer3_task = task
      }
    },
    // 筛选所属项目
    filterName(value, row) {
      return row.name === value
    },
    filterDepartment(value, row) {
      return row.department === value
    },
    task_detail(taskData) {
      // console.log(taskData)
      this.drawer1 = true
      this.statusListValue = taskData.status.toString()
      this.getTaskShow(taskData.taskId)
    },
    // 查询任务列表
    findTaskList() {
      let data0 = {
        type: 0,
        clientId: this.clientId,
        serviceId: this.serviceId,
        isUsual: this.isUsual,
        task: {
          initUserId: 128,
          status: this.status
        },
        pageNum: 1
      }
      let data1 = {
        type: 1,
        clientId: this.clientId,
        serviceId: this.serviceId,
        isUsual: this.isUsual,
        task: {
          initUserId: 128,
          status: this.status
        },
        pageNum: 1
      }
      this.getTasklistAjax(data0)
      this.getTasklistAjax_(data1)
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    // 获取任务详情
    getTaskShow(id) {
      let data = `?id=${id}`
      this.$axios.post('/pmbs/api/task/show' + data).then(this.getTaskShowSuss)
    },
    // 获取任务详情回调
    getTaskShowSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let data = res.data
        this.taskData = data
        this.suggest_list = data.feedbackList
      }
      // console.log(this.taskData)
    },
    // 上传文档
    // 删除
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
      console.log(this.listProFileResult)
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
          updateUserId: 128, // 上传人ID
          fileName: resData.fileName, //'文档名称',
          isPro: 1, // '项目任务需求（0-项目需求，1-任务需求）',
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType //'文档后缀'
        }
        listProFileResult.push(listProFileResultData)
        this.listProFileResult = listProFileResult
        console.log(this.listProFileResult)
      }
    },
    // 修改任务详情
    changeTaskDeil() {
      // console.log('修改任务详情')
      let taskData = this.taskData
      let listProFileResult = this.listProFileResult
      let taskfileList = []
      if (listProFileResult.length == 0) {
        for (let i = 0; i < taskData.taskfileList.length; i++) {
          let element = taskData.taskfileList[i]
          let taskfileListData = {
            fileId: element.fileId,
            fileName: element.fileName,
            suffix: element.suffix,
            localPath: element.localPath,
            proId: element.proId,
            taskId: element.taskId,
            updateUserId: 128
          }
          taskfileList.push(taskfileListData)
        }
      } else {
        taskfileList = listProFileResult
      }

      let data = {
        proId: taskData.proId, // '所属项目id',
        taskId: taskData.taskId, // 任务id
        status: this.statusListValue, // 状态
        overDesc: this.result, // 完成结果
        taskfileList: taskfileList // 上传文档列表
      }
      if (taskData.taskfileList.length != 0 && listProFileResult.length != 0) {
        data.oldFileId = fileId
      }
      this.taskSave(data)
    },
    // 任务新增/修改/完成
    taskSave(data) {
      this.$axios.post('/pmbs/api/task/save', data).then(this.taskSaveSuss)
    },
    // 任务新增/修改/完成回调
    taskSaveSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        // this.projectListJoin = res.data.data
        this.messageWin(res.data.msg)
        this.drawer1 = false
        this.drawer5 = false
        this.result = ''
        this.listProFile = []
        this.listProFileResult = []
        this.getTasklist()
        // console.log(this.projectListJoin)
      }
    },
    // 取消按钮
    cancel() {
      this.drawer1 = false
    },
    // 消息提示
    messageWin(message) {
      // 成功提示
      this.$message({
        message: message,
        type: 'success'
      })
    },
    messageWarning(message) {
      // 警告提示
      this.$message({
        message: message,
        type: 'warning'
      })
    },
    messageError(message) {
      // 错误提示
      this.$message.error(message)
    }
  },
  // 钩子函数
  mounted() {}
}
</script>
<style scoped>
.state_color1 {
  color: rgb(1, 176, 114);
}
.state_color2 {
  color: rgb(236, 185, 21);
}
.state_color3 {
  color: rgb(172, 171, 171);
}
.state_color4 {
  color: rgb(255, 0, 0);
}
.state_color1 >>> input {
  color: rgb(1, 176, 114);
}
.state_color2 >>> input {
  color: rgb(236, 185, 21);
}
.state_color3 >>> input {
  color: rgb(172, 171, 171);
}
.state_color4 >>> input {
  color: rgb(255, 0, 0);
}
.taskDetail .task_details {
  height: 100%;
  padding: 36px 36px 108px 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
  align-items: flex-start;
}
.taskDetail .task_details > .el-col {
  margin-bottom: 18px;
}
.taskDetail .task_details .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.taskDetail .task_details .smname {
  width: 72px;
  text-align: center;
  font-size: 13px;
  color: rgb(162, 162, 162);
}
.taskDetail .task_details .suggest {
  height: 108px;
}
/* .taskDetail .task_details .suggest .el-scrollbar{
  height: 100%;
  overflow-x: scroll;
} */
.taskDetail .task_details .suggest .suggest_list {
  height: 48px;
  margin-bottom: 12px;
}
.taskDetail .task_details .suggest .suggest_list .pop,
.taskDetail .task_details .suggest .suggest_list .time {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: rgb(162, 162, 162);
}
.taskDetail .task_details .suggest .suggest_list .pop {
  text-align: right;
}
.taskDetail .task_details .suggest .suggest_list .content {
  color: #000;
  font-size: 16px;
}
.taskDetail .batton_pa {
  width: 100%;
  padding: 36px;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
}
.taskDetail .task_details >>> .el-select input {
  width: 81px;
  border: none;
  font-size: 16px;
  padding-left: 0;
}
.taskDetail .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.taskDetail .batton button {
  width: 36%;
}
.taskDetail >>> .el-drawer__body {
  height: 100%;
}
.taskDetail >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
