<template>
  <div class="project" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <!-- <div class="grid-content bg-purple-dark"> -->
        <el-col :span="5" class>
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
                v-for="item in clientIdList"
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
              v-for="(item, index) in businessList[0]"
              :key="index"
            >{{item.businessName}}</el-button>
            <el-button
              type="primary"
              plain
              size="small"
              icon="el-icon-more"
              @click="tab1_more()"
              :class="[moreShow==true ? 'act more' : 'more']"
              style="border-left: 0;"
            ></el-button>
          </el-button-group>
          <el-card class="box-card" v-show="moreShow">
            <el-button-group
              v-for="(items, index) in businessList"
              :key="index"
              v-show="index != 0"
              class="moreBus"
            >
              <el-button
                type="primary"
                plain
                size="small"
                @click="tab1_change(item.businessId)"
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
            <el-button type="primary" size="small" @click="tab3_change(1)">新项目</el-button>
            <el-button type="danger" size="small" @click="tab3_change(4)">延期</el-button>
            <el-button type="warning" size="small" @click="tab3_change(2)">审核中</el-button>
            <el-button type="success" size="small" @click="tab3_change(1)">执行中</el-button>
          </el-button-group>
        </el-col>
        <!-- </div> -->
      </el-col>
      <el-col :span="24" class="tabs" v-if="userId != 152">
        <div @click="table_tab(0)" :class="[tabs_activity==0 ? 'act' : '']">我发起</div>
        <div @click="table_tab(1)" :class="[tabs_activity==1 ? 'act' : '']">我参与</div>
      </el-col>
      <!--------- 我发起 --------->
      <el-col :span="24" class="table table1" v-show="tabs_activity == 0">
        <el-table
          v-loading="loading"
          ref="filterTable"
          :data="currentData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
        >
          <el-table-column prop="proName" label="名称" width="280" show-overflow-tooltip>
            <el-link
              type="primary"
              slot-scope="scope"
              @click.native="pathPrpjectDetails(scope.row.proId,0)"
            >{{scope.row.proName}}</el-link>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1" class="state_color1">执行中</span>
              <span v-else-if="scope.row.status == 2" class="state_color2">审核中</span>
              <span v-else-if="scope.row.status == 3" class="state_color3">完成</span>
              <span v-else-if="scope.row.status == 4" class="state_color4">延期</span>
              <span v-else-if="scope.row.status == 5" class="state_color3">延期完成</span>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="总任务数/待完成" min-width="128">
            <template slot-scope="scope">{{scope.row.listTask.length}}/{{scope.row.unfintask}}</template>
          </el-table-column>
          <el-table-column prop="expertTime" label="预计时间" sortable>
            <template slot-scope="scope">{{$date(scope.row.expertTime)}}</template>
          </el-table-column>
          <el-table-column prop="overTime" label="完成时间" sortable>
            <template slot-scope="scope">{{$time(scope.row.overTime)}}</template>
          </el-table-column>
          <el-table-column prop="realName" label="下达人"></el-table-column>
          <el-table-column prop="tag" label="操作" width="180" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                slot="reference"
                v-if="scope.row.status == 2"
                @click="feedback(scope.row.proId,scope.row.proName)"
              >反馈</el-button>
              <el-button
                size="mini"
                type="primary"
                slot="reference"
                v-if="scope.row.status == 2"
                @click="achieve(scope.row)"
              >完成</el-button>
              <el-button
                size="mini"
                type="info"
                slot="reference"
                v-if="scope.row.status == 1 || scope.row.status == 4"
                @click="aredact(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="info"
                slot="reference"
                v-if="scope.row.status == 1|| scope.row.status == 4"
                @click="expurgate(scope.row.proId)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            layout="total, prev, pager, next"
            :page-size="30"
            :total="totalnum"
            background
          ></el-pagination>
          <!-- </div> -->
        </div>
      </el-col>
      <!--------- 我参与 --------->
      <el-col :span="24" class="table table2" v-show="tabs_activity == 1">
        <el-table
          v-loading="loading"
          ref="filterTable"
          :data="currentData_"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
        >
          <el-table-column prop="name" label="名称" width="320" show-overflow-tooltip>
            <el-link
              type="primary"
              slot-scope="scope"
              @click.native="pathPrpjectDetails(scope.row.proId,1)"
            >{{scope.row.proName}}</el-link>
          </el-table-column>
          <el-table-column prop="state_text" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1" class="state_color1">执行中</span>
              <span v-else-if="scope.row.status == 2" class="state_color2">审核中</span>
              <span v-else-if="scope.row.status == 3" class="state_color3">完成</span>
              <span v-else-if="scope.row.status == 4" class="state_color4">延期</span>
              <span v-else-if="scope.row.status == 5" class="state_color3">延期完成</span>
            </template>
          </el-table-column>
          <el-table-column prop="expertTime" label="预计时间" sortable>
            <template slot-scope="scope">{{$date(scope.row.expertTime)}}</template>
          </el-table-column>
          <el-table-column prop="overTime" label="完成时间" sortable>
            <template slot-scope="scope">{{$time(scope.row.overTime)}}</template>
          </el-table-column>
          <el-table-column prop="realName" label="下达人" filter-placement="bottom-end"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total="participateProjectListTota"
          @current-change="participateProjectList"
        ></el-pagination>-->
        <div class="paging">
          <el-pagination
            @size-change="handleSizeChange_"
            @current-change="handleCurrentChange_"
            :current-page="pageNum_"
            :page-size="30"
            layout="total, prev, pager, next"
            :total="totalnum_"
            background
          ></el-pagination>
        </div>
      </el-col>

      <!-- 抽屉 -->
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer1" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24" class="content">
            <el-col :span="24" class="title">{{drawer1_name}}</el-col>
            <el-col :span="6" class="title">反馈</el-col>
            <el-col :span="24">
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="feedbackContent"></el-input>
            </el-col>
            <br />
            <el-col :span="6" class="title">接受</el-col>
            <el-col :span="19">
              <el-checkbox-group v-model="checkListDept">
                <el-checkbox
                  :label="item.deptId"
                  v-for="item in deptNameList"
                  :key="item.deptId"
                >{{item.deptName}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
            <el-col :span="6" class="title">任务</el-col>
            <el-col :span="19">
              <el-checkbox-group v-model="checkListTask">
                <el-checkbox
                  :label="item.taskId"
                  v-for="item in taskNameListShow"
                  :key="item.index"
                >{{item.taskName}}</el-checkbox>
              </el-checkbox-group>
            </el-col>

            <el-col :span="24" class="Upload">
              <el-divider></el-divider>
              <el-upload
                action="/pmbs/file/upload?upType=0&demandType=1"
                :on-remove="handleRemoveFeedback"
                :on-success="handleSuccessFeedback"
                :limit="1"
                ref="upload"
                class="elementUpload"
              >
                <el-button size="mini" type="primary" v-show="disabled0">点击上传文档</el-button>
              </el-upload>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info" @click="empty">取消</el-button>
            <el-button size="small" type="primary" @click="projectFeedback">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer3" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer3_name}}</el-col>
            <el-col :span="6" class="title">延期原因</el-col>
            <el-col :span="24">
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="delayReason"></el-input>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info" @click="empty">取消</el-button>
            <el-button size="small" type="primary" @click="delayAchieve">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'project',
  props: {
    update: Number
  },
  data() {
    return {
      userId: this.$store.state.user.userId,
      proId: '', // 项目ID
      loading: false, // 表格loading
      // 查询条件
      clientIdList: this.$store.state.clientIdList, // 用户列表
      clientId: '', // 用户ID
      serviceId: '', // 业务ID
      isUsual: '', // 专项-1/日常-0
      status: '', // 任务状态
      // 抽屉控制
      drawer1: false,
      drawer2: false,
      drawer3: false,
      drawer1_name: '',
      drawer3_name: '任务名称',
      // plain: false,
      autofocus: true,
      loginState: true, // 避免多次点击
      project_style: '',
      // 新增
      new_project: {
        new_name: '', // 任务名称
        business_type: [], // 分类
        radio1: '1', // 专项，日常
        presetTime: '', // 预计时间
        demand: '', // 需求
        radio2: '1', // 项目经理,执行部门 选择
        manager: '', // 项目经理
        checkList: [], // 执行部门
        dynamicTags: ['标签一', '标签二', '标签三', '标签四'] // 知晓人
      },
      add_list: '',
      checkList: [],
      business_type_list: [], // 业务类型列表
      deptList: [], // 部门列表
      userList: [], // 用户列表
      // 点击编辑获取的项目详情
      projectData: {},
      // 上传附件
      feedbackFileList: [], // 文件信息
      // 业务类型列表
      business_type_list: [
        {
          value: '业务类型1',
          label: '业务类型1',
          children: [
            {
              value: '客户1',
              label: '客户1'
            },
            {
              value: '客户1',
              label: '客户1'
            }
          ]
        },
        {
          value: '业务类型2',
          label: '业务类型2',
          children: [
            {
              value: '客户1',
              label: '客户1'
            },
            {
              value: '客户2',
              label: '客户2'
            }
          ]
        },
        {
          value: '业务类型3',
          label: '业务类型3',
          children: [
            {
              value: '客户1',
              label: '客户1'
            },
            {
              value: '客户2',
              label: '客户2'
            }
          ]
        }
      ],
      // 客户列表
      client_list: [],
      // 客户列表选择结果
      client: '广汽本田',
      businessList: this.$store.state.businessList, // 业务列表
      moreShow: false, // 显示更多业务
      // 1-执行中，2-审核中，3-完成，4-延期，5-延期完成
      projectListOriginate: [], // 项目列表我发起
      initiateProjectListTota: [], // 项目列表我发起总页数
      projectListJoin: [], // 项目列表我参与
      participateProjectListTota: [], // 项目列表我参与总页数
      // 1审核中 2执行中 3已完成 4延期
      // 我参与 我发起选项卡
      tabs_activity: this.$store.state.projectListNum,
      // 项目类型1选择
      tab1_act: '',
      // 项目类型2选择
      tab2_act: '',
      feedbackObj: {
        feedbackId: '',
        taskId: '',
        initUserId: ''
      },
      feedbackContent: '',
      // 反馈时项目下的所有任务
      disabled0: true,
      projectTaskLisInit: [], // 我发起
      deptNameList: [], // 反馈项目任务参与的部门
      taskNameList: [], // 反馈项目包含的任务列表
      taskNameListShow: [], // 需要显示的部门
      checkListDept: [], // 选中的部门
      checkListTask: [], // 选中的任务
      //
      add_list: '',
      checkList1: [],
      // 上传附件
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      delayReason: '', // 延迟原因内容
      // 我发起分页
      pageNum: 1, //默认页码
      totalnum: 0, //总页码
      currentData: [], //当前渲染的数据
      // 我参与分页
      pageNum_: 1, //默认页码
      totalnum_: 0, //总页码
      currentData_: [] //当前渲染的数据
    }
  },
  // 计算属性
  // computed: {
  //   date: function(data) {
  //     return this.$date(data)
  //   },
  //   time: function(data) {
  //     return this.$time(data)
  //   }
  // },
  // 侦听器
  watch: {
    // 如果 `checkListDept` 发生改变，这个函数就会运行
    checkListDept: function(newQuestion, oldQuestion) {
      let taskNameListShow = []
      let checkListDept = this.checkListDept
      let taskNameList = this.taskNameList
      // console.log(taskNameList)
      for (let i = 0; i < checkListDept.length; i++) {
        let element = checkListDept[i]
        let deptTaskData = []
        for (let j = 0; j < taskNameList.length; j++) {
          let element_ = taskNameList[j]
          let taskData = {}
          if (element_.deptId == element) {
            taskData = element_
            deptTaskData.push(taskData)
          }
        }
        // console.log(deptTaskData)
        taskNameListShow = taskNameListShow.concat(deptTaskData)
      }
      this.taskNameListShow = taskNameListShow
      // console.log(taskNameListShow)
    },
    // 用户选择侦听
    clientId: function(newQuestion, oldQuestion) {
      // clientId: '', // 用户ID
      // serviceId: '', // 业务ID
      // isUsual: '', // 专项-1/日常-0
      // status: '', // 任务状态
      let id = this.tabs_activity
      this.findProjectList(id)
    },
    // 业务类型侦听
    serviceId: function(newQuestion, oldQuestion) {
      // clientId: '', // 用户ID
      // serviceId: '', // 业务ID
      // isUsual: '', // 专项-1/日常-0
      // status: '', // 任务状态
      let id = this.tabs_activity
      this.findProjectList(id)
    },
    // 专项/日常侦听
    isUsual: function(newQuestion, oldQuestion) {
      // clientId: '', // 用户ID
      // serviceId: '', // 业务ID
      // isUsual: '', // 专项-1/日常-0
      // status: '', // 任务状态
      let id = this.tabs_activity
      this.findProjectList(id)
    },
    // 任务状态侦听
    status: function(newQuestion, oldQuestion) {
      // clientId: '', // 用户ID
      // serviceId: '', // 业务ID
      // isUsual: '', // 专项-1/日常-0
      // status: '', // 任务状态
      let id = this.tabs_activity
      this.findProjectList(id)
    },
    update: function(newQuestion, oldQuestion) {
      this.getProjectList(0)
    },
    tabs_activity: function(newQuestion, oldQuestion) {
      let id = this.tabs_activity
      this.findProjectList(id)
    }
  },
  // 钩子函数
  mounted() {
    // this.widthheight()
    // let id = this.tabs_activity
    // this.findProjectList(id)
    this.getParams()
    this.getProjectList(0) // 获取项目列表
    this.projectListNum() //
  },
  // 方法
  methods: {
    // 时间格式Y-M-D H-M-S
    formatData2(date) {
      // var date = new Date();
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hours >= 0 && hours <= 9) {
        hours = '0' + hours
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      return `${year}-${month}-${strDate} ${hours}:${minutes}:${seconds}`
    },
    listUniq(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] == result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    // tabs_activity
    projectListNum() {
      this.tabs_activity = this.$store.state.projectListNum
    },
    handleChange(value) {
      // console.log(value)
      // console.log(this.value)
    },
    ///////// 添加知晓人标签 start /////////
    showInput() {
      let list = this.new_project.dynamicTags
      let add_list = this.add_list
      let userList = this.userList
      let cf = true
      if (add_list != '') {
        let add_list_data = ''
        for (let i = 0; i < userList.length; i++) {
          const element = userList[i]
          if (element.value == add_list) {
            add_list_data = element.label
          }
        }
        for (let i = 0; i < list.length; i++) {
          const element = list[i]
          if (element == add_list_data) {
            this.messageWarning('请勿重复添加')
            cf = false
          }
        }
        if (cf) {
          list.push(add_list_data)
          this.add_list = ''
        }
      } else if (add_list == '') {
        this.messageWarning('信息为空')
      }
    },
    // 删除知晓人标签
    handleClose(tag) {
      this.new_project.dynamicTags.splice(
        this.new_project.dynamicTags.indexOf(tag),
        1
      )
    },
    ///////// 添加知晓人标签 end /////////

    ///////// 上传附件 start /////////
    handleRemoveFeedback(file, fileList) {
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
      if (fileList.length == 0) {
        this.disabled0 = true
      } else {
        this.disabled0 = false
      }
    },
    handleSuccessFeedback(response, file, fileList) {
      let data = response.data
      console.log(data)
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
      if (fileList.length == 0) {
        this.disabled0 = true
      } else {
        this.disabled0 = false
      }
    },
    ///////// 上传附件 start /////////
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
      // this.project_style = 'height:' + height + 'px;'
    },

    ///////// 查询按钮 start /////////
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
    tab2_change(e, id) {
      // console.log(e)
      // console.log(id)
      let isUsual = this.isUsual
      if (isUsual === id) {
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
    tab3_change(id) {
      let status = this.status
      if (status == id) {
        this.status = ''
      } else {
        this.status = id
      }
    },
    ///////// 查询按钮 end /////////
    // 选项卡
    table_tab(e) {
      this.tabs_activity = e
      this.$store.commit('projectListShow', e)
    },
    // 按钮
    feedback(id, name) {
      // console.log('反馈' + id)
      this.drawer1 = true
      this.drawer1_name = name
      this.proId = id
      let userId = this.userId
      let data = `?proId=${id}&userId=${userId}`
      this.getProjectTaskListInit(data)

      let feedbackFileList = this.feedbackFileList
      if (feedbackFileList.length != 0) {
        this.$refs['upload'].clearFiles()
        this.feedbackFileList = []
      }
    },
    aredact(proDetail) {
      // console.log('编辑' + id)
      // this.drawer2 = true
      // this.getProjectShowDetail(id)
      // 获取部门列表
      // this.getDeptList()
      // 获取用户列表
      // this.getListAjax()
      // 获取新建项目分类
      // this.getAllClientAndBusiness()
      // 向父组件传值
      this.$emit('getData', proDetail)
      // this.$emit('getShopCode',value)
    },
    delayAchieve() {
      this.drawer3 = false
      let proId = this.proId
      let overTime = this.formatData2(new Date())
      let delayReason = this.delayReason
      let data = {
        proId: proId,
        status: 5,
        delayReason: delayReason, // 延期原因
        overTime: overTime
      }
      this.getProjectSave(data)
    },
    achieve(proDate) {
      // console.log('完成' + proId)
      this.proId = proDate.proId
      let expertTime = new Date(
        new Date(proDate.expertTime).getTime() + 24 * 60 * 60 * 1000
      )
      let newTime = new Date()
      if (expertTime < newTime) {
        this.drawer3 = true
        this.drawer3_name = proDate.proName
      } else {
        this.$confirm('是否确认此操作？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            // console.log(1)
            let overTime = this.formatData2(new Date())
            let data = {
              proId: proDate.proId,
              status: 3,
              overTime: overTime
            }
            this.getProjectSave(data)
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      }
    },
    // 项目新增/修改/完成
    getProjectSave(data) {
      this.$axios
        .post('/pmbs/api/project/save', data)
        .then(this.getProjectSaveSuss)
    },
    // 项目新增/修改/完成回调
    getProjectSaveSuss(res) {
      // console.log(res)
      let data = res.data.data
      if (res.status == 200) {
        if (data.status == 3 || data.status == 5) {
          this.messageWin('项目已完成')
        }
        this.getProjectList(0)
      }
    },
    expurgate(id) {
      this.$confirm('是否确认此操作？', '确认信息', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.delProject(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 获取我发起项目下所有任务
    getProjectTaskListInit(data) {
      // let data = `?proId=${id}`
      this.$axios
        .post('/pmbs/api/project/projectOfTask' + data)
        .then(this.getProjectTaskListInitSuss)
    },
    // 获取我发起项目下所有任务回调
    getProjectTaskListInitSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let projectTaskLisInit = res.data.data
        this.projectTaskLisInit = projectTaskLisInit
        let deptNameList = []
        let taskNameList = []
        for (let i = 0; i < projectTaskLisInit.length; i++) {
          let element = projectTaskLisInit[i]
          let deptNameListData = {
            deptId: element.deptId,
            deptName: element.deptName
          }
          let taskNameListData = {
            deptId: element.deptId,
            deptName: element.deptName,
            taskId: element.taskId,
            taskName: element.taskName
          }
          taskNameList.push(taskNameListData)
          deptNameList.push(deptNameListData)
        }
        deptNameList = this.listUniq(deptNameList, 'deptId')
        // console.log(deptNameList)
        this.deptNameList = deptNameList
        this.taskNameList = taskNameList
        // console.log(taskNameList)
      }
    },
    ///////// 项目反馈-任务批量反馈 start /////////
    projectFeedback() {
      let updateTime = new Date()
      let checkListTask = this.checkListTask
      let taskId = checkListTask.join(',')
      let feedbackFileList = this.feedbackFileList
      for (let i = 0; i < feedbackFileList.length; i++) {
        const element = feedbackFileList[i]
        feedbackFileList[i].taskId = taskId
      }
      let data = {
        feedback: this.feedbackContent, // 反馈内容
        feedbackFileList: feedbackFileList, // 反馈附件
        initUserId: this.userId, // 反馈人ID
        proId: this.proId, // 反馈项目ID
        moreTaskId: taskId, // 反馈任务ID
        updateTime: updateTime // 反馈时间
      }
      console.log(data)
      if (data.feedback == '' || data.moreTaskId == '') {
        this.messageError('信息不能为空')
      } else {
        this.$axios
          .post('/pmbs/api/project/projectFeedback', data)
          .then(this.projectFeedbackSuss)
      }
    },
    // 项目反馈-任务批量反馈回调
    projectFeedbackSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        this.messageWin('反馈成功')
        this.drawer1 = false
        this.feedbackContent = ''
        this.taskFeedbackId = ''
        // 重新获取项目列表
        this.getProjectList(0)
      }
    },
    ///////// 项目反馈-任务批量反馈 end /////////
    // /api/project/delProject?projectId=100
    // 项目删除
    delProject(id) {
      let data = `?projectId=${id}`
      this.$axios
        .post('/pmbs/api/project/delProject' + data)
        .then(this.delProjectSuss)
    },
    // 项目删除
    delProjectSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        this.messageWin('项目删除成功')
        this.getProjectList(0)
        // let projectListJoin = res.data.data
      }
    },
    // 跳转项目详情页面
    pathPrpjectDetails(id, type) {
      // console.log(id)
      this.$router.push({
        path: '/home/components/project_details',
        query: { id: id, type: type }
      })
    },
    findProjectList(id) {
      // clientId serviceId isUsual status
      let userId = this.userId
      let clientId = this.clientId
      let serviceId = this.serviceId
      let isUsual = this.isUsual
      let status = this.status

      let clientIdData = `&clientId=${clientId}`
      let serviceIdData = `&serviceId=${serviceId}`
      let isUsualData = `&isUsual=${isUsual}`
      let statusData = `&status=${status}`
      if (clientId == '') {
        clientIdData = ''
      }
      if (serviceId == '') {
        serviceIdData = ''
      }
      if (isUsual === '') {
        isUsualData = ''
      }
      if (status == '') {
        statusData = ''
      }
      let data = `?inituserid=${userId}${clientIdData}${serviceIdData}${isUsualData}${statusData}`
      if (id == 0) {
        this.getProjectListAjax(data)
      }else if (id == 1) {
        this.getProjectUserjoinproject(data)
      }
    },
    ///////// 获取项目列表 start /////////
    getProjectList(id) {
      // console.log(name)
      let userId = this.userId
      let data0 = `?inituserid=${userId}`
      let data1 = `?inituserid=${userId}`
      // id 我发起0  我参与1
      if (id==0) {
        this.getProjectListAjax(data0)
      }else if(id==1){
        this.getProjectUserjoinproject(data0)
      }
      // console.log('获取项目列表')
    },
    // 项目管理-我发起获取
    getProjectListAjax(data0) {
      this.loading = true
      this.$axios
        .post('/pmbs/api/project/listAjax' + data0)
        .then(this.getProjectListAjaxSuss)
      // .catch(function(err) {
      //   // console.log('failed', err)
      //   // this.loading = false
      //   console.log('请求超时')
      // })
    },
    // 项目管理-我发起获取回调
    getProjectListAjaxSuss(res) {
      // console.log(res)
      this.loading = false
      if (res.status == 200) {
        let projectListOriginate = res.data.data
        for (let i = 0; i < projectListOriginate.length; i++) {
          let element = projectListOriginate[i]
          let unfintask = 0
          for (let j = 0; j < element.listTask.length; j++) {
            const element_ = element.listTask[j]
            if (element_.status != 3 && element_.isIgnore != true) {
              unfintask++
            }
          }
          projectListOriginate[i].unfintask = unfintask
        }
        // console.log(projectListOriginate)

        this.projectListOriginate = projectListOriginate

        this.totalnum = this.projectListOriginate.length
        var json = JSON.parse(JSON.stringify(this.projectListOriginate)) //拷贝数据 避免影响原始数据
        this.currentData = json.splice(
          (this.pageNum - 1) * 30,
          (this.pageNum - 1) * 30 + 30
        )
        // console.log(this.currentData)
      }
    },
    // 项目管理-我参与获取
    getProjectUserjoinproject(data1) {
      this.loading = true
      this.$axios
        .post('/pmbs/api/project/userjoinproject' + data1)
        .then(this.getProjectUserjoinprojectSuss)
    },
    // 项目管理-我参与获取回调
    getProjectUserjoinprojectSuss(res) {
      this.loading = false
      if (res.status == 200) {
        let projectListJoin = res.data.data
        for (let i = 0; i < projectListJoin.length; i++) {
          let element = projectListJoin[i]
        }
        this.projectListJoin = projectListJoin

        this.totalnum_ = this.projectListJoin.length
        var json = JSON.parse(JSON.stringify(this.projectListJoin)) //拷贝数据 避免影响原始数据
        this.currentData_ = json.splice(
          (this.pageNum - 1) * 30,
          (this.pageNum - 1) * 30 + 30
        )
        // slice
        // this.currentData_ = json.slice(
        //   (this.pageNum - 1) * 30,
        //   (this.pageNum - 1) * 30 + 30
        // )
      }
    },
    ///////// 获取项目列表 end /////////
    // 分页
    handleSizeChange() {},
    //下一页
    handleCurrentChange(page) {
      this.pageNum = page
      // console.log(page)

      this.totalnum = this.projectListOriginate.length

      var json = JSON.parse(JSON.stringify(this.projectListOriginate)) //拷贝数据 避免影响原始数据

      this.currentData = json.splice(
        (this.pageNum - 1) * 30,
        (this.pageNum - 1) * 30 + 30
      )

      // console.log(this.currentData)
    },

    // 分页
    handleSizeChange_() {},
    //下一页
    handleCurrentChange_(page) {
      this.pageNum_ = page
      // console.log(page)
      this.totalnum_ = this.projectListJoin.length
      var json = JSON.parse(JSON.stringify(this.projectListJoin)) //拷贝数据 避免影响原始数据
      this.currentData_ = json.splice(
        (this.pageNum_ - 1) * 30,
        (this.pageNum_ - 1) * 30 + 30
      )
      // console.log(this.currentData_)
    },
    getParams() {
      let name = this.$route.query.name
      let clientIdList = this.clientIdList
      clientIdList.forEach(element => {
        if (name == element.label) {
          this.clientId = element.value
        }
      });
    },
    // 抽屉取消按钮
    empty() {
      this.drawer3 = false
      this.drawer2 = false
      this.feedbackContent = ''
      this.result = ''
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
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.project .top {
  height: 36px;
  margin-bottom: 13px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.project .top .filtrateClient {
  width: 100%;
}
.project .top .title {
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.project .top .tab1 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.project .top .tab1 button:nth-of-type(3) {
  border-left: 0;
}
.project .top .tab1 .box-card {
  width: 271px;
  position: absolute;
  top: 32px;
  left: 50%;
  margin-left: -136px;
  z-index: 9999;
}
.project .top .tab1 .box-card >>> .el-card__body {
  padding: 20px 0;
}
.project .top .tab1 .box-card .moreBus {
  margin-bottom: 9px;
}
.project .top button {
  width: 80px;
}
.project .top .more {
  width: 32px;
  padding: 9px;
}
.project .top .tab1 .el-button--primary.is-plain {
  border-color: #ddd;
}
.project .top .tab2 .el-button--primary.is-plain {
  border-color: #ddd;
}
.project .top .tab1 >>> .el-button,
.project .top .tab2 >>> .el-button {
  background: #fff;
  color: black;
}
.project .top .tab1 >>> .el-button:hover,
.project .top .tab2 >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.project .top .tab1 >>> .el-button.act,
.project .top .tab2 >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.project .top .tab3 >>> .el-button {
  width: 80px;
}
.project .top .tab1 div:nth-of-type(1),
.project .top .tab2 div:nth-of-type(1) {
  border: none;
}
.project .top .tab div.act {
  color: white;
}
.project .top .tab3 {
  border: none;
  color: white;
}
.el-button + .el-button {
  margin: 0;
}
.project .tabs {
  font-weight: 700;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 13px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.project .tabs div {
  height: 32px;
  line-height: 32px;
  color: rgba(164, 167, 170, 1);
  box-sizing: border-box;
  padding-bottom: 13px;
  cursor: pointer;
}
.project .tabs div:nth-of-type(2) {
  margin-left: 32px;
}
.project .tabs .act {
  border-bottom: 2px solid black;
  color: black;
}
.project .table .title,
.project .table .list {
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
.project .table .list:hover {
  background: #f7f7f7;
}
.project .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.project .feedback .content .el-col {
  margin-bottom: 24px;
}
.project .feedback .title {
  font-size: 18px;
  margin-bottom: 13px;
}
.project .feedback .title:nth-of-type(1) {
  margin-top: 0;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 36px;
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
.project .table .title .el-icon-sort {
  font-size: 18px;
}
.project .table .title div {
  height: 48px;
  line-height: 48px;
}
.project .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.project .table .list div:nth-of-type(1) {
  cursor: pointer;
}
.project .table .list div {
  height: 48px;
  line-height: 48px;
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

.project .add_box {
  /* height: 985px; */
  box-sizing: border-box;
  padding: 36px 0 108px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
}
.project .add_box > .el-col {
  margin-bottom: 16px;
}
.project .add_box .title1 {
  font-weight: 600;
  font-size: 18px;
}
.project .add_box .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.project .add_box .presetTime > div {
  width: 100%;
}
.project .add_box .check_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.project .add_box .check_box .el-checkbox {
  width: 108px;
  margin: 0;
}
.project .add_box .upload .text {
  width: 146px;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
}
.project .add_box .know_pop span {
  margin-left: 0;
  margin-right: 9px;
}
.project .add_box .know_pop .know_pop_list {
  margin-bottom: 13px;
}
.project .batton_pa {
  width: 100%;
  padding: 36px;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.project .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project .batton button {
  width: 36%;
}
.pointer {
  cursor: pointer;
}
.paging {
  text-align: center;
}
</style>
