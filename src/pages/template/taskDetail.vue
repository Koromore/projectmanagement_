<template>
  <div class="taskDetail">
    <!-- 任务详情抽屉 start -->
    <el-drawer title="任务" :visible.sync="drawer5" :with-header="false" @close="close">
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
              v-if="taskData.isIgnore != true && taskData.listOaUser.length > 1 && taskData.status != 2 && taskData.status != 3 && taskData.status != 5"
            >更换</el-link>
          </el-col>
          <el-col :span="6" class="title">状态：</el-col>
          <el-col :span="18">
            <el-select
              v-model="statusListValue"
              size="mini"
              :class="{'state_color1': taskData.status == 1,
                  'state_color2': taskData.status == 2,
                  'state_color4': taskData.status == 4}"
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
                v-for="item in statusList_"
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
            <template v-else>{{$date(taskData.expertTime)}}</template>
          </el-col>
          <el-col :span="6" class="title">完成时间：</el-col>
          <el-col :span="18">{{$time(taskData.overTime)}}</el-col>
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
                action="/pmbs/file/upload?upType=1&demandType=0"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :fileList="fileList0"
                :limit="1"
                class="elementUpload"
              >
                <el-button size="mini" type="primary" @click="uploadIf(0)" v-show="disabled0">点击上传附件</el-button>
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
                :fileList="fileList1"
                :limit="1"
                class="elementUpload"
              >
                <el-button size="mini" type="primary" @click="uploadIf(1)" v-show="disabled1">点击上传文档</el-button>
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
                <el-col :span="12" class="time">{{$time(item.updateTime)}}</el-col>
                <el-col :span="12" class="pop">{{item.deptName}}-{{item.feedbackUserName}}</el-col>
                <el-col :span="24" class="content">{{item.feedback}}</el-col>
                <el-col :span="24" class="fileListBox">
                  <div
                    class="fileList"
                    v-for="items in item.feedbackFileList"
                    :key="items.index"
                    @click="download(items)"
                  >
                    <img
                      v-if="items.suffix == 'doc' || items.suffix == 'docx'"
                      src="static/images/document/word.png"
                      width="24"
                      alt
                      srcset
                    />
                    <img
                      v-else-if="items.suffix == 'xls' || items.suffix == 'xlsx'"
                      src="static/images/document/excle.png"
                      width="24"
                      alt
                      srcset
                    />
                    <img
                      v-else-if="items.suffix == 'ppt' || items.suffix == 'pptx'"
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
      <el-row
        class="batton_pa"
        v-show="batton_pa"
        v-if="taskData.status == 1 || taskData.status == 4"
      >
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
  props: ['taskId'],
  // {
  //   transferTask: Object
  // }, //transferTask
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      // taskId: 173, // 任务ID
      // 任务详情
      taskData: {
        listOaUser: []
      },
      drawerLoading: false,
      proId: '', // 项目ID
      proName: '', // 项目NAME
      project_style: '',
      closeType: 0, // 关闭抽屉传递参数  取消/完成
      drawer5: false,
      sousuo_show: false,
      sousuo_input: '', // 所搜框内容
      // 1执行中 2审核中 3已完成 4延期
      // 我参与 我发起选项卡
      tabs_activity: 1,
      table_show: true,
      // 新增
      // 禁止选择当前时间之前的时间
      proExpertTime: '',
      pickerOptions: {},
      // 状态列表
      statusList: [
        { value: 1, label: '执行中' },
        { value: 2, label: '完成' }
      ],
      statusList_: [
        { value: 2, label: '完成' },
        { value: 4, label: '延期' }
      ],
      statusListValue: '',
      style1: '',
      // 项目类型选择
      task_type: [],
      task_type_value: '',

      batton_pa: true, // 是否显示完成按钮
      result: '', // 完成结果
      resultBan: false, // 完成成果禁止输入
      // 上传附件
      disabled0: false,
      disabled1: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadUrl: '',
      listProFile: [], // 上传文件信息列表
      suggest_list: [], // 任务反馈意见列表
      fileList0: [],
      // 上传文档
      dialogImageUrlResult: '',
      dialogVisibleResult: false,
      disabledResult: false,
      uploadUrl: '',
      listProFileResult: [], // 上传文件信息列表
      fileList1: [],
      oldFileId: '',
      taskFileId: '',
      // 更换执行人
      changeDoUserNameShow: 'true',
      nextuserList: [], // 下属信息
      nextuserValue: '', // 修改后执行人
      // 详情内更换执行人
      changeNameShow: false,
      userValue: '', // 修改后执行人
      knowUserShow: true // 知晓人添加任务按钮判断
    }
  },
  // 侦听器
  watch: {
    taskId: function (newValue,oldValue){
      // handler(newValue, oldValue) {
        // console.log(newValue)
        let taskId = this.taskId
        // console.log(newValue)
        if (taskId) {
          this.getDepTypeList() // 任务类型获取
          this.task_detail() // 任务详情
          this.pickerOptionsTime()
        }
      // },
      // deep: true
    },
    listProFile: function (newValue,oldValue){
      if (newValue.length == 0) {
        this.disabled0 = true
      }else{
        this.disabled0 = false
      }
    },
    listProFileResult: function (newValue,oldValue){
      if (newValue.length == 0) {
        this.disabled1 = true
      }else{
        this.disabled1 = false
      }
    },
  },
  // 方法
  methods: {
    ///////// 任务类型获取 start /////////
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
    ///////// 任务类型获取 end /////////
    ///////// 修改执行人 start /////////
    changeDoUserName(e, list) {
      this.changeDoUserNameShow = e
      this.getNextuserList(list)
    },
    // 获取执行人下属
    getNextuserList(list) {
      let data = list
      let nextuser = []
      for (let i = 0; i < data.length; i++) {
        let element = data[i]
        let nextuserData = {
          value: element.userId,
          label: element.realName
        }
        nextuser.push(nextuserData)
      }
      this.nextuserList = nextuser
    },
    // 详情内修改执行人
    changeName() {
      this.changeNameShow = true
    },
    ///////// 修改执行人 end /////////
    task_detail() {
      // console.log(taskData)
      this.drawer5 = true
      // this.statusListValue = taskData.status.toString()
      let userId = this.userId
      let taskId = this.taskId
      let data = `?userId=${userId}&id=${taskId}`
      this.getTaskShow(data)
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    ///////// 禁止时间 start /////////
    pickerOptionsTime() {
      let expertTime = this.$store.state.proExpertTime
      this.pickerOptions = {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() - 8.64e7 ||
            time.getTime() > new Date(expertTime).getTime()
          )
        }
      }
    },
    ///////// 禁止时间 end /////////
    ///////// 获取任务详情 start /////////
    getTaskShow(data) {
      this.drawerLoading = true
      this.$axios.post('/pmbs/api/task/show' + data).then(this.getTaskShowSuss)
    },
    // 获取任务详情回调
    getTaskShowSuss(res) {
      this.drawerLoading = false
      // console.log(res)
      if (res.status == 200) {
        let data = res.data.data
        this.taskData = data
        this.listProFile = data.proFileList
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
    ///////// 获取任务详情 end /////////
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
        let listProFile = this.listProFile
        // console.log(listProFile)
        let listProFileData = {
          proId: this.taskData.proId || '', // 项目ID
          taskId: this.taskData.taskId || '', // 任务ID
          fileId: this.taskFileId, // 文档ID
          fileName: resData.fileName, //'附件名称',
          isPro: 1, // '项目任务需求（0-项目需求，1-任务需求）',
          deleteFlag: false, // 是否删除
          ptId: this.taskData.taskId || '', //所属任务ID
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType //'文档后缀'
        }
        listProFile.push(listProFileData)
        this.listProFile = listProFile
        console.log(this.listProFile)
      }
    },
    // 删除
    handleRemove(file) {
      // console.log(file)
      let data = file
      // let listProFile = this.listProFile
      // if (listProFile.fileId) {
        this.taskFileId = data.fileId
        this.listProFile = []
      // } else {
      //   this.listProFile = []
      // }
      // console.log(file)
      // for (let i = 0; i < listProFile.length; i++) {
      //   let element = listProFile[i]
      //   if (element.fileId == data.fileId) {
      //     // listProFile[i].deleteFlag = true
      //     listProFile.splice(i, 1)
      //     // console.log('删除')
      //   }
      // }
      // this.listProFile = listProFile
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
      }
    },
    // 删除
    handleRemoveResult(file) {
      // console.log(file)
      let data = file
      // let listProFileResult = this.listProFileResult
      // if (listProFileResult.fileId) {
        this.oldFileId = file.fileId
        this.listProFileResult = []
      // } else {
      //   this.listProFileResult = []
      // }
    },
    ///////// 任务成果附件上传 end /////////

    ///////// 上传附件判断 start /////////
    uploadIf(type){
      let listProFile = this.listProFile
      let listProFileResult = this.listProFileResult
      if(type == 0){
        if (listProFile.length != 0) {
          this.messageWarning('只能上传一个文件')
          // return false
        }
      }else if(type == 1){
        if (listProFileResult.length != 0) {
          this.messageWarning('只能上传一个文件')
          // return false
        }
      }
    },
    ///////// 上传附件判断 end /////////

    ///////// 修改任务详情 start /////////
    changeTaskDeil() {
      this.closeType = 1
      this.drawer5 = false
      let taskData = this.taskData // 任务详情
      let listProFile = this.listProFile // 需求文档
      let listProFileResult = this.listProFileResult // 结果文档
      let status = this.statusListValue
      taskData.proFileList = listProFile
      taskData.taskfileList = listProFileResult
      taskData.status = status
      delete taskData.feedbackList
      // console.log(taskData)
      this.taskSave(taskData)
    },
    ///////// 修改任务详情 end /////////
    ///////// 任务修改/完成 start /////////
    taskSave(data) {
      // console.log(this.new_task.presetTime)
      // console.log(expertTime)
      this.$axios.post('/pmbs/api/task/save', data).then(this.taskSaveSuss)
    },
    // 任务修改/完成回调
    taskSaveSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        // this.projectListJoin = res.data.data
        this.messageWin(res.data.msg)

        this.result = ''
        this.listProFile = []
        this.listProFileResult = []
        // this.getParams()
        // console.log(this.projectListJoin)
      }
    },
    ///////// 任务新增/修改/完成 end /////////
    // 取消按钮
    empty() {
      this.drawer5 = false
    },
    close() {
      let closeType = this.closeType
      this.$emit('closeDrawer', closeType)
      // console.log('关闭抽屉')
      this.taskFileId = ''
      this.oldFileId = ''
      this.closeType = 0
      this.changeNameShow = false
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
  mounted() {
    // console.log(this.transferTask)
  }
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
.taskDetail .task_details .title:nth-of-type(1) {
  text-align: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 18px;
  font-weight: 600;
  font-size: 18px;
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
  cursor: pointer;
}
.taskDetail .task_details .suggest {
  height: 172px;
}
/* .taskDetail .task_details .suggest .el-scrollbar{
  height: 100%;
  overflow-x: scroll;
} */
.taskDetail .task_details .suggest .suggest_list {
  /* height: 48px; */
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
  width: 108px;
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
