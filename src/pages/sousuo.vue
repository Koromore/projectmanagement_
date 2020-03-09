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
        data: {
          businessName: null,
          clientId: 55,
          clientName: null,
          createTime: '2020-03-09 18:35:05',
          deleteFlag: null,
          department: '41,150,27',
          expertTime: '2020-03-13 13:00:00',
          initUserId: 527,
          isPro: null,
          isUsual: false,
          knowUser: '266,24',
          listDept: null,
          listKnowUser: null,
          listProFile: [
            {
              deleteFlag: null,
              fileId: null,
              fileName: 'C7 二层平面图',
              isPro: false,
              localPath: 'uploadtemp/project/demand/1583750035332.pdf',
              ptId: null,
              suffix: 'pdf',
              updateTime: null
            }
          ],
          listTask: null,
          listUserId: null,
          manager: null,
          overTime: null,
          proId: 45,
          proName: '广本车主周3月活动-编辑4',
          projectType: null,
          realName: null,
          remark:
            '需求背景\n1.广本飞度社区运营，长期无法达到客户期望；\n2.由销售部长直接提出，进行飞度社区增粉、提升认证车主数量为核心指标的专项方案策划。\n\n方案结构\n1.平台现状分析（事实数据，反应注册人数、认证人数）\n2.指出运营现状的问题（根据事实数据，指出问题）\n3.行业环境及趋势或优秀案例及效果（大家一般怎么做）\n4.提出我们的解决施策（我们怎么做）\n5.效果量化（说明整体KPI，明确阶段KPI）\n6.创意实施（具体创意细化）\n7.预算及KPI\n\n其他补充\n1.重点创意必须联系设计制作创意DEMO\n2.客户重点提及 各地车友会的资源利用，创意构思时要重点考虑。\n3.网易云音乐需明确合作资源\n4.竞争情报：三选一，对手为XXXX,XXXXX',
          serviceId: 45,
          status: 1,
          updateTime: null,
          usual: false
        },
        errcode: 0,
        msg: 'success'
      }

      // typeName typeId
    }
  },
  // 钩子函数
  mounted() {}
}
</script>