<template>
  <div class="task" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <el-col :span="5" class="">
          <el-col :span="4" class="title">客户</el-col>
          <el-col :span="20">
            <el-select
              v-model="clientId"
              filterable
              clearable
              placeholder="全部"
              size="small"
              class="filtrateClient"
            >
              <el-option
                v-for="item in userclientIdList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="7" class="tab tab1">
          <el-button-group>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab1_change(item.businessId)"
              :class="[serviceId==item.businessId ? 'act' : '']"
              v-for="(item, index) in allBusinessList[0]"
              :key="index"
            >{{item.businessName}}</el-button>
            <el-button
              type="primary"
              plain
              size="small"
              icon="el-icon-more"
              @click.stop="tab1_more()"
              :class="[moreShow==true ? 'act more' : 'more']"
              v-if="allBusinessList[1]"
              style="border-left: 0;"
            ></el-button>
          </el-button-group>
          <el-card class="box-card" v-show="moreShow">
            <el-button-group
              v-for="(items, index) in allBusinessList"
              :key="index"
              v-show="index != 0"
              class="moreBus"
            >
              <el-button
                type="primary"
                plain
                size="small"
                @click.stop="tab1_change(item.businessId)"
                :class="[serviceId==item.businessId ? 'act' : '']"
                v-for="(item, index) in items"
                :key="index"
              >{{item.businessName}}</el-button>
            </el-button-group>
          </el-card>
        </el-col>
        <el-col :span="4" class="tab tab2">
          <el-button-group>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab2_change(1,1)"
              :class="[tab2_act=='1' ? 'act' : '']"
            >专项</el-button>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab2_change(2,0)"
              :class="[tab2_act=='2' ? 'act' : '']"
            >日常</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="8" class="tab tab3">
          <el-button-group>
            <!-- <el-tooltip class="item" effect="dark" content="新任务" placement="bottom"> -->
            <el-button type="primary" size="small" @click="tab3_change(1)">新任务</el-button>
            <!-- </el-tooltip> -->
            <!-- <el-tooltip class="item" effect="dark" content="延期" placement="bottom"> -->
            <el-button type="danger" size="small" @click="tab3_change(4)">延期</el-button>
            <!-- </el-tooltip> -->
            <!-- <el-tooltip class="item" effect="dark" content="审核中" placement="bottom"> -->
            <el-button type="warning" size="small" @click="tab3_change(2)">审核中</el-button>
            <!-- </el-tooltip> -->
            <!-- <el-tooltip class="item" effect="dark" content="执行中" placement="bottom"> -->
            <el-button type="success" size="small" @click="tab3_change(1)">执行中</el-button>
            <!-- </el-tooltip> -->
          </el-button-group>
        </el-col>
      </el-col>
      <!--  -->
      <el-col :span="24" class="tabs" v-if="userId != 152">
        <div @click="table_tab(1)" :class="[tabs_activity==1 ? 'act' : '']">我参与</div>
        <div @click="table_tab(0)" :class="[tabs_activity==0 ? 'act' : '']">我发起</div>
      </el-col>
      <!-- 我参与 -->
      <el-col :span="24" class="table table2" v-show="tabs_activity==1">
        <el-table
          v-loading="loading"
          ref="filterTable"
          :data="tasklist_"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          align="left"
        >
          <el-table-column prop="taskName" label="任务名称" show-overflow-tooltip min-width="115">
            <el-link
              slot-scope="scope"
              type="primary"
              @click="task_detail(scope.row,1)"
            >{{scope.row.taskName}}</el-link>
          </el-table-column>
          <el-table-column prop="proName" label="所属项目" show-overflow-tooltip min-width="115"></el-table-column>
          <el-table-column prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.isIgnore == true" class="state_color3">忽略</span>
              <span v-else-if="scope.row.status == 1" class="state_color1">执行中</span>
              <span v-else-if="scope.row.status == 2" class="state_color2">审核中</span>
              <span v-else-if="scope.row.status == 3" class="state_color3">完成</span>
              <span v-else-if="scope.row.status == 4" class="state_color4">延期</span>
              <span v-else-if="scope.row.status == 5" class="state_color3">延期完成</span>
            </template>
          </el-table-column>
          <el-table-column prop="doUserName" label="执行人" width="180">
            <template slot-scope="scope">
              <div v-show="changeDoUserNameShow != scope.$index" class="doUserName">
                <span>{{scope.row.doUserName}}</span>
                <!-- <el-link
                  class="change"
                  type="primary"
                  @click.stop="changeDoUserName(scope.$index,scope.row.listOaUser)"
                  v-show="scope.row.isIgnore != true && scope.row.listOaUser.length > 1 && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 5"
                >-->
                <!-- <i class="el-icon-edit"></i> -->
                <img
                  src="static/images/task/change.png"
                  width="18"
                  alt=""
                  srcset=""
                  @click.stop="changeDoUserName(scope.$index,scope.row.listOaUser)"
                  v-show="scope.row.isIgnore != true && scope.row.listOaUser.length > 1 && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 5"
                >
                <!-- </el-link> -->
              </div>
              <div v-show="changeDoUserNameShow == scope.$index">
                <el-select
                  v-model="nextuserValue"
                  filterable
                  placeholder="请选择"
                  size="mini"
                  clearable
                  style="width:99px;"
                >
                  <el-option
                    v-for="item in nextuserList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button
                  slot="append"
                  type="primary"
                  size="mini"
                  @click.stop="changeDoUserNameAffirm(scope.row)"
                >确认</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="expertTime" label="预计时间" sortable width="110">
            <template slot-scope="scope">{{$date(scope.row.expertTime)}}</template>
          </el-table-column>
          <el-table-column prop="overTime" label="完成时间" sortable width="110">
            <template slot-scope="scope">{{$date(scope.row.overTime)}}</template>
          </el-table-column>
          <el-table-column prop="initUserName" label="下达人" min-width="80"></el-table-column>
          <el-table-column prop="taskfileList" show-overflow-tooltip label="成果" min-width="90">
            <div
              class="taskfile"
              slot-scope="scope"
              v-if="scope.row.taskfileList.length != 0"
              @click="download(scope.row.taskfileList[0])"
            >
              <img
                v-if="scope.row.taskfileList[0].suffix == 'doc' || scope.row.taskfileList[0].suffix == 'docx'"
                src="static/images/document/word.png"
                width="16"
                alt=""
                srcset=""
              >
              <img
                v-else-if="scope.row.taskfileList[0].suffix == 'xls' || scope.row.taskfileList[0].suffix == 'xlsx'"
                src="static/images/document/excle.png"
                width="16"
                alt=""
                srcset=""
              >
              <img
                v-else-if="scope.row.taskfileList[0].suffix == 'ppt' || scope.row.taskfileList[0].suffix == 'pptx'"
                src="static/images/document/ppt.png"
                width="16"
                alt=""
                srcset=""
              >
              <img v-else src="static/images/document/other.png" width="16" alt="" srcset="">
              <el-link type="primary" class="filenametext">{{scope.row.taskfileList[0].fileName}}</el-link>
            </div>
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
            width="160"
            filter-placement="bottom-end"
            v-if="userId!=152"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                v-if="scope.row.isIgnore != true && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 5"
                type="info"
                slot="reference"
                @click="join_redact(scope.row.taskId)"
              >忽略</el-button>
              <el-button
                size="mini"
                v-if="scope.row.isIgnore != true && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 5"
                type="primary"
                slot="reference"
                @click="task_detail(scope.row,1)"
              >完成</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="page">
          <el-pagination
            background=""
            layout="total, prev, pager, next"
            :page-size="30"
            :total="participateTaskListTota"
            @current-change="participateTaskList"
          ></el-pagination>
        </el-col>
      </el-col>
      <!-- 我发起 -->
      <el-col :span="24" class="table table1" v-show="tabs_activity==0">
        <el-table
          v-loading="loading"
          ref="filterTable"
          :data="tasklist"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{'text_aling':'left'}"
        >
          <el-table-column prop="taskName" label="任务名称" show-overflow-tooltip min-width="210">
            <template slot-scope="scope">
              <el-link type="primary" @click="task_detail(scope.row,0)">{{scope.row.taskName}}</el-link>
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.faTaskName"
                placement="bottom"
              >
                <span v-if="scope.row.faTask != 0" class="faTask">父</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="proName"
            label="所属项目"
            column-key="name"
            show-overflow-tooltip
            min-width="210"
          >
            <!-- :filters="filtratePro"
            :filter-method="filterName"-->
          </el-table-column>
          <el-table-column prop="deptName" label="部门" min-width="120">
            <!-- :filters="filtrateDep"
            :filter-method="filterDepartment"-->
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.isIgnore == true" class="state_color3">忽略</span>
              <span v-else-if="scope.row.status == 1" class="state_color1">执行中</span>
              <span v-else-if="scope.row.status == 2" class="state_color2">审核中</span>
              <span v-else-if="scope.row.status == 3" class="state_color3">完成</span>
              <span v-else-if="scope.row.status == 4" class="state_color4">延期</span>
              <span v-else-if="scope.row.status == 5" class="state_color3">延期完成</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="faTaskName" label="父任务" min-width="130"></el-table-column> -->
          <el-table-column prop="expertTime" label="预计时间" sortable min-width="100">
            <template slot-scope="scope">{{$date(scope.row.expertTime)}}</template>
          </el-table-column>
          <el-table-column prop="tag" label="操作" min-width="160" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                @click="feedback(scope.row)"
                v-if="scope.row.isIgnore != true && scope.row.status == 1 || scope.row.status == 2 || scope.row.status == 4"
              >反馈</el-button>
              <el-button
                size="mini"
                v-if="scope.row.isIgnore != true && scope.row.status == 2"
                type="primary"
                slot="reference"
                @click="sponsor_achieve(scope.row)"
              >完成</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="page">
          <el-pagination
            background=""
            layout="total, prev, pager, next"
            :page-size="30"
            :total="initiateTaskListTota"
            @current-change="initiateTaskList"
          ></el-pagination>
        </el-col>
      </el-col>
      <!--  -->
      <!-- 任务详情抽屉 start -->
      <taskDetail :taskId="taskId" @closeDrawer="closeDrawer"></taskDetail>
      <!-- 任务详情抽屉 end -->
      <!-- 抽屉-反馈 -->
      <el-drawer title="任务" :visible.sync="drawer2" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer2_task}}</el-col>
            <el-col :span="6" class="title snow">反馈</el-col>
            <el-col :span="24">
              <el-input
                type="textarea"
                :rows="9"
                placeholder="请输入内容"
                v-model="feedbackContent"
                maxlength="300"
                show-word-limit
              ></el-input>
            </el-col>
            <el-col :span="24" class="Upload">
              <el-divider></el-divider>
              <el-upload
                action="/pmbs/file/upload?upType=1&demandType=1"
                :on-remove="handleRemoveFeedback"
                :on-success="handleSuccessFeedback"
                ref="upload"
                :limit="1"
                class="elementUpload"
              >
                <el-button size="mini" type="primary">点击上传文档</el-button>
              </el-upload>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info" @click="empty">取消</el-button>
            <el-button size="small" type="primary" @click="taskFeedback">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer3" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer3_task}}</el-col>
            <el-col :span="6" class="title">延期原因</el-col>
            <el-col :span="24">
              <el-input
                type="textarea"
                :rows="9"
                placeholder="请输入内容"
                v-model="cause"
                maxlength="300"
                show-word-limit
              ></el-input>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info" @click="empty">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
    </el-row>
  </div>
