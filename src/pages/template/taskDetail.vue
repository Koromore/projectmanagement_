<template>
  <div class="taskDetail">
      <el-drawer title="任务" :visible.sync="drawer" :with-header="false">
        <el-scrollbar style="height: 100%">
          <el-row class="task_details">
            <el-col :span="6" class="title">执行部门：</el-col>
            <el-col :span="18">{{taskData.deptName}}</el-col>
            <el-col :span="6" class="title">任务类型：</el-col>
            <el-col :span="18">{{taskData.typeName}}</el-col>
            <el-col :span="6" class="title">执行人：</el-col>
            <el-col :span="18">{{taskData.doUserName}}</el-col>
            <el-col :span="6" class="title">状态：</el-col>
            <el-col :span="18">
              <el-select
                v-model="statusListValue"
                size="mini"
                :class="{'state_color1': statusListValue == 1,
                  'state_color2': statusListValue == 2,
                  'state_color3': statusListValue == 3,
                  'state_color4': statusListValue == 4}"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="title">预计时间：</el-col>
            <el-col :span="18">{{taskData.expertTime}}</el-col>
            <el-col :span="6" class="title">完成时间：</el-col>
            <el-col :span="18">{{taskData.overTime}}</el-col>
            <el-col :span="6" class="title">需求：</el-col>
            <el-col :span="18">{{taskData.remark}}</el-col>
            <el-col :span="6" class="title">附件：</el-col>
            <el-col :span="18">
              <div class="smname" v-for="item in taskData.proFileList" :key="item.index">
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
            </el-col>
            <el-divider content-position="right"></el-divider>
            <el-col :span="6" class="title">完成结果：</el-col>
            <el-col :span="18">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="result">完成结果：描述</el-input>
            </el-col>
            <el-col :span="6" class="title">附件：</el-col>
            <el-col :span="18">
              <el-upload
                action="/pmbs/file/upload?upType=1&demandType=1"
                list-type="picture-card"
                
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisibleResult" class="upload_list">
                <img width="100%" :src="dialogImageUrlResult" alt />
              </el-dialog>
            </el-col>
            <el-divider content-position="right"></el-divider>
            <el-col :span="6" class="title">反馈意见：</el-col>
            <el-col :span="18" class="suggest">
              <el-scrollbar style="height: 100%;">
                <el-col
                  :span="23"
                  class="suggest_list"
                  v-for="item in suggest_list"
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
        <el-row class="batton_pa">
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info" @click="cancel">取消</el-button>
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
