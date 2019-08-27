<template>
  <div class="inventoryManage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>库存管理</span>
      </div>
      <div class="text item">
        <el-form ref="ruleForm2" label-width="68px" class="demo-ruleForm">
          <el-row>
            <el-col :span="6">
              <el-select v-model="value" placeholder="-----选择分类-----">
                <el-option label="item.label" value="item"></el-option>
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
          <el-table-column prop="barcode" label="商品条形码" width="180"></el-table-column>
          <el-table-column prop="productname" label="商品名称" width="180"></el-table-column>
          <el-table-column prop="putInPrice" label="进价（元）"></el-table-column>
          <el-table-column prop="stockSurplus" label="库存"></el-table-column>
          <el-table-column prop="Sold" label="已售"></el-table-column>
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
import { getstock } from '@/api/apis'
export default {
  data() {
    return {
      input: "",
      value: "",
      tableData: [
        {
          barcode: "1245367125742",
          productname: "飘柔",
          putInPrice: 22,
          putInNum: 20,
          stockSurplus: 18,
          Sold: 18
        }
      ]
    };
  },
  mounted(){
    const _this = this;
    getstock().then((data)=>{
      _this.tableData = data.data
    })
  }
};
</script>

<style lang="less">
.inventoryManage {
  .el-form {
    label {
      width: 60px;
    }
  }
}
</style>