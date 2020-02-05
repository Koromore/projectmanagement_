<template>
    <div class="home">
        <top-header></top-header>
        <div class="system-message">
            <el-alert
               title="今日头条版块可批量导入数据，请注意下载使用系统指定模板，按规定填写内容后再导入"
               type="warning"
               center
               show-icon>
            </el-alert>
        </div>
        <div class="home-main">
            <el-row :gutter="30" v-loading.fullscreen.lock="fullscreenLoading">
                <el-col :span="8">
                    <el-card shadow="always">
                        <div class="home-item">
                            <h3>{{car.name}}</h3>
                            <div class="home-item-text">今日新增{{car.todaynum}}篇，本月共发布{{car.totalnum}}篇</div>
                        </div>
                        <div class="home-handle">
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <router-link tag="div" to="/add/addcar">
                                        <el-button type="primary" plain icon="el-icon-edit">发布</el-button>
                                    </router-link>
                                </el-col>
                                <el-col :span="12">
                                    <router-link tag="div" to="/list/car">
                                        <el-button type="primary" plain icon="el-icon-search">查看</el-button>
                                    </router-link>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="always">
                        <div class="home-item">
                            <h3>{{weibo.name}}</h3>
                            <div class="home-item-text">今日新增{{weibo.todaynum}}篇，本月共发布{{weibo.totalnum}}篇</div>
                        </div>
                        <div class="home-handle">
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <router-link tag="div" to="/add/addweibo">
                                        <el-button type="primary" plain icon="el-icon-edit">发布</el-button>
                                    </router-link>
                                </el-col>
                                <el-col :span="12">
                                    <router-link tag="div" to="/list/weibo">
                                        <el-button type="primary" plain icon="el-icon-search">查看</el-button>
                                    </router-link>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="always">
                        <div class="home-item">
                            <h3>{{douyin.name}}</h3>
                            <div class="home-item-text">今日新增{{douyin.todaynum}}篇，本月共发布{{douyin.totalnum}}篇</div>
                        </div>
                        <div class="home-handle">
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <router-link tag="div" to="/add/adddouyin">
                                        <el-button type="primary" plain icon="el-icon-edit">发布</el-button>
                                    </router-link>
                                </el-col>
                                <el-col :span="12">
                                    <router-link tag="div" to="/list/douyin">
                                        <el-button type="primary" plain icon="el-icon-search">查看</el-button>
                                    </router-link>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div class="height40">

            </div>
            <el-row :gutter="30">
                <el-col :span="24">
                    <el-card shadow="always">
                        <div class="home-item">
                            <h3>{{head.name}}</h3>
                            <div class="home-item-text">今日新增{{head.todaynum}}篇，本月共发布{{head.totalnum}}篇</div>
                        </div>
                        <div class="home-handle">
                            <el-row :gutter="24">
                                <el-col :span="6">
                                    <router-link tag="div" to="/add/addtoday">
                                        <el-button type="primary" plain icon="el-icon-edit">发布</el-button>
                                    </router-link>
                                </el-col>
                                <el-col :span="6">
                                    <router-link tag="div" to="/list/today">
                                        <el-button type="primary" plain icon="el-icon-search">查看</el-button>
                                    </router-link>
                                </el-col>
                                <el-col :span="6">
                                    <el-button type="primary" @click="downloadXls" plain icon="el-icon-download">下载模板</el-button>
                                </el-col>
                                <el-col :span="6">
                                    <el-upload
                                        class="upload-demo"
                                        action="/api/index.php?mod=head&ac=import"
                                        name="excel"
                                        :on-preview="handlePreview"
                                        :beforeUpload="beforeUpload"
                                        :on-success='uploadSuccess'
                                        :on-error='uploadError'
                                        :limit="1"
                                        :show-file-list="false"
                                        ref="uploadExcel"
                                        >
                                        <el-button type="primary" plain icon="el-icon-upload2">导入数据</el-button>
                                    </el-upload>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import topHeader from '../header.vue'
export default {
    name: 'home',
    data() {
        return {
            fullscreenLoading:false,
            car:{
                name:'汽车之家',
                totalnum:0,
                todaynum:0
            },
            weibo:{
                name:'微博',
                totalnum:0,
                todaynum:0
            },
            douyin:{
                name:'抖音',
                totalnum:0,
                todaynum:0
            },
            head:{
                name:'今日头条',
                totalnum:0,
                todaynum:0
            },
        };
    },
    components:{
        topHeader
    },
    methods:{
        beforeUpload(file){
            //上传文件格式限制
            let fileFormat = file.name.substring(file.name.lastIndexOf('.')+1);
			const extension = fileFormat === 'xls'
			if(!extension) {
                this.$alert('上传文件只能是xls格式！', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
			}
			return extension;
        },
        uploadSuccess(data){
            if (data.result) {
                this.$alert('导入成功！', {
                    confirmButtonText: '确定',
                    type: 'success'
                });
            }else{
                this.$alert(data.message, {
                    confirmButtonText: '确定',
                    type: 'error'
                });
            }
            this.$refs.uploadExcel.clearFiles();
        },
        uploadError(data){
            this.$alert(data.message, {
                confirmButtonText: '确定',
            });
            this.$refs.uploadExcel.clearFiles();
        },
        handlePreview(file) {
            //点击文件列表中已上传的文件时的钩子
           console.log(file);
        },
        getHomeData(){
            this.$axios.get('/api/index.php?ac=number').then(this.getHomeDataSuccess)
        },
        getHomeDataSuccess(res){
            this.car.totalnum = res.data.ctotalnum;
            this.car.todaynum = res.data.carnum;

            this.weibo.totalnum = res.data.wtotalnum;
            this.weibo.todaynum = res.data.weibonum;

            this.douyin.totalnum = res.data.dtotalnum;
            this.douyin.todaynum = res.data.douyinnum;

            this.head.totalnum = res.data.htotalnum;
            this.head.todaynum = res.data.headnum;
        },
        downloadXls(){
            //导出
            let a = document.createElement('a');
                a.download = '';
                a.setAttribute('href','/api/index.php?mod=head&ac=export');
                a.click();
        }
    },
    mounted(){
        // this.getHomeData();
        // console.log('mounted')
    }
}
</script>
<style>
.home .el-alert{
    padding: 20px 16px;
}
.home .el-alert__closebtn{
    top: 24px;
}
.home-main{
    width: 840px;
    margin: auto;
}
.system-message{
    max-width: 1200px;
    min-width: 840px;
    margin: auto;
    padding: 40px 0;
}
.home-item{
    height: 120px;
}
.height40{
    height: 40px;
}
.home-handle .el-col{
    text-align: center;
}
.home-item-text{
    margin: 20px 0;
    font-size: 14px;
    line-height: 18px;
    max-height: 54px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
</style>
