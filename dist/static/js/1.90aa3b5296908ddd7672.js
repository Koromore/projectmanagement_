webpackJsonp([1],{"/XvD":function(t,e){},"0E0D":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("woOf"),i=s.n(a),l=s("bOdI"),n=s.n(l),o={name:"document",data:function(){return n()({userId:this.$store.state.user.userId,openHistory:!1,editFileName:"",clientId:"",serviceId:"",isUsual:"",name:"",loading:!1,tab1_act:"",tab2_act:"",clientIdList:[],client:"广汽本田",fileHistoryList:[],fileHistoryLoading:!1,tableData:[],editable:[],pageNum:1,totalnum:0,fileList:[],listProFile:[],uploadUrl:"",dialogFileVisible:!1,editData:"",openTaskVisible:!1,taskData:{},suggest_list:[],statusList:[{value:"1",label:"执行中"},{value:"2",label:"完成"}],statusListValue:"",drawer1:!1,listProFileResult:[],result:""},"taskData",[])},methods:{getAllClientAndBusiness:function(){this.$axios.post("/pmbs/client/getAllClientAndBusiness").then(this.getAllClientAndBusinessSuss)},getAllClientAndBusinessSuss:function(t){if(200==t.status){for(var e=t.data.data,s=[],a=0;a<e.length;a++){var i=e[a],l={value:i.clientId,label:i.clientName};s.push(l)}this.clientIdList=s}},handleRemoveResult:function(t){for(var e=t.response.data,s=this.listProFileResult,a=0;a<s.length;a++){s[a].localPath==e.path&&(s.splice(a,1),console.log("删除"))}this.listProFileResult=s},handleSuccessResult:function(t,e,s){if(0==t.errcode){var a=t.data,i=this.listProFileResult,l={proId:this.taskData.proId,taskId:this.taskData.taskId,fileId:"",updateUserId:this.userId,fileName:a.fileName,isPro:1,localPath:a.path,suffix:a.fileType};i.push(l),this.listProFileResult=i}},changeTaskDeil:function(){var t=this.taskData,e=this.listProFileResult,s=[];if(0==e.length)for(var a=0;a<t.taskfileList.length;a++){var i=t.taskfileList[a],l={fileId:i.fileId,fileName:i.fileName,suffix:i.suffix,localPath:i.localPath,proId:i.proId,taskId:i.taskId,updateUserId:this.userId};s.push(l)}else s=e;var n={proId:t.proId,taskId:t.taskId,status:this.statusListValue,overDesc:this.result,taskfileList:s};0!=t.taskfileList.length&&0!=e.length&&(n.oldFileId=fileId),this.taskSave(n)},taskSave:function(t){this.$axios.post("/pmbs/api/task/save",t).then(this.taskSaveSuss)},taskSaveSuss:function(t){200==t.status&&(this.$message({message:t.data.msg,type:"success"}),this.drawer1=!1,this.drawer5=!1,this.result="",this.listProFile=[],this.listProFileResult=[],this.getTaskfilePageList())},cancel:function(){this.drawer1=!1},handleSizeChange:function(){},handleCurrentChange:function(t){this.pageNum=t,this.getTaskfilePageList()},enterDetail:function(t,e){this.drawer1=!0,this.statusListValue=e.status.toString(),this.getTaskShow(e.taskId)},getTaskShow:function(t){var e="?id="+t;this.$axios.post("/pmbs/api/task/show"+e).then(this.getTaskShowSuss)},getTaskShowSuss:function(t){if(console.log(t),200==t.status){var e=t.data;this.taskData=e,this.suggest_list=e.feedbackList}},fileRemove:function(){this.dialogFileVisible=!1},fileUpload:function(){var t=this,e={proId:this.editData.proId,taskId:this.editData.taskId,updateUserId:this.editData.updateUserId,clientName:this.editData.clientName,proName:this.editData.proName,realName:this.editData.realName,taskName:this.editData.taskName,oldFileId:this.editData.fileId.toString()};this.$axios.post("/pmbs/api/taskfile/importupdate",i()(e,this.listProFile[0])).then(function(e){console.log(e),t.dialogFileVisible=!1})},handleExceed:function(t,e){this.$message({message:"只能重新上传一个文件！",type:"warning"})},handleRemove:function(t){for(var e=t.response.data,s=this.listProFile,a=0;a<s.length;a++){s[a].localPath==e.path&&s.splice(a,1)}this.listProFile=s},handleSuccess:function(t,e,s){if(0==t.errcode){var a=t.data,i=this.listProFile,l={fileName:a.fileName,localPath:a.path,suffix:a.fileType};i.push(l),this.listProFile=i}},tab1_change:function(t,e){this.tab1_act==t?(this.tab1_act="",this.serviceId=""):(this.tab1_act=t,this.serviceId=e)},tab2_change:function(t,e){this.tab2_act==t?(this.tab2_act="",this.isUsual=""):(this.tab2_act=t,this.isUsual=e)},searchHandle:function(){this.getTaskfilePageList()},tableRowClassName:function(t){var e=t.row,s=t.rowIndex;e.index=s},rowClick:function(t,e,s){this.editable=new Array(this.tableData.length)},cellSave:function(t,e){var s=this;this.$axios.post("/pmbs/api/taskfile/updataTaskFileByFileId",{fileId:e.fileId,fileName:this.editFileName}).then(function(t){e.fileName=s.editFileName,s.editable=new Array(s.tableData.length)})},changeNum:function(t,e){this.editable=new Array(this.tableData.length),this.editable[t]=!0,this.saveItem=this.tableData[t],this.$set(this.editable,t,!0),this.$nextTick(function(){document.getElementsByClassName("editRemarkInput")[0].children[0].focus()}),this.editFileName=e.fileName},upload2:function(t,e){this.fileList=[],this.listProFile=[],this.editData=e,this.dialogFileVisible=!0},download:function(t){var e=t.localPath,s=document.createElement("a");s.download="",s.setAttribute("href","http://218.106.254.122:8083/pmbs/"+e),s.click()},lookHistory:function(t,e){var s=this;this.openHistory=!0;var a=e.fileId;this.fileHistoryLoading||(this.fileHistoryLoading=!0,this.$axios.post("/pmbs/api/taskfile/getTaskfileByEdition?fileId="+a,{}).then(function(t){s.fileHistoryLoading=!1,t.data&&0!=t.data.length?s.fileHistoryList=t.data:console.log("暂无数据")}).catch(function(){s.fileHistoryLoading=!1}))},getTaskfilePageList:function(t){if(!this.loading){this.loading=!0;var e={userid:this.userId,pageNum:this.pageNum,pageSize:10,clientId:this.clientId,serviceId:this.serviceId,isUsual:this.isUsual,name:this.name};this.$axios.post("/pmbs/api/taskfile/getTaskfilePageList",e).then(this.getTaskfilePageListSuss)}},getTaskfilePageListSuss:function(t){200==t.status&&(this.loading=!1,this.totalnum=t.data.totalRows,this.tableData=t.data.items)}},watch:{clientId:function(t,e){this.getTaskfilePageList()},serviceId:function(t,e){this.getTaskfilePageList()},isUsual:function(t,e){this.getTaskfilePageList()}},mounted:function(){this.getAllClientAndBusiness(),this.getTaskfilePageList();this.uploadUrl="/pmbs/file/upload?upType=0&demandType=0"}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"document task"},[s("div",[s("el-row",[s("el-col",{staticClass:"top",attrs:{span:24}},[s("el-col",{attrs:{span:5}},[s("el-col",{staticClass:"title",attrs:{span:4}},[t._v("客户")]),t._v(" "),s("el-col",{attrs:{span:20}},[s("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:t.clientId,callback:function(e){t.clientId=e},expression:"clientId"}},t._l(t.clientIdList,function(t){return s("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t._v(" "),s("el-col",{staticClass:"tab tab1",attrs:{span:6}},[s("el-button-group",[s("el-button",{class:["1"==t.tab1_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab1_change(1,22)}}},[t._v("    官网    ")]),t._v(" "),s("el-button",{class:["2"==t.tab1_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab1_change(2,18)}}},[t._v("    口碑    ")]),t._v(" "),s("el-button",{class:["3"==t.tab1_act?"act":""],staticStyle:{"border-left":"0"},attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab1_change(3,17)}}},[t._v("数字营销")])],1)],1),t._v(" "),s("el-col",{staticClass:"tab tab2",attrs:{span:4}},[s("el-button-group",[s("el-button",{class:["1"==t.tab2_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab2_change(1,1)}}},[t._v("    专项    ")]),t._v(" "),s("el-button",{class:["2"==t.tab2_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab2_change(2,0)}}},[t._v("    日常    ")])],1)],1),t._v(" "),s("el-col",{staticClass:"tab tab3",attrs:{span:8}},[s("el-input",{staticClass:"sousuo",attrs:{placeholder:"搜索",size:"small"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}},[s("el-button",{attrs:{slot:"append",size:"small",icon:"el-icon-search"},on:{click:t.searchHandle},slot:"append"})],1)],1)],1)],1)],1),t._v(" "),s("div",{staticClass:"table-main"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"default-sort":{prop:"date",order:"descending"},"row-class-name":t.tableRowClassName,"header-cell-style":{background:"rgb(236, 235, 235)",color:"#000"},"row-style":{height:"57px"}},on:{"row-click":t.rowClick}},[s("el-table-column",{attrs:{label:"文档"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{on:{click:function(s){return s.stopPropagation(),t.changeNum(e.$index,e.row)}}},[t.editable[e.$index]?s("div",[s("el-input",{staticClass:"editRemarkInput",attrs:{size:"mini"},model:{value:t.editFileName,callback:function(e){t.editFileName=e},expression:"editFileName"}},[s("el-button",{attrs:{slot:"append",type:"primary",size:"mini"},on:{click:function(s){return s.stopPropagation(),t.cellSave(e.$index,e.row)}},slot:"append"},[t._v("确认")])],1)],1):s("div",["doc"==e.row.suffix||"docx"==e.row.suffix?s("img",{attrs:{src:"static/images/document/word.png",width:"16",alt:"",srcset:""}}):"xls"==e.row.suffix||"xlsx"==e.row.suffix?s("img",{attrs:{src:"static/images/document/excle.png",width:"16",alt:"",srcset:""}}):"ppt"==e.row.suffix||"pptx"==e.row.suffix?s("img",{attrs:{src:"static/images/document/ppt.png",width:"16",alt:"",srcset:""}}):s("img",{attrs:{src:"static/images/document/other.png",width:"16",alt:"",srcset:""}}),t._v(" "),s("span",[t._v(t._s(e.row.fileName))])])])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"clientName",label:"客户"}}),t._v(" "),s("el-table-column",{attrs:{prop:"proName",label:"项目"}}),t._v(" "),s("el-table-column",{attrs:{prop:"taskName",label:"任务"}}),t._v(" "),s("el-table-column",{attrs:{prop:"updateTime",label:"更新时间",sortable:"",width:"180"}}),t._v(" "),s("el-table-column",{attrs:{prop:"realName",label:"更新人",width:"180"}}),t._v(" "),s("el-table-column",{attrs:{label:"操作",width:"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"mini",icon:"el-icon-upload2"},on:{click:function(s){return t.upload2(e.$index,e.row)}}}),t._v(" "),s("el-button",{attrs:{size:"mini",icon:"el-icon-download"},on:{click:function(s){return t.download(e.row)}}}),t._v(" "),s("el-button",{attrs:{size:"mini",icon:"el-icon-share"},on:{click:function(s){return t.enterDetail(e.$index,e.row)}}}),t._v(" "),s("el-button",{attrs:{size:"mini",icon:"el-icon-time"},on:{click:function(s){return t.lookHistory(e.$index,e.row)}}})]}}])})],1),t._v(" "),s("div",{staticClass:"paging"},[s("div",{staticClass:"block"},[s("el-pagination",{attrs:{"current-page":t.pageNum,layout:"total, prev, pager, next",total:t.totalnum,background:""},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])],1),t._v(" "),s("el-drawer",{attrs:{title:"历史文档",visible:t.openHistory,"with-header":!1},on:{"update:visible":function(e){t.openHistory=e}}},[s("el-scrollbar",[s("div",{staticClass:"history-main"},[s("div",{staticClass:"title"},[t._v("历史")]),t._v(" "),s("el-timeline",{directives:[{name:"loading",rawName:"v-loading",value:t.fileHistoryLoading,expression:"fileHistoryLoading"}]},t._l(t.fileHistoryList,function(e){return s("el-timeline-item",{key:e.fileId,attrs:{timestamp:e.updateTime,placement:"top"}},[s("el-card",[s("h4",[t._v("更新人："+t._s(e.realName))]),t._v(" "),s("p",{staticClass:"fileName"},["doc"==e.suffix||"docx"==e.suffix?s("img",{attrs:{src:"static/images/document/word.png",width:"16",alt:"",srcset:""}}):"xls"==e.suffix||"xlsx"==e.suffix?s("img",{attrs:{src:"static/images/document/excle.png",width:"16",alt:"",srcset:""}}):"ppt"==e.suffix||"pptx"==e.suffix?s("img",{attrs:{src:"static/images/document/ppt.png",width:"16",alt:"",srcset:""}}):s("img",{attrs:{src:"static/images/document/other.png",width:"16",alt:"",srcset:""}}),t._v(" "),s("span",[t._v(t._s(e.fileName))])]),t._v(" "),s("p",[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){return t.download(e)}}},[t._v("\n                  下载\n                  "),s("i",{staticClass:"el-icon-download el-icon--right"})])],1)])],1)}),1),t._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:0==t.fileHistoryList.length,expression:"fileHistoryList.length==0"}]},[t._v("暂无历史数据")])],1)])],1),t._v(" "),s("el-drawer",{attrs:{title:"任务",visible:t.drawer1,"with-header":!1},on:{"update:visible":function(e){t.drawer1=e}}},[s("el-scrollbar",{staticStyle:{height:"100%"}},[s("el-row",{staticClass:"task_details"},[s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("执行部门：")]),t._v(" "),s("el-col",{attrs:{span:18}},[t._v(t._s(t.taskData.deptName))]),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("任务类型：")]),t._v(" "),s("el-col",{attrs:{span:18}},[t._v(t._s(t.taskData.typeName))]),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("执行人：")]),t._v(" "),s("el-col",{attrs:{span:18}},[t._v(t._s(t.taskData.doUserName))]),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("状态：")]),t._v(" "),s("el-col",{attrs:{span:18}},[s("el-select",{class:{state_color1:1==t.statusListValue,state_color2:2==t.statusListValue,state_color3:3==t.statusListValue,state_color4:4==t.statusListValue},attrs:{size:"mini",placeholder:"请选择"},model:{value:t.statusListValue,callback:function(e){t.statusListValue=e},expression:"statusListValue"}},t._l(t.statusList,function(t){return s("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("预计时间：")]),t._v(" "),s("el-col",{attrs:{span:18}},[t._v(t._s(t.taskData.expertTime))]),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("完成时间：")]),t._v(" "),s("el-col",{attrs:{span:18}},[t._v(t._s(t.taskData.overTime))]),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("需求：")]),t._v(" "),s("el-col",{attrs:{span:18}},[t._v(t._s(t.taskData.remark))]),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("附件：")]),t._v(" "),s("el-col",{attrs:{span:18}},t._l(t.taskData.proFileList,function(e){return s("div",{key:e.index,staticClass:"smname"},["doc"==e.suffix||"docx"==e.suffix?s("img",{attrs:{src:"static/images/document/word.png",width:"24",alt:"",srcset:""}}):"xls"==e.suffix||"xlsx"==e.suffix?s("img",{attrs:{src:"static/images/document/excle.png",width:"24",alt:"",srcset:""}}):"ppt"==e.suffix||"pptx"==e.suffix?s("img",{attrs:{src:"static/images/document/ppt.png",width:"24",alt:"",srcset:""}}):s("img",{attrs:{src:"static/images/document/other.png",width:"24",alt:"",srcset:""}}),t._v(" "),s("div",[t._v(t._s(e.fileName))])])}),0),t._v(" "),s("el-divider",{attrs:{"content-position":"right"}}),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("完成结果：")]),t._v(" "),s("el-col",{attrs:{span:18}},[s("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入内容"},model:{value:t.result,callback:function(e){t.result=e},expression:"result"}},[t._v("完成结果：描述")])],1),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("附件：")]),t._v(" "),s("el-col",{attrs:{span:18}},[s("el-upload",{attrs:{action:"/pmbs/file/upload?upType=1&demandType=1","list-type":"picture-card","on-remove":t.handleRemoveResult,"on-success":t.handleSuccessResult}},[s("i",{staticClass:"el-icon-plus"})])],1),t._v(" "),s("el-divider",{attrs:{"content-position":"right"}}),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("反馈意见：")]),t._v(" "),s("el-col",{staticClass:"suggest",attrs:{span:18}},[s("el-scrollbar",{staticStyle:{height:"100%"}},t._l(t.suggest_list,function(e){return s("el-col",{key:e.index,staticClass:"suggest_list",attrs:{span:23}},[s("el-col",{staticClass:"time",attrs:{span:12}},[t._v(t._s(e.updateTime))]),t._v(" "),s("el-col",{staticClass:"pop",attrs:{span:12}},[t._v(t._s(e.deptName)+"-"+t._s(e.feedbackUserName))]),t._v(" "),s("el-col",{staticClass:"content",attrs:{span:24}},[t._v(t._s(e.feedback))])],1)}),1)],1)],1)],1),t._v(" "),s("el-row",{staticClass:"batton_pa"},[s("el-col",{staticClass:"batton",attrs:{span:12,offset:7}},[s("el-button",{attrs:{size:"small",type:"info"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.changeTaskDeil}},[t._v("完成")])],1)],1)],1),t._v(" "),s("el-dialog",{attrs:{title:"修改附件",visible:t.dialogFileVisible},on:{"update:visible":function(e){t.dialogFileVisible=e}}},[s("div",[s("el-upload",{attrs:{action:t.uploadUrl,"list-type":"picture-card","show-file-list":!1,"on-remove":t.handleRemove,"on-success":t.handleSuccess,"file-list":t.fileList,limit:1,"on-exceed":t.handleExceed}},[0!=t.listProFile.length?s("div",{staticClass:"avatar"},["jpg"==t.listProFile[0].suffix||"png"==t.listProFile[0].suffix||"gif"==t.listProFile[0].suffix?s("img",{attrs:{src:"http://218.106.254.122:8083/pmbs/"+t.listProFile[0].localPath,alt:""}}):t._e()]):s("i",{staticClass:"el-icon-plus"})])],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:t.fileRemove}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.fileUpload}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var c=s("VU/8")(o,r,!1,function(t){s("/XvD")},"data-v-7daa4802",null);e.default=c.exports}});