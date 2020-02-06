<template>
  <div class="project" :style="project_style">
    <el-row>
      <el-col :span="24">
        <!-- <div class="grid-content bg-purple-dark"> -->
        <el-col :span="4" class>
          客户
          <el-select v-model="client" placeholder="请选择">
            <el-option
              v-for="item in client_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="tab1">
          <el-button type="primary" plain>主要按钮</el-button>
          <el-button type="primary" plain>主要按钮</el-button>
          <el-button type="primary" plain>主要按钮</el-button>
        </el-col>
        <el-col :span="3" class="tab1">
          <el-button type="primary" plain>主要按钮</el-button>
          <el-button type="primary" plain>主要按钮</el-button>
        </el-col>
        <!-- </div> -->
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">2</div>
      </el-col>
      <el-col :span="24">
        <!-- <div class="grid-content bg-purple-dark">3</div> -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="名称" width="180"></el-table-column>
          <el-table-column prop="state" label="状态" width="180"></el-table-column>
          <el-table-column prop="num" label="总任务数/待完成"></el-table-column>
          <el-table-column prop="presetTime" label="预计时间"></el-table-column>
          <el-table-column prop="finishTime" label="完成时间"></el-table-column>
          <el-table-column prop="assignPeople" label="下达人"></el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'project',
  data() {
    return {
      loginState: true, // 避免多次点击
      project_style: '',
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
      tableData: [
        {
          name: '皓影赠礼',
          state: '延期',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '',
          assignPeople: '解雨臣',
          operation: ''
        },
        {
          name: '2016-05-02',
          state: '王小虎',
          num: '上海市普陀区金沙江路 1518 弄',
          presetTime: '20-01-21',
          finishTime: '',
          assignPeople: '解雨臣',
          operation: ''
        },
        {
          name: '2016-05-02',
          state: '王小虎',
          num: '上海市普陀区金沙江路 1518 弄',
          presetTime: '20-01-21',
          finishTime: '',
          assignPeople: '解雨臣',
          operation: ''
        },
        {
          name: '2016-05-02',
          state: '王小虎',
          num: '上海市普陀区金沙江路 1518 弄',
          presetTime: '20-01-21',
          finishTime: '',
          assignPeople: '解雨臣',
          operation: ''
        }
      ]
    }
  },
  // 方法
  methods: {
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
      // this.project_style = 'height:' + height + 'px;'
    }
  },
  // 钩子函数
  mounted() {
    this.widthheight()
    // this.getlocalStorage()
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.tab1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.el-button + .el-button {
  margin: 0;
}
/* .el-table thead {
    color: #909399;
    font-weight: 500;
    background: rgb(236, 235, 235);
} */
.project >>> .has-gutter th {
  background: rgb(236, 235, 235);
  color: black;
}
</style>
