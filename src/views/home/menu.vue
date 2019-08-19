<template>
  <div class="men">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-submenu v-for="menu in treelist" :key="menu.index" :index="menu.index">
            <template slot="title">
              <i :class="menu.cls"></i>
              <span>{{menu.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="child in menu.children"
                :key="child.index"
                :index="child.index"
              >{{child.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "",
      // 动态菜单创建
      treelist: [
        {
          index: "1",
          cls: "el-icon-s-cooperation",
          title: "商品管理",
          children: [
            { index: "/home/product", name: "商品管理" },
            { index: "/home/addproduct", name: "添加管理" }
          ]
        },
        {
          index: "2",
          cls: "el-icon-s-goods",
          title: "账号管理",
          children: [
            { index: "/home/account", name: "账号管理" },
            { index: "/home/changepwd", name: "修改密码" },
            { index: "/home/addaccount", name: "增加账号" }
          ]
        },
        {
          index: "3",
          cls: "el-icon-circle-plus",
          title: "进货管理",
          children: [
            { index: "/home/inventoryManage", name: "库存管理" },
            { index: "/home/addInventory", name: "添加库存" }
          ]
        },
        {
          index: "4",
          cls: "el-icon-remove",
          title: "出货管理",
          children: [
            { index: "/home/salelist", name: "销售列表" },
            { index: "/home/productout", name: "商品出库" },
            { index: "/home/goodsreturn", name: "商品退货" }
          ]
        },
        {
          index: "5",
          cls: "el-icon-s-data",
          title: "统计管理",
          children: [
            { index: "/home/sta", name: "销售统计" },
            { index: "/home/stocksta", name: "进货统计" }
          ]
        },
        {
          index: "6",
          cls: "el-icon-s-custom",
          title: "会员管理",
          children: [
            { index: "/home/xxxx", name: "账号管理" },
            { index: "/home/xxxxxx", name: "添加账号" }
          ]
        }
      ]
    };
  }
};
</script>

<style>
.el-menu {
  border: 0;
}
</style>