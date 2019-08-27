<template>
  <div class="addproduct">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>添加商品</h2>
      </div>
      <div class="text item">
        <el-form
          :model="addProductForm"
          :rules="rules3"
          ref="addProductForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row class="tac">
            <el-col :span="12">
              <el-form-item label="所属分类" prop="type">
                <el-select v-model="addProductForm.type" placeholder="选择分类">
                  <el-option v-for="item in typeSum" :key="item" :label="item" :value="item">
                    <span style="float: left">{{ item }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品名称" prop="productname">
                <el-input v-model="addProductForm.productname"></el-input>
              </el-form-item>
              <el-form-item label="商品售价" prop="price">
                <el-input v-model.number="addProductForm.price" type="number">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="市场价" prop="marketPrice">
                <el-input
                  v-model.number="addProductForm.marketPrice"
                  placeholder="默认市场价为售价的1.2倍"
                  type="number"
                >
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="商品进价" prop="putInPrice">
                <el-input v-model.number="addProductForm.putInPrice" type="number">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="条形码" prop="barcode">
                <el-input v-model.number="addProductForm.barcode" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品质量" prop="productWeight">
                <el-input v-model.number="addProductForm.productWeight" type="number">
                  <template slot="append">Kg</template>
                </el-input>
              </el-form-item>
              <el-form-item label="商品单位" prop="unit">
                <el-input v-model="addProductForm.unit"></el-input>
              </el-form-item>
              <el-form-item label="会员优惠" prop="demberDiscount">
                <el-radio-group v-model="addProductForm.demberDiscount">
                  <el-radio label="1">享受</el-radio>
                  <el-radio label="0">不享受</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否促销" prop="Promotion">
                <el-radio-group v-model="addProductForm.Promotion">
                  <el-radio label="1">启用</el-radio>
                  <el-radio label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="商品简介" prop="productionIntriduction">
            <el-input
              type="textarea"
              v-model="addProductForm.productionIntriduction"
              placeholder="不超过200个汉字"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即添加</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addProduct } from "@/api/apis.js";
export default {
  data() {
    return {
      addProductForm: {
        type: "",
        productname: "",
        price: "",
        marketPrice: "",
        putInPrice: "",
        barcode: "",
        productWeight: "",
        unit: "",
        demberDiscount: "0",
        Promotion: "0",
        productionIntriduction: ""
      },
      typeSum: [
        "饮品",
        "食品类",
        "香烟",
        "酒类",
        "干货类",
        "果蔬 / 生鲜",
        "调味品",
        "百货类",
        "日用品"
      ],
      rules3: {
        productname: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入产品分类", trigger: "change" }
        ],
        price: [
          { required: true, message: "请输入商品售价", trigger: "change" },
          { type: "number", message: "必须为数字值" }
        ],
        marketPrice: [
          { required: true, message: "请输入市场价", trigger: "change" },
          { type: "number", message: "必须为数字值" }
        ],
        putInPrice: [
          { required: true, message: "请输入商品进价", trigger: "blur" },
          { type: "number", message: "必须为数字值" }
        ],
        barcode: [
          { required: true, message: "请输入条形码", trigger: "change" },
          { type: "number", message: "必须为数字值" }
        ],
        productWeight: [
          { required: true, message: "请输入商品质量", trigger: "change" },
          { type: "number", message: "必须为数字值" }
        ],
        unit: [{ required: true, message: "请输入商品单位", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm() {
      // 缓存this
      const _this = this;
      this.$refs.addProductForm.validate(valid => {
        if (valid) {
          // 发起添加产品请求
          addProduct(this.addProductForm).then(data => {
            if (data.code === 1) {
              alert(data.message);
              // 清空数据
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
      this.$refs.addProductForm.resetFields();
    }
  }
};
</script>

<style lang="less" Scoped>
.addproduct {
  .box-card {
    width: 100%;
    h2 {
      margin: 0;
    }
    .el-col {
      min-width: 400px;
      .el-form-item {
        min-width: 400px;
        width: 50%;
      }
    }
    .el-form-item {
      min-width: 400px;
      width: 90%;
    }
  }
}
</style>