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
        <el-button size="small" type="primary" @click="add_drawer()">新增</el-button>
      </el-col>
      <!-- 业务类型 -->
      <el-col :span="24" class="table table1" v-show="table_show">
        <el-table
          ref="filterTable"
          :data="businessList"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="businessName" label="名称"></el-table-column>

          <el-table-column prop="tag" label="操作" width="180" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="info"
                @click="business_change(scope.row.businessId,scope.row.businessName)"
              >修改</el-button>
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="delete_but(scope.row.businessId)">
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
          :data="clientList"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="clientName" label="客户"></el-table-column>
          <el-table-column prop="businessList" label="业务"></el-table-column>
          <el-table-column prop="tag" label="操作" width="180" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="info"
                @click="client_change(scope.row.clientId,scope.row.clientName)"
              >修改</el-button>
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="delete_but(scope.row.clientId)">
                <el-button size="small" type="primary" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 抽屉 -->
    <el-drawer title="新增" :visible.sync="drawer" :with-header="false">
      <el-row class="add_box">
        <el-col :span="24" class="new_name">
          <el-col :span="6" class="title title1">名称</el-col>
          <el-col :span="13">
            <el-input placeholder="请输入内容" v-model="new_name" clearable></el-input>
          </el-col>
          <el-col :span="6" class="title title2" v-show="tabs_activity == 2">业务</el-col>
          <el-col :span="13" :offset="6" class="check_box" v-show="tabs_activity == 2">
            <!-- 业务类型列表 -->
            <el-checkbox-group v-model="businessListCheck" @change="test">
              <el-checkbox
                :label="items.businessId"
                v-for="items in businessList"
                :key="items.index"
              >{{items.businessName}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-col>
        <el-col :span="12" :offset="7" class="batton">
          <el-button size="small" type="info">取消</el-button>
          <el-button size="small" type="primary" @click="putIn">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
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
      businessList: [], // 业务类型列表
      clientList: [], // 客户列表
      // 1审核中 2执行中 3已完成 4延期
      tabs_activity: 1, // 1-业务类型 2-客户
      table_show: true,
      operation: 1, // 1-新增 2-修改
      transferId: '', // 新增/修改时传递的ID
      // 新增
      new_name: '',
      // 选中的业务类型
      businessListCheck: []
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
    test(res, res2) {
      // console.log(res)
      // console.log(res2)
    },
    drawer_show() {
      this.drawer = true
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
    // 业务类型列表获取
    getBusinessListAjax(res) {
      let data = {}
      this.$axios
        .post('/pmbs/api/business/listAjax', data)
        .then(this.getBusinessListAjaxSuss)
    },
    // 业务类型列表获取回调
    getBusinessListAjaxSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        this.businessList = res.data.items
        // console.log(this.businessList)
      }
    },
    // 客户列表获取
    getClientListAjax(res) {
      let data = { pageNum: 1 }
      this.$axios
        .post('/pmbs/client/list', data)
        .then(this.getClientListAjaxSuss)
    },
    // 客户列表获取回调
    getClientListAjaxSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        this.clientList = res.data.data.items
        // console.log(this.clientList)
      }
    },
    // 新增按钮
    add_drawer() {
      this.drawer = true
      this.operation = 1
      this.transferId = ''
      this.new_name = name
    },
    // 业务类型修改
    business_change(id, name) {
      this.drawer = true
      this.operation = 2
      this.transferId = id
      this.new_name = name
    },
    // 客户修改
    client_change(id, name) {
      this.drawer = true
      this.operation = 2
      this.transferId = id
      this.new_name = name
    },
    // 提交按钮--包含业务类型和客户的新增和修改
    putIn() {
      let tabs_activity = this.tabs_activity
      let data = {}
      // console.log(tabs_activity)
      // console.log(data)
      if (tabs_activity == 1) {
        // 业务类型新增/修改
        data = {
          businessId: this.transferId, // 业务类型id
          businessName: this.new_name // 业务类型名称
        }
        this.businessSave(data)
      } else if (tabs_activity == 2) {
        // 客户新增/修改
        let businessList = []
        let businessListData = this.businessList
        let businessListCheck = this.businessListCheck
        let businessListCheckValue = []
        for (let i = 0; i < businessListCheck.length; i++) {
          let elementi = businessListCheck[i]
          let data = {}
          data.businessId = elementi
          for (let j = 0; j < businessListData.length; j++) {
            let elementj = businessListData[j]
            if (elementi == businessListData[j].businessId) {
              businessListCheckValue.push(businessListData[j].businessName)
              data.businessName = businessListData[j].businessName
            }
          }
          businessList.push(data)
        }
        // console.log(businessList)
        // console.log(businessListCheckValue)
        // console.log(businessListCheck)
        data = {
          clientId: this.transferId, // 客户ID
          clientName: this.new_name, // 客户名称
          businessList: businessList // 包含的业务类型
        }
        // console.log(data)
        this.clientSave(data)
      }
    },
    // 业务类型新增/修改
    businessSave(res) {
      let data = res
      console.log(data)
      if (data.businessName == '') {
        let message = '请信息填写完整！'
        this.messageError(message)
      } else {
        this.$axios
          .post('/pmbs/api/business/save', data)
          .then(this.businessSaveSuss)
      }
    },
    // 业务类型新增/修改回调
    businessSaveSuss(res) {
      console.log(res)
      if (res.status == 200) {
        // 获取业务类型列表
        this.getBusinessListAjax()
        // 新增/修改成功提示
        this.messageWin(res.data.msg)
        // 清空输入框（重置参数）
        this.transferId = ''
        this.new_name = ''
        this.drawer = false
      }
    },
    // 客户新增/修改
    clientSave(res) {
      let data = res
      console.log(data)
      if (data.clientName == '' || data.businessList.businessId == '') {
        let message = '请信息填写完整！'
        this.messageError(message)
      } else {
        // this.$axios
        //   .post('/pmbs/client/save', data)
        //   .then(this.clientSaveSuss)
      }
    },
    // 客户新增/修改回调
    clientSaveSuss(res) {
      console.log(res)
      if (res.status == 200) {
        // 获取客户列表
        this.getClientListAjax()
        // 新增/修改成功提示
        this.messageWin(res.data.msg)
        // 清空输入框（重置参数）
        this.transferId = ''
        this.new_name = ''
        this.businessListCheck = []
        this.drawer = false
      }
    },
    // 删除按钮
    delete_but(e) {
      let tabs_activity = this.tabs_activity
      let data = {}

      if (tabs_activity == 1) {
        data.id = e
        this.businessDelete(data)
      } else if (tabs_activity == 2) {
        data = e
        this.clientDelete(data)
      }
    },
    // 业务类型删除请求发送
    businessDelete(res) {
      let data = res
      console.log(data)
      // this.$axios.post('/pmbs/api/business/delete', data).then(this.businessDeleteSuss)
    },
    // 业务类型删除请求回调
    businessDeleteSuss(res) {
      if (res.status == 200) {
        this.messageWin(res.data.msg)
      }
    },
    // 客户删除请求发送
    clientDelete(res) {
      // /client/{id}/delete
      let data = {
        clientId: res
      }
      console.log(data)
      this.$axios.post('/pmbs/client/delete', data).then(this.clientDeleteSuss)
    },
    // 客户删除请求回调
    clientDeleteSuss(res) {
      if (res.status == 200) {
        // 消息提示
        this.messageWin(res.data.msg)
        // 重新获取客户列表
        this.getClientListAjax()
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
    messageError(message) {
      // 错误提示
      this.$message.error(message)
    }
  },
  // 钩子函数
  mounted() {
    // this.widthheight()
    // this.getlocalStorage()
    this.getBusinessListAjax()
    this.getClientListAjax()
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
.set .add_box .check_box .el-checkbox {
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
