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
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import {listUser} from '@/api/apis.js'
import moment from 'moment'
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
      ]
    };
  },
  methods : {
    roleFormat(row, column, cellValue){
      if(cellValue === 1){
        return "超级管理员";
      }else if(cellValue === 2){
        return "普通员工";
      }
    },
    timeFormat(row, column, cellValue){
      return moment(cellValue).format('Y-MM-DD');
    }
  },
  mounted(){
    listUser().then((data)=>{
      this.tableData = data
    })
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