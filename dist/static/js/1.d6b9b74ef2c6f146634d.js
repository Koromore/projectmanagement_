webpackJsonp([1],{"58Tz":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("bOdI"),l=s.n(a),i={name:"project",data:function(){var t;return t={proId:"",loading:!1,clientIdList:[],clientId:"",serviceId:"",isUsual:"",status:"",drawer1:!1,drawer2:!1,drawer3:!1,drawer1_name:"",drawer3_name:"任务名称",autofocus:!0,loginState:!0,project_style:"",new_project:{new_name:"",business_type:[],radio1:"1",presetTime:"",demand:"",radio2:"1",manager:"",checkList:[],dynamicTags:["标签一","标签二","标签三","标签四"]},add_list:"",checkList:[],business_type_list:[],deptList:[],userList:[],projectData:{},dialogImageUrl:"",dialogVisible:!1,disabled:!1},l()(t,"business_type_list",[{value:"业务类型1",label:"业务类型1",children:[{value:"客户1",label:"客户1"},{value:"客户1",label:"客户1"}]},{value:"业务类型2",label:"业务类型2",children:[{value:"客户1",label:"客户1"},{value:"客户2",label:"客户2"}]},{value:"业务类型3",label:"业务类型3",children:[{value:"客户1",label:"客户1"},{value:"客户2",label:"客户2"}]}]),l()(t,"client_list",[{value:"广汽本田",label:"广汽本田"},{value:"吉利",label:"吉利"},{value:"沃尔沃",label:"沃尔沃"}]),l()(t,"client","广汽本田"),l()(t,"projectListOriginate",[]),l()(t,"initiateProjectListTota",[]),l()(t,"projectListJoin",[]),l()(t,"participateProjectListTota",[]),l()(t,"tabs_activity",1),l()(t,"table_show",!0),l()(t,"tab1_act",""),l()(t,"tab2_act",""),l()(t,"feedbackObj",{feedbackId:"",taskId:"",initUserId:""}),l()(t,"feedbackContent",""),l()(t,"projectTaskLisInit",[]),l()(t,"deptNameList",[]),l()(t,"taskNameList",[]),l()(t,"taskNameListShow",[]),l()(t,"checkListDept",[]),l()(t,"checkListTask",[]),l()(t,"add_list",""),l()(t,"checkList1",[]),l()(t,"dialogImageUrl",""),l()(t,"dialogVisible",!1),l()(t,"disabled",!1),l()(t,"result",""),t},watch:{checkListDept:function(t,e){for(var s=[],a=this.checkListDept,l=this.taskNameList,i=0;i<a.length;i++){for(var o=a[i],n=[],r=0;r<l.length;r++){var c=l[r],p={};c.deptId==o&&(p=c,n.push(p))}s=s.concat(n)}this.taskNameListShow=s},clientId:function(t,e){this.findProjectList()},serviceId:function(t,e){this.findProjectList()},isUsual:function(t,e){this.findProjectList()},status:function(t,e){this.findProjectList()}},methods:{formatData2:function(t){var e=t.getFullYear(),s=t.getMonth()+1,a=t.getDate(),l=t.getHours(),i=t.getMinutes(),o=t.getSeconds();return s>=1&&s<=9&&(s="0"+s),a>=0&&a<=9&&(a="0"+a),l>=0&&l<=9&&(l="0"+l),i>=0&&i<=9&&(i="0"+i),o>=0&&o<=9&&(o="0"+o),e+"-"+s+"-"+a+" "+l+":"+i+":"+o},listUniq:function(t,e){for(var s=[t[0]],a=1;a<t.length;a++){for(var l=t[a],i=!1,o=0;o<s.length;o++)if(l[e]==s[o][e]){i=!0;break}i||s.push(l)}return s},getAllClientAndBusiness:function(){this.$axios.post("/pmbs/client/getAllClientAndBusiness").then(this.getAllClientAndBusinessSuss)},getAllClientAndBusinessSuss:function(t){if(200==t.status){var e=t.data.data,s=[];console.log(e);for(var a=0;a<e.length;a++){var l=e[a],i={value:l.clientId,label:l.clientName};s.push(i)}this.clientIdList=s}},handleChange:function(t){console.log(t),console.log(this.value)},showInput:function(){var t=this.new_project.dynamicTags,e=this.add_list,s=this.userList,a=!0;if(""!=e){for(var l="",i=0;i<s.length;i++){var o=s[i];o.value==e&&(l=o.label)}for(var n=0;n<t.length;n++){t[n]==l&&(this.messageWarning("请勿重复添加"),a=!1)}a&&(t.push(l),this.add_list="")}else""==e&&this.messageWarning("信息为空")},handleClose:function(t){this.new_project.dynamicTags.splice(this.new_project.dynamicTags.indexOf(t),1)},handleRemove:function(t){console.log(t)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handleDownload:function(t){console.log(t)},testtest:function(t,e,s){console.log(t),console.log(e),console.log(s)},widthheight:function(){window.innerWidth,window.innerHeight},tab1_change:function(t,e){this.serviceId==e?(this.tab1_act="",this.serviceId=""):1==t?(this.tab1_act=1,this.serviceId=e):2==t?(this.tab1_act=2,this.serviceId=e):3==t&&(this.tab1_act=3,this.serviceId=e)},tab2_change:function(t,e){console.log(t),console.log(e),this.isUsual===e?(this.tab2_act="",this.isUsual=""):1==t?(this.tab2_act=1,this.isUsual=e):2==t&&(this.tab2_act=2,this.isUsual=e)},tab3_change:function(t){var e=this.status;this.status=e==t?"":t},table_tab:function(t){1==t?(this.tabs_activity=1,this.table_show=!0):2==t&&(this.tabs_activity=2,this.table_show=!1)},feedback:function(t,e){this.drawer1=!0,this.drawer1_name=e,this.proId=t,this.getProjectTaskListInit(t)},aredact:function(t){console.log("编辑"+t),this.$emit("getData",t)},achieve:function(t,e,s){if(4==s)this.drawer3=!0,this.drawer3_name=e;else{var a={proId:t,status:3,overTime:this.formatData2(new Date)};this.getProjectSave(a)}},getProjectSave:function(t){this.$axios.post("/pmbs/api/project/save",t).then(this.getProjectSaveSuss)},getProjectSaveSuss:function(t){console.log(t);var e=t.data.data;200==t.status&&3==e.status&&(this.messageWin("项目已完成"),this.getProjectListAjax())},expurgate:function(t){this.delProject(t)},getProjectTaskListInit:function(t){var e="?proId="+t;this.$axios.post("/pmbs/api/project/projectOfTask"+e).then(this.getProjectTaskListInitSuss)},getProjectTaskListInitSuss:function(t){if(console.log(t),200==t.status){var e=t.data.data;this.projectTaskLisInit=e;for(var s=[],a=[],l=0;l<e.length;l++){var i=e[l],o={deptId:i.deptId,deptName:i.deptName},n={deptId:i.deptId,deptName:i.deptName,taskId:i.taskId,taskName:i.taskName};a.push(n),s.push(o)}s=this.listUniq(s,"deptId"),this.deptNameList=s,this.taskNameList=a}},projectFeedback:function(){var t=new Date,e=this.checkListTask.join(","),s={feedback:this.feedbackContent,initUserId:128,proId:this.proId,moreTaskId:e,updateTime:t};this.$axios.post("/pmbs/api/project/projectFeedback",s).then(this.projectFeedbackSuss)},projectFeedbackSuss:function(t){console.log(t),200==t.status&&(this.messageWin("反馈成功"),this.drawer1=!1,this.feedbackContent="",this.taskFeedbackId="",this.getProjectListAjax())},delProject:function(t){var e="?projectId="+t;this.$axios.post("/pmbs/api/project/delProject"+e).then(this.delProjectSuss)},delProjectSuss:function(t){200==t.status&&(this.messageWin("项目删除成功"),this.getProjectListAjax())},pathPrpjectDetails:function(t,e){this.$router.push({path:"/home/components/project_details",query:{id:t,type:e}})},findProjectList:function(){var t=this.clientId,e=this.serviceId,s=this.isUsual,a=this.status,l="&clientId="+t,i="&serviceId="+e,o="&isUsual="+s,n="&status="+a;""==t&&(l=""),""==e&&(i=""),""===s&&(o=""),""==a&&(n="");var r="?inituserid=128"+l+i+o+n;this.getProjectListAjax(r),this.getProjectUserjoinproject(r)},getProjectList:function(){this.getProjectListAjax("?inituserid=128"),this.getProjectUserjoinproject("?inituserid=128")},getProjectListAjax:function(t){this.loading=!0,this.$axios.post("/pmbs/api/project/listAjax"+t).then(this.getProjectListAjaxSuss)},getProjectListAjaxSuss:function(t){if(this.loading=!1,200==t.status){for(var e=t.data.data,s=0;s<e.length;s++){var a=e[s];a.unfintask=0;for(var l=0;l<a.listTask.length;l++){3!=a.listTask[l].status&&a.unfintask++}}this.projectListOriginate=e}},getProjectUserjoinproject:function(t){this.loading=!0,this.$axios.post("/pmbs/api/project/userjoinproject"+t).then(this.getProjectUserjoinprojectSuss)},getProjectUserjoinprojectSuss:function(t){if(this.loading=!1,200==t.status){var e=t.data.data;this.projectListJoin=e}},messageWin:function(t){this.$message({message:t,type:"success"})},messageWarning:function(t){this.$message({message:t,type:"warning"})},messageError:function(t){this.$message.error(t)}},mounted:function(){this.widthheight(),this.getAllClientAndBusiness(),this.getProjectList()}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"project",style:t.project_style},[s("el-row",[s("el-col",{staticClass:"top",attrs:{span:24}},[s("el-col",{attrs:{span:5}},[s("el-col",{staticClass:"title",attrs:{span:4}},[t._v("客户")]),t._v(" "),s("el-col",{attrs:{span:20}},[s("el-select",{attrs:{clearable:"",placeholder:"请选择",size:"small"},model:{value:t.clientId,callback:function(e){t.clientId=e},expression:"clientId"}},t._l(t.clientIdList,function(t){return s("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t._v(" "),s("el-col",{staticClass:"tab tab1",attrs:{span:6}},[s("el-button-group",[s("el-button",{class:["1"==t.tab1_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab1_change(1,22)}}},[t._v("    官网    ")]),t._v(" "),s("el-button",{class:["2"==t.tab1_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab1_change(2,18)}}},[t._v("    口碑    ")]),t._v(" "),s("el-button",{class:["3"==t.tab1_act?"act":""],staticStyle:{"border-left":"0"},attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab1_change(3,17)}}},[t._v("数字营销")])],1)],1),t._v(" "),s("el-col",{staticClass:"tab tab2",attrs:{span:4}},[s("el-button-group",[s("el-button",{class:["1"==t.tab2_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab2_change(1,1)}}},[t._v("    专项    ")]),t._v(" "),s("el-button",{class:["2"==t.tab2_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab2_change(2,0)}}},[t._v("    日常    ")])],1)],1),t._v(" "),s("el-col",{staticClass:"tab tab3",attrs:{span:8}},[s("el-button-group",[s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"新项目",placement:"bottom"}},[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.tab3_change(1)}}},[t._v("  1  ")])],1),t._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"延时",placement:"bottom"}},[s("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(e){return t.tab3_change(4)}}},[t._v("  2  ")])],1),t._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"审核中",placement:"bottom"}},[s("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(e){return t.tab3_change(2)}}},[t._v("  3  ")])],1),t._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"执行中",placement:"bottom"}},[s("el-button",{attrs:{type:"success",size:"small"},on:{click:function(e){return t.tab3_change(1)}}},[t._v("  4  ")])],1)],1)],1)],1),t._v(" "),s("el-col",{staticClass:"tabs",attrs:{span:24}},[s("div",{class:["1"==t.tabs_activity?"act":""],on:{click:function(e){return t.table_tab(1)}}},[t._v("我发起")]),t._v(" "),s("div",{class:["2"==t.tabs_activity?"act":""],on:{click:function(e){return t.table_tab(2)}}},[t._v("我参与")])]),t._v(" "),s("el-col",{directives:[{name:"show",rawName:"v-show",value:t.table_show,expression:"table_show"}],staticClass:"table table1",attrs:{span:24}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"filterTable",staticStyle:{width:"100%"},attrs:{data:t.projectListOriginate,"header-cell-style":{background:"rgb(236, 235, 235)",color:"#000"},"row-style":{height:"57px"}}},[s("el-table-column",{attrs:{prop:"proName",label:"名称"},scopedSlots:t._u([{key:"default",fn:function(e){return s("el-link",{nativeOn:{click:function(s){return t.pathPrpjectDetails(e.row.proId,0)}}},[t._v(t._s(e.row.proName))])}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?s("span",{staticClass:"state_color1"},[t._v("进行中")]):t._e(),t._v(" "),2==e.row.status?s("span",{staticClass:"state_color2"},[t._v("审核中")]):t._e(),t._v(" "),3==e.row.status?s("span",{staticClass:"state_color3"},[t._v("完成")]):t._e(),t._v(" "),4==e.row.status?s("span",{staticClass:"state_color4"},[t._v("延期")]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"num",label:"总任务数/待完成"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.listTask.length)+"/"+t._s(e.row.unfintask))]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"expertTime",label:"预计时间"}},[s("template",{slot:"header"},[t._v("\n            预计时间\n            "),s("i",{staticClass:"el-icon-sort"})])],2),t._v(" "),s("el-table-column",{attrs:{prop:"overTime",label:"完成时间"}},[s("template",{slot:"header"},[t._v("\n            完成时间\n            "),s("i",{staticClass:"el-icon-sort"})])],2),t._v(" "),s("el-table-column",{attrs:{prop:"realName",label:"下达人"}}),t._v(" "),s("el-table-column",{attrs:{prop:"tag",label:"操作",width:"180","filter-placement":"bottom-end"},scopedSlots:t._u([{key:"default",fn:function(e){return[2==e.row.status?s("el-button",{attrs:{slot:"reference",size:"small",type:"info"},on:{click:function(s){return t.feedback(e.row.proId,e.row.proName)}},slot:"reference"},[t._v("反馈")]):t._e(),t._v(" "),s("el-popconfirm",{attrs:{title:"确认执行此操作吗？"},on:{onConfirm:function(s){return t.achieve(e.row.proId,e.row.proName,e.row.status)}}},[2==e.row.status?s("el-button",{attrs:{slot:"reference",size:"small",type:"primary"},slot:"reference"},[t._v("完成")]):t._e()],1),t._v(" "),1==e.row.status||4==e.row.status?s("el-button",{attrs:{slot:"reference",size:"small",type:"info"},on:{click:function(s){return t.aredact(e.row.proId,e.row.proName)}},slot:"reference"},[t._v("编辑")]):t._e(),t._v(" "),s("el-popconfirm",{attrs:{title:"确认执行此操作吗？"},on:{onConfirm:function(s){return t.expurgate(e.row.proId)}}},[1==e.row.status||4==e.row.status?s("el-button",{attrs:{slot:"reference",size:"small",type:"info"},slot:"reference"},[t._v("删除")]):t._e()],1)]}}])})],1)],1),t._v(" "),s("el-col",{directives:[{name:"show",rawName:"v-show",value:!t.table_show,expression:"!table_show"}],staticClass:"table table2",attrs:{span:24}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"filterTable",staticStyle:{width:"100%"},attrs:{data:t.projectListJoin,"header-cell-style":{background:"rgb(236, 235, 235)",color:"#000"},"row-style":{height:"57px"}}},[s("el-table-column",{attrs:{prop:"name",label:"名称"},scopedSlots:t._u([{key:"default",fn:function(e){return s("el-link",{nativeOn:{click:function(s){return t.pathPrpjectDetails(e.row.proId,1)}}},[t._v(t._s(e.row.proName))])}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"state_text",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?s("span",{staticClass:"state_color1"},[t._v("进行中")]):t._e(),t._v(" "),2==e.row.status?s("span",{staticClass:"state_color2"},[t._v("审核中")]):t._e(),t._v(" "),3==e.row.status?s("span",{staticClass:"state_color3"},[t._v("完成")]):t._e(),t._v(" "),4==e.row.status?s("span",{staticClass:"state_color4"},[t._v("延期")]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"expertTime",label:"预计时间"}},[s("template",{slot:"header"},[t._v("\n            预计时间\n            "),s("i",{staticClass:"el-icon-sort"})])],2),t._v(" "),s("el-table-column",{attrs:{prop:"overTime",label:"完成时间"}},[s("template",{slot:"header"},[t._v("\n            完成时间\n            "),s("i",{staticClass:"el-icon-sort"})])],2),t._v(" "),s("el-table-column",{attrs:{prop:"realName",label:"下达人","filter-placement":"bottom-end"}})],1)],1),t._v(" "),s("el-drawer",{attrs:{title:"添加任务",visible:t.drawer2,"with-header":!1},on:{"update:visible":function(e){t.drawer2=e}}},[s("el-scrollbar",{staticStyle:{height:"100%"}},[s("el-row",{staticClass:"add_box"},[s("el-col",{attrs:{span:24}},[s("el-col",{staticClass:"title title1",attrs:{span:6}},[t._v("创建项目")])],1),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("名称")]),t._v(" "),s("el-col",{attrs:{span:13}},[s("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.new_project.new_name,callback:function(e){t.$set(t.new_project,"new_name",e)},expression:"new_project.new_name"}})],1),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("分类")]),t._v(" "),s("el-col",{attrs:{span:13}},[s("el-cascader",{staticStyle:{width:"100%"},attrs:{options:t.business_type_list},on:{change:t.handleChange},model:{value:t.new_project.business_type,callback:function(e){t.$set(t.new_project,"business_type",e)},expression:"new_project.business_type"}})],1),t._v(" "),s("el-col",{attrs:{span:18,offset:6}},[s("el-radio",{attrs:{label:"1"},model:{value:t.new_project.radio1,callback:function(e){t.$set(t.new_project,"radio1",e)},expression:"new_project.radio1"}},[t._v("专项")]),t._v(" "),s("el-radio",{attrs:{label:"2"},model:{value:t.new_project.radio1,callback:function(e){t.$set(t.new_project,"radio1",e)},expression:"new_project.radio1"}},[t._v("日常")])],1),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("预计时间")]),t._v(" "),s("el-col",{staticClass:"presetTime",attrs:{span:13}},[s("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.new_project.presetTime,callback:function(e){t.$set(t.new_project,"presetTime",e)},expression:"new_project.presetTime"}})],1),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("需求")]),t._v(" "),s("el-col",{attrs:{span:13}},[s("el-input",{attrs:{type:"textarea",autosize:{minRows:6,maxRows:8},placeholder:"请输入内容"},model:{value:t.new_project.demand,callback:function(e){t.$set(t.new_project,"demand",e)},expression:"new_project.demand"}})],1),t._v(" "),s("el-col",{attrs:{span:18,offset:6}},[s("el-radio",{attrs:{label:"1"},model:{value:t.new_project.radio2,callback:function(e){t.$set(t.new_project,"radio2",e)},expression:"new_project.radio2"}},[t._v("项目经理")]),t._v(" "),s("el-radio",{attrs:{label:"2"},model:{value:t.new_project.radio2,callback:function(e){t.$set(t.new_project,"radio2",e)},expression:"new_project.radio2"}},[t._v("执行部门")])],1),t._v(" "),s("el-col",{directives:[{name:"show",rawName:"v-show",value:1==t.new_project.radio2,expression:"new_project.radio2 == 1"}],attrs:{span:13,offset:6}},[s("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.new_project.manager,callback:function(e){t.$set(t.new_project,"manager",e)},expression:"new_project.manager"}}),t._v(" "),s("el-select",{staticClass:"userList",attrs:{filterable:"",placeholder:"请选择"},model:{value:t.new_project.managerId,callback:function(e){t.$set(t.new_project,"managerId",e)},expression:"new_project.managerId"}},t._l(t.userList,function(t){return s("el-option",{key:t.index,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),s("el-col",{directives:[{name:"show",rawName:"v-show",value:2==t.new_project.radio2,expression:"new_project.radio2 == 2"}],attrs:{span:17,offset:6}},[s("el-checkbox-group",{staticClass:"check_box",model:{value:t.new_project.checkList,callback:function(e){t.$set(t.new_project,"checkList",e)},expression:"new_project.checkList"}},t._l(t.deptList,function(e){return s("el-checkbox",{key:e.index,attrs:{label:e.id}},[t._v(t._s(e.name))])}),1)],1),t._v(" "),s("el-col",{attrs:{span:24}},[s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("知晓人")])],1),t._v(" "),s("el-col",{staticClass:"know_pop",attrs:{span:18,offset:6}},t._l(t.new_project.dynamicTags,function(e){return s("el-tag",{key:e,staticClass:"know_pop_list",attrs:{closable:"","disable-transitions":!1},on:{close:function(s){return t.handleClose(e)}}},[t._v(t._s(e))])}),1),t._v(" "),s("el-col",{attrs:{span:9,offset:6}},[s("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:t.add_list,callback:function(e){t.add_list=e},expression:"add_list"}},t._l(t.userList,function(t){return s("el-option",{key:t.index,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),s("el-col",{attrs:{span:6,offset:1}},[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.showInput}},[t._v("添加")])],1),t._v(" "),s("el-col",{staticClass:"upload",attrs:{span:13,offset:6}},[s("el-upload",{attrs:{action:"https://jsonplaceholder.typicode.com/posts/","list-type":"picture-card","auto-upload":!1,"on-success":t.testtest},scopedSlots:t._u([{key:"file",fn:function(e){var a=e.file;return s("div",{},[s("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:a.url,alt:""}}),t._v(" "),s("span",{staticClass:"el-upload-list__item-actions"},[s("span",{staticClass:"el-upload-list__item-preview",on:{click:function(e){return t.handlePictureCardPreview(a)}}},[s("i",{staticClass:"el-icon-zoom-in"})]),t._v(" "),t.disabled?t._e():s("span",{staticClass:"el-upload-list__item-delete",on:{click:function(e){return t.handleDownload(a)}}},[s("i",{staticClass:"el-icon-download"})]),t._v(" "),t.disabled?t._e():s("span",{staticClass:"el-upload-list__item-delete",on:{click:function(e){return t.handleRemove(a)}}},[s("i",{staticClass:"el-icon-delete"})])])])}}])},[s("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})]),t._v(" "),s("el-dialog",{staticClass:"upload_list",attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[s("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})]),t._v(" "),s("div",{staticClass:"text"},[t._v("附件")])],1)],1)],1),t._v(" "),s("el-row",{staticClass:"batton_pa"},[s("el-col",{staticClass:"batton",attrs:{span:12,offset:7}},[s("el-button",{attrs:{size:"small",type:"info"}},[t._v("取消")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"}},[t._v("提交")])],1)],1)],1),t._v(" "),s("el-drawer",{attrs:{title:"任务",visible:t.drawer1,"with-header":!1},on:{"update:visible":function(e){t.drawer1=e}}},[s("el-row",{staticClass:"feedback"},[s("el-col",{staticClass:"content",attrs:{span:24}},[s("el-col",{staticClass:"title",attrs:{span:24}},[t._v(t._s(t.drawer1_name))]),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("反馈")]),t._v(" "),s("el-col",{attrs:{span:24}},[s("el-input",{attrs:{type:"textarea",rows:9,placeholder:"请输入内容"},model:{value:t.feedbackContent,callback:function(e){t.feedbackContent=e},expression:"feedbackContent"}})],1),t._v(" "),s("br"),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("接受")]),t._v(" "),s("el-col",{attrs:{span:19}},[s("el-checkbox-group",{model:{value:t.checkListDept,callback:function(e){t.checkListDept=e},expression:"checkListDept"}},t._l(t.deptNameList,function(e){return s("el-checkbox",{key:e.deptId,attrs:{label:e.deptId}},[t._v(t._s(e.deptName))])}),1)],1),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("任务")]),t._v(" "),s("el-col",{attrs:{span:19}},[s("el-checkbox-group",{model:{value:t.checkListTask,callback:function(e){t.checkListTask=e},expression:"checkListTask"}},t._l(t.taskNameListShow,function(e){return s("el-checkbox",{key:e.index,attrs:{label:e.taskId}},[t._v(t._s(e.taskName))])}),1)],1)],1),t._v(" "),s("el-col",{staticClass:"batton",attrs:{span:12,offset:7}},[s("el-button",{attrs:{size:"small",type:"info"}},[t._v("取消")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.projectFeedback}},[t._v("提交")])],1)],1)],1),t._v(" "),s("el-drawer",{attrs:{title:"任务",visible:t.drawer3,"with-header":!1},on:{"update:visible":function(e){t.drawer3=e}}},[s("el-row",{staticClass:"feedback"},[s("el-col",{attrs:{span:24}},[s("el-col",{staticClass:"title",attrs:{span:24}},[t._v(t._s(t.drawer3_name))]),t._v(" "),s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("延期原因")]),t._v(" "),s("el-col",{attrs:{span:24}},[s("el-input",{attrs:{type:"textarea",rows:9,placeholder:"请输入内容"},model:{value:t.result,callback:function(e){t.result=e},expression:"result"}},[t._v("反馈反馈反馈反馈反馈")])],1)],1),t._v(" "),s("el-col",{staticClass:"batton",attrs:{span:12,offset:7}},[s("el-button",{attrs:{size:"small",type:"info"}},[t._v("取消")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"}},[t._v("提交")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var n=s("VU/8")(i,o,!1,function(t){s("Acco")},"data-v-c7d6328a",null);e.default=n.exports},Acco:function(t,e){}});