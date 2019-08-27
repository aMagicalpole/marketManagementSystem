<template>
  <div class="changepwd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>修改密码</h2>
      </div>
      <div class="text item">
        <el-form
          :model="user"
          status-icon
          :rules="rules3"
          ref="changepwd"
          label-width="100px"
          class="register-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input v-model="user.oldPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="user.newPwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkNewPwd">
            <el-input type="password" v-model="user.checkNewPwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { check, editpwd } from "@/api/apis";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.newPwd !== "") {
          this.$refs.changepwd.validateField("checkNewPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: {
        username: "",
        oldPwd: "",
        newPwd: "",
        checkNewPwd: "",
        id: ""
      },
      rules3: {
        newPwd: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        checkNewPwd: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.changepwd.validate(valid => {
        if (valid) {
          editpwd(this.user).then(data => {
            if (data.code === 1) {
              alert(data.message);
              this.user = {
                username: "",
                oldPwd: "",
                newPwd: "",
                checkNewPwd: ""
              };
            } else {
              alert(data.message);
            }
          });
        } else {
          alert("修改失败!!");
          return false;
        }
      });
    }
  },
  mounted() {
    const _this = this;
    check({ token: localStorage.getItem("token") }).then(data => {
      if (data) {
        _this.user.username = data.username;
        _this.user.id = data.id;
      } else {
        this.$message({
          message: "未登录或者验证已过期，请重新登录",
          type: "error",
          duration: 1000,
          onClose() {
            _this.$router.push("/login");
          }
        });
      }
    });
  }
};
</script>

<style lang="less" Scoped>
.changepwd {
  .box-card {
    width: 100%;
    h2 {
      margin: 0;
    }
    .el-form {
      min-width: 400px;
      width: 50%;
    }
  }
}
</style>