<template>
  <div id="app">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <p>
          <i class="el-icon-goods"></i>永辉超市管理系统
        </p>
      </div>
      <div class="text item" @keyup.enter="submitForm">
        <el-form
          :model="userForm"
          :rules="rules"
          ref="loginForm"
          label-width="70px"
          class="loginForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { loginVerify } from "@/api/apis.js";
export default {
  data() {
    return {
      userForm: {
        username: "1111",
        password: "111111"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        const _this = this;
        if (valid) {
          loginVerify(this.userForm).then(data => {
            console.log(data);
            this.$message({
              message: data.message,
              type: "success"
            });
            if (data.code == 1) {
              _this.$router.replace("/home/product");
            }
          });
          // _this.$router.replace('/home/product');
        } else {
          this.$message.error("登录失败！");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  },
  mounted() {}
};
</script>

<style lang="less">
#app {
  background-color: #2d3a4b;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > .box-card {
    width: 400px;
    border: none;
    color: #dcdfe6;
    background-color: #141c23;
    p {
      text-align: center;
      margin: 0;
    }
    label {
      color: #dcdfe6;
    }
  }
}
</style>