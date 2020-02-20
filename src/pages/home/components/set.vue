<template>
  <div class="set" :style="project_style">
    <el-row>
      <!--  -->
      <el-col :span="24" class="tabs">
        <div @click="table_tab(1)" :class="[tabs_activity=='1' ? 'act' : '']">业务类型</div>
        <div @click="table_tab(2)" :class="[tabs_activity=='2' ? 'act' : '']">客户</div>
      </el-col>
      <!--  -->
      <el-col :span="24" class="add">
        <el-button size="small" type="primary" @click="drawer_show()">新增</el-button>
      </el-col>
      <!-- 抽屉 -->
      <el-drawer title="新增框" :visible.sync="drawer" :with-header="false">
        <el-row class="add_box">
          <el-col :span="24" class="new_name">
            <el-col :span="6" class="title title1">名称</el-col>
            <el-col :span="13">
              <el-input placeholder="请输入内容" v-model="new_name" clearable></el-input>
            </el-col>
            <el-col :span="6" class="title title2" v-show="tabs_activity == 2">业务</el-col>
            <el-col :span="13" :offset="6" class="check_box" v-show="tabs_activity == 2">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="官网"></el-checkbox>
                <el-checkbox label="官微"></el-checkbox>
                <el-checkbox label="数字营销"></el-checkbox>
                <el-checkbox label="口碑"></el-checkbox>
                <el-checkbox label="APP"></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 业务类型 -->
      <el-col :span="24" class="table table1" v-show="table_show">
        <el-table
          ref="filterTable"
          :data="tableData1"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="business" label="名称"></el-table-column>

          <el-table-column prop="tag" label="操作" width="180" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button size="small" type="info" @click="drawer_show()">修改</el-button>
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="business_del(scope.row.id)">
                <el-button size="small" type="primary" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 客户 -->
      <el-col :span="24" class="table table2" v-show="!table_show">
        <el-table
          ref="filterTable"
          :data="tableData2"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="client" label="客户"></el-table-column>
          <el-table-column prop="business" label="业务"></el-table-column>
          <el-table-column prop="tag" label="操作" width="180" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button size="small" type="info" @click="drawer_show(scope.row.id)">修改</el-button>
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="client_del(scope.row.id)">
                <el-button size="small" type="primary" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
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
      drawer: false,
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
      tableData1: [
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
      // 新增
      new_name: '',
      //
      checkList: []
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
    drawer_show() {
      this.drawer = true
    },
    // 选项卡
    table_tab(e) {
      if (e == 1) {
        ;(this.tabs_activity = 1), (this.table_show = true)
      } else if (e == 2) {
        ;(this.tabs_activity = 2), (this.table_show = false)
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
.set .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.el-button + .el-button {
  margin: 0;
}
.set .add {
  /* width: 99px; */
  box-sizing: border-box;
  margin: 0 0 13px 13px;
}
.set .add button {
  width: 99px;
}
.set .tabs {
  font-size: 16px;
  box-sizing: border-box;
  padding: 13px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.set .tabs div {
  width: 130px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: rgba(164, 167, 170, 1);
  box-sizing: border-box;
  border-bottom: 1px solid rgb(164, 167, 170);
  padding-bottom: 13px;
  cursor: pointer;
}
.set .tabs .act {
  border-bottom: 2px solid rgb(16, 142, 233);
  color: rgb(16, 142, 233);
}
.set .table .title,
.set .table .list {
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
.set .table .list:hover {
  background: #f7f7f7;
}
.set .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.set .table .title div {
  height: 48px;
  line-height: 48px;
}
.set .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.set .add_box {
  height: 100%;
  box-sizing: border-box;
  padding: 36px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
}
.set .add_box .title {
  text-align: center;
}
.set .add_box .title2 {
  margin-top: 64px;
}
.set .add_box .check_box .el-checkbox{
  width: 64px;
}
.set .add_box .new_name {
  height: 40px;
  line-height: 40px;
}
.set .add_box .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.set .add_box .batton button {
  width: 36%;
}
</style>
