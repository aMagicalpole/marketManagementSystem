<template>
  <div class="addaccount">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>添加账号</h2>
      </div>
      <div class="text item">
        <el-form
          :model="adduser"
          status-icon
          :rules="rules2"
          ref="adduser"
          label-width="100px"
          class="register-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="adduser.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="Email">
            <el-input v-model="adduser.Email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="adduser.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="adduser.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限选择" prop="roleSelect">
            <el-select v-model="adduser.role" placeholder="请选择">
              <el-option
                v-for="item in SelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addUser } from "@/api/apis.js";
export default {
  data() {
    var userFormat = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (value && (value.length > 20 || value.length < 3)) {
        callback(new Error("长度在 3 到 20 个字符"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.adduser.checkPass !== "") {
          this.$refs.adduser.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.adduser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      adduser: {
        username: "",
        password: "",
        checkPass: "",
        Email: "",
        role: ""
      },
      rules2: {
        username: [{ validator: userFormat, trigger: "blur" }],
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        Email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ]
        // roleSelect: [
        //   { required: true, message: "请选择权限", trigger: "change" }
        // ]
      },
      SelectOptions: [
        {
          value: "1",
          label: "超级管理员"
        },
        {
          value: "2",
          label: "普通员工"
        }
      ]
    };
  },
  methods: {
    submitForm() {
      this.$refs.adduser.validate(valid => {
        if (valid) {
          addUser(this.adduser).then(data => {
            if (data.success) {
              alert(data.message);
              this.$router.push("/home/account");
            } else {
              alert(data.message);
            }
          });
          this.adduser = {
            password: "",
            checkPass: "",
            Email: ""
          };
        } else {
          alert("注册失败!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.adduser.resetFields();
    }
  }
};
</script>

<style lang="less" Scoped>
.addaccount {
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