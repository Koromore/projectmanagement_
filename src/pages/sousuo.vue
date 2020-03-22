<template>
  <div>
    TABLE `business` (
    `businessId` '业务ID',
    `businessName` '业务名',
    `createTime` '创建时间',
    `updateTime` '更新时间',
    `deleteFlag` '删除标记',
    )
    CREATE TABLE `client` (
    `clientId` '客户ID',
    `clientName` '客户名称',
    `createTime` '创建时间',
    `updateTime` '更新时间',
    `deleteFlag` '删除标记',
    ) ;
    TABLE `client_to_business` (
    `clientId` '客户ID',
    `businessId` '业务ID',
    )
    TABLE `depType` (
    `typeId` '类型ID',
    `typeName` '类型名称',
    `deptId` '所属部门',
    `createTime` '创建时间',
    `updateTime` '更新时间',
    `deleteFlag` '删除标记'
    )
    CREATE TABLE `department` (
    `deptId`
    `deptName`
    `deptCode`
    `predeptId`
    `layer`
    `isSubNode`
    `principal`
    `isMaterial`
    `isPlatform` '(1:平台部门,2:创收执行部门)',
    `updateTime`
    `principalUserId`
    `deleteFlag` '是否删除(0:否,1:是)',
    `createTime`
    )
    TABLE `feedback` (
    `feedbackId` '反馈ID',
    `taskId` '所属客户ID，与task表对应',
    `initUserId` '任务发起人，对应user表ID',
    `feedback` '反馈详情',
    `updateTime` '更新时间',
    `deleteFlag` '删除标识',
    )
    CREATE TABLE `permission` (
    `id` '权限ID',
    `token` '权限标识',
    `name` '权限名',
    `pid` '父节点ID',
    )
    TABLE `proFile` (
    `fileId` '文档ID',
    `fileName` '文档名称',
    `suffix` '文档后缀',
    `localPath` '本地路径',
    `ptId` '所属项目ID或者任务ID，与project和task对应',
    `isPro` '项目任务需求（0-项目需求，1-任务需求）',
    `updateTime` '更新时间',
    `deleteFlag` '删除标记'
    )
    CREATE TABLE `project` (
    `proId` '项目ID',
    `proName` '项目名',
    `clientId` '所属客户ID，与client表对应',
    `serviceId` '所属业务ID ，与bussiness表对应',
    `isUsual` '专项日常（0-日常，1-专项）',
    `initUserId` '项目发起人，对应user表ID',
    `manager` '项目经理，对应user表ID',
    `department` '参与部门ID，用逗号隔开',
    `knowUser` '知情人ID，用逗号隔开',
    `createTime` '创建时间',
    `updateTime` '更新时间',
    `status` '项目状态（1-进行中，2-审核中，3-完成，4-延期，5-延期完成）',
    `delayReason` '项目延期原因',
    `overTime` '项目完成时间',
    `expertTime` '预计完成时间',
    `remark` '需求',
    `deleteFlag` '删除标记',
    )
    CREATE TABLE `role` (
    `roleId`T '角色ID',
    `roleName` '角色名称',
    `updateTime` '更新时间',
    `roleCode` '权限标识',
    )
    CREATE TABLE `role_to_permission` (
    `rid` '角色ID',
    `pid` '权限ID',
    )
    CREATE TABLE `task` (
    `taskId` '任务ID',
    `taskName` '任务名',
    `proId` '所属项目ID，与project表对应',
    `faTask` '所属任务ID ，与task表对应',
    `initUserId` '任务发起人',
    `doUserId` '任务参与人',
    `deptId` '所属部门ID，与dept对应',
    `isIgnore` '是否忽略（0-否，1-是）',
    `typeId` '任务类型ID，与depType表对应',
    `remark` '任务需求',
    `updateTime` '更新时间',
    `status` '任务状态（1-进行中，2-审核中，3-完成，4-延期，5-延期完成）',
    `overUserId` '任务完成人，与user表对应',
    `overDesc` '完成结果',
    `overTime` '完成时间',
    `expertTime` '预计完成时间',
    `deleteFlag` '删除标识',
    )
    CREATE TABLE `taskFile` (
    `fileId` '文档ID',
    `fileName` '文档名',
    `suffix` '文档后缀',
    `localPath` '本地路径',
    `proId` '所属项目ID',
    `taskId` '所属任务ID',
    `updateUserId` '文档更新人，与user表对应',
    `isHistory` '是否历史版本（0-否，1-是）',
    `nowEdition` '当前版本ID，对应文档ID',
    `createTime` '创建时间',
    `updateTime` '更新时间',
    `deleteFlag` '删除标记'
    )
    CREATE TABLE `users` (
    `userId` '用户ID',
    `userName` '用户名',
    `userPwd` '密码',
    `realName` '真是姓名',
    `deptId` '部门ID,deptId对应department表中的deptId',
    `deptName` '部门名称',
    `postId` '岗位ID,postId对应post表中的postId',
    `email` '邮箱',
    `QQ` 'QQ',
    `createTime` '创建时间',
    `wxuserId` '企业微信ID',
    `postName` '岗位名称',
    `roleId` '角色名称',
    `sex` '性别,0:男(默) 1:女',
    `updateTime` '更新时间',
    `deleteFlag` '删除标记',
    )
    {
    clientId: 37,
    clientName: "广汽",
    businessList: [
    {
    businessName: '官网',
    businessId: 12
    },
    {
    businessName: '数字营销',
    businessId: 2
    },
    ]
    }
    {
    clientId: "",
    clientName: "测试009",
    businessList: [
    {
    businessName: '官网',
    businessId: 12
    },
    {
    businessName: '数字营销',
    businessId: 2
    },
    ]
    }
  </div>
