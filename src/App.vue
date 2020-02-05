<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
      // console.log('我来了')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
/* reset */
* { -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }
html, body {}
body { background: #fff;margin: 0; position: relative; font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;  -webkit-text-size-adjust: 100%; }
p, h1, h2, h3, form, dl, dd, table { margin: 0;  color: #000;}
ul, ol { padding: 0; margin: 0; }
li { list-style: none; }
a, img { -webkit-touch-callout: none; text-decoration: none; }
img { border: none; vertical-align: middle; /* pointer-events: none; -webkit-user-select: none; -webkit-touch-callout: none;  */ }
a { text-decoration: none; border: none; }
a:focus{outline:none;}/* ieä¸‹æœ‰ç‚¹å‡»æœ‰è™šçº¿ */
a:link {text-decoration:none;}
a:active{text-decoration:none;}
a:visited {text-decoration:none;}
a:hover { text-decoration:none;}

input, textarea { font-family: Microsoft Yahei; font-size: 18px; }
select{outline:none; appearance:none; -webkit-appearance: none; -moz-appearance: none; -ms-appearance: none;}
.text-right{text-align: right;}
.text-center{text-align: center;}
.text-left{text-align: left;}


.router-part{
    padding: 10px;
    padding-bottom: 30px;
}
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
    font-weight: normal;
    color: #337ab7;
}
</style>
