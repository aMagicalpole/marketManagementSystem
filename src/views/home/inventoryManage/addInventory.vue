<template>
  <div class="addInventory">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>添加库存</h2>
      </div>
      <div class="text item">
        <el-form
          :model="addProduct"
          status-icon
          :rules="rules4"
          ref="addProduct"
          label-width="100px"
          class="addProduct"
        >
          <el-form-item label="商品条形码" prop="code">
            <el-input type="number" v-model.number="addProduct.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="productNum">
            <el-input type="number" v-model.number="addProduct.productNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="进价" prop="putInPrice">
            <el-input type="number" v-model.number="addProduct.putInPrice">
              <template slot="append">元</template>
            </el-input>
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
export default {
  data() {
    return {
      addProduct: {
        code: "",
        productNum: "",
        putInPrice: ""
      },
      rules4: {
        code: [
          { required: true, message: "请输入商品条形码", trigger: "change" },
          { type: "number", message: "必须为数字值" }
        ],
        productNum: [
          { required: true, message: "请输入数量", trigger: "change" },
          { type: "number", message: "必须为数字值" }
        ],
        putInPrice: [
          { required: true, message: "请输入进价", trigger: "change" },
          { type: "number", message: "必须为数字值" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addProduct.validate(valid => {
        if (valid) {
          alert("添加成功!");
        } else {
          alert("添加失败!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.addProduct.resetFields();
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