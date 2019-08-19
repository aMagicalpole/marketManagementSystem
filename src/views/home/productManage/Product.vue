<template>
  <div class="product">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <div class="text item">
        <el-form ref="ruleForm2" label-width="68px" class="demo-ruleForm">
          <el-row>
            <el-col :span="6">
              <el-select v-model="value" placeholder="-----选择分类-----">
                <el-option label="item.label" value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-form-item label="关键字:">
                <el-input v-model="input" placeholder="(商品名称，条形码)">
                  <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="code" label="商品条形码" width="180"></el-table-column>
          <el-table-column prop="Productname" label="商品名称" width="180"></el-table-column>
          <el-table-column prop="type" label="所属分类"></el-table-column>
          <el-table-column prop="price" label="售价（元）"></el-table-column>
          <el-table-column prop="promotionPrice" label="促销价（元）"></el-table-column>
          <el-table-column prop="marketPrice" label="市场价（元）"></el-table-column>
          <el-table-column prop="inventory" label="库存"></el-table-column>
          <el-table-column prop="inventorySum" label="库存总额（元）"></el-table-column>
          <el-table-column prop="totalSale" label="销售总额（元）"></el-table-column>
          <el-table-column prop="manage" label="管理">
            <el-button type="primary" plain circle icon="el-icon-s-tools"></el-button>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="40"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      value: "",
      tableData: [
        {
          code: "1245367125742",
          Productname: "飘柔",
          type: "飘柔",
          price: "20",
          promotionPrice: "18",
          marketPrice: "18",
          inventory: "100",
          inventorySum: "1000",
          totalSale: "2000"
        },
        {
          code: "1245367125742",
          Productname: "飘柔",
          type: "飘柔",
          price: "20",
          promotionPrice: "18",
          marketPrice: "18",
          inventory: "100",
          inventorySum: "1000",
          totalSale: "2000"
        },
        {
          code: "1245367125742",
          Productname: "飘柔",
          type: "飘柔",
          price: "20",
          promotionPrice: "18",
          marketPrice: "18",
          inventory: "100",
          inventorySum: "1000",
          totalSale: "2000"
        },
        {
          code: "1245367125742",
          Productname: "飘柔",
          type: "飘柔",
          price: "20",
          promotionPrice: "18",
          marketPrice: "18",
          inventory: "100",
          inventorySum: "1000",
          totalSale: "2000"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.product {
  .el-form {
    label {
      width: 60px;
    }
  }
}
</style>