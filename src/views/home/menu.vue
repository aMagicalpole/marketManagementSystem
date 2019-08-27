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
          <el-submenu v-for="menu in filterTree" :key="menu.index" :index="menu.index">
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
import {getRole} from '@/api/apis'
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
          roles : [1],
          children: [
            { index: "/home/product", name: "商品管理" },
            { index: "/home/addproduct", name: "添加管理" }
          ]
        },
        {
          index: "2",
          cls: "el-icon-s-goods",
          title: "账号管理",
          roles : [1],
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
          roles : [1,2],
          children: [
            { index: "/home/inventoryManage", name: "库存管理" },
            { index: "/home/addInventory", name: "添加库存" }
          ]
        },
        {
          index: "4",
          cls: "el-icon-remove",
          title: "出货管理",
          roles : [1,2],
          children: [
            { index: "/home/salelist", name: "销售列表" },
            { index: "/home/sale", name: "商品销售" },
            { index: "/home/productout", name: "商品出库" },
            { index: "/home/goodsreturn", name: "商品退货" }
          ]
        },
        {
          index: "5",
          cls: "el-icon-s-data",
          title: "统计管理",
          roles : [1],
          children: [
            { index: "/home/sta", name: "销售统计" },
            { index: "/home/stocksta", name: "进货统计" }
          ]
        },
        {
          index: "6",
          cls: "el-icon-s-custom",
          title: "会员管理",
          roles : [1],
          children: [
            { index: "/home/xxxx", name: "账号管理" },
            { index: "/home/xxxxxx", name: "添加账号" }
          ]
        }
      ],
      getrole : 2
    };
  },
  computed: {
    //根据权限过滤菜单
    filterTree(){
      return this.treelist.filter((val)=>{
        return val.roles.includes(this.getrole)
      })
    }
  },
  created(){
     // 通过tokenid获取当前用户的权限
    const _this = this;
    getRole({'token':localStorage.getItem('token')})
      .then((data)=>{
        _this.getrole = data.role;
        localStorage.setItem('role',data.role)
      })
  },
  mounted(){
   
  }
};
</script>

<style>
.el-menu {
  border: 0;
}
</style>