<template>
  <div class="saleList">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售明细</span>
      </div>
      <div class="text item">
        <el-form ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="开始时间:">
                <el-input v-model="Search.timeStart" placeholder="格式要求: 2019-06-01"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束时间:">
                <el-input v-model="Search.timeEnd" placeholder="格式要求: 2019-06-01"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="关键字:">
                <el-input v-model="Search.input" placeholder="(商品名称，订单号，客户名字，会员卡号)">
                  <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="orderNum" label="订单号" width="180"></el-table-column>
          <el-table-column prop="productname" label="名称" width="180"></el-table-column>
          <el-table-column prop="productNum" label="数量"></el-table-column>
          <el-table-column prop="actualPrice" label="实际售价"></el-table-column>
          <el-table-column prop="discount" label="优惠（促销/会员）"></el-table-column>
          <el-table-column prop="refund" label="退款"></el-table-column>
          <el-table-column prop="saleTime" label="销售时间"></el-table-column>
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
        Search:{timeStart:'',timeEnd:'',input:''},
        tableData:[]

    };
  }
};
</script>

<style>
</style>