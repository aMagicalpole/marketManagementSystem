<template>
  <div class="goodsreturn">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品退货</span>
      </div>
      <div class="text item">
        <el-form ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="商品条形码:">
                <el-input v-model="barcode" placeholder>
                  <el-button slot="append" type="primary" size="small">提交</el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barcode: ""
    };
  }
};
</script>

<style lang="less">
.goodsreturn{
  height: 100%;
  .el-card{
    min-width: 600px;
    height: 60%;
    .el-form-item{
      min-width: 400px;
    }
    .el-button{
      background-color: #409EFF;
      color:#fff;
    }
  }
}
</style>