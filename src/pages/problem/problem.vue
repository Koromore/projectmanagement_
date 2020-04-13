<template>
  <div class="problem">
    <el-row>
      <el-col :span="18" :offset="2" class="return">
        <i class="el-icon-arrow-left" @click="return_"></i>
      </el-col>
      <el-col :span="18" :offset="3" class="title">问题反馈列表</el-col>
      <el-col :span="18" :offset="3">
        <el-table :data="tableData" style="width: 100%" border stripe height="540" :header-cell-style="{color:'#000'}" v-loading="loading">
          <el-table-column prop="realName" label="姓名" width="180"></el-table-column>
          <el-table-column prop="deptName" label="部门" width="180"></el-table-column>
          <el-table-column prop="moduleType" label="问题版块">
            <template slot-scope="scope">
              <span v-if="scope.row.moduleType == 1">项目/任务</span>
              <span v-else-if="scope.row.moduleType == 2">文档管理</span>
              <span v-else-if="scope.row.moduleType == 3">统计</span>
              <span v-else-if="scope.row.moduleType == 4">设置</span>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="问题描述"></el-table-column>
          <el-table-column prop="createTime" label="日期">
            <template slot-scope="scope">{{$time(scope.row.createTime)}}</template>
          </el-table-column>
          <el-table-column prop="pictureList" label="截图">
            <template slot-scope="scope">
              <el-link type="primary" v-for="(items, index) in scope.row.pictureList" :key="index" @click="download(items)">
                <span v-if="index != 0">,</span>{{items.picName}}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1" class="fontRed">修复中</span>
              <span v-else-if="scope.row.status == 2">已完成</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="操作">
            <template slot-scope="scope">
              <el-link type="primary" v-if="scope.row.status == 1" @click="achieve(scope.row.problemId)">标记完成</el-link>
              <el-link type="primary" v-if="scope.row.status == 2" @click="activate(scope.row.problemId)">重新激活</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 123 -->
  </div>
</template>
<script>
export default {
  name: 'problem',
  components: {},
  data() {
    return {
      // 加载动画
      loading: false,
      tableData: []
    }
  },
  // 侦听器
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
  },
  // 钩子函数
  mounted() {
    this.getProblemListAjax()
  },
  // 方法
  methods: {
    // 获取问题反馈列表
    getProblemListAjax() {
      this.loading = true
      let data = {
        // pageNum: 1
      }
      this.$axios.post('/pmbs/api/problem/listAjax', data).then(res => {
        this.loading = false
        if (res.status == 200) {
          let data = res.data
          this.tableData = data.items
        }
      })
    },
    // 返回上一页
    return_() {
      this.$router.go(-1)
    },
    // 标记已完成
    achieve(id) {
      let data ={
        status: 2,
        problemId: id
      }
      this.problemSave(data)
    },
    // 重新激活
    activate(id) {
      let data ={
        status: 1,
        problemId: id
      }
      this.problemSave(data)
    },
    // 修改问题状态
    problemSave(data) {
      this.$axios.post('/pmbs/api/problem/save', data).then(res => {
        // console.log(res)
        if (res.status == 200) {
          this.getProblemListAjax()
        }
      })
      
    },
    /////////  [download 下载附件] start /////////
    download(row) {
      let localPath = row.localPath
      // console.log(row)
      let a = document.createElement('a')
      a.download = `${row.picName}`
      a.setAttribute('href', 'http://218.106.254.122:8084/pmbs/' + localPath)
      a.click()
    },
    /////////  [download 下载附件] end /////////
  }
}
</script>
<style scoped>
.problem .return {
  padding-top: 49px;
  font-size: 49px;
  cursor:pointer;
}
.problem .title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 36px;
  margin-bottom: 36px;
}
.problem .fontRed {
  color: red;
}
</style>
