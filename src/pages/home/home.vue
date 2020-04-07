<template>
  <div class="home">
    <Header @func="getMsgFormSon" @message="getMessage" :unread="unread"></Header>
    <el-container style="height: 100vh; padding-top: 75px;">
      <!--------- 左菜单栏 start --------->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);position: relative;">
        <div
          :class="[show_acti=='2' || show_acti=='6'?'title act':'title']"
          @click="change_show(2,'project')"
        >
          <i class="el-icon-document-copy"></i>
          项目管理
        </div>
        <div :class="[show_acti=='3'?'title act':'title']" @click="change_show(3,'task')">
          <i class="el-icon-finished"></i>
          任务管理
        </div>
        <div :class="[show_acti=='4'?'title act':'title']" @click="change_show(4,'document')">
          <i class="el-icon-folder-opened"></i>
          文档管理
        </div>
        <div
          :class="[show_acti=='1'?'title act':'title']"
          @click="change_show(1,'statistics')"
          v-if="statisticsShow"
        >
          <i class="el-icon-pie-chart"></i>
          统计
        </div>
        <div
          :class="[show_acti=='5'?'title act':'title']"
          @click="change_show(5,'set')"
          v-if="setShow"
        >
          <i class="el-icon-setting"></i>
          设置
        </div>
        <div class="bottom">
          <el-link @click="operator" type="primary">操作文档</el-link>|
          <el-link @click="problemFeedback" type="primary">问题反馈</el-link>
        </div>
      </el-aside>
      <!--------- 左菜单栏 end --------->
      <el-container>
        <!--------- 内容 start --------->
        <el-main>
          <router-view @getData="getData" ref="project" :update="update"></router-view>
        </el-main>
        <!---------- 内容 end --------->
      </el-container>
    </el-container>
    <!--------- 抽屉添加任务 start --------->
    <el-drawer title="添加任务" :visible.sync="drawer" :with-header="false">
      <el-scrollbar style="height: 100%">
        <el-row class="add_box">
          <el-col :span="24">
            <el-col :span="6" class="title title1">{{typeName}}</el-col>
          </el-col>
          <el-col :span="6" class="title">名称</el-col>
          <el-col :span="13">
            <el-input placeholder="请输入内容" v-model="new_project.new_name" clearable></el-input>
          </el-col>
          <el-col :span="6" class="title">客户</el-col>
          <el-col :span="13">
            <el-select v-model="clientId" filterable clearable placeholder="请选择" class="pasproject">
              <el-option
                v-for="item in clientList"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="title">业务类型</el-col>
          <el-col :span="13">
            <el-select
              v-model="businessId"
              filterable
              clearable
              placeholder="请选择"
              class="pasproject"
            >
              <el-option
                v-for="item in businessList"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="title">立项</el-col>
          <el-col :span="13">
            <el-select
              v-model="pasprojectId"
              filterable
              clearable
              placeholder="请选择"
              class="pasproject"
            >
              <el-option
                v-for="item in pasProjectList"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="18" :offset="6">
            <el-radio v-model="new_project.radio1" label="1">专项</el-radio>
            <el-radio v-model="new_project.radio1" label="0">日常</el-radio>
          </el-col>
          <el-col :span="6" class="title">预计时间</el-col>
          <el-col :span="13" class="presetTime">
            <el-date-picker
              v-model="new_project.presetTime"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-col>
          <el-col :span="6" class="title">需求</el-col>
          <el-col :span="13">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 8}"
              placeholder="请输入内容"
              v-model="new_project.remark"
            ></el-input>
          </el-col>
          <el-col :span="18" :offset="6">
            <el-radio v-model="radio2" label="1" :disabled="disabled1">项目经理</el-radio>
            <el-radio v-model="radio2" label="2" :disabled="disabled2">执行部门</el-radio>
          </el-col>
          <el-col :span="13" :offset="6" v-show="radio2 == 1">
            <el-select
              v-model="new_project.managerId"
              filterable
              clearable
              placeholder="请选择"
              class="userList"
            >
              <el-option
                v-for="item in userList"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="17" :offset="6" v-show="radio2 == 2">
            <el-checkbox-group v-model="new_project.checkList" class="check_box">
              <el-checkbox
                :label="items.id"
                v-for="items in deptList"
                :key="items.index"
                :disabled="checkListBan"
              >{{items.name}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="24">
            <el-col :span="6" class="title">知晓人</el-col>
          </el-col>
          <!-- 知晓人编辑 -->
          <el-col :span="18" :offset="6" class="know_pop">
            <el-tag
              :key="tag.index"
              v-for="tag in new_project.dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              class="know_pop_list"
            >{{tag}}</el-tag>
          </el-col>
          <el-col :span="9" :offset="6">
            <el-select v-model="add_list" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- {{add_list}} -->
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button size="small" type="primary" @click="showInput">添加</el-button>
          </el-col>

          <!-- 上传 -->
          <el-col :span="13" :offset="6" class="upload">
            <el-upload
              :action="uploadUrl"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
            >
              <el-button size="mini" type="primary" v-show="disabled0">点击上传附件</el-button>
            </el-upload>
            <!-- <el-dialog :visible.sync="dialogVisible" class="upload_list">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>-->
          </el-col>
        </el-row>
      </el-scrollbar>
      <el-row class="batton_pa">
        <el-col :span="12" :offset="7" class="batton">
          <el-button size="small" type="info" @click="empty()">取消</el-button>
          <el-button size="small" type="primary" @click="addProject">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
    <!--------- 抽屉添加任务 end --------->

    <!--------- 抽屉消息面板 start --------->
    <el-drawer title="消息列表" :visible.sync="drawer2" :with-header="false">
      <el-row class="messageBox">
        <el-col :span="24" class="title">消息列表</el-col>
        <el-col :span="24" class="tabsBox">
          <el-col
            :span="8"
            :class="[tabs == 1 ? 'act' : '', 'tabs']"
            @click.native="changeTabs(1)"
          >项目</el-col>
          <el-col
            :span="8"
            :class="[tabs == 2 ? 'act' : '', 'tabs']"
            @click.native="changeTabs(2)"
          >任务</el-col>
          <el-col
            :span="8"
            :class="[tabs == 3 ? 'act' : '', 'tabs']"
            @click.native="changeTabs(3)"
          >审核</el-col>
        </el-col>
        <el-col :span="24" class="paneBox">
          <el-col :span="24" class="pane" v-if="tabs == 1" v-loading="loading">
            <el-col
              :span="24"
              class="infinite-list"
              v-infinite-scroll="load"
              :infinite-scroll-disabled="scrollDisabled"
              style="overflow:auto"
            >
              <el-col
                :span="24"
                v-for="(items,index) in messageData"
                class="infinite-list-item"
                :key="index"
              >
                <el-col :span="8" class="time">{{$time(items.createTime)}}</el-col>
                <el-col :span="16" class="title">{{items.typeName}}</el-col>
                <el-col :span="16" class="content" :offset="8">{{items.contents}}</el-col>
              </el-col>
              <el-col :span="24" class="noData" v-if="messageData.length == 0">暂无数据</el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="pane" v-else-if="tabs == 2" v-loading="loading">
            <el-col
              :span="24"
              class="infinite-list"
              v-infinite-scroll="load"
              :infinite-scroll-disabled="scrollDisabled"
              style="overflow:auto"
            >
              <el-col
                :span="24"
                v-for="(items,index) in messageData"
                class="infinite-list-item"
                :key="index"
              >
                <el-col :span="8" class="time">{{$time(items.createTime)}}</el-col>
                <el-col :span="16" class="title">{{items.typeName}}</el-col>
                <el-col :span="16" class="content" :offset="8">{{items.contents}}</el-col>
              </el-col>
              <el-col :span="24" class="noData" v-if="messageData.length == 0">暂无数据</el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="pane" v-else-if="tabs == 3" v-loading="loading">
            <el-col
              :span="24"
              class="infinite-list"
              v-infinite-scroll="load"
              :infinite-scroll-disabled="scrollDisabled"
              style="overflow:auto"
            >
              <el-col
                :span="24"
                v-for="(items,index) in messageData"
                class="infinite-list-item"
                :key="index"
              >
                <el-col :span="8" class="time">{{$time(items.createTime)}}</el-col>
                <el-col :span="16" class="title">{{items.typeName}}</el-col>
                <el-col :span="16" class="content" :offset="8">{{items.contents}}</el-col>
              </el-col>
              <el-col :span="24" class="noData" v-if="messageData.length == 0">暂无数据</el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!--------- 抽屉消息面板 end --------->

    <!--------- 抽屉问题反馈 start --------->
    <el-drawer title="问题反馈" :visible.sync="drawer3" :with-header="false">
      <el-row class="problemFeedback" v-loading="loadingFeedback">
        <el-col :span="24">
          <el-col :span="6" class="title title1">问题反馈</el-col>
        </el-col>
        <el-col :span="6" class="title">问题版块</el-col>
        <el-col :span="13">
          <el-select
            v-model="feedbackType"
            filterable
            placeholder="请选择"
            style="width:100%"
            ref="input"
          >
            <el-option
              v-for="item in feedbackTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              clearable
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" class="title">问题描述</el-col>
        <el-col :span="13">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="feedbackContent"></el-input>
        </el-col>
        <el-col :span="13" :offset="6">
          <el-upload
            action="/pmbs/file/upload?upType=0&demandType=0"
            :on-success="handleFeedbackSuccess"
            :on-remove="handleFeedbackRemove"
            :file-list="fileListFeedback"
          >
            <el-button size="mini" type="primary" v-show="disabled0">点击上传附件</el-button>
          </el-upload>
        </el-col>
        <el-col :span="12" :offset="7" class="batton">
          <el-button size="small" type="info" @click="closeProblem">取消</el-button>
          <el-button size="small" type="primary" @click="problemSave">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
    <!--------- 抽屉问题反馈 end --------->
  </div>
</template>
<script>
import Header from '@/pages/header'
import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'home',
  components: {
    Header
  },
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      typeName: '', // 创建项目/编辑项目
      proData: {},
      home_style: '',
      show_acti: 2,
      drawer: false,
      drawer2: false,
      drawer3: false,
      restaurants: [], // 用户列表
      deptList: [], // 部门列表
      userList: [], // 用户列表
      radio2: '1', // 项目经理,执行部门 选择
      disabled1: false,
      disabled2: false,
      proId: '', // 项目id
      status: 1, // 项目状态
      // 新增
      new_project: {
        new_name: '', // 任务名称
        radio1: '0', // 专项，日常
        presetTime: '', // 预计时间
        remark: '', // 需求
        manager: '', // 项目经理
        managerId: '', // 项目经理ID
        checkList: [], // 执行部门
        dynamicTags: [] // 知晓人
      },
      clientList: [], // 客户列表
      clientId: '', // 分类 客户
      businessList: [], // 业务列表
      businessId: '', // 分类 业务
      pasProjectList: [], // 立项信息列表
      pasprojectId: '', // 分类 立项
      checkListBan: false, // 执行部门禁用
      // 禁止选择当前时间之前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      // 知晓人
      add_list: '',
      // 上传附件
      dialogImageUrl: '123',
      dialogVisible: false,
      disabled: false,
      disabled0: true,
      listProFile: [], // 上传文件信息列表
      type: '',
      clientList: [],
      uploadUrl: '',
      fileList: [],
      // 新增项目时传值获取项目列表
      update: 0,
      // 统计/设置显示
      statisticsShow: false,
      setShow: false,
      // 消息面板默认显示
      scrollDisabled: true, // 禁用加载
      loading: false,
      messageData: [],
      count: 0,
      tabs: 1,
      messagePage: 1,
      // WebSocket
      path: 'ws://218.106.254.122:8084/pmbs/websocket/',
      // //218.106.254.122:8084/pmbs/websocket/266
      socket: '',
      // 未读消息
      unread: 0,
      // 问题反馈
      loadingFeedback: false,
      feedbackType: '',
      feedbackTypeList: [
        {
          value: 1,
          label: '项目/任务'
        },
        {
          value: 2,
          label: '文档管理'
        },
        {
          value: 3,
          label: '统计'
        },
        {
          value: 4,
          label: '设置'
        }
      ],
      feedbackContent: '',
      feedbackFileList: [],
      fileListFeedback: []
    }
  },
  // 侦听器
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    radio2: function(newQuestion, oldQuestion) {
      if (this.radio2 == 1) {
        // console.log(this.radio2)
        this.new_project.checkList = []
      } else if (this.radio2 == 2) {
        // console.log(this.radio2)
        this.new_project.manager = ''
        this.new_project.managerId = ''
      }
    },
    clientId: function(newQuestion, oldQuestion) {
      let clientId = this.clientId
      if (clientId) {
        // 根据客户ID查立项
        let data = `?clientId=${clientId}`
        this.getProjectapiListAjax(data)
        // 根据客户ID查业务
        this.getBusinessByClientId(data)
      }
    },
    $route: 'router_url'
  },
  // 钩子函数
  mounted() {
    this.init()
    this.widthheight()
    sessionStorage.setItem('refresh', 0)
    this.router_url()
    this.upload()
    // this.getProjectFeedbackDetail()
    // 获取部门列表
    this.getDeptList()
    // 获取用户列表
    this.getListAjax()
    // this.restaurants = this.loadAll()
    // 统计/设置显示判断
    this.statisticsShowIf()
    this.setShowIf()
  },
  // 方法
  methods: {
    ///////// WebSocket start /////////
    init: function() {
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        let userId = this.userId
        // let path = this.path + userId
        let path = `ws:218.106.254.122:8084/pmbs/websocket/${userId}`
        // let path = `ws://nwne722jqh.52http.com/websocket/266`
        // ws://218.106.254.122:8084/pmbs/websocket/
        // 实例化socket
        this.socket = new WebSocket(path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听监听socket消息消息
        this.socket.onmessage = this.getMessageSocket
      }
    },
    open: function(res) {
      // console.log(res)
      console.log('socket连接成功')
      // this.send()
    },
    error: function() {
      console.log('连接错误')
    },
    getMessageSocket: function(msg) {
      // console.log(msg)
      let data = JSON.parse(msg.data)
      // console.log(data)
      this.NotificationInfo(data)
      let unread = this.unread
      this.unread = unread + 1
    },
    send: function() {
      // this.socket.send(params)
      this.socket.send('test')
      console.log('test')
    },
    close: function() {
      console.log('socket已经关闭')
    },
    destroyed() {
      // 销毁监听
      this.socket.onclose = this.close
    },
    ///////// WebSocket end /////////

    ///////// 信息列表 start /////////
    getMessageListAjax(type) {
      this.loading = true
      let pageNum = this.messagePage
      let userId = this.userId
      let data = {
        message: {
          type: type,
          userId: userId
        },
        pageNum: pageNum,
        pageSize: 10
      }
      this.$axios
        .post('/pmbs/api/message/listAjax', data)
        .then(this.getMessageListAjaxSuss)
    },
    // 信息列表获取回调
    getMessageListAjaxSuss(res) {
      this.loading = false
      // console.log(res)
      if (res.status == 200) {
        // 列表数据追加
        let data = res.data.items
        if (data.length < 10) {
          this.scrollDisabled = true
        } else {
          this.scrollDisabled = false
        }
        // console.log(this.scrollDisabled)
        let messageData = this.messageData
        this.messageData = messageData.concat(data)
        // 页码加一
        let messagePage = this.messagePage + 1
        this.messagePage = messagePage
        let unread = this.unread
        this.unread = unread + 1
        // console.log(this.messagePage)
      }
    },
    ///////// 信息列表 end /////////

    ///////// 消息面板选项卡 start /////////
    changeTabs(tabs) {
      this.tabs = tabs
      this.messagePage = 1 // 页码重置
      this.messageData = [] // 消息列表重置
      this.getMessageListAjax(tabs) // 消息列表获取
    },
    load() {
      let tabs = this.tabs
      this.getMessageListAjax(tabs)
    },
    // test(){
    //   console.log("test")
    // },
    ///////// 消息面板选项卡 end /////////

    matchType, // 文件格式判断
    // 分类二级联动
    handleChange(value) {
      // console.log(value)
      // console.log(this.value)
    },
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
      this.home_style = 'height:' + height + 'px;'
    },
    // 页面切换
    change_show(e, url) {
      this.show_acti = e
      if (this.$route.path == '/home/components/' + url) {
        return ''
      } else {
        this.$router.push({ path: '/home/components/' + url })
      }
    },
    // 添加知晓人标签
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
    ///////// 接受子组件数据 start /////////
    getMsgFormSon(data) {
      this.drawer = true
      this.getClientapiListAjax()
      // 新建项目
      this.typeName = '创建项目'
      // this.$router.push({ path: '/home/components/project' })
      // this.$router.replace('/home/components/project').catch(err => {
      //   console.log(err)
      // })
      // 点击新建项目时置空信息
      this.proData = {} // 项目详情
      this.proId = '' // 项目Id
      this.clientId = '' // 分类 客户
      this.businessId = '' // 分类 业务
      this.pasprojectId = '' // 分类 立项
      this.new_project.new_name = '' // 任务名称
      this.new_project.business_type = [] // 分类 客户-类型
      this.new_project.presetTime = '' // 预计时间
      this.new_project.checkList = [] // 执行部门
      this.new_project.remark = '' // 需求
      this.new_project.dynamicTags = [] // 知晓人
      this.new_project.managerId = '' // 项目经理
      this.disabled1 = false
      this.disabled2 = false
      this.fileList = []
      this.listProFile = []
      this.checkListBan = false
    },
    getData(data) {
      // 获取新建项目分类
      this.getClientapiListAjax()
      // 获取项目详情
      this.getProjectShowDetail(data)
      this.drawer = true
      // 编辑项目
      this.typeName = '编辑项目'
      // this.proData = data
      // console.log(data)
    },
    getMessage() {
      this.drawer2 = true
      this.messageData = []
      let tabs = this.tabs
      this.getMessageListAjax(tabs)
    },
    ///////// 接受子组件数据 end /////////

    ///////// 用户列表获取 start /////////
    getClientapiListAjax(res) {
      let clientList = this.clientList
      let userId = this.userId
      // let userId = 113
      if (clientList.length == 0) {
        // let data = {
        //   userId: userId
        // }
        let data = `?userId=${userId}`
        this.$axios
          .post('http://pms.guoxinad.com.cn/pas/clientapi/listAjax' + data)
          .then(this.getClientapiListAjaxSuss)
      }
    },
    // 用户列表获取回调
    getClientapiListAjaxSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let data = res.data
        // console.log(data)
        let clientList = []
        data.forEach(element => {
          let clientListData = {
            value: element.clientId,
            label: element.clientName //,
          }
          clientList.push(clientListData)
        })
        this.clientList = clientList
      }
    },
    ///////// 用户列表获取 end /////////

    ///////// 根据客户ID查业务 start /////////
    getBusinessByClientId(data) {
      this.$axios
        .post('/pmbs/api/business/getBusinessByClientId' + data)
        .then(this.getBusinessByClientIdSuss)
    },
    // 根据客户ID查业务回调
    getBusinessByClientIdSuss(res) {
      if (res.status == 200) {
        let data = res.data
        // 循环提取名称和ID
        let businessList = []
        data.forEach(element => {
          let businessListData = {
            value: element.businessId,
            label: element.businessName
          }
          businessList.push(businessListData)
        })
        this.businessList = businessList
      }
    },
    ///////// 根据客户ID查业务 end /////////

    ///////// 立项列表获取 start /////////
    getProjectapiListAjax(data) {
      this.$axios
        .post('http://pms.guoxinad.com.cn/pas/projectapi/listAjax' + data)
        .then(this.getProjectapiListAjaxSuss)
    },
    // 立项列表获取回调
    getProjectapiListAjaxSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let data = res.data
        let pasProjectList = []
        data.forEach(element => {
          let pasProjectListData = {
            value: element.projectId,
            label: element.projectName
          }
          pasProjectList.push(pasProjectListData)
        })
        this.pasProjectList = pasProjectList
      }
    },
    ///////// 立项列表获取 end /////////
    // 获取项目详情
    getProjectShowDetail(data) {
      // console.log(data)
      // if (res.status == 200) {
      // let data = data
      // console.log(data)
      this.proId = data.proId
      this.status = data.status
      this.new_project.new_name = data.proName
      this.clientId = data.clientId
      this.businessId = data.serviceId
      this.pasprojectId = data.pasprojectId
      // this.new_project.business_type = [data.clientId, data.serviceId]
      if (data.isUsual == false) {
        this.new_project.radio1 = '0'
      } else {
        this.new_project.radio1 = '1'
      }
      this.new_project.presetTime = data.expertTime
      this.new_project.remark = data.remark
      if (data.manager != null) {
        this.radio2 = '1'
        this.disabled2 = true
        this.new_project.managerId = data.manager
      } else if (data.department != null) {
        this.radio2 = '2'
        this.disabled1 = true
        let department = data.department.split(',')
        let checkList = []
        for (let i = 0; i < department.length; i++) {
          let element = department[i]
          let deparData = parseInt(element)
          checkList.push(deparData)
        }
        this.new_project.checkList = checkList
      }
      this.checkListBan = true
      if (data.knowUser != '') {
        let knowUserListS = data.knowUser.split(',')
        let knowUserList = []
        for (let i = 0; i < knowUserListS.length; i++) {
          let element = knowUserListS[i]
          let knowUserListData = parseInt(element)
          knowUserList.push(knowUserListData)
        }
        // 用户列表
        let userList = this.userList
        let knowUserListName = []
        for (let i = 0; i < knowUserList.length; i++) {
          let element = knowUserList[i]
          let knowUserListData = ''
          for (let j = 0; j < userList.length; j++) {
            let element_ = userList[j]
            if (element == element_.value) {
              knowUserListData = element_.label
            }
          }
          knowUserListName.push(knowUserListData)
        }
        this.new_project.dynamicTags = knowUserListName
        let listProFile = data.listProFile
        this.listProFile = listProFile
        let fileList = []
        for (let i = 0; i < listProFile.length; i++) {
          let element = listProFile[i]
          let data_ = {
            fileId: element.fileId,
            name: element.fileName
          }
          fileList.push(data_)
        }
        this.fileList = fileList
        this.listProFile = data.listProFile
        // console.log(this.new_project.dynamicTags)
      }
      // }
    },
    // 获取判断路由地址
    router_url() {
      let url = this.$route.path
      let url1 = '/home/components/statistics'
      let url2 = '/home/components/project'
      let url2_ = '/home/components/project_details'
      let url3 = '/home/components/task'
      let url4 = '/home/components/document'
      let url5 = '/home/components/set'
      if (url == url1) {
        this.show_acti = 1
      } else if (url == url2) {
        this.show_acti = 2
      } else if (url == url2_) {
        this.show_acti = 2
      } else if (url == url3) {
        this.show_acti = 3
      } else if (url == url4) {
        this.show_acti = 4
      } else if (url == url5) {
        this.show_acti = 5
      }
    },
    ///////// 上传附件 start /////////
    upload() {
      let upType = 0
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
          fileName: resData.fileName, //'附件名称',
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType, //'文档后缀'
          isPro: 0, // 文档需求
          ptId: this.proData.proId || '' //所属项目ID
        }
        listProFile.push(listProFileData)
        this.listProFile = listProFile
        // console.log(this.listProFile)
      }
    },
    // 删除
    handleRemove(file) {
      // console.log(file)
      let data = file
      let listProFile = this.listProFile
      for (let i = 0; i < listProFile.length; i++) {
        let element = listProFile[i]
        if (element.fileId == data.fileId) {
          listProFile[i].deleteFlag = true
          // listProFile.splice(i, 1)
          // console.log('删除')
        }
      }
      this.listProFile = listProFile
      // console.log(this.listProFile)
    },
    ///////// 上传附件 end /////////
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
        let deptId = this.deptId
        let deptList = []
        for (let i = 0; i < data.length; i++) {
          let element = data[i]
          if (element.deptId != deptId) {
            let deptListData = {}
            deptListData.id = element.deptId
            deptListData.name = element.deptName
            deptList.push(deptListData)
          }
        }
        this.deptList = deptList
        // console.log(deptList)
      }
    },
    ///////// 用户列表获取 start /////////
    getListAjax(res) {
      let list = this.userList
      if (list.length == 0) {
        let data = { pageNum: 1 }
        this.$axios.post('/pmbs/api/user/list', data).then(this.getListAjaxSuss)
      }
    },
    // 用户列表获取回调
    getListAjaxSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let data = res.data.data
        let userList = []
        for (let i = 0; i < data.length; i++) {
          let userListData = {}
          let element = data[i]
          userListData.value = element.userId
          userListData.label = `${element.deptName}-${element.realName}`
          userList.push(userListData)
        }
        this.userList = userList
        this.restaurants = userList
        // console.log(restaurants)
      }
    },
    ///////// 用户列表获取 end /////////

    ///////// 新增项目 start /////////
    addProject() {
      let userId = this.$store.state.user.userId
      // 创建时间
      let createTime = new Date()
      // 用户列表
      let userList = this.userList
      // 执行部门ID数组转为字符串
      let checkList = this.new_project.checkList
      let department = checkList.join(',')
      // 知晓人名称列表
      let dynamicTags = this.new_project.dynamicTags
      // console.log(dynamicTags)
      let knowUserList = []
      for (let i = 0; i < dynamicTags.length; i++) {
        let element = dynamicTags[i]
        let knowUserListData = ''
        for (let j = 0; j < userList.length; j++) {
          let element_ = userList[j]
          if (element == element_.label) {
            knowUserListData = element_.value
          }
        }
        knowUserList.push(knowUserListData)
      }
      let knowUser = knowUserList.join(',')
      let radio2 = this.radio2
      // console.log(knowUser)
      let data = {
        proId: this.proId, // 项目id
        createTime: createTime, // 创建时间
        initUserId: userId, //'发起人id',
        status: this.status, // 状态
        proName: this.new_project.new_name, // '项目名称',
        clientId: this.clientId, // '所属客户ID',
        serviceId: this.businessId, // '所属业务ID'
        pasprojectId: this.pasprojectId, // 立项ID
        isUsual: this.new_project.radio1, // '专项日常（0-日常，1-专项）',
        expertTime: this.new_project.presetTime, // '预计完成时间',
        remark: this.new_project.remark, // '需求',
        knowUser: knowUser, // '知晓人id，多个用逗号隔开',
        listProFile: this.listProFile // 需求文档列表
      }
      // console.log(data)
      let changeId = ''
      if (radio2 == 1) {
        changeId = this.new_project.managerId
        data.manager = changeId // '项目经理id',
      } else if (radio2 == 2) {
        changeId = department
        data.department = changeId // '参与部门ID',
      }
      // console.log(data)
      if (
        data.proName == '' ||
        this.new_project.business_type == [] ||
        data.clientId == '' ||
        data.serviceId == '' ||
        data.pasprojectId == '' ||
        data.expertTime == '' ||
        data.remark == '' ||
        changeId == ''
      ) {
        this.messageError('信息不能为空')
      } else {
        this.$axios
          .post('/pmbs/api/project/save', data)
          .then(this.addProjectSuss)
      }
    },
    // 新增项目回调
    addProjectSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        this.messageWin('项目添加成功')
        this.drawer = false
        this.radio2 = 1
        // 重置信息
        this.empty()
        let update = this.update
        this.update = update + 1
      }
    },
    ///////// 新增项目 end /////////
    // 获取项目反馈-项目详情
    getProjectFeedbackDetail() {
      let data = `?proId=1`
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
    // 抽屉取消按钮
    // 清空内容
    empty() {
      this.drawer = false
      this.new_project.new_name = '' // 任务名称
      this.new_project.business_type = [] // 类型
      this.new_project.presetTime = '' // 预计时间
      this.new_project.remark = '' // 需求
      this.new_project.dynamicTags = [] // 知晓人
      this.new_project.managerId = '' // 项目经理
      this.new_project.checkList = [] // 执行部门
      this.add_list = ''
      this.listProFile = []
      this.file_list = []
      this.new_project.radio1 = '0'
    },
    // 操作文档链接
    operator() {
      let newPage = window.open() // 防止浏览器拦截
      newPage.location.href = 'http://218.106.254.122:8084/doc/123.pdf'
    },
    ///////// 问题反馈 start /////////
    blur() {
      this.$refs['input'].blur()
    },
    problemFeedback() {
      this.drawer3 = true
      setTimeout(this.blur, 100)
    },
    // 问题反馈文件上传回调
    handleFeedbackSuccess(response, file, fileList) {
      // console.log(fileList)
      if (response.errcode == 0) {
        // let data = response.data
        // let fileData = {
        //   picName: data.fileName,
        //   localPath: data.path
        // }
        // let feedbackFileList = this.feedbackFileList
        // feedbackFileList.push(fileData)
        let feedbackFileList = []
        fileList.forEach(element => {
          let data = element.response.data
          let fileData = {
            picName: data.fileName,
            localPath: data.path
          }
          feedbackFileList.push(fileData)
        })
        this.feedbackFileList = feedbackFileList
        console.log(feedbackFileList)
      }
    },
    // 问题反馈文件删除回调
    handleFeedbackRemove(file, fileList) {
      // console.log(fileList)
      let feedbackFileList = []
      fileList.forEach(element => {
        let data = element.response.data
        let fileData = {
          picName: data.fileName,
          localPath: data.path
        }
        feedbackFileList.push(fileData)
      })
      this.feedbackFileList = feedbackFileList
      console.log(feedbackFileList)
    },
    // 取消按钮
    closeProblem() {
      this.feedbackContent = ''
      this.feedbackType = ''
      this.feedbackFileList = []
      this.fileListFeedback = []
      this.drawer3 = false
    },
    // 问题反馈新增
    problemSave() {
      this.loadingFeedback = true
      let data = {
        description: this.feedbackContent,
        moduleType: this.feedbackType,
        pictureList: this.feedbackFileList,
        userId: this.userId
      }
      // console.log(data)
      if (
        data.description == '' ||
        data.moduleType == '' ||
        data.pictureList.length == 0
      ) {
        this.messageError('信息不能为空')
      } else {
        this.$axios.post('/pmbs/api/problem/save', data).then(res => {
          this.loadingFeedback = false
          console.log(res)
          if (res.status == 200) {
            this.closeProblem()
            this.messageWin(res.data.msg)
          }
        })
      }
    },
    ///////// 问题反馈 end /////////
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
    },
    NotificationInfo(data) {
      // 消息实时提示
      this.$notify.info({
        title: data.header,
        message: data.contents,
        duration: 10000
      })
      // this.$notify.info({
      //   title: `项目创建${data}`,
      //   message: `收到一个项目测试创建${data}`
      // })
    },
    // 统计/设置显示判断
    statisticsShowIf() {
      let show = [6, 9, 24, 27, 28, 89, 134, 147, 152, 160, 194]
      let userId = this.userId
      let statisticsShow = false
      show.forEach(element => {
        if (element == userId) {
          statisticsShow = true
        }
      })
      this.statisticsShow = statisticsShow
    },
    setShowIf() {
      let show = [9, 10, 266, 4001, 3985, 147, 4023, 6, 28, 3820, 194, 527, 134]
      let userId = this.userId
      let setShow = false
      show.forEach(element => {
        if (element == userId) {
          setShow = true
        }
      })
      this.setShow = setShow
    }
  }
}
</script>
<style scoped>
.el-icon-arrow-down {
  display: none;
}
.el-aside {
  padding-top: 36px;
}
.el-aside .title {
  font-family: 'SourceHanSansSC';
  font-size: 16px;
  color: rgb(16, 16, 16);
  padding: 0 20px;
  cursor: pointer;
  -webkit-transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 56px;
  line-height: 56px;
  position: relative;
  -webkit-box-sizing: border-box;
  white-space: nowrap;
  list-style: none;
}
.el-aside .title:hover {
  background: #fff;
}
.el-aside .title.act {
  background: #fff;
}
.el-aside .title i {
  width: 24px;
  font-size: 18px;
  margin-right: 5px;
}
.el-main {
  min-width: 1080px;
}
.home .add_box {
  /* height: 985px; */
  box-sizing: border-box;
  padding: 36px 0 108px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
}
.home .add_box > .el-col {
  margin-bottom: 16px;
}
.home .add_box .title1 {
  font-weight: 600;
  font-size: 18px;
}
.home .add_box .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.home .add_box .presetTime > div {
  width: 100%;
}
.home .add_box .check_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.home .add_box .check_box .el-checkbox {
  width: 50%;
  margin: 0;
}
.home .add_box .upload .text {
  width: 146px;
  text-align: left;
  color: rgba(0, 0, 0, 0.65);
}
.home .add_box .manager {
  width: 100%;
}
.home .add_box .know_pop span {
  margin-left: 0;
  margin-right: 9px;
}
.home .add_box .know_pop .know_pop_list {
  margin-bottom: 13px;
}
.home .add_box .userList {
  width: 100%;
}
.home .add_box .pasproject {
  width: 100%;
}
.home .batton_pa {
  width: 100%;
  padding: 36px;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.home .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.home .batton button {
  width: 36%;
}
.home >>> .el-drawer__body {
  height: 100%;
}
.home >>> .el-main .cell {
  text-align: left;
}
.home .messageBox {
  height: 100%;
  padding: 36px;
}
.home .messageBox .title {
  font-weight: 600;
  font-size: 18px;
}
.home .tabsBox {
  height: 40px;
  margin-top: 24px;
}
.home .tabs {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid rgb(224, 227, 234);
  /* border-radius: 3px; */
  cursor: pointer;
}
.home .tabs:hover {
  color: rgb(56, 148, 255);
}
.home .tabs.act {
  height: 40px;
  line-height: 40px;
  color: rgb(56, 148, 255);
  text-align: center;
  border-bottom: none;
}
.home .tabs:nth-of-type(1),
.home .tabs:nth-of-type(2) {
  border-right: none;
}
.home .paneBox {
  /* height: 100vh; */
  height: calc(100% - 120px);
  margin-top: 32px;
}
.home .pane {
  height: 100%;
  /* margin-top: 32px; */
}
.home .paneBox .infinite-list {
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  scrollbar-width: none; /* Firefox */
}
.home .paneBox .infinite-list::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.home .paneBox .infinite-list .infinite-list-item {
  height: 100px;
  font-size: 14px;
  box-sizing: border-box;
  padding: 18px 0;
  border-bottom: 1px solid rgb(224, 227, 234);
}
.home .paneBox .infinite-list .infinite-list-item > div {
  /* height: 18px; */
  line-height: 18px;
}
.home .paneBox .infinite-list .infinite-list-item .title {
  font-weight: bold;
  font-size: 15px;
}
.home .paneBox .infinite-list .infinite-list-item .content {
  margin-top: 9px;
}
.home .problemFeedback {
  height: 100%;
  padding: 36px;
  position: relative;
}
.home .problemFeedback > div {
  margin-top: 13px;
}
.home .problemFeedback .title.title1 {
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 13px;
}
.home .problemFeedback .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.home .problemFeedback .batton {
  position: absolute;
  bottom: 108px;
  left: 0;
}
.noData {
  text-align: center;
}
.home .bottom {
  width: 100%;
  box-sizing: border-box;
  padding: 0 13px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 36px;
}
.home .bottom a {
  font-size: 14px;
}
.home >>> .el-table td,.home >>> .el-table th{
  padding: 9px 0;
}
</style>
