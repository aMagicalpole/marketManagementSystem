<template>
  <div id="app">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <h2>
          <i class="el-icon-menu"></i> 大可爱超市管理系统
        </h2>
        <p v-if="loginUser">
          <img src="../assets/images/icon_head.png" alt="">
          <span>{{loginUser}}</span>
          <el-button type="text" @click="logout">注销</el-button>
        </p>
        <p v-else>
          <el-button type="text">未登录</el-button>
        </p>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <el-container>
          <!-- 侧边栏 -->
          <el-aside width="240px">
            <!-- 菜单模块 -->
            <is-menu></is-menu>
          </el-aside>
          <!-- 主要内容 -->
          <el-main>
            <!-- 根据路由动态加载 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-main>
      <!-- 页脚 -->
      <el-footer>
        <p>&copy; Copyright 2019 大可爱超市版权所有</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// 引入菜单
import menu from '@/views/home/menu.vue'
import {check} from '@/api/apis'
export default {
  data(){
    return {
      loginUser:''
    }
  },
  components : {
    "is-menu" : menu
  },
  methods : {
    logout(){
      this.$router.replace('/login');
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  },
  mounted(){
    const _this = this;
    check({'token':localStorage.getItem('token')})
      .then((data)=>{
        _this.loginUser = data.username;
      })
  }
};
</script>

<style lang="less" Scoped>
#app {
  height: 100%;
  width: 100%;
  > .el-container {
    height: 100%;
    display: flex;
    .el-header {
      flex: 0 0 50px;
      background-color: #242f41;
      line-height: 50px;
      padding:0 40px 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        margin: 0;
        padding: 0;
        line-height: 50px;
        float: left;
        color: #dcdfe6;
      }
      p {
        float: right;
        margin: 0;
        color: #ebeef5;
        display: flex;
        align-items: center;
        img{
          width: 28px;
        }
        span{
          margin: 0 2px 0 5px;
        }
        .el-button{
          font-size: 14px;
        }
      }
    }
    > .el-main {
      padding: 0;
      flex: 1;
      .el-container {
        height: 100%;
        background-color: #fff;
        .el-aside {
          width: 239px;
          background-color: #545c64;
        }
      }
    }
    .el-footer {
      flex: 0 0 26px;
      background-color: #242f41;
      p {
        text-align: center;
        font-size: 14px;
        color: #dcdfe6;
        margin: 0;
        line-height: 26px;
      }
    }
  }
}
</style>