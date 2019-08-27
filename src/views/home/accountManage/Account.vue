<template>
  <div class="account">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>账号管理</h2>
      </div>
      <div class="text item">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="工号"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="Email" label="邮箱"></el-table-column>
          <!-- 使用formatter格式化数据 -->
          <el-table-column prop="role" label="权限" :formatter="roleFormat"></el-table-column>
          <el-table-column prop="inputTime" label="录入时间" :formatter="timeFormat"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="open(scope.row.id)">编辑</el-button>
              <el-dialog title="个人信息编辑" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.Email" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="权限" :label-width="formLabelWidth">
                    <el-select v-model="form.role" placeholder="请选择权限">
                      <el-option label="超级管理员" :value="1"></el-option>
                      <el-option label="普通员工" :value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitEdit">确 定</el-button>
                </div>
              </el-dialog>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                style="margin-left:10px;"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { listUser, getAccount, editAccount } from "@/api/apis.js";
import moment from "moment";
export default {
  data() {
    return {
      tableData: [
        {
          inputTime: "2016-05-02",
          username: "王小虎",
          Email: "zxh@qq.com",
          role: 1,
          id: "A001"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: "",
        username: "",
        role: "",
        Email: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    roleFormat(row, column, cellValue) {
      if (cellValue === 1) {
        return "超级管理员";
      } else if (cellValue === 2) {
        return "普通员工";
      }
    },
    timeFormat(row, column, cellValue) {
      return moment(cellValue).format("Y-MM-DD");
    },
    open(id) {
      this.dialogFormVisible = true;
      const _this = this;
      getAccount(id).then(data => {
        if (data.code === 1) {
          _this.form = data.data;
        } else {
          alert(data.message);
          this.dialogFormVisible = false;
        }
      });
    },
    update() {
      listUser().then(data => {
        this.tableData = data;
      });
    },
    submitEdit() {
      const _this = this;
      editAccount(this.form).then(data => {
        if (data.code === 1) {
          this.$message({
            message: data.message,
            type: "success",
            duration: 500,
            onClose() {
              _this.dialogFormVisible = false;
              setTimeout(() => {
                _this.update();
              }, 1000);
            }
          });
        } else {
          this.$message({
            message: data.message,
            type: "error",
            duration: 1000
          });
        }
      });
    }
  },
  mounted() {
    this.update();
  }
};
</script>

<style  lang="less" Scoped>
.box-card {
  h2 {
    margin: 0;
  }
}
</style>