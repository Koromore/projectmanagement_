<template>
  <div class="project" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
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
        <el-col :span="6" class="tab tab1">
          <el-col :span="8" @click.native="tab1_change(1)" :class='[tab1_act=="1" ? "act" : ""]'>官网</el-col>
          <el-col :span="8" @click.native="tab1_change(2)" :class='[tab1_act=="2" ? "act" : ""]'>口碑</el-col>
          <el-col :span="8" @click.native="tab1_change(3)" :class='[tab1_act=="3" ? "act" : ""]'>数字营销</el-col>
        </el-col>
        <el-col :span="4" class="tab tab2">
          <el-col :span="12" @click.native="tab2_change(1)" :class='[tab2_act=="1" ? "act" : ""]'>专项</el-col>
          <el-col :span="12" @click.native="tab2_change(2)" :class='[tab2_act=="2" ? "act" : ""]'>日常</el-col>
        </el-col>
        <el-col :span="8" class="tab tab3">
          <el-col :span="6">新项目</el-col>
          <el-col :span="6">延时</el-col>
          <el-col :span="6">审核中</el-col>
          <el-col :span="6">执行中</el-col>
        </el-col>
        <!-- </div> -->
      </el-col>
      <el-col :span="24" class="tabs">
        <div @click="table_tab(1)" :class='[tabs_activity=="1" ? "act" : ""]'>我发起</div>
        <div @click="table_tab(2)" :class='[tabs_activity=="2" ? "act" : ""]'>我参与</div>
      </el-col>
      <!-- 我发起 -->
      <el-col :span="24" class="table table1" v-if="table_show">
        <el-col :span="24" class="title">
          <el-col :span="3">名称</el-col>
          <el-col :span="3">状态</el-col>
          <el-col :span="3">总任务数/待完成</el-col>
          <el-col :span="3">
            预计时间
            <img src="/static/images/project/down.png" width="24" alt srcset />
          </el-col>
          <el-col :span="3">
            完成时间
            <img src="/static/images/project/down.png" width="24" alt srcset />
          </el-col>
          <el-col :span="3">下达人</el-col>
          <el-col :span="3">操作</el-col>
        </el-col>
        <el-col :span="24" class="list" v-for="item in tableData" :key="item.index">
          <el-col :span="3" @click.native="project_details(item.id)">{{item.name}}</el-col>
          <el-col
            :span="3"
            :class="{'state_color1': item.state == 1,
                  'state_color2': item.state == 2,
                  'state_color3': item.state == 3,
                  'state_color4': item.state == 4}"
          >{{item.state_text}}</el-col>
          <el-col :span="3">{{item.num}}</el-col>
          <el-col :span="3">{{item.presetTime}}</el-col>
          <el-col :span="3">{{item.finishTime}}</el-col>
          <el-col :span="3">{{item.assignPeople}}</el-col>
          <el-col :span="3">{{item.operation}}</el-col>
        </el-col>
      </el-col>
      <!-- 我参与 -->
      <el-col :span="24" class="table table2" v-if="!table_show">
        <el-col :span="24" class="title">
          <el-col :span="3">名称</el-col>
          <el-col :span="3">状态</el-col>
          <el-col :span="3">
            预计时间
            <img src="/static/images/project/down.png" width="24" alt srcset />
          </el-col>
          <el-col :span="3">
            完成时间
            <img src="/static/images/project/down.png" width="24" alt srcset />
          </el-col>
          <el-col :span="3">下达人</el-col>
        </el-col>
        <el-col :span="24" class="list" v-for="item in tableData" :key="item.index">
          <el-col :span="3">{{item.name}}</el-col>
          <el-col
            :span="3"
            :class="{'state_color1': item.state == 1,
                  'state_color2': item.state == 2,
                  'state_color3': item.state == 3,
                  'state_color4': item.state == 4}"
          >{{item.state_text}}</el-col>
          <el-col :span="3">{{item.presetTime}}</el-col>
          <el-col :span="3">{{item.finishTime}}</el-col>
          <el-col :span="3">{{item.assignPeople}}</el-col>
        </el-col>
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
      // 1审核中 2执行中 3已完成 4延期
      tableData: [
        {
          id: 1,
          name: '皓影赠礼',
          state: 4,
          state_text: '延期',
          color: 'color:red;',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '解雨臣',
          operation: '操作'
        },
        {
          id: 2,
          name: '皓影赠礼',
          state: 1,
          state_text: '审核中',
          color: 'color:red;',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '解雨臣',
          operation: '操作'
        },
        {
          id: 3,
          name: '皓影赠礼',
          state: 2,
          state_text: '执行中',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '解雨臣',
          operation: '操作'
        },
        {
          id: 4,
          name: '皓影赠礼',
          state: 3,
          state_text: '已完成',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '解雨臣',
          operation: '操作'
        },
        {
          id: 5,
          name: '皓影赠礼',
          state: 3,
          state_text: '已完成',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '解雨臣',
          operation: '操作'
        }
      ],
      // 我参与 我发起选项卡
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
    // 
    tab1_change(e){
      // console.log(e)
      if (e == 1) {
        this.tab1_act = 1
      }else if(e == 2){
        this.tab1_act = 2
      }else if(e == 3){
        this.tab1_act = 3
      }
    },
    // 
    tab2_change(e){
      // console.log(e)
      if (e == 1) {
        this.tab2_act = 1
      }else if(e == 2){
        this.tab2_act = 2
      }
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
    // 项目详情
    project_details(e) {
      this.$emit('on-close', e)
      // this.$router.push({ path: 'project_details', query: { id: e }})
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
.project .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.project .top .tab {
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
.project .top .tab div {
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  box-sizing: border-box;
  cursor: pointer;
}
.project .top .tab1 div,
.project .top .tab2 div {
  border-left: 1px solid #bbb;
}
.project .top .tab1 div:hover,
.project .top .tab2 div:hover {
  background: rgb(16, 142, 233);
  color: white;
}
.project .top .tab1 div:nth-of-type(1),
.project .top .tab2 div:nth-of-type(1) {
  border: none;
}
.project .top .tab div.act {
  background: rgb(16, 142, 233);
  color: white;
}
.project .top .tab3{
  border: none;
  color: white
}
.project .top .tab3 div:nth-of-type(1){
  background: rgb(16, 142, 233);
}
.project .top .tab3 div:nth-of-type(2){
  background: rgb(255, 0, 0);
}
.project .top .tab3 div:nth-of-type(3){
  background: rgb(245, 185, 106);
}
.project .top .tab3 div:nth-of-type(4){
  background: rgb(77, 159, 103);
}
.el-button + .el-button {
  margin: 0;
}
.project .tabs {
  font-weight: 700;
  font-size: 20px;
  box-sizing: border-box;
  padding: 13px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.project .tabs div {
  height: 36px;
  line-height: 36px;
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
.project .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.project .table .title div {
  height: 48px;
  line-height: 48px;
}
.project .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.project .table .list div:nth-of-type(1){
  cursor: pointer;
}
.project .table .list div{
  height: 48px;
  line-height: 48px;
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
