webpackJsonp([0],{"4WTo":function(t,s,e){var a=e("NWt+");t.exports=function(t,s){var e=[];return a(t,!1,e.push,e,s),e}},"7Doy":function(t,s,e){var a=e("EqjI"),i=e("7UMu"),l=e("dSzd")("species");t.exports=function(t){var s;return i(t)&&("function"!=typeof(s=t.constructor)||s!==Array&&!i(s.prototype)||(s=void 0),a(s)&&null===(s=s[l])&&(s=void 0)),void 0===s?Array:s}},"9Bbf":function(t,s,e){"use strict";var a=e("kM2E");t.exports=function(t){a(a.S,t,{of:function(){for(var t=arguments.length,s=new Array(t);t--;)s[t]=arguments[t];return new this(s)}})}},"9C8M":function(t,s,e){"use strict";var a=e("evD5").f,i=e("Yobk"),l=e("xH/j"),r=e("+ZMJ"),n=e("2KxR"),o=e("NWt+"),c=e("vIB/"),u=e("EGZi"),d=e("bRrM"),p=e("+E39"),f=e("06OY").fastKey,h=e("LIJb"),v=p?"_s":"size",m=function(t,s){var e,a=f(s);if("F"!==a)return t._i[a];for(e=t._f;e;e=e.n)if(e.k==s)return e};t.exports={getConstructor:function(t,s,e,c){var u=t(function(t,a){n(t,u,s,"_i"),t._t=s,t._i=i(null),t._f=void 0,t._l=void 0,t[v]=0,void 0!=a&&o(a,e,t[c],t)});return l(u.prototype,{clear:function(){for(var t=h(this,s),e=t._i,a=t._f;a;a=a.n)a.r=!0,a.p&&(a.p=a.p.n=void 0),delete e[a.i];t._f=t._l=void 0,t[v]=0},delete:function(t){var e=h(this,s),a=m(e,t);if(a){var i=a.n,l=a.p;delete e._i[a.i],a.r=!0,l&&(l.n=i),i&&(i.p=l),e._f==a&&(e._f=i),e._l==a&&(e._l=l),e[v]--}return!!a},forEach:function(t){h(this,s);for(var e,a=r(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(a(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!m(h(this,s),t)}}),p&&a(u.prototype,"size",{get:function(){return h(this,s)[v]}}),u},def:function(t,s,e){var a,i,l=m(t,s);return l?l.v=e:(t._l=l={i:i=f(s,!0),k:s,v:e,p:a=t._l,n:void 0,r:!1},t._f||(t._f=l),a&&(a.n=l),t[v]++,"F"!==i&&(t._i[i]=l)),t},getEntry:m,setStrong:function(t,s,e){c(t,s,function(t,e){this._t=h(t,s),this._k=e,this._l=void 0},function(){for(var t=this._k,s=this._l;s&&s.r;)s=s.p;return this._t&&(this._l=s=s?s.n:this._t._f)?u(0,"keys"==t?s.k:"values"==t?s.v:[s.k,s.v]):(this._t=void 0,u(1))},e?"entries":"values",!e,!0),d(s)}}},ALrJ:function(t,s,e){var a=e("+ZMJ"),i=e("MU5D"),l=e("sB3e"),r=e("QRG4"),n=e("oeOm");t.exports=function(t,s){var e=1==t,o=2==t,c=3==t,u=4==t,d=6==t,p=5==t||d,f=s||n;return function(s,n,h){for(var v,m,_=l(s),k=i(_),g=a(n,h,3),x=r(k.length),D=0,b=e?f(s,x):o?f(s,0):void 0;x>D;D++)if((p||D in k)&&(m=g(v=k[D],D,_),t))if(e)b[D]=m;else if(m)switch(t){case 3:return!0;case 5:return v;case 6:return D;case 2:b.push(v)}else if(u)return!1;return d?-1:c||u?u:b}}},BDhv:function(t,s,e){var a=e("kM2E");a(a.P+a.R,"Set",{toJSON:e("m9gC")("Set")})},HpRW:function(t,s,e){"use strict";var a=e("kM2E"),i=e("lOnJ"),l=e("+ZMJ"),r=e("NWt+");t.exports=function(t){a(a.S,t,{from:function(t){var s,e,a,n,o=arguments[1];return i(this),(s=void 0!==o)&&i(o),void 0==t?new this:(e=[],s?(a=0,n=l(o,arguments[2],2),r(t,!1,function(t){e.push(n(t,a++))})):r(t,!1,e.push,e),new this(e))}})}},LIJb:function(t,s,e){var a=e("EqjI");t.exports=function(t,s){if(!a(t)||t._t!==s)throw TypeError("Incompatible receiver, "+s+" required!");return t}},Qa7U:function(t,s){},ioQ5:function(t,s,e){e("HpRW")("Set")},lHA8:function(t,s,e){t.exports={default:e("pPW7"),__esModule:!0}},m9gC:function(t,s,e){var a=e("RY/4"),i=e("4WTo");t.exports=function(t){return function(){if(a(this)!=t)throw TypeError(t+"#toJSON isn't generic");return i(this)}}},oNmr:function(t,s,e){e("9Bbf")("Set")},oeOm:function(t,s,e){var a=e("7Doy");t.exports=function(t,s){return new(a(t))(s)}},pPW7:function(t,s,e){e("M6a0"),e("zQR9"),e("+tPU"),e("ttyz"),e("BDhv"),e("oNmr"),e("ioQ5"),t.exports=e("FeBl").Set},qo66:function(t,s,e){"use strict";var a=e("7KvD"),i=e("kM2E"),l=e("06OY"),r=e("S82l"),n=e("hJx8"),o=e("xH/j"),c=e("NWt+"),u=e("2KxR"),d=e("EqjI"),p=e("e6n0"),f=e("evD5").f,h=e("ALrJ")(0),v=e("+E39");t.exports=function(t,s,e,m,_,k){var g=a[t],x=g,D=_?"set":"add",b=x&&x.prototype,w={};return v&&"function"==typeof x&&(k||b.forEach&&!r(function(){(new x).entries().next()}))?(x=s(function(s,e){u(s,x,t,"_c"),s._c=new g,void 0!=e&&c(e,_,s[D],s)}),h("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(t){var s="add"==t||"set"==t;t in b&&(!k||"clear"!=t)&&n(x.prototype,t,function(e,a){if(u(this,x,t),!s&&k&&!d(e))return"get"==t&&void 0;var i=this._c[t](0===e?0:e,a);return s?this:i})}),k||f(x.prototype,"size",{get:function(){return this._c.size}})):(x=m.getConstructor(s,t,_,D),o(x.prototype,e),l.NEED=!0),p(x,t),w[t]=x,i(i.G+i.W+i.F,w),k||m.setStrong(x,t,_),x}},ttyz:function(t,s,e){"use strict";var a=e("9C8M"),i=e("LIJb");t.exports=e("qo66")("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return a.def(i(this,"Set"),t=0===t?0:t,t)}},a)},xxyk:function(t,s,e){"use strict";var a=e("lHA8"),i=e.n(a),l=e("c/Tr"),r=e.n(l),n=e("bOdI"),o=e.n(n),c={name:"task",props:{taskId:Number,clickCloseNum:Number},data:function(){var t;return t={userId:this.$store.state.user.userId,deptId:this.$store.state.user.deptId,subordinate:this.$store.state.user.subordinate,doUserId:"",taskData:{listOaUser:[]},drawerLoading:!1,proId:"",proName:"",project_style:"",closeType:0,drawer5:!1,sousuo_show:!1,sousuo_input:"",tabs_activity:1,table_show:!0,proExpertTime:"",pickerOptions:{},statusList:[{value:1,label:"执行中"},{value:2,label:"完成"}],statusList_:[{value:2,label:"完成"},{value:4,label:"延期"}],statusListValue:"",style1:"",task_type:[],task_type_value:"",batton_pa:!0,result:"",resultBan:!1,disabled0:!0,disabled1:!0,dialogImageUrl:"",dialogVisible:!1,disabled:!1,uploadUrl:"",listProFile:[{}],suggest_list:[],fileList0:[],dialogImageUrlResult:"",dialogVisibleResult:!1,disabledResult:!1},o()(t,"uploadUrl",""),o()(t,"listProFileResult",[]),o()(t,"fileList1",[]),o()(t,"oldFileId",""),o()(t,"oldProFileId",""),o()(t,"changeDoUserNameShow","true"),o()(t,"nextuserList",[]),o()(t,"nextuserValue",""),o()(t,"changeNameShow",!1),o()(t,"userValue",""),o()(t,"knowUserShow",!0),t},watch:{taskId:function(t,s){var e=this.taskId;e&&this.task_detail()},clickCloseNum:function(t,s){this.changeDoUserNameShow="true"}},methods:{changeTabs:function(t){this.tabs_activity=t},fileListShow:function(){var t=this.fileList0,s=this.fileList1;0==t.length?this.disabled0=!0:this.disabled0=!1,0==s.length?this.disabled1=!0:this.disabled1=!1},getDepTypeList:function(t){var s={depType:{deptId:t},pageSize:100,pageNum:1};this.$axios.post("/pmbs/api/depType/listAjax",s).then(this.getDepTypeListSuss)},getDepTypeListSuss:function(t){if(200==t.status){for(var s=t.data.items,e=[],a={},i=0;i<s.length;i++){var l=s[i];a={value:l.typeId,label:l.typeName},e.push(a)}this.task_type=e}},changeDoUserName:function(t,s){this.changeDoUserNameShow=t,this.getNextuserList(s)},getNextuserList:function(t){for(var s=t,e=[],a=0;a<s.length;a++){var i=s[a],l={value:i.userId,label:i.realName};e.push(l)}this.nextuserList=e},changeName:function(){this.changeNameShow=!0},task_detail:function(){this.drawer5=!0;var t="?userId="+this.userId+"&id="+this.taskId;this.getTaskShow(t)},unique:function(t){return r()(new i.a(t))},pickerOptionsTime:function(){var t=this.taskData.proExpertTime;this.pickerOptions={disabledDate:function(s){return s.getTime()<Date.now()-864e5||s.getTime()>new Date(t).getTime()}}},getTaskShow:function(t){this.drawerLoading=!0,this.$axios.post("/pmbs/api/task/show"+t).then(this.getTaskShowSuss)},getTaskShowSuss:function(t){if(this.drawerLoading=!1,200==t.status){var s=t.data.data;this.proId=s.proId,this.taskData=s,this.doUserId=s.doUserId,this.pickerOptionsTime(),this.listProFile=s.proFileList,this.listProFileResult=s.taskfileList,this.statusListValue=s.status;for(var e=[],a=0;a<s.proFileList.length;a++){var i=s.proFileList[a],l={fileId:i.fileId,fileName:i.fileName,name:i.fileName,localPath:i.localPath,suffix:i.suffix};e.push(l)}this.fileList0=e;for(var r=[],n=0;n<s.taskfileList.length;n++){var o=s.taskfileList[n],c={fileId:o.fileId,fileName:o.fileName,name:o.fileName,localPath:o.localPath,suffix:o.suffix};r.push(c)}this.fileList1=r,this.getDepTypeList(s.deptId),this.fileListShow()}},upload:function(){this.uploadUrl="\n      /pmbs/file/upload?upType=1&demandType=0\n      "},handleSuccess:function(t,s,e){if(0==e.length?this.disabled0=!0:this.disabled0=!1,0==t.errcode){var a=t.data,i=this.listProFile,l={oldProFileId:this.oldProFileId,proId:this.taskData.proId||"",taskId:this.taskData.taskId||"",fileId:"",fileName:a.fileName,isPro:1,deleteFlag:!1,ptId:this.taskData.taskId||"",localPath:a.path,suffix:a.fileType};i.push(l),this.listProFile=i,console.log(this.listProFile)}},handleRemove:function(t,s){var e=t;0==s.length?this.disabled0=!0:this.disabled0=!1,this.taskFileId=e.fileId,this.oldProFileId=e.fileId,this.listProFile=[]},handleSuccessResult:function(t,s,e){if(0==e.length?this.disabled1=!0:this.disabled1=!1,0==t.errcode){var a=t.data,i=this.listProFileResult,l={proId:this.proId,taskId:this.taskId,fileId:"",updateUserId:this.userId,fileName:a.fileName,localPath:a.path,suffix:a.fileType,oldFileId:this.oldFileId};i.push(l),this.listProFileResult=i}},handleRemoveResult:function(t,s){0==s.length?this.disabled1=!0:this.disabled1=!1;this.oldFileId=t.fileId,this.listProFileResult=[]},exceed:function(){this.messageWarning("只能上传一个文件")},handlePreview:function(t){this.download(t)},changeTaskDeil:function(){this.closeType=1;var t=this.taskData,s=this.listProFile,e=this.listProFileResult,a=this.statusListValue;t.proFileList=s,t.taskfileList=e,t.status=a,t.expertTime=this.$date0(t.expertTime),delete t.feedbackList,0!=t.proFileList.length&&null==t.proFileList[0].oldProFileId&&(t.proFileList=[]),0!=t.taskfileList.length&&null==t.taskfileList[0].oldFileId&&(t.taskfileList=[]),t.doUserId=this.doUserId;var i=this.tabs_activity;if(1==i)this.taskSave(t);else if(2==i){var l={proId:t.proId,taskId:t.taskId,doUserId:t.doUserId,overDesc:t.overDesc,taskfileList:t.taskfileList};""==l.overDesc?this.messageError("带*信息不能为空"):this.finishTask(l)}},finishTask:function(t){var s=this;this.drawer5=!1,this.$axios.post("/pmbs/api/task/finishTask",t).then(function(t){200==t.status&&s.messageWin(t.data.msg)})},taskSave:function(t){this.drawer5=!1,this.$axios.post("/pmbs/api/task/save",t).then(this.taskSaveSuss)},taskSaveSuss:function(t){200==t.status&&(this.messageWin(t.data.msg),this.result="",this.listProFile=[],this.listProFileResult=[])},download:function(t){var s=t.localPath,e=document.createElement("a");e.download=t.fileName+"."+t.suffix,e.setAttribute("href","http://218.106.254.122:8084/pmbs/"+s),e.click()},empty:function(){this.drawer5=!1},close:function(){var t=this.closeType;this.$emit("closeDrawer",t),this.oldProFileId="",this.oldFileId="",this.closeType=0,this.changeNameShow=!1,this.$refs.needFileUpload.clearFiles(),this.$refs.resultFileUpload.clearFiles()},messageWin:function(t){this.$message({message:t,type:"success"})},messageWarning:function(t){this.$message({message:t,type:"warning"})},messageError:function(t){this.$message.error(t)}},mounted:function(){}},u={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"taskDetail"},[e("el-drawer",{attrs:{title:"任务",visible:t.drawer5,"with-header":!1},on:{"update:visible":function(s){t.drawer5=s},close:t.close}},[e("el-scrollbar",{directives:[{name:"loading",rawName:"v-loading",value:t.drawerLoading,expression:"drawerLoading"}],staticStyle:{height:"100%"}},[e("el-row",{staticClass:"task_details"},[e("el-col",{staticClass:"title",attrs:{span:24}},[t._v(t._s(t.taskData.proName))]),t._v(" "),e("el-col",{staticClass:"tabsBox",attrs:{span:24}},[e("el-col",{class:[1==t.tabs_activity?"act":"","tabs"],attrs:{span:8},nativeOn:{click:function(s){return t.changeTabs(1)}}},[t._v("需求信息")]),t._v(" "),e("el-col",{class:[2==t.tabs_activity?"act":"","tabs"],attrs:{span:8},nativeOn:{click:function(s){return t.changeTabs(2)}}},[t._v("提交任务")]),t._v(" "),e("el-col",{class:[3==t.tabs_activity?"act":"","tabs"],attrs:{span:8},nativeOn:{click:function(s){return t.changeTabs(3)}}},[t._v("反馈")])],1),t._v(" "),e("el-col",{staticClass:"paneBox",attrs:{span:24}},[e("el-col",{directives:[{name:"show",rawName:"v-show",value:1==t.tabs_activity,expression:"tabs_activity == 1"}],staticClass:"pane",attrs:{span:24}},[e("el-col",{staticClass:"title",attrs:{span:5}},[t._v("任务名称")]),t._v("：\n            "),e("el-col",{attrs:{span:18}},[t.taskData.doUserId==t.userId&&2!=t.taskData.status&&3!=t.taskData.status&&5!=t.taskData.status?[e("el-input",{attrs:{placeholder:"请输入内容",clearable:"",size:"mini"},model:{value:t.taskData.taskName,callback:function(s){t.$set(t.taskData,"taskName",s)},expression:"taskData.taskName"}})]:[t._v(t._s(t.taskData.taskName))]],2),t._v(" "),e("el-col",{staticClass:"title",attrs:{span:5}},[t._v("执行部门")]),t._v("：\n            "),e("el-col",{attrs:{span:18}},[t._v(t._s(t.taskData.deptName))]),t._v(" "),e("el-col",{staticClass:"title",attrs:{span:5}},[t._v("任务类型")]),t._v("：\n            "),e("el-col",{attrs:{span:18}},[t.taskData.doUserId==t.userId&&2!=t.taskData.status&&3!=t.taskData.status&&5!=t.taskData.status?[e("el-select",{attrs:{placeholder:"请选择任务类型",size:"mini"},model:{value:t.taskData.typeId,callback:function(s){t.$set(t.taskData,"typeId",s)},expression:"taskData.typeId"}},t._l(t.task_type,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)]:[t._v(t._s(t.taskData.typeName))]],2),t._v(" "),e("el-col",{staticClass:"title",attrs:{span:5}},[t._v("执行人")]),t._v("：\n            "),e("el-col",{attrs:{span:18}},[t.changeNameShow?t._e():e("span",[t._v(t._s(t.taskData.doUserName))]),t._v(" "),t.changeNameShow?e("el-select",{staticStyle:{width:"99px"},attrs:{filterable:"",placeholder:"请选择",size:"mini",clearable:""},model:{value:t.doUserId,callback:function(s){t.doUserId=s},expression:"doUserId"}},t._l(t.taskData.listOaUser,function(t){return e("el-option",{key:t.userId,attrs:{label:t.realName,value:t.userId}})}),1):t._e(),t._v(" "),1!=t.taskData.isIgnore&&t.taskData.listOaUser.length>1&&2!=t.taskData.status&&3!=t.taskData.status&&5!=t.taskData.status&&t.taskData.deptId==t.subordinate?e("el-link",{attrs:{type:"primary"},on:{click:function(s){return t.changeName()}}},[e("img",{attrs:{src:"static/images/task/change.png",width:"18",alt:"",srcset:""}})]):t._e()],1),t._v(" "),e("el-col",{staticClass:"title",attrs:{span:5}},[t._v("状态")]),t._v("：\n            "),e("el-col",{attrs:{span:18}},[1==t.taskData.status?e("span",{staticClass:"state_color1"},[t._v("执行中")]):t._e(),t._v(" "),2==t.taskData.status?e("span",{staticClass:"state_color2"},[t._v("审核中")]):t._e(),t._v(" "),3==t.taskData.status?e("span",{staticClass:"state_color3"},[t._v("已完成")]):4==t.taskData.status?e("span",{staticClass:"state_color4"},[t._v("延期")]):5==t.taskData.status?e("span",{staticClass:"state_color3"},[t._v("延期完成")]):t._e()]),t._v(" "),e("el-col",{staticClass:"title",attrs:{span:5}},[t._v("预计时间")]),t._v("：\n            "),e("el-col",{attrs:{span:18}},[t.taskData.doUserId==t.userId&&2!=t.taskData.status&&3!=t.taskData.status&&5!=t.taskData.status?[e("el-date-picker",{staticClass:"expertTime",attrs:{type:"date",placeholder:"选择日期","picker-options":t.pickerOptions,size:"mini"},model:{value:t.taskData.expertTime,callback:function(s){t.$set(t.taskData,"expertTime",s)},expression:"taskData.expertTime"}})]:[t._v(t._s(t.$date(t.taskData.expertTime)))]],2),t._v(" "),e("el-col",{staticClass:"title",attrs:{span:5}},[t._v("完成时间")]),t._v("：\n            "),e("el-col",{attrs:{span:18}},[t._v(t._s(t.$time(t.taskData.overTime)))]),t._v(" "),e("el-col",{staticClass:"title",attrs:{span:5}},[t._v("需求")]),t._v("：\n            "),e("el-col",{attrs:{span:18}},[t.taskData.doUserId==t.userId&&2!=t.taskData.status&&3!=t.taskData.status&&5!=t.taskData.status?[e("el-input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:9},placeholder:"请输入内容",maxlength:"300","show-word-limit":""},model:{value:t.taskData.remark,callback:function(s){t.$set(t.taskData,"remark",s)},expression:"taskData.remark"}})]:[t._v(t._s(t.taskData.remark))]],2),t._v(" "),e("el-col",{staticClass:"title",attrs:{span:5}},[t._v("附件")]),t._v("：\n            "),e("el-col",{staticClass:"proFileList",attrs:{span:18}},[t.taskData.doUserId==t.userId&&2!=t.taskData.status&&3!=t.taskData.status&&5!=t.taskData.status?[e("el-upload",{ref:"needFileUpload",attrs:{action:"/pmbs/file/upload?upType=1&demandType=0","on-remove":t.handleRemove,"on-success":t.handleSuccess,fileList:t.fileList0,"on-preview":t.handlePreview,limit:1,"on-exceed":t.exceed}},[e("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("点击上传附件")]),t._v(" "),e("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传一个文件")])],1)]:t._l(t.taskData.proFileList,function(s){return e("div",{key:s.index,staticClass:"smname",on:{click:function(e){return t.download(s)}}},["doc"==s.suffix||"docx"==s.suffix?e("img",{attrs:{src:"static/images/document/word.png",width:"24",alt:"",srcset:""}}):"xls"==s.suffix||"xlsx"==s.suffix?e("img",{attrs:{src:"static/images/document/excle.png",width:"24",alt:"",srcset:""}}):"ppt"==s.suffix||"pptx"==s.suffix?e("img",{attrs:{src:"static/images/document/ppt.png",width:"24",alt:"",srcset:""}}):e("img",{attrs:{src:"static/images/document/other.png",width:"24",alt:"",srcset:""}}),t._v(" "),e("div",[t._v(t._s(s.fileName))])])})],2)],1),t._v(" "),e("el-col",{directives:[{name:"show",rawName:"v-show",value:2==t.tabs_activity,expression:"tabs_activity == 2"}],staticClass:"pane",attrs:{span:24}},[e("el-col",{class:[t.taskData.doUserId==t.userId&&3!=t.taskData.status&&5!=t.taskData.status?"snow":"","title"],attrs:{span:6}},[t._v("完成结果")]),t._v("：\n            "),e("el-col",{attrs:{span:24}},[t.taskData.doUserId==t.userId&&3!=t.taskData.status&&5!=t.taskData.status?[e("el-input",{attrs:{type:"textarea",rows:6,placeholder:"请输入内容",disabled:t.resultBan,maxlength:"300","show-word-limit":""},model:{value:t.taskData.overDesc,callback:function(s){t.$set(t.taskData,"overDesc",s)},expression:"taskData.overDesc"}})]:[t._v(t._s(t.taskData.overDesc))]],2),t._v(" "),e("el-col",{staticClass:"title center",attrs:{span:6}},[t._v("附件")]),t._v("：\n            "),e("el-col",{staticClass:"proFileList",attrs:{span:24}},[t.taskData.doUserId==t.userId&&3!=t.taskData.status&&5!=t.taskData.status?[e("el-upload",{ref:"resultFileUpload",attrs:{action:"/pmbs/file/upload?upType=1&demandType=1","on-remove":t.handleRemoveResult,"on-success":t.handleSuccessResult,"on-preview":t.handlePreview,fileList:t.fileList1,limit:1,"on-exceed":t.exceed}},[e("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("点击上传文档")]),t._v(" "),e("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传一个文件")])],1)]:t._l(t.taskData.taskfileList,function(s){return e("div",{key:s.index,staticClass:"smname",on:{click:function(e){return t.download(s)}}},["doc"==s.suffix||"docx"==s.suffix?e("img",{attrs:{src:"static/images/document/word.png",width:"24",alt:"",srcset:""}}):"xls"==s.suffix||"xlsx"==s.suffix?e("img",{attrs:{src:"static/images/document/excle.png",width:"24",alt:"",srcset:""}}):"ppt"==s.suffix||"pptx"==s.suffix?e("img",{attrs:{src:"static/images/document/ppt.png",width:"24",alt:"",srcset:""}}):e("img",{attrs:{src:"static/images/document/other.png",width:"24",alt:"",srcset:""}}),t._v(" "),e("div",[t._v(t._s(s.fileName))])])})],2)],1),t._v(" "),e("el-col",{directives:[{name:"show",rawName:"v-show",value:3==t.tabs_activity,expression:"tabs_activity == 3"}],staticClass:"pane",attrs:{span:24}},[e("el-col",{staticClass:"suggest",attrs:{span:24}},t._l(t.taskData.feedbackList,function(s){return e("el-col",{key:s.index,staticClass:"suggest_list",attrs:{span:23}},[e("el-col",{staticClass:"time",attrs:{span:12}},[t._v(t._s(t.$time(s.updateTime)))]),t._v(" "),e("el-col",{staticClass:"pop",attrs:{span:12}},[t._v(t._s(s.deptName)+"-"+t._s(s.feedbackUserName))]),t._v(" "),e("el-col",{staticClass:"content",attrs:{span:24}},[t._v(t._s(s.feedback))]),t._v(" "),e("el-col",{staticClass:"fileListBox",attrs:{span:24}},t._l(s.feedbackFileList,function(s){return e("div",{key:s.index,staticClass:"fileList",on:{click:function(e){return t.download(s)}}},["doc"==s.suffix||"docx"==s.suffix?e("img",{attrs:{src:"static/images/document/word.png",width:"24",alt:"",srcset:""}}):"xls"==s.suffix||"xlsx"==s.suffix?e("img",{attrs:{src:"static/images/document/excle.png",width:"24",alt:"",srcset:""}}):"ppt"==s.suffix||"pptx"==s.suffix?e("img",{attrs:{src:"static/images/document/ppt.png",width:"24",alt:"",srcset:""}}):e("img",{attrs:{src:"static/images/document/other.png",width:"24",alt:"",srcset:""}}),t._v(" "),e("div",[t._v(t._s(s.fileName))])])}),0)],1)}),1)],1)],1)],1)],1),t._v(" "),t.taskData.doUserId==t.userId&&3!=t.tabs_activity?e("el-row",{directives:[{name:"show",rawName:"v-show",value:t.batton_pa,expression:"batton_pa"}],staticClass:"batton_pa"},[e("el-col",{staticClass:"batton",attrs:{span:20,offset:2}},[e("el-button",{attrs:{size:"small",type:"info"},on:{click:t.empty}},[t._v("取消")]),t._v(" "),e("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.changeTaskDeil}},[t._v("提交")])],1)],1):t._e()],1)],1)},staticRenderFns:[]};var d=e("VU/8")(c,u,!1,function(t){e("Qa7U")},"data-v-1ead41ad",null);s.a=d.exports}});