</template>

<script>
export default {
  name: 'sousuo',
  data() {},
  // 方法
  methods: {
    test() {
      let obj = {
        business: {
          businessId: 0,
          businessName: 'string',
          createTime: {
            chronology: {
              calendarType: 'string',
              id: 'string'
            },
            dayOfMonth: 0,
            dayOfWeek: 'MONDAY',
            dayOfYear: 0,
            hour: 0,
            minute: 0,
            month: 'JANUARY',
            monthValue: 0,
            nano: 0,
            second: 0,
            year: 0
          },
          deleteFlag: true,
          listProject: [
            {
              businessName: 'string',
              clientId: 0,
              clientName: 'string',
              createTime: '2020-03-21T08:37:45.635Z',
              delayReason: 'string',
              deleteFlag: true,
              department: 'string',
              expertTime: '2020-03-21T08:37:45.635Z',
              initUserId: 0,
              isPro: 0,
              isUsual: true,
              knowUser: 'string',
              listDept: [
                {
                  createTime: '2020-03-21T08:37:45.635Z',
                  deleteFlag: true,
                  deptCode: 'string',
                  deptId: 0,
                  deptName: 'string',
                  ids: [0],
                  isMaterial: true,
                  isPlatform: true,
                  isSubNode: true,
                  layer: 0,
                  predeptId: 0,
                  principal: 'string',
                  principalUserId: 0,
                  updateTime: '2020-03-21T08:37:45.635Z'
                }
              ],
              listKnowUser: [
                {
                  captcha: 'string',
                  deleteFlag: true,
                  deptId: 0,
                  deptName: 'string',
                  headImg: 'string',
                  ids: [0],
                  loginName: 'string',
                  password: 'string',
                  postId: 0,
                  postName: 'string',
                  realName: 'string',
                  roleId: 0,
                  roleList: [
                    {
                      id: 0,
                      name: 'string',
                      permissionSet: ['string'],
                      permissions: [
                        {
                          childPerms: 'string',
                          id: 0,
                          name: 'string',
                          permList: [{}],
                          pid: 0,
                          token: 'string'
                        }
                      ],
                      pids: 'string',
                      token: 'string'
                    }
                  ],
                  updateTime: {
                    chronology: {
                      calendarType: 'string',
                      id: 'string'
                    },
                    dayOfMonth: 0,
                    dayOfWeek: 'MONDAY',
                    dayOfYear: 0,
                    hour: 0,
                    minute: 0,
                    month: 'JANUARY',
                    monthValue: 0,
                    nano: 0,
                    second: 0,
                    year: 0
                  },
                  userId: 0,
                  userName: 'string'
                }
              ],
              listProFile: [
                {
                  createTime: '2020-03-21T08:37:45.635Z',
                  deleteFlag: true,
                  fileId: 0,
                  fileName: 'string',
                  isPro: true,
                  localPath: 'string',
                  ptId: 0,
                  suffix: 'string',
                  updateTime: '2020-03-21T08:37:45.635Z'
                }
              ],
              listTask: [
                {
                  createTime: {
                    chronology: {
                      calendarType: 'string',
                      id: 'string'
                    },
                    dayOfMonth: 0,
                    dayOfWeek: 'MONDAY',
                    dayOfYear: 0,
                    hour: 0,
                    minute: 0,
                    month: 'JANUARY',
                    monthValue: 0,
                    nano: 0,
                    second: 0,
                    year: 0
                  },
                  deleteFlag: true,
                  deptId: 0,
                  deptName: 'string',
                  doUserId: 0,
                  doUserName: 'string',
                  expertTime: {
                    chronology: {
                      calendarType: 'string',
                      id: 'string'
                    },
                    dayOfMonth: 0,
                    dayOfWeek: 'MONDAY',
                    dayOfYear: 0,
                    era: {
                      value: 0
                    },
                    leapYear: true,
                    month: 0,
                    monthValue: 0,
                    year: 0
                  },
                  faTask: 0,
                  faTaskName: 'string',
                  feedbackList: [
                    {
                      deleteFlag: true,
                      deptName: 'string',
                      feedback: 'string',
                      feedbackFileList: [
                        {
                          createTime: '2020-03-21T08:37:45.635Z',
                          deleteFlag: true,
                          feedbackId: 0,
                          fileId: 0,
                          fileName: 'string',
                          localPath: 'string',
                          suffix: 'string',
                          taskId: 0,
                          updateTime: '2020-03-21T08:37:45.635Z'
                        }
                      ],
                      feedbackId: 0,
                      feedbackUserName: 'string',
                      initUserId: 0,
                      moreTaskId: 'string',
                      proId: 0,
                      taskId: 0,
                      updateTime: '2020-03-21T08:37:45.636Z'
                    }
                  ],
                  ifUpdateStatus: true,
                  ignore: true,
                  initUserId: 0,
                  initUserName: 'string',
                  isIgnore: true,
                  listOaUser: [
                    {
                      companyId: 0,
                      companyName: 'string',
                      deleteFlag: true,
                      deptId: 0,
                      deptName: 'string',
                      email: 'string',
                      headPortrait: 'string',
                      isPass: true,
                      isSubNode: true,
                      jobDate: {
                        date: 0,
                        day: 0,
                        hours: 0,
                        minutes: 0,
                        month: 0,
                        nanos: 0,
                        seconds: 0,
                        time: 0,
                        timezoneOffset: 0,
                        year: 0
                      },
                      kqNumber: 'string',
                      layer: 0,
                      mail: 'string',
                      postId: 0,
                      postName: 'string',
                      qq: 'string',
                      realName: 'string',
                      sex: true,
                      telephone: 'string',
                      unionId: 'string',
                      userId: 0,
                      userName: 'string',
                      userPwd: 'string'
                    }
                  ],
                  listUserId: [0],
                  overDesc: 'string',
                  overTime: {
                    chronology: {
                      calendarType: 'string',
                      id: 'string'
                    },
                    dayOfMonth: 0,
                    dayOfWeek: 'MONDAY',
                    dayOfYear: 0,
                    hour: 0,
                    minute: 0,
                    month: 'JANUARY',
                    monthValue: 0,
                    nano: 0,
                    second: 0,
                    year: 0
                  },
                  overUserId: 0,
                  proFileList: [
                    {
                      createTime: '2020-03-21T08:37:45.636Z',
                      deleteFlag: true,
                      fileId: 0,
                      fileName: 'string',
                      isPro: true,
                      localPath: 'string',
                      ptId: 0,
                      suffix: 'string',
                      updateTime: '2020-03-21T08:37:45.636Z'
                    }
                  ],
                  proId: 0,
                  proName: 'string',
                  remark: 'string',
                  status: 0,
                  taskId: 0,
                  taskName: 'string',
                  taskfileList: [
                    {
                      clientId: 0,
                      clientName: 'string',
                      createTime: '2020-03-21T08:37:45.636Z',
                      deleteFlag: true,
                      doUserId: 0,
                      fileId: 'string',
                      fileName: 'string',
                      initUserId: 0,
                      isHistory: 0,
                      listUserId: [0],
                      localPath: 'string',
                      nowEdition: 'string',
                      oldFileId: 'string',
                      proId: 0,
                      proName: 'string',
                      realName: 'string',
                      status: 0,
                      suffix: 'string',
                      taskId: 0,
                      taskName: 'string',
                      updateTime: '2020-03-21T08:37:45.636Z',
                      updateUserId: 0,
                      userName: 'string'
                    }
                  ],
                  typeId: 0,
                  typeName: 'string',
                  updateTime: {
                    chronology: {
                      calendarType: 'string',
                      id: 'string'
                    },
                    dayOfMonth: 0,
                    dayOfWeek: 'MONDAY',
                    dayOfYear: 0,
                    hour: 0,
                    minute: 0,
                    month: 'JANUARY',
                    monthValue: 0,
                    nano: 0,
                    second: 0,
                    year: 0
                  }
                }
              ],
              listUserId: [0],
              manager: 0,
              overTime: '2020-03-21T08:37:45.637Z',
              pasprojectId: 0,
              proId: 0,
              proName: 'string',
              projectType: 'string',
              realName: 'string',
              remark: 'string',
              serviceId: 0,
              status: 0,
              updateTime: '2020-03-21T08:37:45.637Z',
              usual: true
            }
          ],
          updateTime: {
            chronology: {
              calendarType: 'string',
              id: 'string'
            },
            dayOfMonth: 0,
            dayOfWeek: 'MONDAY',
            dayOfYear: 0,
            hour: 0,
            minute: 0,
            month: 'JANUARY',
            monthValue: 0,
            nano: 0,
            second: 0,
            year: 0
          }
        },
        ids: 'string',
        limit: 0,
        offset: 0,
        orderBys: 'string',
        pageNum: 0,
        pageSize: 0
      }

      // typeName typeId
    }
  },
  // 钩子函数
  mounted() {}
}
</script>