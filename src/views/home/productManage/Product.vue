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
              <el-form-item label="分类:">
                <el-select v-model="search.type" placeholder="请选择" clearable>
                  <el-option v-for="item in typeSum" :key="item" :label="item" :value="item">
                    <span style="float: left">{{ item }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="关键字:">
                <el-input v-model="search.barcode" placeholder="商品名称(条形码)">
                  <el-button slot="append" type="primary" icon="el-icon-search" @click="searched"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="barcode" label="商品条形码"></el-table-column>
          <el-table-column prop="productname" label="商品名称"></el-table-column>
          <el-table-column prop="type" label="所属分类"></el-table-column>
          <el-table-column prop="price" label="售价（元）"></el-table-column>
          <el-table-column prop="promotionPrice" label="促销价（元）"></el-table-column>
          <el-table-column prop="marketPrice" label="市场价（元）"></el-table-column>
          <el-table-column prop="inventory" label="库存"></el-table-column>
          <el-table-column prop="inventorySum" label="库存总额（元）"></el-table-column>
          <el-table-column prop="totalSale" label="销售总额（元）"></el-table-column>
          <el-table-column label="管理" width="144px;">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="10"
          :current-page="page"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getProduct, searchProduct } from "@/api/apis.js";
export default {
  data() {
    return {
      search: {
        type: "",
        barcode: ""
      },
      tableData: [
        {
          barcode: "1245367125742",
          productname: "飘柔",
          type: "飘柔",
          price: "20",
          promotionPrice: "18",
          marketPrice: "18",
          inventory: "100",
          inventorySum: "1000",
          totalSale: "2000"
        }
      ],
      typeSum: [],
      page: 1,
      total: 0
    };
  },
  methods: {
    searched() {
      const _this = this;
      searchProduct(this.search).then(data => {
        _this.tableData = data.data;
      });
    },
    getIfo(page) {
      const _this = this;
      getProduct({"page":page}).then(data => {
        _this.tableData = data.data;
        _this.typeSum = data.typeSum;
        _this.total = data.count;
      });
    },
    handleCurrentChange(val) {
      this.getIfo(val);
    }
  },
  mounted() {
    this.getIfo(this.page);
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