<template>
  <div class="project" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <!-- <div class="grid-content bg-purple-dark"> -->
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
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="新项目" placement="bottom">
              <el-button type="primary" size="small">&nbsp;&nbsp;1&nbsp;&nbsp;</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="延时" placement="bottom">
              <el-button
                type="danger"
                size="small"
              >&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="审核中" placement="bottom">
              <el-button type="warning" size="small">&nbsp;&nbsp;3&nbsp;&nbsp;</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="执行中" placement="bottom">
              <el-button type="success" size="small">&nbsp;&nbsp;4&nbsp;&nbsp;</el-button>
            </el-tooltip>
          </el-button-group>
        </el-col>
        <!-- </div> -->
      </el-col>
      <el-col :span="24" class="tabs">
        <div @click="table_tab(1)" :class="[tabs_activity=='1' ? 'act' : '']">我发起</div>
        <div @click="table_tab(2)" :class="[tabs_activity=='2' ? 'act' : '']">我参与</div>
      </el-col>
      <!-- 我发起 -->
      <el-col :span="24" class="table table1" v-show="table_show">
        <el-table
          ref="filterTable"
          :data="projectListOriginate"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="proName" label="名称">
            <el-link
              slot-scope="scope"
              @click.native="pathPrpjectDetails(scope.row.proId,0)"
            >{{scope.row.proName}}</el-link>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1" class="state_color1">进行中</span>
              <span v-if="scope.row.status == 2" class="state_color2">审核中</span>
              <span v-if="scope.row.status == 3" class="state_color3">完成</span>
              <span v-if="scope.row.status == 4" class="state_color4">延期</span>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="总任务数/待完成">
            <template slot-scope="scope">{{scope.row.listTask.length}}/{{scope.row.unfintask}}</template>
          </el-table-column>
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
          <el-table-column prop="realName" label="下达人"></el-table-column>
          <el-table-column prop="tag" label="操作" width="180" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="info"
                slot="reference"
                v-if="scope.row.status == 2"
                @click="feedback(scope.row.proId,scope.row.proName)"
              >反馈</el-button>
              <el-popconfirm
                title="确认执行此操作吗？"
                @onConfirm="achieve(scope.row.proId,scope.row.proName,scope.row.status)"
              >
                <el-button
                  size="small"
                  type="primary"
                  slot="reference"
                  v-if="scope.row.status == 2"
                >完成</el-button>
              </el-popconfirm>
              <el-button
                size="small"
                type="info"
                slot="reference"
                v-if="scope.row.status == 1 || scope.row.status == 4"
                @click="aredact(scope.row.proId,scope.row.proName)"
              >编辑</el-button>
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="expurgate(scope.row.proId)">
                <el-button
                  size="small"
                  type="info"
                  slot="reference"
                  v-if="scope.row.status == 1|| scope.row.status == 4"
                >删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total="initiateProjectListTota"
          @current-change="initiateProjectList"
        ></el-pagination>-->
      </el-col>
      <!-- 我参与 -->
      <el-col :span="24" class="table table2" v-show="!table_show">
        <el-table
          ref="filterTable"
          :data="projectListJoin"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="name" label="名称">
            <el-link
              slot-scope="scope"
              @click.native="pathPrpjectDetails(scope.row.proId,1)"
            >{{scope.row.proName}}</el-link>
          </el-table-column>
          <el-table-column prop="state_text" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1" class="state_color1">进行中</span>
              <span v-if="scope.row.status == 2" class="state_color2">审核中</span>
              <span v-if="scope.row.status == 3" class="state_color3">完成</span>
              <span v-if="scope.row.status == 4" class="state_color4">延期</span>
            </template>
          </el-table-column>
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
          <el-table-column prop="realName" label="下达人" filter-placement="bottom-end"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total="participateProjectListTota"
          @current-change="participateProjectList"
        ></el-pagination>-->
      </el-col>
      
      <!-- 抽屉 -->
      <el-drawer title="添加任务" :visible.sync="drawer2" :with-header="false">
        <el-scrollbar style="height: 100%">
          <el-row class="add_box">
            <el-col :span="24">
              <el-col :span="6" class="title title1">创建项目</el-col>
            </el-col>
            <el-col :span="6" class="title">名称</el-col>
            <el-col :span="13">
              <el-input placeholder="请输入内容" v-model="new_task.new_name" clearable></el-input>
            </el-col>
            <el-col :span="6" class="title">分类</el-col>
            <el-col :span="13">
              <el-cascader
                v-model="new_task.business_type"
                :options="business_type_list"
                @change="handleChange"
                style="width: 100%;"
              ></el-cascader>
            </el-col>
            <el-col :span="18" :offset="6">
              <el-radio v-model="new_task.radio1" label="1">专项</el-radio>
              <el-radio v-model="new_task.radio1" label="2">日常</el-radio>
            </el-col>
            <el-col :span="6" class="title">预计时间</el-col>
            <el-col :span="13" class="presetTime">
              <el-date-picker v-model="new_task.presetTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
            <el-col :span="6" class="title">需求</el-col>
            <el-col :span="13">
              <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 8}"
                placeholder="请输入内容"
                v-model="new_task.demand"
              ></el-input>
            </el-col>
            <el-col :span="18" :offset="6">
              <el-radio v-model="new_task.radio2" label="1">项目经理</el-radio>
              <el-radio v-model="new_task.radio2" label="2">执行部门</el-radio>
            </el-col>
            <el-col :span="13" :offset="6" v-show="new_task.radio2 == 1">
              <el-input placeholder="请输入内容" v-model="new_task.manager" clearable></el-input>
            </el-col>
            <el-col :span="17" :offset="6" v-show="new_task.radio2 == 2">
              <el-checkbox-group v-model="new_task.checkList" class="check_box">
                <el-checkbox label="武汉策划"></el-checkbox>
                <el-checkbox label="上海研发"></el-checkbox>
                <el-checkbox label="北京网络销售"></el-checkbox>
                <el-checkbox label="武汉内容"></el-checkbox>
                <el-checkbox label="上海项目"></el-checkbox>
              </el-checkbox-group>
            </el-col>
            <el-col :span="24">
              <el-col :span="6" class="title">知晓人</el-col>
            </el-col>
            <el-col :span="18" :offset="6" class="know_pop">
              <el-tag
                :key="tag"
                v-for="tag in new_task.dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
                class="know_pop_list"
              >{{tag}}</el-tag>
            </el-col>
            <el-col :span="9" :offset="6">
              <el-input placeholder="请输入内容" v-model="add_list" clearable></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button size="small" type="primary" @click="showInput">添加</el-button>
            </el-col>
            <!-- 上传 -->
            <el-col :span="13" :offset="6" class="upload">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :auto-upload="false"
                :on-success="testtest"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" class="upload_list">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
              <div class="text">附件</div>
            </el-col>
          </el-row>
        </el-scrollbar>
        <el-row class="batton_pa">
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
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
              <!-- {{checkListdept}} -->
            </el-col>
            <el-col :span="6" class="title">任务</el-col>
            <el-col :span="19">
              <el-checkbox-group v-model="checkListTask">
                <el-checkbox
                  :label="item.taskId"
                  v-for="item in taskNameListShow"
                  :key="item.index"
                >{{item.taskName}}</el-checkbox>
                <!-- <el-checkbox label="网页交互"></el-checkbox> -->
              </el-checkbox-group>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
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
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="result">反馈反馈反馈反馈反馈</el-input>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'project',
  data() {
    return {
      proId: '', // 项目ID
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
      new_task: {
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
      // 上传附件
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
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
      // 客户列表选择结果
      client: '广汽本田',
      // 1-进行中，2-审核中，3-完成，4-延期，5-延期完成
      projectListOriginate: [], // 项目列表我发起
      initiateProjectListTota: [], // 项目列表我发起总页数
      projectListJoin: [], // 项目列表我参与
      participateProjectListTota: [], // 项目列表我参与总页数
      // 1审核中 2执行中 3已完成 4延期
      // 我参与 我发起选项卡
      tabs_activity: 1,
      table_show: true,
      // 项目类型1选择
      tab1_act: 1,
      // 项目类型2选择
      tab2_act: 1,
      // 反馈内容
      //        TABLE `feedback` (
      //   `feedbackId`   '反馈ID',
      //   `taskId`    '所属客户ID，与task表对应',
      //   `initUserId`    '任务发起人，对应user表ID',
      //   `feedback`    '反馈详情',
      //   `updateTime`   '更新时间',
      //   `deleteFlag`   '删除标识',
      // )
      feedbackObj: {
        feedbackId: '',
        taskId: '',
        initUserId: ''
      },
      feedbackContent: '',
      // 反馈时项目下的所有任务
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
      result: '' // 延迟原因内容
    }
  },
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
    }
  },
  // 方法
  methods: {
    // del(){
    //   this.$delete(this.data,"plain", val)
    // },

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
    handleChange(value) {
      console.log(value)
      console.log(this.value)
    },
    // 添加知晓人标签
    showInput() {
      let list = this.new_task.dynamicTags
      let add_list = this.add_list
      let cf = true
      if (add_list) {
        for (let i = 0; i < list.length; i++) {
          const element = list[i]
          if (element == add_list) {
            console.log('请勿重复添加')
            cf = false
          }
        }
        if (cf) {
          list.push(add_list)
          this.add_list = ''
        }
      }
    },
    // 删除知晓人标签
    handleClose(tag) {
      this.new_task.dynamicTags.splice(
        this.new_task.dynamicTags.indexOf(tag),
        1
      )
    },
    // 上传附件
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    // 上传回调
    testtest(res, file, fileList) {
      console.log(res)
      console.log(file)
      console.log(fileList)
    },
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
      // this.project_style = 'height:' + height + 'px;'
    },
    //
    tab1_change(e) {
      // console.log(e)
      if (e == 1) {
        this.tab1_act = 1
      } else if (e == 2) {
        this.tab1_act = 2
      } else if (e == 3) {
        this.tab1_act = 3
      }
    },
    //
    tab2_change(e) {
      // console.log(e)
      if (e == 1) {
        this.tab2_act = 1
      } else if (e == 2) {
        this.tab2_act = 2
      }
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
    // 按钮
    feedback(id, name) {
      // console.log('反馈' + id)
      this.drawer1 = true
      this.drawer1_name = name
      this.proId = id
      this.getProjectTaskListInit(id)
    },
    aredact(id) {
      console.log('编辑' + id)
      this.drawer2 = true
      this.getProjectShowDetail(id)
    },
    achieve(e, name, state) {
      console.log('完成' + e)
      if (state == 4) {
        this.drawer3 = true
        this.drawer3_name = name
      }
    },
    // 获取项目详情
    getProjectShowDetail(id) {
      let data = `?proId=${id}`
      this.$axios
        .post('/pmbs/api/project/showDetail' + data)
        .then(this.getProjectShowDetailSuss)
    },
    // 获取我发起项目下所有任务回调
    getProjectShowDetailSuss(res) {
      console.log(res)
      if (res.status == 200) {
      }
    },
    expurgate(id) {
      // console.log('删除' + id)
      this.delProject(id)
    },
    // 获取我发起项目下所有任务
    getProjectTaskListInit(id) {
      let data = `?proId=${id}`
      this.$axios
        .post('/pmbs/api/project/projectOfTask' + data)
        .then(this.getProjectTaskListInitSuss)
    },
    // 获取我发起项目下所有任务回调
    getProjectTaskListInitSuss(res) {
      console.log(res)
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
    // 项目反馈-任务批量反馈
    projectFeedback() {
      // console.log(this.new_task.presetTime)
      // console.log(expertTime)
      let updateTime = new Date()
      let checkListTask = this.checkListTask
      let taskId = checkListTask.join(',')
      let data = {
        feedback: this.feedbackContent, // 反馈内容
        initUserId: 128, // 反馈人ID
        proId: this.proId, // 反馈项目ID
        taskId: taskId, // 反馈任务ID
        updateTime: updateTime // 反馈时间
      }
      this.$axios
        .post('/pmbs/api/project/projectFeedback', data)
        .then(this.projectFeedbackSuss)
    },
    // 项目反馈-任务批量反馈回调
    projectFeedbackSuss(res) {
      console.log(res)
      if (res.status == 200) {
        this.messageWin('反馈成功')
        this.drawer3 = false
        this.feedbackContent = ''
        this.taskFeedbackId = ''
        // 重新获取项目列表
        this.getProjectListAjax()
      }
    },
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
        this.getProjectListAjax()
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
    // 项目管理-我发起获取
    getProjectListAjax() {
      let data = 128
      this.$axios
        .post('/pmbs/api/project/listAjax' + '?inituserid=' + data)
        .then(this.getProjectListAjaxSuss)
    },
    // 项目管理-我发起获取回调
    getProjectListAjaxSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let projectListOriginate = res.data.data
        for (let i = 0; i < projectListOriginate.length; i++) {
          const element = projectListOriginate[i]
          element.unfintask = 0
          // console.log(element.listTask)
          for (let j = 0; j < element.listTask.length; j++) {
            const element_ = element.listTask[j]
            if (element_.status != 3) {
              element.unfintask++
            }
          }
        }
        console.log(projectListOriginate)
        this.projectListOriginate = projectListOriginate
      }
    },
    // 项目管理-我参与获取
    getProjectUserjoinproject() {
      let data = 40
      this.$axios
        .post('/pmbs/api/project/userjoinproject' + '?inituserid=' + data)
        .then(this.getProjectUserjoinprojectSuss)
    },
    // 项目管理-我参与获取回调
    getProjectUserjoinprojectSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let projectListJoin = res.data.data
        // console.log(projectListOriginate)
        this.projectListJoin = projectListJoin
      }
    },
    // 任务反馈
    putTaskFeedback() {
      let data = {
        initUserId: '001'
      }
      this.$axios
        .post('/pmbs/api/project/taskfeedback', data)
        .then(this.putTaskFeedbackSuss)
    },
    putTaskFeedbackSuss(res) {
      console.log(res)
    },
    // // 我发起分页
    // initiateProjectList(page) {
    //   this.getProjectListAjax(page)
    // },
    // // 我参与分页
    // participateProjectList(page){
    //   this.getUserJoinProjectAjax(page)
    // },
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
    this.widthheight()
    // this.getlocalStorage()
    this.getProjectListAjax()
    this.getProjectUserjoinproject()
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.project .top {
  height: 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.project .top .title {
  height: 32px;
  line-height: 32px;
  text-align: center;
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
  padding: 13px 0;
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
</style>
