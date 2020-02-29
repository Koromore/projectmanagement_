<template>
  <div class="home">
    <Header @func="getMsgFormSon"></Header>
    <el-container style="height: 100vh; padding-top: 75px;">
      <!-- 左菜单栏 start -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div :class="[show_acti=='1'?'title act':'title']" @click="change_show(1,'statistics')">
          <i class="el-icon-pie-chart"></i>
          统计
        </div>
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
        <div :class="[show_acti=='5'?'title act':'title']" @click="change_show(5,'set')">
          <i class="el-icon-setting"></i>
          设置
        </div>
      </el-aside>
      <!-- 左菜单栏 end -->
      <el-container>
        <!-- 内容 start -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 内容 end -->
      </el-container>
    </el-container>
    <!-- 抽屉添加任务 start -->
    <el-drawer title="添加任务" :visible.sync="drawer" :with-header="false">
      <el-scrollbar style="height: 100%">
        <el-row class="add_box">
          <el-col :span="24">
            <el-col :span="6" class="title title1">创建项目</el-col>
          </el-col>
          <el-col :span="6" class="title">名称</el-col>
          <el-col :span="13">
            <el-input placeholder="请输入内容" v-model="new_project.new_name" clearable></el-input>
          </el-col>
          <el-col :span="6" class="title">分类</el-col>
          <el-col :span="13">
            <el-cascader
              v-model="new_project.business_type"
              :options="business_type_list"
              @change="handleChange"
              style="width: 100%;"
            ></el-cascader>
            <!-- {{new_project.business_type}} -->
          </el-col>
          <el-col :span="18" :offset="6">
            <el-radio v-model="new_project.radio1" label="0">专项</el-radio>
            <el-radio v-model="new_project.radio1" label="1">日常</el-radio>
          </el-col>
          <el-col :span="6" class="title">预计时间</el-col>
          <el-col :span="13" class="presetTime">
            <el-date-picker v-model="new_project.presetTime" type="date" placeholder="选择日期"></el-date-picker>
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
            <el-radio v-model="new_project.radio2" label="1">项目经理</el-radio>
            <el-radio v-model="new_project.radio2" label="2">执行部门</el-radio>
          </el-col>
          <el-col :span="13" :offset="6" v-show="new_project.radio2 == 1">
            <el-autocomplete
              placeholder="请输入内容"
              v-model="new_project.manager"
              clearable
              :fetch-suggestions="querySearch"
              @select="handleSelect"
            ></el-autocomplete>
            {{new_project.manager}}
          </el-col>
          <el-col :span="17" :offset="6" v-show="new_project.radio2 == 2">
            <el-checkbox-group v-model="new_project.checkList" class="check_box">
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
              v-for="tag in new_project.dynamicTags"
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
              :action="uploadUrl"
              list-type="picture-card"
              :auto-upload="true"
              :on-success="handleSuccess"
              :file-list="fileList"
              :on-change="test"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="type" alt />
                <!-- {{file.raw.type}} -->
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
            <div class="text">附件{{dialogImageUrl}}</div>
          </el-col>
        </el-row>
      </el-scrollbar>
      <el-row class="batton_pa">
        <el-col :span="12" :offset="7" class="batton">
          <el-button size="small" type="info" @click="drawer = false">取消</el-button>
          <el-button size="small" type="primary" @click="addProject">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 抽屉添加任务 end -->
  </div>
