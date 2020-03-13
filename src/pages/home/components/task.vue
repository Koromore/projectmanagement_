<template>
  <div class="task" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <el-col :span="5" class>
          <el-col :span="4" class="title">客户</el-col>
          <el-col :span="20">
            <el-select v-model="clientId" clearable placeholder="全部" size="small">
              <el-option
                v-for="item in clientIdList"
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
              @click="tab1_change(1,22)"
              :class="[tab1_act=='1' ? 'act' : '']"
            >&nbsp;&nbsp;&nbsp;&nbsp;官网&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab1_change(2,18)"
              :class="[tab1_act=='2' ? 'act' : '']"
            >&nbsp;&nbsp;&nbsp;&nbsp;口碑&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab1_change(3,17)"
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
              @click="tab2_change(1,1)"
              :class="[tab2_act=='1' ? 'act' : '']"
            >&nbsp;&nbsp;&nbsp;&nbsp;专项&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab2_change(2,0)"
              :class="[tab2_act=='2' ? 'act' : '']"
            >&nbsp;&nbsp;&nbsp;&nbsp;日常&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="8" class="tab tab3">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="新任务" placement="bottom">
              <el-button
                type="primary"
                size="small"
                @click="tab3_change(1)"
              >&nbsp;&nbsp;1&nbsp;&nbsp;</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="延期" placement="bottom">
              <el-button
                type="danger"
                size="small"
                @click="tab3_change(4)"
              >&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="审核中" placement="bottom">
              <el-button
                type="warning"
                size="small"
                @click="tab3_change(2)"
              >&nbsp;&nbsp;3&nbsp;&nbsp;</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="执行中" placement="bottom">
              <el-button
                type="success"
                size="small"
                @click="tab3_change(1)"
              >&nbsp;&nbsp;4&nbsp;&nbsp;</el-button>
            </el-tooltip>
          </el-button-group>
        </el-col>
      </el-col>
      <!--  -->
      <el-col :span="24" class="tabs" v-if="userId != 152">
        <div @click="table_tab(1)" :class="[tabs_activity==1 ? 'act' : '']">我发起</div>
        <div @click="table_tab(2)" :class="[tabs_activity==2 ? 'act' : '']">我参与</div>
      </el-col>
      <!-- 我发起 -->
      <el-col :span="24" class="table table1" v-show="tabs_activity==1">
        <el-table
          v-loading="loading"
          ref="filterTable"
          :data="tasklist"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{'height': '57px','text_aling':'left'}"
        >
          <el-table-column
            prop="proName"
            label="所属项目"
            column-key="name"
            :filters="filtratePro"
            :filter-method="filterName"
          ></el-table-column>
          <el-table-column
            prop="deptName"
            label="部门"
            :filters="filtrateDep"
            :filter-method="filterDepartment"
          ></el-table-column>
          <el-table-column prop="taskName" label="任务">
            <el-link
              type="primary"
              slot-scope="scope"
              @click="task_detail(scope.row,0)"
            >{{scope.row.taskName}}</el-link>
          </el-table-column>
          <el-table-column prop="status" label="执行状态">
            <template slot-scope="scope">
              <span v-if="scope.row.isIgnore == true" class="state_color3">忽略</span>
              <span v-else-if="scope.row.status == 1" class="state_color1">执行中</span>
              <span v-else-if="scope.row.status == 2" class="state_color2">审核中</span>
              <span v-else-if="scope.row.status == 3" class="state_color3">完成</span>
              <span v-else-if="scope.row.status == 4" class="state_color4">延期</span>
              <span v-else-if="scope.row.status == 5" class="state_color3">延期完成</span>
            </template>
          </el-table-column>
          <el-table-column prop="faTaskName" label="父任务"></el-table-column>
          <el-table-column prop="expertTime" label="预计时间" sortable></el-table-column>
          <el-table-column prop="tag" label="操作" width="210" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="info"
                @click="feedback(scope.row.proId,scope.row.taskId,scope.row.proName,scope.row.taskName)"
                v-if="scope.row.isIgnore != true && scope.row.status == 1 || scope.row.status == 2 || scope.row.status == 4"
              >反馈</el-button>
              <el-button
                size="small"
                v-if="scope.row.isIgnore != true && scope.row.status == 2"
                type="primary"
                slot="reference"
                @click="sponsor_achieve(scope.row.proId,scope.row.taskId)"
              >完成</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="page">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="initiateTaskListTota"
            @current-change="initiateTaskList"
          ></el-pagination>
        </el-col>
      </el-col>
      <!--  -->
      <!-- 我参与 -->
      <el-col :span="24" class="table table2" v-show="tabs_activity==2">
        <el-table
          v-loading="loading"
          ref="filterTable"
          :data="tasklist_"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{'height': '57px'}"
          align="left"
        >
          <el-table-column prop="proName" label="所属项目"></el-table-column>
          <el-table-column prop="taskName" label="任务">
            <el-link
              type="primary"
              slot-scope="scope"
              @click="task_detail(scope.row,1)"
            >{{scope.row.taskName}}</el-link>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.isIgnore == true" class="state_color3">忽略</span>
              <span v-else-if="scope.row.status == 1" class="state_color1">执行中</span>
              <span v-else-if="scope.row.status == 2" class="state_color2">审核中</span>
              <span v-else-if="scope.row.status == 3" class="state_color3">完成</span>
              <span v-else-if="scope.row.status == 4" class="state_color4">延期</span>
              <span v-else-if="scope.row.status == 5" class="state_color3">延期完成</span>
            </template>
          </el-table-column>
          <el-table-column prop="doUserName" label="执行人" width="180">
            <template slot-scope="scope">
              <div v-show="changeDoUserNameShow != scope.$index">
                {{scope.row.doUserName}}
                <el-link
                  type="primary"
                  @click="changeDoUserName(scope.$index,scope.row.listOaUser)"
                  v-show="scope.row.isIgnore != true && scope.row.listOaUser.length > 1 && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 5"
                >更换</el-link>
              </div>
              <div v-show="changeDoUserNameShow == scope.$index">
                <el-select
                  v-model="nextuserValue"
                  filterable
                  placeholder="请选择"
                  size="mini"
                  clearable
                  style="width:99px;"
                >
                  <el-option
                    v-for="item in nextuserList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button
                  slot="append"
                  type="primary"
                  size="mini"
                  @click="changeDoUserNameAffirm(scope.row)"
                >确认</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="expertTime" label="预计时间" sortable></el-table-column>
          <el-table-column prop="overTime" label="完成时间" sortable></el-table-column>
          <el-table-column prop="initUserName" label="下达人"></el-table-column>
          <el-table-column prop="taskfileList" label="成果">
            <div
              class="taskfile"
              slot-scope="scope"
              v-if="scope.row.status == 3 && scope.row.taskfileList.length != 0"
              @click="download(scope.row.taskfileList[0])"
            >
              <img
                v-if="scope.row.taskfileList[0].suffix == 'doc' || scope.row.taskfileList[0].suffix == 'docx'"
                src="static/images/document/word.png"
                width="24"
                alt
                srcset
              />
              <img
                v-else-if="scope.row.taskfileList[0].suffix == 'xls' || scope.row.taskfileList[0].suffix == 'xlsx'"
                src="static/images/document/excle.png"
                width="24"
                alt
                srcset
              />
              <img
                v-else-if="scope.row.taskfileList[0].suffix == 'ppt' || scope.row.taskfileList[0].suffix == 'pptx'"
                src="static/images/document/ppt.png"
                width="24"
                alt
                srcset
              />
              <img v-else src="static/images/document/other.png" width="24" alt srcset />
              <el-link type="primary" class="filenametext">{{scope.row.taskfileList[0].fileName}}</el-link>
            </div>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="210" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="small"
                v-if="scope.row.isIgnore != true && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 5"
                type="info"
                slot="reference"
                @click="join_redact(scope.row.proId,scope.row.taskId)"
              >忽略</el-button>
              <el-button
                size="small"
                v-if="scope.row.isIgnore != true && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 5"
                type="primary"
                slot="reference"
                @click="task_detail(scope.row,1)"
              >完成</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="page">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="participateTaskListTota"
            @current-change="participateTaskList"
          ></el-pagination>
        </el-col>
      </el-col>
      <!-- 任务详情抽屉 start -->
      <el-drawer title="任务" :visible.sync="drawer1" :with-header="false">
        <el-scrollbar style="height: 100%">
          <el-row class="task_details" v-loading="drawerLoading">
            <el-col :span="24" class="title">{{taskData.proName}}-{{taskData.taskName}}</el-col>
            <el-col :span="6" class="title">执行部门：</el-col>
            <el-col :span="18">{{taskData.deptName}}</el-col>
            <el-col :span="6" class="title">任务类型：</el-col>
            <el-col :span="18">
              <!-- {{taskData.typeName}} -->
              <template
                v-if="taskData.doUserId == userId && taskData.status == 1 || taskData.status == 4"
              >
                <el-select v-model="taskData.typeId" placeholder="请选择任务类型" size="mini">
                  <el-option
                    v-for="item in task_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else>{{taskData.typeName}}</template>
            </el-col>
            <el-col :span="6" class="title">执行人：</el-col>
            <el-col :span="18">
              <span v-if="!changeNameShow">{{taskData.doUserName}}</span>
              <el-select
                v-if="changeNameShow"
                v-model="taskData.doUserId"
                filterable
                placeholder="请选择"
                size="mini"
                clearable
                style="width:99px;"
              >
                <el-option
                  v-for="item in taskData.listOaUser"
                  :key="item.userId"
                  :label="item.realName"
                  :value="item.userId"
                ></el-option>
              </el-select>
              <el-link
                type="primary"
                @click="changeName()"
                v-show="taskData.deptId == deptId && taskData.isIgnore != true && taskData.listOaUser.length > 1 && taskData.status != 2 && taskData.status != 3 && taskData.status != 5"
              >更换</el-link>
            </el-col>
            <el-col :span="6" class="title">状态：</el-col>
            <el-col :span="18">
              <el-select
                v-model="statusListValue"
                size="mini"
                :class="{'state_color1': statusListValue == 1,
                  'state_color2': statusListValue == 2}"
                placeholder="请选择"
                v-if="taskData.status==1 && taskData.doUserId == userId"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span
                v-else-if="taskData.status==1 && taskData.doUserId != userId"
                class="state_color1"
              >执行中</span>
              <span v-else-if="taskData.status==2" class="state_color2">审核中</span>
              <span v-else-if="taskData.status==3" class="state_color3">已完成</span>
              <span v-else-if="taskData.status==4" class="state_color4">延期</span>
              <span v-else-if="taskData.status==5" class="state_color3">延期完成</span>
            </el-col>
            <el-col :span="6" class="title">预计时间：</el-col>
            <el-col :span="18">
              <template
                v-if="taskData.doUserId == userId && taskData.status == 1 || taskData.status == 4"
              >
                <el-date-picker
                  v-model="taskData.expertTime"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  size="mini"
                ></el-date-picker>
              </template>
              <template v-else>{{taskData.expertTime}}</template>
            </el-col>
            <el-col :span="6" class="title">完成时间：</el-col>
            <el-col :span="18">{{taskData.overTime}}</el-col>
            <el-col :span="6" class="title">需求：</el-col>
            <el-col :span="18">
              <template
                v-if="taskData.doUserId == userId && taskData.status == 1 || taskData.status == 4"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 9}"
                  placeholder="请输入内容"
                  v-model="taskData.remark"
                ></el-input>
              </template>
              <template v-else>{{taskData.remark}}</template>
            </el-col>
            <el-col :span="6" class="title">附件：</el-col>
            <el-col :span="18" class="proFileList">
              <template
                v-if="taskData.doUserId == userId && taskData.status == 1 || taskData.status == 4"
              >
                <el-upload
                  :action="uploadUrl"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :file-list="fileList0"
                  class="elementUpload"
                >
                  <el-button size="mini" type="primary">点击上传附件</el-button>
                </el-upload>
              </template>
              <template v-else>
                <div class="smname" v-for="item in taskData.proFileList" :key="item.index" @click="download(item)">
                  <img
                    v-if="item.suffix == 'doc' || item.suffix == 'docx'"
                    src="static/images/document/word.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'xls' || item.suffix == 'xlsx'"
                    src="static/images/document/excle.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'ppt' || item.suffix == 'pptx'"
                    src="static/images/document/ppt.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img v-else src="static/images/document/other.png" width="24" alt srcset />
                  <div>{{item.fileName}}</div>
                </div>
              </template>
            </el-col>
            <el-divider content-position="right"></el-divider>
            <el-col :span="6" class="title">完成结果：</el-col>
            <el-col :span="18" class>
              <template
                v-if="taskData.doUserId == userId && taskData.status != 3 && taskData.status != 5"
              >
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  :disabled="resultBan"
                  v-model="taskData.overDesc"
                ></el-input>
              </template>
              <template v-else>{{taskData.overDesc}}</template>
            </el-col>
            <el-col :span="6" class="title">附件：</el-col>
            <el-col :span="18" class="proFileList">
              <template
                v-if="taskData.doUserId == userId && taskData.status != 3 && taskData.status != 5"
              >
                <el-upload
                  action="/pmbs/file/upload?upType=1&demandType=1"
                  :on-remove="handleRemoveResult"
                  :on-success="handleSuccessResult"
                  :disabled="updateBan"
                  :fileList="fileList1"
                  :limit="1"
                  class="elementUpload"
                >
                  <el-button size="mini" type="primary">点击上传文档</el-button>
                </el-upload>
              </template>
              <template v-else>
                <div class="smname" v-for="item in taskData.taskfileList" :key="item.index" @click="download(item)">
                  <img
                    v-if="item.suffix == 'doc' || item.suffix == 'docx'"
                    src="static/images/document/word.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'xls' || item.suffix == 'xlsx'"
                    src="static/images/document/excle.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'ppt' || item.suffix == 'pptx'"
                    src="static/images/document/ppt.png"
                    width="24"
                    alt
                    srcset
                  />
                  <img v-else src="static/images/document/other.png" width="24" alt srcset />
                  <div>{{item.fileName}}</div>
                </div>
              </template>
            </el-col>
            <el-divider content-position="right"></el-divider>
            <el-col :span="6" class="title">反馈意见：</el-col>
            <el-col :span="18" class="suggest">
              <el-scrollbar style="height: 100%;">
                <el-col
                  :span="23"
                  class="suggest_list"
                  v-for="item in taskData.feedbackList"
                  :key="item.index"
                >
                  <el-col :span="12" class="time">{{item.updateTime}}</el-col>
                  <el-col :span="12" class="pop">{{item.deptName}}-{{item.feedbackUserName}}</el-col>
                  <el-col :span="24" class="content">{{item.feedback}}</el-col>
                </el-col>
              </el-scrollbar>
            </el-col>
          </el-row>
        </el-scrollbar>
        <el-row class="batton_pa">
          <el-col
            :span="12"
            :offset="7"
            class="batton"
            v-if="taskData.status != 3 && taskData.status != 5"
          >
            <el-button size="small" type="info" @click="cancel">取消</el-button>
            <el-button size="small" type="primary" @click="changeTaskDeil">完成</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 任务详情抽屉 end -->
      <!-- 抽屉-反馈 -->
      <el-drawer title="任务" :visible.sync="drawer2" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer2_task}}</el-col>
            <el-col :span="6" class="title">反馈</el-col>
            <el-col :span="24">
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="feedbackContent"></el-input>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info" @click="empty">取消</el-button>
            <el-button size="small" type="primary" @click="taskFeedback">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer3" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer3_task}}</el-col>
            <el-col :span="6" class="title">延期原因</el-col>
            <el-col :span="24">
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="cause"></el-input>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info" @click="empty">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'task',
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      loading: false,
      drawerLoading: false,
      // 项目类型选择
      task_type: [],
      task_type_value: '',
      // 查询条件
      clientIdList: [], // 用户列表
      clientId: '', // 用户ID
      serviceId: '', // 业务ID
      isUsual: '', // 专项-1/日常-0
      status: '', // 任务状态
      // 抽屉控制
      drawer1: false,
      drawer2: false,
      drawer3: false,
      drawer2_task: '',
      drawer3_task: '',
      // 更换执行人
      changeDoUserNameShow: 'true',
      nextuserList: [], // 下属信息
      nextuserValue: '', // 修改后执行人
      loginState: true, // 避免多次点击
      project_style: '',
      // 筛选目录
      filtratePro: [], // 通过项目筛选
      filtrateDep: [], // 通过部门筛选
      tasklist: [], // 我发起任务列表
      initiateTaskListTota: 0, // 我发起任务列表总页数
      tasklist_: [], // 我参与任务列表
      participateTaskListTota: 0, // 我参与任务列表总页数
      // 1审核中 2执行中 3已完成 4延期
      tableData2: [],
      result: '', // 完成成果
      resultBan: false, // 完成成果禁止输入
      cause: '', // 延期原因
      tabs_activity: 1,
      // 项目类型1选择
      tab1_act: '',
      // 项目类型2选择
      tab2_act: '',
      suggest_list: [],
      // 状态列表
      statusList: [
        { value: 1, label: '执行中' },
        { value: 2, label: '完成' }
      ],
      statusListValue: '',
      // 任务详情
      taskData: {},
      // 禁止选择当前时间之前的时间
      proExpertTime: '',
      pickerOptions: {},
      // 反馈任务ID
      taskFeedbackId: '',
      ProjFeedbackId: '',
      // 反馈内容
      feedbackContent: '',
      // 上传附件
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadUrl: '',
      listProFile: [], // 上传文件信息列表
      suggest_list: [], // 任务反馈意见列表
      fileList0: [],
      // 上传文档
      updateBan: false, // 上传文档禁止
      dialogImageUrlResult: '',
      dialogVisibleResult: false,
      disabledResult: false,
      uploadUrl: '',
      listProFileResult: [], // 上传文件信息列表
      fileList1: [],
      oldFileId: '',
      // 详情内更换执行人
      changeNameShow: false,
      userValue: '' // 修改后执行人
    }
  },
  // 侦听器
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    // 用户选择侦听
    clientId: function(newQuestion, oldQuestion) {
      // clientId: '', // 用户ID
      // serviceId: '', // 业务ID
      // isUsual: '', // 专项-1/日常-0
      // status: '', // 任务状态
      this.findTaskList()
    },
    // 业务类型侦听
    serviceId: function(newQuestion, oldQuestion) {
      // clientId: '', // 用户ID
      // serviceId: '', // 业务ID
      // isUsual: '', // 专项-1/日常-0
      // status: '', // 任务状态
      this.findTaskList()
    },
    // 专项/日常侦听
    isUsual: function(newQuestion, oldQuestion) {
      // clientId: '', // 用户ID
      // serviceId: '', // 业务ID
      // isUsual: '', // 专项-1/日常-0
      // status: '', // 任务状态
      this.findTaskList()
    },
    // 任务状态侦听
    status: function(newQuestion, oldQuestion) {
      // clientId: '', // 用户ID
      // serviceId: '', // 业务ID
      // isUsual: '', // 专项-1/日常-0
      // status: '', // 任务状态
      this.findTaskList()
    },
    drawer1: function(newQuestion, oldQuestion) {
      if (this.drawer5 == false) {
        this.changeNameShow = false
      }
    }
  },
  // 方法
  methods: {
    pickerOptionsTime() {
      let expertTime = this.proExpertTime
      this.pickerOptions = {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() - 8.64e7 ||
            time.getTime() > new Date(expertTime).getTime()
          )
        }
      }
    },
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
      // this.project_style = 'height:' + height + 'px;'
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
        let clientIdList = []
        // console.log(data)
        // let business_type_list = []
        // 循环提取名称和ID
        for (let i = 0; i < data.length; i++) {
          let element = data[i]
          let clientIdListData = {
            value: element.clientId,
            label: element.clientName
          }
          clientIdList.push(clientIdListData)
        }
        this.clientIdList = clientIdList
      }
      // console.log(res)
    },
    // 选项卡
    table_tab(e) {
      this.tabs_activity = e
    },
    //
    tab1_change(e, id) {
      // console.log(e)
      let tab1_act = this.tab1_act
      if (tab1_act == e) {
        this.tab1_act = ''
        this.serviceId = ''
      } else if (e == 1) {
        this.tab1_act = 1
        this.serviceId = id
      } else if (e == 2) {
        this.tab1_act = 2
        this.serviceId = id
      } else if (e == 3) {
        this.tab1_act = 3
        this.serviceId = id
      }
    },
    //
    tab2_change(e, id) {
      // console.log(e)
      let tab2_act = this.tab2_act
      if (tab2_act == e) {
        this.tab2_act = ''
        this.isUsual = ''
      } else if (e == 1) {
        this.tab2_act = 1
        this.isUsual = id
      } else if (e == 2) {
        this.tab2_act = 2
        this.isUsual = id
      }
    },
    //
    tab3_change(id) {
      let status = this.status
      if (status == id) {
        this.status = ''
      } else {
        this.status = id
      }
    },
    // 反馈按钮
    feedback(proId, taskId, proName, taskName) {
      // console.log('反馈' + id)
      this.drawer2 = true
      this.drawer2_task = proName + '-' + taskName
      this.taskFeedbackId = proId
      this.ProjFeedbackId = taskId
    },
    sponsor_achieve(proId, taskId) {
      this.$confirm('是否确认此操作？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          let data = {
            proId: proId,
            taskId: taskId,
            status: 3,
            proFileList: [],
            taskfileList: []
          }
          this.taskSave(data)
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    join_redact(proId, taskId) {
      this.$confirm('是否忽略此任务', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          // this.$message({
          //   type: 'info',
          //   message: '保存修改'
          // });
          let data = {
            proId: proId,
            taskId: taskId,
            isIgnore: 1,
            taskfileList: [],
            proFileList: []
          }
          data.isIgnore = true
          this.taskSave(data)
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: '放弃'
          })
        })
    },
    join_achieve(e, task, state) {
      // console.log('我参与完成' + e)
      if (state == 4) {
        this.drawer3 = true
        this.drawer3_task = task
      }
    },
    // 筛选所属项目
    filterName(value, row) {
      return row.name === value
    },
    filterDepartment(value, row) {
      return row.department === value
    },
    task_detail(taskData, type) {
      let userId = this.userId
      this.drawer1 = true
      // this.statusListValue = taskData.status.toString()
      this.getDepTypeList()
      let data = `?userId=${userId}&id=${taskData.taskId}`
      this.getTaskDetail(data)
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
    // 获取任务详情
    getTaskDetail(data) {
      this.drawerLoading = true
      this.$axios
        .post('/pmbs/api/task/show' + data)
        .then(this.getTaskDetailSuss)
    },
    // 获取任务详情回调
    getTaskDetailSuss(res) {
      // console.log(res)
      this.drawerLoading = false
      if (res.status == 200) {
        let data = res.data.data
        this.taskData = data
        this.listProFile = data.proFileList
        this.listProFileResult = data.taskfileList
        this.statusListValue = data.status
        let fileList0 = []
        for (let i = 0; i < data.proFileList.length; i++) {
          let element = data.proFileList[i]
          let fileList0Data = {
            fileId: element.fileId,
            name: element.fileName
          }
          fileList0.push(fileList0Data)
        }
        this.fileList0 = fileList0
        let fileList1 = []
        for (let i = 0; i < data.taskfileList.length; i++) {
          let element = data.taskfileList[i]
          let fileList1Data = {
            fileId: element.fileId,
            name: element.fileName
          }
          fileList1.push(fileList1Data)
        }
        this.fileList1 = fileList1
        // console.log(data)
      }
      // console.log(this.taskData)
    },
    // 修改执行人按钮
    changeDoUserName(e, list) {
      this.changeDoUserNameShow = e
      // console.log(id)
      this.getNextuserList(list)
    },
    // 获取执行人下属
    getNextuserList(list) {
      let data = list
      // console.log(data)
      let nextuser = []
      if (data != null) {
        for (let i = 0; i < data.length; i++) {
          let element = data[i]
          let nextuserData = {
            value: element.userId,
            label: element.realName
          }
          nextuser.push(nextuserData)
        }
      }
      this.nextuserList = nextuser
    },
    // 确认修改
    changeDoUserNameAffirm(data) {
      // console.log(data)
      let nextuserValue = this.nextuserValue
      if (nextuserValue == '') {
        this.changeDoUserNameShow = 'true'
      } else {
        data.doUserId = nextuserValue
        data.proFileList = []
        this.$axios
          .post('/pmbs/api/task/save', data)
          .then(this.changeDoUserNameAffirmSuss)
      }
    },
    changeDoUserNameAffirmSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        this.messageWin('执行人修改成功')
        this.getTasklist()
        this.changeDoUserNameShow = 'true'
      }
    },
    // 查询任务列表
    findTaskList() {
      // let userId = this.$store.state.user.userId
      let data0 = {
        type: 0,
        clientId: this.clientId,
        serviceId: this.serviceId,
        isUsual: this.isUsual,
        task: {
          initUserId: this.userId,
          status: this.status
        },
        pageNum: 1
      }
      let data1 = {
        type: 1,
        clientId: this.clientId,
        serviceId: this.serviceId,
        isUsual: this.isUsual,
        task: {
          initUserId: this.userId,
          status: this.status
        },
        pageNum: 1
      }
      this.getTasklistAjax(data0)
      this.getTasklistAjax_(data1)
    },
    unique(arr) {
      return Array.from(new Set(arr))
    },
    // 获取任务列表
    getTasklist() {
      // console.log("123")
      let data0 = {
        type: 0,
        task: {
          initUserId: this.userId
        },
        pageNum: 1
      }
      let data1 = {
        type: 1,
        task: {
          initUserId: this.userId
        },
        pageNum: 1
      }
      this.getTasklistAjax(data0)
      this.getTasklistAjax_(data1)
    },
    // 获取我发起任务列表
    getTasklistAjax(data0) {
      this.loading = true
      this.$axios
        .post('/pmbs/api/task/listAjax', data0)
        .then(this.getTasklistAjaxSuss)
    },
    // 获取我发起任务列表回调
    getTasklistAjaxSuss(res) {
      this.loading = false
      if (res.status == 200) {
        let data = res.data.data.items
        this.tasklist = data
        this.initiateTaskListTota = res.data.data.totalRows // 我发起任务列表总页数
      }
      // console.log(res)
    },
    // 获取我参与任务列表
    getTasklistAjax_(data1) {
      this.loading = true
      this.$axios
        .post('/pmbs/api/task/listAjax', data1)
        .then(this.getTasklistAjax_Suss)
    },
    // 获取我参与任务列表回调
    getTasklistAjax_Suss(res) {
      this.loading = false
      if (res.status == 200) {
        let data = res.data.data.items
        this.tasklist_ = data
        this.participateTaskListTota = res.data.data.totalRows // 我参与任务列表总页数
      }
      // console.log(res)
    },

    ///////// 任务需求附件上传 start /////////
    upload() {
      let upType = 1
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
          proId: this.taskData.proId, // 项目ID
          taskId: this.taskData.taskId, // 任务ID
          fileId: '', // 文档ID
          fileName: resData.fileName, //'附件名称',
          isPro: 1, // '项目任务需求（0-项目需求，1-任务需求）',
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType //'文档后缀'
        }
        listProFile.push(listProFileData)
        this.listProFile = listProFile
        console.log(this.listProFile)
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
          // console.log('删除')
        }
      }
      this.listProFile = listProFile
      console.log(this.listProFile)
    },
    ///////// 任务需求附件上传 end /////////

    ///////// 任务成果附件上传 start /////////
    // 上传回调
    handleSuccessResult(res, file, fileList) {
      // console.log('上传附件成功')
      if (res.errcode == 0) {
        let resData = res.data
        let listProFileResult = this.listProFileResult
        // console.log(listProFile)
        let listProFileResultData = {
          proId: this.taskData.proId, // 项目ID
          taskId: this.taskData.taskId, // 任务ID
          fileId: '', // 文档ID
          updateUserId: this.userId, // 上传人ID
          fileName: resData.fileName, //'文档名称',
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType, //'文档后缀'
          oldFileId: this.oldFileId // 原文档ID
        }
        listProFileResult.push(listProFileResultData)
        this.listProFileResult = listProFileResult
        // this.updateBan = true
        // console.log(this.listProFileResult)
      }
    },
    // 删除
    handleRemoveResult(file) {
      // console.log(file)
      let data = file
      let listProFileResult = this.listProFileResult
      if (listProFileResult.fileId) {
        this.oldFileId = listProFileResult.fileId
      } else {
        this.listProFileResult = []
      }
    },
    ///////// 任务成果附件上传 end /////////

    ///////// 修改任务详情 start /////////
    // 修改任务详情
    changeTaskDeil() {
      // console.log('修改任务详情')
      // console.log('修改任务详情')
      // listProFile
      this.drawer1 = false
      this.drawer5 = false
      let taskData = this.taskData // 任务详情
      let listProFile = this.listProFile // 需求文档
      let listProFileResult = this.listProFileResult // 结果文档
      let status = this.statusListValue
      taskData.proFileList = listProFile
      taskData.taskfileList = listProFileResult
      taskData.status = status
      // console.log(taskData.listProFile)
      this.taskSave(taskData)
    },
    ///////// 修改任务详情 end /////////

    ///////// 任务新增/修改/完成 start /////////
    taskSave(data) {
      // console.log(this.new_task.presetTime)
      // console.log(expertTime)
      this.$axios.post('/pmbs/api/task/save', data).then(this.taskSaveSuss)
    },
    // 任务新增/修改/完成回调
    taskSaveSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        // this.projectListJoin = res.data.data
        this.messageWin(res.data.msg)
        this.result = ''
        this.listProFile = []
        this.listProFileResult = []
        this.getTasklist()
        // console.log(this.projectListJoin)
      }
    },
    ///////// 任务新增/修改/完成 end /////////
    // 任务删除
    taskDelete(id) {
      let data = `?id=${id}`
      this.$axios.post('/pmbs/api/task/delete' + data).then(this.taskDeleteSuss)
    },
    // 获取任务详情回调
    taskDeleteSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let data = res.data
        // this.taskData = data
      }
    },
    // 任务反馈
    taskFeedback() {
      let updateTime = new Date()
      let data = {
        // deleteFlag: true,
        feedback: this.feedbackContent, // 反馈内容
        // feedbackId: 0,
        initUserId: this.userId, // 反馈人ID
        proId: this.projFeedbackId,
        taskId: this.taskFeedbackId, // 反馈任务ID
        updateTime: updateTime // 反馈时间
      }
      if (data.feedback == '') {
        this.messageError('信息不能为空')
      } else {
        this.$axios
          .post('/pmbs/api/project/taskfeedback', data)
          .then(this.taskFeedbackSuss)
      }
    },
    // 任务反馈回调
    taskFeedbackSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        this.messageWin('反馈成功')
        this.drawer2 = false
        this.feedbackContent = ''
        this.taskFeedbackId = ''
        // 重新获取任务列表
        this.getTasklist() // 重新获取任务列表
      }
    },
    // 取消按钮
    cancel() {
      this.drawer1 = false
    },
    // 我发起分页
    initiateTaskList(page) {
      let data0 = {
        type: 0,
        clientId: this.clientId,
        serviceId: this.serviceId,
        isUsual: this.isUsual,
        task: {
          initUserId: this.userId,
          status: this.status
        },
        pageNum: page
      }
      this.getTasklistAjax(data0)
    },
    // 我参与分页
    participateTaskList(page) {
      let data1 = {
        type: 1,
        clientId: this.clientId,
        serviceId: this.serviceId,
        isUsual: this.isUsual,
        task: {
          initUserId: this.userId,
          status: this.status
        },
        pageNum: page
      }
      this.getTasklistAjax_(data1)
    },
    // 详情内修改执行人
    changeName() {
      this.changeNameShow = true
    },
    download(row) {
      let localPath = row.localPath
      // console.log("123")
      let a = document.createElement('a')
      a.download = ''
      a.setAttribute('href', 'http://218.106.254.122:8084/pmbs/' + localPath)
      a.click()
    },
    // 抽屉取消按钮
    empty() {
      this.drawer3 = false
      this.drawer2 = false
      this.feedbackContent = ''
      this.result = ''
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
    },
    // MessageBox() {
    //   this.$alert('这是一段内容', '标题名称', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //       this.join_redact()
    //       // this.$message({
    //       //   type: 'info',
    //       //   message: `action: ${ action }`
    //       // });
    //     }
    //   })
    // },
    test() {
      console.log('打印测试')
    }
  },
  // 钩子函数
  mounted() {
    this.widthheight()
    this.getAllClientAndBusiness() // 获取客户和业务
    this.getTasklist() // 获取任务列表
    this.upload() // 上传附件地址
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.task .top {
  height: 36px;
  line-height: 36px;
  margin-bottom: 13px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.task .top .title {
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.task .top .tab1 .el-button--primary.is-plain {
  border-color: #ddd;
}
.task .top .tab2 .el-button--primary.is-plain {
  border-color: #ddd;
}
.task .top .tab1 >>> .el-button,
.task .top .tab2 >>> .el-button {
  background: #fff;
  color: black;
}
.task .top .tab1 >>> .el-button:hover,
.task .top .tab2 >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.task .top .tab1 >>> .el-button.act,
.task .top .tab2 >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.task .top .tab3 >>> .el-button {
  width: 80px;
}
.el-button + .el-button {
  margin: 0;
}
.task .tabs {
  font-weight: 700;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 13px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.task .tabs div {
  height: 32px;
  line-height: 32px;
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
.task .table .list:hover {
  background: #f7f7f7;
}
.task .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.task .table .title .el-icon-sort {
  font-size: 18px;
}
.task .table .title div {
  height: 48px;
  line-height: 48px;
}

.task .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.task .table .page {
  text-align: center;
}
.task .table .taskfile {
  cursor: pointer;
}
.task .table .filenametext {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.task .task_details {
  height: 100%;
  padding: 36px 36px 108px 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
  align-items: flex-start;
}
.task .task_details > .el-col {
  margin-bottom: 18px;
}
.task .task_details .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.task .task_details .title:nth-of-type(1) {
  text-align: left;
  box-sizing: border-box;
  padding-left: 18px;
  font-weight: 600;
  font-size: 18px;
}
.task .task_details .proFileList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.task .task_details .smname {
  width: 72px;
  text-align: center;
  font-size: 13px;
  color: rgb(162, 162, 162);
}
.task .task_details .suggest {
  height: 108px;
}
/* .task .task_details .suggest .el-scrollbar{
  height: 100%;
  overflow-x: scroll;
} */
.task .task_details .suggest .suggest_list {
  height: 48px;
  margin-bottom: 12px;
}
.task .task_details .suggest .suggest_list .pop,
.task .task_details .suggest .suggest_list .time {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: rgb(162, 162, 162);
}
.task .task_details .suggest .suggest_list .pop {
  text-align: right;
}
.task .task_details .suggest .suggest_list .content {
  color: #000;
  font-size: 16px;
}
.task .batton_pa {
  width: 100%;
  padding: 36px;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
}
.task .task_details >>> .el-select input {
  width: 108px;
  border: none;
  font-size: 16px;
  padding-left: 0;
}
.task .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.task .batton button {
  width: 36%;
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
/* .task >>> .el-drawer__body {
  height: 100%;
} */
.task >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.task .elementUpload {
  width: 100%;
}
</style>
