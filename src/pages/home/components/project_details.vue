<template>
  <div class="project_details" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <el-col :span="4" class>
          项目管理 /
          <span class="project_name">皓影赠礼</span>
        </el-col>
      </el-col>
      <el-col :span="6" class="tabs">
        <el-button-group>
          <el-button
            type="primary"
            plain
            size="small"
            @click="table_tab(1)"
            :class="[tabs_activity=='1' ? 'act' : '']"
          >执行情况</el-button>
          <el-button
            type="primary"
            plain
            size="small"
            @click="table_tab(2)"
            :class="[tabs_activity=='2' ? 'act' : '']"
          >项目需求</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="4" :offset="13" class="detail_list">
        <el-col :span="24" v-show="!sousuo_show">
          <i @click="addtask" class="el-icon-circle-plus-outline"></i>
          <i @click="gantt(1)" class="el-icon-tickets"></i>
          <i @click="drawer2 = true" class="el-icon-time"></i>
          <i @click="sousuoShow" class="el-icon-search"></i>
        </el-col>
        <el-col :span="24" class="sousuo" v-show="sousuo_show">
          <el-col :span="20">
            <el-input placeholder="请输入内容" v-model="sousuo_input" size="small">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="sousuo"></i>
            </el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <i class="el-icon-circle-close" @click="sousuoShow"></i>
          </el-col>
        </el-col>
      </el-col>
      <!-- 抽屉创建任务 -->
      <el-drawer title="创建任务" :visible.sync="drawer1" :with-header="false">
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
              >
                <el-option
                  v-for="item in faTaskList"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
          {{new_task.faTask}}
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
              <el-date-picker v-model="new_task.presetTime" type="date" placeholder="选择日期"></el-date-picker>
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
              <el-upload
                :action="uploadUrl"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>

              <el-dialog :visible.sync="dialogVisible" class="upload_list">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
              <div class="text">附件</div>
            </el-col>

            <el-col :span="12" :offset="7" class="batton">
              <el-button size="small" type="info">取消</el-button>
              <el-button size="small" type="primary" @click="taskSave">提交</el-button>
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
      <!-- 项目需求 -->
      <el-col :span="24" class="table table1" v-if="table_show">
        <el-table
          ref="filterTable"
          :data="taskList"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="deptName" label="部门"></el-table-column>
          <el-table-column prop="taskName" label="任务">
            <template slot-scope="scope">
              <el-link @click="task_detail(scope.row.taskId)">{{scope.row.taskName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1" class="state_color1">进行中</span>
              <span v-if="scope.row.status == 2" class="state_color2">审核中</span>
              <span v-if="scope.row.status == 3" class="state_color3">完成</span>
              <span v-if="scope.row.status == 4" class="state_color4">延期</span>
            </template>
          </el-table-column>
          <el-table-column prop="overUserId" label="执行人"></el-table-column>
          <el-table-column prop="expertTime" label="预计时间">
            <template slot="header">
              预计时间
              <i class="el-icon-sort"></i>
            </template>
          </el-table-column>
          <el-table-column prop="overTime" label="完成时间">
            <template slot="header">
              完成时间
              <i class="el-icon-sort"></i>
            </template>
          </el-table-column>
          <el-table-column prop="assignPeople" label="下达人"></el-table-column>
          <el-table-column prop="overDesc" label="成果">
            <div class="result" slot-scope="scope" v-if="scope.row.state == 3">
              <img src="static/images/document/ppt.png" width="24" alt srcset />
              <div>{{scope.row.overDesc}}</div>
            </div>
          </el-table-column>
          <el-table-column prop="操作" label="操作" filter-placement="bottom-end" width="136">
            <template slot-scope="scope">
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="redact(scope.row.id)">
                <el-button size="small" v-if="scope.row.state == 4 " type="info" slot="reference">忽略</el-button>
              </el-popconfirm>
              <el-button
                size="small"
                v-if="scope.row.state == 2"
                type="info"
                @click="feedback(scope.row.id,scope.row.task)"
              >反馈</el-button>
              <el-popconfirm
                title="确认执行此操作吗？"
                @onConfirm="achieve(scope.row.id,scope.row.task,scope.row.state)"
              >
                <el-button
                  size="small"
                  v-if="scope.row.state != 3"
                  type="primary"
                  slot="reference"
                >完成</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--  -->
      <el-col :span="24" class="table table2" v-if="!table_show">
        <el-col :span="7" class="title">
          <el-col :span="24">项目名称</el-col>
          <el-col :span="24">皓影赠礼</el-col>
        </el-col>
        <el-col :span="7" class="title">
          <el-col :span="24">预计时间</el-col>
          <el-col :span="24">2020.1.1-2020.3.1</el-col>
        </el-col>
        <el-col :span="7" class="title">
          <el-col :span="24">项目类别</el-col>
          <el-col :span="24">广汽本田 - 社区 - 专项</el-col>
        </el-col>
        <el-col :span="24" class="need">
          <el-col :span="24" class="span">需求</el-col>
          <el-col :span="24" class>
            需求背景
            <br />1.广本飞度社区运营，长期无法达到客户期望;
            <br />2.由销售部长直接提出，进行飞度社区增粉、提升认证车主数量为核心指标的专项方案策划。
            <br />
            <br />
          </el-col>
          <el-col :span="24" class>
            方案结构
            <br />1.平台现状分析(事实数据，反应注册人数、认证人数)
            <br />2.指出运营现状的问题(根据事实数据，指出问题)
            <br />3.行业环境及趋势或优秀案例及效果(大家-般怎么做)
            <br />4.提出我们的解决施策(我们怎么做)
            <br />5.效果量化(说明整体KPI，明确阶段KPI)
            <br />6.创意实施(具体创意细化)
            <br />7.预算及KPI
            <br />
            <br />
          </el-col>
          <el-col :span="24" class>
            其他补充
            <br />1.重点创意必须联系设计制作创意DEMO
            <br />2.客户重点提及各地车友会的资源利用，创意构思时要重点考虑。
            <br />3.网易云音乐需明确合作资源
            <br />4.竞争情报:三选一，对手为XXXXXX
            <br />
            <br />
          </el-col>
          <el-col :span="24" class="span">附件</el-col>
        </el-col>
      </el-col>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer3" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer3_task}}</el-col>
            <el-col :span="6" class="title">反馈</el-col>
            <el-col :span="24">
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="result">反馈反馈反馈反馈反馈</el-input>
            </el-col>
          </el-col>
          <el-col :span="14" :offset="5" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
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
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="result">反馈反馈反馈反馈反馈</el-input>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer5" :with-header="false">
        <el-scrollbar style="height: 100%">
          <el-row class="task_details">
            <el-col :span="6" class="title">执行部门：</el-col>
            <el-col :span="18">设计部</el-col>
            <el-col :span="6" class="title">任务类型：</el-col>
            <el-col :span="18">网站设计</el-col>
            <el-col :span="6" class="title">执行人：</el-col>
            <el-col :span="18">张三</el-col>
            <el-col :span="6" class="title">状态：</el-col>
            <el-col :span="18" class="state_color2">执行中</el-col>
            <el-col :span="6" class="title">预计时间：</el-col>
            <el-col :span="18">20-01-21</el-col>
            <el-col :span="6" class="title">完成时间：</el-col>
            <el-col :span="18">20-01-21</el-col>
            <el-col :span="6" class="title">需求：</el-col>
            <el-col :span="18">PC网站设计，客户需求商务简约风，以皓影为主题，突出产品的价值定位及车型特点。</el-col>
            <el-col :span="6" class="title">附件：</el-col>
            <el-col :span="18">
              <div class="smname">
                <img src="static/images/document/ppt.png" width="24" alt srcset />
                <br />参考资料
              </div>
            </el-col>
            <el-divider content-position="right"></el-divider>
            <el-col :span="6" class="title">完成结果：</el-col>
            <el-col :span="18">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="result">完成结果：描述</el-input>
            </el-col>
            <el-col :span="6" class="title">附件：</el-col>
            <el-col :span="18">
              <div class="smname">
                <img src="static/images/document/ppt.png" width="24" alt srcset />
                <br />最终成果
              </div>
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
                  <el-col :span="12" class="time">{{item.time}}</el-col>
                  <el-col :span="12" class="pop">{{item.pop}}</el-col>
                  <el-col :span="24" class="content">{{item.content}}</el-col>
                </el-col>
              </el-scrollbar>
            </el-col>
          </el-row>
        </el-scrollbar>
        <el-row class="batton_pa">
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">完成</el-button>
          </el-col>
        </el-row>
      </el-drawer>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'project_details',
  data() {
    return {
      proId: '', // 项目ID
      type: '', // 项目类型 0我发起 1我参与
      loginState: true, // 避免多次点击
      project_style: '',
      drawer1: false,
      drawer2: false,
      drawer3: false,
      drawer4: false,
      drawer5: false,
      drawer3_task: '',
      drawer4_task: '',
      sousuo_show: false,
      sousuo_input: '', // 所搜框内容
      taskList: [], // 任务列表
      deptList: [], // 部门列表
      // 1执行中 2审核中 3已完成 4延期
      // 我参与 我发起选项卡
      tabs_activity: 1,
      table_show: true,
      // 父任务列表
      faTaskList: [],
      // 新增
      new_task: {
        faTask: '',
        new_name: '',
        department: '',
        presetTime: '',
        task_type: '',
        remark: ''
      },
      records_list: [
        {
          time: '20/04/02 20:46',
          result: '前端开发时间变动',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '20/04/02 20:46',
          result: '策划方案预计完成时间改动',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '20/04/02 20:46',
          result: '策划方案添加预计完成时间',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '20/04/02 20:46',
          result: '策划方案已审核',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '20/04/02 20:46',
          result: '策划方案已提交',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        }
      ],
      style1: '',
      // 反馈信息
      result: '',
      // 项目类型选择
      task_type: [],
      task_type_value: '',
      // 上传附件
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadUrl: '',
      listProFile: [], // 上传文件信息列表
      suggest_list: [
        {
          time: '2020-01-12 12:00',
          pop: '客户部-黄振宇',
          content: '请将色调调整为红色。'
        },
        {
          time: '2020-01-10 10:00',
          pop: '内容部-张三',
          content: '调整意见文本内容。'
        },
        {
          time: '2020-01-12 12:00',
          pop: '客户部-黄振宇',
          content: '请将色调调整为红色。'
        },
        {
          time: '2020-01-10 10:00',
          pop: '内容部-张三',
          content: '调整意见文本内容。'
        }
      ]
    }
  },
  // 方法
  methods: {
    formatData(date) {
      // var date = new Date();
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return year + '-' + month + '-' + strDate
    },
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height1 = winHeight - 100
      this.style1 = 'height:' + height1 + 'px;'
    },
    addtask() {
      this.drawer1 = true
      // 任务类型获取
      this.getDepTypeList()
      // 部门列表获取
      this.getDeptList()
    },
    // 选项卡
    table_tab(e) {
      if (e == 1) {
        this.tabs_activity = 1
        this.table_show = true
      } else if (e == 2) {
        this.tabs_activity = 2
        this.table_show = false
      }
    },
    redact(e) {
      console.log('忽略' + e)
      // this.pop_up()
    },
    feedback(e, task) {
      console.log('反馈' + e)
      this.drawer3 = true
      this.drawer3_task = task
    },
    achieve(e, task, state) {
      console.log('完成' + e)
      if (state == 4) {
        this.drawer4 = true
        this.drawer4_task = task
      }
    },
    gantt(e) {
      this.$router.push({ path: '/gantti', query: { id: 2 } })
    },
    sousuoShow(e) {
      this.sousuo_show = !this.sousuo_show
      // console.log(e)
    },
    sousuo() {
      console.log(this.sousuo_input)
    },
    task_detail() {
      this.drawer5 = true
    },
    // 上传附件
    upload() {
      let upType = 1
      let demandType = 0
      let uploadUrl = `
      /pmbs/file/upload?upType=${upType}&demandType=${demandType} 
      `
      this.uploadUrl = uploadUrl
    },
    // 删除
    handleRemove(file) {
      console.log(file)
      let data = file.response.data
      let listProFile = this.listProFile
      for (let i = 0; i < listProFile.length; i++) {
        let element = listProFile[i]
        if (element.localPath == data.path) {
          listProFile.splice(i, 1)
          console.log('删除')
        }
      }
      this.listProFile = listProFile
      console.log(this.listProFile)
    },
    // 预览
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传回调
    handleSuccess(res, file, fileList) {
      // console.log('上传附件成功')
      if (res.errcode == 0) {
        let resData = res.data
        let listProFile = this.listProFile
        // console.log(listProFile)
        let listProFileData = {
          fileName: resData.fileName, //'附件名称',
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType //'文档后缀'
        }
        listProFile.push(listProFileData)
        this.listProFile = listProFile
        console.log(this.listProFile)
      }
    },
    // 获取页面传参
    getParams() {
      let proId = this.$route.query.id
      let type = this.$route.query.type
      this.proId = proId
      this.type = type
      // console.log(id)
      if (type == 0) {
        this.getProjectOfTask(proId)
      } else if (type == 1) {
        this.getProjectOfUserTask()
      }
      this.getProjectFeedbackDetail(proId)
    },
    // 获取项目反馈-项目详情
    getProjectFeedbackDetail(proId) {
      let data = `?proId=${proId}`
      this.$axios
        .post('/pmbs/api/project/feedbackDetail' + data)
        .then(this.getProjectFeedbackDetailSuss)
    },
    // 获取项目需求回调/api/project/projectOfUserTask
    getProjectFeedbackDetailSuss(res) {
      // console.log(res)
      // if (res.status == 200) {
      //   this.projectListJoin = res.data.data
      //   console.log(this.projectListJoin)
      // }/api/project/feedbackDetail
    },
    // 获取项目详情-我发起
    getProjectOfTask(proId) {
      let data = `?proId=${proId}`
      this.$axios
        .post('/pmbs/api/project/projectOfTask' + data)
        .then(this.getProjectOfTaskSuss)
    },
    // 获取项目详情-我发起回调
    getProjectOfTaskSuss(res) {
      console.log(res)
      if (res.status == 200) {
        let taskList = res.data.data
        this.taskList = taskList
        let faTaskList = []
        // console.log(taskList)
        for (let i = 0; i < taskList.length; i++) {
          let element = taskList[i]
          let faTaskListData = {}
          faTaskListData.value = element.taskId
          faTaskListData.label = element.taskName
          faTaskList.push(faTaskListData)
        }
        this.faTaskList = faTaskList
      }
    },
    // 获取项目详情-我参与
    getProjectOfUserTask(proId) {
      let data = `?proId=${proId}`
      this.$axios
        .post('/pmbs/api/project/projectOfUserTask' + data)
        .then(this.getProjectOfUserTaskSuss)
    },
    // 获取项目详情-我参与回调
    getProjectOfUserTaskSuss(res) {
      console.log(res)
      if (res.status == 200) {
        let taskList = res.data.data
        this.taskList = taskList
        // console.log(taskList)
      }
    },
    // 获取项目需求
    getProjectShowDetail() {
      let data = `?proId=1`
      this.$axios
        .post('/pmbs/api/project/showDetail' + data)
        .then(this.getProjectShowDetailSuss)
    },
    // 获取项目需求回调
    getProjectShowDetailSuss(res) {
      // console.log(res)
      // if (res.status == 200) {
      //   this.projectListJoin = res.data.data
      //   console.log(this.projectListJoin)
      // }
    },
    // 部门列表获取
    getDeptList(res) {
      let list = this.deptList
      if (list.length == 0) {
        let data = { pageNum: 1 }
        this.$axios
          .post('/pmbs/department/deptList', data)
          .then(this.getDeptListSuss)
      }
    },
    // 部门列表获取回调
    getDeptListSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let data = res.data.data
        let deptList = []
        for (let i = 0; i < data.length; i++) {
          let deptListData = {}
          const element = data[i]
          deptListData.id = element.deptId
          deptListData.name = element.deptName
          deptList.push(deptListData)
        }
        this.deptList = deptList
        // console.log(deptList)
      }
    },
    // 任务新增
    taskSave() {
      let expertTime = this.formatData(this.new_task.presetTime)
      let data = {
        deptId: this.new_task.department, // '所属部门id',
        doUserId: 128, // '参与人id',
        expertTime: expertTime, // '预计时间',
        faTask: this.faTask, // '父任务id',
        initUserId: 128, //'发起人id',
        proFileList: this.proFileList, // 上传文档列表
        // [
        //   {
        //     fileName: '', // '附件名',
        //     isPro: '', // '项目任务需求（0-项目需求，1-任务需求）',
        //     localPath: '', // '本地路径',
        //     suffix: '' // '文档后缀'
        //   }
        // ],
        proId: this.proId, // '所属项目id',
        remark: this.new_task.remark, // '需求',
        taskName: this.new_task.new_name, //'任务名',
        typeId: this.task_type_value //'任务类型id'
      }
      // console.log(this.new_task.presetTime)
      // console.log(expertTime)
      this.$axios.post('/pmbs/api/task/save', data).then(this.taskSaveSuss)
    },
    // 任务新增回调
    taskSaveSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        // this.projectListJoin = res.data.data
        this.messageWin(res.data.msg)
        this.drawer1 = false
        this.getProjectOfTask(this.proId)
        // console.log(this.projectListJoin)
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
    // 获取页面传参
    this.getParams()
    // 获取项目需求
    // this.getProjectShowDetail()
    this.upload()
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.project_details .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.project_details .top {
  font-size: 13px;
}
.project_details .top .project_name {
  font-weight: 700;
}
.project_details .top .tab {
  height: 26px;
  text-align: center;
  background-color: rgb(247, 247, 247);
  border-radius: 5px;
  border: 1px solid #bbb;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.project_details .detail_list > div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.project_details .detail_list img {
  width: 24px;
}
.project_details .detail_list i {
  font-size: 24px;
}
.project_details .detail_list .sousuo {
  display: flex;
  align-items: center;
}
.project_details .detail_list .sousuo i {
  font-size: 21px;
}
.el-button + .el-button {
  margin: 0;
}
.project_details .tabs {
  margin-bottom: 13px;
}
.project_details .tabs .el-button--primary.is-plain {
  border-color: #ddd;
}
.project_details .tabs >>> .el-button {
  background: #fff;
  color: black;
}
.project_details .tabs >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.project_details .tabs >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.project_details .tabs div:nth-of-type(1) {
  border: none;
}
.project_details .tabs div.act {
  color: white;
}
.project_details .table1 .title,
.project_details .table1 .list {
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
.project_details .table1 .list:hover {
  background: #f7f7f7;
}
.project_details .table1 .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.project_details .table1 .title .el-icon-sort {
  font-size: 18px;
}
.project_details .table1 .title div {
  height: 48px;
  line-height: 48px;
}
.project_details .table1 .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.project_details .table1 .list div:nth-of-type(1) {
  cursor: pointer;
}
.project_details .table1 .list div {
  height: 48px;
  line-height: 48px;
}
.project_details .table1 .result {
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
}
.project_details .table2 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project_details .table2 .title {
  height: 100px;
  box-sizing: border-box;
  padding: 13px;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 4px;
  font-weight: 400;
  font-size: 20px;
  color: rgb(16, 16, 16);
  line-height: 29px;
}

.project_details .table2 .title div:nth-of-type(2) {
  font-weight: 400;
  font-size: 16px;
  color: rgb(96, 94, 94);
  line-height: 24px;
}
.project_details .table2 .need {
  margin-top: 36px;
  font-weight: 400;
  font-size: 16px;
  color: rgb(96, 94, 94);
  line-height: 28px;
}
.project_details .table2 .need .span {
  font-weight: 400;
  font-size: 20px;
  color: rgb(16, 16, 16);
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
.project_details .add_box {
  height: 100%;
  box-sizing: border-box;
  padding: 36px 0;
  /* display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between; */
}
.project_details .add_box > .el-col {
  margin-bottom: 16px;
}
.project_details .add_box .title1 {
  font-weight: 600;
  font-size: 18px;
}
.project_details .add_box .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.project_details .add_box .upload .text {
  width: 146px;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
}
/* .project_details .add_box .new_name {
  height: 40px;
  line-height: 40px;
} */
.project_details .add_box .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project_details .add_box .batton button {
  width: 36%;
}
.project_details .add_box .department .el-radio {
  width: 50%;
  margin-bottom: 9px;
  margin-right: 0;
}
.project_details .add_box .presetTime > div {
  width: 100%;
}
.project_details .add_box .task_type > div {
  width: 100%;
}
.project_details .records_box {
  height: 100%;
}
.project_details .records {
  height: 100%;
}
.project_details .records .title {
  font-weight: bold;
  height: 100px;
  line-height: 100px;
}
.project_details .records .el-card {
  font-size: 16px;
}
.project_details .records .el-card:hover {
  background: #eee;
}
.project_details .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project_details .batton button {
  width: 36%;
}
.project_details .task_details {
  height: 100%;
  padding: 36px 36px 108px 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
  align-items: flex-start;
}
.project_details .task_details > .el-col {
  margin-bottom: 18px;
}
.project_details .task_details .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.project_details .task_details .smname {
  width: 72px;
  text-align: center;
  font-size: 13px;
  color: rgb(162, 162, 162);
}
.project_details .task_details .suggest {
  height: 172px;
}
.project_details .task_details .suggest .suggest_list {
  height: 48px;
  margin-bottom: 12px;
}
.project_details .task_details .suggest .suggest_list .pop,
.project_details .task_details .suggest .suggest_list .time {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: rgb(162, 162, 162);
}
.project_details .task_details .suggest .suggest_list .pop {
  text-align: right;
}
.project_details .task_details .suggest .suggest_list .content {
  color: #000;
  font-size: 16px;
}
.project_details .batton_pa {
  width: 100%;
  padding: 36px;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
}
.project_details .task_details >>> .el-select input {
  width: 81px;
  border: none;
  font-size: 16px;
  padding-left: 0;
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
.project_details >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
