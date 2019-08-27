<template>
  <div class="sale">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品出库</span>
      </div>
      <div class="text item">
        <el-form ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="商品条形码:">
                <el-input v-model="Search.barcode" placeholder></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="数量:">
                <el-input v-model="Search.stockoutNum" placeholder></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item>
                <el-button type="primary" size="mini" @click="addlist">加入名单</el-button>
                <el-button type="warning" size="mini">重新选择</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="tableData" stripe style="width: 100%" height="230px">
                <el-table-column prop="barcode" label="条形码"></el-table-column>
                <el-table-column prop="productname" label="名称"></el-table-column>
                <el-table-column prop="stockoutNum" label="数量"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.$index)">编辑</el-button>

                    <el-dialog :title="form.productname" :visible.sync="dialogFormVisible">
                      <el-form :model="form">
                        <el-form-item label="条形码" :label-width="formLabelWidth">
                          <el-input v-model="form.barcode" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="数量" :label-width="formLabelWidth">
                          <el-input v-model="form.stockoutNum" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                      </div>
                    </el-dialog>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item>
                <el-button type="primary" @click="submitStockout">确认出库</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getstockout, stockout } from "@/api/apis";
export default {
  data() {
    return {
      Search: { barcode: "", stockoutNum: "" },
      tableData: [
        // {
        //   barcode: "12",
        //   productname: "王小虎",
        //   stockoutNum: "34",
        //   Price: "3.2",
        //   sumPrice: 10
        // }
      ],
      form: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      index: ""
    };
  },
  methods: {
    addlist() {
      if (this.Search.barcode || this.Search.stockoutNum) {
        const _this = this;
        getstockout(this.Search).then(data => {
          let newData = data.data[0];
          //把需要出库的产品数量添加到产品属性中
          newData.stockoutNum = _this.Search.stockoutNum;
          let flag = true;
          // 判断刚刚查询的数据有没有在表里面
          _this.tableData.forEach(v => {
            if (v.barcode === newData.barcode) {
              v.stockoutNum =
                Number(v.stockoutNum) + Number(_this.Search.stockoutNum);
              flag = false;
              _this.Search = { barcode: "", stockoutNum: "" };
            }
          });
          if (flag) {
            _this.tableData.push(newData);
            _this.Search = { barcode: "", stockoutNum: "" };
          }
        });
      } else {
        alert("请录入数据再加入订单！！！");
      }
    },
    edit(index) {
      this.dialogFormVisible = true;
      this.form = this.tableData[index];
      this.index = index;
    },
    submitStockout() {
      const _this = this;
      if (this.tableData.length > 0) {
        stockout({tableData:JSON.stringify(this.tableData) }).then(data => {
          if (data.code === 1) {
            _this.$message({
              message: data.message,
              type: "success",
              duration: 500,
              onClose() {
                _this.tableData = [];
              }
            });
          } else {
          }
        });
      } else {
        alert("请添加出库名单");
      }
    }
  }
};
</script>

<style lang="less">
.sale {
  .el-table {
    margin-bottom: 18px;
    .el-table__footer-wrapper {
      .cell {
        font-weight: 500;
        color: crimson;
      }
    }
  }
}
</style>