</template>
<script>
import Header from '@/pages/header'
import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'login',
  components: {
    Header
  },
  data() {
    return {
      home_style: '',
      show_acti: 1,
      drawer: false,
      restaurants: [],
      // 新增
      new_project: {
        new_name: '', // 任务名称
        business_type: [], // 分类
        radio1: '0', // 专项，日常
        presetTime: '', // 预计时间
        remark: '', // 需求
        radio2: '2', // 项目经理,执行部门 选择
        manager: '', // 项目经理
        checkList: [], // 执行部门
        dynamicTags: ['知晓人'] // 知晓人
      },
      // 知晓人
      add_list: '',
      // 上传附件
      dialogImageUrl: '123',
      dialogVisible: false,
      disabled: false,
      type: '',
      clientList: [],
      // 业务类型列表
      business_type_list: [
        {
          value: 'ID1',
          label: '客户1',
          children: [
            {
              value: 'ID1',
              label: '业务类型1'
            },
            {
              value: 'ID2',
              label: '业务类型2'
            },
            {
              value: 'ID3',
              label: '业务类型3'
            }
          ]
        },
        {
          value: 'ID2',
          label: '客户2',
          children: [
            {
              value: 'ID1',
              label: '业务类型1'
            },
            {
              value: 'ID2',
              label: '业务类型2'
            },
            {
              value: 'ID3',
              label: '业务类型3'
            }
          ]
        },
        {
          value: 'ID3',
          label: '客户3',
          children: [
            {
              value: 'ID1',
              label: '业务类型1'
            },
            {
              value: 'ID2',
              label: '业务类型2'
            },
            {
              value: 'ID3',
              label: '业务类型3'
            }
          ]
        }
      ],
      fileList: [],
      uploadUrl: ''
    }
  },
  // 方法
  methods: {
    matchType, // 文件格式判断
    // 分类二级联动
    handleChange(value) {
      console.log(value)
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
      // this.$router.push({ path: '/home/components/' + url })
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
      this.new_project.dynamicTags.splice(
        this.new_project.dynamicTags.indexOf(tag),
        1
      )
    },
    // 接受子组件数据
    getMsgFormSon(data) {
      this.drawer = data
      // 获取客户列表
      // this.getClientListAjax()
      // 获取部门列表
      this.getDeptList()
      // 获取用户列表
      // this.getListAjax()
      // 获取新建项目分类
      this.getAllClientAndBusiness()
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
    // 上传附件
    upload() {
      let upType = 0
      let demandType = 0
      let uploadUrl = `
      /pmbs/file/upload?upType=${upType}&demandType=${demandType}
      `
      this.uploadUrl = uploadUrl
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file, fileList) {
      console.log(file)
      console.log(fileList)
    },
    // 上传回调
    handleSuccess(res, file, fileList) {
      console.log('上传附件成功')
      console.log(res)
      console.log(file)
      console.log(fileList)
      let type = this.matchType(file.name)
      this.type = type
      console.log(type)
    },
    test(file, fileList) {
      // console.log(file)
      // console.log(fileList)
    },
    // 新增项目
    addProject() {
      let data = {
        initUserId: 128, //'发起人id',
        status: 1,
        proName: this.new_project.new_name, //'项目名称',
        clientId: this.new_project.business_type[0],//'所属客户ID',
        serviceId: this.new_project.business_type[1],//'所属业务ID'
        isUsual: this.new_project.radio1, //'专项日常（0-日常，1-专项）',
        expertTime: this.new_project.presetTime, //'预计完成时间',
        remark: this.new_project.remark, //'需求',

        manager: '', //'项目经理id',
        department: '', //'参与部门ID',

        knowUser: '', //'知晓人id，多个用逗号隔开',
        listProFile: [
          {
            fileName: '', //'附件名称',
            localPath: '', //'本地路径',
            suffix: '' //'文档后缀'
          }
        ],
        realName: '' //'string',
      }
      console.log(data)
      this.$axios.post('/pmbs/api/project/save', data).then(this.addProjectSuss)
    },
    // 新增项目回调
    addProjectSuss(res) {
      console.log(res)
      if (res.status == 200) {
        this.messageWin('项目添加成功')
      }
    },
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
    // 部门列表获取
    getDeptList(res) {
      let data = { pageNum: 1 }
      this.$axios
        .post('/pmbs/api/userapi/deptList', data)
        .then(this.getDeptListSuss)
    },
    // 部门列表获取回调
    getDeptListSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let deptList = res.data.data
        // this.deptList = clientList
        // this.business_type_list
        // console.log(this.deptList)
      }
    },
    // 用户列表获取
    getListAjax(res) {
      let data = { pageNum: 1 }
      this.$axios
        .post('/pmbs/api/userapi/listAjax', data)
        .then(this.getListAjaxSuss)
    },
    // 用户列表获取回调
    getListAjaxSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let userList = res.data.data
        // this.deptList = clientList
        // this.business_type_list
        // console.log(this.userList)
      }
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
        let business_type_list = []
        // 循环提取名称和ID
        for (let i = 0; i < data.length; i++) {
          let business_type = {
            value: '',
            label: '',
            children: []
          }
          let element = data[i]
          business_type.value = element.clientId
          business_type.label = element.clientName
          for (let j = 0; j < element.businessList.length; j++) {
            let element_ = element.businessList[j]
            let children = {}
            if (element_ != null) {
              children.value = element_.businessId
              children.label = element_.businessName
              business_type.children.push(children)
            }
          }
          business_type_list.push(business_type)
        }
        this.business_type_list = business_type_list
      }
      // console.log(res)
    },
    ///////////////////////////////////////
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [
        { value: '测试1',
          address: '测试1' },
        {
          value: '测试2',
          address: '测试2'
        },
        {
          value: '测试3',
          address: '测试3'
        }
      ]
    },
    handleSelect(item) {
      console.log(item)
    },
    // 消息提示
    messageWin(message) {
      // 成功提示
      this.$message({
        message: message,
        type: 'success'
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
    sessionStorage.setItem('refresh', 0)
    this.router_url()
    this.upload()
    this.getProjectFeedbackDetail()

    this.restaurants = this.loadAll()
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
  min-width: 1200px;
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
  width: 108px;
  margin: 0;
}
.home .add_box .upload .text {
  width: 146px;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
}

.home .add_box .know_pop span {
  margin-left: 0;
  margin-right: 9px;
}
.home .add_box .know_pop .know_pop_list {
  margin-bottom: 13px;
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
</style>
