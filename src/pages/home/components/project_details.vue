<template>
  <div class="project_details" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <el-link @click="toProject()">项目管理</el-link>
        <span class="project_name">/ {{proName}}</span>
      </el-col>
      <el-col :span="6" class="tabs">
        <el-button-group>
          <el-button
            type="primary"
            plain
            size="small"
            @click="table_tab(1)"
            :class="[tabs_activity=='1' ? 'act' : '']"
          >执行情况</el-button>
          <el-button
            type="primary"
            plain
            size="small"
            @click="table_tab(2)"
            :class="[tabs_activity=='2' ? 'act' : '']"
          >项目需求</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="4" :offset="13" class="detail_list">
        <el-col :span="24" v-show="!sousuo_show">
          <i @click="addtask" v-if="projectShowDetail.status != 3" class="el-icon-circle-plus-outline"></i>
          <i @click="gantt(1)" class="el-icon-tickets"></i>
          <!-- <i @click="drawer2 = true" class="el-icon-time"></i> -->
          <i @click="sousuoShow" class="el-icon-search"></i>
        </el-col>
        <el-col :span="24" class="sousuo" v-show="sousuo_show">
          <el-col :span="20">
            <el-input placeholder="请输入内容" v-model="sousuo_input" size="small">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="sousuo"></i>
            </el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <i class="el-icon-circle-close" @click="sousuoShow"></i>
          </el-col>
        </el-col>
      </el-col>
      <!-- 任务列表 -->
      <el-col :span="24" class="table table1" v-if="table_show">
        <!--  -->
        <el-table
          v-loading="loading"
          ref="filterTable"
          :data="taskList"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="deptName" label="部门"></el-table-column>
          <el-table-column prop="taskName" label="任务">
            <template slot-scope="scope">
              <el-link @click="task_detail(scope.row)">{{scope.row.taskName}}</el-link>
            </template>
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
                  v-show="scope.row.deptId == deptId && scope.row.isIgnore != true && scope.row.listOaUser != null && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 5"
                >更换</el-link>
                <!-- doUserId -->
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
          <el-table-column prop="overDesc" label="成果">
            <div
              class="result"
              slot-scope="scope"
              v-if="scope.row.status == 3 && scope.row.taskfileList.length != 0"
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
              <div class="filenametext">{{scope.row.taskfileList[0].fileName}}</div>
            </div>
          </el-table-column>
          <el-table-column prop="操作" label="操作" filter-placement="bottom-end" width="136">
            <template slot-scope="scope">
              <div v-if="userId == scope.row.initUserId">
                <el-button
                  size="small"
                  v-if="scope.row.isIgnore != true && scope.row.status == 2 || scope.row.status == 4"
                  type="info"
                  @click="feedback(scope.row.taskId,scope.row.proName,scope.row.taskName)"
                >反馈</el-button>
                <el-button
                  size="small"
                  v-if="scope.row.isIgnore != true && scope.row.status == 2"
                  type="primary"
                  slot="reference"
                  @click="sponsor_achieve(scope.row.proId,scope.row.taskId)"
                >完成</el-button>
              </div>
              <div v-else-if="userId == scope.row.doUserId">
                <el-button
                  size="small"
                  v-if="scope.row.isIgnore != true && scope.row.status == 1 || scope.row.status == 4"
                  type="info"
                  slot="reference"
                  @click="redact(scope.row.proId,scope.row.taskId)"
                >忽略</el-button>
                <el-button
                  size="small"
                  v-if="scope.row.isIgnore != true && scope.row.status == 1 || scope.row.status == 4"
                  type="primary"
                  slot="reference"
                  @click="task_detail(scope.row)"
                >完成</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 项目需求 -->
      <el-col :span="24" class="table table2" v-if="!table_show">
        <el-col :span="7" class="title">
          <el-col :span="24">项目名称</el-col>
          <el-col :span="24">{{projectShowDetail.proName}}</el-col>
        </el-col>
        <el-col :span="7" class="title">
          <el-col :span="24">预计时间</el-col>
          <el-col :span="24">{{projectShowDetail.expertTime}}</el-col>
        </el-col>
        <el-col :span="7" class="title">
          <el-col :span="24">项目类别</el-col>
          <el-col :span="24">
            {{projectShowDetail.clientName}}-
            {{projectShowDetail.businessName}}-
            {{projectShowDetail.projectType}}
          </el-col>
        </el-col>
        <el-col :span="24" class="need">
          <el-col :span="24" class="span">需求</el-col>
          <el-col :span="24" class>{{projectShowDetail.remark}}</el-col>
          <!-- <el-col :span="24" class>
            方案结构
            <br />1.平台现状分析(事实数据，反应注册人数、认证人数)
            <br />2.指出运营现状的问题(根据事实数据，指出问题)
            <br />3.行业环境及趋势或优秀案例及效果(大家-般怎么做)
            <br />4.提出我们的解决施策(我们怎么做)
            <br />5.效果量化(说明整体KPI，明确阶段KPI)
            <br />6.创意实施(具体创意细化)
            <br />7.预算及KPI
            <br />
            <br />
          </el-col>
          <el-col :span="24" class>
            其他补充
            <br />1.重点创意必须联系设计制作创意DEMO
            <br />2.客户重点提及各地车友会的资源利用，创意构思时要重点考虑。
            <br />3.网易云音乐需明确合作资源
            <br />4.竞争情报:三选一，对手为XXXXXX
            <br />
            <br />
          </el-col>-->
          <el-col :span="24" class="span">附件</el-col>
          <el-col :span="24" class="fileList">
            <div v-for="item in projectShowDetail.listProFile" :key="item.index" class="fileList_">
              <div class="shade" @click="download(item)">
                <i class="el-icon-download"></i>
              </div>
              <img
                v-if="item.suffix == 'doc' || item.suffix == 'docx'"
                src="static/images/document/word.png"
                alt
                srcset
              />
              <img
                v-else-if="item.suffix == 'xls' || item.suffix == 'xlsx'"
                src="static/images/document/excle.png"
                alt
                srcset
              />
              <img
                v-else-if="item.suffix == 'ppt' || item.suffix == 'pptx'"
                src="static/images/document/ppt.png"
                alt
                srcset
              />
              <img v-else src="static/images/document/other.png" alt srcset />
              <br />
              <span>{{item.fileName}}</span>
            </div>
            <div></div>
            <div></div>
          </el-col>
        </el-col>
      </el-col>
      <!-- 抽屉创建任务 -->
      <el-drawer title="创建任务" :visible.sync="drawer1" :with-header="false">
        <el-scrollbar style="height: 100%">
          <el-row class="add_box">
            <el-col :span="24">
              <el-col :span="6" class="title title1">创建任务</el-col>
            </el-col>
            <el-col :span="6" class="title">父任务</el-col>
            <el-col :span="13">
              <!-- <el-input placeholder="请输入内容" v-model="new_task.parent_task" clearable></el-input> -->
              <el-select
                v-model="new_task.faTask"
                filterable
                placeholder="请选择"
                class="parent_task"
                clearable
                :disabled="faTaskDisabled"
              >
                <el-option
                  v-for="item in faTaskList"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- {{new_task.faTask}} -->
            </el-col>
            <el-col :span="24">
              <el-col :span="6" class="title title2">执行部门</el-col>
              <el-col :span="15" :offset="6" class="department">
                <el-radio
                  v-model="new_task.department"
                  :label="items.id"
                  v-for="items in deptList"
                  :key="items.index"
                >{{items.name}}</el-radio>
              </el-col>
            </el-col>

            <el-col :span="6" class="title">名称</el-col>
            <el-col :span="13">
              <el-input placeholder="请输入内容" v-model="new_task.new_name" clearable></el-input>
            </el-col>
            <el-col :span="6" class="title">预计时间</el-col>
            <el-col :span="13" class="presetTime">
              <el-date-picker
                v-model="new_task.presetTime"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-col>
            <el-col :span="6" class="title">任务类型</el-col>
            <el-col :span="13" class="task_type">
              <el-select v-model="task_type_value" placeholder="请选择任务类型">
                <el-option
                  v-for="item in task_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="title">需求</el-col>
            <el-col :span="13">
              <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 8}"
                placeholder="请输入内容"
                v-model="new_task.remark"
              ></el-input>
            </el-col>
            <!-- 上传 -->
            <el-col :span="13" :offset="6" class="upload">
              <el-upload :action="uploadUrl" :on-remove="handleRemove" :on-success="handleSuccess">
                <el-button size="small" type="primary">点击上传</el-button>
                <span class="text">上传附件</span>
              </el-upload>
            </el-col>
            <!-- 上传 -->

            <el-col :span="12" :offset="7" class="batton">
              <el-button size="small" type="info" @click="empty">取消</el-button>
              <el-button size="small" type="primary" @click="putIn">提交</el-button>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-drawer>
      <!-- 抽屉 -->
      <el-drawer title="历史记录" :visible.sync="drawer2" :with-header="false">
        <el-row class="records">
          <el-col :span="23" :offset="1" class="title">历史记录</el-col>
          <el-col :span="23" :offset="1" class="records_list" :style="style1">
            <el-scrollbar>
              <el-timeline>
                <el-timeline-item
                  v-for="item in records_list"
                  :key="item.index"
                  :timestamp="item.time"
                  placement="top"
                >
                  <el-card class="content">
                    <p>变动内容：{{item.result}}</p>
                    <p>更新人：{{item.people}}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-drawer>

      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer3" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer3_task}}</el-col>
            <el-col :span="6" class="title">反馈</el-col>
            <el-col :span="24">
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="feedbackContent"></el-input>
            </el-col>
          </el-col>
          <el-col :span="14" :offset="5" class="batton">
            <el-button size="small" type="info" @click="empty">取消</el-button>
            <el-button size="small" type="primary" @click="taskFeedback()">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer4" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer4_task}}</el-col>
            <el-col :span="6" class="title">延期原因</el-col>
            <el-col :span="24">
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="result"></el-input>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info" @click="empty">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 任务详情抽屉 start -->
      <el-drawer title="任务" :visible.sync="drawer5" :with-header="false">
        <el-scrollbar style="height: 100%" v-loading="drawerLoading">
          <el-row class="task_details">
            <el-col :span="24" class="title">{{taskData.proName}}-{{taskData.taskName}}</el-col>
            <el-col :span="6" class="title">执行部门：</el-col>
            <el-col :span="18">{{taskData.deptName}}</el-col>
            <el-col :span="6" class="title">任务类型：</el-col>
            <el-col :span="18">
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
                v-show="taskData.deptId == deptId && taskData.isIgnore != true && taskData.listOaUser != null && taskData.status != 2 && taskData.status != 3 && taskData.status != 5"
              >更换</el-link>
            </el-col>
            <el-col :span="6" class="title">状态：</el-col>
            <el-col :span="18">
              <el-select
                v-model="statusListValue"
                size="mini"
                :class="{'state_color1': taskData.status == 1,
                  'state_color2': taskData.status == 2}"
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
                <div class="smname" v-for="item in taskData.proFileList" :key="item.index">
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
            <el-col :span="18">
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
                <div class="smname" v-for="item in taskData.taskfileList" :key="item.index">
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
        <el-row class="batton_pa" v-show="batton_pa" v-if="!resultBan">
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary" @click="changeTaskDeil">完成</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 任务详情抽屉 end -->
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'project_details',
  data() {
    return {
      // userId: this.$store.state.user.userId,
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      loading: false,
      drawerLoading: false,
      proId: '', // 项目ID
      proName: '', // 项目NAME
      taskId: '', // 任务ID
      type: '', // 项目类型 0我发起 1我参与
      loginState: true, // 避免多次点击
      project_style: '',
      drawer1: false,
      drawer2: false,
      drawer3: false,
      drawer4: false,
      drawer5: false,
      drawer3_task: '',
      drawer4_task: '',
      sousuo_show: false,
      sousuo_input: '', // 所搜框内容
      taskList: [], // 任务列表
      deptList: [], // 部门列表
      departmentList: [], // 部门列表未处理
      projectShowDetail: {}, // 项目详情
      // 1执行中 2审核中 3已完成 4延期
      // 我参与 我发起选项卡
      tabs_activity: 1,
      table_show: true,
      // 父任务列表
      faTaskList: [],
      faTaskDisabled: false, // 是否禁止
      // 新增
      new_task: {
        faTask: '',
        new_name: '',
        department: '',
        presetTime: '',
        task_type: '',
        remark: ''
      },
      // 禁止选择当前时间之前的时间
      proExpertTime: '',
      pickerOptions: {},
      records_list: [
        {
          time: '20/04/02 20:46',
          result: '前端开发时间变动',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '20/04/02 20:46',
          result: '策划方案预计完成时间改动',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        }
      ],
      // 状态列表
      statusList: [
        { value: 1, label: '执行中' },
        { value: 2, label: '完成' }
      ],
      statusListValue: '',
      style1: '',
      // 反馈信息
      feedbackContent: '', // 任务反馈内容
      taskFeedbackId: '', // 反馈任务的ID

      // 项目类型选择
      task_type: [],
      task_type_value: '',

      // 任务详情
      taskData: {},
      batton_pa: true, // 是否显示完成按钮
      result: '', // 完成结果
      resultBan: false, // 完成成果禁止输入
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
      // 更换执行人
      changeDoUserNameShow: 'true',
      nextuserList: [], // 下属信息
      nextuserValue: '', // 修改后执行人
      // 详情内更换执行人
      changeNameShow: false,
      userValue: '' // 修改后执行人
    }
  },
  // 侦听器
  watch: {
    // 如果 `checkListDept` 发生改变，这个函数就会运行
    drawer5: function(newQuestion, oldQuestion) {
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
    // 时间格式Y-M-D
    formatData(date) {
      // var date = new Date();
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()

      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return year + '-' + month + '-' + strDate
    },
    // 时间格式Y-M-D H-M-S
    formatData2(date) {
      // var date = new Date();
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hours >= 0 && hours <= 9) {
        hours = '0' + hours
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      return (
        year +
        '-' +
        month +
        '-' +
        strDate +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
      )
    },
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height1 = winHeight - 100
      this.style1 = 'height:' + height1 + 'px;'
    },
    addtask() {
      this.drawer1 = true
      this.taskData = {}
      // 任务类型获取
      this.getDepTypeList()
      // 部门列表获取
      this.getDeptList()
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
    redact(proId, taskId) {
      // console.log('忽略' + taskId)
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
    feedback(id, pro, task) {
      // console.log(id)
      // console.log(pro)
      // console.log(task)
      this.drawer3 = true
      // this.drawer3_task = `${pro}-${task}`
      this.drawer3_task = `${task}`
      this.taskFeedbackId = id
    },
    achieve(id, status) {
      // console.log('完成' + id)
      if (status == 1) {
        // let updateTime = this.formatData2(new Date())
        let data = {
          // updateTime: updateTime,
          // proId: this.proId,
          taskId: id,
          status: 2
        }
        this.taskSave(data)
      } else if (status == 2) {
        let overTime = this.formatData2(new Date())
        let data = {
          // proId: this.proId, // 项目ID
          taskId: id, // 任务ID
          status: 3, // 改变状态
          overTime: overTime // 完成时间
        }
        this.taskSave(data)
      } else if (status == 4) {
        this.drawer4 = true
        this.drawer4_task = task
      }
    },
    gantt(e) {
      let proId = this.$route.query.id
      let type = this.$route.query.type
      this.$router.push({ path: '/gantti', query: { id: proId, type: type } })
    },
    sousuoShow(e) {
      this.sousuo_show = !this.sousuo_show
      // console.log(e)
    },
    sousuo() {
      // console.log(this.sousuo_input)
      this.getParams(this.sousuo_input)
    },
    task_detail(taskData) {
      let userId = this.userId
      this.drawer5 = true
      // console.log(taskData)
      this.taskId = taskData.taskId
      // this.statusListValue = taskData.status.toString()
      this.getDepTypeList()
      let data = `?userId=${userId}&id=${taskData.taskId}`
      this.getTaskDetail(data)
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
      this.drawerLoading = false
      console.log(res)
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
      }
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
          proId: this.taskData.proId || '', // 项目ID
          taskId: this.taskData.taskId || '', // 任务ID
          fileId: '', // 文档ID
          fileName: resData.fileName, //'附件名称',
          isPro: 1, // '项目任务需求（0-项目需求，1-任务需求）',
          deleteFlag: false, // 是否删除
          ptId: this.taskData.taskId || '', //所属任务ID
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
      // console.log(this.listProFile)
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
          proId: this.proId, // 项目ID
          taskId: this.taskId, // 任务ID
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
      }else{
        this.listProFileResult = []
      }
      // for (let i = 0; i < listProFileResult.length; i++) {
      //   let element = listProFileResult[i]
      //   if (element.fileId == data.fileId) {
      //     listProFileResult[i].deleteFlag = true
      //   }
      // }
      // this.listProFileResult = listProFileResult
      // console.log(this.listProFileResult)
    },
    ///////// 任务成果附件上传 end /////////
    // 获取页面传参
    getParams(sousuo) {
      let userId = this.userId
      let proId = this.$route.query.id
      let type = this.$route.query.type
      this.proId = proId
      this.type = type
      // console.log(id)
      if (type == 0) {
        this.getProjectOfTask(proId, sousuo)
      } else if (type == 1) {
        this.getProjectOfUserTask(proId, sousuo)
      }
      let data = `?proId=${proId}`
      this.getProjectShowDetail(data)
    },
    // 获取项目需求
    getProjectShowDetail(data) {
      this.$axios
        .post('/pmbs/api/project/showDetail' + data)
        .then(this.getProjectShowDetailSuss)
    },
    // 获取项目需求回调/api/project/projectOfUserTask
    getProjectShowDetailSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let data = res.data.data
        this.projectShowDetail = data
        this.proName = data.proName
        this.proExpertTime = data.expertTime
        this.pickerOptionsTime() // 禁用时间函数
      }
    },
    // 获取项目详情-我发起
    getProjectOfTask(proId, sousuo) {
      this.loading = true
      let data = ''
      let userId = this.userId
      if (sousuo != undefined) {
        data = `?proId=${proId}&taskName=${sousuo}&userId=${userId}`
      } else {
        data = `?proId=${proId}&userId=${userId}`
      }
      this.$axios
        .post('/pmbs/api/project/projectOfTask' + data)
        .then(this.getProjectOfTaskSuss)
    },
    // 获取项目详情-我发起回调
    getProjectOfTaskSuss(res) {
      // console.log(res)
      this.loading = false
      if (res.status == 200) {
        let data = res.data.data
        console.log(data)
        this.taskList = data
        console.log(this.taskList)
      }
    },
    // 获取项目详情-我参与
    getProjectOfUserTask(proId, sousuo) {
      this.loading = true
      let data = ''
      let userId = this.userId
      if (sousuo != undefined) {
        data = `?proId=${proId}&taskName=${sousuo}&userId=${userId}`
      } else {
        data = `?proId=${proId}&userId=${userId}`
      }
      this.$axios
        .post('/pmbs/api/project/projectOfUserTask' + data)
        .then(this.getProjectOfUserTaskSuss)
    },
    // 获取项目详情-我参与回调
    getProjectOfUserTaskSuss(res) {
      this.loading = false
      if (res.status == 200) {
        let taskList = res.data.data
        this.taskList = taskList
      }
    },
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
        this.departmentList = data
        // console.log(deptList)
      }
    },
    // 父任务列表获取
    getParentTask() {
      let userId = this.userId
      let proId = this.$route.query.id
      let depId = this.$store.state.user.deptId
      let data = `?userId=${userId}&proId=${proId}&depId=${depId}`
      this.$axios
        .post('/pmbs/api/task/findParentTask' + data)
        .then(this.getParentTaskSuss)
    },
    // 父任务列表获取回调
    getParentTaskSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let data = res.data
        let faTaskList = []
        for (let i = 0; i < data.length; i++) {
          let element = data[i]
          let faTaskListData = {}
          faTaskListData.value = element.taskId
          faTaskListData.label = element.taskName
          faTaskList.push(faTaskListData)
        }
        this.faTaskList = faTaskList
        if (faTaskList.length == 0) {
          this.faTaskDisabled = true
        } else {
          this.faTaskDisabled = false
        }
      }
    },
    // 新增任务提交按钮
    putIn() {
      // 预计时间
      let expertTime = this.formatData(this.new_task.presetTime)
      // 创建时间
      let createTime = this.formatData2(new Date())
      // 选择的执行部门ID
      let department = this.new_task.department
      // 部门负责人ID 执行人ID
      let doUserId = ''
      let deptList = this.departmentList // 部门列表
      // console.log(department)
      for (let i = 0; i < deptList.length; i++) {
        let element = deptList[i]
        // console.log(element.deptId)
        if (department == element.deptId) {
          doUserId = element.principalUserId
          // console.log(element.principalUserId)
        }
      }
      // console.log(doUserId)
      let data = {
        createTime: createTime, // 创建时间
        deptId: department, // '所属部门id',
        doUserId: doUserId, // '参与人id',
        expertTime: expertTime, // '预计时间',
        faTask: this.faTask, // '父任务id',
        initUserId: this.userId, //'发起人id',
        proFileList: this.listProFileResult, // 上传文档列表
        proId: this.proId, // '所属项目id',
        remark: this.new_task.remark, // '需求',
        taskName: this.new_task.new_name, //'任务名',
        typeId: this.task_type_value //'任务类型id'
      }
      // data.taskName[0].oldFileId = this.oldFileId
      this.taskSave(data)
      this.drawer1 = true
    },
    ///////// 修改任务详情 start /////////
    changeTaskDeil() {
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
        this.getParams()
        // console.log(this.projectListJoin)
      }
    },
    ///////// 任务新增/修改/完成 end /////////
    // 任务反馈
    taskFeedback() {
      // console.log(this.new_task.presetTime)
      // console.log(expertTime)
      let updateTime = new Date()
      let data = {
        // deleteFlag: true,
        feedback: this.feedbackContent, // 反馈内容
        // feedbackId: 0,
        initUserId: this.userId, // 反馈人ID
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
        this.drawer3 = false
        this.feedbackContent = ''
        this.taskFeedbackId = ''
        this.getParams() // 重新获取任务列表
      }
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
    // 修改执行人
    changeDoUserName(e, list) {
      this.changeDoUserNameShow = e
      this.getNextuserList(list)
    },
    // 获取执行人下属
    getNextuserList(list) {
      let data = list
      let nextuser = []
      for (let i = 0; i < data.length; i++) {
        let element = data[i]
        let nextuserData = {
          value: element.userId,
          label: element.realName
        }
        nextuser.push(nextuserData)
      }
      this.nextuserList = nextuser
    },
    // 确认修改
    changeDoUserNameAffirm(data) {
      // console.log(data)
      let nextuserValue = this.nextuserValue
      data.proFileList = []
      if (nextuserValue == '') {
        this.changeDoUserNameShow = 'true'
      } else {
        data.doUserId = nextuserValue
        this.$axios
          .post('/pmbs/api/task/save', data)
          .then(this.changeDoUserNameAffirmSuss)
      }
    },
    changeDoUserNameAffirmSuss(res) {
      if (res.status == 200) {
        this.messageWin('执行人修改成功')
        this.getParams()
        this.changeDoUserNameShow = 'true'
      }
    },
    // 详情内修改执行人
    changeName() {
      this.changeNameShow = true
    },
    // 抽屉取消按钮
    empty() {
      this.drawer3 = false
      this.drawer4 = false
      this.feedbackContent = ''
      this.result = ''
      this.new_task.faTask = ''
      this.new_task.department = ''
      this.new_task.new_name = ''
      this.new_task.presetTime = ''
      this.task_type_value = ''
      this.new_task.remark = ''
      this.file_list = []
      this.listProFileResult = []
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
    //  [download 下载附件]

    download(row) {
      let localPath = row.localPath
      // console.log("123")
      let a = document.createElement('a')
      a.download = ''
      a.setAttribute('href', 'http://218.106.254.122:8084/pmbs/' + localPath)
      a.click()
    },
    // 跳转项目管理界面
    toProject() {
      this.$router.push({ path: '/home/components/project' })
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
    }
  },
  // 钩子函数
  mounted() {
    // this.widthheight()
    // 获取页面传参
    this.getParams()
    this.upload()
    this.getParentTask()
    // console.log(Date.now('2030-03-17 00:00:00'))
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.project_details .top {
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center; */
  margin-bottom: 24px;
}
.project_details .top {
  font-size: 13px;
}
.project_details .top .project_name {
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  height: 19px;
  line-height: 19px;
}
.project_details .top .tab {
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
.project_details .detail_list > div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.project_details .detail_list img {
  width: 24px;
}
.project_details .detail_list i {
  font-size: 24px;
  cursor:pointer;
}
.project_details .detail_list .sousuo {
  display: flex;
  align-items: center;
}
.project_details .detail_list .sousuo i {
  font-size: 21px;
}
.el-button + .el-button {
  margin: 0;
}
.project_details .tabs {
  margin-bottom: 13px;
}
.project_details .tabs .el-button--primary.is-plain {
  border-color: #ddd;
}
.project_details .tabs >>> .el-button {
  background: #fff;
  color: black;
}
.project_details .tabs >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.project_details .tabs >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.project_details .tabs div:nth-of-type(1) {
  border: none;
}
.project_details .tabs div.act {
  color: white;
}
.project_details .table1 .title,
.project_details .table1 .list {
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
.project_details .table1 .list:hover {
  background: #f7f7f7;
}
.project_details .table1 .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.project_details .table1 .title .el-icon-sort {
  font-size: 18px;
}
.project_details .table1 .title div {
  height: 48px;
  line-height: 48px;
}
.project_details .table1 .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.project_details .table1 .list div:nth-of-type(1) {
  cursor: pointer;
}
.project_details .table1 .list div {
  height: 48px;
  line-height: 48px;
}
.project_details .table1 .result {
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
}
.project_details .table2 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project_details .table2 .title {
  height: 100px;
  box-sizing: border-box;
  padding: 13px;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 4px;
  font-weight: 400;
  font-size: 20px;
  color: rgb(16, 16, 16);
  line-height: 29px;
}

.project_details .table2 .title div:nth-of-type(2) {
  font-weight: 400;
  font-size: 16px;
  color: rgb(96, 94, 94);
  line-height: 24px;
}
.project_details .table2 .need {
  /* margin-top: 36px; */
  font-weight: 400;
  font-size: 16px;
  color: rgb(96, 94, 94);
  line-height: 28px;
}
.project_details .table2 .need .span {
  font-weight: 400;
  font-size: 20px;
  color: rgb(16, 16, 16);
  margin-top: 24px;
}
.project_details .table2 .need .fileList {
  width: 100%;
  height: 76px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.project_details .table2 .need .fileList img {
  width: 32px;
}
.project_details .table2 .need .fileList_ {
  position: relative;
  width: 64px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.project_details .table2 .need .fileList_ span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.project_details .table2 .need .fileList_:hover .shade {
  display: flex;
}
.project_details .table2 .need .fileList_ .shade {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.5;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}
.project_details .table2 .need .fileList_ .shade i {
  color: white;
  font-size: 32px;
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
.project_details .add_box {
  height: 100%;
  box-sizing: border-box;
  padding: 36px 0;
  /* display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between; */
}
.project_details .add_box .parent_task {
  width: 100%;
}
.project_details .add_box > .el-col {
  margin-bottom: 16px;
}
.project_details .add_box .title1 {
  font-weight: 600;
  font-size: 18px;
}
.project_details .add_box .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.project_details .add_box .upload .text {
  width: 146px;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
}
/* .project_details .add_box .new_name {
  height: 40px;
  line-height: 40px;
} */
.project_details .add_box .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project_details .add_box .batton button {
  width: 36%;
}
.project_details .add_box .department .el-radio {
  width: 50%;
  margin-bottom: 9px;
  margin-right: 0;
}
.project_details .add_box .presetTime > div {
  width: 100%;
}
.project_details .add_box .task_type > div {
  width: 100%;
}
.project_details .records_box {
  height: 100%;
}
.project_details .records {
  height: 100%;
}
.project_details .records .title {
  font-weight: bold;
  height: 100px;
  line-height: 100px;
}
.project_details .records .el-card {
  font-size: 16px;
}
.project_details .records .el-card:hover {
  background: #eee;
}
.project_details .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project_details .batton button {
  width: 36%;
}
.project_details .task_details {
  height: 100%;
  padding: 36px 36px 108px 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
  align-items: flex-start;
}
.project_details .task_details > .el-col {
  margin-bottom: 18px;
}
.project_details .task_details .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.project_details .task_details .title:nth-of-type(1) {
  text-align: left;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 18px;
}
.project_details .task_details .proFileList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.project_details .task_details .smname {
  width: 72px;
  text-align: center;
  font-size: 13px;
  color: rgb(162, 162, 162);
}
.project_details .task_details .smname div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.project_details .task_details .suggest {
  height: 172px;
}
.project_details .task_details .suggest .suggest_list {
  height: 48px;
  margin-bottom: 12px;
}
.project_details .task_details .suggest .suggest_list .pop,
.project_details .task_details .suggest .suggest_list .time {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: rgb(162, 162, 162);
}
.project_details .task_details .suggest .suggest_list .pop {
  text-align: right;
}
.project_details .task_details .suggest .suggest_list .content {
  color: #000;
  font-size: 16px;
}
.project_details .batton_pa {
  width: 100%;
  padding: 36px;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
}
.project_details .task_details >>> .el-select input {
  width: 108px;
  border: none;
  font-size: 16px;
  padding-left: 0;
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
.project_details >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.filenametext {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.elementUpload {
  width: 100%;
}
</style>
