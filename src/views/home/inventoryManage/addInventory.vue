<template>
  <div class="addInventory">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>添加库存</h2>
      </div>
      <div class="text item">
        <el-form
          :model="addStock"
          status-icon
          :rules="rules4"
          ref="addStock"
          label-width="100px"
          class="addStock"
        >
          <el-form-item label="商品条形码" prop="barcode">
            <el-input type="number" v-model.number="addStock.barcode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="stockNum">
            <el-input type="number" v-model.number="addStock.stockNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">入库</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addstock } from "@/api/apis";
export default {
  data() {
    return {
      addStock: {
        barcode: "",
        stockNum: ""
      },
      rules4: {
        barcode: [
          { required: true, message: "请输入商品条形码", trigger: "change" },
          { type: "number", message: "必须为数字值" }
        ],
        stockNum: [
          { required: true, message: "请输入数量", trigger: "change" },
          { type: "number", message: "必须为数字值" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      const _this = this;
      this.$refs.addStock.validate(valid => {
        if (valid) {
          addstock(this.addStock).then(data => {
            if (data.code === 1) {
              alert(data.message);
              _this.resetForm();
            } else {
              alert(data.message);
            }
          });
        } else {
          alert("添加失败!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.addStock.resetFields();
    }
  }
};
</script>

<style lang="less">
.addInventory {
  .box-card {
    width: 100%;
    h2 {
      margin: 0;
    }
    .el-form-item {
      min-width: 400px;
      width: 50%;
    }
  }
}
</style>