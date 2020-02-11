<template>
  <div class="task" :style="project_style">
    <el-row>
      <!--  -->
      <el-col :span="24" class="tabs">
        <div @click="table_tab(1)" :class='[tabs_activity=="1" ? "act" : ""]'>业务类型</div>
        <div @click="table_tab(2)" :class='[tabs_activity=="2" ? "act" : ""]'>客户</div>
      </el-col>
      <!-- 业务类型 -->
      <el-col :span="24" class="table table1" v-if="table_show">
        <el-col :span="24" class="title">
          <el-col :span="5">部门</el-col>
          <el-col :span="5">操作</el-col>
        </el-col>
        <el-col :span="24" class="list" v-for="item in tableData" :key="item.index">
          <el-col :span="5">{{item.business}}</el-col>
          <el-col :span="5">
            <el-button type="info" @click="business_change(item.id)">修改</el-button>
            <el-button type="primary" @click="business_del(item.id)">删除</el-button>
          </el-col>
        </el-col>
      </el-col>
      <!-- 客户 -->
      <el-col :span="24" class="table table2" v-if="!table_show">
        <el-col :span="24" class="title">
          <el-col :span="5">客户</el-col>
          <el-col :span="9">业务</el-col>
          <el-col :span="5">操作</el-col>
        </el-col>
        <el-col :span="24" class="list" v-for="item in tableData2" :key="item.index">
          <el-col :span="5">{{item.client}}</el-col>
          <el-col :span="9">{{item.business}}</el-col>
          <el-col :span="5">
            <el-button type="info" @click="client_change(item.id)">修改</el-button>
            <el-button type="primary" @click="client_del(item.id)">删除</el-button>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'task',
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
      // 1审核中 2执行中 3已完成 4延期
      tableData: [
        {
          id: 1,
          business: '网站',
          operation: '操作'
        },
        {
          id: 2,
          business: '口碑',
          operation: '操作'
        },
        {
          id: 3,
          business: '数字营销',
          operation: '操作'
        },
        {
          id: 4,
          business: 'APP',
          operation: '操作'
        }
      ],
      tableData2: [
        {
          id: 1,
          client: '广汽本田',
          business: '官网',
          operation: '操作'
        },
        {
          id: 2,
          client: '长城',
          business: '官网，口碑',
          operation: '操作'
        },
        {
          id: 3,
          client: '吉利',
          business: '官网，APP',
          operation: '操作'
        },
        {
          id: 4,
          client: '沃尔沃',
          business: '官网',
          operation: '操作'
        }
      ],
      tabs_activity: 1,
      table_show: true,
      // 项目类型1选择
      tab1_act: 1,
      // 项目类型2选择
      tab2_act: 1
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
    },
    // 选项卡
    table_tab(e) {
      if(e == 1){
        this.tabs_activity = 1,
        this.table_show = true
      }else if(e == 2){
        this.tabs_activity = 2,
        this.table_show = false
      }
    },
    // 业务类型修改
    business_change(e) {
      console.log('修改' + e)
    },
    // 业务类型删除
    business_del(e) {
      console.log('删除' + e)
    },
    // 客户修改
    client_change(e) {
      console.log('修改' + e)
    },
    // 客户删除
    client_del(e) {
      console.log('删除' + e)
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
.task .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.el-button + .el-button {
  margin: 0;
}
.task .tabs {
  font-weight: 700;
  font-size: 20px;
  box-sizing: border-box;
  padding: 13px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.task .tabs div {
  width: 130px;
  height: 36px;
  line-height: 36px;
  text-align: center;
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
.task .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.task .table .title div {
  height: 48px;
  line-height: 48px;
}
.task .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.state_color1 {
  color: rgb(236, 185, 21);
}
.state_color2 {
  color: rgb(1, 176, 114);
}
.state_color3 {
  color: rgb(172, 171, 171);
}
.state_color4 {
  color: rgb(255, 0, 0);
}
</style>