</template>
<script>
import taskDetail from '@/pages/template/taskDetail'

export default {
  name: 'task',
  props: {
    allBusinessList: Array,
    userclientIdList: Array,
    clickCloseNum: Number
  },
  components: {
    taskDetail
  },
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      loading: false,
      // drawerLoading: false,
      taskId: 0,
      // 项目类型选择
      task_type: [],
      task_type_value: '',
      // 查询条件
      pageNum0: 1,
      pageNum1: 1,
      businessList: this.$store.state.businessList, // 业务列表
      moreShow: false, // 显示更多业务
      clientIdList: this.$store.state.clientIdList, // 用户列表
      clientId: '', // 用户ID
      serviceId: '', // 业务ID
      isUsual: '', // 专项-1/日常-0
      status: '', // 任务状态
      // 抽屉控制
      drawer1: false,
      drawer2: false,
      drawer3: false,
      drawer2_task: '',
      drawer3_task: '',
      // 更换执行人
      changeDoUserNameShow: 'true',
      nextuserList: [], // 下属信息
      nextuserValue: '', // 修改后执行人
      loginState: true, // 避免多次点击
      project_style: '',
      // 筛选目录
      filtratePro: [], // 通过项目筛选
      filtrateDep: [], // 通过部门筛选
      tasklist: [], // 我发起任务列表
      initiateTaskListTota: 0, // 我发起任务列表总页数
      tasklist_: [], // 我参与任务列表
      participateTaskListTota: 0, // 我参与任务列表总页数
      // 1审核中 2执行中 3已完成 4延期
      tableData2: [],
      result: '', // 完成成果
      resultBan: false, // 完成成果禁止输入
      cause: '', // 延期原因
      tabs_activity: 1,
      // 项目类型1选择
      tab1_act: '',
      // 项目类型2选择
      tab2_act: '',
      suggest_list: [],
      // 状态列表
      statusList: [{ value: 1, label: '执行中' }, { value: 2, label: '完成' }],
      statusList_: [{ value: 2, label: '完成' }, { value: 4, label: '延期' }],
      statusListValue: '',
      // 任务详情
      taskData: {},
      // 禁止选择当前时间之前的时间
      proExpertTime: '',
      pickerOptions: {},
      // 反馈任务ID
      taskFeedbackId: '',
      projFeedbackId: '',
      // 反馈内容
      feedbackContent: '',
      feedbackFileList: [], // 反馈附件
      // 上传附件
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadUrl: '',
      listProFile: [], // 上传文件信息列表
      suggest_list: [], // 任务反馈意见列表
      fileList0: [],
      // 上传文档
      updateBan: false, // 上传文档禁止
      dialogImageUrlResult: '',
      dialogVisibleResult: false,
      disabledResult: false,
      uploadUrl: '',
      listProFileResult: [], // 上传文件信息列表
      fileList1: [],
      oldFileId: '',
      // 详情内更换执行人
      changeNameShow: false,
      userValue: '' // 修改后执行人
    }
  },
  // 侦听器
  watch: {
    // 用户选择侦听
    clientId: function(newQuestion, oldQuestion) {
      let id = this.tabs_activity
      this.findTaskList(id)
    },
    // 业务类型侦听
    serviceId: function(newQuestion, oldQuestion) {
      let id = this.tabs_activity
      this.findTaskList(id)
    },
    // 专项/日常侦听
    isUsual: function(newQuestion, oldQuestion) {
      let id = this.tabs_activity
      this.findTaskList(id)
    },
    // 任务状态侦听
    status: function(newQuestion, oldQuestion) {
      let id = this.tabs_activity
      this.findTaskList(id)
    },
    tabs_activity: function(newQuestion, oldQuestion) {
      let id = this.tabs_activity
      this.findTaskList(id)
    },
    clickCloseNum: function(newQuestion, oldQuestion) {
      this.moreShow = false
      this.changeDoUserNameShow = 'true'
      // console.log(this.clickCloseNum)
    }
  },
  // 方法
  methods: {
    pickerOptionsTime() {
      let expertTime = this.proExpertTime
      this.pickerOptions = {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() - 8.64e7 ||
            time.getTime() > new Date(expertTime).getTime()
          )
        }
      }
    },
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
      // this.project_style = 'height:' + height + 'px;'
    },
    // 选项卡
    table_tab(e) {
      this.tabs_activity = e
    },
    tab1_change(id) {
      // console.log(e)
      let serviceId = this.serviceId
      // let tab1_act = this.tab1_act
      if (serviceId == id) {
        this.serviceId = ''
      } else {
        this.serviceId = id
      }
    },
    tab1_more(e) {
      let moreShow = this.moreShow
      this.moreShow = !moreShow
    },
    //
    tab2_change(e, id) {
      // console.log(e)
      let tab2_act = this.tab2_act
      if (tab2_act == e) {
        this.tab2_act = ''
        this.isUsual = ''
      } else if (e == 1) {
        this.tab2_act = 1
        this.isUsual = id
      } else if (e == 2) {
        this.tab2_act = 2
        this.isUsual = id
      }
    },
    //
    tab3_change(id) {
      let status = this.status
      if (status == id) {
        this.status = ''
      } else {
        this.status = id
      }
    },
    // 反馈按钮
    feedback(taskData) {
      // console.log('反馈' + id)
      this.drawer2 = true
      this.drawer2_task = taskData.proName + '-' + taskData.taskName
      this.taskFeedbackId = taskData.taskId
      this.projFeedbackId = taskData.proId

      let feedbackFileList = this.feedbackFileList
      if (feedbackFileList.length != 0) {
        this.$refs['upload'].clearFiles()
        this.feedbackFileList = []
      }
    },
    sponsor_achieve(taskData) {
      this.$confirm('是否确认此操作？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          let expertTime = new Date(
            new Date(taskData.expertTime).getTime() + 24 * 60 * 60 * 1000
          )
          let newTime = new Date()
          let data = {
            taskId: taskData.taskId,
            expertTime: taskData.expertTime,
            status: 3
          }
          if (expertTime < newTime) {
            data.status = 5
          }
          this.approveTask(data)
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 任务完成
    approveTask(data) {
      this.$axios.post('/pmbs/api/task/approveTask', data).then(res => {
        if (res.status == 200) {
          this.messageWin(res.data.msg)
          this.getTasklist(this.tabs_activity)
        }
      })
    },
    join_redact(taskId) {
      this.$confirm('是否忽略此任务', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          let data = `taskId=${taskId}`
          this.ignoreTask(data)
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: '放弃'
          })
        })
    },
    join_achieve(e, task, state) {
      // console.log('我参与完成' + e)
      if (state == 4) {
        this.drawer3 = true
        this.drawer3_task = task
      }
    },
    ignoreTask(data) {
      this.$axios.post('/pmbs/api/task/ignoreTask?' + data).then(res => {
        if (res.status == 200) {
          this.messageWin(res.data.msg)
          this.getTasklist(this.tabs_activity)
        }
      })
    },
    // http://176.10.10.148:8089/pmbs/api/task/ignoreTask?taskId=1
    // this.$axios
    // .post('/pmbs/api/task/save', data)
    // .then(this.changeDoUserNameAffirmSuss)
    // 筛选所属项目
    filterName(value, row) {
      return row.name === value
    },
    filterDepartment(value, row) {
      return row.department === value
    },
    task_detail(taskData, type) {
      // let userId = this.userId
      this.taskId = taskData.taskId
    },
    // 修改执行人按钮
    changeDoUserName(e, list) {
      this.changeDoUserNameShow = e
      // console.log(id)
      this.getNextuserList(list)
    },
    // 获取执行人下属
    getNextuserList(list) {
      let data = list
      // console.log(data)
      let nextuser = []
      if (data != null) {
        for (let i = 0; i < data.length; i++) {
          let element = data[i]
          let nextuserData = {
            value: element.userId,
            label: element.realName
          }
          nextuser.push(nextuserData)
        }
      }
      this.nextuserList = nextuser
    },
    // 确认修改
    changeDoUserNameAffirm(data) {
      // console.log(data)
      let nextuserValue = this.nextuserValue
      if (nextuserValue == '') {
        this.changeDoUserNameShow = 'true'
      } else {
        data.doUserId = nextuserValue
        data.proFileList = []
        this.$axios
          .post('/pmbs/api/task/save', data)
          .then(this.changeDoUserNameAffirmSuss)
      }
    },
    changeDoUserNameAffirmSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        this.messageWin('执行人修改成功')
        this.getTasklist(1)
        this.changeDoUserNameShow = 'true'
      }
    },
    // 查询任务列表
    findTaskList(id) {
      // let userId = this.$store.state.user.userId
      let data0 = {
        type: 0,
        clientId: this.clientId,
        serviceId: this.serviceId,
        isUsual: this.isUsual,
        task: {
          initUserId: this.userId,
          status: this.status
        },
        pageNum: 1,
        pageSize: 30
      }
      let data1 = {
        type: 1,
        clientId: this.clientId,
        serviceId: this.serviceId,
        isUsual: this.isUsual,
        task: {
          initUserId: this.userId,
          status: this.status
        },
        pageNum: 1,
        pageSize: 30
      }
      if (id == 0) {
        this.getTasklistAjax(data0)
      } else if (id == 1) {
        this.getTasklistAjax_(data1)
      }
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    // 获取任务列表
    getTasklist(id) {
      // console.log("123")
      let data0 = {
        type: 0,
        task: {
          initUserId: this.userId
        },
        pageNum: 1,
        pageSize: 30
      }
      let data1 = {
        type: 1,
        task: {
          initUserId: this.userId
        },
        pageNum: 1,
        pageSize: 30
      }
      if (id == 0) {
        this.getTasklistAjax(data0)
      } else if (id == 1) {
        this.getTasklistAjax_(data1)
      }
    },
    // 获取我发起任务列表
    getTasklistAjax(data0) {
      this.loading = true
      this.$axios
        .post('/pmbs/api/task/listAjax', data0)
        .then(this.getTasklistAjaxSuss)
    },
    // 获取我发起任务列表回调
    getTasklistAjaxSuss(res) {
      this.loading = false
      if (res.status == 200) {
        let data = res.data.data.items
        this.tasklist = data
        this.initiateTaskListTota = res.data.data.totalRows // 我发起任务列表总页数
      }
      // console.log(res)
    },
    // 获取我参与任务列表
    getTasklistAjax_(data1) {
      this.loading = true
      this.$axios
        .post('/pmbs/api/task/listAjax', data1)
        .then(this.getTasklistAjax_Suss)
    },
    // 获取我参与任务列表回调
    getTasklistAjax_Suss(res) {
      this.loading = false
      if (res.status == 200) {
        let data = res.data.data.items
        this.tasklist_ = data
        this.participateTaskListTota = res.data.data.totalRows // 我参与任务列表总页数
      }
      // console.log(res)
    },
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
        this.messageWin(res.data.msg)
        this.result = ''
        this.listProFile = []
        this.listProFileResult = []
        this.getTasklist(0)
        // console.log(this.projectListJoin)
      }
    },
    ///////// 任务新增/修改/完成 end /////////
    // 任务删除
    taskDelete(id) {
      let data = `?id=${id}`
      this.$axios.post('/pmbs/api/task/delete' + data).then(this.taskDeleteSuss)
    },
    // 获取任务详情回调
    taskDeleteSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let data = res.data
        // this.taskData = data
      }
    },
    ///////// 上传附件 start /////////
    handleRemoveFeedback(file) {
      // console.log(file)
      let feedbackFileList = this.feedbackFileList
      let data = file.response.data
      for (let i = 0; i < feedbackFileList.length; i++) {
        let element = feedbackFileList[i]
        if (element.localPath == data.path) {
          feedbackFileList.splice(i, 1)
        }
      }
      this.feedbackFileList = feedbackFileList
      // console.log(feedbackFileList)
    },
    handleSuccessFeedback(file) {
      let data = file.data
      // console.log(data)
      let feedbackFileList = this.feedbackFileList
      let time = new Date()
      let feedbackFileListData = {
        createTime: time,
        deleteFlag: false,
        feedbackId: '',
        fileId: '',
        fileName: data.fileName,
        localPath: data.path,
        suffix: data.fileType,
        taskId: '',
        updateTime: time
      }
      feedbackFileList.push(feedbackFileListData)
    },
    ///////// 上传附件 end /////////
    // 任务反馈
    taskFeedback() {
      let updateTime = new Date()
      let taskId = this.taskFeedbackId
      let feedbackFileList = this.feedbackFileList
      for (let i = 0; i < feedbackFileList.length; i++) {
        const element = feedbackFileList[i]
        feedbackFileList[i].taskId = taskId
      }
      let data = {
        // deleteFlag: true,
        feedback: this.feedbackContent, // 反馈内容
        feedbackFileList: feedbackFileList, // 反馈附件
        initUserId: this.userId, // 反馈人ID
        proId: this.projFeedbackId,
        taskId: taskId, // 反馈任务ID
        updateTime: updateTime // 反馈时间
      }
      console.log(data)
      if (data.feedback == '') {
        this.messageError('信息不能为空')
      } else {
        this.$axios
          .post('/pmbs/api/project/taskfeedback', data)
          .then(this.taskFeedbackSuss)
      }
    },
    // 任务反馈回调
    taskFeedbackSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        this.messageWin('反馈成功')
        this.drawer2 = false
        this.feedbackContent = ''
        this.taskFeedbackId = ''
        // 重新获取任务列表
        this.getTasklist(0) // 重新获取任务列表
      }
    },
    // 取消按钮
    cancel() {
      this.drawer1 = false
    },
    // 我发起分页
    initiateTaskList(page) {
      this.pageNum0 = page
      let data0 = {
        type: 0,
        clientId: this.clientId,
        serviceId: this.serviceId,
        isUsual: this.isUsual,
        task: {
          initUserId: this.userId,
          status: this.status
        },
        pageNum: page,
        pageSize: 30
      }
      this.getTasklistAjax(data0)
    },
    // 我参与分页
    participateTaskList(page) {
      this.pageNum1 = page
      let data1 = {
        type: 1,
        clientId: this.clientId,
        serviceId: this.serviceId,
        isUsual: this.isUsual,
        task: {
          initUserId: this.userId,
          status: this.status
        },
        pageNum: page,
        pageSize: 30
      }
      this.getTasklistAjax_(data1)
    },
    // 详情内修改执行人
    changeName() {
      this.changeNameShow = true
    },
    download(row) {
      let localPath = row.localPath
      // console.log("123")
      let a = document.createElement('a')
      a.download = `${row.fileName}.${row.suffix}`
      a.setAttribute('href', 'http://218.106.254.122:8084/pmbs/' + localPath)
      a.click()
    },
    // 抽屉取消按钮
    empty() {
      this.drawer3 = false
      this.drawer2 = false
      this.feedbackContent = ''
      this.result = ''
    },
    // 关闭任务详情回调
    closeDrawer(res) {
      // console.log(res)
      this.taskId = 0
      let tabs_activity = this.tabs_activity
      if (res == 1) {
        if (tabs_activity == 0) {
          let data0 = {
            type: 0,
            clientId: this.clientId,
            serviceId: this.serviceId,
            isUsual: this.isUsual,
            task: {
              initUserId: this.userId,
              status: this.status
            },
            pageNum: this.pageNum0
          }
          this.getTasklistAjax(data0)
        } else if (tabs_activity == 1) {
          let data1 = {
            type: 1,
            clientId: this.clientId,
            serviceId: this.serviceId,
            isUsual: this.isUsual,
            task: {
              initUserId: this.userId,
              status: this.status
            },
            pageNum: this.pageNum1,
            pageSize: 30
          }
          this.getTasklistAjax_(data1)
        }
      }
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
    // this.widthheight()
    // this.getAllClientAndBusiness() // 获取客户和业务
    if (this.userId == 152) {
      this.tabs_activity = 0
      // console.log(this.tabs_activity)
    }
    this.getTasklist(this.tabs_activity) // 获取任务列表
    // this.upload() // 上传附件地址
    // this.getBusinessListAjax() // 获取业务类型
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.task .top {
  height: 36px;
  line-height: 36px;
  margin-bottom: 13px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.task .top .filtrateClient {
  width: 100%;
}
.task .top .title {
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.task .top .tab1 {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.task .top .tab2 {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.task .top .tab3 {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.task .top .tab1 button:nth-of-type(3) {
  border-left: 0;
}
.task .top .tab1 .box-card {
  width: 272px;
  padding: 0 8px;
  position: absolute;
  top: 36px;
  left: 50%;
  margin-left: -147px;
  z-index: 9999;
}
.task .top .tab1 .box-card >>> .el-card__body {
  padding: 9px 0;
}
.task .top .tab1 .box-card .moreBus {
  margin-bottom: 9px;
}
.task .top button {
  width: 72px;
  padding: 9px;
}
.task .top .more {
  width: 32px;
  padding: 9px;
}
.task .top .tab1 .el-button--primary.is-plain {
  border-color: #ddd;
}
.task .top .tab2 .el-button--primary.is-plain {
  border-color: #ddd;
}
.task .top .tab1 >>> .el-button,
.task .top .tab2 >>> .el-button {
  background: #fff;
  color: black;
}
.task .top .tab1 >>> .el-button:hover,
.task .top .tab2 >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.task .top .tab1 >>> .el-button.act,
.task .top .tab2 >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.task .top .tab3 >>> .el-button {
  width: 80px;
}
.el-button + .el-button {
  margin: 0;
}
.task .tabs {
  font-weight: 700;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 13px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.task .tabs div {
  height: 32px;
  line-height: 32px;
  color: rgba(164, 167, 170, 1);
  box-sizing: border-box;
  padding-bottom: 13px;
  cursor: pointer;
}
.task .tabs div:nth-of-type(2) {
  margin-left: 32px;
}
.task .tabs .act {
  border-bottom: 2px solid black;
  color: black;
}
.task .table .title,
.task .table .list {
  width: 100%;
  height: 48px;
  font-size: 14px;
  box-sizing: border-box;
  padding-left: 36px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.task .table .list:hover {
  background: #f7f7f7;
}
.task .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.task .table .title .el-icon-sort {
  font-size: 18px;
}
.task .table .title div {
  height: 48px;
  line-height: 48px;
}

.task .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.task .table .page {
  margin-top: 24px;
  text-align: center;
}
.task .table .taskfile {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.task .table .taskfile img {
  margin-right: 6px;
}
.task .table .filenametext {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
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
  padding-left: 18px;
  font-weight: 600;
  font-size: 18px;
}
.task .task_details .proFileList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.task .task_details .smname {
  width: 72px;
  text-align: center;
  font-size: 13px;
  color: rgb(162, 162, 162);
  cursor: pointer;
}
.task .task_details .suggest .fileListBox {
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
  cursor: pointer;
}
.task .task_details .suggest .fileList div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.task .elementUpload {
  width: 100%;
}
.task .change {
  font-size: 18px;
}
.task .doUserName {
  display: flex;
  align-items: center;
}
.task .doUserName img {
  margin-left: 6px;
  cursor: pointer;
}
.task .faTask {
  display: inline-block;
  color: white;
  text-align: center;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 50%;
  background: rgb(56, 148, 255);
}
.task .snow {
  box-sizing: border-box;
  padding-left: 9px;
  background: url('../../../../static/images/task/snowflake.png') 0 center
    no-repeat;
  background-size: 7px;
}
</style>
